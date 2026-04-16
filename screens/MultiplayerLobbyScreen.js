import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import API_URL from '../config';

export default function MultiplayerLobbyScreen({ navigation, route }) {
  const { code, playerName, isHost } = route.params;
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoom();
    const interval = setInterval(fetchRoom, 2000);
    return () => clearInterval(interval);
  }, []);

  async function fetchRoom() {
    try {
      const res = await fetch(`${API_URL}/room/${code}`);
      const data = await res.json();
      setPlayers(data.players);
      if (!isHost && data.gameData) {
        navigation.navigate('MultiplayerReveal', {
          code,
          playerName,
          gameData: data.gameData,
          players: data.players,
        });
      }
    } catch {}
  }

  async function handleStart() {
    if (players.length < 3) {
      Alert.alert('Not Enough Players', 'You need at least 3 players to start.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/room/${code}/start`, { method: 'POST' });
      const gameData = await res.json();
      navigation.navigate('MultiplayerReveal', { code, playerName, gameData, players });
    } catch {
      Alert.alert('Error', 'Could not start game.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Code</Text>
      <Text style={styles.code}>{code}</Text>
      <Text style={styles.subtitle}>Share this code with friends</Text>

      <Text style={styles.playersTitle}>Players ({players.length})</Text>
      {players.map((p, i) => (
        <Text key={i} style={styles.playerText}>
          {p}
        </Text>
      ))}

      {isHost && (
        loading ? (
          <ActivityIndicator color="#b56cff" size="large" style={{ marginTop: 30 }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        )
      )}

      {!isHost && <Text style={styles.waitText}>Waiting for host to start...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050522',
    paddingHorizontal: 25,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  code: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#b56cff',
    letterSpacing: 6,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#bfbfbf',
    marginBottom: 30,
  },
  playersTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  playerText: {
    fontSize: 18,
    color: '#d8d8d8',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#5b1782',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  waitText: {
    fontSize: 16,
    color: '#bfbfbf',
    marginTop: 30,
    fontStyle: 'italic',
  },
});

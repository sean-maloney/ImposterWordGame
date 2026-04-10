import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function PlayerSetupScreen({ navigation, route }) {
  const selectedCategories = route.params?.selectedCategories || [];
  const rules = route.params?.rules || {
    maxImposters: 1,
    rounds: 3,
    imposterCanGoFirst: true,
    impostersKnowEachOther: false,
    hintWordEnabled: true,
    discussionTimer: 60,
    repeatCluesAllowed: false,
  };

  const [players, setPlayers] = useState(['Player 1', 'Player 2', 'Player 3']);

  function updatePlayerName(text, index) {
    const updatedPlayers = [...players];
    updatedPlayers[index] = text;
    setPlayers(updatedPlayers);
  }

  function addPlayer() {
    if (players.length < 8) {
      setPlayers([...players, `Player ${players.length + 1}`]);
    }
  }

  function removePlayer() {
    if (players.length > 3) {
      setPlayers(players.slice(0, players.length - 1));
    }
  }

  function handleStartReveal() {
    const cleanedPlayers = players.map((player) => player.trim());

    if (cleanedPlayers.some((player) => player === '')) {
      Alert.alert('Missing Name', 'Please enter a name for every player.');
      return;
    }

    navigation.navigate('Reveal', {
      players: cleanedPlayers,
      selectedCategories: selectedCategories,
      rules: rules,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Player Names</Text>
      <Text style={styles.subtitle}>You need at least 3 players</Text>

      {players.map((player, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={player}
          onChangeText={(text) => updatePlayerName(text, index)}
          placeholder={`Player ${index + 1}`}
          placeholderTextColor="#999"
        />
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.smallButton} onPress={addPlayer}>
          <Text style={styles.smallButtonText}>Add Player</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton} onPress={removePlayer}>
          <Text style={styles.smallButtonText}>Remove Player</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartReveal}>
        <Text style={styles.startButtonText}>Start Reveal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050522',
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#bfbfbf',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#121235',
    color: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2b2b5a',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 25,
  },
  smallButton: {
    backgroundColor: '#1a1a3a',
    borderWidth: 2,
    borderColor: '#5b1782',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    width: '48%',
    alignItems: 'center',
  },
  smallButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  startButton: {
    backgroundColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
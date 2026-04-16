import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import API_URL from '../config';

const DEFAULT_RULES = {
  maxImposters: 1,
  rounds: 3,
  imposterCanGoFirst: true,
  impostersKnowEachOther: false,
  hintWordEnabled: true,
  discussionTimer: 60,
  repeatCluesAllowed: false,
};

export default function OnlinePlayScreen({ navigation }) {
  const [tab, setTab] = useState('create'); // 'create' | 'join'
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!playerName.trim()) {
      Alert.alert('Missing Name', 'Enter your name first.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/room/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostName: playerName.trim(),
          selectedCategories: ['Random'],
          rules: DEFAULT_RULES,
        }),
      });
      const data = await res.json();
      navigation.navigate('MultiplayerLobby', {
        code: data.code,
        playerName: playerName.trim(),
        isHost: true,
      });
    } catch {
      Alert.alert('Error', 'Could not create room. Is the server running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin() {
    if (!playerName.trim() || !roomCode.trim()) {
      Alert.alert('Missing Info', 'Enter your name and the room code.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/room/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: roomCode.trim().toUpperCase(), playerName: playerName.trim() }),
      });
      if (!res.ok) {
        Alert.alert('Not Found', 'Room code not found. Check and try again.');
        return;
      }
      navigation.navigate('MultiplayerLobby', {
        code: roomCode.trim().toUpperCase(),
        playerName: playerName.trim(),
        isHost: false,
      });
    } catch {
      Alert.alert('Error', 'Could not join room. Is the server running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Play Online</Text>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'create' && styles.activeTab]}
          onPress={() => setTab('create')}
        >
          <Text style={styles.tabText}>Create Room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'join' && styles.activeTab]}
          onPress={() => setTab('join')}
        >
          <Text style={styles.tabText}>Join Room</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#999"
        value={playerName}
        onChangeText={setPlayerName}
      />

      {tab === 'join' && (
        <TextInput
          style={[styles.input, styles.codeInput]}
          placeholder="Room Code (e.g. A1B2C3)"
          placeholderTextColor="#999"
          value={roomCode}
          onChangeText={setRoomCode}
          autoCapitalize="characters"
          maxLength={6}
        />
      )}

      {loading ? (
        <ActivityIndicator color="#b56cff" size="large" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={tab === 'create' ? handleCreate : handleJoin}
        >
          <Text style={styles.buttonText}>{tab === 'create' ? 'Create Room' : 'Join Room'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050522',
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 25,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#5b1782',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#121235',
  },
  activeTab: {
    backgroundColor: '#5b1782',
  },
  tabText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
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
  codeInput: {
    letterSpacing: 4,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5b1782',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

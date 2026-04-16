import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import API_URL from '../config';

export default function ScoreboardScreen({ navigation, route }) {
  const { code, playerName, gameData, players } = route.params;
  const [scores, setScores] = useState(null);

  const imposterNames = players.filter((_, i) => gameData.imposterIndexes.includes(i));

  useEffect(() => {
    fetchScores();
  }, []);

  async function fetchScores() {
    try {
      const res = await fetch(`${API_URL}/room/${code}`);
      const data = await res.json();
      setScores(data.scores);
    } catch {}
  }

  const sortedPlayers = scores
    ? [...players].sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0))
    : players;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Game Over</Text>

        <Text style={styles.sectionTitle}>The Imposter(s) Were:</Text>
        {imposterNames.map((name, i) => (
          <Text key={i} style={styles.imposterName}>{name}</Text>
        ))}

        <Text style={styles.sectionTitle}>Scoreboard</Text>
        {scores === null ? (
          <ActivityIndicator color="#b56cff" />
        ) : (
          sortedPlayers.map((name, i) => (
            <View key={i} style={styles.scoreRow}>
              <Text style={[styles.scoreRank, i === 0 && styles.gold]}>#{i + 1}</Text>
              <Text style={[styles.scoreName, name === playerName && styles.highlight]}>{name}</Text>
              <Text style={styles.scorePoints}>{scores[name] ?? 0} pts</Text>
            </View>
          ))
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050522',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  card: {
    backgroundColor: '#121235',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#5b1782',
    padding: 25,
    alignItems: 'center',
  },
  title: { color: '#ffffff', fontSize: 30, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 10, textAlign: 'center' },
  imposterName: { color: '#ff7ad9', fontSize: 22, fontWeight: 'bold', marginBottom: 6, textAlign: 'center' },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2b2b5a',
  },
  scoreRank: { color: '#bfbfbf', fontSize: 16, width: 36 },
  gold: { color: '#ffd166', fontWeight: 'bold' },
  scoreName: { flex: 1, color: '#d8d8d8', fontSize: 16 },
  highlight: { color: '#b56cff', fontWeight: 'bold' },
  scorePoints: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  button: {
    backgroundColor: '#5b1782',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginTop: 25,
  },
  buttonText: { color: '#ffffff', fontSize: 17, fontWeight: 'bold' },
});

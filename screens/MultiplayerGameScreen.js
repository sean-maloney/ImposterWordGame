import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import API_URL from '../config';

export default function MultiplayerGameScreen({ navigation, route }) {
  const { code, playerName, gameData, players } = route.params;

  async function handleFinishGame() {
    const myIndex = players.indexOf(playerName);
    const isImposter = gameData.imposterIndexes.includes(myIndex);

    // Imposters who survive get points; crewmates who catch the imposter get points
    // For now we just navigate to scoreboard — scoring can be voted on there
    navigation.navigate('Scoreboard', { code, playerName, gameData, players });
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Game In Progress</Text>
        <Text style={styles.infoText}>Category: {gameData.category}</Text>
        <Text style={styles.infoText}>Rounds: {gameData.recommendedOrder?.length ?? players.length}</Text>

        <Text style={styles.sectionTitle}>Speaking Order</Text>
        {gameData.recommendedOrder.map((name, index) => (
          <Text key={index} style={[styles.orderText, name === playerName && styles.highlight]}>
            {index + 1}. {name} {name === playerName ? '(You)' : ''}
          </Text>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleFinishGame}>
          <Text style={styles.buttonText}>Finish Game</Text>
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
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  card: {
    width: '100%',
    backgroundColor: '#121235',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#5b1782',
    padding: 25,
    alignItems: 'center',
  },
  title: { color: '#ffffff', fontSize: 28, fontWeight: 'bold', marginBottom: 18, textAlign: 'center' },
  infoText: { color: '#d8d8d8', fontSize: 17, marginBottom: 8, textAlign: 'center' },
  sectionTitle: { color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginTop: 18, marginBottom: 12, textAlign: 'center' },
  orderText: { color: '#d8d8d8', fontSize: 16, marginBottom: 6, textAlign: 'center' },
  highlight: { color: '#b56cff', fontWeight: 'bold' },
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

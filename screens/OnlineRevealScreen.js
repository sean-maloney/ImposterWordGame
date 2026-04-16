import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function OnlineRevealScreen({ navigation, route }) {
  const { code, playerName, gameData, players } = route.params;
  const [revealed, setRevealed] = useState(false);

  const myIndex = players.indexOf(playerName);
  const isImposter = gameData.imposterIndexes.includes(myIndex);

  function handleContinue() {
    navigation.navigate('OnlineGame', { code, playerName, gameData, players });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Role</Text>

      {!revealed ? (
        <TouchableOpacity style={styles.card} onPress={() => setRevealed(true)}>
          <Text style={styles.playerName}>{playerName}</Text>
          <Text style={styles.tapText}>Tap to reveal your role</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.card}>
          <Text style={styles.playerName}>{playerName}</Text>

          {isImposter ? (
            <>
              <Text style={styles.imposterText}>You are the Imposter</Text>
              <Text style={styles.infoText}>Category: {gameData.category}</Text>
              <Text style={styles.infoText}>Hint: {gameData.hint}</Text>
            </>
          ) : (
            <>
              <Text style={styles.normalText}>You are not the Imposter</Text>
              <Text style={styles.infoText}>Category: {gameData.category}</Text>
              <Text style={styles.secretWord}>Word: {gameData.word}</Text>
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue to Game</Text>
          </TouchableOpacity>
        </View>
      )}
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
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    minHeight: 340,
    backgroundColor: '#121235',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#5b1782',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  playerName: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tapText: {
    color: '#bfbfbf',
    fontSize: 18,
    textAlign: 'center',
  },
  imposterText: {
    color: '#ff7ad9',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  normalText: {
    color: '#8dffb1',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  secretWord: {
    color: '#ffd166',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5b1782',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

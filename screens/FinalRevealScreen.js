import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FinalRevealScreen({ navigation, route }) {
  const players = route.params?.players || [];
  const selectedCategories = route.params?.selectedCategories || ['Random'];
  const rules = route.params?.rules || {
    maxImposters: 1,
    rounds: 3,
    imposterCanGoFirst: true,
    impostersKnowEachOther: false,
    hintWordEnabled: true,
    discussionTimer: 60,
    repeatCluesAllowed: false,
  };
  const gameData = route.params?.gameData || { imposterIndexes: [] };

  const imposterNames = players.filter((_, index) =>
    gameData.imposterIndexes.includes(index)
  );

  const confetti = ['🎉', '🎊', '✨', '🎉', '🎊', '✨', '🎉', '🎊'];

  function handlePlayAgain() {
    navigation.replace('Reveal', {
      players,
      selectedCategories,
      rules,
    });
  }

  function handleGoHome() {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <View style={styles.confettiTop}>
        {confetti.map((item, index) => (
          <Text key={index} style={styles.confettiText}>
            {item}
          </Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Imposter Reveal</Text>
        <Text style={styles.subtitle}>The imposter(s) were:</Text>

        {imposterNames.map((name, index) => (
          <Text key={index} style={styles.imposterName}>
            {name}
          </Text>
        ))}

        <TouchableOpacity style={styles.primaryButton} onPress={handlePlayAgain}>
          <Text style={styles.primaryButtonText}>Play Again</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleGoHome}>
          <Text style={styles.secondaryButtonText}>Go Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.confettiBottom}>
        {confetti.map((item, index) => (
          <Text key={index} style={styles.confettiText}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050522',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  confettiTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  confettiBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  confettiText: {
    fontSize: 28,
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
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center',
  },
  subtitle: {
    color: '#d8d8d8',
    fontSize: 18,
    marginBottom: 18,
    textAlign: 'center',
  },
  imposterName: {
    color: '#ff7ad9',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginTop: 25,
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
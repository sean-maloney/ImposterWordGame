import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function GameScreen({ navigation, route }) {
  const players = route.params?.players || [];
  const selectedCategories = route.params?.selectedCategories || ['Random'];
  const rules = route.params?.rules || { rounds: 3 };
  const gameData = route.params?.gameData || {
    category: 'Random',
    recommendedOrder: players,
    imposterIndexes: [],
  };

  function handleFinishGame() {
    navigation.navigate('FinalReveal', {
      players,
      selectedCategories,
      rules,
      gameData,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Game In Progress</Text>

        <Text style={styles.infoText}>Rounds: {rules.rounds}</Text>
        <Text style={styles.infoText}>Category: {gameData.category}</Text>

        <Text style={styles.sectionTitle}>Recommended Order</Text>
        {gameData.recommendedOrder.map((player, index) => (
          <Text key={index} style={styles.orderText}>
            {index + 1}. {player}
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
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  infoText: {
    color: '#d8d8d8',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  orderText: {
    color: '#d8d8d8',
    fontSize: 17,
    marginBottom: 6,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 25,
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
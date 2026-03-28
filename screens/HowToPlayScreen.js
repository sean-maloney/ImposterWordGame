import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HowToPlayScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How To Play</Text>

      <Text style={styles.text}>
        1. All players join the game.
      </Text>

      <Text style={styles.text}>
        2. Most players get the real secret word.
      </Text>

      <Text style={styles.text}>
        3. One player is the imposter and only gets a hint word.
      </Text>

      <Text style={styles.text}>
        4. Each player says a clue about their word.
      </Text>

      <Text style={styles.text}>
        5. The imposter must blend in and try to guess the real word.
      </Text>

      <Text style={styles.text}>
        6. At the end, players vote for who they think the imposter is.
      </Text>

      <Text style={styles.text}>
        7. If the imposter is caught, they get one chance to guess the real word.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  text: {
    fontSize: 17,
    color: '#d8d8d8',
    marginBottom: 18,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#5b1782',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
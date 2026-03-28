import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ModeSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose Game Mode</Text>
        <Text style={styles.subtitle}>Pick how you want to play</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Play Online</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LocalPlay')}
        >
          <Text style={styles.buttonText}>Play Local</Text>
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
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#bfbfbf',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
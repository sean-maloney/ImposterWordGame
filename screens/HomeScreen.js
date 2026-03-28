import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.iconGlow}>
          <Text style={styles.icon}>🕵️</Text>
        </View>

        <Text style={styles.title}>IMPOSTER</Text>
        <Text style={styles.subtitle}>The Hidden Word Game</Text>

        <Text style={styles.tagline}>
          Figure out the imposter before it is too late.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('HowToPlay')}
        >
          <Text style={styles.secondaryButtonText}>How To Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050522',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGlow: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#17072f',
    shadowColor: '#8e2bff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 25,
    elevation: 20,
  },
  icon: {
    fontSize: 88,
    color: '#b56cff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 20,
    color: '#a970ff',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  tagline: {
    marginTop: 55,
    fontSize: 15,
    color: '#c7c7c7',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  bottomSection: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 18,
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
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
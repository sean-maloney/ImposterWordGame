import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function RulesScreen({ navigation, route }) {
  const currentRules = route.params?.rules || {
    maxImposters: 1,
    rounds: 3,
    imposterCanGoFirst: true,
    impostersKnowEachOther: false,
    hintWordEnabled: true,
    discussionTimer: 60,
    repeatCluesAllowed: false,
  };

  const [maxImposters, setMaxImposters] = useState(currentRules.maxImposters);
  const [rounds, setRounds] = useState(currentRules.rounds);
  const [imposterCanGoFirst, setImposterCanGoFirst] = useState(currentRules.imposterCanGoFirst);
  const [impostersKnowEachOther, setImpostersKnowEachOther] = useState(currentRules.impostersKnowEachOther);
  const [hintWordEnabled, setHintWordEnabled] = useState(currentRules.hintWordEnabled);
  const [discussionTimer, setDiscussionTimer] = useState(currentRules.discussionTimer);
  const [repeatCluesAllowed, setRepeatCluesAllowed] = useState(currentRules.repeatCluesAllowed);

  function saveRules() {
    navigation.navigate('LocalPlay', {
      updatedRules: {
        maxImposters,
        rounds,
        imposterCanGoFirst,
        impostersKnowEachOther,
        hintWordEnabled,
        discussionTimer,
        repeatCluesAllowed,
      },
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Game Rules</Text>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Maximum Number of Imposters</Text>
        <View style={styles.numberRow}>
          <TouchableOpacity style={styles.smallButton} onPress={() => maxImposters > 0 && setMaxImposters(maxImposters - 1)}>
            <Text style={styles.smallButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.numberText}>{maxImposters}</Text>

          <TouchableOpacity style={styles.smallButton} onPress={() => maxImposters < 6 && setMaxImposters(maxImposters + 1)}>
            <Text style={styles.smallButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Rounds</Text>
        <View style={styles.numberRow}>
          <TouchableOpacity style={styles.smallButton} onPress={() => rounds > 1 && setRounds(rounds - 1)}>
            <Text style={styles.smallButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.numberText}>{rounds}</Text>

          <TouchableOpacity style={styles.smallButton} onPress={() => setRounds(rounds + 1)}>
            <Text style={styles.smallButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Imposter Can Go First</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, imposterCanGoFirst && styles.selectedToggle]}
            onPress={() => setImposterCanGoFirst(true)}
          >
            <Text style={styles.toggleText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, !imposterCanGoFirst && styles.selectedToggle]}
            onPress={() => setImposterCanGoFirst(false)}
          >
            <Text style={styles.toggleText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Imposters Know Each Other</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, impostersKnowEachOther && styles.selectedToggle]}
            onPress={() => setImpostersKnowEachOther(true)}
          >
            <Text style={styles.toggleText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, !impostersKnowEachOther && styles.selectedToggle]}
            onPress={() => setImpostersKnowEachOther(false)}
          >
            <Text style={styles.toggleText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Hint Word for Imposter</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, hintWordEnabled && styles.selectedToggle]}
            onPress={() => setHintWordEnabled(true)}
          >
            <Text style={styles.toggleText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, !hintWordEnabled && styles.selectedToggle]}
            onPress={() => setHintWordEnabled(false)}
          >
            <Text style={styles.toggleText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Discussion Timer (seconds)</Text>
        <View style={styles.numberRow}>
          <TouchableOpacity style={styles.smallButton} onPress={() => discussionTimer > 15 && setDiscussionTimer(discussionTimer - 15)}>
            <Text style={styles.smallButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.numberText}>{discussionTimer}</Text>

          <TouchableOpacity style={styles.smallButton} onPress={() => setDiscussionTimer(discussionTimer + 15)}>
            <Text style={styles.smallButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Allow Repeated Clues</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, repeatCluesAllowed && styles.selectedToggle]}
            onPress={() => setRepeatCluesAllowed(true)}
          >
            <Text style={styles.toggleText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, !repeatCluesAllowed && styles.selectedToggle]}
            onPress={() => setRepeatCluesAllowed(false)}
          >
            <Text style={styles.toggleText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveRules}>
        <Text style={styles.saveButtonText}>Save Rules</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#050522',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  ruleBox: {
    backgroundColor: '#121235',
    borderWidth: 1,
    borderColor: '#2b2b5a',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  ruleLabel: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    width: 45,
    height: 45,
    backgroundColor: '#5b1782',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  numberText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 25,
    minWidth: 40,
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#5b1782',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#1a1a3a',
  },
  selectedToggle: {
    backgroundColor: '#5b1782',
  },
  toggleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
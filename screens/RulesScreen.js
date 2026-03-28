import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function RulesScreen() {
  const [maxImposters, setMaxImposters] = useState(1);
  const [rounds, setRounds] = useState(3);
  const [imposterCanGoFirst, setImposterCanGoFirst] = useState(true);
  const [impostersKnowEachOther, setImpostersKnowEachOther] = useState(false);
  const [hintWordEnabled, setHintWordEnabled] = useState(true);
  const [discussionTimer, setDiscussionTimer] = useState(60);
  const [repeatCluesAllowed, setRepeatCluesAllowed] = useState(false);

  function toggleValue(value, setValue) {
    setValue(!value);
  }

  function increaseMaxImposters() {
    if (maxImposters < 6) {
      setMaxImposters(maxImposters + 1);
    }
  }

  function decreaseMaxImposters() {
    if (maxImposters > 0) {
      setMaxImposters(maxImposters - 1);
    }
  }

  function increaseRounds() {
    setRounds(rounds + 1);
  }

  function decreaseRounds() {
    if (rounds > 1) {
      setRounds(rounds - 1);
    }
  }

  function increaseTimer() {
    setDiscussionTimer(discussionTimer + 15);
  }

  function decreaseTimer() {
    if (discussionTimer > 15) {
      setDiscussionTimer(discussionTimer - 15);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Game Rules</Text>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Maximum Number of Imposters</Text>
        <View style={styles.numberRow}>
          <TouchableOpacity style={styles.smallButton} onPress={decreaseMaxImposters}>
            <Text style={styles.smallButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.numberText}>{maxImposters}</Text>

          <TouchableOpacity style={styles.smallButton} onPress={increaseMaxImposters}>
            <Text style={styles.smallButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.helperText}>
          The game can randomly choose up to this number.
        </Text>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Rounds</Text>
        <View style={styles.numberRow}>
          <TouchableOpacity style={styles.smallButton} onPress={decreaseRounds}>
            <Text style={styles.smallButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.numberText}>{rounds}</Text>

          <TouchableOpacity style={styles.smallButton} onPress={increaseRounds}>
            <Text style={styles.smallButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Imposter Can Go First</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              imposterCanGoFirst && styles.selectedToggle,
            ]}
            onPress={() => setImposterCanGoFirst(true)}
          >
            <Text style={styles.toggleText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              !imposterCanGoFirst && styles.selectedToggle,
            ]}
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
            style={[
              styles.toggleButton,
              impostersKnowEachOther && styles.selectedToggle,
            ]}
            onPress={() => setImpostersKnowEachOther(true)}
          >
            <Text style={styles.toggleText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              !impostersKnowEachOther && styles.selectedToggle,
            ]}
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
            style={[
              styles.toggleButton,
              hintWordEnabled && styles.selectedToggle,
            ]}
            onPress={() => setHintWordEnabled(true)}
          >
            <Text style={styles.toggleText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              !hintWordEnabled && styles.selectedToggle,
            ]}
            onPress={() => setHintWordEnabled(false)}
          >
            <Text style={styles.toggleText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Discussion Timer (seconds)</Text>
        <View style={styles.numberRow}>
          <TouchableOpacity style={styles.smallButton} onPress={decreaseTimer}>
            <Text style={styles.smallButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.numberText}>{discussionTimer}</Text>

          <TouchableOpacity style={styles.smallButton} onPress={increaseTimer}>
            <Text style={styles.smallButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleLabel}>Allow Repeated Clues</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              repeatCluesAllowed && styles.selectedToggle,
            ]}
            onPress={() => setRepeatCluesAllowed(true)}
          >
            <Text style={styles.toggleText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              !repeatCluesAllowed && styles.selectedToggle,
            ]}
            onPress={() => setRepeatCluesAllowed(false)}
          >
            <Text style={styles.toggleText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  helperText: {
    color: '#bfbfbf',
    fontSize: 13,
    marginTop: 10,
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
});
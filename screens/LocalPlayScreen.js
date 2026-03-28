import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function LocalPlayScreen({ navigation }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ['Animals', 'Food', 'Movies', 'Countries', 'Random'];

  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  function handleContinue() {
    if (selectedCategories.length === 0) {
      Alert.alert('No Category Selected', 'Please select at least one category.');
      return;
    }

    Alert.alert('Selected Categories', selectedCategories.join(', '));
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Choose Word Categories</Text>
        <Text style={styles.subtitle}>
          Tap categories to include or remove them
        </Text>
      </View>

      <View style={styles.categoryContainer}>
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);

          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                isSelected && styles.selectedCategoryButton,
              ]}
              onPress={() => toggleCategory(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.startButton} onPress={handleContinue}>
          <Text style={styles.startButtonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rulesButton}
          onPress={() => navigation.navigate('Rules')}
        >
          <Text style={styles.rulesButtonText}>Edit Rules</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050522',
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#bfbfbf',
    textAlign: 'center',
    marginBottom: 30,
  },
  categoryContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryButton: {
    backgroundColor: '#1a1a3a',
    borderWidth: 2,
    borderColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 18,
  },
  selectedCategoryButton: {
    backgroundColor: '#5b1782',
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomButtons: {
    marginTop: 20,
  },
  startButton: {
    backgroundColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rulesButton: {
    borderWidth: 2,
    borderColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
  },
  rulesButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
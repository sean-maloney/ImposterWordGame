import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { WORD_DATA } from '../data/wordData';

export default function RevealScreen({ navigation, route }) {
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

  const pagerRef = useRef(null);
  const [revealedPages, setRevealedPages] = useState({});

  const gameData = useMemo(() => {
    const chosenCategory =
      selectedCategories[Math.floor(Math.random() * selectedCategories.length)];

    const wordsForCategory = WORD_DATA[chosenCategory];
    const chosenWord =
      wordsForCategory[Math.floor(Math.random() * wordsForCategory.length)];

    const maxPossibleImposters = Math.max(
      1,
      Math.min(rules.maxImposters || 1, players.length - 1)
    );

    const actualImposterCount =
      Math.floor(Math.random() * maxPossibleImposters) + 1;

    const playerIndexes = players.map((_, index) => index);
    const shuffledIndexes = [...playerIndexes].sort(() => Math.random() - 0.5);
    const imposterIndexes = shuffledIndexes.slice(0, actualImposterCount);

    let recommendedOrder = [...players].sort(() => Math.random() - 0.5);

    if (rules.imposterCanGoFirst === true && imposterIndexes.length > 0) {
      const firstImposterIndex = imposterIndexes[0];
      const firstImposterName = players[firstImposterIndex];
      const remainingPlayers = recommendedOrder.filter(
        (name) => name !== firstImposterName
      );
      recommendedOrder = [firstImposterName, ...remainingPlayers];
    }

    return {
      category: chosenCategory,
      word: chosenWord.word,
      hint: chosenWord.hint,
      imposterIndexes,
      recommendedOrder,
    };
  }, [players, selectedCategories, rules]);

  function revealWord(index) {
    setRevealedPages((prev) => ({
      ...prev,
      [index]: true,
    }));
  }

  function goToNextPage(index) {
    if (index < players.length - 1) {
      pagerRef.current?.setPage(index + 1);
    } else {
      pagerRef.current?.setPage(players.length);
    }
  }

  function handleStartGame() {
    navigation.navigate('Game', {
      players,
      selectedCategories,
      rules,
      gameData,
    });
  }

  return (
    <PagerView
      ref={pagerRef}
      style={styles.pager}
      initialPage={0}
      scrollEnabled={false}
    >
      {players.map((playerName, index) => {
        const isRevealed = revealedPages[index] === true;
        const isImposter = gameData.imposterIndexes.includes(index);

        return (
          <View style={styles.page} key={index.toString()}>
            <Text style={styles.topText}>Pass the phone to {playerName}</Text>

            {!isRevealed ? (
              <TouchableOpacity
                style={styles.card}
                onPress={() => revealWord(index)}
              >
                <Text style={styles.playerName}>{playerName}</Text>
                <Text style={styles.tapText}>Tap to reveal your word</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.card}>
                <Text style={styles.playerName}>{playerName}</Text>

                {isImposter ? (
                  <>
                    <Text style={styles.imposterText}>You are the Imposter</Text>
                    <Text style={styles.infoText}>Category: {gameData.category}</Text>
                    {rules.hintWordEnabled ? (
                      <Text style={styles.infoText}>Hint Word: {gameData.hint}</Text>
                    ) : (
                      <Text style={styles.infoText}>Hint Word: Off</Text>
                    )}
                  </>
                ) : (
                  <>
                    <Text style={styles.normalText}>You are not the Imposter</Text>
                    <Text style={styles.infoText}>Category: {gameData.category}</Text>
                    <Text style={styles.secretWord}>Word: {gameData.word}</Text>
                  </>
                )}

                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => goToNextPage(index)}
                >
                  <Text style={styles.nextButtonText}>
                    {index === players.length - 1 ? 'Finish Reveal' : 'Next Player'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}

      <View style={styles.page} key="summary-page">
        <View style={styles.card}>
          <Text style={styles.finalTitle}>Reveal Complete</Text>
          <Text style={styles.finalText}>
            Everyone has now seen their role.
          </Text>

          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartGame}
          >
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
    backgroundColor: '#050522',
  },
  page: {
    flex: 1,
    backgroundColor: '#050522',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  topText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
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
  nextButton: {
    backgroundColor: '#5b1782',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: 25,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  finalText: {
    color: '#d8d8d8',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#5b1782',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
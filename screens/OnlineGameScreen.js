import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import API_URL from '../config';

export default function OnlineGameScreen({ navigation, route }) {
  const { code, playerName, gameData, players } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  async function fetchMessages() {
    try {
      const res = await fetch(`${API_URL}/room/${code}/messages`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {}
  }

  async function sendMessage() {
    if (!inputText.trim()) return;

    try {
      await fetch(`${API_URL}/room/${code}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, message: inputText.trim() }),
      });
      setInputText('');
      fetchMessages();
    } catch {}
  }

  function handleFinishGame() {
    navigation.navigate('Scoreboard', { code, playerName, gameData, players });
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Game In Progress</Text>
        <Text style={styles.infoText}>Category: {gameData.category}</Text>
        
        <Text style={styles.sectionTitle}>Speaking Order</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.orderScroll}>
          {gameData.recommendedOrder.map((name, i) => (
            <Text key={i} style={[styles.orderText, name === playerName && styles.highlight]}>
              {i + 1}. {name}
            </Text>
          ))}
        </ScrollView>
      </View>

      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>Chat</Text>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, i) => (
            <View key={i} style={[styles.messageBubble, msg.playerName === playerName && styles.myMessage]}>
              <Text style={styles.messageName}>{msg.playerName}</Text>
              <Text style={styles.messageText}>{msg.message}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.finishButton} onPress={handleFinishGame}>
        <Text style={styles.finishButtonText}>Finish Game</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050522',
  },
  header: {
    padding: 20,
    backgroundColor: '#121235',
    borderBottomWidth: 2,
    borderBottomColor: '#5b1782',
  },
  title: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  infoText: { color: '#d8d8d8', fontSize: 16, marginBottom: 12, textAlign: 'center' },
  sectionTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginTop: 8, marginBottom: 8 },
  orderScroll: { flexDirection: 'row' },
  orderText: { color: '#d8d8d8', fontSize: 14, marginRight: 12 },
  highlight: { color: '#b56cff', fontWeight: 'bold' },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  chatTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    backgroundColor: '#1a1a3a',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#5b1782',
    alignSelf: 'flex-end',
  },
  messageName: { color: '#b56cff', fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
  messageText: { color: '#ffffff', fontSize: 15 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#121235',
    color: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#2b2b5a',
  },
  sendButton: {
    backgroundColor: '#5b1782',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  finishButton: {
    backgroundColor: '#5b1782',
    paddingVertical: 14,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  finishButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});

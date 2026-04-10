import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ModeSelectScreen from './screens/ModeSelectScreen';
import HowToPlayScreen from './screens/HowToPlayScreen';
import LocalPlayScreen from './screens/LocalPlayScreen';
import RulesScreen from './screens/RulesScreen';
import PlayerSetupScreen from './screens/PlayerSetupScreen';
import RevealScreen from './screens/RevealScreen';
import GameScreen from './screens/GameScreen';
import FinalRevealScreen from './screens/FinalRevealScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#050522',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#050522',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="ModeSelect" component={ModeSelectScreen} options={{ title: 'Choose Mode', headerBackVisible: false }} />
        <Stack.Screen name="HowToPlay" component={HowToPlayScreen} options={{ title: 'How To Play' }} />
        <Stack.Screen name="LocalPlay" component={LocalPlayScreen} options={{ title: 'Local Play' }} />
        <Stack.Screen name="Rules" component={RulesScreen} options={{ title: 'Edit Rules' }} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetupScreen} options={{ title: 'Players' }} />
        <Stack.Screen name="Reveal" component={RevealScreen} options={{ title: 'Reveal', headerBackVisible: false }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Game', headerBackVisible: false }} />
        <Stack.Screen name="FinalReveal" component={FinalRevealScreen} options={{ title: 'Reveal', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
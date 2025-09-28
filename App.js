// App.js
import React, { useEffect, useState } from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

import theme from './theme'; // cores/tokens do EduFit

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import VideoTutorialScreen from './screens/VideoTutorialScreen';
import ChatScreen from './screens/ChatScreen';
import AIResponseScreen from './screens/AIResponseScreen';
import MainTabs from './navigation/MainTabs';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [booting, setBooting] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  // Descobre rota inicial com base no token
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLogged(!!token);
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  if (!fontsLoaded || booting) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // Tema de navegação nas cores EduFit
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.bg,
      primary: theme.colors.brandOrange,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bg} />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: theme.colors.brandBlue,
          headerStyle: { backgroundColor: theme.colors.card },
          headerTitleStyle: { fontFamily: theme.font.bold },
          headerBackTitleVisible: false,
        }}
        initialRouteName={isLogged ? 'MainTabs' : 'Login'}
      >
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar conta' }} />

        {/* App */}
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="VideoTutorial" component={VideoTutorialScreen} options={{ title: 'Vídeos' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
        <Stack.Screen name="AIResponse" component={AIResponseScreen} options={{ title: 'Assistente' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


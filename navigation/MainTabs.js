// edufit-mobile/navigation/MainTabs.js
import React, { useEffect, useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import theme from '../theme';
import { api } from '../services/api';
import HeaderLogo from '../components/HeaderLogo';
import AvatarHeader from '../components/AvatarHeader';

// Screens
import HomeScreen from '../screens/HomeScreen';
import VideoTutorialScreen from '../screens/VideoTutorialScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const [me, setMe] = useState(null);

  // 1) Carrega uma vez ao montar
  useEffect(() => {
    let mounted = true;
    api.get('/api/me')
      .then(res => { if (mounted) setMe(res.data); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  // 2) Recarrega sempre que a tab voltar ao foco (após editar perfil)
  useFocusEffect(
    useCallback(() => {
      let cancel = false;
      api.get('/api/me')
        .then(r => { if (!cancel) setMe(r.data); })
        .catch(() => {});
      return () => { cancel = true; };
    }, [])
  );

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: { backgroundColor: theme.colors.card },
        headerTitle: () => <HeaderLogo title={route.name === 'Home' ? 'EduFit' : route.name} />,
        headerTitleAlign: 'left',
        headerRight: () => (
          <AvatarHeader
            uri={me?.avatarUrl}
            name={me?.name}
            onPress={() => navigation.navigate('Perfil')}
          />
        ),
        tabBarActiveTintColor: theme.colors.secondary,   // laranja
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          const map = {
            Home: 'home',
            Vídeos: 'play-circle',
            Desafios: 'trophy',
            Chat: 'chatbubbles',
            Perfil: 'person',
          };
          return <Ionicons name={map[route.name] || 'ellipse'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Vídeos" component={VideoTutorialScreen} />
      <Tab.Screen name="Desafios" component={ChallengesScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}






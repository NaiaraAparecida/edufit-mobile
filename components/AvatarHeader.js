// edufit-mobile/components/AvatarHeader.js
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import theme from '../theme';

export default function AvatarHeader({ size = 30, uri, name = 'Usuário', onPress }) {
  const initials = (name || 'U')
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ marginRight: 12 }}
      accessibilityRole="button"
      accessibilityLabel="Abrir perfil"
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: theme.colors.border }}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: '#E6F0FA',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text
            style={{
              color: theme.colors.primary,
              fontFamily: theme.font.bold,
              fontSize: 12,
            }}
          >
            {initials}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

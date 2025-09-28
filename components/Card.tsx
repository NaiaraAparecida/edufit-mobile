import React from 'react';
import { View } from 'react-native';
import theme from '../theme';

export default function Card({ children, padded = true, style }) {
  return (
    <View
      style={[{
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        borderColor: theme.colors.border,
        borderWidth: 1,
        padding: padded ? theme.spacing.lg : 0,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      }, style]}
    >
      {children}
    </View>
  );
}


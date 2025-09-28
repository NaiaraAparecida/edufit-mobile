import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import theme from '../theme';

export default function Button({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  loading = false,
  disabled = false,
  style,
  textStyle,
}) {
  const base = {
    height: 48,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
  };

  const variants = {
    primary:   { backgroundColor: theme.colors.secondary, borderColor: theme.colors.secondary }, // CTA laranja
    secondary: { backgroundColor: theme.colors.primary,   borderColor: theme.colors.primary },   // azul
    outline:   { backgroundColor: 'transparent', borderColor: theme.colors.primary },
    ghost:     { backgroundColor: 'transparent', borderColor: 'transparent' },
  };

  const textColor =
    variant === 'outline' || variant === 'ghost'
      ? theme.colors.primary
      : '#fff';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled || loading}
      style={[base, variants[variant], disabled && { opacity: 0.6 }, style]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[{ color: textColor, fontFamily: theme.font.bold, fontSize: theme.font.size.md }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}


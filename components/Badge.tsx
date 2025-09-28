import React from 'react';
import { View, Text } from 'react-native';
import theme from '../theme';

export default function Badge({ label, tone = 'brand', style, textStyle }) {
  const tones = {
    brand:  { bg: '#E6F0FA', fg: theme.colors.primary },     // azul claro + azul
    success:{ bg: '#EAF8EF', fg: theme.colors.success },
    danger: { bg: '#FDECEC', fg: theme.colors.danger  },
    warning:{ bg: '#FFF2E6', fg: theme.colors.secondary },   // laranja claro + laranja
  };
  const t = tones[tone] || tones.brand;

  return (
    <View
      style={[{
        alignSelf: 'flex-start',
        backgroundColor: t.bg,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.radius.pill,
      }, style]}
    >
      <Text style={[{ color: t.fg, fontFamily: theme.font.medium, fontSize: theme.font.size.sm }, textStyle]}>
        {label}
      </Text>
    </View>
  );
}


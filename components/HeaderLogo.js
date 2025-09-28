// edufit-mobile/components/HeaderLogo.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import theme from '../theme';

// Ajuste o require conforme onde está sua logo:
const logo = require('../assets/LogoSemFundo.png');

export default function HeaderLogo({ title = 'EduFit' }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Image source={logo} style={{ width: 28, height: 28, resizeMode: 'contain' }} />
      <Text style={{ color: theme.colors.primary, fontFamily: theme.font.bold, fontSize: theme.font.size.md }}>
        {title}
      </Text>
    </View>
  );
}

import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import theme from '../theme';

export default function Screen({ children, padded = true, style }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bg} />
      <View style={[{ flex: 1, padding: padded ? theme.spacing.lg : 0 }, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

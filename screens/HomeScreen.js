// edufit-mobile/screens/HomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Button from '../components/Button';
import theme from '../theme';

const logo = require('../assets/LogoSemFundo.png'); // ajuste caminho se necessário

export default function HomeScreen({ navigation }) {
  return (
    <Screen>
      {/* Banner topo */}
      <View style={s.banner}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image source={logo} style={s.bannerLogo} />
          <View style={{ flex: 1 }}>
            <Text style={s.bannerTitle}>Bem-vinda ao EduFit</Text>
            <Text style={s.bannerSubtitle}>Treinos, vídeos e desafios — tudo num só lugar.</Text>
          </View>
        </View>

        <View style={s.bannerCtas}>
          <Button title="Assistente" variant="outline" onPress={() => navigation.navigate('AIResponse')} />
          <Button title="Vídeos" variant="primary" onPress={() => navigation.navigate('Vídeos')} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
        {/* Cards de atalhos */}
        <Text style={s.sectionTitle}>Comece por aqui</Text>
        <View style={s.grid}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Desafios')}>
            <Card style={s.tile}>
              <Text style={s.tileTitle}>Desafios</Text>
              <Text style={s.tileDesc}>Participe e mantenha a disciplina</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Chat')}>
            <Card style={s.tile}>
              <Text style={s.tileTitle}>Chat</Text>
              <Text style={s.tileDesc}>Converse com a comunidade</Text>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Se tiver Agenda (ActivitySchedule) */}
        <Text style={[s.sectionTitle, { marginTop: theme.spacing.lg }]}>Próximos passos</Text>
        <Card>
          <Text style={s.text}>Veja sua agenda e marque atividades como feitas.</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <Button title="Abrir agenda" variant="secondary" onPress={() => navigation.navigate('Agenda')} />
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  banner: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  bannerLogo: { width: 48, height: 48, resizeMode: 'contain' },
  bannerTitle: { color: '#fff', fontFamily: theme.font.bold, fontSize: theme.font.size.lg },
  bannerSubtitle: { color: '#E6F0FA', fontFamily: theme.font.regular, marginTop: 2 },
  bannerCtas: { flexDirection: 'row', gap: 8, marginTop: theme.spacing.md },

  sectionTitle: {
    fontFamily: theme.font.bold,
    color: theme.colors.primary,
    fontSize: theme.font.size.lg,
    marginBottom: theme.spacing.sm,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: {
    width: 160,
    height: 110,
    justifyContent: 'center',
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  tileTitle: { fontFamily: theme.font.bold, color: theme.colors.text, fontSize: theme.font.size.md },
  tileDesc: { marginTop: 4, color: theme.colors.muted, fontFamily: theme.font.regular },

  text: { color: theme.colors.text, fontFamily: theme.font.regular },
});



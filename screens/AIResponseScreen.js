import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Card from '../components/Card';
import theme from '../theme';
import { api } from '../services/api';

export default function AIResponseScreen() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');

  const ask = async () => {
    if (!prompt.trim()) return;
    try {
      const { data } = await api.post('/api/ai/assist', { prompt: prompt.trim() });
      setReply(data.reply || 'Sem resposta.');
    } catch (e) {
      console.error('Erro na IA mock', e);
      setReply('Falha ao consultar o assistente.');
    }
  };

  return (
    <Screen>
      <Text style={s.title}>Assistente</Text>

      <Text style={s.label}>Pergunta</Text>
      <TextInput style={s.input} value={prompt} onChangeText={setPrompt} placeholder="Ex.: montar treino de força..." />

      <Button title="Perguntar" onPress={ask} variant="secondary" />

      {!!reply && (
        <Card style={{ marginTop: theme.spacing.md }}>
          <Text style={{ fontFamily: theme.font.regular, color: theme.colors.text }}>{reply}</Text>
        </Card>
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { fontFamily: theme.font.bold, color: theme.colors.primary, fontSize: theme.font.size.lg, marginBottom: 12 },
  label: { fontFamily: theme.font.medium, color: theme.colors.muted, marginBottom: 6, marginTop: 8 },
  input: {
    height: 48, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: '#fff',
    borderRadius: theme.radius.md, paddingHorizontal: 12, marginBottom: 12, fontFamily: theme.font.regular,
  },
});





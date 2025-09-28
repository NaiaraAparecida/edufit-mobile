import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Card from '../components/Card';
import theme from '../theme';
import { api } from '../services/api';

export default function ChatScreen() {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  const timer = useRef(null);

  const load = async () => {
    try {
      const { data } = await api.get('/api/messages?room=global');
      setMsgs(data);
    } catch (e) { console.error('Erro ao buscar mensagens', e); }
  };

  useEffect(() => {
    load();
    timer.current = setInterval(load, 4000);
    return () => timer.current && clearInterval(timer.current);
  }, []);

  const send = async () => {
    if (!text.trim()) return;
    try {
      const user = JSON.parse((await AsyncStorage.getItem('user')) || '{}');
      await api.post('/api/messages', { room: 'global', userId: user?.id || 'u1', content: text.trim() });
      setText('');
      load();
    } catch (e) { console.error('Erro ao enviar mensagem', e); }
  };

  return (
    <Screen>
      <FlatList
        data={msgs}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ paddingBottom: theme.spacing.lg }}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: theme.spacing.sm }}>
            <Text style={c.meta}>{item.userId} • {new Date(item.createdAt).toLocaleTimeString()}</Text>
            <Text style={c.txt}>{item.content}</Text>
          </Card>
        )}
      />
      <View style={c.row}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Escreva uma mensagem…"
          style={c.input}
        />
        <Button title="Enviar" onPress={send} variant="secondary" />
      </View>
    </Screen>
  );
}

const c = StyleSheet.create({
  meta: { color: theme.colors.muted, marginBottom: 4, fontFamily: theme.font.regular },
  txt: { color: theme.colors.text, fontFamily: theme.font.regular },
  row: { flexDirection: 'row', gap: 8, marginTop: 8 },
  input: {
    flex: 1, height: 48, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: '#fff',
    borderRadius: theme.radius.md, paddingHorizontal: 12, fontFamily: theme.font.regular,
  },
});




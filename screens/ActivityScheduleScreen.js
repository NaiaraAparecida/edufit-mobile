import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Button from '../components/Button';
import theme from '../theme';
import { api } from '../services/api';

export default function ActivityScheduleScreen() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(true);

  const iso = (d) => new Date(d).toISOString();
  const today = new Date();
  const from = new Date(today); from.setDate(today.getDate() - 2);
  const to   = new Date(today); to.setDate(today.getDate() + 7);

  const fetchData = async () => {
    try {
      const url = `/api/activities?from=${encodeURIComponent(iso(from))}&to=${encodeURIComponent(iso(to))}`;
      const { data } = await api.get(url);
      setItems(data);
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível carregar a agenda.');
    } finally { setBusy(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const markDone = async (id) => {
    try {
      const user = JSON.parse((await AsyncStorage.getItem('user')) || '{}');
      await api.post(`/api/activities/${id}/done`, { userId: user?.id || 'u1' });
      Alert.alert('Sucesso', 'Atividade marcada como feita.');
      fetchData();
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Falha ao marcar atividade.');
    }
  };

  return (
    <Screen>
      <Text style={s.title}>Agenda</Text>
      <FlatList
        data={items}
        refreshing={busy}
        onRefresh={fetchData}
        keyExtractor={(i) => String(i.id)}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing.sm }} />}
        renderItem={({ item }) => (
          <Card>
            <Text style={s.cardTitle}>{item.title}</Text>
            <Text style={s.meta}>
              {new Date(item.scheduledAt).toLocaleString()} • {item.type} • {item.duration} min
            </Text>
            <Button title="Marcar feito" onPress={() => markDone(item.id)} variant="secondary" />
          </Card>
        )}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { fontFamily: theme.font.bold, color: theme.colors.primary, fontSize: theme.font.size.lg, marginBottom: 12 },
  cardTitle: { fontFamily: theme.font.medium, fontSize: theme.font.size.md, color: theme.colors.text, marginBottom: 6 },
  meta: { color: theme.colors.muted, marginBottom: 10, fontFamily: theme.font.regular },
});




import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import theme from '../theme';
import { api } from '../services/api';

export default function ChallengesScreen() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get('/api/challenges');
      setList(data);
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível carregar os desafios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const addChallenge = async () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'Digite um título.');
      return;
    }
    try {
      setCreating(true);
      const { data } = await api.post('/api/challenges', { title: title.trim() });
      setList((prev) => [data, ...prev]);
      setTitle('');
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível criar o desafio.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Screen>
      <Text style={s.title}>Desafios</Text>

      <View style={s.row}>
        <TextInput
          style={s.input}
          placeholder="Novo desafio (ex.: Corrida 5km)"
          value={title}
          onChangeText={setTitle}
        />
        <Button title="Adicionar" onPress={addChallenge} loading={creating} variant="primary" />
      </View>

      <FlatList
        data={list}
        refreshing={loading}
        onRefresh={load}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ paddingTop: theme.spacing.sm }}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing.sm }} />}
        renderItem={({ item }) => (
          <Card>
            <Text style={s.cardTitle}>{item.title}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
              <Badge label={`${item.participants ?? 0} participantes`} tone="brand" />
              {item.badge ? <Badge label={item.badge} tone="warning" /> : null}
            </View>
          </Card>
        )}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { fontFamily: theme.font.bold, color: theme.colors.primary, fontSize: theme.font.size.lg, marginBottom: 12 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#fff',
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    fontFamily: theme.font.regular,
  },
  cardTitle: { fontFamily: theme.font.medium, fontSize: theme.font.size.md, color: theme.colors.text },
});



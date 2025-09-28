import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import theme from '../theme';
import { api } from '../services/api';

export default function ProfileScreen() {
  const [form, setForm] = useState({ name: '', email: '', avatarUrl: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/me').then(r => setForm(r.data)).finally(() => setLoading(false));
  }, []);

  const save = async () => {
    try {
      const { data } = await api.put('/api/me', form);
      setForm(data);
      Alert.alert('Pronto', 'Perfil atualizado!');
    } catch (e) {
      console.error('Erro ao salvar perfil', e);
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  };

  if (loading) return <Screen padded={false}><View style={p.center}><Text>Carregando…</Text></View></Screen>;

  return (
    <Screen>
      <Text style={p.title}>Meu Perfil</Text>
      {!!form.avatarUrl && <Image source={{ uri: form.avatarUrl }} style={p.avatar} />}

      <Text style={p.label}>Nome</Text>
      <TextInput style={p.input} value={form.name} onChangeText={(v)=>setForm({...form,name:v})} />

      <Text style={p.label}>Email</Text>
      <TextInput style={p.input} keyboardType="email-address" value={form.email} onChangeText={(v)=>setForm({...form,email:v})} />

      <Text style={p.label}>Avatar URL</Text>
      <TextInput style={p.input} value={form.avatarUrl} onChangeText={(v)=>setForm({...form,avatarUrl:v})} />

      <Button title="Salvar" onPress={save} variant="primary" style={{ marginTop: 8 }} />
    </Screen>
  );
}

const p = StyleSheet.create({
  center: { flex:1, alignItems:'center', justifyContent:'center' },
  title: { fontFamily: theme.font.bold, color: theme.colors.primary, fontSize: theme.font.size.lg, marginBottom: 12 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  label:{ fontFamily: theme.font.medium, color: theme.colors.muted, marginBottom: 6, marginTop: 8 },
  input:{
    height:48, borderWidth:1, borderColor: theme.colors.border, backgroundColor:'#fff',
    borderRadius: theme.radius.md, paddingHorizontal:12, fontFamily: theme.font.regular,
  },
});



import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { api } from '../services/api';
import theme from '../theme';

const logo = require('../assets/LogoSemFundo.png'); // ajuste o caminho se necessário

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = name.trim() && email.trim();

  const handleRegister = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      // Como ainda não temos /api/register, vamos usar /api/login como mock e salvar o "novo" usuário
      const { data } = await api.post('/api/login', { email: email.trim() });
      const user = { ...data.user, name: name.trim() }; // injeta o nome informado

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
      );
    } catch (e) {
      console.log('REGISTER_ERROR', e?.message || e);
      Alert.alert('Erro ao criar conta', 'Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={s.container}>
          <View style={s.header}>
            <Image source={logo} style={s.logo} />
            <Text style={s.title}>Criar conta</Text>
            <Text style={s.subtitle}>Junte-se ao EduFit</Text>
          </View>

          <View style={s.card}>
            <Text style={s.label}>Nome</Text>
            <TextInput
              style={s.input}
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
            />

            <Text style={[s.label, { marginTop: 10 }]}>E-mail</Text>
            <TextInput
              style={s.input}
              placeholder="voce@exemplo.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={[s.label, { marginTop: 10 }]}>Senha</Text>
            <TextInput
              style={s.input}
              placeholder="••••••••"
              secureTextEntry
              value={pass}
              onChangeText={setPass}
            />

            <TouchableOpacity
              onPress={handleRegister}
              disabled={!canSubmit || loading}
              style={[
                s.btn,
                { opacity: !canSubmit || loading ? 0.6 : 1 },
              ]}
            >
              <Text style={s.btnTxt}>{loading ? 'Criando…' : 'Criar conta'}</Text>
            </TouchableOpacity>

            <View style={s.divider} />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: theme.colors.muted }}>Já tem conta? </Text>
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={[s.link, { fontWeight: '700' }]}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={s.footer}>© {new Date().getFullYear()} EduFit</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'space-between' },
  header: { alignItems: 'center', marginTop: 24 },
  logo: { width: 72, height: 72, resizeMode: 'contain', marginBottom: 10 },
  title: { color: theme.colors.primary, fontFamily: theme.font.bold, fontSize: theme.font.size.lg },
  subtitle: { color: theme.colors.muted, marginTop: 4 },

  card: {
    backgroundColor: theme.colors.card,
    borderWidth: 1, borderColor: theme.colors.border,
    padding: 16, borderRadius: theme.radius.lg,
  },
  label: { color: theme.colors.text, marginBottom: 6 },
  input: {
    height: 48, borderWidth: 1, borderColor: theme.colors.border,
    borderRadius: 10, paddingHorizontal: 12, backgroundColor: '#fff',
  },
  link: { color: theme.colors.primary },
  btn: {
    marginTop: 14,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10, height: 48,
    alignItems: 'center', justifyContent: 'center',
  },
  btnTxt: { color: '#fff', fontWeight: '700' },
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 16 },
  footer: { textAlign: 'center', color: theme.colors.muted, marginBottom: 8 },
});


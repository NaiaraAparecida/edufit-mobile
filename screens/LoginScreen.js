// edufit-mobile/screens/LoginScreen.js
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
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { api } from '../services/api';
import theme from '../theme';

const logo = require('../assets/LogoSemFundo.png'); // ajuste se sua logo estiver em outro caminho

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState(''); // mock não usa, mas deixamos o campo
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim().length > 3;

  const handleForgot = () => {
    if (!email.trim()) {
      Alert.alert('Esqueci a senha', 'Digite seu e-mail para enviarmos instruções.');
      return;
    }
    Alert.alert(
      'Esqueci a senha',
      `Se o e-mail ${email.trim()} estiver cadastrado, enviaremos instruções.`
    );
  };

  const handleLogin = async () => {
    if (!canSubmit || loading) return;
    setLoading(true);
    try {
      // 1) Teste de conexão (GET simples)
      await api.get('/api/videos');

      // 2) Login (POST)
      const { data } = await api.post('/api/login', { email: email.trim() });

      // 3) Persistência
      await AsyncStorage.multiSet([
        ['token', data.token],
        ['user', JSON.stringify(data.user)],
      ]);

      // 4) Navegação (reset histórico)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        })
      );
    } catch (e) {
      console.log('LOGIN_ERROR', e?.message || e);
      Alert.alert(
        'Não foi possível entrar',
        `Verifique se o servidor web está rodando em ${api.defaults.baseURL}.\n\n` +
        `Detalhe: ${e?.message || 'erro desconhecido'}`
      );
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
          {/* Header */}
          <View style={s.header}>
            <Image source={logo} style={s.logo} />
            <Text style={s.title}>Bem-vinda ao EduFit</Text>
            <Text style={s.subtitle}>Entre para continuar seus treinos</Text>
          </View>

          {/* Card de Login */}
          <View style={s.card}>
            <Text style={s.label}>E-mail</Text>
            <TextInput
              style={s.input}
              placeholder="voce@exemplo.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
            />

            <Text style={[s.label, { marginTop: 10 }]}>Senha</Text>
            <TextInput
              style={s.input}
              placeholder="••••••••"
              secureTextEntry
              value={pass}
              onChangeText={setPass}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <TouchableOpacity onPress={handleForgot} style={{ alignSelf: 'flex-end', marginTop: 8 }}>
              <Text style={s.link}>Esqueci a senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={!canSubmit || loading}
              style={[s.btn, { opacity: !canSubmit || loading ? 0.6 : 1 }]}
            >
              {loading ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <ActivityIndicator color="#fff" />
                  <Text style={s.btnTxt}>Entrando…</Text>
                </View>
              ) : (
                <Text style={s.btnTxt}>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={s.divider} />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: theme.colors.muted }}>Não tem conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[s.link, { fontWeight: '700' }]}>Criar conta</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Rodapé */}
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
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    borderRadius: theme.radius.lg,
  },
  label: { color: theme.colors.text, marginBottom: 6 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  link: { color: theme.colors.primary },
  btn: {
    marginTop: 14,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: { color: '#fff', fontWeight: '700' },
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 16 },
  footer: { textAlign: 'center', color: theme.colors.muted, marginBottom: 8 },
});



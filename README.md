```md
# EduFit (Mobile)
Aplicativo **mobile** do EduFit com **React Native (Expo)**.  
Consome as APIs do projeto web e entrega **Login**, **Vídeos**, **Desafios**, **Chat**, **IA (mock)** e **Perfil**.

## ✨ Destaques
- Expo (React Native)
- Navegação com `@react-navigation/*`
- Axios com baseURL configurável por ambiente
- Tema unificado (azul/laranja EduFit)
- Login mock salvando `token` e `user` no `AsyncStorage`
- Pronto para **EAS Build** (APK de testes)

## 🔧 Stack
- **RN/Expo**: expo, react-native, @expo/vector-icons
- **Navegação**: @react-navigation/native, stack, bottom-tabs
- **HTTP**: axios
- **Storage**: @react-native-async-storage/async-storage

## 📁 Estrutura

 screens/
LoginScreen.js
RegisterScreen.js
HomeScreen.js
VideoTutorialScreen.js
ChallengesScreen.js
ChatScreen.js
AIResponseScreen.js
ProfileScreen.js

navigation/
MainTabs.js

services/
api.js # axios baseURL por ambiente

components/
HeaderLogo.js
AvatarHeader.js

theme.js
App.js
index.js


## ▶️ Rodando localmente
```bash
# 1) instalar dependências
npm install

# 2) ajustar baseURL do axios conforme o ambiente (services/api.js)
#   Android emulador: http://10.0.2.2:3000
#   iOS simulator:    http://localhost:3000
#   Celular físico:   http://SEU_IP_DA_MAQUINA:3000

# 3) iniciar
npx expo start -c

# 4) abrir no Expo Go (QR) ou emulador

services/api.js (exemplo)
import axios from "axios";
import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export const api = axios.create({ baseURL, timeout: 12000 });

🔐 Fluxo de login (mock)

POST /api/login → { token, user }

LoginScreen salva token/user no AsyncStorage e faz reset para MainTabs.

📲 Telas

Login / Registro: validação básica, “Esqueci a senha” (mock)

Vídeos: lista com player

Desafios: GET/POST /api/challenges

Chat: GET/POST /api/messages + polling a cada 4s

IA (mock): POST /api/ai/assist → mostra resposta

Perfil: GET/PUT /api/me + avatar (URL)

🔁 Dicas de Ambiente

Garanta o edufit-web rodando (npm run dev) antes de testar o mobile

Teste rápido de conexão no emulador:

Android: abra o navegador do emulador em http://10.0.2.2:3000/api/videos

iOS: http://localhost:3000/api/videos

Celular físico: http://SEU_IP:3000/api/videos

🧪 Problemas comuns

Carregando infinito no login → baseURL errada (use 10.0.2.2 no Android emulador), servidor web parado, firewall

Preso no Splash → index.js faltando registerRootComponent(App) ou fontes/recursos não carregam

Erro de ícones/navegação → instale:

npx expo install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context @expo/vector-icons

📦 Build (EAS)
npm i -g eas-cli
eas login
# perfil preview para APK
echo '{
  "cli": { "version": ">= 3.18.0" },
  "build": { "preview": { "android": { "buildType": "apk" }, "ios": { "simulator": true } } }
}' > eas.json

eas build -p android --profile preview
# receberá um link para download do APK

🧭 Roadmap

 Apontar baseURL para deploy do web (Vercel)

 Auth real (Supabase Auth)

 Upload de avatar (Storage) com picker

 Push notifications (Expo Notifications)
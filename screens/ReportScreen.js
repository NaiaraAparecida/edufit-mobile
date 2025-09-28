import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, StyleSheet, FlatList, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import theme from '../theme';
import { api } from '../services/api';

export default function ReportScreen() {
  const [kpis, setKpis] = useState([]);
  const [series, setSeries] = useState([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [s1, s2] = await Promise.all([
          api.get('/api/reports/summary'),
          api.get('/api/reports/progress?range=30d'),
        ]);
        setKpis(s1.data.kpis || []);
        setSeries(s2.data.series || []);
      } finally { setBusy(false); }
    };
    load();
  }, []);

  if (busy) return <Screen><View style={st.center}><ActivityIndicator size="large"/><Text>Carregando…</Text></View></Screen>;

  return (
    <Screen>
      <Text style={st.title}>Relatórios</Text>

      <View style={st.grid}>
        {kpis.map(k => (
          <Card key={k.id} style={st.kpi}>
            <Text style={st.kpiLabel}>{k.label}</Text>
            <Text style={st.kpiValue}>{k.value}</Text>
          </Card>
        ))}
      </View>

      <Text style={[st.title, { marginTop: 16 }]}>Progresso (30d)</Text>
      <Card padded={false}>
        <FlatList
          data={series}
          keyExtractor={(i) => i.date}
          renderItem={({ item }) => (
            <View style={st.row}>
              <Text style={st.cell}>{item.date}</Text>
              <Text style={st.cell}>{item.value}</Text>
            </View>
          )}
        />
      </Card>
    </Screen>
  );
}

const st = StyleSheet.create({
  center:{ flex:1, alignItems:'center', justifyContent:'center' },
  title:{ fontFamily: theme.font.bold, color: theme.colors.primary, fontSize: theme.font.size.lg, marginBottom:12 },
  grid:{ flexDirection:'row', flexWrap:'wrap', gap:12 },
  kpi:{ width:'48%' },
  kpiLabel:{ color: theme.colors.muted, fontFamily: theme.font.medium },
  kpiValue:{ fontSize:20, fontFamily: theme.font.bold, marginTop:4, color: theme.colors.text },
  row:{ flexDirection:'row', justifyContent:'space-between', paddingVertical:12, paddingHorizontal:12, borderBottomWidth:1, borderColor: theme.colors.border },
  cell:{ color: theme.colors.text, fontFamily: theme.font.regular },
});



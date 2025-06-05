import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View, ActivityIndicator, Alert } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignOutButton from '../../../components/btn/SignOutButton';
import { useChild } from '../../../context/ChildContext';

const ReportScreen = () => {
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { activeChild } = useChild();
  const [tempo, setTempo] = useState<number[]>([]);
  const [desempenho, setDesempenho] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const generos = ['Memória', 'Lógica', 'Rotina'];

  const chartConfig = {
    backgroundColor: '#FCFCFE',
    backgroundGradientFrom: '#FCFCFE',
    backgroundGradientTo: '#FCFCFE',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(115, 85, 115, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    barPercentage: 1,
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: '#6366F1',
      strokeDasharray: '10 5',
    },
    propsForLabels: { fontSize: 15 },
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        if (!activeChild) {
          Alert.alert('Erro', 'Nenhuma criança ativa selecionada.');
          return;
        }

        const response = await fetch(`https://SEU_BACKEND_API/relatorio/${activeChild.id}`);
        if (!response.ok) throw new Error('Erro na API');

        const data = await response.json();

        setTempo(data.tempo ?? [0, 0, 0]);
        setDesempenho(data.desempenho ?? [0, 0, 0]);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Erro ao carregar dados do relatório');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [activeChild]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#787ED8" />
      </View>
    );
  }

  return (
    <View
      className="flex-1 items-center"
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <SignOutButton />

      <Text
        className="font-FlamanteBook text-2xl text-[#787ED8] mb-20"
        style={{
          color: '#787ED8',
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 7,
        }}
      >
        Relatório
      </Text>

      <Text className="font-FlamanteBook text-xl">Tempo de Uso</Text>
      <View className="mb-20" style={styles.chartContainer}>
        <BarChart
          data={{
            labels: generos,
            datasets: [{ data: tempo }],
          }}
          width={screenWidth - 32}
          height={220}
          fromZero
          chartConfig={chartConfig}
          showValuesOnTopOfBars
          withInnerLines
        />
      </View>

      <Text className="font-FlamanteBook text-xl">Desempenho</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={{
            labels: generos,
            datasets: [{ data: desempenho }],
          }}
          width={screenWidth - 32}
          height={220}
          fromZero
          chartConfig={chartConfig}
          showValuesOnTopOfBars
          withInnerLines
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FCFCFE',
  },
  chartContainer: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#6366F1',
    padding: 8,
  },
});

export default ReportScreen;

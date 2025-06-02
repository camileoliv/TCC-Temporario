import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { BarChart } from 'react-native-chart-kit';
import Constants from 'expo-constants';
import SignOutButton from '../../components/SignOutButton';

const screenWidth = Dimensions.get('window').width;

export default function RelatorioScreen() {
  const generos = ['Memória', 'Cognitivo', 'Rotina'];

  const dados = {
    tempo: [10, 70, 20],
    desempenho: [60, 80, 40],
  };

  const chartConfig = {
    backgroundGradientFrom: '#edcbff',
    backgroundGradientTo: '#8701cb',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(128, 3, 121, 1, ${opacity})`,
    barPercentage: 0.6,
    propsForBackgroundLines: {
      stroke: '#8003bf',
    },
  };

  const statusBarHeight = Constants.statusBarHeight;

    useEffect(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }, []);
  
  return (
<View className='
    w-full px-4'style={{ marginTop: statusBarHeight + 1, backgroundColor: '#FCFCFE'}}>
        <SignOutButton/>
      <Text style={styles.title}>Relatório de Desempenho</Text>

      
      <Text style={styles.subtitulo}>Tempo de Uso</Text>
      <BarChart
        data={{
          labels: generos,
          datasets: [{ data: dados.tempo }],
        }}
        width={screenWidth - 40}
        height={220}
        fromZero
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        showValuesOnTopOfBars
        style={{
          borderRadius: 10,
          marginBottom: 20,
        }}
      />


      <Text style={styles.subtitulo}>Desempenho</Text>
    <BarChart
      data={{
        labels: generos,
        datasets: [{ data: dados.desempenho }],
      }}
      width={screenWidth - 40}
      height={220}
      fromZero
      yAxisLabel=""
      yAxisSuffix=""
      chartConfig={chartConfig}
      showValuesOnTopOfBars
      style={{
        borderRadius: 10,
        marginBottom: 20,
      }}
    />

</View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  botaoGenero: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 5,
  },
  botaoSelecionado: {
    backgroundColor: '#4C9AFF',
  },
  textoBotao: {
    color: '#333',
    fontWeight: '500',
  },
  textoSelecionado: {
    color: '#fff',
    fontWeight: '600',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
  },
  grafico: {
    borderRadius: 10,
    marginBottom: 20,
  },
});

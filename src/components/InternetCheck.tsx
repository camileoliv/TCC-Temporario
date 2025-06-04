import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const CheckInternet = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (isConnected === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>⚠️ Sem conexão com a internet</Text>
        <Text style={styles.subtext}>Conecte-se para usar o Temoco.</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default CheckInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
});

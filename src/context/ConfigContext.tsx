import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Brightness from 'expo-brightness';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FonteOption = 'pequena' | 'media' | 'grande';

const fonteMap = {
  pequena: 12,
  media: 16,
  grande: 20,
};

type Config = {
  brilho: number;
  setBrilho: (value: number) => void;
  fonte: FonteOption;
  fontSize: number;
  setFonte: (value: FonteOption) => void;
};

const ConfigContext = createContext<Config | undefined>(undefined);

const STORAGE_KEY = '@app_config';

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [brilho, setBrilhoState] = useState(1);
  const [fonte, setFonte] = useState<FonteOption>('media');

  const fontSize = fonteMap[fonte];

  const setBrilho = (value: number) => {
    setBrilhoState(value);
    Brightness.setBrightnessAsync(value);
  };

  // 🔥 Carregar configuração salva localmente
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          if (data?.brilho != null) {
            setBrilho(data.brilho);
          }
          if (data?.fonte) {
            setFonte(data.fonte);
          }
        }
      } catch (error) {
        console.log('Erro ao carregar config local:', error);
      }
    };
    loadConfig();
  }, []);

  // 🔥 Salvar sempre que houver alteração
  useEffect(() => {
    const saveConfig = async () => {
      const data = { brilho, fonte };
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.log('Erro ao salvar config local:', error);
      }
    };
    saveConfig();
  }, [brilho, fonte]);

  return (
    <ConfigContext.Provider value={{ brilho, setBrilho, fonte, fontSize, setFonte }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig deve estar dentro de ConfigProvider');
  }
  return context;
};

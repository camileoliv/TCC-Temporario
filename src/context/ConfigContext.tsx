import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Brightness from 'expo-brightness';

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

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [brilho, setBrilhoState] = useState(1);
  const [fonte, setFonte] = useState<FonteOption>('media');

  const fontSize = fonteMap[fonte];

  const setBrilho = (value: number) => {
    setBrilhoState(value);
    Brightness.setBrightnessAsync(value);
  };

  useEffect(() => {
    const fetchConfig = async () => {
      const userId = 'id-da-crianca'; // ← Substituir pela lógica real
      try {
        const res = await fetch(`https://seu-backend.com/api/config/${userId}`);
        const data = await res.json();
        if (data?.brilho != null) {
          setBrilho(data.brilho);
        }
        if (data?.fonte) {
          setFonte(data.fonte);
        }
      } catch (error) {
        console.log('Erro ao buscar config:', error);
      }
    };

    fetchConfig();
  }, []);

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

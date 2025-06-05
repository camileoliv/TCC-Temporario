import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FonteOption = 'pequena' | 'media' | 'grande';

const fonteMap = {
  pequena: 12,
  media: 16,
  grande: 20,
};

type FontSizeContextType = {
  fonte: FonteOption;
  fontSize: number;
  setFonte: (fonte: FonteOption) => void;
};

const FontSizeContext = createContext<FontSizeContextType>({
  fonte: 'media',
  fontSize: fonteMap['media'],
  setFonte: () => {},
});

const STORAGE_KEY = '@font_size';

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [fonte, setFonteState] = useState<FonteOption>('media');

  const fontSize = fonteMap[fonte];

  // 🔥 Carregar do AsyncStorage
  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (['pequena', 'media', 'grande'].includes(parsed?.fonte)) {
            setFonteState(parsed.fonte as FonteOption);
          }
        }
      } catch (err) {
        console.log('Erro ao carregar fonte:', err);
      }
    };
    load();
  }, []);

  // 🔥 Salvar no AsyncStorage
  const setFonte = (newFonte: FonteOption) => {
    setFonteState(newFonte);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ fonte: newFonte })).catch(err =>
      console.log('Erro ao salvar fonte:', err)
    );
  };

  return (
    <FontSizeContext.Provider value={{ fonte, fontSize, setFonte }}>
      {children}
    </FontSizeContext.Provider>
  );
};

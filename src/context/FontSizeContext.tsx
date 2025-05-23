import React, { createContext, useContext, useState, ReactNode } from 'react';

type FonteOption = 'pequena' | 'media' | 'grande';

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

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [fonte, setFonte] = useState<FonteOption>('media');

  const fontSize = fonteMap[fonte];

  return (
    <FontSizeContext.Provider value={{ fonte, fontSize, setFonte }}>
      {children}
    </FontSizeContext.Provider>
  );
};
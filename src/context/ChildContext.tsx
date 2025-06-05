import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Brightness from 'expo-brightness';

export type FonteOption = 'pequena' | 'media' | 'grande';

export type Config = {
  brilho: number;
  fonte: FonteOption;
  musica: boolean;
  sons: boolean;
  trancarVolume: boolean;
};

export type Child = {
  id: string;
  nome: string;
  config: Config;
};

type ChildContextType = {
  children: Child[];
  activeChild: Child | null;
  setActiveChild: (id: string) => void;
  addChild: (child: Child) => void;
  updateChild: (id: string, updates: Partial<Child>) => void;
  removeChild: (id: string) => void;
};

const ChildContext = createContext<ChildContextType>({} as ChildContextType);

export const ChildProvider = ({ children: appChildren }: { children: React.ReactNode }) => {
  const [children, setChildren] = useState<Child[]>([]);
  const [activeChildId, setActiveChildId] = useState<string | null>(null);

  const storageKey = '@myapp:children';

  const isValidFonte = (value: any): value is FonteOption =>
    ['pequena', 'media', 'grande'].includes(value);

  // 🔥 Parser seguro
  const parseChild = (data: any): Child => {
    return {
      id: data.id,
      nome: data.nome,
      config: {
        brilho: data.config?.brilho ?? 1,
        fonte: isValidFonte(data.config?.fonte) ? data.config.fonte : 'media',
        musica: data.config?.musica ?? true,
        sons: data.config?.sons ?? true,
        trancarVolume: data.config?.trancarVolume ?? false,
      },
    };
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await AsyncStorage.getItem(storageKey);
        if (data) {
          const parsed = JSON.parse(data) as {
            children: any[];
            activeChildId: string | null;
          };

          const loadedChildren = parsed.children.map(parseChild);

          setChildren(loadedChildren);
          setActiveChildId(parsed.activeChildId);

          const active = loadedChildren.find(c => c.id === parsed.activeChildId);
          if (active) {
            await Brightness.setBrightnessAsync(active.config.brilho);
          }
        }
      } catch (e) {
        console.log('Erro ao carregar dados:', e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const save = async () => {
      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify({ children, activeChildId })
      );
    };
    save();
  }, [children, activeChildId]);

  const setActiveChild = (id: string) => {
    const found = children.find(c => c.id === id);
    if (found) {
      setActiveChildId(id);
      Brightness.setBrightnessAsync(found.config.brilho);
    }
  };

  const addChild = (child: Child) => {
    setChildren(prev => [...prev, child]);
    setActiveChildId(child.id);
    Brightness.setBrightnessAsync(child.config.brilho);
  };

  const updateChild = (id: string, updates: Partial<Child>) => {
    setChildren(prev =>
      prev.map(child => {
        if (child.id === id) {
          const updated = {
            ...child,
            ...updates,
            config: {
              ...child.config,
              ...(updates.config || {}),
              fonte: updates.config?.fonte
                ? (isValidFonte(updates.config.fonte) ? updates.config.fonte : child.config.fonte)
                : child.config.fonte,
            },
          };
          if (id === activeChildId && updates.config?.brilho !== undefined) {
            Brightness.setBrightnessAsync(updates.config.brilho);
          }
          return updated;
        }
        return child;
      })
    );
  };

  const removeChild = (id: string) => {
    setChildren(prev => prev.filter(c => c.id !== id));
    if (id === activeChildId) {
      setActiveChildId(null);
    }
  };

  const activeChild = children.find(c => c.id === activeChildId) || null;

  return (
    <ChildContext.Provider
      value={{
        children,
        activeChild,
        setActiveChild,
        addChild,
        updateChild,
        removeChild,
      }}
    >
      {appChildren}
    </ChildContext.Provider>
  );
};

export const useChild = () => useContext(ChildContext);

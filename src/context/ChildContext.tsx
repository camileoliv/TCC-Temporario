import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Child = {
  id: string;
  name: string;
  birthDate: string;
  config: {
    brilho: number;
    fonte: 'pequena' | 'media' | 'grande';
    musica: boolean;
    sons: boolean;
    trancarVolume: boolean;
  };
};

interface ChildContextType {
  childrenList: Child[];
  activeChild: Child | null;
  setActiveChild: (childId: string) => void;
  addChild: (child: Child) => void;
  updateChild: (childId: string, updatedChild: Partial<Omit<Child, 'config'>> & { config?: Partial<Child['config']> }) => void;
  removeChild: (childId: string) => void;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider = ({ children }: { children: React.ReactNode }) => {
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [activeChild, setActiveChildState] = useState<Child | null>(null);

  const STORAGE_KEY = '@childrenList';
  const ACTIVE_CHILD_KEY = '@activeChildId';

  // 🔥 Carregar dados locais na inicialização
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedChildren = await AsyncStorage.getItem(STORAGE_KEY);
        const storedActiveChildId = await AsyncStorage.getItem(ACTIVE_CHILD_KEY);

        if (storedChildren) {
          const parsedChildren: Child[] = JSON.parse(storedChildren);
          setChildrenList(parsedChildren);

          if (storedActiveChildId) {
            const active = parsedChildren.find(c => c.id === storedActiveChildId);
            setActiveChildState(active || null);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados locais', error);
      }
    };

    loadData();
  }, []);

  // 🔥 Salvar lista de crianças sempre que mudar
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(childrenList));
  }, [childrenList]);

  // 🔥 Salvar criança ativa sempre que mudar
  useEffect(() => {
    if (activeChild) {
      AsyncStorage.setItem(ACTIVE_CHILD_KEY, activeChild.id);
    } else {
      AsyncStorage.removeItem(ACTIVE_CHILD_KEY);
    }
  }, [activeChild]);

  // 👉 Ativar criança
  const setActiveChild = (childId: string) => {
    const selected = childrenList.find(c => c.id === childId) || null;
    setActiveChildState(selected);
  };

  // 👉 Adicionar criança
  const addChild = (child: Child) => {
    if (childrenList.length >= 9) {
      console.warn('Limite de 9 crianças atingido.');
      return;
    }
    setChildrenList(prev => [...prev, child]);
  };

  // 👉 Atualizar criança (inclusive objetos aninhados como config)
  const updateChild = (
    childId: string,
    updatedChild: Partial<Omit<Child, 'config'>> & { config?: Partial<Child['config']> }
  ) => {
    setChildrenList(prev =>
      prev.map(c => {
        if (c.id === childId) {
          return {
            ...c,
            ...updatedChild,
            config: {
              ...c.config,
              ...(updatedChild.config || {}),
            },
          };
        }
        return c;
      })
    );

    if (activeChild?.id === childId) {
      setActiveChildState(prev => {
        if (!prev) return null;
        return {
          ...prev,
          ...updatedChild,
          config: {
            ...prev.config,
            ...(updatedChild.config || {}),
          },
        };
      });
    }
  };

  // 👉 Remover criança
  const removeChild = (childId: string) => {
    setChildrenList(prev => prev.filter(c => c.id !== childId));
    if (activeChild?.id === childId) {
      setActiveChildState(null);
    }
  };

  return (
    <ChildContext.Provider
      value={{
        childrenList,
        activeChild,
        setActiveChild,
        addChild,
        updateChild,
        removeChild,
      }}
    >
      {children}
    </ChildContext.Provider>
  );
};

export const useChild = () => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error('useChild deve ser usado dentro de ChildProvider');
  }
  return context;
};

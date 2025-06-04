import React, { createContext, useContext, useEffect, useState } from 'react';
import { useChild } from './ChildContext';

export type PersonagemType = {
  _id: string;
  nome: string;
  descricao: string;
  image: string;
  preco: number;
};

export type PersonagemStatus = {
  personagemId: string;
  desbloqueado: boolean;
};

type PersonagemContextType = {
  personagens: PersonagemType[];
  desbloqueados: string[]; // lista de ids dos personagens desbloqueados
  desbloquearPersonagem: (personagemId: string) => Promise<void>;
  isDesbloqueado: (personagemId: string) => boolean;
  carregarPersonagens: () => Promise<void>;
};

const PersonagemContext = createContext<PersonagemContextType>({} as PersonagemContextType);

export const usePersonagem = () => useContext(PersonagemContext);

export const PersonagemProvider = ({ children }: { children: React.ReactNode }) => {
  const { activeChild } = useChild();

  const [personagens, setPersonagens] = useState<PersonagemType[]>([]);
  const [desbloqueados, setDesbloqueados] = useState<string[]>([]);

  const API_URL = 'https://SEU_BACKEND/personagem'; // Altere para sua API

  // 🔄 Carregar todos os personagens
  const carregarPersonagens = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      const data = await res.json();
      setPersonagens(data);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    }
  };

  // 🔑 Carregar personagens desbloqueados da criança ativa
  const carregarDesbloqueados = async () => {
    if (!activeChild) return;
    try {
      const res = await fetch(`${API_URL}/desbloqueados/${activeChild.id}`);
      const data = await res.json();
      const idsDesbloqueados = data.map((item: { personagemId: string }) => item.personagemId);
      setDesbloqueados(idsDesbloqueados);
    } catch (error) {
      console.error('Erro ao buscar personagens desbloqueados:', error);
    }
  };

  // ✅ Verificar se personagem está desbloqueado
  const isDesbloqueado = (personagemId: string) => {
    return desbloqueados.includes(personagemId);
  };

  // 🔓 Desbloquear personagem
  const desbloquearPersonagem = async (personagemId: string) => {
    if (!activeChild) return;
    try {
      const res = await fetch(`${API_URL}/desbloquear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childId: activeChild.id,
          personagemId,
        }),
      });

      if (res.ok) {
        setDesbloqueados((prev) => [...prev, personagemId]);
      } else {
        console.error('Erro ao desbloquear personagem');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    carregarPersonagens();
    carregarDesbloqueados();
  }, [activeChild]);

  return (
    <PersonagemContext.Provider
      value={{
        personagens,
        desbloqueados,
        desbloquearPersonagem,
        isDesbloqueado,
        carregarPersonagens,
      }}
    >
      {children}
    </PersonagemContext.Provider>
  );
};

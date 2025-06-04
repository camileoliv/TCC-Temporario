import React, { createContext, useContext, useEffect, useState } from 'react';
import { useChild } from './ChildContext';

export type EstadoConclusao = 'NÃO INICIADO' | 'EM ANDAMENTO' | 'CONCLUIDA';

export type Missao = {
  id: string;
  nomeMissao: string;
  descricao: string;
  nomeJogo: string;
  estadoConclusao: EstadoConclusao;
};

type MissaoContextType = {
  missoes: Missao[];
  atualizarEstado: (missaoId: string, novoEstado: EstadoConclusao) => void;
  carregarMissoes: () => Promise<void>;
};

const MissaoContext = createContext<MissaoContextType>({} as MissaoContextType);

export const useMissao = () => useContext(MissaoContext);

export const MissaoProvider = ({ children }: { children: React.ReactNode }) => {
  const { activeChild } = useChild();
  const [missoes, setMissoes] = useState<Missao[]>([]);

  const carregarMissoes = async () => {
    if (!activeChild) return;

    try {
      // 🔗 Fetch das missões genéricas
      const resMissao = await fetch('https://SEU_BACKEND_API/missoes');
      const missoesData = await resMissao.json();

      // 🔗 Fetch do progresso da criança
      const resProgresso = await fetch(`https://SEU_BACKEND_API/progresso/${activeChild.id}`);
      const progressoData = await resProgresso.json();

      const missoesComEstado: Missao[] = missoesData.map((missao: any) => {
        const progresso = progressoData.find((p: any) => p.missaoId === missao._id);
        return {
          id: missao._id,
          nomeMissao: missao.nomeMissao,
          descricao: missao.descricao,
          nomeJogo: missao.nomeJogo,
          estadoConclusao: progresso ? progresso.estadoConclusao : 'NÃO INICIADO',
        };
      });

      setMissoes(missoesComEstado);
    } catch (error) {
      console.error('Erro ao carregar missões:', error);
    }
  };

  const atualizarEstado = (missaoId: string, novoEstado: EstadoConclusao) => {
    setMissoes(prev =>
      prev.map(m =>
        m.id === missaoId ? { ...m, estadoConclusao: novoEstado } : m
      )
    );

    // 🔗 Atualizar no backend também
    fetch(`https://SEU_BACKEND_API/progresso/${activeChild?.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        missaoId,
        estadoConclusao: novoEstado,
      }),
    });
  };

  useEffect(() => {
    carregarMissoes();
  }, [activeChild]);

  return (
    <MissaoContext.Provider value={{ missoes, atualizarEstado, carregarMissoes }}>
      {children}
    </MissaoContext.Provider>
  );
};

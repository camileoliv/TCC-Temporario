import React, { useEffect, useState } from 'react';
import { Text, ScrollView, Pressable, Alert } from 'react-native';
import BrilhoSelector from '../../components/exp/BrilhoSelector';
import FonteSelector from '../../components/exp/FonteSelector';
import AudioSettings from '../../components/exp/AudioSettings';
import AudioManager from '../../components/exp/AudioManager';

type FonteOption = 'pequena' | 'media' | 'grande';

type Props = {
  childId: string;
};

export default function ConfigSalvas({ childId }: Props) {
  const [brilho, setBrilho] = useState(1);
  const [fonte, setFonte] = useState<FonteOption>('media');
  const [musica, setMusica] = useState(false);
  const [sons, setSons] = useState(false);
  const [trancarVolume, setTrancarVolume] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`https://SEU_BACKEND_API/criancas/${childId}`);
        const data = await res.json();
        setBrilho(data.brilho ?? 1);
        setFonte(data.fonte ?? 'media');
        setMusica(data.musica ?? false);
        setSons(data.sons ?? false);
        setTrancarVolume(data.trancarVolume ?? false);
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
      }
    };
    load();
  }, [childId]);

  const salvar = async () => {
    try {
      await fetch(`https://SEU_BACKEND_API/criancas/${childId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brilho,
          fonte,
          musica,
          sons,
          trancarVolume,
        }),
      });
      Alert.alert('Configurações atualizadas!');
    } catch (err) {
      Alert.alert('Erro ao salvar configurações');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="items-center justify-center px-6 py-8 bg-white">
      <Text className="text-xl font-bold mb-4">Editar Preferências da Criança</Text>

      <BrilhoSelector value={brilho} onChange={setBrilho} />
      <AudioSettings
        musica={musica}
        sons={sons}
        trancarVolume={trancarVolume}
        setMusica={setMusica}
        setSons={setSons}
        setTrancarVolume={setTrancarVolume}
      />
      <FonteSelector value={fonte} onChange={setFonte} />
      <AudioManager musica={musica} sons={sons} trancarVolume={trancarVolume} />

      <Pressable onPress={salvar} className="mt-10 bg-[#735573] px-6 py-3 rounded-2xl">
        <Text className="text-white text-base font-semibold">Salvar Alterações</Text>
      </Pressable>
    </ScrollView>
  );
}

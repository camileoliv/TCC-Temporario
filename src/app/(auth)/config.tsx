import React, { useState } from 'react';
import { Text, ScrollView, Pressable, Alert, View } from 'react-native';
import BrilhoSelector from '../../components/exp/BrilhoSelector';
import FonteSelector from '../../components/exp/FonteSelector';
import AudioSettings from '../../components/exp/AudioSettings';
import AudioManager from '../../components/exp/AudioManager';

type FonteOption = 'pequena' | 'media' | 'grande';

type Props = {
  childId: string;
};

export default function Config({ childId }: Props) {
  const [brilho, setBrilho] = useState(1);
  const [fonte, setFonte] = useState<FonteOption>('media');
  const [musica, setMusica] = useState(false);
  const [sons, setSons] = useState(false);
  const [trancarVolume, setTrancarVolume] = useState(false);

  const salvar = async () => {
    try {
      await fetch(`https://SEU_BACKEND_API/criancas/${childId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brilho,
          fonte,
          musica,
          sons,
          trancarVolume,
        }),
      });
      Alert.alert('Perfil criado com sucesso!');
    } catch (err) {
      Alert.alert('Erro ao criar o perfil');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-8 bg-white">
      <View className='items-center justify-center'>
        <Text className="text-xl font-bold mb-4">Configurar Perfil da Criança</Text>

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
          <Text className="text-white text-base font-semibold">Salvar Perfil</Text>
        </Pressable>        
      </View>
    </ScrollView>
  );
}

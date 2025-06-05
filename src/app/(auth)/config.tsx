import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import BrilhoSelector from '../../components/exp/BrilhoSelector';
import FonteSelector from '../../components/exp/FonteSelector';
import AudioSettings from '../../components/exp/AudioSettings';

import { useChild } from '../../context/ChildContext';

export default function ConfigScreen() {
  const { activeChild, updateChild } = useChild();

  if (!activeChild) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Nenhuma criança selecionada</Text>
      </View>
    );
  }

  const handleBrilhoChange = (value: number) => {
    updateChild(activeChild.id, {
      config: { ...activeChild.config, brilho: value },
    });
  };

  const handleFonteChange = (value: 'pequena' | 'media' | 'grande') => {
    updateChild(activeChild.id, {
      config: { ...activeChild.config, fonte: value },
    });
  };

  const handleAudioChange = (
    key: 'musica' | 'sons' | 'trancarVolume',
    value: boolean
  ) => {
    updateChild(activeChild.id, {
      config: { ...activeChild.config, [key]: value },
    });
  };

  const { brilho, fonte, musica, sons, trancarVolume } = activeChild.config;

  const salvar = async () => {
    router.push('/(auth)/loading');
  };

  return (
    <View
      className="flex-1 h-full items-center justify-center"
      style={{ backgroundColor: '#FCFCFE' }}
    >
      <Text
        className="text-[#787ED8] font-FlamanteBook text-2xl pb-32"
        style={{
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 7,
        }}
      >
        Personalize a experiência de seu filho!
      </Text>

      <View className="items-center justify-center mb-16">
        <Text className="font-FlamanteBook text-xl mb-8">Visual</Text>
        <BrilhoSelector value={brilho} onChange={handleBrilhoChange} />
      </View>

      <View className="items-center justify-center mb-16">
        <Text className="font-FlamanteBook text-xl mb-8">Efeito Sonoro</Text>
        <AudioSettings
          musica={musica}
          sons={sons}
          trancarVolume={trancarVolume}
          setMusica={(v) => handleAudioChange('musica', v)}
          setSons={(v) => handleAudioChange('sons', v)}
          setTrancarVolume={(v) => handleAudioChange('trancarVolume', v)}
        />
      </View>

      <View className="items-center justify-center">
        <Text className="font-FlamanteBook text-xl mb-8">Tamanho da fonte</Text>
        <FonteSelector value={fonte} onChange={handleFonteChange} />
      </View>

      <TouchableOpacity
        onPress={salvar}
        className="w-48 h-16 rounded-full flex-row items-center border-[5px] justify-center gap-2"
        style={{ backgroundColor: '#AFA8E8', borderColor: '#735573' }}
      >
        <Text className="font-GlutenExtraBold text-white text-2xl">Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

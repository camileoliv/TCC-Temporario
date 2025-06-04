import React, { useState } from 'react';
import { Text, Alert, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

import BrilhoSelector from '../../components/exp/BrilhoSelector';
import FonteSelector from '../../components/exp/FonteSelector';
import AudioSettings from '../../components/exp/AudioSettings';
import { AudioProvider, useAudio } from '../../context/AudioContext';
import { ConfigProvider } from '../../context/ConfigContext';

type FonteOption = 'pequena' | 'media' | 'grande';

function ConfigContent() {
  const params = useLocalSearchParams<{
    name: string;
    email: string;
    phone: string;
    cargo: string;
    password: string;
    nameChildren: string;
    birthDate: string;
    senhaMaeGanso: string;
    [key: string]: string | undefined;
  }>();

  const [brilho, setBrilho] = useState(1);
  const [fonte, setFonte] = useState<FonteOption>('media');
  const { musica, setMusica, sons, setSons, trancarVolume, setTrancarVolume } = useAudio();

  const salvar = async () => {
    const dataToSend = {
      name: params.name,
      email: params.email,
      phone: params.phone,
      cargo: params.cargo,
      password: params.password,
      nameChildren: params.nameChildren,
      birthDate: params.birthDate,
      senhaMaeGanso: params.senhaMaeGanso,

      anwers: Object.fromEntries(
        Object.entries(params).filter(
          ([key]) =>
            ![
              'name',
              'email',
              'phone',
              'cargo',
              'password',
              'nameChildren',
              'birthDate',
              'senhaMaeGanso',
            ].includes(key)
        )
      ),

      config: {
        brilho,
        fonte,
        musica,
        sons,
        trancarVolume,
      },
    };

    try {
      const response = await fetch('https://SEU_BACKEND_API/perfil',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        router.push('/(auth)/loading');
      } else {
        Alert.alert('Erro ao criar o perfil');
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Erro ao criar o perfil');
    }
  };

  return (
    <View className="flex-1 h-full items-center justify-center" style={{ backgroundColor: "#FCFCFE" }}>
      <Text className="text-[#787ED8] font-FlamanteBook text-2xl pb-32"
        style={{
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 7,
        }}>
        Personalize a experiência de seu filho!
      </Text>

      <View className="items-center justify-center mb-16">
        <Text className="font-FlamanteBook text-xl mb-8">Visual</Text>
        <BrilhoSelector/>
      </View>

      <View className="items-center justify-center mb-16">
        <Text className="font-FlamanteBook text-xl mb-8">Efeito Sonoro</Text>
        <AudioSettings />
      </View>

      <View className='items-center justify-center'>
        <Text className='font-FlamanteBook text-xl mb-8'>Tamanho da fonte</Text>
        <FonteSelector 
        value={fonte} onChange={setFonte}/>
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

export default function Config() {
  return (
    <ConfigProvider>
      <AudioProvider>
        <ConfigContent />
      </AudioProvider>
    </ConfigProvider>
  );
}
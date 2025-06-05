import React, { useState, useEffect } from 'react';
import { Text, Alert, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

import BrilhoSelector from '../../../components/exp/BrilhoSelector';
import FonteSelector from '../../../components/exp/FonteSelector';
import AudioSettings from '../../../components/exp/AudioSettings';

import { AudioProvider, useAudio } from '../../../context/AudioContext';
import { ConfigProvider } from '../../../context/ConfigContext';
import { useChild } from '../../../context/ChildContext';

import SignOutButton from '../../../components/btn/SignOutButton';

type FonteOption = 'pequena' | 'media' | 'grande';

function ConfigContent() {
  const params = useLocalSearchParams();
  const { activeChild, setActiveChild, addChild, updateChild } = useChild();
  const { musica, setMusica, sons, setSons, trancarVolume, setTrancarVolume } = useAudio();

  const [brilho, setBrilho] = useState(1);
  const [fonte, setFonte] = useState<FonteOption>('media');

  const isCadastro = !!params.name;

  useEffect(() => {
    if (!isCadastro && activeChild) {
      const { config } = activeChild;
      setBrilho(config.brilho);
      setFonte(config.fonte);
      setMusica(config.musica);
      setSons(config.sons);
      setTrancarVolume(config.trancarVolume);
    }
  }, [activeChild, isCadastro]);

  const salvar = async () => {
    const configData = {
      brilho,
      fonte,
      musica,
      sons,
      trancarVolume,
    };

    if (isCadastro) {
      const newChild = {
        id: Date.now().toString(),
        name: params.nameChildren as string,
        birthDate: params.birthDate as string,
        config: configData,
      };

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
        config: configData,
      };

      try {
        const response = await fetch('https://SEU_BACKEND_API/perfil', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          addChild(newChild);
          setActiveChild(newChild.id);
          router.push('/(auth)/loading');
        } else {
          Alert.alert('Erro ao criar o perfil');
        }
      } catch (err) {
        console.error('Error:', err);
        Alert.alert('Erro ao criar o perfil');
      }
    } else {
      if (activeChild) {
        updateChild(activeChild.id, { config: configData });
        Alert.alert('Configurações salvas com sucesso!');
        router.back();
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center" 
    style={{ backgroundColor: '#FCFCFE' }}>
      <SignOutButton />
      <Text
        className="text-[#787ED8] font-FlamanteBook text-2xl pb-32"
        style={{
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 7,
        }}
      >
        {isCadastro ? 'Personalize a experiência de seu filho!' : 'Configurações'}
      </Text>

      <View className="items-center justify-center mb-16">
        <Text className="font-FlamanteBook text-xl mb-8">Visual</Text>
        <BrilhoSelector value={brilho} onChange={setBrilho} />
      </View>

      <View className="items-center justify-center mb-16">
        <Text className="font-FlamanteBook text-xl mb-8">Efeito Sonoro</Text>
        <AudioSettings />
      </View>

      <View className="items-center justify-center">
        <Text className="font-FlamanteBook text-xl mb-8">Tamanho da fonte</Text>
        <FonteSelector value={fonte} onChange={setFonte} />
      </View>

      <TouchableOpacity
        onPress={salvar}
        className="w-48 h-16 rounded-full flex-row items-center border-[2px] justify-center gap-2"
        style={{ backgroundColor: 'white', borderColor: '#735573' }}
      >
        <Text className="font-FlamanteBook text-black text-xl">
          {isCadastro ? 'Finalizar' : 'Salvar'}
        </Text>
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

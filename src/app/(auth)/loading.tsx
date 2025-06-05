import { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';

import { useAudio, AudioProvider } from '../../context/AudioContext';
import { useConfig, ConfigProvider } from '../../context/ConfigContext';
import { useChild, ChildProvider } from '../../context/ChildContext';

function LoadingContent() {
  const router = useRouter();

  const { activeChild } = useChild();
  const { setBrilho, setFonte } = useConfig();
  const { setMusica, setSons, setTrancarVolume } = useAudio();

  const progress = useRef(new Animated.Value(0)).current;

  // ⚙️ Animação da barra de progresso
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  // 🔗 Simula carregamento dos dados locais
  useEffect(() => {
    if (activeChild) {
      const { config } = activeChild;

      if (config.brilho != null) setBrilho(config.brilho);
      if (config.fonte) setFonte(config.fonte);
      if (config.musica != null) setMusica(config.musica);
      if (config.sons != null) setSons(config.sons);
      if (config.trancarVolume != null) setTrancarVolume(config.trancarVolume);
    }

    const timer = setTimeout(() => {
      router.push('/(main)/menu');
    }, 3500); // ⏳ Antes de chegar a 100%, aos 95%

    return () => clearTimeout(timer);
  }, [activeChild]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '95%'],
  });

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-[#787ED8] font-CuteDino text-center text-lg px-8">
        Aguarde enquanto personalizamos a melhor rotina para o seu filho
      </Text>

      <View className="absolute bottom-36 items-center">
        <View className="w-64 h-6 bg-gray-200 rounded-full overflow-hidden">
          <Animated.View
            style={{
              width: widthInterpolated,
              height: '100%',
              backgroundColor: '#A3BC9A',
              borderRadius: 999,
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default function Loading() {
  return (
    <ChildProvider>
      <ConfigProvider>
        <AudioProvider>
          <LoadingContent />
        </AudioProvider>
      </ConfigProvider>
    </ChildProvider>
  );
}

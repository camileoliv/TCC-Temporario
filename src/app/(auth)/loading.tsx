import { useEffect, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';

import { useAudio, AudioProvider } from '../../context/AudioContext';
import { useConfig, ConfigProvider } from '../../context/ConfigContext';

function LoadingContent() {
  const router = useRouter();

  const { setBrilho, setFonte } = useConfig();
  const { setMusica, setSons, setTrancarVolume } = useAudio();

  const [progress] = useState(new Animated.Value(0));

  const childId = 'ID_DA_CRIANCA'; // ← Substituir pela lógica real

  // ⚙️ Animação da barra de progresso
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  // 🔗 Busca dados da API e atualiza os contextos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://SEU_BACKEND_API/criancas/${childId}`);
        const data = await res.json();

        if (data?.config) {
          if (data.config.brilho != null) setBrilho(data.config.brilho);
          if (data.config.fonte) setFonte(data.config.fonte);
          if (data.config.musica != null) setMusica(data.config.musica);
          if (data.config.sons != null) setSons(data.config.sons);
          if (data.config.trancarVolume != null) setTrancarVolume(data.config.trancarVolume);
        }

        setTimeout(() => {
          router.push('/(main)/menu');
        }, 5200);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [router, setBrilho, setFonte, setMusica, setSons, setTrancarVolume]);

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
    <ConfigProvider>
      <AudioProvider>
        <LoadingContent />
      </AudioProvider>
    </ConfigProvider>
  );
}
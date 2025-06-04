import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAudio } from '../../context/AudioContext';
import { useFontSize } from '../../context/FontSizeContext';
import { useChild } from '../../context/ChildContext';

export default function Menu() {
  const [coins, setCoins] = useState(null);
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(false);

  const { playEffect } = useAudio();
  const { fontSize } = useFontSize();
  const { activeChild } = useChild();

  const goToPerfil = () =>{
    playEffect(require('../../assets/audio/African4.mp3'))
    setTimeout(() => {
      router.navigate('/(main)/perfil');
    })
  }

  const gmViewPress = () => {
    playEffect(require('../../assets/audio/African4.mp3'));
    setTimeout(() => {
      router.navigate('/(main)/gameView');
    }, 400);
  };

  const goToMMG = () => {
    playEffect(require('../../assets/audio/African4.mp3'));
    setTimeout(() => {
      router.navigate('/(mmg)/acess');
    }, 400);
  };

  const tasksPress = () => {
    playEffect(require('../../assets/audio/African4.mp3'));
    setTimeout(() => {
      router.navigate('/(main)/tasks');
    }, 400);
  };

  const persosPress = () => {
    setTimeout(() => {
      router.navigate('/(main)/selection');
    }, 400);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#00ff00" />
        <Text className="text-white mt-4" style={{ fontSize }}>
          Carregando dados...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../../assets/images/BG_Blue.png')}
        resizeMode="cover"
        className="flex-1 justify-center items-center"
      >

        <View className="absolute top-4 left-4">
          <TouchableOpacity
          onPress={goToPerfil}>
          <View className="flex-row justify-start items-center bg-[#FFF7E4] w-[250px] h-[80px] rounded-3xl border-4 border-[#6C5671] gap-5">
            <Image
              source={require('../../assets/images/HuskySmile (2).png')}
              resizeMode="contain"
              className="w-[70px] h-[70px] rounded-2xl"
            />
            <Text
              className="font-CuteDino text-[#b0a9e4]"
              style={{
                fontSize: fontSize,
                textShadowColor: '#000',
                textShadowOffset: { width: 2, height: 1 },
                textShadowRadius: 9,
              }}
            >
              {activeChild?.name || 'Nome da Criança'}
            </Text>
          </View>            
          </TouchableOpacity>
        </View>

        <View className="absolute top-4 right-4 flex-row items-center">
          <View className="relative">
            <Image
              source={require('../../assets/images/moedas.png')}
              className="w-[209px] h-[80px]"
              resizeMode="contain"
            />
            <View className="absolute inset-0 justify-center items-center">
              <Text
                className="text-white font-CuteDino"
                style={{
                  fontSize: fontSize,
                  alignSelf: 'flex-end',
                  paddingEnd: 40,
                  textShadowColor: '#000',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                TMCOINS: {coins}
              </Text>
            </View>
          </View>

          <View className="relative ml-2">
            <Image
              source={require('../../assets/images/pontos.png')}
              className="w-[209px] h-[80px]"
              resizeMode="contain"
            />
            <View className="absolute inset-0 justify-center items-center">
              <Text
                className="text-white font-CuteDino"
                style={{
                  fontSize: fontSize,
                  textShadowColor: '#000',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                PONTOS: {points}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={goToMMG}>
            <Image
              source={require('../../assets/images/MMG.png')}
              className="w-[60px] h-[60px] ml-2"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View className="gap-20 items-center self-start ml-4">
          <TouchableOpacity onPress={persosPress} className="relative items-center">
            <Image
              source={require('../../assets/images/personagens.png')}
              className="w-[209px] h-[96px] -mb-[72px]"
              resizeMode="contain"
            />
            <View className="absolute left-0 right-0" style={{ top: 45 }}>
              <Text
                className="text-yellow-400 font-CuteDino text-center"
                style={{
                  fontSize,
                  textShadowColor: '#000',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                PERSONAGENS
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={tasksPress} className="relative items-center">
            <Image
              source={require('../../assets/images/missoes.png')}
              className="w-[209px] h-[96px] -mb-[72px]"
              resizeMode="contain"
            />
            <View className="absolute left-0 right-0" style={{ top: 50 }}>
              <Text
                className="text-yellow-400 font-CuteDino text-center"
                style={{
                  fontSize,
                  textShadowColor: '#000',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                TAREFAS
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={gmViewPress}
          className="absolute right-4 bottom-[-150px] z-10"
        >
          <Image
            source={require('../../assets/images/Play.png')}
            className="w-[300px] h-[400px]"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View
          pointerEvents="none"
          className="absolute top-15 left-0 right-0 bottom-0 justify-center items-center z-0"
        >
          <Image
            source={require('../../assets/images/huskyFront.png')}
            className="h-[380px]"
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </View>
  );
}
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAudio } from '../../context/AudioContext';
import { useFontSize } from '../../context/FontSizeContext';

export default function GameView() {
  const [selectedGame, setSelectedGame] = useState(null);
  const { playEffect } = useAudio();
  const { fontSize } = useFontSize();

  const games = {
    game1: 'https://asas-do-futuro.netlify.app/',
    game2: 'https://a-bagunca-de-koori.netlify.app/',
    game3: 'https://jogo-de-andrei.netlify.app/',
  };

  if (selectedGame) {
    return (
      <WebView
        source={{ uri: selectedGame }}
        style={{ flex: 1 }}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    );
  }

  const taskBtn = () => {
    playEffect(require('../../assets/audio/African3.mp3'));
    router.navigate("/(main)/tasks");
  };

  const goBackk = () => {
    playEffect(require('../../assets/audio/African3.mp3'));
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(main)/menu");
    }
  };

  return (
    <View className="flex flex-1">
      <ImageBackground
        source={require('../../assets/images/Background_Green.png')}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="flex-row items-center justify-between ml-4 mt-4">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={goBackk}>
              <Image
                source={require('../../assets/images/C_LeftArrow1.png')}
                className="w-[60px] h-[62px] mr-6"
              />
            </TouchableOpacity>

            <Text 
            className='font-CuteDino'
            style={{ fontSize }}>Escolha e Prepare-se!</Text>
          </View>

          <View className="relative">
            <TouchableOpacity onPress={taskBtn}>
              <Image
                source={require('../../assets/images/tasks.png')}
                className="w-[300px] h-[62px]"
                resizeMode="contain"
              />
              <View className="absolute inset-0 justify-center items-center">
                <Text 
                className='font-CuteDino'
                style={{ fontSize }}>Tarefas</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 flex-row items-center justify-center gap-20">
          <View className="flex-col items-center pl-10 pt-10 pb-10" style={{ width: '45%' }}>
            <TouchableOpacity
              className="bg-[#FFF7E4] w-full h-[40%] mb-10 rounded-2xl border-4 border-[#6C5671]"
              onPress={() => setSelectedGame(games.game1)}
            >
              <View className="flex-row items-center justify-start">
                <Image
                  source={require('../../assets/images/working.png')}
                  resizeMode="cover"
                  className="w-[200px] h-[80px] ml-5 mt-5 mr-5"
                  style={{ borderRadius: 10, overflow: 'hidden' }}
                />
                <Text 
                className='font-CuteDino'
                style={{ fontSize }}>Asas do Futuro</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#FFF7E4] w-full h-[40%] mb-10 rounded-2xl border-4 border-[#6C5671]"
              onPress={() => setSelectedGame(games.game2)}
            >
              <View className="flex-row items-center justify-start">
                <Image
                  source={require('../../assets/images/working.png')}
                  resizeMode="cover"
                  className="w-[200px] h-[80px] ml-5 mt-5 mr-5"
                  style={{ borderRadius: 10, overflow: 'hidden' }}
                />
                <Text
                className='font-CuteDino'
                style={{ fontSize }}>A Bagunca de Koori</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex-col items-center pr-10 pb-10 pt-10" style={{ width: '45%' }}>
            <TouchableOpacity
              className="bg-[#FFF7E4] w-full h-[40%] mb-10 rounded-2xl border-4 border-[#6C5671]"
              onPress={() => setSelectedGame(games.game3)}
            >
              <View className="flex-row items-center justify-start">
                <Image
                  source={require('../../assets/images/working.png')}
                  resizeMode="cover"
                  className="w-[200px] h-[80px] ml-5 mt-5 mr-5"
                  style={{ borderRadius: 10, overflow: 'hidden' }}
                />
                <Text 
                className='font-CuteDino'
                style={{ fontSize }}>Aventuras no Jardim</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-[#FFF7E4] w-full h-[40%] mb-10 rounded-2xl border-4 border-[#6C5671]">
              <View className="flex-row items-center justify-start">
                <Image
                  source={require('../../assets/images/working.png')}
                  resizeMode="cover"
                  className="w-[200px] h-[80px] ml-5 mt-5 mr-5"
                  style={{ borderRadius: 10, overflow: 'hidden' }}
                />
                <Text
                className='font-CuteDino'
                style={{ fontSize }}>Em breve</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

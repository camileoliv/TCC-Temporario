import React from "react";
import { router } from 'expo-router';
import { Image, ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { useFontSize } from '../../context/FontSizeContext';
import { useChild } from '../../context/ChildContext';
import { useAudio } from '../../context/AudioContext';

export default function Perfil() {
  const { fontSize } = useFontSize();
  const { activeChild } = useChild();
  const { playEffect } = useAudio();
  const name = activeChild?.name || "Nome da Criança";

  const goBackk = () => {
    playEffect(require('../../assets/audio/African3.mp3'));
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(main)/menu");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/Background_Green.png")}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      {/* Cabeçalho fixo no topo */}
      <View className="flex-row items-center mt-6 ml-6">
        <TouchableOpacity onPress={goBackk}>
          <Image
            source={require('../../assets/images/C_LeftArrow1.png')}
            className="w-[60px] h-[62px] mr-4"
          />
        </TouchableOpacity>
        <Text
          className="font-CuteDino text-black"
          style={{ fontSize }}
        >
          Bem-vindo ao perfil
        </Text>
      </View>

      {/* Conteúdo principal */}
      <View className="flex-1 flex-row p-10 pt-4">
        {/* Avatar e nome */}
        <View className="items-center justify-center mr-8">
          {/* Avatar com borda */}
          <View className="w-[200px] h-[200px] rounded-full border-4 border-[#6C5671] items-center justify-center">
            <Image
              source={require("../../assets/images/HuskySmile (2).png")}
              className="w-[190px] h-[190px] rounded-full"
              resizeMode="contain"
            />
          </View>

          {/* Barra com nome */}
          <View className="relative w-[280px] h-[40px] items-center justify-center mt-2">
            <Image
              source={require('../../assets/images/Bar-nome.png')}
              className="w-[280px] h-[40px]"
              resizeMode="contain"
            />
            <Text
              className="absolute font-CuteDino text-black"
              style={{ fontSize }}
            >
              {name}
            </Text>
          </View>
        </View>

        {/* Informações */}
        <View className="flex-1 items-center justify-center">
          {/* Pontos */}
          <View className="items-center mb-8">
            <Image
              source={require("../../assets/images/Star.png")}
              className="w-[60px] h-[60px] mb-2"
              resizeMode="contain"
            />
            <View className="bg-white px-4 py-2 rounded-3xl min-w-[150px] items-center shadow-md border-[4px] border-[#6C5671]">
              <Text className="font-CuteDino text-black" style={{ fontSize }}>
                Pontos: 50
              </Text>
            </View>
          </View>

          {/* Linha inferior */}
          <View className="flex-row justify-center gap-10">
            {/* Jogos */}
            <View className="items-center">
              <Image
                source={require("../../assets/images/Controle.png")}
                className="w-[60px] h-[60px] mb-2"
                resizeMode="contain"
              />
              <View className="bg-white px-4 py-2 rounded-3xl min-w-[150px] items-center shadow-md border-[4px] border-[#6C5671]">
                <Text className="font-CuteDino text-black" style={{ fontSize }}>
                  Jogos completos: 2
                </Text>
              </View>
            </View>

            {/* Tarefas */}
            <View className="items-center">
              <Image
                source={require("../../assets/images/Task.png")}
                className="w-[60px] h-[60px] mb-2"
                resizeMode="contain"
              />
              <View className="bg-white px-4 py-2 rounded-3xl min-w-[150px] items-center shadow-md border-[4px] border-[#6C5671]">
                <Text className="font-CuteDino text-black" style={{ fontSize }}>
                  Tarefas completas: 10
                </Text>
              </View>
            </View>

            {/* Skins */}
            <View className="items-center">
              <Image
                source={require("../../assets/images/Brabuletaas.png")}
                className="w-[100px] h-[60px] mb-2"
                resizeMode="contain"
              />
              <View className="bg-white px-4 py-2 rounded-3xl min-w-[150px] items-center shadow-md border-[4px] border-[#6C5671]">
                <Text className="font-CuteDino text-black" style={{ fontSize }}>
                  Skins adquiridas: 3
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

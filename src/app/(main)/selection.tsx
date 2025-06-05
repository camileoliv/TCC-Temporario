import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import { useFontSize } from '../../context/FontSizeContext';
import { useAudio } from '../../context/AudioContext';

export default function Personagens() {
  const { fontSize } = useFontSize();
  const { playEffect } = useAudio();

  const personagensLiberados = [1, 2, 3];
  const personagensBloqueados = [1, 2, 3];

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
      source={require("../../assets/images/Background_pink.png")}
      className="flex-1 bg-[#EFD9FF]"
      resizeMode="cover"
    >
      {/* Cabeçalho */}
      <View className="flex-row items-center mt-6 ml-6">
        <TouchableOpacity onPress={goBackk}>
          <Image
            source={require('../../assets/images/C_LeftArrow1.png')}
            className="w-[60px] h-[62px] mr-4"
          />
        </TouchableOpacity>
        <Text className="font-CuteDino text-black" style={{ fontSize }}>
          Personagens
        </Text>
      </View>

      {/* Conteúdo principal */}
      <View className="flex-1 flex-row p-5">

        {/* Painel dos personagens */}
        <View className="flex-[0.4] bg-[#E6E0CB] rounded-3xl p-5 mr-3 items-center justify-center border-[4px] border-[#6C5671]">
          <Text className="text-base font-CuteDino mb-10 bg-white px-2 py-1 rounded-lg border-[3px] border-[#6C5671]">
            Personagens liberados
          </Text>
          <View className="flex-row flex-wrap gap-2 justify-center">
            {personagensLiberados.map((_, i) => (
              <View
                key={`liberado-${i}`}
                className="w-[60px] h-[60px] bg-white rounded-lg justify-center items-center relative border-[3px] border-[#6C5671]"
              >
                <Image
                  source={require("../../assets/images/mingcute_dog-line.png")}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>

          <Text className="text-base font-CuteDino mt-5 mb-10 bg-white px-2 py-1 rounded-lg border-[3px] border-[#6C5671]">
            Personagens bloqueados
          </Text>
          <View className="flex-row flex-wrap gap-2 justify-center">
            {personagensBloqueados.map((_, i) => (
              <View
                key={`bloqueado-${i}`}
                className="w-[60px] h-[60px] bg-white rounded-lg justify-center items-center relative border-[3px] border-[#6C5671]"
              >
                <Image
                  source={require("../../assets/images/Group.png")}
                  className="w-10 h-10 opacity-30"
                  resizeMode="contain"
                />
                <Image
                  source={require("../../assets/images/jam_padlock-alt-f.png")}
                  className="w-4 h-4 absolute bottom-1 right-1"
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Painel selecionado */}
        <View className="flex-[0.6] bg-[#FFFAEC] border-[4px] border-[#6C5671] rounded-3xl p-5 justify-center">
          <View className="flex-row items-center justify-center">
            
            {/* Husky */}
            <Image
              source={require("../../assets/images/HuskySide.png")}
              className="w-[250px] h-[250px]"
              resizeMode="contain"
            />

            {/* Card Descrição */}
            <View className="relative items-center justify-center w-[300px] h-[300px] mr-10">
              <Image
                source={require('../../assets/images/Square-2.png')}
                className="absolute w-full h-full"
                resizeMode="contain"
              />
              <View className="items-center px-4 mr-5">
                <Text className="text-lg font-CuteDino text-[#1A2E1A] mb-2 text-center">
                  Lykos, o Husky
                </Text>
                <Text className="text-sm font-GlutenBold text-[#1A2E1A] text-center">
                  Lykos é um husky aventureiro que ama explorar e se divertir! Ele sabe que,
                  para vencer qualquer desafio, aprender é a maior aventura de todas.
                </Text>
              </View>
            </View>

          </View>
        </View>

      </View>
    </ImageBackground>
  );
}

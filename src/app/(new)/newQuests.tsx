import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import CustomButton from '../../components/btn/CustomButton';

export default function Questions() {
  const { nameChildren, birthDate } = useLocalSearchParams();

  const [answers, setAnswers] = useState({
    memoria: '',
    rotina: '',
    associacao: '',
  });

  const handleAnswer = (
    question: 'memoria' | 'rotina' | 'associacao',
    resposta: 'sim' | 'nao' | 'nao sei'
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: resposta,
    }));
    console.log('Respostas atualizadas:', { ...answers, [question]: resposta });
  };

  const handleSubmit = () => {
    if (!answers.memoria || !answers.rotina || !answers.associacao) {
      alert('Por favor, responda todas as perguntas!');
      return;
    }

    router.push({
      pathname: '/config',
      params: {
        nameChildren: nameChildren as string,
        birthDate: birthDate as string,
        memoria: answers.memoria,
        rotina: answers.rotina,
        associacao: answers.associacao,
      },
    });
  };

  return (
    <View
      className="flex flex-col h-full items-center justify-evenly pt-10"
      style={{ backgroundColor: '#FCFCFE' }}
    >
      <View className="flex flex-col gap-[1.8]">
        <Text
          className="font-FlamanteBook p-1 text-3xl text-center "
          style={{
            color: '#787ED8',
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 7,
          }}
        >
          Customize os jogos do seu filho!
        </Text>
        <Text
          className="font-FlamanteBook p-1 text-3xl text-center "
          style={{
            color: '#787ED8',
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 7,
          }}
        >
          Nos diga quais os aspectos devemos focar
        </Text>
      </View>

      <View className="flex flex-col justify-center items-center px-6">
        <Text className="text-black text-2xl text-center font-FlamanteBook pb-4">
          A criança consegue lembrar do que ouve ou vê por muito tempo?
        </Text>

        <View className="flex flex-row gap-10">
          <CustomButton
            value="nao"
            onPress={() => handleAnswer('memoria', 'nao')}
            title="Não"
            shouldChangeColor={true}
            activeBgColor="bg-[#F3D175]"
          />
          <CustomButton
            value="nao sei"
            onPress={() => handleAnswer('memoria', 'nao sei')}
            title="Não sei"
            shouldChangeColor={true}
            activeBgColor="bg-[#F3D175]"
          />
          <CustomButton
            value="sim"
            onPress={() => handleAnswer('memoria', 'sim')}
            title="Sim"
            shouldChangeColor={true}
            activeBgColor="bg-[#F3D175]"
          />
        </View>
      </View>

      <View className="flex flex-col justify-center items-center px-6">
        <Text className="text-black text-2xl text-center font-FlamanteBook pb-4">
          A criança consegue manter rotinas ao decorrer do dia?
        </Text>

        <View className="flex flex-row gap-10">
          <CustomButton
            value="nao"
            onPress={() => handleAnswer('rotina', 'nao')}
            title="Não"
            shouldChangeColor={true}
            activeBgColor="bg-[#F3D175]"
          />
          <CustomButton
            value="nao sei"
            onPress={() => handleAnswer('rotina', 'nao sei')}
            title="Não sei"
            shouldChangeColor={true}
            activeBgColor="bg-[#F3D175]"
          />
          <CustomButton
            value="sim"
            onPress={() => handleAnswer('rotina', 'sim')}
            title="Sim"
            shouldChangeColor={true}
            activeBgColor="bg-[#F3D175]"
          />
        </View>
      </View>

      <View className="flex flex-col justify-center items-center px-6">
        <Text className="text-black text-2xl text-center font-FlamanteBook pb-4">
          A criança consegue associar quantidade de objetos ou formas à números?
        </Text>

        <View className="flex flex-row gap-10">
          <CustomButton
            value="nao"
            onPress={() => handleAnswer('associacao', 'nao')}
            title="Não"
            shouldChangeColor={true}
            activeBgColor="bg-[#F3D175]"
          />
          <CustomButton
            value="nao sei"
            onPress={() => handleAnswer('associacao', 'nao sei')}
            title="Não sei"
            shouldChangeColor={true}
            activeBgColor="bg-[#F3D175]"
          />
          <CustomButton
            value="sim"
            onPress={() => handleAnswer('associacao', 'sim')}
            title="Sim"
            shouldChangeColor={true}
            activeBgColor="bg-[#F3D175]"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="justify-baseline items-baseline flex flex-row p-5"
      >
        <View
          className="w-48 h-16 rounded-full flex-row items-center border-[5px] justify-center gap-2"
          style={{ backgroundColor: '#AFA8E8', borderColor: '#735573' }}
        >
          <Text className="font-GlutenBold text-white text-2xl">
            Continuar
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
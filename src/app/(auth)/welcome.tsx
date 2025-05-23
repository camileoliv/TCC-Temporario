import { Link, router } from 'expo-router'
import React, { useState, useEffect } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView, Text, TouchableOpacity, Image, View } from 'react-native'

export default function Onboarding() {
 const [imageSource, setImageSource] = useState(require('../../assets/images/Butterfly-5.png'));

  const handlePress = () => {
    setImageSource(require('../../assets/images/Butterfly-11.png'));
    
    setTimeout(() => {
      router.navigate("/(main)/gameView");
    }, 900);
  };

    useEffect(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-20 items-center">
          <Text
            className="font-Cute p-1 text-3xl"
            style={{
              color: '#787ED8',
              textShadowColor: 'rgba(0, 0, 0, 0.1)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 7,
            }}>
            Inicie sua jornada!
          </Text>
          <Text
            className="font-Cute mx-4 p-1 text-center text-2xl"
            style={{
              color: '#787ED8',
              textShadowColor: 'rgba(0, 0, 0, 0.1)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 7,
            }}>
            Para o <Text className="text-yellow-400 font-GlutenExtraBold">TEMOCO</Text> ser o acompanhante leal do seu filho, precisamos que você, tutor, faça o cadastro e responda algumas perguntas!
          </Text>
        </View>
      </View>

      <View className="absolute bottom-10 w-full items-center">
        <TouchableOpacity
          onPress={handlePress}
          className="w-48 h-16 rounded-3xl flex-row items-center  border-[2.9px] justify-center gap-2"
          style={{backgroundColor: '#AFA8E8', borderColor: '#735573' }}
        >
          <Text className="font-GlutenExtraBold text-white text-2xl">Iniciar</Text>
          <Image source={imageSource} />
        </TouchableOpacity>

        <Link href="/(auth)/signIn" className="mt-4 text-center">
          <Text className="text-general-200 text-lg">
            Já tem uma conta?{' '}
            <Text className="text-yellow-400">Login</Text>
          </Text>
        </Link>
      </View> 
    </SafeAreaView>
  );
}
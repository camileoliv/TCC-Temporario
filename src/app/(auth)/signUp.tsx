import { Link, router } from 'expo-router'
import React, { useState, useEffect } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView, Text, TouchableOpacity, Image, View, Dimensions } from 'react-native'

export default function Onboarding() {
  const [imageSource, setImageSource] = useState(require('../../assets/images/Butterfly-1.png'));

  const handlePress = () => {
    setImageSource(require('../../assets/images/Butterfly-7.png'));
    setTimeout(() => {
      router.navigate("/(mmg)/coins");
    }, 500);
  };

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-16 items-center">
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
            Para o <Text className="text-yellow-400 font-Cute">TEMOCO</Text> ser o acompanhante leal do seu filho, precisamos que você, tutor, faça o cadastro e responda algumas perguntas!
          </Text>
        </View>

        <TouchableOpacity
          onPress={handlePress}
          className="w-48 h-16 rounded-full flex-row items-center border-[5px] justify-center gap-2"
          style={{ backgroundColor: '#AFA8E8', borderColor: '#735573' }}
        >
          <Text className="font-GlutenExtraBold text-white text-2xl">Iniciar</Text>
          <Image source={imageSource} />
        </TouchableOpacity>

        <Link href="/(auth)/signIn" className="mt-3">
          <Text className="text-general-200 text-base">
            Já tem uma conta?{' '}
            <Text className="text-yellow-400">Login</Text>
          </Text>
        </Link>
      </View>

      <Image
        source={require('../../assets/images/Animals.png')}
        style={{
          width: width * 0.85,        
          height: height * 0.4,       
          resizeMode: 'contain',
          position: 'absolute',
          bottom: -75,                
          right: -50,                 
        }}
      />
    </SafeAreaView>
  );
}

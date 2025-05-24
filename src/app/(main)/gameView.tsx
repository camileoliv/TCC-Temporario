import { router } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const goToGame1 = ()  => {
    
}

const goToGame2 = ()  => {

}

const goToGame3 = ()  => {

}

const goToGame4 = ()  => {

}

const goBackk = () => {
      if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(main)/menu"); 
    }
}
export default function GameView() {
        useEffect(() => {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
          return () => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
          };
        }, []);
  return (
    <View className='flex flex-1'>
      <View className='flex-row items-center justify-start ml-4 mt-4'>
        <TouchableOpacity
        onPress={goBackk}>        
        <Image
        source={require('../../assets/images/C_LeftArrow1.png')} 
        className='w-[60px] h-[62px] mr-6'
        />
        </TouchableOpacity>

        <Text>Escolha e Prepare-se!</Text>
      </View>

<View className="flex-1 flex-row items-center justify-center gap-20">
  <View className="flex-col items-center pl-10 pt-10 pb-10" style={{ width: '45%' }}>
    <TouchableOpacity 
      className="bg-red-500 w-full h-[40%] mb-10 rounded-lg" 
      onPress={goToGame1}
    >
      <Text>Asas do Futuro</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      className="bg-blue-500 w-full h-[40%] mb-10 rounded-lg"
      onPress={goToGame2}
    >
      <Text>A Bagunca de Koori</Text>
    </TouchableOpacity>
  </View>

  <View className="flex-col items-center pr-10 pb-10 pt-10" style={{ width: '45%' }}>
    <TouchableOpacity 
      className="bg-green-500 w-full h-[40%] mb-10 rounded-lg"
      onPress={goToGame3}
    >
      <Text>Jogo de Andrei</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      className="bg-yellow-500 w-full h-[40%] mb-10 rounded-lg"
      onPress={goToGame4}
    >
      <Text>Em breve</Text>
    </TouchableOpacity>
  </View>
</View>


    </View>
  )
}

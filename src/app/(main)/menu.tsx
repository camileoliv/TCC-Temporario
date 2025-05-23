import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { router } from 'expo-router';

export default function Menu() {

  const gmViewPress = () => {
    setTimeout(() => {
      router.navigate("/(main)/gameView");
    }, 900);
  };

  const goToMMG = () => {
    setTimeout(() => {
      router.navigate("/(mmg)/acess");
    }, 900);
  };

  const tasksPress = () => {
    setTimeout(() => {
      router.navigate("/(main)/tasks");
    }, 900);
  };

  const persosPress = () => {
    setTimeout(() => {
      router.navigate("/(main)/selection");
    }, 900);
  };

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../../assets/images/BG_Blue.png')}
        resizeMode="cover"
        className="flex-1 justify-center items-center"
      >
        
      <View className="flex-row absolute top-0 right-0 mt-4 mr-4 items-center">
        <Image 
          source={require('../../assets/images/Coins.png')}
          className="w-[209px] h-[80px] mx-[10px]"
          resizeMode="contain"
        />

        <Image
          source={require('../../assets/images/Points.png')}
          className="w-[209px] h-[80px] mx-[10px]"
          resizeMode="contain"
        />

        <TouchableOpacity onPress={goToMMG}>
          <Image
            source={require('../../assets/images/MMG.png')}
            className="w-[60px] h-[60px] ml-[10px] mr-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View className='gap-20 items-start self-start ml-4'>
        <TouchableOpacity onPress={persosPress}>
          <Image 
            source={require('../../assets/images/Persos.png')}
            className="w-[209px] h-[80px] -mb-[72px]"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={tasksPress}>
          <Image
            source={require('../../assets/images/Tasks.png')}
            className="w-[209px] h-[96px] -mb-[72px]"
            resizeMode="contain"
          />
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

      <View className='absolute top-15 left-0 right-0 bottom-0 justify-center items-center z-0'>
        <Image 
        source={require('../../assets/images/huskyFront.png')}          className="h-[380px]"
        resizeMode="contain"
        />
      </View>
        
      </ImageBackground>
    </View>
  );
}
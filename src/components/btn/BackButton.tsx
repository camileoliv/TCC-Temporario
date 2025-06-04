import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { useRouter } from 'expo-router';

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(main)/menu');
    }
  };

  return (
    <View className="absolute top-5 left-5 z-50">
      <TouchableOpacity onPress={handleGoBack}>
        <Image
          source={require('../../assets/images/C_LeftArrow1.png')}
          className="w-[60px] h-[62px]"
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
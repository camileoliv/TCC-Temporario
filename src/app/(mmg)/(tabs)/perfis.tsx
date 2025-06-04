import Constants from 'expo-constants';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SignOutButton from '../../../components/btn/SignOutButton';

const statusBarHeight = Constants.statusBarHeight;

const goToNew = () => {
  router.navigate('/(new)/newSignUp')
}

export default function Perfis() {

  return (
    <View className='
    w-full px-4'style={{ marginTop: statusBarHeight + 1}}>
      <SignOutButton/>




      <View className='items-center justify-center'>
        <Text>
          Para adicionar uma nova criança precisa cadastrar ela {'\n'}
          deseja fazer o novo cadastro agora?
        </Text>
      <View className='bg-white rounded-full border-[#F2F0F8] border-[3px] w-[180px] h-[50px] items-center justify-center'>
        <TouchableOpacity
        onPress={goToNew}>
          <Text className='font-FlamanteBook text-lg'>Sim</Text>
        </TouchableOpacity>
      </View>                
      </View>
    </View>
  )
}

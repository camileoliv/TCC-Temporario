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



        <Text>
          Para adicionar uma nova criança precisa cadastrar ela {'\n'}
          deseja fazer o novo cadastro agora?
        </Text>
      <TouchableOpacity
      onPress={goToNew}>
        <Text>Sim</Text>
      </TouchableOpacity>
    </View>
  )
}
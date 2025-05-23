import { View, Text } from 'react-native'
import React, { useEffect}from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import SignOutButton from '../../../components/SignOutButton';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

export default function Perfis() {
    useEffect(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }, []);

  return (
    <View className='
    w-full px-4'style={{ marginTop: statusBarHeight + 1}}>
      <SignOutButton/>
      <Text>perfis</Text>
    </View>
  )
}
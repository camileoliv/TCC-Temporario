import Constants from 'expo-constants';
import React from 'react';
import { Text, View } from 'react-native';
import SignOutButton from '../../../components/btn/SignOutButton';

const statusBarHeight = Constants.statusBarHeight;

export default function Subs() {
  return (
    <View className='
    w-full px-4'style={{ marginTop: statusBarHeight + 1}}>
      <SignOutButton/>
      <Text>subs</Text>
    </View>
  )
}
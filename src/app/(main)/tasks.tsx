import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Missions() {
    useEffect(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      return () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      };
    }, []);    
  return (
    <View>
      <Text>missions</Text>
    </View>
  )
}
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Brightness from 'expo-brightness';

type Props = {
  value: number;
  onChange: (val: number) => void;
};

export default function BrilhoSelector({ value, onChange }: Props) {
  useEffect(() => {
    Brightness.setBrightnessAsync(value);
  }, [value]);

  return (
    <View className="mt-4">
      <Text className="text-base font-medium">Brilho</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#FFD700"
        maximumTrackTintColor="#000"
      />
      <Text className="text-sm mt-1">Valor atual: {value.toFixed(2)}</Text>
    </View>
  );
}
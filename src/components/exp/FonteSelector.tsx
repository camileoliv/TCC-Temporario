import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

type FonteOption = 'pequena' | 'media' | 'grande';

type Props = {
  value: FonteOption;
  onChange: (val: FonteOption) => void;
};

const fonteLabels = {
  pequena: 0,
  media: 1,
  grande: 2,
};

export default function FonteSelector({ value, onChange }: Props) {
  const handleChange = (newValue: number) => {
    const newFonte = Object.keys(fonteLabels)[newValue] as FonteOption;
    onChange(newFonte);
  };

  return (
    <View className="mt-4">
      <View className="flex-row justify-between px-2 mt-1">
        <Text className="font-FlamanteBook text-lg">pequena</Text>
        <Text className="font-FlamanteBook text-lg">média</Text>
        <Text className="font-FlamanteBook text-lg">grande</Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={2}
        step={1}
        value={fonteLabels[value]}
        onValueChange={handleChange}
        style={{ width: 280, height: 40 }}
        thumbTintColor="#FFD700"
        minimumTrackTintColor="#FFD700"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
}

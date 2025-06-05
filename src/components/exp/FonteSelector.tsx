import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

export type FonteOption = 'pequena' | 'media' | 'grande';

type Props = {
  value: FonteOption;
  onChange: (value: FonteOption) => void;
};

const fonteLabels = {
  pequena: 0,
  media: 1,
  grande: 2,
} as const;

const labelToValue = {
  0: 'pequena',
  1: 'media',
  2: 'grande',
} as const;

export default function FonteSelector({ value, onChange }: Props) {
  const handleChange = (val: number) => {
    const newFonte = labelToValue[val as keyof typeof labelToValue];
    onChange(newFonte);
  };

  return (
    <View className="mt-4">
      <View className="flex-row justify-between px-2 mb-2">
        <Text className="font-FlamanteBook text-base">pequena</Text>
        <Text className="font-FlamanteBook text-base">média</Text>
        <Text className="font-FlamanteBook text-base">grande</Text>
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

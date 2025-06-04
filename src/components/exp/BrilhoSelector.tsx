import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { useConfig } from '../../context/ConfigContext';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function BrilhoSelector({ value, onChange }: Props) {
  return (
    <View style={{ marginTop: 20, width: 300, alignItems: 'center' }}>
      <Text className='font-FlamanteBook' style={{ fontSize: 16, marginBottom: 10 }}>
        brilho
      </Text>
      <Slider
        style={{ width: 250, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#FFD700"
        maximumTrackTintColor="#000"
        thumbTintColor="#FFD700"
      />
    </View>
  );
}

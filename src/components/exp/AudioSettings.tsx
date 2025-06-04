import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAudio } from '../../context/AudioContext';

const OptionButton = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className={`px-4 py-2 mx-1 rounded-md border-[2.8px] border-[#735573] ${
      selected ? 'bg-[#F3D175]' : 'bg-white'
    }`}
  >
    <Text className="text-base">{label}</Text>
  </Pressable>
);

export default function AudioSettings() {
  const { musica, sons, trancarVolume, setMusica, setSons, setTrancarVolume } = useAudio();

  return (
    <View className="mt-6 w-full">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="font-FlamanteBook text-lg">música</Text>
        <Text className="font-FlamanteBook text-lg">sons</Text>
        <Text className="font-FlamanteBook text-lg">trancar volume</Text>
      </View>
      <View className="flex-row justify-between gap-[10px]">
        <View className="flex-row">
          <OptionButton label="Sim" selected={musica === true} onPress={() => setMusica(true)} />
          <OptionButton label="Não" selected={musica === false} onPress={() => setMusica(false)} />
        </View>
        <View className="flex-row">
          <OptionButton label="Sim" selected={sons === true} onPress={() => setSons(true)} />
          <OptionButton label="Não" selected={sons === false} onPress={() => setSons(false)} />
        </View>
        <View className="flex-row">
          <OptionButton
            label="Sim"
            selected={trancarVolume === true}
            onPress={() => setTrancarVolume(true)}
          />
          <OptionButton
            label="Não"
            selected={trancarVolume === false}
            onPress={() => setTrancarVolume(false)}
          />
        </View>
      </View>
    </View>
  );
}

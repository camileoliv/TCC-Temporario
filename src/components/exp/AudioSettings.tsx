// components/exp/AudioSettings.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';

type Props = {
  musica: boolean;
  sons: boolean;
  trancarVolume: boolean;
  setMusica: (val: boolean) => void;
  setSons: (val: boolean) => void;
  setTrancarVolume: (val: boolean) => void;
};

const OptionButton = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
  <Pressable
    onPress={onPress}
    className={`px-4 py-2 mx-1 rounded-xl border border-[#735573] ${selected ? 'bg-[#F3D175]' : 'bg-white'}`}
  >
    <Text className="text-base">{label}</Text>
  </Pressable>
);

export default function AudioSettings({ musica, sons, trancarVolume, setMusica, setSons, setTrancarVolume }: Props) {
  return (
    <View className="mt-6 w-full">
      <Text className="text-base font-medium mb-2">Efeito Sonoro</Text>
      <View className="flex-row justify-between mb-1">
        <Text>Música</Text>
        <Text>Sons</Text>
        <Text>Trancar Volume</Text>
      </View>
      <View className="flex-row justify-between">
        {/* Música */}
        <View className="flex-row">
          <OptionButton label="Sim" selected={musica} onPress={() => setMusica(true)} />
          <OptionButton label="Não" selected={!musica} onPress={() => setMusica(false)} />
        </View>
        {/* Sons */}
        <View className="flex-row">
          <OptionButton label="Sim" selected={sons} onPress={() => setSons(true)} />
          <OptionButton label="Não" selected={!sons} onPress={() => setSons(false)} />
        </View>
        {/* Trancar volume */}
        <View className="flex-row">
          <OptionButton label="Sim" selected={trancarVolume} onPress={() => setTrancarVolume(true)} />
          <OptionButton label="Não" selected={!trancarVolume} onPress={() => setTrancarVolume(false)} />
        </View>
      </View>
    </View>
  );
}
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  label: string;
  value: 'sim' | 'nao' | null;
  onChange: (value: 'sim' | 'nao') => void;
};

export default function SimNaoToggle({ label, value, onChange }: Props) {
  return (
    <View className="mt-4">
      <Text className="text-base font-medium">{label}</Text>
      <View className="flex-row space-x-4 mt-2">
        {['sim', 'nao'].map((v) => (
          <TouchableOpacity
            key={v}
            className={`px-4 py-2 rounded ${value === v ? 'bg-blue-500' : 'bg-gray-300'}`}
            onPress={() => onChange(v as 'sim' | 'nao')}
          >
            <Text className="text-white capitalize">{v}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

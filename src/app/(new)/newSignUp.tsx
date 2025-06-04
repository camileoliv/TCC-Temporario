import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import DateInput from '../../components/verification/DateInput';
import InputField from '../../components/InputField';

export default function Registro() {
  const router = useRouter();

  const [form, setForm] = useState({
    nameChildren: '',
    birthDate: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleContinue = () => {
    if (!form.nameChildren || !form.birthDate) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    router.push({
      pathname: '/newQuests',
      params: {
        nameChildren: form.nameChildren,
        birthDate: form.birthDate,
      },
    });
  };

  return (
    <View
      className="flex-1 items-center justify-center px-6"
      style={{ backgroundColor: '#FCFCFE' }}
    >
      <View className="pb-10 m-5 gap-[1.8]">
        <Text
          className="font-FlamanteBook p-1 text-4xl text-center"
          style={{
            color: '#787ED8',
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 7,
          }}
        >
          Crie o perfil do seu filho
        </Text>
      </View>

      <View className="justify-center items-center gap-10">
        <InputField
          label="Nome da criança"
          placeholder="Digite o nome da criança"
          value={form.nameChildren}
          onChangeText={(value) => handleChange('nameChildren', value)}
          rightIcon={<FontAwesome6 name="children" size={27} color="#35AFA3" />}
        />

        <View className="my-2 w-full">
          <Text className="text-3xl text-left font-FlamanteBook mb-3">
            Data de nascimento
          </Text>
          <DateInput
            onDateChange={(formattedDate: string) =>
              handleChange('birthDate', formattedDate)
            }
          />
        </View>

        <TouchableOpacity
          onPress={handleContinue}
          className="w-48 h-16 rounded-full flex-row items-center border-[5px] justify-center gap-2"
          style={{ backgroundColor: '#AFA8E8', borderColor: '#735573' }}
        >
          <Text className="font-GlutenExtraBold text-white text-2xl">
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
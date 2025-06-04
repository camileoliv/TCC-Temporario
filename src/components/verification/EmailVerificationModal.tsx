import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import { router, useLocalSearchParams } from 'expo-router';

import InputField from '../InputField';

type Props = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EmailVerificationModal({ visible, email, onClose }: Props) {
  const [code, setCode] = useState('');
  const { signUp, setActive } = useSignUp();

  const {
    name,
    phone,
    cargo,
    password,
    nameChildren,
    birthDate,
    senhaMaeGanso,
  } = useLocalSearchParams();

  const handleVerify = async () => {
    if (!signUp) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });

       
        router.push({
          pathname: '/(auth)/questionaries',
          params: {
            name: String(name),
            email: email,
            phone: String(phone),
            cargo: String(cargo),
            password: String(password),
            nameChildren: String(nameChildren),
            birthDate: String(birthDate),
            senhaMaeGanso: String(senhaMaeGanso),
          },
        });
      }
    } catch (err) {
      console.error('Erro na verificação de e-mail:', err);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
    >
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-white p-6 rounded-3xl w-4/5">
          <View className="items-center mb-4">
            <Text className="text-2xl font-FlamanteBook mb-2 text-center">
              Verificação de e-mail
            </Text>
            <Text className="text-center font-FlamanteBook text-base">
              Enviamos um código para {'\n'}
              <Text className="text-indigo-500">{email}</Text>
            </Text>
          </View>

          <InputField
            label="Código de verificação"
            placeholder="Digite o código"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            containerStyle="mb-4"
          />

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2 bg-gray-200 rounded-full"
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleVerify}
              className="px-4 py-2 bg-indigo-600 rounded-full"
            >
              <Text className="text-white">Verificar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

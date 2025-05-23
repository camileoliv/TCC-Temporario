import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

import InputField from '../InputField';
import { useSignUp } from '@clerk/clerk-expo';

type Props = {
  visible: boolean;
  email: string;
  onClose: () => void;
};

export default function EmailVerificationModal({ visible, email, onClose }: Props) {
  const [code, setCode] = useState('');
  const { signUp, setActive } = useSignUp();

  const handleVerify = async () => {
    if (!signUp) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace("/(auth)/questionaries");
      }
    } catch (err) {
      console.error("Falha na verificação:", err);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/70">
        <View className="bg-white p-6 rounded-xl w-4/5">
          <Text className="text-lg font-FlamanteBold mb-2">Verificação Necessária</Text>
          <Text className="font-FlamanteBook mb-4">Enviamos um código para {email}</Text>

          <InputField
            label="Código de verificação"
            placeholder="Digite o código"
            value={code}
            onChangeText={setCode}
            containerStyle="mb-4"
          />

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity 
              onPress={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleVerify}
              className="px-4 py-2 bg-indigo-600 rounded"
            >
              <Text className="text-white">Verificar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
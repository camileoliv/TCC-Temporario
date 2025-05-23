import { Modal, TouchableOpacity, View, Text } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function LogoutModal({ visible, onClose }: Props) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut(); 
    router.replace('/(auth)/welcome');
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-xl w-4/5">
          <Text className="text-lg font-bold mb-4 text-center">
            Deseja realmente sair?
          </Text>

          <View className="flex-row justify-between gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-200 py-2 rounded-lg"
            >
              <Text className="text-center">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              className="flex-1 bg-red-500 py-2 rounded-lg"
            >
              <Text className="text-center text-white">Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';

export default function SignOutButton() {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      router.replace({
        pathname: '/(auth)/welcome',
        params: { signedOut: 'true' }
      });
    } catch (err) {
      console.error('Erro ao sair:', err);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      className="flex flex-row items-center justify-between"
      disabled={isSigningOut}
    >
      <View className="w-full flex flex-row h-10 justify-end"
      >
        {isSigningOut ? (
          <ActivityIndicator size="small" color="#787ED8" />
        ) : (
          <Image style={{width: 60, height: 60 }} 
          source={require('../assets/images/C_X.png')
          } />
        )}
      </View>
    </TouchableOpacity>
  );
}
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useSignIn, useAuth } from '@clerk/clerk-expo';
import InputField from '../../components/InputField';
import { ChildProvider } from '../../context/ChildContext';

export default function Entrada() {

  const [form, setForm] = useState({
    password: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [buttonImage, setButtonImage] = useState(require('../../assets/images/Butterfly-5.png'));

  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(main)/menu");
    }
  }, [isSignedIn]);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setError('');
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!isLoaded) {
      setError('Sistema não carregado. Tente novamente.');
      return;
    }

    setButtonImage(require('../../assets/images/Butterfly-11.png'));

    if (!form.email || !form.password) {
      setError('Preencha todos os campos');
      setButtonImage(require('../../assets/images/Butterfly-5.png'));
      return;
    }

    if (!validateEmail(form.email)) {
      setError('Por favor, insira um e-mail válido');
      setButtonImage(require('../../assets/images/Butterfly-5.png'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const completeSignIn = await signIn.create({
        identifier: form.email,
        password: form.password
      });

      if (completeSignIn.status === 'complete') {
        await setActive({ session: completeSignIn.createdSessionId });
        setTimeout(() => {
          router.replace("/(main)/menu");
        }, 900);
      } else {
        setError('Login incompleto. Tente novamente.');
        setButtonImage(require('../../assets/images/Butterfly-5.png'));
      }
    } catch (err: any) {
      console.error("Erro no login:", JSON.stringify(err, null, 2));
      setButtonImage(require('../../assets/images/Butterfly-5.png'));

      if (err.errors?.[0]?.code === 'form_identifier_not_found') {
        setError('E-mail não cadastrado');
      }
      else if (err.errors?.[0]?.code === 'form_password_incorrect') {
        setError('Senha incorreta');
      }
      else if (err.errors?.[0]?.code === 'session_exists') {
        router.replace("/(main)/menu");
      }
      else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChildProvider>
      <View className="flex-1 bg-white">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1" style={{ backgroundColor: "#FCFCFE" }}>
          <View className="flex-1 w-full items-center justify-center px-6">

            <View className="p-10 m-5 justify-center items-center">
              <Text
                className="font-FlamanteBook text-4xl text-center "
                style={{
                  color: '#787ED8',
                  textShadowColor: 'rgba(0, 0, 0, 0.1)',
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 7,
                }}
              >
                Entre na sua conta
              </Text>
            </View>

            <View className="justify-center items-center gap-10 w-full">
              {error ? (
                <Text className="text-red-500 text-center">{error}</Text>
              ) : null}

              <InputField
                label="E-mail"
                labelStyle='text-[#35AFA3]'
                placeholder="Digite seu e-mail"
                value={form.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                rightIcon={<MaterialCommunityIcons name="email" size={27} color="#35AFA3" />}
              />

              <InputField
                label="Senha"
                labelStyle='text-[#35AFA3]'
                placeholder="***"
                value={form.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry
                rightIcon={<FontAwesome6 name="eye" size={27} color="#35AFA3" />}
              />
            </View>
          </View>
        </ScrollView>

        <View className="w-full items-center pb-10 pt-4 bg-white">
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`w-44 h-16 border-4 bg-indigo-600 rounded-3xl flex-row items-center justify-center gap-2 ${isLoading ? 'opacity-70' : ''
              }`}
            style={{ backgroundColor: '#AFA8E8', borderColor: '#735573' }}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text className="font-FlamanteBook text-white text-2xl">Entrar</Text>
                <Image
                  source={buttonImage}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              </>
            )}
          </TouchableOpacity>

          <Link href="/(auth)/signUp" className="mt-4 text-center">
            <Text className="text-general-200 text-lg">Não tem uma conta?  </Text>
            <Text className="text-yellow-400">Faça seu cadastro</Text>
          </Link>
        </View>
      </View>
    </ChildProvider>
  );
}

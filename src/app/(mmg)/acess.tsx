import React, { useRef, useState, useEffect, useCallback } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Text, View, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import BackButton from '../../components/btn/BackButton';

const checkPasswordFromDatabase = async (enteredPin: string): Promise<boolean> => {
  const correctPassword = "123"; 
  return enteredPin === correctPassword;
};

export default function Acesso() {
  const [pin, setPin] = useState(['', '', '']);
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const validatePassword = useCallback(async (enteredPin: string) => {
    try {
      const isValid = await checkPasswordFromDatabase(enteredPin);
      if (isValid) {
        router.navigate("/report");
      } else {
        Alert.alert("Erro", "Senha incorreta!");
        setPin(['', '', '']);
        inputRef1.current?.focus();
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao verificar a senha");
      console.error("Erro no banco:", error);
    }
  }, []); 

  useEffect(() => {
    if (pin.every(digit => digit !== '')) {
      const enteredPin = pin.join('');
      validatePassword(enteredPin);
    }
  }, [pin, validatePassword]);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (text && index < 2) {
        const nextRef = [inputRef1, inputRef2, inputRef3][index + 1];
        nextRef.current?.focus();
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-white">
      <BackButton/>
      <Text className="text-xl mb-20 font-FlamanteBook">Digite a senha</Text>
      <View className="flex-row">
        {pin.map((value, index) => (
          <View key={index} className={`${index !== 0 ? 'pl-4' : ''}`}>
            <TextInput
              ref={[inputRef1, inputRef2, inputRef3][index]}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry
              className="w-24 h-24 text-center text-2xl border rounded-2xl bg-white"
              style={{borderColor: '#787ED8'}}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

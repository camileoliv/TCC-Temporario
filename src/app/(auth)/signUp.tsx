import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { useSignUp } from '@clerk/clerk-expo';
import * as ScreenOrientation from 'expo-screen-orientation';

import DateInput from '../../components/verification/DateInput';
import InputField from '../../components/InputField';
import { Modal } from '../../components/Modal';
import PinInput from '../../components/verification/PasswordField';
import EmailVerificationModal from '../../components/verification/EmailVerificationModal';

export default function Registro() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  const [form, setForm] = useState({
    name: '',
    email: '',
    cargo: '',
    password: '',
    phone: '',
    nameChildren: '',
    birthDate: '',
    senhaMaeGanso: ['', '', ''],
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const { isLoaded, signUp } = useSignUp();

  if (!isLoaded || !signUp) {
    return null;
  }

  const handlePinChange = (newPin: string[]) => {
    setForm({ ...form, senhaMaeGanso: newPin });
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleConfirm = async () => {
    if (!isLoaded || !signUp) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setShowVerificationModal(true);
    } catch (err) {
      console.error('Erro no registro:', err);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6" style={{ backgroundColor: '#FCFCFE' }}>
        <View className="pt-10 m-5 flex flex-col">
          <Text
            className="font-FlamanteBook p-1 text-4xl text-center"
            style={{
              color: '#787ED8',
              textShadowColor: 'rgba(0, 0, 0, 0.1)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 7,
            }}
          >
            Crie a sua conta {'\n'} E o perfil do seu filho já
          </Text>
        </View>

        <View className="justify-center items-center gap-10">
          <InputField
            label="Nome Completo"
            placeholder="Digite seu nome"
            value={form.name}
            onChangeText={(value) => handleChange('name', value)}
            rightIcon={<FontAwesome6 name="user-large" size={27} color="#35AFA3" />}
          />

          <InputField
            label="Telefone"
            placeholder="Digite seu número"
            value={form.phone}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, '');
              handleChange('phone', numericValue);
            }}
            keyboardType="phone-pad"
            maxLength={15}
            rightIcon={<MaterialCommunityIcons name="phone" size={27} color="#35AFA3" />}
          />

          <InputField
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
            rightIcon={<MaterialCommunityIcons name="email" size={27} color="#35AFA3" />}
          />

          <InputField 
          label='Especializacao médica'
          placeholder='Digite a sua area médica'
          value={form.cargo}
          onChangeText={(value) => handleChange ('cargo', value)}
          rightIcon={<FontAwesome6 name="stethoscope" size={27} color="#35AFA3" />}          
          />

          <InputField
            label="Senha"
            placeholder="Digite uma senha para a sua conta, 8 dígitos ou mais"
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry={hidePassword}
            rightIcon={
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                <AntDesign name={hidePassword ? 'eye' : 'eyeo'} size={27} color="#35AFA3" />
              </TouchableOpacity>
            }
          />

          <View className="w-full mb-3">
            <View className="flex-row items-center">
              <Text className="text-3xl font-FlamanteBook text-left">Senha perfil mamãe ganso</Text>
              <Pressable onPress={() => setModalOpen(true)} className="ml-2">
                <AntDesign name="exclamationcircle" size={18} color="#FF0000" />
              </Pressable>
            </View>
          </View>

          <Modal isOpen={modalOpen}>
            <View className="bg-white p-2 rounded-3xl justify-between">
              <Text className="text-justify font-extrabold text-lg">Informativo:</Text>
              <View className="flex h-36 bg-slate-100 rounded-2xl p-6">
                <Text className="text-left text-slate-500 text-xl font-FlamanteBook">
                  O perfil mamãe ganso é o local onde você poderá acompanhar o desenvolvimento do seu filho
                </Text>
              </View>
              <Pressable onPress={() => setModalOpen(false)} className="self-end">
                <AntDesign name="close" size={24} />
              </Pressable>
            </View>
          </Modal>

          <PinInput
            length={3}
            containerStyle="flex flex-row justify-center gap-3"
            inputStyle="w-20 h-20 text-center text-2xl"
            onChange={handlePinChange}
          />

          <InputField
            label="Nome da criança"
            placeholder="Digite o nome da criança"
            value={form.nameChildren}
            onChangeText={(value) => handleChange('nameChildren', value)}
            rightIcon={<FontAwesome6 name="children" size={27} color="#35AFA3" />}
          />

          <View className="my-2 w-full">
            <Text className="text-3xl text-left font-FlamanteBook mb-3">Data de nascimento</Text>
            <DateInput
              onDateChange={(formattedDate: string) => handleChange('birthDate', formattedDate)}
            />
          </View>

          <TouchableOpacity
            onPress={handleConfirm}
            className="flex flex-row justify-center items-center"
          >
            <View
              className="flex flex-row h-20 w-60 justify-center items-center border-[5px] rounded-full gap-2"
              style={{ backgroundColor: '#AFA8E8', borderColor: '#735573' }}
            >
              <Text className="font-FlamanteBook text-white text-2xl">Confirmar</Text>
              <AntDesign name="checkcircleo" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <EmailVerificationModal
          visible={showVerificationModal}
          email={form.email}
          onClose={() => setShowVerificationModal(false)}
          onSuccess={() => setShowVerificationModal(false)}
        />
      </View>
    </ScrollView>
  );
}

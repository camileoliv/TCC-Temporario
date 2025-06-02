import { Text, View, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

import CustomButton from '../../components/CustomButton'
//import { doc, setDoc } from "firebase/firestore";
//import { db } from "../firebaseConfig"; // seu arquivo de config do Firebase

export default function Questions() {
    useEffect(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }, []);  
  const handleAnswer = (resposta: 'sim' | 'nao' | 'nao sei') => {
    console.log("Resposta selecionada:", resposta)

  /*  try {
      await setDoc(doc(db, "respostas", "respostaUsuario1"), {
        resposta,
        timestamp: new Date(),
      });
      console.log("Resposta salva com sucesso:", resposta);
    } catch (error) {
      console.error("Erro ao salvar resposta:", error);
    } */
  }

  return (
    <View className='flex flex-col h-full items-center justify-evenly pt-10'
    style={{backgroundColor: "#FCFCFE"}}>

      <View className=' flex flex-col gap-[1.8]'>
        <Text 
        className='font-FlamanteBook p-1 text-3xl text-center '
          style={{
            color: '#787ED8',
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 2 }, 
            textShadowRadius: 7,
          }}>Customize os jogos do seu filho!</Text>
        <Text         
        className='font-FlamanteBook p-1 text-3xl text-center '
          style={{
            color: '#787ED8',
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 2 }, 
            textShadowRadius: 7,
          }}>Nos diga quais os aspectos devemos focar</Text>
      </View>


      <View className='flex flex-col justify-center items-center px-6'>
        <Text className='text-black text-2xl text-center font-FlamanteBook pb-4'>A criança consegue lembrar do que ouve ou vê por muito tempo?</Text>

        <View className='flex flex-row gap-10'>
          <CustomButton value='nao' onPress={handleAnswer} title='Não' shouldChangeColor={true} activeBgColor='bg-[#F3D175]'/>
          <CustomButton value='nao sei' onPress={handleAnswer} title='Não sei'shouldChangeColor={true} activeBgColor='bg-[#F3D175]'/>
          <CustomButton value='sim' onPress={handleAnswer} title='Sim'shouldChangeColor={true} activeBgColor='bg-[#F3D175]'/>
        </View>
      </View>


      <View className='flex flex-col justify-center items-center px-6'>
          <Text className='text-black text-2xl text-center font-FlamanteBook pb-4'>A criança consegue manter rotinas ao decorrer do dia?</Text>

          <View className='flex flex-row gap-10'>
            <CustomButton value='nao' onPress={handleAnswer} title='Não' shouldChangeColor={true} activeBgColor='bg-[#F3D175]'/>
            <CustomButton value='nao sei' onPress={handleAnswer} title='Não sei'shouldChangeColor={true} activeBgColor='bg-[#F3D175]'/>
            <CustomButton value='sim' onPress={handleAnswer} title='Sim'shouldChangeColor={true} activeBgColor='bg-[#F3D175]'/>
          </View>
      </View>


      <View className='flex flex-col justify-center items-center px-6'>
        <Text className='text-black text-2xl text-center font-FlamanteBook pb-4'>A criança consegue associar quantidade de objetos ou formas à números?</Text>

        <View className='flex flex-row gap-10'>
          <CustomButton value='nao' onPress={handleAnswer} title='Não' shouldChangeColor={true} activeBgColor='bg-[#F3D175]' />
          <CustomButton value='nao sei' onPress={handleAnswer} title='Não sei'shouldChangeColor={true} activeBgColor='bg-[#F3D175]'/>
          <CustomButton value='sim' onPress={handleAnswer} title='Sim'shouldChangeColor={true} activeBgColor='bg-[#F3D175]'/>
        </View>
      </View>

        
        <TouchableOpacity
          onPress={() => {
            router.navigate("/(auth)/config");
          }}
          className=' justify-baseline items-baseline flex flex-row p-5'
          >

          <View className='flex flex-row h-16 w-44 justify-center items-center  border-[5px] rounded-full gap-2'
          style={{backgroundColor: '#AFA8E8', borderColor: '#735573' }}>

            <Text
              className='font-FlamanteBook text-white text-2xl'>
                Confirmar</Text>
          </View>
      </TouchableOpacity>



    </View>
  )
}

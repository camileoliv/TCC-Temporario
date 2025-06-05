import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import SignOutButton from '../../../components/btn/SignOutButton';
import { styles } from '../../../styles/MuralMamae';

const statusBarHeight = Constants.statusBarHeight;

type Postagem = {
  id: string;
  titulo: string;
  conteudo: string;
  data: string;
};


export default function Feed() {
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPostagens([
        {
          id: '1',
          titulo: 'Comunique-se com a criança',
          conteudo: 'Converse de forma clara e objetiva, sempre incentivando a criança a responder e expressar seus desejos...',
          data: '15/05/2023'
        },
        {
          id: '2',
          titulo: 'Compreenda as particularidades sensoriais do seu filho',
          conteudo: 'Cada criança é diferente e algumas podem ser sensíveis à luz, sons ou toques. Por isso, conheça os limites da criança e não os ultrapasse. ',
          data: '12/05/2023'
        },
      ]);
      setCarregando(false);
    }, 1500);
  }, []);

  return (
    <View className='w-full items-center bg-white flex-1'
    style={{ marginTop: statusBarHeight + 1}}>
      <SignOutButton/>
      <Text className="font-FlamanteBook text-2xl text-[#787ED8] mb-20"
                style={{
                color: '#787ED8',
                textShadowColor: 'rgba(0, 0, 0, 0.1)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 7,
                }}
      >Feed</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#4F46E5" />
      ) : (
        <FlatList
          data={postagens}
          renderItem={({ item }) => (
            <View style={styles.postagem}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.conteudo}>{item.conteudo}</Text>
              <Text style={styles.data}>{item.data}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  )
}
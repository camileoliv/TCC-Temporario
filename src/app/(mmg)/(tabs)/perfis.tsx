import Constants from 'expo-constants';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import SignOutButton from '../../../components/btn/SignOutButton';
import { styles } from '../../../styles/PerfilMamae';

const statusBarHeight = Constants.statusBarHeight;

type Crianca = {
    id: string;
    nome: string;
    idade: string;
    avatar?: any;
};

const criancasCadastradas: Crianca[] = [
    // Exemplo com crianças:


];

const goToNew = () => {
  router.navigate('/(new)/newSignUp')
}

export default function Perfis() {

  return (
    <View className='
    w-full px-4 items-center flex-1 bg-white'style={{ marginTop: statusBarHeight + 1}}>
      <SignOutButton/>

            <Text className="text-[#787ED8] font-FlamanteBook text-2xl pb-32"
        style={{
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 7,
        }}>Perfil</Text>

            {criancasCadastradas.length > 0 ? (
                /* SE TIVER CRIANÇAS CADASTRADAS - Mostra apenas os perfis e o botão de adicionar */
                <View style={styles.perfisContainer}>
                    <Text style={styles.subtitulo}>Perfis das Crianças</Text>

                    <View style={styles.listaPerfis}>
                        {criancasCadastradas.map(crianca => (
                            <TouchableOpacity key={crianca.id} style={styles.perfilItem}>
                                {crianca.avatar && <Image source={crianca.avatar} style={styles.avatar} />}
                                <Text style={styles.nomeCrianca}>{crianca.nome}</Text>
                                <Text style={styles.idadeCrianca}>{crianca.idade}</Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.novoPerfil}>
                            <Text style={styles.maisIcon}>+</Text>
                            <Text style={styles.novoPerfilTexto}>Adicionar outra</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.mensagemContainer}>
                    <Text>
                      Para adicionar uma nova criança precisa cadastrar ela {'\n'}
                      deseja fazer o novo cadastro agora?
                    </Text>
                  <View className='bg-white rounded-full border-[#735573] border-[2px] w-[180px] h-[50px] items-center justify-center'
                  >
                    <TouchableOpacity
                    onPress={goToNew}>
                      <Text className='font-FlamanteBook text-lg'>Sim</Text>
                    </TouchableOpacity>
                  </View> 
                </View>
            )}

    </View>
  )
}

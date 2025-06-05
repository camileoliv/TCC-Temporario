import React from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { styles } from '../../../styles/MuralProfissional';
import SignOutButton from '../../../components/btn/SignOutButton';

const statusBarHeight = Constants.statusBarHeight;

export default function MuralProfissional() {
    const [titulo, setTitulo] = React.useState('');
    const [conteudo, setConteudo] = React.useState('');

    const handleEnviar = () => {
        if (!titulo.trim() || !conteudo.trim()) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        console.log('Postagem enviada:', { titulo, conteudo });
        alert('Postagem enviada com sucesso!');
        setTitulo('');
        setConteudo('');
    };

return (
    <View className='
    w-full px-4 bg-white flex-1'style={{ marginTop: statusBarHeight + 1}}>
      <SignOutButton/>
            <View style={styles.header}>
            <Text className="font-FlamanteBook text-2xl text-[#787ED8] mb-20"
                style={{
                color: '#787ED8',
                textShadowColor: 'rgba(0, 0, 0, 0.1)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 7,
                }}>Criar postagem</Text>
            </View>

            <View
            style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Título da Postagem</Text>
                    <TextInput
                        style={styles.input}
                        value={titulo}
                        onChangeText={setTitulo}
                        placeholder="Digite um título criativo..."
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.separator} />

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Conteúdo</Text>
                    <TextInput
                        style={[styles.input, styles.contentInput]}
                        value={conteudo}
                        onChangeText={setConteudo}
                        placeholder="Compartilhe seus conhecimentos..."
                        placeholderTextColor="#999"
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                <View className='items-center'>
                    <TouchableOpacity 
                        className='bg-white rounded-full border-[#735573] border-[2px] w-[180px] h-[50px] items-center justify-center' 
                        onPress={handleEnviar}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Publicar no Mural</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </View>
)
}
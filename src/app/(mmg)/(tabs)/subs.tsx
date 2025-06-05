import Constants from 'expo-constants';
import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import SignOutButton from '../../../components/btn/SignOutButton';
import { styles } from '../../../styles/Assinaturas';

const statusBarHeight = Constants.statusBarHeight;

const planos = [
    {
        titulo: "Plano mensal",
        descricao: [
            "Para quem quer mais controle e conteúdo!",
            "Cadastro de até 3 crianças",
            "Acesso ilimitado a todos os jogos",
            "Avatares ilimitados",
            "Relatórios detalhados"
        ],
        preco: "R$24,90/mês"
    },
    {
        titulo: "Plano anual",
        descricao: [
            "Mais benefícios com economia!",
            "Cadastro de crianças ilimitadas",
            "Acesso ilimitado a todos os jogos",
            "Avatares ilimitados",
            "relatórios detalhados",
            "Envio automático de relatórios para o profissional responsável pela criança"
        ],
        preco: "R$199,00/ano"
    }
];

export default function Subs() {
    const [planoAtual, setPlanoAtual] = useState<number>(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const onSwipe = (event: PanGestureHandlerGestureEvent) => {
        const { translationX } = event.nativeEvent;
        if (translationX < -50) {
            animateTransition(1);
        } else if (translationX > 50) {
            animateTransition(0);
        }
    };

    const animateTransition = (newPlano: number) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: newPlano === 1 ? -50 : 50,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => {
            setPlanoAtual(newPlano);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                })
            ]).start();
        });
    };  
  return (
        <GestureHandlerRootView style={{ flex: 1, marginTop: statusBarHeight}}>
            <View style={styles.container}>
                <SignOutButton/>

                <Text className="font-FlamanteBook text-2xl text-[#787ED8] mb-20"
        style={{
          color: '#787ED8',
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 7,
        }}>Assinaturas</Text>

                <Text className='font-FlamanteBook'
                style={styles.texto1}>
                    Vá para o premium{'\n'}
                    Pode ser cancelado a qualquer momento
                </Text>

                <PanGestureHandler onGestureEvent={onSwipe}>
                    <Animated.View
                        style={[
                            styles.central,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateX: slideAnim }]
                            }
                        ]}
                    >
                        <Text style={styles.tituloPlano}>{planos[planoAtual].titulo}</Text>

                        <View style={styles.descricaoContainer}>
                            {planos[planoAtual].descricao.map((item, index) => (
                                <View key={index} style={styles.itemDescricao}>
                                    <View style={styles.bolinha} />
                                    <Text style={styles.textoJustificado}>{item}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.line}></View>

                        <Text style={styles.preco}>{planos[planoAtual].preco}</Text>
                    </Animated.View>
                </PanGestureHandler>

                <View style={styles.indicadorContainer}>
                    {planos.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicador,
                                index === planoAtual ? styles.indicadorAtivo : styles.indicadorInativo
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.botao}>
                    <Text className='font-FlamanteBook'
                    style={styles.textoBotao}>Iniciar plano</Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
  )
}
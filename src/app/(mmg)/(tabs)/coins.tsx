import Constants from 'expo-constants';
import React from 'react';
import { Text, View, Image } from 'react-native';
import SignOutButton from '../../../components/btn/SignOutButton';
import { styles } from '../../../styles/Tomocoins';

const statusBarHeight = Constants.statusBarHeight;

export default function Coins() {
  return (
    <View className='
    w-full flex-1 px-4 items-center bg-white'style={{ marginTop: statusBarHeight + 1}}>
      <SignOutButton></SignOutButton>
        <Text className="font-FlamanteBook text-2xl text-[#787ED8] mb-20"
        style={{
          color: '#787ED8',
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 7,
        }}>Tomocoins</Text>

            <View style={styles.quantidadeMoeda}>
                <Image source={require('../../../assets/images/Money 1.png')} />
                <Text style={styles.textoQuantidade}>
                    540
                </Text>
            </View>

            <View style={styles.boxPrecos}>

                <View style={styles.preco}>
                    <View style={styles.temocoQuantidade}>
                        <Image source={require('../../../assets/images/Flower-vase 1.png')} />
                        <Text style={styles.textoQuantidade}>3520</Text>
                    </View>
                    <Text style={styles.textoPrecos}
                    >R$89,99</Text>
                </View>

                <View style={styles.preco}>
                    <View style={styles.temocoQuantidade}>
                        <Image source={require('../../../assets/images/Coin-9 1.png')} />
                        <Text style={styles.textoQuantidade}>1600</Text>
                    </View>
                    <Text style={styles.textoPrecos}>R$ 39,99</Text>
                </View>

                <View style={styles.preco}>
                    <View style={styles.temocoQuantidade}>
                        <Image source={require('../../../assets/images/Coin-3 1.png')} />
                        <Text style={styles.textoQuantidade}>960</Text>
                    </View>
                    <Text style={styles.textoPrecos}>R$ 14,99</Text>
                </View>

                <View style={styles.preco}>
                    <View style={styles.temocoQuantidade}>
                        <Image source={require('../../../assets/images/Coin-1 1.png')} />
                        <Text style={styles.textoQuantidade}>320</Text>
                    </View>
                    <Text style={styles.textoPrecos}>R$ 4,99</Text>
                </View>
            </View>
    </View>
  )
}
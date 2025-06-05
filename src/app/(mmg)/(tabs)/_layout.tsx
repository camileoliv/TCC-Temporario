import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

import { ChildProvider } from '../../../context/ChildContext';

export default function TabsLayout() {
    useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);
  return (
    <ChildProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#735573',
          tabBarInactiveTintColor: '#735573',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            paddingBottom: 6,
          },
          tabBarIconStyle: {
            marginTop: 6,
          },
        }}
      >
        <Tabs.Screen
          name="report"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../../assets/images/G_Book.png')}
                style={{
                  width: 35,
                  height: 30,
                  tintColor: undefined,
                  opacity: focused ? 1 : 0.6,
                  transform: [{ scale: focused ? 1.2 : 1 }], // Efeito de zoom
                }}
              />
            ),
            title: 'Relatório'
          }}
        />

        <Tabs.Screen
          name="config"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../../assets/images/Settings.png')}
                style={{
                  width: 33,
                  height: 30,
                  tintColor: undefined,
                  opacity: focused ? 1 : 0.6,
                  transform: [{ scale: focused ? 1.2 : 1 }],
                }}
              />
            ),
            title: 'Configuração'
          }}
        />

        <Tabs.Screen
          name="perfis"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../../assets/images/Caracter.png')}
                style={{
                  width: 25,
                  height: 30,
                  tintColor: undefined,
                  opacity: focused ? 1 : 0.6,
                  transform: [{ scale: focused ? 1.2 : 1 }],
                }}
              />
            ),
            title: 'Perfis'
          }}
        />

        <Tabs.Screen
          name="coins"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../../assets/images/Coin.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: undefined,
                  opacity: focused ? 1 : 0.6,
                  transform: [{ scale: focused ? 1.2 : 1 }], 
                }}
              />
            ),
            title: 'Tomocoins'
          }}
        />

        <Tabs.Screen
          name="subs"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../../assets/images/ShoppingCart.png')}
                style={{
                  width: 35,
                  height: 30,
                  tintColor: undefined,
                  opacity: focused ? 1 : 0.6,
                  transform: [{ scale: focused ? 1.2 : 1 }],
                }}
              />
            ),
            title: 'Assinaturas'
          }}
        />

        <Tabs.Screen
          name="feed"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../../assets/images/RoundDialog.png')}
                style={{
                  width: 35,
                  height: 30,
                  tintColor: undefined,
                  opacity: focused ? 1 : 0.6,
                  transform: [{ scale: focused ? 1.2 : 1 }],
                }}
              />
            ),
            title: 'Mural'
          }}
        />

          <Tabs.Screen
          name="feedProf"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../../assets/images/RoundDialog.png')}
                style={{
                  width: 35,
                  height: 30,
                  tintColor: undefined,
                  opacity: focused ? 1 : 0.6,
                  transform: [{ scale: focused ? 1.2 : 1 }],
                }}
              />
            ),
            title: 'Post'
          }}
        />

      </Tabs>      
    </ChildProvider>
  );
}
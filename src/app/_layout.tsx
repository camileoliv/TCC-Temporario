import { useFonts } from 'expo-font';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import '../styles/global.css';
import { ChildProvider } from '../context/ChildContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    GlutenBold: require('../assets/fonts/Gluten-Bold.ttf'),
    GlutenExtraBold: require('../assets/fonts/Gluten-ExtraBold.ttf'),
    FlamanteBook: require('../assets/fonts/Flamante-Round-Book-FFP.ttf'),
    Varela: require('../assets/fonts/VarelaRound-Regular.ttf'),
    CuteDino: require('../assets/fonts/CuteDino.ttf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Promise.all([
          
          new Promise(resolve => setTimeout(resolve, 2000)),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded && !fontError) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded, fontError]);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <ClerkProvider tokenCache={tokenCache}>
          <ChildProvider>
            <Stack>
              <Stack.Screen name='index' options={{ headerShown: false }} />
              <Stack.Screen name='(auth)' options={{ headerShown: false }} />
              <Stack.Screen name='(mmg)' options={{ headerShown: false }} />
              <Stack.Screen name='(main)' options={{ headerShown: false }} />
              <Stack.Screen name='(new)' options={{ headerShown: false }} />
            </Stack>
          </ChildProvider>
        </ClerkProvider>
    </View>
  );
}
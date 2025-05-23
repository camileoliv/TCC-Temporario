import { useFonts } from 'expo-font';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import '../styles/global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    GlutenBold: require('../assets/fonts/Gluten-Bold.ttf'),
    GlutenExtraBold: require('../assets/fonts/Gluten-ExtraBold.ttf'),
    FlamanteBook: require('../assets/fonts/Flamante-Round-Book-FFP.ttf'),
    Varela: require('../assets/fonts/VarelaRound-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='(mmg)' options={{ headerShown: false }} />
          <Stack.Screen name='(main)' options={{ headerShown: false }} />
        </Stack>
    </ClerkProvider>
  );
}

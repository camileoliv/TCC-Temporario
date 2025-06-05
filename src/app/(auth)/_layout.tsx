import '../../styles/global.css';
import { Stack } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

const Layout = () => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <Stack>
      <Stack.Screen name='welcome' options={{ headerShown: false }} />
      <Stack.Screen name='signUp' options={{ headerShown: false }} />
      <Stack.Screen name='signIn' options={{ headerShown: false }} />
      <Stack.Screen name='loading' options={{ headerShown: false }} />
      <Stack.Screen name='questionaries' options={{ headerShown: false }} />
      <Stack.Screen name='config' options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

import '../../styles/global.css';
import { Stack } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { ChildProvider } from '../../context/ChildContext';

const Layout = () => {
   useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);
  return (
    <ChildProvider>
      <Stack>
        <Stack.Screen name='newSignUp' options={{ headerShown: false }} />
        <Stack.Screen name='newQuests' options={{ headerShown: false }} />
        <Stack.Screen name='config' options={{ headerShown: false }} />
      </Stack>      
    </ChildProvider>
  );
}

export default Layout;


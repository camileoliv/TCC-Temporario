import '../../styles/global.css'
import { Stack } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

import { ConfigProvider } from '../../context/ConfigContext';
import { AudioProvider } from '../../context/AudioContext';

const Layout = () => {
    useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  return (
    <>
        <ConfigProvider>
          <AudioProvider>
            <Stack>
              <Stack.Screen name='menu' options={{headerShown: false }} />
              <Stack.Screen name='perfil' options={{headerShown: false }} />
              <Stack.Screen name='gameView' options={{headerShown: false }} />
              <Stack.Screen name='tasks' options={{headerShown: false }} />
              <Stack.Screen name='selection' options={{headerShown: false }} />
            </Stack>
          </AudioProvider> 
        </ConfigProvider>        
    </>
  )
}

export default Layout;

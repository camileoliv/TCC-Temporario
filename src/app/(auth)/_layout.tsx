import '../../styles/global.css';
import { Stack } from "expo-router";

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name='welcome' options={{ headerShown: false }} />
        <Stack.Screen name='signUp' options={{ headerShown: false }} />
        <Stack.Screen name='signIn' options={{ headerShown: false }} />
        <Stack.Screen name='questionaries' options={{ headerShown: false }} />
        <Stack.Screen name='config' options={{ headerShown: false }} />
        <Stack.Screen name='loading' options={{ headerShown: false }} />
      </Stack>
  );
}

export default Layout;


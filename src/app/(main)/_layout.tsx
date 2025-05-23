import '../../styles/global.css'
import { Stack } from "expo-router";

const Layout = () => {
  return (
  <Stack>
    <Stack.Screen name='menu' options={{headerShown: false }} />
    <Stack.Screen name='profile' options={{headerShown: false }} />
    <Stack.Screen name='gameView' options={{headerShown: false }} />
    <Stack.Screen name='tasks' options={{headerShown: false }} />
    <Stack.Screen name='selection' options={{headerShown: false }} />
    {/*<Stack.Screen name='friends' options={{headerShown: false }} />*/}
  </Stack>
  )
}

export default Layout;

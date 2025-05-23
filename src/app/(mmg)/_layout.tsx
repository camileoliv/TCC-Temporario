import '../../styles/global.css'
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='acess' />
      <Stack.Screen name='(tabs)' />
    </Stack>
  )
}

export default Layout;
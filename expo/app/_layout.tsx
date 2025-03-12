import { Manrope_400Regular, Manrope_300Light } from '@expo-google-fonts/manrope';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import useAuth from 'hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';

import '../global.css';

export default function Layout() {
  const { user, loading } = useAuth();

  const [fontsLoaded] = useFonts({
    'SpaceGrotesk-Medium': require('../assets/fonts/SpaceGrotesk-Medium.ttf'),
    'SpaceGrotesk-Bold': require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
    'Manrope-Regular': Manrope_400Regular,
    'Manrope-Light': Manrope_300Light,
  });

  if (!fontsLoaded) return null;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? <Stack.Screen name="(auth)/auth" /> : <Stack.Screen name="(tabs)" />}
    </Stack>
  );
}

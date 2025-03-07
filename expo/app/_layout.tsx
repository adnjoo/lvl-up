import { Stack } from 'expo-router';
import useAuth from 'hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';

import '../global.css';

export default function Layout() {
  const { user, loading } = useAuth();

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

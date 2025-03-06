import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import '../global.css';

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await AsyncStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}

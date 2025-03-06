import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default: Not logged in

  useEffect(() => {
    // Fake authentication check (Replace with real auth logic)
    setTimeout(() => {
      setIsAuthenticated(false); // Change this to `true` if the user is logged in
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace('/home'); // Redirect to main app
      } else {
        router.replace('/auth'); // Redirect to login
      }
    }
  }, [loading, isAuthenticated]);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
}

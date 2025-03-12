import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';

import { app } from '../../firebase';

export default function SettingsScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('isAuthenticated');
      Alert.alert('Logged Out', 'You have been logged out.', [{ text: 'OK' }]);
      router.push('auth');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <View className="flex-1 bg-gray-900 p-6">
      {/* Page Title */}
      <View className="mt-10 items-center">
        <Text className="h1 text-white">SETTINGS</Text>
      </View>

      {/* User Info */}
      <View className="flex-1 items-center justify-center">
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : user ? (
          <View className="w-full max-w-sm rounded-lg bg-gray-800 p-4">
            <Text className="body1 text-white">Name: {user.name}</Text>
            <Text className="body1 text-white">Email: {user.email}</Text>
          </View>
        ) : (
          <Text className="body1 text-red-400">No user data found.</Text>
        )}
      </View>

      {/* Logout Button */}
      <Pressable className="mt-6 rounded-lg bg-red-500 px-6 py-3" onPress={handleLogout}>
        <Text className="body1 text-white">Logout</Text>
      </Pressable>
    </View>
  );
}

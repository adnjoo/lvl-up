import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';

import { app } from '../../firebase'; // Ensure you have firebaseConfig.js

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
      <View className="mt-10 items-center">
        <Text className="font-spacegrotesk-regular text-2xl font-bold text-white">SETTINGS</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : user ? (
          <View className="w-full max-w-sm rounded-lg bg-gray-800 p-4">
            <Text className="text-lg text-white">Name: {user.name}</Text>
            <Text className="text-lg text-white">Email: {user.email}</Text>
          </View>
        ) : (
          <Text className="text-lg text-red-400">No user data found.</Text>
        )}
      </View>

      <Pressable className="mt-6 rounded-lg bg-red-500 px-6 py-3" onPress={handleLogout}>
        <Text className="text-lg text-white">Logout</Text>
      </Pressable>
    </View>
  );
}

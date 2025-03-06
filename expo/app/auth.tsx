import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';

import { auth } from '../firebase';

export default function AuthScreen() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      if (isRegister) {
        // Register a new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await AsyncStorage.setItem('isAuthenticated', 'true');
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => router.replace('/(tabs)') },
        ]);
      } else {
        // Login existing user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await AsyncStorage.setItem('isAuthenticated', 'true');
        Alert.alert('Success', 'Logged in successfully!', [
          { text: 'OK', onPress: () => router.replace('/(tabs)') },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGuestLogin = async () => {
    await AsyncStorage.setItem('isAuthenticated', 'true');
    Alert.alert('Success', 'Logged in as Guest!', [
      { text: 'OK', onPress: () => router.replace('/(tabs)') },
    ]);
  };

  return (
    <LinearGradient colors={['#000000', '#0A0A1A']} style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center p-6">
        {/* Title */}
        <Text className="shadow-blue-glow mb-6 text-3xl font-bold text-blue-400">
          {isRegister ? 'Register' : 'Login'}
        </Text>

        {/* Health Potion Image */}
        <Image
          source={require('../assets/pot.png')}
          style={{ width: 80, height: 80 }}
          className="shadow-red-glow mb-4"
          resizeMode="contain"
        />

        {/* Input Container */}
        <View className="w-full max-w-xs">
          {/* Email Input */}
          <TextInput
            className="mb-3 w-full rounded-lg bg-gray-800 px-4 py-3 lowercase text-white placeholder-gray-400"
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Input */}
          <TextInput
            className="mb-3 w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-400"
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Submit Button */}
        <Pressable
          className="mb-4 w-full max-w-xs items-center justify-center rounded-lg border border-blue-400 bg-transparent p-4 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={handleAuth}>
          <Text className="text-lg font-semibold text-blue-400">
            {isRegister ? 'Sign Up' : 'Login'}
          </Text>
        </Pressable>

        {/* Guest Login Button */}
        <Pressable
          className="mb-4 w-full max-w-xs items-center justify-center rounded-lg border border-green-400 bg-transparent p-4 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={handleGuestLogin}>
          <Text className="text-lg font-semibold text-green-400">Login as Guest</Text>
        </Pressable>

        {/* Toggle Login/Register */}
        <Pressable onPress={() => setIsRegister(!isRegister)}>
          <Text className="text-sm text-gray-400">
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';

import { auth } from '../firebase';

export default function IndexScreen() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const db = getFirestore(); // Initialize Firestore

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      let userCredential;

      if (isRegister) {
        // 🔥 Register user with Firebase Auth
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 🔥 Save user data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name: email.split('@')[0], // Default name (use first part of email)
          email: user.email,
          level: 1, // Default level
          createdAt: new Date(),
        });

        Alert.alert('Success', 'Account created successfully!');
      } else {
        // 🔥 Login existing user
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Logged in successfully!');
      }

      // ✅ Save authentication state locally
      await AsyncStorage.setItem('isAuthenticated', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <LinearGradient colors={['#000000', '#0A0A1A']} style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center p-6">
        {/* Potion and LVL UP Wordmark on the same line */}
        <View className="mb-4 flex-row items-center">
          <Image
            source={require('../assets/pot.png')}
            style={{ width: 50, height: 50, marginRight: 10 }}
            className="shadow-red-glow"
            resizeMode="contain"
          />
          <Text className="text-4xl font-extrabold text-green-400">LVL UP</Text>
        </View>

        {/* Title */}
        <Text className="shadow-blue-glow mb-6 text-3xl font-bold text-blue-400">
          {isRegister ? 'Register' : 'Login'}
        </Text>

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

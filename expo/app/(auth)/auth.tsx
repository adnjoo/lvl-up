import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';

import { auth } from '../../firebase';

const ALPHA_CODE = 'test123'; // 🔥 Change this for private access

export default function IndexScreen() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alphaCode, setAlphaCode] = useState('');

  const db = getFirestore();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    if (isRegister && alphaCode.trim() !== ALPHA_CODE) {
      Alert.alert('Error', 'Invalid alpha code. Registration is restricted.');
      return;
    }

    try {
      let userCredential;

      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          name: email.split('@')[0],
          email: user.email,
          level: 1,
          createdAt: new Date(),
        });

        Alert.alert('Success', 'Account created successfully!');
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      await AsyncStorage.setItem('isAuthenticated', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <LinearGradient colors={['#000000', '#0A0A1A']} style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center p-6">
        {/* Potion and Wordmark */}
        <View className="mb-4 flex-row items-center">
          <Image
            source={require('assets/pot.png')}
            style={{ width: 50, height: 50, marginRight: 10 }}
            className="shadow-red-glow"
            resizeMode="contain"
          />
          <Text className="h1 text-green-400">lvl up</Text>
        </View>

        {/* Title */}
        <Text className="h2 shadow-blue-glow mb-6 text-blue-400">
          {isRegister ? 'Register' : 'Login'}
        </Text>

        {/* Input Fields */}
        <View className="w-full max-w-xs">
          <TextInput
            className="body1 mb-3 w-full rounded-lg bg-gray-800 px-4 py-3 lowercase text-white placeholder-gray-400"
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="body1 mb-3 w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-400"
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {isRegister && (
            <TextInput
              className="body1 mb-3 w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-400"
              placeholder="Alpha Code"
              placeholderTextColor="#aaa"
              value={alphaCode}
              onChangeText={setAlphaCode}
            />
          )}
        </View>

        {/* Auth Button */}
        <Pressable
          className="mb-4 w-full max-w-xs items-center justify-center rounded-lg border border-blue-400 bg-transparent p-4 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={handleAuth}>
          <Text className="body1 text-blue-400">{isRegister ? 'Sign Up' : 'Login'}</Text>
        </Pressable>

        {/* Toggle Text */}
        <Pressable onPress={() => setIsRegister(!isRegister)}>
          <Text className="caption text-gray-400">
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

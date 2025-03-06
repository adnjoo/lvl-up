import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';

export default function AuthScreen() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dummyUser = {
    email: 'test@example.com',
    password: 'password123',
  };

  const handleAuth = async () => {
    console.log(email, password);
    if (email.toLowerCase() === dummyUser.email && password === dummyUser.password) {
      await AsyncStorage.setItem('isAuthenticated', 'true');
      Alert.alert('Success', 'You have logged in successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') },
      ]);
    } else {
      Alert.alert('Error', 'Invalid email or password. Try again.');
    }
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

          {/* Hint */}
          <Text className="mb-3 text-sm text-gray-400">
            Hint: try test@example.com, password123
          </Text>
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

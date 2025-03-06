import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';

export default function AuthScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient colors={['#000000', '#0A0A1A']} style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center p-6">
        {/* Title */}
        <Text className="shadow-blue-glow mb-6 text-4xl font-bold text-blue-400">
          {isRegister ? 'Register' : 'Login'}
        </Text>

        {/* Health Potion Image */}
        <Image
          source={require('../assets/pot.png')}
          className="shadow-red-glow mb-6 h-24 w-24"
          resizeMode="contain"
        />

        {/* Email Input */}
        <TextInput
          className="mb-4 w-72 rounded-lg bg-gray-800 p-4 text-white placeholder-gray-400"
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          className="mb-4 w-72 rounded-lg bg-gray-800 p-4 text-white placeholder-gray-400"
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Submit Button */}
        <Pressable
          className="mb-4 w-72 items-center justify-center rounded-lg border border-blue-400 bg-transparent p-4 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={() => console.log(isRegister ? 'Register' : 'Login')}>
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

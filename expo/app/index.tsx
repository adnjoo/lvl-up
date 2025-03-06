import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { View, Text, Pressable, Image } from 'react-native';

import '../global.css';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#000000', '#0A0A1A']}
      style={{ flex: 1 }} // Ensures it covers the full screen
    >
      <View className="flex-1 items-center justify-center p-6">
        {/* Title with glowing effect */}
        <Text className="shadow-blue-glow mb-4 text-4xl font-bold text-blue-400">
          Welcome, Hunter!
        </Text>

        {/* Health Potion Image */}
        <Image
          source={require('../assets/pot.png')}
          className="shadow-red-glow mb-6 h-24 w-24"
          resizeMode="contain"
        />

        {/* Button Container */}
        <View className="w-full max-w-xs gap-4">
          {/* Progress Button */}
          <Pressable
            className="w-full items-center justify-center rounded-lg border border-blue-400 bg-transparent p-4 transition-all duration-200 hover:scale-105 active:scale-95"
            onPress={() => router.push('/progress')}>
            <Text className="text-lg font-semibold text-blue-400">
              <Ionicons name="bar-chart" size={20} color="#4CAF50" /> View Progress
            </Text>
          </Pressable>

          {/* Challenges Button */}
          <Pressable
            className="w-full items-center justify-center rounded-lg border border-purple-400 bg-transparent p-4 transition-all duration-200 hover:scale-105 active:scale-95"
            onPress={() => router.push('/challenges')}>
            <Text className="text-lg font-semibold text-purple-400">
              <Ionicons name="trophy" size={20} color="#D8BFD8" /> Challenges
            </Text>
          </Pressable>

          {/* Settings Button */}
          <Pressable
            className="w-full items-center justify-center rounded-lg border border-yellow-400 bg-transparent p-4 transition-all duration-200 hover:scale-105 active:scale-95"
            onPress={() => router.push('/settings')}>
            <Text className="text-lg font-semibold text-yellow-400">
              <Ionicons name="settings" size={20} color="#FFD700" /> Settings
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

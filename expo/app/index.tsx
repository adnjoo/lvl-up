import { useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

import '../global.css';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-6">
      <Text className="mb-4 text-2xl font-bold text-white">Welcome to Lvl-Up!</Text>

      <Pressable
        className="mb-3 rounded-lg bg-blue-500 px-6 py-3"
        onPress={() => router.push('/progress')}>
        <Text className="text-lg text-white">View Progress</Text>
      </Pressable>

      <Pressable
        className="mb-3 rounded-lg bg-green-500 px-6 py-3"
        onPress={() => router.push('/challenges')}>
        <Text className="text-lg text-white">Challenges</Text>
      </Pressable>

      <Pressable
        className="rounded-lg bg-yellow-500 px-6 py-3"
        onPress={() => router.push('/settings')}>
        <Text className="text-lg text-black">Settings</Text>
      </Pressable>
    </View>
  );
}

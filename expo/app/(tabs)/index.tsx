import { useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-900 p-6">
      {/* Title at the same level as Progress, Challenges, Settings */}
      <View className="mt-10 items-center">
        <Text className="text-2xl font-bold text-white">Welcome, Hunter!</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <Pressable
          className="mb-4 w-full max-w-sm rounded-lg bg-blue-500 p-4"
          onPress={() => router.push('/progress')}>
          <Text className="text-center text-lg font-bold text-white">Progress</Text>
        </Pressable>

        <Pressable
          className="mb-4 w-full max-w-sm rounded-lg bg-green-500 p-4"
          onPress={() => router.push('/challenges')}>
          <Text className="text-center text-lg font-bold text-white">Challenges</Text>
        </Pressable>

        <Pressable
          className="w-full max-w-sm rounded-lg bg-gray-700 p-4"
          onPress={() => router.push('/settings')}>
          <Text className="text-center text-lg font-bold text-white">Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [typedText, setTypedText] = useState('');
  const message = '[SYSTEM MESSAGE] Welcome, Hunter!';

  useEffect(() => {
    let index = 0;
    setTypedText('');
    const interval = setInterval(() => {
      if (index < message.length) {
        setTypedText((prev) => message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 bg-gray-900 p-6">
      {/* Typing System Message */}
      <View className="mt-10 min-h-[64px] items-center">
        <Text className="h2 text-green-400">{typedText}</Text>
      </View>

      {/* Main Nav Buttons */}
      <View className="flex-1 items-center justify-center gap-4">
        <Pressable
          className="w-full items-center justify-center rounded-lg border border-blue-400 bg-transparent p-4 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={() => router.push('/progress')}>
          <View className="flex-row items-center">
            <Ionicons name="bar-chart" size={20} color="#4CAF50" className="mr-2" />
            <Text className="body1 font-semibold text-blue-400">View Progress</Text>
          </View>
        </Pressable>

        <Pressable
          className="w-full items-center justify-center rounded-lg border border-purple-400 bg-transparent p-4 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={() => router.push('/quests')}>
          <View className="flex-row items-center">
            <Ionicons name="trophy" size={20} color="#D8BFD8" className="mr-2" />
            <Text className="body1 font-semibold text-purple-400">Quests</Text>
          </View>
        </Pressable>

        <Pressable
          className="w-full items-center justify-center rounded-lg border border-yellow-400 bg-transparent p-4 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={() => router.push('/settings')}>
          <View className="flex-row items-center">
            <Ionicons name="settings" size={20} color="#FFD700" className="mr-2" />
            <Text className="body1 font-semibold text-yellow-400">Settings</Text>
          </View>
        </Pressable>
      </View>

      {/* Cat GIF at the bottom-right */}
      <Image
        source={require('assets/cat.gif')}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 20,
          width: 50,
          height: 50,
        }}
      />
    </View>
  );
}

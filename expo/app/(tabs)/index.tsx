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
    <View className="bg-brand-background flex-1 p-6">
      {/* Typing System Message */}
      <View className="mt-10 min-h-[64px] items-center">
        <Text className="h2 text-success">{typedText}</Text>
      </View>

      {/* Main Nav Buttons */}
      <View className="flex-1 items-center justify-center gap-4">
        <Pressable
          className="border-brand-outline w-full items-center justify-center rounded-lg border bg-transparent p-4 active:scale-95"
          onPress={() => router.push('/progress')}>
          <View className="flex-row items-center">
            <Ionicons name="bar-chart" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
            <Text className="body1 text-brand font-semibold">View Progress</Text>
          </View>
        </Pressable>

        <Pressable
          className="border-neutral-outline w-full items-center justify-center rounded-lg border bg-transparent p-4 active:scale-95"
          onPress={() => router.push('/quests')}>
          <View className="flex-row items-center">
            <Ionicons name="trophy" size={20} color="#A78BFA" style={{ marginRight: 8 }} />
            <Text className="body1 text-neutral font-semibold">Quests</Text>
          </View>
        </Pressable>

        <Pressable
          className="border-warning-outline w-full items-center justify-center rounded-lg border bg-transparent p-4 active:scale-95"
          onPress={() => router.push('/settings')}>
          <View className="flex-row items-center">
            <Ionicons name="settings" size={20} color="#FCD34D" style={{ marginRight: 8 }} />
            <Text className="body1 text-warning font-semibold">Settings</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

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
    <View className="flex-1 bg-brand-background p-6">
      {/* Typing System Message */}
      <View className="mt-10 min-h-[64px] items-center">
        <Text className="h2 text-success">{typedText}</Text>
      </View>
    </View>
  );
}

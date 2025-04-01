import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-brand-background p-6">
      <View className="mt-10 items-center">
        <Text className="h1 text-white">HISTORY</Text>
      </View>
    </View>
  );
}

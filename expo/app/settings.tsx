import { useState } from 'react';
import { View, Text, Pressable, Switch } from 'react-native';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-6">
      <Text className="mb-4 text-2xl font-bold text-white">Settings</Text>

      <View className="w-full max-w-sm flex-row items-center justify-between rounded-lg bg-gray-800 p-4">
        <Text className="text-lg text-white">Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
          thumbColor={isDarkMode ? '#4CAF50' : '#f4f3f4'}
        />
      </View>

      <Pressable
        className="mt-6 rounded-lg bg-red-500 px-6 py-3"
        onPress={() => console.log('Logout')}>
        <Text className="text-lg text-white">Logout</Text>
      </Pressable>
    </View>
  );
}

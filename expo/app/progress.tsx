import { View, Text, Pressable, ProgressBarAndroid } from 'react-native';

export default function ProgressScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-6">
      <Text className="mb-4 text-2xl font-bold text-white">Progress!</Text>

      <Text className="mb-2 text-white">Level: 5</Text>
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={0.6}
        color="#4CAF50"
      />

      <Text className="mt-4 text-white">XP: 1200 / 2000</Text>

      <Pressable
        className="mt-6 rounded-lg bg-blue-500 px-6 py-3"
        onPress={() => console.log('View Achievements')}>
        <Text className="text-lg text-white">View Achievements</Text>
      </Pressable>
    </View>
  );
}

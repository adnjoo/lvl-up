import { View, Text, Pressable, FlatList } from 'react-native';

const challenges = [
  { id: '1', title: 'Complete 5 Workouts', progress: 3, total: 5 },
  { id: '2', title: 'Read for 30 Minutes', progress: 20, total: 30 },
  { id: '3', title: 'Meditate for 10 Minutes', progress: 10, total: 10 },
  { id: '4', title: 'Drink 2L of Water', progress: 1.5, total: 2 },
];

export default function ChallengesScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-6">
      <Text className="mb-4 text-2xl font-bold text-white">Challenges</Text>

      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 w-full rounded-lg bg-gray-800 p-4">
            <Text className="text-lg font-semibold text-white">{item.title}</Text>
            <View className="mt-2 h-2 w-full bg-gray-700">
              <View
                style={{ width: `${(item.progress / item.total) * 100}%` }}
                className="h-full bg-green-500"
              />
            </View>
            <Text className="mt-2 text-white">
              {item.progress} / {item.total}
            </Text>
          </View>
        )}
      />

      <Pressable
        className="mt-6 rounded-lg bg-blue-500 px-6 py-3"
        onPress={() => console.log('View More Challenges')}>
        <Text className="text-lg text-white">View More</Text>
      </Pressable>
    </View>
  );
}

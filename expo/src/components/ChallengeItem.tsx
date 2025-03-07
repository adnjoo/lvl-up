import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface ChallengeItemProps {
  challenge: {
    id: string;
    title: string;
    progress: number;
    total: number;
    reward: number;
    completed: boolean;
  };
  onIncrement: (id: string) => void;
  onClaim: (id: string, reward: number) => void;
  onDelete: (id: string) => void;
}

const ChallengeItem = ({ challenge, onIncrement, onClaim, onDelete }: ChallengeItemProps) => {
  return (
    <View className="mb-4 w-full rounded-lg bg-gray-800 p-4">
      <Text className="text-lg font-semibold text-white">{challenge.title}</Text>
      <View className="mt-2 h-2 w-full bg-gray-700">
        <View
          style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
          className="h-full bg-green-500"
        />
      </View>
      <Text className="mt-2 text-white">
        {challenge.progress} / {challenge.total}
      </Text>

      {!challenge.completed ? (
        <Pressable
          className="mt-2 rounded-lg bg-green-500 px-4 py-2"
          onPress={() => onIncrement(challenge.id)}>
          <Text className="text-white">Mark as Done</Text>
        </Pressable>
      ) : (
        <Pressable
          className="mt-2 rounded-lg bg-yellow-500 px-4 py-2"
          onPress={() => onClaim(challenge.id, challenge.reward)}>
          <Text className="text-white">Claim {challenge.reward} XP</Text>
        </Pressable>
      )}

      <Pressable
        className="mt-2 rounded-lg bg-red-500 px-4 py-2"
        onPress={() => onDelete(challenge.id)}>
        <Text className="text-white">Delete</Text>
      </Pressable>
    </View>
  );
};

export default ChallengeItem;

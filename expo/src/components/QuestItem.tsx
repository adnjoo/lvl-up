import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface QuestItemProps {
  quest: {
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

const QuestItem = ({ quest, onIncrement, onClaim, onDelete }: QuestItemProps) => {
  return (
    <View className="mb-4 w-full rounded-lg bg-gray-800 p-2">
      <Text className="text-lg font-semibold text-white">{quest.title}</Text>
      <View className="mt-2 h-2 w-full bg-gray-700">
        <View
          style={{ width: `${(quest.progress / quest.total) * 100}%` }}
          className="h-full bg-green-500"
        />
      </View>
      <Text className="mt-2 text-white">
        {quest.progress} / {quest.total}
      </Text>
      {!quest.completed ? (
        <Pressable
          className="mt-2 rounded-lg bg-green-500 px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={() => onIncrement(quest.id)}>
          <Text className="text-white">Mark as Done</Text>
        </Pressable>
      ) : (
        <Pressable
          className="mt-2 rounded-lg bg-yellow-500 px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={() => onClaim(quest.id, quest.reward)}>
          <Text className="text-white">Claim {quest.reward} XP</Text>
        </Pressable>
      )}
      <Pressable
        className="mt-2 rounded-lg bg-red-500 px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95"
        onPress={() => onDelete(quest.id)}>
        {' '}
        <Text className="text-white">Delete</Text>
      </Pressable>
    </View>
  );
};

export default QuestItem;

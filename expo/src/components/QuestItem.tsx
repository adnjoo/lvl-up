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
    <View className="mb-4 w-full rounded-lg bg-gray-800 p-4">
      {/* Title */}
      <Text className="body1 text-white">{quest.title}</Text>

      {/* Progress bar */}
      <View className="mt-2 h-2 w-full bg-gray-700">
        <View
          style={{ width: `${(quest.progress / quest.total) * 100}%` }}
          className="h-full bg-green-500"
        />
      </View>

      {/* Progress text */}
      <Text className="caption mt-2 text-white">
        {quest.progress} / {quest.total}
      </Text>

      {/* Action buttons */}
      {!quest.completed ? (
        <Pressable
          className="mt-2 rounded-lg bg-green-500 px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={() => onIncrement(quest.id)}>
          <Text className="body1 text-white">Mark as Done</Text>
        </Pressable>
      ) : (
        <Pressable
          className="mt-2 rounded-lg bg-yellow-500 px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95"
          onPress={() => onClaim(quest.id, quest.reward)}>
          <Text className="body1 text-white">Claim {quest.reward} XP</Text>
        </Pressable>
      )}

      <Pressable
        className="mt-2 rounded-lg bg-red-500 px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95"
        onPress={() => onDelete(quest.id)}>
        <Text className="body1 text-white">Delete</Text>
      </Pressable>
    </View>
  );
};

export default QuestItem;

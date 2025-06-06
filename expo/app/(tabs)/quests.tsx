import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, ActivityIndicator, TextInput } from 'react-native';

import QuestItem from '~/components/QuestItem';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_KEY;

export default function QuestsScreen() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingQuests, setLoadingQuests] = useState(true);
  const [userInput, setUserInput] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchQuests = async () => {
      if (!auth.currentUser) return;

      setLoadingQuests(true);

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setQuests(userData.quests || []);
      } else {
        await setDoc(userDocRef, { quests: [], archivedQuests: [], xp: 0 });
        setQuests([]);
      }

      setLoadingQuests(false);
    };

    fetchQuests();
  }, []);

  const generateQuest = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                "Transform the user's idea into a unique, fun, and achievable quest. If the user provides no input, generate a default daily quest. Max 30 tokens",
            },
            {
              role: 'user',
              content: userInput || 'Generate a fun and achievable daily quest.',
            },
          ],
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const questTitle = response.data.choices[0].message.content.trim();
      const newQuest = {
        id: Date.now().toString(),
        title: questTitle,
        progress: 0,
        total: 1,
        reward: 100,
        completed: false,
      };

      if (!auth.currentUser) return;
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const updatedQuests = [...(userData.quests || []), newQuest];

        await updateDoc(userDocRef, { quests: updatedQuests });
        setQuests(updatedQuests);
      }

      setUserInput('');
    } catch (error) {
      console.error('Error generating quest:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuest = async (questId) => {
    if (!auth.currentUser) return;

    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      let updatedQuests = userData.quests.filter((q) => q.id !== questId);

      await updateDoc(userDocRef, { quests: updatedQuests });
      setQuests(updatedQuests);
    }
  };

  const incrementProgress = async (questId) => {
    if (!auth.currentUser) return;

    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      let updatedQuests = userData.quests.map((q) => {
        if (q.id === questId && !q.completed) {
          const newProgress = q.progress + 1;
          return { ...q, progress: newProgress, completed: newProgress >= q.total };
        }
        return q;
      });

      await updateDoc(userDocRef, { quests: updatedQuests });
      setQuests(updatedQuests);
    }
  };

  const claimReward = async (questId, reward) => {
    if (!auth.currentUser) return;

    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();

      let updatedQuests = userData.quests.filter((q) => q.id !== questId);
      let archivedQuests = userData.archivedQuests || [];
      let completedQuest = userData.quests.find((q) => q.id === questId);
      if (completedQuest) {
        completedQuest.completedAt = new Date().toISOString().split('T')[0]; // e.g. "2024-04-01"
        archivedQuests.push(completedQuest);
      }

      await updateDoc(userDocRef, {
        xp: (userData.xp || 0) + reward,
        quests: updatedQuests,
        archivedQuests: archivedQuests,
      });

      setQuests(updatedQuests);
    }
  };

  return (
    <View className="bg-brand-background flex-1 p-6">
      <View className="mt-10 items-center">
        <Text className="h1 text-white">QUESTS</Text>
      </View>

      <TextInput
        className="body1 bg-white/5 mt-4 rounded-lg p-3 text-white"
        placeholder="Enter a quest idea or leave blank for AI"
        placeholderTextColor="#888"
        value={userInput}
        onChangeText={setUserInput}
      />

      <Pressable
        className="bg-brand mt-4 rounded-lg px-6 py-3 active:scale-95"
        onPress={generateQuest}>
        <Text className="body1 text-white">{loading ? 'Generating...' : 'Create Quest'}</Text>
      </Pressable>

      <View className="mt-4 flex-1 items-center justify-center">
        {loadingQuests ? (
          <ActivityIndicator size="large" color="#22C55E" />
        ) : (
          <FlatList
            data={quests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <QuestItem
                quest={item}
                onIncrement={incrementProgress}
                onClaim={claimReward}
                onDelete={deleteQuest}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, ActivityIndicator, TextInput } from 'react-native';

import ChallengeItem from '~/components/ChallengeItem';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_KEY;

export default function ChallengesScreen() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchChallenges = async () => {
      if (!auth.currentUser) return;

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setChallenges(userData.challenges || []);
      } else {
        await setDoc(userDocRef, { challenges: [], archivedChallenges: [], xp: 0 });
        setChallenges([]);
      }
    };

    fetchChallenges();
  }, []);

  const generateChallenge = async () => {
    setLoading(true);
    console.log('Generating challenge with user input:', userInput);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                "Transform the user's idea into a unique, fun, and achievable challenge. If the user provides no input, generate a default daily challenge. Max 30 tokens",
            },
            {
              role: 'user',
              content: userInput || 'Generate a fun and achievable daily challenge.',
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

      const challengeTitle = response.data.choices[0].message.content.trim();
      const newChallenge = {
        id: Date.now().toString(),
        title: challengeTitle,
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
        const updatedChallenges = [...(userData.challenges || []), newChallenge];

        await updateDoc(userDocRef, { challenges: updatedChallenges });
        setChallenges(updatedChallenges);
      }

      setUserInput(''); // Clear input after submission
    } catch (error) {
      console.error('Error generating challenge:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteChallenge = async (challengeId) => {
    if (!auth.currentUser) return;

    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      let updatedChallenges = userData.challenges.filter((ch) => ch.id !== challengeId);

      await updateDoc(userDocRef, { challenges: updatedChallenges });
      setChallenges(updatedChallenges);
    }
  };

  const incrementProgress = async (challengeId) => {
    if (!auth.currentUser) return;

    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      let updatedChallenges = userData.challenges.map((ch) => {
        if (ch.id === challengeId && !ch.completed) {
          const newProgress = ch.progress + 1;
          return { ...ch, progress: newProgress, completed: newProgress >= ch.total };
        }
        return ch;
      });

      await updateDoc(userDocRef, { challenges: updatedChallenges });
      setChallenges(updatedChallenges);
    }
  };

  const claimReward = async (challengeId, reward) => {
    if (!auth.currentUser) return;

    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();

      let updatedChallenges = userData.challenges.filter((ch) => ch.id !== challengeId);
      let archivedChallenges = userData.archivedChallenges || [];
      let completedChallenge = userData.challenges.find((ch) => ch.id === challengeId);
      if (completedChallenge) {
        archivedChallenges.push(completedChallenge);
      }

      await updateDoc(userDocRef, {
        xp: (userData.xp || 0) + reward,
        challenges: updatedChallenges,
        archivedChallenges: archivedChallenges,
      });

      setChallenges(updatedChallenges);
    }
  };

  return (
    <View className="flex-1 bg-gray-900 p-6">
      <View className="mt-10 items-center">
        <Text className="text-2xl font-bold text-white">Challenges</Text>
      </View>

      <TextInput
        className="mt-4 rounded-lg bg-gray-800 p-3 text-white"
        placeholder="Enter a challenge idea or leave blank for AI"
        placeholderTextColor="#888"
        value={userInput}
        onChangeText={setUserInput}
      />

      <Pressable className="mt-4 rounded-lg bg-blue-500 px-6 py-3" onPress={generateChallenge}>
        <Text className="text-lg text-white">{loading ? 'Generating...' : 'Create Challenge'}</Text>
      </Pressable>

      <View className="flex-1 items-center justify-center">
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <FlatList
            data={challenges}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChallengeItem
                challenge={item}
                onIncrement={incrementProgress}
                onClaim={claimReward}
                onDelete={deleteChallenge}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

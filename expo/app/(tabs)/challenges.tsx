import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';

const defaultChallenges = [
  { id: '1', title: 'Complete a Workout', progress: 0, total: 1, reward: 100, completed: false },
  { id: '2', title: 'Read for 30 Minutes', progress: 0, total: 1, reward: 100, completed: false },
  {
    id: '3',
    title: 'Meditate for 10 Minutes',
    progress: 0,
    total: 1,
    reward: 100,
    completed: false,
  },
  { id: '4', title: 'Drink 2L of Water', progress: 0, total: 1, reward: 100, completed: false },
];

export default function ChallengesScreen() {
  const [challenges, setChallenges] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchChallenges = async () => {
      if (!auth.currentUser) return;

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (userData.challenges && userData.challenges.length > 0) {
          setChallenges(userData.challenges);
        } else {
          await setDoc(
            userDocRef,
            { challenges: defaultChallenges, archivedChallenges: [] },
            { merge: true }
          );
          setChallenges(defaultChallenges);
        }
      } else {
        await setDoc(userDocRef, { challenges: defaultChallenges, archivedChallenges: [], xp: 0 });
        setChallenges(defaultChallenges);
      }
    };

    fetchChallenges();
  }, []);

  const incrementProgress = async (challengeId) => {
    if (!auth.currentUser) return;

    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      let updatedChallenges = userData.challenges.map((ch) => {
        if (ch.id === challengeId && !ch.completed) {
          const newProgress = ch.progress + 1;
          return {
            ...ch,
            progress: newProgress,
            completed: newProgress >= ch.total, // Mark as completed if goal reached
          };
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

      // Filter out the completed challenge
      let updatedChallenges = userData.challenges.filter((ch) => ch.id !== challengeId);

      // Move completed challenge to archived list
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

            {!item.completed ? (
              <Pressable
                className="mt-2 rounded-lg bg-green-500 px-4 py-2"
                onPress={() => incrementProgress(item.id)}>
                <Text className="text-white">Mark as Done</Text>
              </Pressable>
            ) : (
              <Pressable
                className="mt-2 rounded-lg bg-yellow-500 px-4 py-2"
                onPress={() => claimReward(item.id, item.reward)}>
                <Text className="text-white">Claim {item.reward} XP</Text>
              </Pressable>
            )}
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

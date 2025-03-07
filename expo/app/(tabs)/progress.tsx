import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function ProgressScreen() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [xpNeeded, setXpNeeded] = useState(1000);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        let currentXp = userData.xp || 0;
        let currentLevel = userData.level || 1;
        let requiredXp = userData.xpNeeded || calculateXpNeeded(currentLevel);

        while (currentXp >= requiredXp) {
          currentXp -= requiredXp;
          currentLevel += 1;
          requiredXp = calculateXpNeeded(currentLevel);
        }

        setXp(currentXp);
        setLevel(currentLevel);
        setXpNeeded(requiredXp);

        await updateDoc(userDocRef, {
          xp: currentXp,
          level: currentLevel,
          xpNeeded: requiredXp,
        });
      }
    };

    fetchUserData();
  }, []);

  const calculateXpNeeded = (level) => {
    return 1000 + level * 200;
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-6">
      <Text className="mb-4 text-2xl font-bold text-white">Progress!</Text>

      <Text className="mb-2 text-white">Level: {level}</Text>

      <AnimatedCircularProgress
        size={120}
        width={10}
        fill={(xp / xpNeeded) * 100}
        tintColor="#4CAF50"
        backgroundColor="#333"
        duration={1000}>
        {(fill) => <Text className="font-bold text-white">{Math.round(fill)}%</Text>}
      </AnimatedCircularProgress>

      <Text className="mt-4 text-white">
        XP: {xp} / {xpNeeded}
      </Text>

      <Pressable
        className="mt-6 rounded-lg bg-blue-500 px-6 py-3"
        onPress={() => console.log('View Achievements')}>
        <Text className="text-lg text-white">View Achievements</Text>
      </Pressable>
    </View>
  );
}

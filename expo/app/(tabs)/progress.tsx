import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ProgressBarAndroid } from 'react-native';

export default function ProgressScreen() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [xpNeeded, setXpNeeded] = useState(1000); // Base XP needed for level 1
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

        // Ensure leveling up if XP exceeds required XP
        while (currentXp >= requiredXp) {
          currentXp -= requiredXp; // Carry over excess XP
          currentLevel += 1;
          requiredXp = calculateXpNeeded(currentLevel); // Update XP needed for next level
        }

        setXp(currentXp);
        setLevel(currentLevel);
        setXpNeeded(requiredXp);

        // Update Firebase if level changed
        await updateDoc(userDocRef, {
          xp: currentXp,
          level: currentLevel,
          xpNeeded: requiredXp,
        });
      }
    };

    fetchUserData();
  }, []);

  // Function to calculate XP needed for the next level (can be adjusted)
  const calculateXpNeeded = (level) => {
    return 1000 + level * 200; // Example formula: Base XP increases by 200 per level
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-6">
      <Text className="mb-4 text-2xl font-bold text-white">Progress!</Text>

      <Text className="mb-2 text-white">Level: {level}</Text>
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={xp / xpNeeded}
        color="#4CAF50"
      />

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

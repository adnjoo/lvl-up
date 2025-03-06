import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ProgressBarAndroid } from 'react-native';

export default function ProgressScreen() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [xpNeeded, setXpNeeded] = useState(1000); // Default needed XP for next level
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setXp(userData.xp || 0);
        setLevel(userData.level || 1);
        setXpNeeded(userData.xpNeeded || 1000); // Adjust as per your leveling logic
      }
    };

    fetchUserData();
  }, []);

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

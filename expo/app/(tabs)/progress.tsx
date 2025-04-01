import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function ProgressScreen() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [xpNeeded, setXpNeeded] = useState(1000);
  const [loading, setLoading] = useState(true);
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

      setLoading(false);
    };

    fetchUserData();
  }, []);

  const calculateXpNeeded = (level: number) => {
    return 1000 + level * 200;
  };

  return (
    <View className="flex-1 bg-brand-background p-6">
      {/* Title */}
      <View className="mt-10 items-center">
        <Text className="h1 text-white">PROGRESS</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        {loading ? (
          <View className="items-center">
            <ActivityIndicator size="large" color="#22C55E" />
            <Text className="caption mt-2 text-white">Loading progress...</Text>
          </View>
        ) : (
          <>
            <Text className="body1 mb-2 text-white">Level: {level}</Text>
            <AnimatedCircularProgress
              size={120}
              width={10}
              fill={(xp / xpNeeded) * 100}
              tintColor="#22C55E" // success green
              backgroundColor="#1F2937" // dark gray bg
              duration={1000}>
              {(fill) => <Text className="body1 text-white">{Math.round(fill)}%</Text>}
            </AnimatedCircularProgress>
            <Text className="body1 mt-4 text-white">
              XP: {xp} / {xpNeeded}
            </Text>
          </>
        )}
      </View>
      {/* Cat GIF at the bottom-right */}
      <Image
        source={require('assets/cat.gif')}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 20,
          width: 50,
          height: 50,
        }}
      />
    </View>
  );
}

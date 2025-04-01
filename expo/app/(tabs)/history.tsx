import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function HistoryScreen() {
  const router = useRouter();
  const [markedDates, setMarkedDates] = useState({});
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchArchivedQuests = async () => {
      if (!auth.currentUser) return;

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        console.log('userData', userData);
        const archivedQuests = userData.archivedQuests || [];

        const dates = {};
        archivedQuests.forEach(q => {
          if (q.completedAt) {
            dates[q.completedAt] = {
              marked: true,
              dotColor: '#22C55E', // green dot
            };
          }
        });
        console.log('dates', dates);

        setMarkedDates(dates);
      }
    };

    fetchArchivedQuests();
  }, []);

  return (
    <View className="flex-1 bg-brand-background p-6">
      <View className="mt-10 items-center mb-4">
        <Text className="h1 text-white">HISTORY</Text>
      </View>

      <Calendar
        markedDates={markedDates}
        theme={{
          calendarBackground: '#0B0F23',
          textSectionTitleColor: '#FFFFFF',
          dayTextColor: '#FFFFFF',
          monthTextColor: '#FFFFFF',
          todayTextColor: '#FF4C4C',
          arrowColor: '#FFFFFF',
          textDisabledColor: '#555555',
          dotColor: '#22C55E',
          selectedDotColor: '#22C55E',
        }}
      />
    </View>
  );
}

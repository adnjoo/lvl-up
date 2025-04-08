import { useRouter } from 'expo-router';
import { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function HistoryScreen() {
  const router = useRouter();
  const [markedDates, setMarkedDates] = useState({});
  const [archivedQuests, setArchivedQuests] = useState([]);
  const [selectedDayQuests, setSelectedDayQuests] = useState([]);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchArchivedQuests = async () => {
      if (!auth.currentUser) return;

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const quests = userData.archivedQuests || [];
        setArchivedQuests(quests);

        const dates = {};
        quests.forEach((q) => {
          if (q.completedAt) {
            dates[q.completedAt] = {
              marked: true,
              dotColor: '#22C55E',
            };
          }
        });

        setMarkedDates(dates);
      }
    };

    fetchArchivedQuests();
  }, []);

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    const questsForDay = archivedQuests.filter((q) => q.completedAt === dateString);
    setSelectedDayQuests(questsForDay);
    bottomSheetRef.current?.expand();
  };

  return (
    <View className="flex-1 bg-brand-background p-6">
      <View className="mb-4 mt-10 items-center">
        <Text className="h1 text-white">HISTORY</Text>
      </View>

      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
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

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#111827' }}>
        <BottomSheetView className="p-4">
          <Text className="mb-2 text-lg text-white">Quests on this day:</Text>
          {selectedDayQuests.length > 0 ? (
            <FlatList
              data={selectedDayQuests}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="mb-2">
                  <Text className="text-white">• {item.title || 'Unnamed Quest'}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: '/(tabs)/edit-quest',
                        params: { quest: JSON.stringify(item) },
                      })
                    }
                    className="mt-1 self-start rounded bg-gray-700 px-2 py-1">
                    <Text className="text-sm text-white">Edit</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <Text className="text-gray-400">No quests found for this day.</Text>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

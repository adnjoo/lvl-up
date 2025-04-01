import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function HistoryScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>('');

  return (
    <View className="flex-1 bg-brand-background p-6">
      <View className="mb-4 mt-10 items-center">
        <Text className="h1 text-white">HISTORY</Text>
      </View>

      <Calendar
        onDayPress={(day) => setSelected(day.dateString)}
        markedDates={{
          '2024-01-05': { marked: true, selectedColor: '#FF4C4C', selected: true },
          '2024-01-09': { selected: true, color: '#4C6FFF' },
          '2024-01-10': { selected: true, color: '#4C6FFF' },
          '2024-01-11': { selected: true, color: '#4C6FFF' },
          [selected]: { selected: true, selectedColor: '#FFA500' },
        }}
        theme={{
          calendarBackground: '#0B0F23',
          textSectionTitleColor: '#FFFFFF',
          dayTextColor: '#FFFFFF',
          monthTextColor: '#FFFFFF',
          selectedDayBackgroundColor: '#4C6FFF',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#FF4C4C',
          arrowColor: '#FFFFFF',
          textDisabledColor: '#555555',
        }}
      />
    </View>
  );
}

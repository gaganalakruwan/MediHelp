import React, {useState} from 'react';
import {View} from 'react-native';
import {Calendar, CalendarProps} from 'react-native-calendars';
import style from './style';

interface CustomCalendarProps extends CalendarProps {
  onDateSelected?: (date: string) => void;
  markedDates?: Record<string, any>;
  initialDate?: string;
  theme?: Record<string, any>;
}

const CalendarComponent: React.FC<CustomCalendarProps> = ({
  onDateSelected,
  markedDates = {},
  initialDate = '',
  theme = {},
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    if (onDateSelected) {
      onDateSelected(day.dateString);
    }
  };

  return (
    <View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#0B8FAC',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#0B8FAC',
          todayTextColor: 'red',
          dayTextColor: 'black',
          arrowColor: '#0B8FAC',
          ...theme,
        }}
        {...props}
      />
    </View>
  );
};

export default CalendarComponent;

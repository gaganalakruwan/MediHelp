import React, {useState} from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header/Header';
import ActionButton from 'components/ActionButton';
import CalendarComponent from 'components/Calendar/Calendar';
import OutcomeCard from 'components/OutcomesCard/OutcomesCard';
import style from './style';

const DeleteOutcome = () => {
  const navigation = useNavigation();

  const [showOutcome, setShowOutcome] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      date: '2024-12-08',
      description: 'Corem ipsum dolor sit amet, adipiscing elit.',
    },
    {
      id: 2,
      date: '2024-12-08',
      description: 'Sed do eiusmod tempor incididunt.',
    },
    {
      id: 3,
      date: '2024-12-08',
      description: 'Lorem ipsum dolor sit amet.',
    },
  ];

  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];

  const handleDateSelected = (date: string) => {
    setSelectedDate(date);
    setError('');
  };

  const formatDateForDisplay = (date: string) => {
    const dateObj = new Date(date);

    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', {month: 'long'});
    const year = dateObj.getFullYear();

    // Determine the day suffix (st, nd, rd, th)
    const suffix = ['th', 'st', 'nd', 'rd'][
      day % 10 <= 3 && ![11, 12, 13].includes(day % 100) ? day % 10 : 0
    ];

    return `${day}${suffix} ${month} ${year}`;
  };

  const handleNext = () => {
    if (!showOutcome) {
      if (!selectedDate) {
        setError('Please select a date before proceeding.');
      } else {
        setShowOutcome(true);
      }
    } else {
      handleDelete();
    }
  };

  const handleDelete = () => {
    Alert.alert('Success', 'Outcome deleted successfully.', [
      {text: 'OK', onPress: () => navigation.navigate('HOME' as never)},
    ]);
  };

  const handleBackPress = () => {
    if (showOutcome) {
      setShowOutcome(false);
    } else {
      navigation.navigate('HOME' as never);
    }
  };

  // Filter outcomes based on the selected date
  const filteredCards = cards.filter(card => card.date === selectedDate);

  const renderCard = ({item}: {item: (typeof cards)[0]}) => (
    <OutcomeCard
      date={formatDateForDisplay(item.date)}
      description={item.description}
      isSelected={selectedCard === item.id}
      onPress={() => setSelectedCard(item.id)}
    />
  );

  return (
    <SafeAreaView style={style.container}>
      <Header isBack title="Delete Outcome" onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.flexContainer}>
        <View style={style.contentContainer}>
          {!showOutcome ? (
            <View>
              <Text style={style.title}>Select Date</Text>
              <CalendarComponent
                onDateSelected={handleDateSelected}
                markedDates={{
                  [todayFormatted]: {marked: true, dotColor: 'red'},
                }}
              />
              {error ? <Text style={style.error}>{error}</Text> : null}
            </View>
          ) : filteredCards.length > 0 ? (
            <FlatList
              data={filteredCards}
              keyExtractor={item => item.id.toString()}
              renderItem={renderCard}
              contentContainerStyle={style.flatListContainer}
            />
          ) : (
            <Text style={style.noOutcomesText}>
              No outcomes available for the selected date.
            </Text>
          )}
        </View>
        <View style={style.buttonContainer}>
          <ActionButton
            title={showOutcome ? 'Delete' : 'Next'}
            onPress={handleNext}
            customStyle={{
              width: '60%',
              backgroundColor: showOutcome ? '#CC3F08' : '#0B8FAC',
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DeleteOutcome;

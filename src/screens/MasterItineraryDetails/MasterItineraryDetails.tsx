import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from 'components/Header/Header';
import style from './style';
import CalendarComponent from 'components/Calendar/Calendar';
import CustomIcon from 'components/CustomIcon'; // Assuming you have an icon component
import OutcomeCard from 'components/OutcomesCard/OutcomesCard';

const MasterItineraryDetails = () => {
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [markedDates, setMarkedDates] = useState({});

  const cards = [
    {
      id: 1,
      date: '2024-12-08',
      location: 'Kalutara',
      client: 'Anura',
      time: '15 Min',
      status: 'completed',
    },
    {
      id: 2,
      date: '2024-12-15',
      location: 'Colombo',
      client: 'Anura',
      time: '15 Min',
      status: 'pending',
    },
    {
      id: 3,
      date: '2024-12-08',
      location: 'Jaffna',
      client: 'Anura',
      time: '15 Min',
      status: 'canceled',
    },
    {
      id: 4,
      date: '2024-12-09',
      location: 'Kandy',
      client: 'Anura',
      time: '15 Min',
      status: 'completed',
    },
  ];

  const handleDateSelected = date => {
    setSelectedDate(date);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#68B8C1'; // Green-ish
      case 'pending':
        return '#FFEA00'; // Yellow
      case 'canceled':
        return '#FAA0A0'; // Red-ish
    }
  };

  const generateMarkedDates = () => {
    const marked: {[key: string]: any} = {};

    cards.forEach(card => {
      marked[card.date] = {
        marked: true,
        selected: true,
        dotColor: getStatusColor(card.status), // Dot color as before
        selectedColor: getStatusColor(card.status),
      };
    });

    return marked;
  };

  useEffect(() => {
    setMarkedDates(generateMarkedDates());
  }, [cards]);

  // Filter outcomes based on the selected date
  const filteredCards = cards.filter(card => card.date === selectedDate);

  const renderCard = ({item}: {item: (typeof cards)[0]}) => (
    <OutcomeCard
      date={formatDateForDisplay(item.date)}
      location={item.location}
      time={item.time}
      client={item.client}
      isSelected={selectedCard === item.id}
      onPress={() => setSelectedCard(item.id)}
    />
  );

  return (
    <SafeAreaView style={style.container}>
      <Header isBack title="Master Itinerary Details" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            <View style={style.headerRow}>
              <Text style={style.selectDateText}>Select Date</Text>
              <TouchableOpacity style={style.filterIcon}>
                <CustomIcon
                  icon={'sliders'}
                  type={'FontAwesome'}
                  size={18}
                  color={'#0B8FAC'}
                />
              </TouchableOpacity>
            </View>

            <CalendarComponent
              onDateSelected={handleDateSelected}
              markedDates={markedDates} // Dynamically updating the markedDates with status color
            />

            <View style={style.separatorLine} />

            {/* Status Section with small colored squares */}
            <View style={style.statusRow}>
              <View style={style.statusItem}>
                <View
                  style={[style.statusSquare, {backgroundColor: '#68B8C1'}]}
                />
                <Text style={style.statusLabel}>Completed</Text>
              </View>
              <View style={style.statusItem}>
                <View
                  style={[style.statusSquare, {backgroundColor: '#FFEA00'}]}
                />
                <Text style={style.statusLabel}>Pending</Text>
              </View>
              <View style={style.statusItem}>
                <View
                  style={[style.statusSquare, {backgroundColor: '#FAA0A0'}]}
                />
                <Text style={style.statusLabel}>Canceled</Text>
              </View>
            </View>

            {/* <FlatList
              data={cards.filter(card => card.date === selectedDate)}
              keyExtractor={item => item.id.toString()}
              renderItem={renderCard}
              contentContainerStyle={style.flatListContainer}
            /> */}

            {filteredCards.length > 0 ? (
              <FlatList
                data={filteredCards}
                keyExtractor={item => item.id.toString()}
                renderItem={renderCard}
                contentContainerStyle={style.flatListContainer}
              />
            ) : (
              <Text style={style.noOutcomesText}>
                No data available for the selected date.
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MasterItineraryDetails;

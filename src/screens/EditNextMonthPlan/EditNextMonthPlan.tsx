import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from 'components/InputText';
import ActionButton from 'components/ActionButton';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header/Header';
import style from './style';
import CalendarComponent from 'components/Calendar/Calendar';
import CustomIcon from 'components/CustomIcon';
import DatePicker from 'react-native-date-picker';
import Dropdown from 'components/DropdownSelectList/DropdownSelectList';
import OutcomeCard from 'components/OutcomesCard/OutcomesCard';
import {FlatList} from 'react-native-gesture-handler';

const EditNextMonthPlan = () => {
  const navigation = useNavigation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    itineraryCategory: '',
    meetingPlace: 'Kalutara',
    mainDate: 'Sample comment',
    mainTime: 'Colombo',
    reason: '',
    comments: '',
  });

  // Get today's date in the required format
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const options = {timeZone: 'Asia/Colombo'};
  const currentDate = date.toLocaleDateString('en-US', options);
  const dateString = currentDate;
  const dateParts = dateString.split('/');
  const year = parseInt(dateParts[2]);
  const formattedDate = `${year}-${dateParts[0].padStart(
    2,
    '0',
  )}-${dateParts[1].padStart(2, '0')}`;

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [open1, setOpen1] = useState(false);

  const dropdownData = [
    {key: 1, value: 'Option 1'},
    {key: 2, value: 'Option 2'},
    {key: 3, value: 'Option 3'},
  ];

  const handleSelect = (value: string) => {
    console.log('Selected Value:', value);
  };

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

  const handleDateSelected = date => {
    setSelectedDate(date);
    setFormData(prev => ({...prev, postponedDate: date}));
    setError(''); // Clear error when a valid selection is made
  };

  const handleNext = () => {
    if (!selectedDate || selectedCard === null) {
      Alert.alert('Error', 'Please select a date and an outcome.');
      return;
    }
    setShowForm(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleFormSubmit = () => {
    const {
      itineraryCategory,
      meetingPlace,
      mainDate,
      mainTime,
      reason,
      comments,
    } = formData;
    if (
      !itineraryCategory ||
      !meetingPlace ||
      !mainDate ||
      !mainTime ||
      !reason ||
      !comments
    ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    console.log('Form Data Submitted:', formData);

    Alert.alert('Success', 'Outcome updated successfully.', [
      {text: 'OK', onPress: () => navigation.navigate('HOME' as never)},
    ]);
  };

  const handleBackPress = () => {
    if (showForm) {
      setShowForm(false);
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
      <Header
        isBack
        title="Edit Next Month Plan"
        onBackPress={handleBackPress}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            {!showForm ? (
              <View>
                <View className="mb-7 -mt-2">
                  <Text className="text-black font-bold text-lg ml-7">
                    Select Date
                  </Text>
                </View>
                <CalendarComponent
                  onDateSelected={handleDateSelected}
                  markedDates={{
                    [todayFormatted]: {marked: true, dotColor: 'red'},
                  }}
                />
                {error ? <Text style={style.error}>{error}</Text> : null}
                {/* <Text style={style.text}>
                  Selected Date: {selectedDate || 'None'}
                </Text> */}
                {filteredCards.length > 0 ? (
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
            ) : (
              <View>
                <View>
                  <Dropdown
                    data={dropdownData}
                    placeholder="Select Itinerary Category"
                    onSelect={handleSelect}
                    dropdownStyles={{
                      borderRadius: 10,
                    }}
                    dropdownTextStyles={{color: '#333'}}
                    label="Itinerary Category"
                    labelFontSize={18}
                    labelFontWeight="bold"
                  />
                </View>
                <InputText
                  value={formData.meetingPlace}
                  label="Meeting Place"
                  onChange={value => handleInputChange('meetingPlace', value)}
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                />

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <InputText
                    value={formattedDate}
                    label="Date"
                    labelFontSize={18}
                    labelFontWeight="bold"
                    placeholderFontSize={16}
                    editable={false}
                  />
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <CustomIcon
                      icon={'calendar-sharp'}
                      type={'Ionicons'}
                      size={25}
                      color={'#0B8FAC'}
                      style={{marginLeft: -45, marginTop: 18}}
                    />
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    onConfirm={(date: any) => {
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <InputText
                    value={time}
                    label="Time"
                    labelFontSize={18}
                    labelFontWeight="bold"
                    placeholderFontSize={16}
                    editable={false}
                  />
                  <TouchableOpacity onPress={() => setOpen1(true)}>
                    <CustomIcon
                      icon={'time'}
                      type={'Ionicons'}
                      size={25}
                      color={'#0B8FAC'}
                      style={{marginLeft: -45, marginTop: 18}}
                    />
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    open={open1}
                    date={date}
                    mode="time"
                    onConfirm={date => {
                      setOpen1(false);
                      setTime(date.toLocaleTimeString());
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>

                <InputText
                  value={formData.reason}
                  label="Reason"
                  onChange={value => handleInputChange('reason', value)}
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                />

                <InputText
                  value={formData.comments}
                  label="Comments"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  onChange={value => handleInputChange('comments', value)}
                  placeholderFontSize={16}
                  multiline={true}
                  numberOfLines={5}
                  inputStyle={{height: 105}}
                  maxLength={150}
                />
              </View>
            )}
          </View>
        </ScrollView>
        <View style={style.bttonStyle}>
          <ActionButton
            title={showForm ? 'Done' : 'Next'}
            onPress={handleNext}
            customStyle={{
              marginTop: 20,
              marginBottom: 40,
              width: '60%',
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditNextMonthPlan;

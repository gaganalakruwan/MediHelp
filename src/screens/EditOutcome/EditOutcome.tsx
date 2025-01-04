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

const EditOutcome = () => {
  const navigation = useNavigation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    postponedDate: '',
    feedback: 'Good service',
    comments: 'Sample comment',
    location: 'Colombo',
  });

  // Get today's date in the required format
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');

  const handleDateSelected = date => {
    setSelectedDate(date);
    setFormData(prev => ({...prev, postponedDate: date}));
    setError(''); // Clear error when a valid selection is made
  };

  const handleNext = () => {
    if (!showForm) {
      if (!selectedDate) {
        setError('Please select a date before proceeding.');
      } else {
        setShowForm(true);
      }
    } else {
      handleFormSubmit();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleFormSubmit = () => {
    const {postponedDate, feedback, comments, location} = formData;
    if (!postponedDate || !feedback || !comments || !location) {
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

  return (
    <SafeAreaView style={style.container}>
      <Header isBack title="Edit Outcome" onBackPress={handleBackPress} />
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
              </View>
            ) : (
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <InputText
                    value={formData.postponedDate}
                    label="Postponed Date"
                    labelFontSize={18}
                    labelFontWeight="bold"
                    placeholderFontSize={16}
                    editable={false}
                  />
                  {/* <TouchableOpacity onPress={() => setOpen(true)}>
                    <CustomIcon
                      icon="calendar-sharp"
                      type="Ionicons"
                      size={25}
                      color="#0B8FAC"
                      style={{marginLeft: -45, marginTop: 18}}
                    />
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    onConfirm={newDate => {
                      setOpen(false);
                      const formattedDate = newDate.toISOString().split('T')[0];
                      setDate(newDate);
                      setFormData(prev => ({
                        ...prev,
                        postponedDate: formattedDate,
                      }));
                    }}
                    onCancel={() => setOpen(false)}
                  /> */}
                </View>

                <InputText
                  value={formData.feedback}
                  label="Feedback"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                  onChange={value => handleInputChange('feedback', value)}
                />

                <InputText
                  value={formData.comments}
                  label="Comments"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                  multiline
                  numberOfLines={5}
                  inputStyle={{height: 155}}
                  maxLength={150}
                  onChange={value => handleInputChange('comments', value)}
                />

                <InputText
                  value={formData.location}
                  label="Track Geo Location"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                  onChange={value => handleInputChange('location', value)}
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

export default EditOutcome;

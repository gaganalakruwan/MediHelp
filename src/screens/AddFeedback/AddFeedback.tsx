import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from 'components/InputText';
import ActionButton from 'components/ActionButton';
import CustomIcon from 'components/CustomIcon';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header/Header';
import DatePicker from 'react-native-date-picker';
import Dropdown from 'components/DropdownSelectList/DropdownSelectList';

const AddFeedback = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
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

  return (
    <SafeAreaView style={style.container}>
      <Header
        isBack
        title="Add Feedback"
        onBackPress={() => navigation.navigate('HOME' as never)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
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
              value={feedback}
              onChange={setFeedback}
              label="Feedback"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
              multiline={true}
              numberOfLines={5}
              inputStyle={{height: 105}}
              maxLength={150}
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

            {/* <View className="mt-1 flex justify-center items-center">
              <ActionButton
                title={'Add'}
                customStyle={{
                  marginTop: 40,
                  marginBottom: 40,
                  width: '60%',
                }}
              />
            </View> */}
          </View>
        </ScrollView>
        {/* Button at the bottom */}
        <View className="mt-1 flex justify-center items-center">
          <ActionButton
            title={'Add'}
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

export default AddFeedback;

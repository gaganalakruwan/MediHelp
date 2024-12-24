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

const UploadOutcome = () => {
  const navigation = useNavigation();
  const [postponedDate, setPostponedDate] = useState('');
  const [feedBack, setFeedBack] = useState('');
  const [comments, setComments] = useState('');
  const [geoLocation, setGeoLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const options = {timeZone: 'Asia/Colombo'};
  const currentDate = date.toLocaleDateString('en-US', options);
  const dateString = currentDate;
  const dateParts = dateString.split('/');
  const year = parseInt(dateParts[2]);
  const formattedDate = postponedDate
    ? `${year}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(
        2,
        '0',
      )}`
    : '';

  return (
    <SafeAreaView style={style.container}>
      <Header
        isBack
        title="Upload Outcome"
        onBackPress={() => navigation.navigate('HOME' as never)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InputText
                value={formattedDate}
                onChange={setPostponedDate}
                label="Postponed Date"
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
                  setPostponedDate(date);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>

            <InputText
              value={feedBack}
              onChange={setFeedBack}
              label="Feedback"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={comments}
              onChange={setComments}
              label="Comments"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
              multiline={true}
              numberOfLines={5}
              inputStyle={{height: 155}}
              maxLength={150}
            />

            <InputText
              value={geoLocation}
              onChange={setGeoLocation}
              label="Track Geo Location"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <View className="mt-1 flex justify-center items-center">
              <ActionButton
                title={'Add'}
                customStyle={{
                  marginTop: 110,
                  marginBottom: 40,
                  width: '60%',
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UploadOutcome;

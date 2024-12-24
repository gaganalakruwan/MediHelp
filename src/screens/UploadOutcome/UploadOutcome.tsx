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

const UploadOutcome = () => {
  const navigation = useNavigation();
  const [postponedDate, setPostponedDate] = useState('');
  const [feedBack, setFeedBack] = useState('');
  const [comments, setComments] = useState('');
  const [geoLocation, setGeoLocation] = useState('');

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
            <InputText
              value={postponedDate}
              onChange={setPostponedDate}
              label="Postponed Date"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

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
                  marginTop: 90,
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

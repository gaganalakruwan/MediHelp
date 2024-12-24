import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from 'components/InputText';
import ActionButton from 'components/ActionButton';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header/Header';
import style from './style';

const AddItineraryCategory = () => {
  const navigation = useNavigation();
  const [itineraryCategory, setItineraryCategory] = useState('');

  return (
    <SafeAreaView style={style.container}>
      <Header
        isBack
        title="Add Itinerary Category"
        onBackPress={() => navigation.navigate('HOME' as never)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            <InputText
              value={itineraryCategory}
              onChange={setItineraryCategory}
              label="Itinerary Category"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />
          </View>
        </ScrollView>
        {/* Button at the bottom */}
        <View className="mt-1 flex justify-center items-center">
          <ActionButton
            title={'Add'}
            customStyle={{
              marginTop: 80,
              marginBottom: 50,
              width: '60%',
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddItineraryCategory;

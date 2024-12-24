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

const AddLocation = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [locationManager, setLocationManager] = useState('');
  const [mnagerContactNumber, setMnagerContactNumber] = useState('');

  return (
    <SafeAreaView style={style.container}>
      <Header
        isBack
        title="Add Location"
        onBackPress={() => navigation.navigate('HOME' as never)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            <View className="mb-7 mt-5">
              <Text className="text-Gray-600 font-bold text-xl">
                Location Details
              </Text>
            </View>

            <InputText
              value={name}
              onChange={setName}
              label="Name"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={address}
              onChange={setAddress}
              label="Address"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={contactNumber}
              onChange={setContactNumber}
              label="Contact Number"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={locationManager}
              onChange={setLocationManager}
              label="Location Manager"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={mnagerContactNumber}
              onChange={setMnagerContactNumber}
              label="Manager Contact Number"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <View className="mt-1 flex justify-center items-center">
              <ActionButton
                title={'Add'}
                customStyle={{
                  marginTop: 60,
                  marginBottom: 50,
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

export default AddLocation;

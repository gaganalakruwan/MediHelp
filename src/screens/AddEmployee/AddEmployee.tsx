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

const AddEmployee = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [epfNo, setEpfNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [allocateLocation, setAllocateLocation] = useState('');

  return (
    <SafeAreaView style={style.container}>
      <Header
        isBack
        title="Add Employee"
        onBackPress={() => navigation.navigate('HOME' as never)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            <View className="mb-7 mt-5">
              <Text className="text-Gray-600 font-bold text-xl">
                Employee Details
              </Text>
            </View>

            <InputText
              value={name}
              onChange={setName}
              label="Name"
              placeHolder="Enter Your Name"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={epfNo}
              onChange={setEpfNo}
              label="Epf No"
              placeHolder="Enter Your Epf No"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={address}
              onChange={setAddress}
              label="Address"
              placeHolder="Enter Your Address"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={mobileNumber}
              onChange={setMobileNumber}
              label="Mobile Number"
              placeHolder="Enter Your Mobile Number"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={email}
              onChange={setEmail}
              label="Email"
              placeHolder="Enter Your Email"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={allocateLocation}
              onChange={setAllocateLocation}
              label="Allocate Location"
              placeHolder="Enter Your Allocate Location"
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

export default AddEmployee;

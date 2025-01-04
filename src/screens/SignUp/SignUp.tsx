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

const SignUp = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  return (
    <SafeAreaView style={style.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            <View className="mt-10 items-center mb-8">
              <Text className="text-quatanary font-bold text-3xl">
                Create New Account
              </Text>
            </View>

            <InputText
              value={fullName}
              onChange={setFullName}
              label="Full Name"
              placeHolder="Enter Your Full Name"
            />

            <InputText
              value={email}
              onChange={setEmail}
              label="Email"
              placeHolder="Enter Your Email"
            />
            <InputText
              value={password}
              label="Password"
              onChange={setPassword}
              secureTextEntry
              placeHolder="Enter Your Password"
            />

            <InputText
              value={mobileNumber}
              onChange={setMobileNumber}
              label="Mobile Number"
              placeHolder="Enter Your Mobile Number"
            />

            <View className="mt-1">
              <ActionButton title={'Sign Up'} customStyle={{marginTop: 20}} />
            </View>

            {/* OR Divider */}
            <View className="flex-row items-center my-7">
              <View className="flex-1 h-[1px] " />
              <Text className="mx-2 text-Gray-400 font-semibold text-lg">
                OR
              </Text>
              <View className="flex-1 h-[1px]" />
            </View>

            {/* Social Login Buttons */}
            <View className="flex flex-row justify-center gap-6">
              <TouchableOpacity style={style.facebook}>
                <CustomIcon
                  icon={'logo-facebook'}
                  type={'Ionicons'}
                  size={45}
                  color={'#316FF6'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={style.google}>
                <Image
                  source={require('../../assets/images/google.png')}
                  style={style.googleImg}
                />
              </TouchableOpacity>
            </View>

            {/* Signup Section */}
            <View style={style.signup}>
              <Text className="font-semibold text-Gray-400 text-lg">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LOGIN' as never)}>
                <Text className="font-semibold text-quatanary text-lg">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

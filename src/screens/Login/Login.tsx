import {
  Alert,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from '../../components/InputText';
import {useNavigation} from '@react-navigation/native';
import ActionButton from 'components/ActionButton';
import style from './style';

import CustomIcon from 'components/CustomIcon';
import {useDispatch} from 'react-redux';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {CommonActions} from '../../redux/action/ApiAction';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // dispatch(endLoading());
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const authLogin = () => {
    dispatch(startLoading());
    dispatch(setMessage('Signin...'));
    var data = new FormData();
    data.append('username', email);
    data.append('password', password);

    dispatch(
      CommonActions.authLogin({
        params: data,
        success: (res: any) => {
          dispatch(endLoading());
          if (res?.status) {
            navigation.navigate('HOME' as never);
          }
          console.log('...........', res);
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('Login failed:', error);
        },
      }),
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        animated={true}
        backgroundColor="#FFF" // Set the desired background color (e.g., blue)
        barStyle="dark-content" // Light icons and text for dark backgrounds
        translucent={false} // Set to true for a transparent status bar
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            <View className="mt-10 items-center mb-8">
              <Text className="text-quatanary font-bold text-3xl">Welcome</Text>
            </View>

            <View className="mb-7">
              <Text className="text-black font-bold text-2xl">Login</Text>
            </View>

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

            <TouchableOpacity className="items-end mt-0">
              <Text className="font-semibold text-black text-base">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <View className="mt-6">
              <ActionButton
                title={'Login'}
                customStyle={{marginTop: 20}}
                onPress={() => authLogin()}
              />
            </View>

            {/* OR Divider */}
            <View className="flex-row items-center my-9">
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
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SIGNUP' as never)}>
                <Text className="font-semibold text-quatanary text-lg">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

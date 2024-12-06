import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from '../../components/InputText';
import {useNavigation} from '@react-navigation/native';
import ActionButton from 'components/ActionButton';
import {object, string, ref} from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import style from './style';

const Login = () => {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  useEffect(() => {
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

  return (
    <SafeAreaView style={style.container}>
      <View style={style.innerContainer}>
        <KeyboardAvoidingView>
          <View className="mt-10 items-center mb-10">
            <Text className="text-quatanary font-bold text-3xl">Welcome</Text>
          </View>
          <View className="mb-6">
            <Text className="text-black font-bold text-2xl">Login</Text>
          </View>
         
          <InputText
            value={email}
            onChange={setEmail}
            placeHolder="Email"
          />
          <InputText
            value={password}
            onChange={setPassword}
            secureTextEntry
            placeHolder="Password"
          />

          <View style={{}}>
            <ActionButton
              title={'Login'}
              customStyle={{marginTop: 20}}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Login;

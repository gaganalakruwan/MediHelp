import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from '../../components/InputText';
import {useNavigation} from '@react-navigation/native';
import ActionButton from 'components/ActionButton'; 
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
    <SafeAreaView className="flex">
      <View style={style.innerContainer}>
        <KeyboardAvoidingView >
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

          <TouchableOpacity className="items-end">
            <Text className="font-semibold text-black text-lg">Forget Password</Text>
          </TouchableOpacity>

          <View style={{}}>
            <ActionButton
              title={'Login'}
              customStyle={{marginTop: 20}}
            />
          </View>
        </KeyboardAvoidingView>
        <View className="flex-row">
          <Text>Don't you have an account?</Text>
          <TouchableOpacity>
          <Text>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

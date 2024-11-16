import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from '../../components/InputText';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import ActionButton from 'components/ActionButton';
import {object, string, ref} from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {auth} from 'utils/firebase';
import {useDispatch} from 'react-redux';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';

const SignUp = () => {
  const {goToLogin, control, setError, onSubmit} = useSignup();

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
          <View style={style.welcomeView}>
            <Text style={style.welcomeText}>Welcome</Text>
            <Text style={style.signInText}>Welcome to your Portal</Text>
          </View>
          <Controller
            control={control}
            name="username"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <InputText
                  value={value}
                  onChange={onChange}
                  keyboardType="email-address"
                  placeHolder="Email"
                  leftIcon={{
                    lIconName: 'mail',
                    lIconProvider: 'AntDesign',
                    lIconSize: 20,
                  }}
                  containerStyle={style.inputUsername}
                  error={error?.message}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <InputText
                  value={value}
                  onChange={onChange}
                  secureTextEntry
                  placeHolder="Password"
                  leftIcon={{
                    lIconName: 'lock',
                    lIconProvider: 'EvilIcons',
                    lIconSize: 30,
                  }}
                  containerStyle={style.inputPassword}
                  error={error?.message}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <InputText
                  value={value}
                  onChange={onChange}
                  secureTextEntry
                  placeHolder="Confirm Password"
                  leftIcon={{
                    lIconName: 'lock',
                    lIconProvider: 'EvilIcons',
                    lIconSize: 30,
                  }}
                  containerStyle={style.inputPassword}
                  error={error?.message}
                />
              </>
            )}
          />
          <View style={style.buttonContainer}>
            <ActionButton
              title={'Sign Up'}
              onPress={onSubmit}
              isRightIcon={true}
            />
            <ActionButton
              title={'Login'}
              onPress={goToLogin}
              isRightIcon={true}
              customStyle={{marginTop: 20}}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

/**
 * validation scema of each fields
 */

const schema = object({
  username: string()
    .required('Please enter Email')
    .default('')
    .email('Please Enter Valied Email Address'),
  password: string()
    .required('Please enter password')
    .min(4, 'Password should contain at least 4 letters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    ),
  confirmPassword: string()
    .required('Please enter re-password')
    .oneOf([ref('password')], 'Passwords must match'),
});

export const useSignup = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const goToLogin = useCallback(
    () => navigation.navigate('LOGIN'),
    [navigation],
  );

  const {
    control,
    setError,
    formState: {errors},
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  /**
   * Firebase signup function
   */
  const onSubmit = handleSubmit(async data => {
    try {
      dispatch(startLoading());
      dispatch(setMessage('Creating User'));
      await auth()
        .createUserWithEmailAndPassword(data.username, data.password)
        .then(res => {
          console.log(res.user);
          dispatch(endLoading());
          Alert.alert('Alert', 'User created, please login again', [
            {text: 'OK', onPress: () => goToLogin()},
          ]);
        })
        .catch(error => {});
    } catch (error) {
      Alert.alert('Error', 'User create Fail, please try again later', [
        {text: 'OK', onPress: () => goToLogin()},
      ]);
      console.error('Signup Error:', error);
    }
  });

  return {control, setError, onSubmit, goToLogin};
};

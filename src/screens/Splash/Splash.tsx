import {View, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from './style';
import {useSelector} from 'react-redux';

const Splash = () => {
  const navigation = useNavigation();
  const {userId} = useSelector((state: any) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userId) {
        navigation.navigate('HOME' as never);
      } else {
        navigation.navigate('LOGIN' as never);
      }
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        animated={true}
        backgroundColor="#CCF4F3"
        barStyle="dark-content"
      />
      <Image
        source={require('../../assets/images/landing.png')}
        style={style.fullScreenImage}
      />
    </SafeAreaView>
  );
};

export default Splash;

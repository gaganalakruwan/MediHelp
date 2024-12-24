import {View, Text} from 'react-native';
import React from 'react';
import Header from 'components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from './style';

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={style.container}>
      <Header isMenu />
    </SafeAreaView>
  );
};

export default Home;

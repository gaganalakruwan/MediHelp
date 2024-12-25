import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';

type props = {
  title: string;
  value: string;
};
const InfoItem = ({title, value}: props) => {
  return (
    <View style={style.container}>
      <Text style={style.titleText}>{title}</Text>
      <View style={style.valueContainer}>
        <Text style={style.valueText}>{value}</Text>
      </View>
    </View>
  );
};

export default InfoItem;

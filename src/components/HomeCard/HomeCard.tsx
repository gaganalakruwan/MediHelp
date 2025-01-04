import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  Button,
} from 'react-native';
import style from './style';

interface CardProps {
  title: string;
}

const HomeCard: React.FC<CardProps> = ({title}) => {
  return (
    <View style={[style.card]}>
      <View style={style.leftContent}>
        <Text style={style.titles}>{title}</Text>
      </View>
      <View style={style.rightContent}>
        <TouchableOpacity style={style.buttonAdd}>
          <Text style={style.buttonText}>Add </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonEdit}>
          <Text style={style.buttonText}>Edit </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonDelete}>
          <Text style={style.buttonText}> Delete </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeCard;

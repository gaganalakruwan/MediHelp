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
  onPressAdd?: () => void;
  onPressEdit?: () => void;
  onPressDelete?: () => void;
}

const HomeCard: React.FC<CardProps> = ({
  title,
  onPressAdd,
  onPressEdit,
  onPressDelete,
}) => {
  return (
    <View style={[style.card]}>
      <View style={style.leftContent}>
        <Text style={style.titles}>{title}</Text>
      </View>
      <View style={style.rightContent}>
        <TouchableOpacity style={style.buttonAdd} onPress={onPressAdd}>
          <Text style={style.buttonText}>Add </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonEdit} onPress={onPressEdit}>
          <Text style={style.buttonText}>Edit </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonDelete} onPress={onPressDelete}>
          <Text style={style.buttonText}> Delete </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeCard;

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import style from './style';

interface CardProps {
  title: string;
  onPress?: () => void;
  onPressAdd?: () => void;
  onPressEdit?: () => void;
  onPressDelete?: () => void;
  disabled?: boolean; // Prop to control if the card is touchable
}
const HomeCard: React.FC<CardProps> = ({
  title,
  onPress,
  onPressAdd,
  onPressEdit,
  onPressDelete,
  disabled = true,
}) => {
  const showEdit = !!onPressEdit;
  const showDelete = !!onPressDelete;
  const buttonCount = [onPressAdd, onPressEdit, onPressDelete].filter(
    Boolean,
  ).length;

  return (
    <TouchableOpacity
      style={[style.card, disabled && style.disabledCard]}
      disabled={disabled}
      onPress={onPress}>
      <View
        style={[style.leftContent, buttonCount === 0 && style.centeredContent]}>
        <Text style={style.titles}>{title}</Text>
      </View>
      {buttonCount > 0 && (
        <View style={style.rightContent}>
          {onPressAdd && (
            <TouchableOpacity style={[style.buttonAdd]} onPress={onPressAdd}>
              <Text style={style.buttonText}>Add</Text>
            </TouchableOpacity>
          )}
          {showEdit && (
            <TouchableOpacity style={[style.buttonEdit]} onPress={onPressEdit}>
              <Text style={style.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}
          {showDelete && (
            <TouchableOpacity
              style={[style.buttonDelete]}
              onPress={onPressDelete}>
              <Text style={style.buttonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HomeCard;

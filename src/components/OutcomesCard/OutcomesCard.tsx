import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import style from './style';

interface CardProps {
  date: string; // Format: "8th May 2024"
  description: string;
  time?: string; // Optional, for cards with no time
  isSelected: boolean; // If true, the card has a blue border
  onPress: (event: GestureResponderEvent) => void; // Click handler
}

const OutcomeCard: React.FC<CardProps> = ({
  date,
  description,
  time,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        style.card,
        isSelected && style.selectedCard,
        !time && style.noTimeCard,
      ]}
      onPress={onPress}>
      <View style={style.leftContent}>
        <Text style={style.date}>{date}</Text>
        <Text style={style.description}>{description}</Text>
      </View>
      {time && (
        <View style={style.rightContent}>
          <Text style={style.time}>{time}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default OutcomeCard;

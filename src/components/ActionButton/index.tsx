import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from 'constant/colors';
import {getScaleNumber} from 'utils/refDimention';
import CustomIcon from 'components/CustomIcon';
import style from './style';

type RightIconProps = {
  iconName?: string;
  iconProvider?: any;
  iconColor?: string;
  iconSize?: number;
};
type LeftIconProps = {
  lIconName?: string;
  lIconProvider?: any;
  lIconColor?: string;
  lIconSize?: number;
};

type InputProps = {
  rightIcon?: RightIconProps;
  leftIcon?: LeftIconProps;
  isRightIcon?: boolean;
  isLeftIcon?: boolean;
  title: String;
  onPress: () => void;
  customStyle?: any;
  titleStyle?: any;
  testId?:string;
};

const ActionButton = ({
  rightIcon,
  leftIcon,
  title,
  isRightIcon,
  isLeftIcon,
  onPress,
  customStyle,
  titleStyle,
  testId
}: InputProps) => {
  const {iconName, iconProvider, iconColor, iconSize} =
    (rightIcon as RightIconProps) || {};
  const {lIconName, lIconProvider, lIconColor, lIconSize} =
    (leftIcon as LeftIconProps) || {};
  return (
    <TouchableOpacity className="bg-quatanary h-12 items-center justify-center" style={[customStyle]} onPress={onPress} testID={testId}>
      {(leftIcon || isLeftIcon) && (
        <CustomIcon
          icon={lIconName || 'arrow-left'}
          type={lIconProvider || 'Feather'}
          size={lIconSize || 24}
          color={lIconColor || colors.backArrowBlack}
        />
      )}
      <Text className="text-white font-semibold text-lg" style={[titleStyle]}>{title}</Text>
      {(rightIcon || isRightIcon) && (
        <CustomIcon
          icon={iconName || 'arrow-right'}
          type={iconProvider || 'Feather'}
          size={iconSize || 20}
          color={iconColor || colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

export default ActionButton;

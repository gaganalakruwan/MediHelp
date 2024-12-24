import React, {useMemo, useState} from 'react';
import {
  View,
  TextInput,
  Keyboard,
  ViewStyle,
  KeyboardType,
  TouchableOpacity,
  Text,
} from 'react-native';

import style from './style';
import CustomIcon from '../CustomIcon';
import colors from '../../constant/colors';
// import { IconType } from 'type';

type RightIconProps = {
  iconName?: string;
  iconProvider?: any;
  iconColor?: string;
  iconSize?: number;
  action?: () => void;
};
type LeftIconProps = {
  lIconName?: string;
  lIconProvider?: any;
  lIconColor?: string;
  lIconSize?: number;
};

type InputProps = {
  label?: string;
  placeHolder: string;
  value: string;
  onChange?: (val: string) => void;
  containerStyle?: ViewStyle;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  autoFocus?: boolean | false;
  rightIcon?: RightIconProps;
  leftIcon?: LeftIconProps;
  inputStyle?: any;
  onFocus?: () => void;
  error?: string;
  editable?: boolean;
  testId?: string;
  labelFontSize?: number;
  placeholderFontSize?: number;
  labelFontWeight?: string;
};

const InputText = ({
  containerStyle,
  keyboardType,
  onChange,
  label,
  placeHolder,
  secureTextEntry,
  value,
  autoFocus = false,
  rightIcon,
  leftIcon,
  inputStyle,
  onFocus,
  error,
  editable,
  testId,
  labelFontSize,
  placeholderFontSize,
  labelFontWeight,
}: InputProps) => {
  const {
    iconName,
    iconProvider,
    iconColor,
    iconSize,
    action = () => {},
  } = (rightIcon as RightIconProps) || {};
  const {lIconName, lIconProvider, lIconColor, lIconSize} =
    (leftIcon as LeftIconProps) || {};
  const [passwordVisibility, setPasswordVisibility] = useState(secureTextEntry);

  const toggleVisibility = () => {
    setPasswordVisibility(current => !current);
  };

  const rightIconName = useMemo(() => {
    if (iconName) {
      return iconName;
    }
    if (!passwordVisibility) {
      return 'eye';
    } else {
      return 'eye-off';
    }
  }, [iconName, passwordVisibility]);

  return (
    <View className="w-full" style={[{...containerStyle}]}>
      <Text
        className="font-medium ml-1 mb-1 text-xl"
        style={{fontSize: labelFontSize, fontWeight: labelFontWeight}}>
        {label}
      </Text>
      <View style={style.inputWrapper}>
        <TextInput
          testID={testId}
          secureTextEntry={passwordVisibility}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChange}
          selectionColor="black"
          placeholder={placeHolder}
          editable={editable}
          onFocus={onFocus}
          className="w-full text-black pl-5 pt-2 pb-3 h-12 bg-primary rounded-xl text-lg"
          style={[inputStyle, {fontSize: placeholderFontSize}]}
          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
          autoFocus={autoFocus}
          placeholderTextColor={colors.darkGray}
        />
        {(iconName || secureTextEntry) && (
          <TouchableOpacity
            style={style.iconWrapper}
            onPress={secureTextEntry ? toggleVisibility : action}>
            <CustomIcon
              icon={rightIconName}
              type={iconProvider || 'Ionicons'}
              size={iconSize || 24}
              color={iconColor || colors.quatanary}
            />
          </TouchableOpacity>
        )}
        {lIconName && (
          <TouchableOpacity
            style={style.leftIconWrapper}
            onPress={secureTextEntry ? toggleVisibility : action}>
            <CustomIcon
              icon={lIconName}
              type={lIconProvider}
              size={lIconSize || 24}
              color={lIconColor || colors.quatanary}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={style.errorText}>{error}</Text>
    </View>
  );
};

export default InputText;

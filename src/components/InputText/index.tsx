import React, {useState} from 'react';
import {
  View,
  TextInput,
  Keyboard,
  ViewStyle,
  KeyboardType,
  Text,
} from 'react-native';

import style from './style';
import colors from '../../constant/colors';

type InputProps = {
  placeHolder: string;
  value: string;
  onChange?: (val: string) => void;
  containerStyle?: ViewStyle;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  autoFocus?: boolean | false;
  inputStyle?: any;
  onFocus?: void;
  error?: string;
  editable?: boolean;
  testId?: string;
};

const InputText = ({
  containerStyle,
  keyboardType,
  onChange,
  placeHolder,
  secureTextEntry,
  value,
  autoFocus = false,
  inputStyle,
  onFocus,
  error,
  editable,
  testId,
}: InputProps) => {

  const [passwordVisibility, setPasswordVisibility] = useState(secureTextEntry);


  return (
    <View style={[style.container, {...containerStyle}]}>
      <Text style={style.title}>{placeHolder}</Text>
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
          style={[
            style.input,
            inputStyle,
            (secureTextEntry) && style.secureInput,
          ]}
          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
          autoFocus={autoFocus}
          placeholderTextColor={colors.darkGray}
        />
      </View>
      <Text style={style.errorText}>{error}</Text>
    </View>
  );
};

export default InputText;

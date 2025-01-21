import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import style from './style';
import {SelectList} from 'react-native-dropdown-select-list';

import CustomIcon from 'components/CustomIcon';

type DropdownProps = {
  data: Array<{key: string | number; value: string}>;
  placeholder?: string;
  onSelect?: (selectedValue: string) => void;
  dropdownStyles?: any;
  dropdownTextStyles?: any;
  label?: string;
  selected?:any;
  setSelected?:any;
  labelFontSize?: number;
  labelFontWeight?: string;
  defaultOption?:any;
};

const Dropdown = ({
  label,
  data,
  placeholder = 'Select an option',
  onSelect,
  dropdownStyles,
  dropdownTextStyles,
  labelFontSize,
  labelFontWeight,
  selected,
  setSelected,
  defaultOption
}: DropdownProps) => {

  return (
    <View className="w-full">
      <Text
        className="font-medium ml-1 mb-1 text-xl"
        style={{fontSize: labelFontSize, fontWeight: labelFontWeight}}>
        {label}
      </Text>
      <View style={[style.container, dropdownStyles]}>
        <SelectList
          setSelected={(value: string) => {
            setSelected(value);
            onSelect(value); // Notify parent of selection
          }}
          data={data}
          save="value"
          placeholder={placeholder}
          dropdownTextStyles={[style.dropdownText, dropdownTextStyles]}
          inputStyles={style.input}
          boxStyles={{
            borderColor: '#CCF4F3',
            height: 48,
            backgroundColor: '#CCF4F3',
          }}
          dropdownStyles={{borderColor: '#CCF4F3', borderWidth: 4}}
          defaultOption={defaultOption}
          searchicon={
            <CustomIcon
              icon={'search'}
              type={'Ionicons'}
              size={20}
              color={'#0B8FAC'}
            />
          }
          arrowicon={
            <CustomIcon
              icon={'angle-down'}
              type={'FontAwesome'}
              size={20}
              color={'#0B8FAC'}
            />
          }
          closeicon={
            <CustomIcon
              icon={'close-sharp'}
              type={'Ionicons'}
              size={20}
              color={'#0B8FAC'}
            />
          }
          searchPlaceholder="search..."
        />
      </View>
    </View>
  );
};

export default Dropdown;

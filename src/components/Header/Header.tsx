import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import IconI from 'react-native-vector-icons/Ionicons';
import colors from 'constant/colors';
import {getScaleNumber} from '../../utils/refDimention';
import style from './style';

type props = {
  title?: string;
  isMenu?: boolean;
  onBackPress?: () => void;
  onPressProfileImage?: () => void;
  onPressNotification?: () => void;
  isBack?: boolean;
  isProfile?: boolean;
  username?: string;
  titleTextStyle?: any;
  containerStyles?: any;
  iconColor?: any;
};

const Header = ({
  title,
  isMenu,
  onBackPress,
  isBack,
  isProfile,
  username,
  onPressProfileImage,
  onPressNotification,
  titleTextStyle,
  containerStyles,
  iconColor,
}: props) => {
  return (
    <View style={[style.container, containerStyles]}>
      {isMenu ? (
        // Home Header Layout
        <View className="flex-row items-center mt-5">
          <Image
            source={require('../../assets/images/profile.jpg')}
            className="rounded-full w-12 h-12 mr-2 "
          />

          <View>
            <Text className="text-Gray-400 font-medium text-sm">
              Hey, Welcome Back!
            </Text>
            <Text className="text-black font-bold text-xl">
              {username || 'User'}
            </Text>
          </View>
        </View>
      ) : (
        // Other Pages Header Layout
        <TouchableOpacity onPress={onBackPress}>
          {isBack && (
            <IconI
              name="chevron-back"
              color={iconColor || colors.iconBlack}
              size={getScaleNumber(30)}
            />
          )}
        </TouchableOpacity>
      )}

      {!isMenu && (
        <Text style={[style.titleText, titleTextStyle]}>{title}</Text>
      )}

      <View style={{marginTop: 20}}>
        {isMenu && (
          // Notification Bell Icon for Home
          <TouchableOpacity onPress={onPressNotification}>
            <IconI
              name="notifications-outline"
              color={colors.iconBlack}
              size={getScaleNumber(30)}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

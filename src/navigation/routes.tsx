import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from 'screens/Login/Login';
import Home from 'screens/Home/Home';
import {StackParameterList} from './type';
import Splash from 'screens/Splash/Splash';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDraverContent from 'components/CustomDraverContent/CustomDraverContent';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, TouchableOpacity} from 'react-native';
import Profile from 'screens/Profile/Profile';
import {useNavigation} from '@react-navigation/native';
import IconF from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';
import SignUp from 'screens/SignUp/SignUp';
import ImageUpload from 'screens/ImageUpload/ImageUpload';
import UserMoreInfo from 'screens/UserMoreInfo/UserMoreInfo';
import Post from 'screens/Post/Post';
import colors from 'constant/colors';

const AuthStack = createStackNavigator<StackParameterList>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={'SPLASH' as keyof StackParameterList}>
      <AuthStack.Screen
        name={'SPLASH' as keyof StackParameterList}
        component={Splash}
      />
      <AuthStack.Screen
        name={'LOGIN' as keyof StackParameterList}
        component={Login}
      />
      <AuthStack.Screen
        name={'SIGNUP' as keyof StackParameterList}
        component={SignUp}
      />
      <AuthStack.Screen
        name={'IMAGE_UPLOAD' as keyof StackParameterList}
        component={ImageUpload}
      />
      <AuthStack.Screen
        name={'USER_MORE_INFO' as keyof StackParameterList}
        component={UserMoreInfo}
      />
      <AuthStack.Screen
        name={'DRAWER_NAVIGATION' as keyof StackParameterList}
        component={DrawerNavigation}
        options={{gestureEnabled: false}}
      />
    </AuthStack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="App"
      drawerContent={props => <CustomDraverContent {...props} />}
      screenOptions={{swipeEnabled: false}}>
      <Drawer.Screen
        key="app"
        name="App"
        component={NewBottomTab}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const NewBottomTab = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      screenOptions={({route, navigation}) => ({
        gestureEnabled: false,
        tabBarActiveTintColor: 'red',
        tabBarLabelStyle: {
          color: colors.gray,
        },
        tabBarStyle: {
          elevation: 1,
          backgroundColor: colors.headerBlack,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          ...Platform.select({
            ios: {
              marginTop: -35,
            },
            android: {
              marginTop: -20,
            },
          }),
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarButton: props => <TouchableOpacity {...props} />,
      })}>
      <Tab.Screen
        key="homeTab"
        name="HomeTab"
        component={HomeRoute}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Home',
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({focused, color, size}) => {
            return <IconF name={'home'} size={25} color={color} />;
          },
        }}
      />

      <Tab.Screen
        key="profileTab"
        name="ProfileTab"
        component={ProfileRoute}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused, color, size}) => {
            return <IconA name={'appstore-o'} size={25} color={color} />;
          },
          tabBarLabel: 'Profile',
          tabBarLabelPosition: 'below-icon',
        }}
      />
    </Tab.Navigator>
  );
};

const HomeRoute = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <HomeStack.Screen
        name="Post"
        component={Post}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </HomeStack.Navigator>
  );
};
const ProfileRoute = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </ProfileStack.Navigator>
  );
}; 

export default AuthStackNavigator;

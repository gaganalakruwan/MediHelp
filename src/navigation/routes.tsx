import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StackParameterList} from './type';
import SignUp from 'screens/SignUp/SignUp';
import Login from 'screens/Login/Login';
import Home from 'screens/Home/Home';
import Splash from 'screens/Splash/Splash';
import AddEmployee from 'screens/AddEmployee/AddEmployee';
import AddLocation from 'screens/AddLocation/AddLocation';

const AuthStack = createStackNavigator<StackParameterList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={'ADDLOCATION' as keyof StackParameterList}>
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
        name={'HOME' as keyof StackParameterList}
        component={Home}
      />

      <AuthStack.Screen
        name={'ADDEMPLOYEE' as keyof StackParameterList}
        component={AddEmployee}
      />

      <AuthStack.Screen
        name={'ADDLOCATION' as keyof StackParameterList}
        component={AddLocation}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;

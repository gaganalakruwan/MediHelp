import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StackParameterList} from './type';
import SignUp from 'screens/SignUp/SignUp';
import Login from 'screens/Login/Login';
import Home from 'screens/Home/Home';
import Splash from 'screens/Splash/Splash';
import AddEmployee from 'screens/AddEmployee/AddEmployee';
import AddLocation from 'screens/AddLocation/AddLocation';
import AddItineraryCategory from 'screens/AddItineraryCategory/AddItineraryCategory';
import UploadOutcome from 'screens/UploadOutcome/UploadOutcome';
import AddNextMonthPlan from 'screens/AddNextMonthPlan/AddNextMonthPlan';
import EditEmployee from 'screens/EditEmployee/EditEmployee';
import EditLocationDetails from 'screens/EditLocationDetails/EditLocationDetails';
import EditItineraryCategory from 'screens/EditItineraryCategory/EditItineraryCategoty';
import AddFeedback from 'screens/AddFeedback/AddFeedback';
import DeleteEmployee from 'screens/DeleteEmployee/DeleteEmployee';
import DeleteLocation from 'screens/DeleteLocation/DeleteLocation';
import DeleteItineraryCategory from 'screens/DeleteItineraryCategory/DeleteItineraryCategory';
import EditOutcome from 'screens/EditOutcome/EditOutcome';

const AuthStack = createStackNavigator<StackParameterList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={'EDITOUTCOME' as keyof StackParameterList}>
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

      <AuthStack.Screen
        name={'ADDITINERARYCATEGORY' as keyof StackParameterList}
        component={AddItineraryCategory}
      />

      <AuthStack.Screen
        name={'UPLOADOUTCOME' as keyof StackParameterList}
        component={UploadOutcome}
      />

      <AuthStack.Screen
        name={'ADDNEXTMONTHPLAN' as keyof StackParameterList}
        component={AddNextMonthPlan}
      />

      <AuthStack.Screen
        name={'EDITEMPLOYEE' as keyof StackParameterList}
        component={EditEmployee}
      />

      <AuthStack.Screen
        name={'EDITLOCATIONDETAILS' as keyof StackParameterList}
        component={EditLocationDetails}
      />

      <AuthStack.Screen
        name={'EDITITINERARYCATEGORY' as keyof StackParameterList}
        component={EditItineraryCategory}
      />

      <AuthStack.Screen
        name={'ADDFEEDBACK' as keyof StackParameterList}
        component={AddFeedback}
      />

      <AuthStack.Screen
        name={'DELETEEMPLOYEE' as keyof StackParameterList}
        component={DeleteEmployee}
      />

      <AuthStack.Screen
        name={'DELETELOCATION' as keyof StackParameterList}
        component={DeleteLocation}
      />

      <AuthStack.Screen
        name={'DELETEITINERARYCATEGORY' as keyof StackParameterList}
        component={DeleteItineraryCategory}
      />

      <AuthStack.Screen
        name={'EDITOUTCOME' as keyof StackParameterList}
        component={EditOutcome}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;

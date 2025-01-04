import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Spinner from './src/components/Spinner';
import AuthStackNavigator from 'navigation/routes';
import {View, Text} from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AuthStackNavigator />
          <Spinner />
        </NavigationContainer>
      </PersistGate>
    </Provider>
    // <View style={{flex:1,backgroundColor:'red'}}>
    //   <Text> App </Text>
    // </View>
  );
}

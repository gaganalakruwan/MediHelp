import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from 'components/InputText';
import ActionButton from 'components/ActionButton';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header/Header';
import style from './style';
import Dropdown from 'components/DropdownSelectList/DropdownSelectList';
import InfoItem from 'components/InfoItem/InfoItem';

const DeleteEmployee = () => {
  const navigation = useNavigation();
  const dropdownData = [
    {key: 1, value: 'Sara Perera'},
    {key: 2, value: 'Nadun Roshan'},
    {key: 3, value: 'Naveen'},
    {key: 4, value: 'Deshitha'},
    {key: 5, value: 'Navini'},
  ];

  const [selectedName, setSelectedName] = useState('');
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);

  const [error, setError] = useState('');

  const handleSelect = value => {
    setSelectedName(value);
    setError('');
  };

  const handleNext = () => {
    if (!showEmployeeDetails) {
      if (!selectedName) {
        setError('Please select an employee before proceeding.');
      } else {
        setShowEmployeeDetails(true);
      }
    } else {
      handleDelete();
    }
  };

  const handleDelete = () => {
    Alert.alert('Success', 'Employee deleted successfully.', [
      {text: 'OK', onPress: () => navigation.navigate('HOME' as never)},
    ]);
  };

  const handleBackPress = () => {
    if (showEmployeeDetails) {
      setShowEmployeeDetails(false);
    } else {
      navigation.navigate('HOME' as never);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header isBack title="Delete Employee" onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            {!showEmployeeDetails ? (
              <View>
                <Dropdown
                  data={dropdownData}
                  placeholder="Select an Employee"
                  onSelect={handleSelect}
                  dropdownStyles={{
                    borderRadius: 10,
                  }}
                  dropdownTextStyles={{color: '#333'}}
                  label="Search Employee"
                  labelFontSize={18}
                  labelFontWeight="bold"
                />
                {error ? <Text style={style.error}>{error}</Text> : null}
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 25, // Adds space between name and below content
                  }}>
                  <Image
                    source={require('../../assets/images/profile.jpg')}
                    style={{
                      width: 160,
                      height: 200,
                      borderRadius: 20,
                      marginRight: 20,
                    }}
                  />
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginRight: 20,
                        flexWrap: 'wrap', // Ensures long text wraps to the next line
                      }}>
                      {selectedName}
                    </Text>
                  </View>
                </View>

                <View>
                  <InfoItem title={'EPF No'} value={'123456'} />
                  <InfoItem
                    title={'Address'}
                    value={'352/2, Galle Road, Kalutara North '}
                  />
                  <InfoItem title={'Mobile No'} value={'0765521210'} />
                  <InfoItem title={'Email'} value={'saraperera@gmail.com'} />
                  <InfoItem title={'Allocate Location'} value={'Kalutara'} />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={{alignItems: 'center'}}>
          <ActionButton
            title={showEmployeeDetails ? 'Delete' : 'Next'}
            onPress={handleNext}
            customStyle={{
              marginTop: 20,
              marginBottom: 40,
              width: '60%',
              backgroundColor: showEmployeeDetails ? '#CC3F08' : '#0B8FAC',
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DeleteEmployee;

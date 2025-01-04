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

const DeleteItineraryCategory = () => {
  const navigation = useNavigation();
  const dropdownData = [
    {key: 1, value: 'Category 01'},
    {key: 2, value: 'Category 02'},
    {key: 3, value: 'Category 03'},
    {key: 4, value: 'Category 04'},
    {key: 5, value: 'Category 05'},
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
        setError('Please select a category name before proceeding.');
      } else {
        setShowEmployeeDetails(true);
      }
    } else {
      handleDelete();
    }
  };

  const handleDelete = () => {
    Alert.alert('Success', 'Itinerary category deleted successfully.', [
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
      <Header
        isBack
        title="Delete Itinerary Category"
        onBackPress={handleBackPress}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            {!showEmployeeDetails ? (
              <View>
                <Dropdown
                  data={dropdownData}
                  placeholder="Select a Category Name"
                  onSelect={handleSelect}
                  dropdownStyles={{
                    borderRadius: 10,
                  }}
                  dropdownTextStyles={{color: '#333'}}
                  label="Search Category Name"
                  labelFontSize={18}
                  labelFontWeight="bold"
                />
                {error ? <Text style={style.error}>{error}</Text> : null}
              </View>
            ) : (
              <View>
                <View className="mb-7 mt-2">
                  <Text className="text-Gray-600 font-bold text-2xl">
                    {selectedName}
                  </Text>
                </View>
                <View>
                  <InfoItem title={'Details'} value={'*********'} />
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

export default DeleteItineraryCategory;

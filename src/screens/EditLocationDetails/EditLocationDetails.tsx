import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from 'components/InputText';
import ActionButton from 'components/ActionButton';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header/Header';
import style from './style';
import Dropdown from 'components/DropdownSelectList/DropdownSelectList';

const EditLocationDetails = () => {
  const navigation = useNavigation();
  const dropdownData = [
    {key: 1, value: 'Nawala'},
    {key: 2, value: 'Kalutara'},
    {key: 3, value: 'Colombo'},
    {key: 4, value: 'Kandy'},
    {key: 5, value: 'Navinna'},
  ];

  const [selectedName, setSelectedName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: 'No22, Colombo 12',
    contactNo: '0714578968',
    locationManager: 'Pabasara',
    managerContactNo: '0714578968',
  });
  const [error, setError] = useState('');

  const handleSelect = (value: string) => {
    setSelectedName(value);
    setFormData(prev => ({...prev, name: value})); // Populate the "Name" field
    setError(''); // Clear error when a valid selection is made
  };

  const handleNext = () => {
    if (!showForm) {
      if (!selectedName) {
        setError('Please select a location before proceeding.');
      } else {
        setShowForm(true);
      }
    } else {
      handleFormSubmit();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleFormSubmit = () => {
    // Form validation
    const {name, address, contactNo, locationManager, managerContactNo} =
      formData;
    if (
      !name ||
      !address ||
      !contactNo ||
      !locationManager ||
      !managerContactNo
    ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    console.log('Form Data Submitted:', formData);

    // Navigate back after successful submission
    Alert.alert('Success', 'Location details updated successfully.', [
      {text: 'OK', onPress: () => navigation.navigate('HOME' as never)},
    ]);
  };

  const handleBackPress = () => {
    if (showForm) {
      setShowForm(false); // Go back to employee selection if in the form
    } else {
      navigation.navigate('HOME' as never); // Navigate back to the previous screen
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header
        isBack
        title="Edit Location Details"
        onBackPress={handleBackPress}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            {!showForm ? (
              <View>
                <Dropdown
                  data={dropdownData}
                  placeholder="Select a Location"
                  onSelect={handleSelect}
                  dropdownStyles={{
                    borderRadius: 10,
                  }}
                  dropdownTextStyles={{color: '#333'}}
                  label="Search Location"
                  labelFontSize={18}
                  labelFontWeight="bold"
                />
                {error ? <Text style={style.error}>{error}</Text> : null}
              </View>
            ) : (
              <View>
                <View className="mb-7 -mt-2">
                  <Text className="text-Gray-600 font-bold text-xl">
                    Location Details
                  </Text>
                </View>

                <InputText
                  value={'Nadun'}
                  label="Name"
                  onChange={text => handleInputChange('name', text)}
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                />

                <InputText
                  value={formData.address}
                  onChange={text => handleInputChange('address', text)}
                  label="Address"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                />

                <InputText
                  value={formData.contactNo}
                  onChange={text => handleInputChange('contactNo', text)}
                  label="Contact Number"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                  keyboardType="phone-pad"
                />

                <InputText
                  value={formData.locationManager}
                  onChange={text => handleInputChange('locationManager', text)}
                  label="Location Manager"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                />

                <InputText
                  value={formData.managerContactNo}
                  onChange={text => handleInputChange('managerContactNo', text)}
                  label="Manager Contact Number"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                />
              </View>
            )}
          </View>
        </ScrollView>
        <View className="mt-1 flex justify-center items-center">
          <ActionButton
            title={showForm ? 'Done' : 'Next'}
            onPress={handleNext}
            customStyle={{
              marginTop: 20,
              marginBottom: 40,
              width: '60%',
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditLocationDetails;

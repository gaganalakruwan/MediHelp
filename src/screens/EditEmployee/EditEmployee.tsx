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

const EditEmployee = () => {
  const navigation = useNavigation();
  const dropdownData = [
    {key: 1, value: 'Namal Ravindra'},
    {key: 2, value: 'Nadun Roshan'},
    {key: 3, value: 'Naveen'},
    {key: 4, value: 'Deshitha'},
    {key: 5, value: 'Navini'},
  ];

  const [selectedName, setSelectedName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    epfNo: '12345678',
    address: 'No22, Colombo 12',
    mobileNo: '0714578968',
    email: 'nadun23@gmail.com',
    allocateLocation: 'Colombo',
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
        setError('Please select an employee before proceeding.');
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
    const {name, epfNo, address, mobileNo, email, allocateLocation} = formData;
    if (
      !name ||
      !epfNo ||
      !address ||
      !mobileNo ||
      !email ||
      !allocateLocation
    ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    console.log('Form Data Submitted:', formData);

    // Navigate back after successful submission
    Alert.alert('Success', 'Employee details updated successfully.', [
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
      <Header isBack title="Edit Employee" onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            {!showForm ? (
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
                <View className="mb-7 -mt-2">
                  <Text className="text-Gray-600 font-bold text-xl">
                    Employee Details
                  </Text>
                </View>

                <InputText
                  value={formData.name}
                  label="Name"
                  onChange={text => handleInputChange('name', text)}
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                />

                <InputText
                  value={formData.epfNo}
                  onChange={text => handleInputChange('epfNo', text)}
                  label="Epf No"
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
                  value={formData.mobileNo}
                  onChange={text => handleInputChange('mobileNo', text)}
                  label="Mobile Number"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                  keyboardType="phone-pad"
                />

                <InputText
                  value={formData.email}
                  onChange={text => handleInputChange('email', text)}
                  label="Email"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                  keyboardType="email-address"
                />

                <InputText
                  value={formData.allocateLocation}
                  onChange={text => handleInputChange('allocateLocation', text)}
                  label="Allocate Location"
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

export default EditEmployee;

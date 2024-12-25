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

const EditItineraryCategory = () => {
  const navigation = useNavigation();
  const dropdownData = [
    {key: 1, value: 'Category 01'},
    {key: 2, value: 'Category 02'},
    {key: 3, value: 'Category 03'},
    {key: 4, value: 'Category 04'},
    {key: 5, value: 'Category 05'},
  ];

  const [selectedName, setSelectedName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: '',
  });
  const [error, setError] = useState('');

  const handleSelect = (value: string) => {
    setSelectedName(value);
    setFormData(prev => ({...prev, categoryName: value})); // Populate the "Name" field
    setError(''); // Clear error when a valid selection is made
  };

  const handleNext = () => {
    if (!showForm) {
      if (!selectedName) {
        setError('Please select a category name before proceeding.');
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
    const {categoryName} = formData;
    if (!categoryName) {
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
        title="Edit Itinerary Category"
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
                <InputText
                  value={formData.categoryName}
                  label="Category Name"
                  onChange={text => handleInputChange('categoryName', text)}
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

export default EditItineraryCategory;

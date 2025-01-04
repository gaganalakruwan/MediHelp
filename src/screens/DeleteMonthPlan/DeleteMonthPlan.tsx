import React, {useState} from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header/Header';
import ActionButton from 'components/ActionButton';
import OutcomeCard from 'components/OutcomesCard/OutcomesCard';
import style from './style';

const DeleteMonthPlans = () => {
  const navigation = useNavigation();

  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      date: '2024-12-08',
      description: 'Corem ipsum dolor sit amet, adipiscing elit.',
      time: '15 Min',
    },
    {
      id: 2,
      date: '2024-12-08',
      description: 'Sed do eiusmod tempor incididunt.',
      time: '15 Min',
    },
    {
      id: 3,
      date: '2024-12-08',
      description: 'Lorem ipsum dolor sit amet.',
      time: '15 Min',
    },
  ];

  const formatDateForDisplay = (date: string) => {
    const dateObj = new Date(date);

    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', {month: 'long'});
    const year = dateObj.getFullYear();

    // Determine the day suffix (st, nd, rd, th)
    const suffix = ['th', 'st', 'nd', 'rd'][
      day % 10 <= 3 && ![11, 12, 13].includes(day % 100) ? day % 10 : 0
    ];

    return `${day}${suffix} ${month} ${year}`;
  };

  const handleDelete = () => {
    Alert.alert('Success', 'Outcome deleted successfully.', [
      {text: 'OK', onPress: () => navigation.navigate('HOME' as never)},
    ]);
  };

  const handleBackPress = () => {
    navigation.navigate('HOME' as never);
  };

  const renderCard = ({item}: {item: (typeof cards)[0]}) => (
    <OutcomeCard
      date={formatDateForDisplay(item.date)}
      description={item.description}
      time={item.time}
      isSelected={selectedCard === item.id}
      onPress={() => setSelectedCard(item.id)}
    />
  );

  return (
    <SafeAreaView style={style.container}>
      <Header isBack title="Month Plans" onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.flexContainer}>
        <View style={style.contentContainer}>
          {cards.length > 0 ? (
            <FlatList
              data={cards}
              keyExtractor={item => item.id.toString()}
              renderItem={renderCard}
              contentContainerStyle={style.flatListContainer}
            />
          ) : (
            <Text style={style.noOutcomesText}>No outcomes available.</Text>
          )}
        </View>
        <View style={style.buttonContainer}>
          <ActionButton
            title={'Delete'}
            onPress={handleDelete}
            customStyle={{
              width: '60%',
              backgroundColor: '#CC3F08',
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DeleteMonthPlans;

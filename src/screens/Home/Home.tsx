import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from 'components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from './style';
import HomeCard from 'components/HomeCard/HomeCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Searchbar} from 'react-native-paper';

const Home = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <SafeAreaView style={style.container}>
      <Header isMenu />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={style.innerContainer}>
          <View style={style.search}>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{borderRadius: 10}}
            />
          </View>

          <View style={style.servicesContainer}>
            <Text style={style.servicesTitle}>Services</Text>
            <TouchableOpacity>
              <Text style={style.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20}}>
            <HomeCard title={'Employees'} />
            <HomeCard title={'Locations'} />
            <HomeCard title={'Itinerary Category'} />
            <HomeCard title={'Next Month Plan'} />
            <HomeCard title={'Upload Outcome'} />
            <HomeCard title={'Manage Itinerary'} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

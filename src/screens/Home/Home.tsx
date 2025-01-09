import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Header from 'components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from './style';
import HomeCard from 'components/HomeCard/HomeCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Searchbar} from 'react-native-paper';
import {ImageSlider} from 'react-native-image-slider-banner';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '../../redux/action/ApiAction';
import { endLoading } from '../../redux/action/SpinnerAction';

const Home = () => {
  const navigation = useNavigation();
  
  const [searchQuery, setSearchQuery] = React.useState('');
  const {userName} = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // tokenRefresh();
    dispatch(endLoading());
  }, []);

  const tokenRefresh = () => {
    var data = new FormData();
    data.append('username', userName);
    console.log(data);
    dispatch(
      CommonActions.refreshToken({
        params: data,
        success: (res: any) => {
          console.log("..........",res);
        },
        failed: (error: any) => {
          console.log('Login failed:', error);
        },
      }),
    );
  };
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

          <View>
            {/* <ImageSlider
              data={[
                {
                  img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU',
                },
                {
                  img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
                },
                {
                  img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
                },
              ]}
              autoPlay={true}
              onItemChanged={item => console.log('item', item)}
              closeIconColor="#fff"
              preview={false}
              timer={3000}
              caroselImageStyle={{
                resizeMode: 'contain',
                marginTop: 20,
              }}
            /> */}
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
            <HomeCard
              title={'Next Month Plan'}
              onPressAdd={() =>
                navigation.navigate('ADDNEXTMONTHPLAN' as never)
              }
            />
            <HomeCard title={'Upload Outcome'} />
            <HomeCard title={'Manage Itinerary'} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

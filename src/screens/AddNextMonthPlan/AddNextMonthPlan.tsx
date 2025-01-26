import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from 'components/InputText';
import ActionButton from 'components/ActionButton';
import CustomIcon from 'components/CustomIcon';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header/Header';
import DatePicker from 'react-native-date-picker';
import Dropdown from 'components/DropdownSelectList/DropdownSelectList';
import {useDispatch, useSelector} from 'react-redux';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {CommonActions} from '../../redux/action/ApiAction';
import moment from 'moment';

const AddNextMonthPlan = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userId, userName} = useSelector((state: any) => state.auth);
  const [maindate, setMainDate] = useState('');
  const [reason, setReason] = useState('');
  const [comments, setComments] = useState('');
  const [meetingPlace, setMeetingPlace] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const options = {timeZone: 'Asia/Colombo'};
  const currentDate = date.toLocaleDateString('en-US', options);
  const dateString = currentDate;
  const dateParts = dateString.split('/');
  const year = parseInt(dateParts[2]);
  const formattedDate = `${year}-${dateParts[0].padStart(
    2,
    '0',
  )}-${dateParts[1].padStart(2, '0')}`;

  const [startTime, setStartTime] = useState(new Date().toLocaleTimeString());
  const [endTime, setEndTime] = useState(new Date().toLocaleTimeString());
  const [open1, setOpen1] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [ItType, setItType] = useState([]);
  const [ItCategory, setItCategory] = useState([]);
  const [selectTime, setSelectTime] = useState('start');
  const [selectType, setSelectType] = useState();
  const [selectTypeNew, setSelectTypeNew] = useState();
  const [selectlocation, setSelectlocation] = useState();
  const [selectlocationNew, setSelectlocationNew] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [selectCategoryNew, setSelectCategoryNew] = useState();

  useEffect(() => {
    tokenRefresh();
    // loadCategory();
    // loadType();
    // loadGroup();
    // loadLocation();
  }, []);
  const handleSelect = (value: string) => {
    console.log('Selected Value:', value);
    const filterData = locationData.filter(a => a.value == value);
    setSelectlocation(filterData[0].key);
  };
  const handleSelectType = (value: string) => {
    console.log('Selected Value:', value);
    const filterData = ItType.filter(a => a.value == value);
    setSelectType(filterData[0].key);
  };
  const handleSelectCategory = (value: string) => {
    console.log('Selected Value:', value);
    const filterData = ItCategory.filter(a => a.value == value);
    setSelectCategory(filterData[0].key);
  };

  const tokenRefresh = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading...'));
    var data = new FormData();
    data.append('username', userName);
    dispatch(
      CommonActions.refreshToken({
        params: data,
        success: (res: any) => {
          dispatch(endLoading());
          if (res) {
            loadCategory();
            loadType();
            loadGroup();
            loadLocation();
          }
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('Login failed:', error);
        },
      }),
    );
  };
  const loadCategory = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading...'));

    dispatch(
      CommonActions.getItCategory({
        success: (res: any) => {
          dispatch(endLoading());
          if (res && res.length > 0) {
            const category = res?.map(item => {
              // Combine newObj and item
              return {
                key: item?.idtbl_itenary_category,
                value: item?.itenary_category,
                ...item,
              };
            });
            setItCategory(category);
          }
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('Login failed:', error);
        },
      }),
    );
  };
  const loadType = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading...'));

    dispatch(
      CommonActions.getItType({
        success: (res: any) => {
          dispatch(endLoading());
          if (res && res.length > 0) {
            const category = res?.map(item => {
              // Combine newObj and item
              return {
                key: item?.idtbl_itenary_type,
                value: item?.itenary_type,
                ...item,
              };
            });
            console.log(category);
            setItType(category);
          }
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('Login failed:', error);
        },
      }),
    );
  };
  const loadGroup = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading...'));

    dispatch(
      CommonActions.getItGroup({
        success: (res: any) => {
          dispatch(endLoading());
          if (res) {
            console.log('...........3', res);
          }
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('Login failed:', error);
        },
      }),
    );
  };
  const loadLocation = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading...'));

    dispatch(
      CommonActions.getLocation({
        success: (res: any) => {
          dispatch(endLoading());
          if (res && res.length > 0) {
            console.log(res);
            const locationMap = res?.map(item => {
              // Combine newObj and item
              return {
                key: item?.idtbl_location_type,
                value: item?.location_type,
              };
            });
            console.log(locationMap);
            setLocationData(locationMap);
          }
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('Login failed:', error);
        },
      }),
    );
  };
  const insertMonthPlan = () => {
    dispatch(startLoading());
    dispatch(setMessage('Uploading Data...'));
    const parsedDate = moment(date, 'MM/DD/YYYY, h:mm:ss A');
    const parsedStartTime = moment(date, 'MM/DD/YYYY, h:mm:ss A');
    const parsedEndTime = moment(date, 'MM/DD/YYYY, h:mm:ss A');

    var dataRefresh = new FormData();
    dataRefresh.append('username', userName);

    var data = new FormData();
    data.append('month', parsedDate.format('YYYY-MM'));
    data.append('date', parsedDate.format('YYYY-MM-DD'));
    data.append('start_time', parsedStartTime.format('HH:mm:ss'));
    data.append('end_time', parsedEndTime.format('HH:mm:ss'));
    data.append('type', parseInt(selectType ? selectType : '2'));
    data.append('category', parseInt(selectCategory ? selectCategory : '7'));
    data.append('group', 2);
    data.append('task', 2);
    data.append('location', parseInt(selectlocation ? selectlocation : '4'));
    data.append('itenary', 'asx');
    data.append('meet_location', meetingPlace);
    data.append('recordOption', 1);
    data.append('recordID', '');
    data.append('reason', reason);
    data.append('comment', comments);

    console.log(data);
    dispatch(
      CommonActions.insertMonthPlan({
        params: data,
        success: (res: any) => {
          console.log('........>', res);
          dispatch(endLoading());
          if (res?.status) {
            
            Alert.alert('Confirm', 'Data uploaded', [
              {text: 'OK', onPress: () => navigation.goBack()},
            ]);
          }
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('Login failed:', error);
          Alert.alert('Error', 'Data upload fail. Try again later', [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      }),
    );

    // dispatch(
    //   CommonActions.refreshToken({
    //     params: dataRefresh,
    //     success: (res: any) => {
    //       dispatch(endLoading());
    //       console.log('.........>>>', res);
    //       if (res) {
    //         setTimeout(() => {

    //         }, 1000);
    //       }
    //     },
    //     failed: (error: any) => {
    //       dispatch(endLoading());
    //       console.log('Login failed:>>>>', error);
    //     },
    //   }),
    // );
  };
  return (
    <SafeAreaView style={style.container}>
      <Header
        isBack
        title="Add Next Month Plan"
        onBackPress={() => navigation.navigate('HOME' as never)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            <View>
              <Dropdown
                data={ItType}
                onSelect={handleSelectType}
                placeholder="Select Itinerary Type"
                setSelected={setSelectType}
                dropdownStyles={{
                  borderRadius: 10,
                }}
                dropdownTextStyles={{color: '#333'}}
                label="Itinerary Type"
                labelFontSize={18}
                labelFontWeight="bold"
              />
            </View>
            <View>
              <Dropdown
                data={ItCategory}
                onSelect={handleSelectCategory}
                placeholder="Select Itinerary Category"
                setSelected={setSelectCategory}
                dropdownStyles={{
                  borderRadius: 10,
                }}
                dropdownTextStyles={{color: '#333'}}
                label="Itinerary Category"
                labelFontSize={18}
                labelFontWeight="bold"
              />
            </View>
            <View>
              <Dropdown
                data={locationData}
                placeholder="Select Location"
                onSelect={handleSelect}
                setSelected={setSelectlocationNew}
                dropdownStyles={{
                  borderRadius: 10,
                }}
                dropdownTextStyles={{color: '#333'}}
                label="Location"
                labelFontSize={18}
                labelFontWeight="bold"
              />
            </View>
            <InputText
              value={meetingPlace}
              onChange={setMeetingPlace}
              label="Meeting Place"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InputText
                value={formattedDate}
                label="Date"
                labelFontSize={18}
                labelFontWeight="bold"
                placeholderFontSize={16}
                editable={false}
              />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <CustomIcon
                  icon={'calendar-sharp'}
                  type={'Ionicons'}
                  size={25}
                  color={'#0B8FAC'}
                  style={{marginLeft: -45, marginTop: 18}}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date: any) => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InputText
                value={startTime}
                label="Start Time"
                labelFontSize={18}
                labelFontWeight="bold"
                placeholderFontSize={16}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => {
                  setSelectTime('start');
                  setOpen1(true);
                }}>
                <CustomIcon
                  icon={'time'}
                  type={'Ionicons'}
                  size={25}
                  color={'#0B8FAC'}
                  style={{marginLeft: -45, marginTop: 18}}
                />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InputText
                value={endTime}
                label="End Time"
                labelFontSize={18}
                labelFontWeight="bold"
                placeholderFontSize={16}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => {
                  setSelectTime('end');
                  setOpen1(true);
                }}>
                <CustomIcon
                  icon={'time'}
                  type={'Ionicons'}
                  size={25}
                  color={'#0B8FAC'}
                  style={{marginLeft: -45, marginTop: 18}}
                />
              </TouchableOpacity>
            </View>

            <InputText
              value={reason}
              onChange={setReason}
              label="Reason"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
            />

            <InputText
              value={comments}
              onChange={setComments}
              label="Comments"
              labelFontSize={18}
              labelFontWeight="bold"
              placeholderFontSize={16}
              multiline={true}
              numberOfLines={5}
              inputStyle={{height: 105}}
              maxLength={150}
            />

            <View className="mt-1 flex justify-center items-center">
              <ActionButton
                onPress={() => insertMonthPlan()}
                title={'Add'}
                customStyle={{
                  marginTop: 40,
                  marginBottom: 40,
                  width: '60%',
                }}
              />
            </View>
          </View>
          <DatePicker
            modal
            open={open1}
            date={date}
            mode="time"
            onConfirm={date => {
              setOpen1(false);
              if (selectTime == 'start') {
                setStartTime(date.toLocaleTimeString());
              } else {
                setEndTime(date.toLocaleTimeString());
              }
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddNextMonthPlan;

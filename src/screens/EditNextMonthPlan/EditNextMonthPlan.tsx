import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from 'components/InputText';
import ActionButton from 'components/ActionButton';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header/Header';
import style from './style';
import CalendarComponent from 'components/Calendar/Calendar';
import CustomIcon from 'components/CustomIcon';
import DatePicker from 'react-native-date-picker';
import Dropdown from 'components/DropdownSelectList/DropdownSelectList';
import OutcomeCard from 'components/OutcomesCard/OutcomesCard';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {CommonActions} from '../../redux/action/ApiAction';
import moment from 'moment';

const EditNextMonthPlan = () => {
  const navigation = useNavigation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    itineraryCategory: '',
    meetingPlace: 'Kalutara',
    mainDate: 'Sample comment',
    mainTime: 'Colombo',
    reason: '',
    comments: '',
  });

  // Get today's date in the required format
  const today = new Date();
  const dispatch = useDispatch();
  const {userId, userName} = useSelector((state: any) => state.auth);
  const todayFormatted = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
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

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [open1, setOpen1] = useState(false);
  const [nextMnthData, setNextMnthData] = useState([]);

  const [locationData, setLocationData] = useState([]);
  const [ItType, setItType] = useState([]);
  const [ItCategory, setItCategory] = useState([]);

  const [selectlocation, setSelectlocation] = useState();
  const [selectlocationNew, setSelectlocationNew] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [selectType, setSelectType] = useState();
  const [defaultType, setDefaultType] = useState({});
  const [defaultLocation, setDefaultLocation] = useState({});
  const [defaultCategry, setDefaultCategry] = useState({});

  const [reason, setReason] = useState('');
  const [comments, setComments] = useState('');
  const [meetingPlace, setMeetingPlace] = useState('');
  const [startTime, setStartTime] = useState(new Date().toLocaleTimeString());
  const [endTime, setEndTime] = useState(new Date().toLocaleTimeString());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectTime, setSelectTime] = useState('start');
  const [dateArray, setDateArray] = useState([]);

  const dropdownData = [
    {key: 1, value: 'Option 1'},
    {key: 2, value: 'Option 2'},
    {key: 3, value: 'Option 3'},
  ];

  useEffect(() => {
    tokenRefresh();
  }, []);

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
            getMonthPlan();
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

  const getMonthPlan = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading...'));

    dispatch(
      CommonActions.getAllMonthlyPlans({
        success: (res: any) => {
          dispatch(endLoading());
          if (res) {
            console.log('.........>>>>>>>>', res);
            setNextMnthData(res?.data);
            const markedDates = res?.data.reduce((acc, appointment) => {
              acc[appointment.start_date] = {
                marked: true,
                dotColor: '#D1FE17',
                customStyles: {
                  container: {backgroundColor: '#D1FE17'},
                  text: {color: 'white'},
                },
              };
              return acc;
            }, {});
            setDateArray(markedDates);
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

  const handleDateSelected = date => {
    setSelectedDate(date);
    setFormData(prev => ({...prev, postponedDate: date}));
    setError(''); // Clear error when a valid selection is made
  };

  const handleNext = () => {
    console.log(selectedDate);
    console.log('>>>>>>>>>', selectedCard);

    if ((selectedDate == '' || selectedCard == null) && !showForm) {
      Alert.alert('Error', 'Please select date and plan', [
        {text: 'OK', onPress: () => {}},
      ]);
      console.log('>A>>>>>>>>>');
    }
    else if(selectedDate != '' && selectedCard != null && showForm){
      dispatch(startLoading());
      dispatch(setMessage('Uploading...'));
      const parsedDate = moment(date, 'MM/DD/YYYY, h:mm:ss A');
      const parsedStartTime = moment(startDate, 'MM/DD/YYYY, h:mm:ss A');
      const parsedEndTime = moment(endDate, 'MM/DD/YYYY, h:mm:ss A');

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
      data.append('recordID', selectedCard);
      data.append('reason', reason);
      data.append('comment', comments);

      console.log(data);
      dispatch(
        CommonActions.editPlan({
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
    } else {
      setShowForm(true);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleFormSubmit = () => {
    const {
      itineraryCategory,
      meetingPlace,
      mainDate,
      mainTime,
      reason,
      comments,
    } = formData;
    if (
      !itineraryCategory ||
      !meetingPlace ||
      !mainDate ||
      !mainTime ||
      !reason ||
      !comments
    ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    console.log('Form Data Submitted:', formData);

    Alert.alert('Success', 'Outcome updated successfully.', [
      {text: 'OK', onPress: () => navigation.navigate('HOME' as never)},
    ]);
  };

  const handleBackPress = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      navigation.navigate('HOME' as never);
    }
  };
  const handleSelect = (value: string) => {
    console.log('Selected Value:', value);
    const filterData = locationData.filter(a => a.value == value);
    if (filterData.length > 0) {
      setSelectlocation(filterData[0].key);
    }
  };
  const handleSelectType = (value: string) => {
    console.log('Selected Value:', value);
    const filterData = ItType.filter(a => a.value == value);
    if (filterData.length > 0) {
      setSelectType(filterData[0].key);
    }
  };
  const handleSelectCategory = (value: string) => {
    console.log('Selected Value:', value);
    const filterData = ItCategory.filter(a => a.value == value);
    if (filterData.length > 0) {
      setSelectCategory(filterData[0].key);
    }
  };
  // Filter outcomes based on the selected date
  const filteredCards = nextMnthData.filter(
    card => card?.start_date === selectedDate,
  );

  const renderCard = ({item}: {item: (typeof cards)[0]}) => (
    <OutcomeCard
      date={formatDateForDisplay(item?.start_date)}
      description={`Category : ${item?.itenary_category} , Itenary : ${item?.itenary}`}
      time={`${moment
        .duration(
          moment(item?.end_time, 'HH:mm:ss').diff(
            moment(item?.start_time, 'HH:mm:ss'),
          ),
        )
        .minutes()} Min`}
      isSelected={selectedCard === item.idtbl_job_list}
      onPress={() => setObjectData(item)}
      location={item?.location ? item?.location : item?.meet_location}
    />
  );

  const setObjectData = (item: any) => {
    setSelectedCard(item.idtbl_job_list);
    setMeetingPlace(item?.location);
    const itIypeId = ItType.filter(a => a.value === item?.itenary_type);
    const locationId = locationData.filter(
      a => a.value === item?.meet_location,
    );
    const categoryId = ItCategory.filter(
      a => a.value === item?.itenary_category,
    );
    if (itIypeId.length > 0) {
      setDefaultType(itIypeId[0]);
      setSelectType(itIypeId[0].key);
    }
    if (locationId.length > 0) {
      setDefaultLocation(locationId[0]);
      setSelectlocation(locationId[0].key);
      setSelectlocationNew(locationId[0].key);
    }
    if (categoryId.length > 0) {
      setDefaultCategry(categoryId[0]);
      setSelectCategory(categoryId[0].key);
    }
    setDate(new Date(item?.start_date));
    setStartTime(item?.start_time);
    setEndTime(item?.end_time);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header
        isBack
        title="Edit Next Month Plan"
        onBackPress={handleBackPress}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={style.innerContainer}>
            {!showForm ? (
              <View>
                <View className="mb-7 -mt-2">
                  <Text className="text-black font-bold text-lg ml-7">
                    Select Date
                  </Text>
                </View>
                <CalendarComponent
                  onDateSelected={handleDateSelected}
                  markedDates={dateArray}
                />
                {error ? <Text style={style.error}>{error}</Text> : null}

                {filteredCards.length > 0 ? (
                  <FlatList
                    data={filteredCards}
                    keyExtractor={item => item?.idtbl_job_list}
                    renderItem={renderCard}
                    contentContainerStyle={style.flatListContainer}
                  />
                ) : (
                  <Text style={style.noOutcomesText}>
                    No outcomes available for the selected date.
                  </Text>
                )}
              </View>
            ) : (
              <View style={style.innerContainer}>
                <View>
                  <Dropdown
                    data={ItType}
                    selected={selectType}
                    onSelect={handleSelectType}
                    placeholder="Select Itinerary Type"
                    setSelected={setSelectType}
                    dropdownStyles={{
                      borderRadius: 10,
                    }}
                    defaultOption={defaultType}
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
                    defaultOption={defaultCategry}
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
                    defaultOption={defaultLocation}
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
              </View>
            )}
          </View>
        </ScrollView>
        <View style={style.bttonStyle}>
          <ActionButton
            title={showForm ? 'Done' : 'Next'}
            onPress={() => handleNext()}
            customStyle={{
              marginTop: 20,
              marginBottom: 40,
              width: '60%',
            }}
          />
        </View>
        {open1 && (
          <DatePicker
            modal
            open={open1}
            date={date}
            mode="time"
            onConfirm={date => {
              setOpen1(false);
              console.log(date);
              if (selectTime == 'start') {
                setStartTime(date.toLocaleTimeString());
                setStartDate(date);
              } else {
                setEndTime(date.toLocaleTimeString());
                setEndDate(date);
              }
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditNextMonthPlan;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
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
import OutcomeCard from 'components/OutcomesCard/OutcomesCard';
import moment from 'moment';
import CalendarComponent from 'components/Calendar/Calendar';

const AddFeedback = () => {
  const navigation = useNavigation();
  const {userId, userName} = useSelector((state: any) => state.auth);
  const [feedback, setFeedback] = useState('');
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
  const dispatch = useDispatch();
  const today = new Date();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [open1, setOpen1] = useState(false);
  const [nextMnthData, setNextMnthData] = useState([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    itineraryCategory: '',
    meetingPlace: 'Kalutara',
    mainDate: 'Sample comment',
    mainTime: 'Colombo',
    reason: '',
    comments: '',
  });
  const todayFormatted = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const [feedbackType, setFeedbackType] = useState([]);
  const [selectType, setSelectType] = useState();
  const [selectKey, setSelectKey] = useState();
  const [dateArray, setDateArray] = useState([]);
  console.log(todayFormatted);
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
            getAllFeedback();
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
            const uniqueDatesSet = new Set(dateArray);
            const filterDatesNew = [];

            // Add only unique dates from newAppointments
            res?.data.forEach(appointment => {
              if (!uniqueDatesSet.has(appointment.start_date)) {
                uniqueDatesSet.add(appointment.start_date);
              }
            });
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
            setDateArray(uniqueDatesSet);
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
  const getAllFeedback = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading...'));

    dispatch(
      CommonActions.getFeedback({
        success: (res: any) => {
          dispatch(endLoading());
          console.log('...........', res);
          if (res && res.length > 0) {
            const category = res?.map(item => {
              // Combine newObj and item
              return {
                key: item?.idtbl_feedback_type,
                value: item?.feedback_type,
                ...item,
              };
            });
            setFeedbackType(category);
          }
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('Login failed:', error);
        },
      }),
    );
  };
  const handleSelect = (value: string) => {
    console.log('Selected Value:', value);
    const filterData = feedbackType.filter(a => a.value == value);
    if (filterData.length > 0) {
      setSelectKey(filterData[0].key);
    }
  };
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
  };
  const filteredCards = nextMnthData.filter(
    card => card?.start_date === selectedDate,
  );
  const handleDateSelected = date => {
    setSelectedDate(date);
    setFormData(prev => ({...prev, postponedDate: date}));
    setError(''); // Clear error when a valid selection is made
  };

  const handleNext = () => {
    if ((selectedDate == '' || selectedCard == null) && !showForm) {
      Alert.alert('Error', 'Please select date and plan', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else if (selectedDate != '' && selectedCard != null && showForm) {
      if (selectKey && feedback) {
        dispatch(startLoading());
        dispatch(setMessage('Uploading...'));
        const parsedDate = moment(date, 'MM/DD/YYYY, h:mm:ss A');
        var dataRefresh = new FormData();
        dataRefresh.append('username', userName);

        let obj = {
          idtbl_job_list: selectedCard,
          feedbacktype: selectKey,
          feedback: feedback,
        };

        dispatch(
          CommonActions.addFeedback({
            params: obj,
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
        Alert.alert('Error', 'Please select type and add feedback', [
          {text: 'OK', onPress: () => {}},
        ]);
      }
    } else {
      setShowForm(true);
    }
  };
  return (
    <SafeAreaView style={style.container}>
      <Header
        isBack
        title="Add Feedback"
        onBackPress={() => navigation.navigate('HOME' as never)}
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
              <View>
                <View>
                  <Dropdown
                    data={feedbackType}
                    placeholder="Select Itinerary Category"
                    onSelect={handleSelect}
                    dropdownStyles={{
                      borderRadius: 10,
                    }}
                    dropdownTextStyles={{color: '#333'}}
                    label="Itinerary Category"
                    labelFontSize={18}
                    labelFontWeight="bold"
                    setSelected={setSelectType}
                  />
                </View>

                <InputText
                  value={feedback}
                  onChange={setFeedback}
                  label="Feedback"
                  labelFontSize={18}
                  labelFontWeight="bold"
                  placeholderFontSize={16}
                  multiline={true}
                  numberOfLines={5}
                  inputStyle={{height: 105}}
                  maxLength={150}
                />

                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                </View> */}
              </View>
            )}
            {/* <View className="mt-1 flex justify-center items-center">
              <ActionButton
                title={'Add'}
                customStyle={{
                  marginTop: 40,
                  marginBottom: 40,
                  width: '60%',
                }}
              />
            </View> */}
          </View>
        </ScrollView>
        {/* Button at the bottom */}
        <View className="mt-1 flex justify-center items-center">
          <ActionButton
            title={showForm ? 'Add' : 'Next'}
            customStyle={{
              marginTop: 20,
              marginBottom: 40,
              width: '60%',
            }}
            onPress={() => handleNext()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddFeedback;

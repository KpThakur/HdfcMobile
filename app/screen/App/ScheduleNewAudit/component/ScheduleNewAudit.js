import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {styles} from './styles';
import DropDown from '../../../../component/DropDown';
import DatePicker from 'react-native-date-picker';
import Button from '../../../../component/Button';
import {
  PRIMARY_BLUE_COLOR,
  CHECKED_ICON,
  UNCHECKED_ICON,
  ARROW,
  CALENDAR,
  CLOCK,
  GREY_TEXT_COLOR,
  FONT_FAMILY_REGULAR,
  DOWNARROW,
} from '../../../../utils/constant';
import Header from '../../../../component/Header';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

let ACDATE;
let timeData = [];
export default function ScheduleNewAudit(props) {
  const [Cdate, setCdate] = useState(new Date());
  const [openDate, setopenDate] = useState(false);
  const [openTime, setopenTime] = useState(false);
  const [dropDown, setdropDown] = useState(false);
  function _handleSelect(params) {
    setauditType(params);
  }

  const {
    handleSchedule,
    cityBranch,
    cityName,
    isLoading,
    citydropDown,
    setcitydropDown,
    handleSelectCity,
    branchDetail,
    branchName,
    setbranchNameDropDown,
    branchNameDropDown,
    handleSelectBranch,
    branchManagerName,
    auditType,
    setauditType,
    date,
    time,
    setdate,
    settime,
    handleSumbit,
    currentTime,
  } = props;

  const generateTimeData = () => {
    const newData = [];

    for (let i = 10; i <= 18; i++) {
      for (let j = 0; j <= 45; j += 15) {
        const formattedTime = `${i}-${j < 10 ? '0' : ''}${j}`;
        newData.push(formattedTime);
      }
    }

    newData.push('19-00');
    return newData;
  };

  const timeData = generateTimeData();

  useEffect(() => {
    setdropDown(false);
  }, [navigation]);

  const displayCityDropDown = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectCity(item.city_name, item.city_id)}
        style={styles.drop_down_item}>
        <Text style={styles.txt}>{item.city_name}</Text>
      </TouchableOpacity>
    );
  };
  const displaybranchDropDown = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectBranch(item.branch_name, item.branch_id)}
        style={styles.drop_down_item}>
        <Text style={styles.txt}>{item.branch_name}</Text>
      </TouchableOpacity>
    );
  };
  const handleDropDown = () => {
    // setopenDate(false);
    setdropDown(!dropDown);
  };

  // for (var i = 10; i <= 18; i++) {
  //   for (var j = 0; j <= 55; j += 15) {
  //     if (j == 0) timeData.push(i + '-0' + j);
  //     else timeData.push(i + '-' + j);
  //   }
  // }
  // timeData.push('19-00');
  const navigation = useNavigation();
  return (
    <>
      {isLoading ? (
        <Text> Loading...</Text>
      ) : (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always">
          <View style={styles.contianer}>
            <Header
              headerText={'Schedule New Review'}
              leftImg={ARROW}
              onPress={() => {
                navigation.navigate('DashboardScreen');
              }}
            />
            <TouchableOpacity
              onPress={() => setdropDown(false)}
              style={{
                padding: 20,
                justifyContent: 'space-evenly',
              }}>
              <View>
                <Text style={styles.txt_head}>Bank Details for Review</Text>
                <DropDown
                  title={cityName ? cityName : 'City'}
                  data={cityBranch}
                  renderItem={displayCityDropDown}
                  dropDown={citydropDown}
                  data_name={'city_name'}
                  setdropDown={setcitydropDown}
                  setTimeDropDown={setdropDown}
                />

                <DropDown
                  title={branchName ? branchName : 'Branch Name / ATM Name'}
                  data={branchDetail}
                  renderItem={displaybranchDropDown}
                  dropDown={branchNameDropDown}
                  data_name={'brach_name'}
                  setdropDown={setbranchNameDropDown}
                  setTimeDropDown={setdropDown}
                />
                <Text
                  style={{
                    backgroundColor: GREY_TEXT_COLOR,
                    borderRadius: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  {branchManagerName
                    ? branchManagerName
                    : 'Branch Manager Name / ATM Code'}
                </Text>
              </View>
              <View>
                <Text style={styles.txt_head}>Schedule on:</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{}}>
                    <TouchableOpacity
                      style={styles.date_time}
                      onPress={() => {
                        setdropDown(false);
                        setopenDate(true);
                      }}>
                      <Image source={CALENDAR} style={{marginRight: 10}} />
                      {date ? <Text>{date}</Text> : <Text>Date</Text>}
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      open={openDate}
                      mode="date"
                      date={Cdate}
                      onConfirm={date => {
                        setopenDate(false);
                        if (
                          moment(date).format('DD-MM-YYYY') <
                          moment(moment()).format('DD-MM-YYYY')
                        ) {
                          Alert.alert('date', "You can't select previous date");
                        } else {
                          if (
                            moment(date).format('DD-MM-YYYY') ==
                            moment(moment()).format('DD-MM-YYYY')
                          ) {
                            if (time < moment(new Date()).format('H-mm')) {
                              Alert.alert('Please select vaild time.');
                              settime();
                            } else {
                              setopenDate(false);
                              ACDATE = moment(date).format('DD-MM-YYYY');
                              setdate(moment(date).format('DD-MM-YYYY'));
                            }
                          } else {
                            setopenDate(false);
                            ACDATE = moment(date).format('DD-MM-YYYY');
                            setdate(moment(date).format('DD-MM-YYYY'));
                          }
                        }
                      }}
                      onCancel={() => {
                        setopenDate(false);
                      }}
                    />
                  </View>

                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => handleDropDown()}
                      style={{
                        backgroundColor: GREY_TEXT_COLOR,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}>
                      <Image source={CLOCK} />
                      <Text style={{marginHorizontal: 10}}>
                        {time ? time : 'Time'}
                      </Text>
                      {dropDown ? (
                        <Image
                          source={DOWNARROW}
                          style={{transform: [{rotateZ: '180deg'}]}}
                        />
                      ) : (
                        <Image source={DOWNARROW} />
                      )}
                    </TouchableOpacity>
                    {dropDown && (
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                          flexGrow: 1,
                          position: 'absolute',
                          right: 0,
                          top: 35,
                          width: '100%',
                          backgroundColor: GREY_TEXT_COLOR,
                          height: Platform.OS == 'ios' ? 150 : 200,
                          zIndex: 1,
                        }}>
                        {timeData &&
                          timeData.map((item, index) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                style={[styles.drop_down_item, {zIndex: 1}]}
                                onPress={() => {
                                  if (
                                    date ==
                                    moment(new Date()).format('DD-MM-YYYY')
                                  ) {
                                    if (
                                      moment(new Date()).format('HH-mm') <
                                      '10-00'
                                    ) {
                                      settime(item);
                                      setdropDown(false);
                                    } else {
                                      if (
                                        item < moment(new Date()).format('H-mm')
                                      ) {
                                        //setdropDown(false);
                                        Alert.alert(
                                          'Please Select Proper Time',
                                        );
                                      } else {
                                        settime(item);
                                        setdropDown(false);
                                      }
                                    }
                                  } else {
                                    settime(item);
                                    setdropDown(false);
                                  }
                                }}>
                                <Text style={styles.drop_down_txt}>{item}</Text>
                              </TouchableOpacity>
                            );
                          })}
                      </ScrollView>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    zIndex: -1,
                    width: '50%',
                    height: 150,
                  }}>
                  <Text style={styles.txt_head}>Review Type:</Text>
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => _handleSelect(2)}>
                    <Image
                      source={auditType === 2 ? CHECKED_ICON : UNCHECKED_ICON}
                      style={{marginRight: 5}}
                    />
                    <Text
                      style={{
                        color: auditType === 2 ? PRIMARY_BLUE_COLOR : 'gray',
                      }}>
                      Physical/In-branch review
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => _handleSelect(1)}>
                    <Image
                      source={auditType === 1 ? CHECKED_ICON : UNCHECKED_ICON}
                      style={{marginRight: 5}}
                    />
                    <Text
                      style={{
                        color: auditType === 1 ? PRIMARY_BLUE_COLOR : 'gray',
                      }}>
                      Virtual/online review
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
              <Button buttonText="Schedule" onPress={() => handleSumbit()} />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

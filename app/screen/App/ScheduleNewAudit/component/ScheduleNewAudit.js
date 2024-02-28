import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  TouchableWithoutFeedback
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
  SMALL_FONT_SIZE,
  TINY_FONT_SIZE,
} from '../../../../utils/constant';
import Header from '../../../../component/Header';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import { normalize } from '../../../../utils/scaleFontSize';

let ACDATE;
let timeData = [];
export default function ScheduleNewAudit(props) {
  const [Cdate, setCdate] = useState(new Date());
  const [openDate, setopenDate] = useState(false);
  const [openTime, setopenTime] = useState(false);
  const [dropDown, setdropDown] = useState(false);
  const [bmDropDown, setBmDropDown] = useState(false);
  const [roleDropDown, setRoleDropDown] = useState(false);

 
  function handleBMDropdown() {
    setBmDropDown(!bmDropDown);
  }
  function handleRoleDropdown() {
    setRoleDropDown(!roleDropDown);
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
    cityId,
    availability,
    setAvailability,
    employeName,
    setEmployeeName,
    employeEmail,
    setEmployeeEmail,
    employeeRole,
    setEmployeeRole,
    employeeDesignation,
    setEmployeeDesignation,
    managerMobile,
    setManagerMobile,
    employeeMobile,
    setEmployeeMobile
  } = props;
  function _handleSelect(params) {
    setauditType(params);
    setAvailability(null);
    setEmployeeName(null);
    setEmployeeEmail(null);
    setEmployeeDesignation(null);
    setManagerMobile(null);
  }
  // const generateTimeData = () => {
  //   const newData = [];

  //   for (let i = 10; i <= 18; i++) {
  //     for (let j = 0; j <= 45; j += 15) {
  //       const formattedTime = `${i}-${j < 10 ? '0' : ''}${j}`;
  //       newData.push(formattedTime);
  //     }
  //   }

  //   newData.push('19-00');
  //   return newData;
  // };

  // const timeData = generateTimeData();

  const data = {
    startTime: 0,
    endTime: 23,
    interval: 5,
  };
  const generateTimeData = () => {
    const newData = [];

    for (let i = data.startTime; i <= data.endTime; i++) {
      for (let j = 0; j <= 55; j += data.interval) {
        // if ((i === 8 && j < 30) || (i === 21 && j > 30)) {
        //   continue;
        // }
        if (i === 0 && j === 0) {
          continue;
        }

        const formattedTime = `${i < 10 ? '0' + i : i}-${j < 10 ? '0' + j : j}`;
        newData.push(formattedTime);
      }
    }

    // newData.push('22-00');
    return newData;
  };

  const timeData = generateTimeData();

  // const generateTimeData = () => {
  //   const newData = [];

  //   for (let i = 8; i <= 21; i++) {
  //     for (let j = 0; j <= 55; j += 5) {
  //       if ((i === 8 && j < 30) || (i === 21 && j > 30)) {
  //         continue;
  //       }

  //       const formattedTime = `${i < 10 ? '0' + i : i}-${j < 10 ? '0' + j : j}`;
  //       newData.push(formattedTime);
  //     }
  //   }

  //   // newData.push('22-00');
  //   return newData;
  // };

  // const timeData = generateTimeData();

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
        onPress={() =>
          handleSelectBranch(
            item.branch_name,
            item.branch_id,
            item.city,
            item.city_name,
          )
        }
        style={styles.drop_down_item}>
        <Text style={styles.txt}>
          {item.branch_code} - {item.branch_name}
        </Text>
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
  const setAllDropDown = () => {
    setdropDown(false)
    setBmDropDown(false)
    setRoleDropDown(false)
  }
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

            <TouchableWithoutFeedback
              onPress={() => setAllDropDown()}
             >
                <View style={{
                padding: 20,
                justifyContent: 'space-evenly',
              }}>
              <View>
                <Text style={styles.txt_head}>Bank Details for Review</Text>

                <DropDown
                  title={branchName ? branchName : 'Branch Name/Code *'}
                  data={branchDetail}
                  renderItem={displaybranchDropDown}
                  dropDown={branchNameDropDown}
                  data_name={'brach_name'}
                  setdropDown={setbranchNameDropDown}
                  setTimeDropDown={setdropDown}
                  cityId={cityId}
                />

                {/* <DropDown
                  title={cityName ? cityName : 'City'}
                  data={cityBranch}
                  renderItem={displayCityDropDown}
                  dropDown={citydropDown}
                  data_name={'city_name'}
                  setdropDown={setcitydropDown}
                  setTimeDropDown={setdropDown}
                /> */}
                <Text
                  style={{
                    backgroundColor: GREY_TEXT_COLOR,
                    borderRadius: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  {cityName ? cityName : 'City *'}
                </Text>

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
                    : 'Branch Manager Name/Code *'}
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
                        setopenDate(true);
                        setAllDropDown();
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
                        console.log('The present date --->', moment());
                        console.log(
                          'The 1 week ahead date --->',
                          moment().add(1, 'week'),
                        );
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
                        } else if (moment(date) < moment(moment())) {
                          console.log(' Selected Date ======>>>', moment(date));
                          console.log(
                            'Current Date ======>>>',
                            moment(moment()),
                          );
                          console.log('next ====>', moment(date).format('LL'));
                          Alert.alert('date', "You can't select previous date");
                        } else if (
                          !moment(date).isSameOrBefore(moment().add(1, 'week'))
                        ) {
                          Alert.alert(
                            'You are restricted from choosing a date beyond one week.',
                          );
                        } else {
                          setopenDate(false);
                          ACDATE = moment(date).format('DD-MM-YYYY');
                          setdate(moment(date).format('DD-MM-YYYY'));
                        }

                        // if (
                        // moment(date).startOf('day').format('DD-MM-YYYY') <
                        // moment(moment()).startOf('day').format('DD-MM-YYYY')
                        // moment(date).startOf('day').isSameOrBefore(moment().startOf('day'))
                        // moment(date).format('LL')<moment(moment()).format('LL')
                        //   moment(date) < moment(moment())
                        // ) {
                        //   console.log(' Selected Date ======>>>', moment(date));
                        //   console.log(
                        //     'Current Date ======>>>',
                        //     moment(moment()),
                        //   );
                        //   console.log('next ====>', moment(date).format('LL'));
                        //   Alert.alert('date', "You can't select previous date");
                        // } else {
                        //   if (
                        //     moment(date).format('DD-MM-YYYY') ==
                        //     moment(moment()).format('DD-MM-YYYY')
                        //   ) {
                        //     if (time < moment(new Date()).format('H-mm')) {
                        //       Alert.alert('Please select vaild time.');
                        //       settime();
                        //     } else {
                        //       setopenDate(false);
                        //       ACDATE = moment(date).format('DD-MM-YYYY');
                        //       setdate(moment(date).format('DD-MM-YYYY'));
                        //     }
                        //   } else {
                        //     setopenDate(false);
                        //     ACDATE = moment(date).format('DD-MM-YYYY');
                        //     setdate(moment(date).format('DD-MM-YYYY'));
                        //   }
                        // }
                      }}
                      onCancel={() => {
                        setopenDate(false);
                      }}
                    />
                  </View>

                  <View style={{zIndex:999}}>
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
                          height: Platform.OS == 'ios' ? (auditType === 1 ? 115: 150): (auditType === 1 ? 115: 200),
                          zIndex: 100,
                        }}>
                        {timeData &&
                          timeData.map((item, index) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                style={[styles.drop_down_item, {zIndex: 100}]}
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
                                          'Kindly choose an appropriate time.',
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
                                <Text style={[styles.drop_down_txt,{zIndex: 999}]}>{item}</Text>
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
                {auditType === 1 ? (
                  <>
                    <View style={{flex: 1, marginTop: -30}}>
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => {handleBMDropdown() ;setdropDown(false); setRoleDropDown(false)}}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: GREY_TEXT_COLOR,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            width: '100%',
                            zIndex: 0,
                          }}>
                          <View>
                            <Text>
                              {availability === 1
                                ? 'Branch Manager Available'
                                : availability === 2
                                ? 'Branch Manager Unavailable'
                                : 'Branch Manager Availability *'}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            {bmDropDown ? (
                              <Image
                                source={DOWNARROW}
                                style={{transform: [{rotateZ: '180deg'}]}}
                              />
                            ) : (
                              <Image source={DOWNARROW} />
                            )}
                          </View>
                        </TouchableOpacity>
                        {bmDropDown ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              top: 0,
                              left: 0,
                              // marginRight: 160,
                              backgroundColor: GREY_TEXT_COLOR,
                              zIndex: 1,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                setBmDropDown(!bmDropDown);
                                setAvailability(1);
                              }}
                              style={[styles.drop_down_item, {zIndex: 10}]}>
                              <Text>Branch Manager Available</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setBmDropDown(!bmDropDown);
                                setAvailability(2);
                              }}
                              style={[styles.drop_down_item, {zIndex: 10}]}>
                              <Text>Branch Manager Unavailable</Text>
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                      {availability === 2 ? (
                        <>
                          <View
                            style={{flex: 1, marginTop: 20, marginBottom: 10}}>
                            <Text style={styles.txt_head}>
                              Employee Details
                            </Text>
                            <TouchableWithoutFeedback onPress={() => setAllDropDown()}>
                            <TextInput
                              style={{
                                backgroundColor: GREY_TEXT_COLOR,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                marginVertical: 10,
                              }}
                              value={employeName}
                              placeholder="Employee name *"
                              onFocus={()=> setAllDropDown()}
                              onChangeText={text => {setEmployeeName(text) }}
                            />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => setAllDropDown()}>
                            <TextInput
                              style={{
                                backgroundColor: GREY_TEXT_COLOR,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                marginVertical: 5,
                              }}
                              value={employeEmail}
                              placeholder="Employee email *"
                              onFocus={()=> setAllDropDown()}
                              onChangeText={text => setEmployeeEmail(text)}
                            />
                            </TouchableWithoutFeedback>
                            <Text style={{...styles.txt_head, fontSize: normalize(TINY_FONT_SIZE), marginTop:7}}>
                              Enter employee mobile number to share review link via SMS
                          </Text>
                          <TextInput
                                 keyboardType="numeric" 
                                style={{
                                  backgroundColor: GREY_TEXT_COLOR,
                                  borderRadius: 5,
                                  paddingVertical: 10,
                                  paddingHorizontal: 10,
                                  marginVertical: 8,
                                }}
                                value={managerMobile}
                                placeholder="Employee Mobile"
                                onFocus={()=> setAllDropDown()}
                                onChangeText={text =>
                                  setManagerMobile(text)
                                  // setEmployeeMobile(text)
                                }
                              />
                            {/* <Text style={{...styles.txt_head, top: 15}}>
                              Employee Designation
                            </Text> */}
                            {/* <TouchableOpacity
                              onPress={() => {handleRoleDropdown(); setBmDropDown(false); setdropDown(false)}}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: GREY_TEXT_COLOR,
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                marginVertical: 20,
                                width: '100%',
                                borderRadius: 5,
                              }}>
                              <View>
                                <Text>
                                  {employeeRole === 1 ? 'Backup BM' : 'Other'}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                {roleDropDown ? (
                                  <Image
                                    source={DOWNARROW}
                                    style={{transform: [{rotateZ: '180deg'}]}}
                                  />
                                ) : (
                                  <Image source={DOWNARROW} />
                                )}
                              </View>
                            </TouchableOpacity> */}
                            {/* {roleDropDown ? (
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                  // paddingHorizontal: 10,
                                  top: -20,
                                  left: 0,
                                  // marginRight: 160,
                                  backgroundColor: GREY_TEXT_COLOR,
                                  zIndex: 1,
                                }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    setRoleDropDown(!roleDropDown);
                                    setEmployeeRole(1);
                                  }}
                                  style={[styles.drop_down_item, {zIndex: 10}]}>
                                  <Text>Backup BM</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    setRoleDropDown(!roleDropDown);
                                    setEmployeeRole(2);
                                  }}
                                  style={[styles.drop_down_item, {zIndex: 10}]}>
                                  <Text>Other</Text>
                                </TouchableOpacity>
                              </View>
                            ) : null} */}
                            {/* {employeeRole === 2 ? ( */}
                              <TextInput
                                style={{
                                  backgroundColor: GREY_TEXT_COLOR,
                                  borderRadius: 5,
                                  paddingVertical: 10,
                                  paddingHorizontal: 10,
                                  marginVertical: 10,
                                }}
                                value={employeeDesignation}
                                placeholder="Employee designation *"
                                onFocus={()=> setAllDropDown()}
                                onChangeText={text =>
                                  setEmployeeDesignation(text)
                                }
                              />
                            {/* ) : null} */}
                          </View>
                        </>
                      ) : availability === 1 && (<View style={{flex: 1, marginTop: 20, marginBottom: 10}}>
                         <Text style={{...styles.txt_head, fontSize: normalize(TINY_FONT_SIZE)}}>
                              Enter BM's mobile number to share review link via SMS
                          </Text>
                          <TextInput
                                 keyboardType="numeric" 
                                style={{
                                  backgroundColor: GREY_TEXT_COLOR,
                                  borderRadius: 5,
                                  paddingVertical: 10,
                                  paddingHorizontal: 10,
                                  marginVertical: 8,
                                }}
                                value={managerMobile}
                                placeholder="Branch Manager Mobile"
                                onFocus={()=> setAllDropDown()}
                                onChangeText={text =>
                                  setManagerMobile(text)
                                }
                              />
                      </View>)}
                    </View>
                  </>
                ) : null}
              </View>
              </View>
              {/* </ScrollView> */}
            </TouchableWithoutFeedback>
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

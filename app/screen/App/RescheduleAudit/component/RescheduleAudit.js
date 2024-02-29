import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
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
  DOWNARROW,
  TINY_FONT_SIZE,
} from '../../../../utils/constant';
import Header from '../../../../component/Header';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {normalize} from '../../../../utils/scaleFontSize';

let ACDATE;
let timeData = [];
export default function RescheduleAudit(props) {
  const [Cdate, setCdate] = useState(new Date());
  const [openDates, setopenDates] = useState(false);
  const [openTime, setopenTime] = useState(false);
  const [dropDown, setdropDown] = useState(false);
  const [bmDropDown, setBmDropDown] = useState(false);
  const [roleDropDown, setRoleDropDown] = useState(false);
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
    handleSumbit,
    editAudit,
    seteditAudit,
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
  } = props;
  console.log('The bm availabitty ====>>>', editAudit.bm_availability);
  // useEffect(() => {
  //     setAvailability((prev) => prev=editAudit.bm_availability)
  // })

  function handleBMDropdown() {
    setBmDropDown(!bmDropDown);
    setdropDown(false);
    setRoleDropDown(false);
  }
  function handleRoleDropdown() {
    setRoleDropDown(!roleDropDown);
    setdropDown(false);
    setBmDropDown(false);
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

  function _handleSelect(params) {
    seteditAudit({...editAudit, audit_type: params});
  }

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
    // setopenDates(false);
    setdropDown(!dropDown);
    setBmDropDown(false);
    setRoleDropDown(false);
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
    setdropDown(false);
    setBmDropDown(false);
    setRoleDropDown(false);
  };
  return (
    <>
      {isLoading ? (
        <Text> Loading...</Text>
      ) : (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.contianer}>
            <Header
              headerText={'Reschedule Review'}
              leftImg={ARROW}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <TouchableWithoutFeedback onPress={() => setAllDropDown()}>
              <View
                style={{
                  padding: 20,
                  // padding: 20,
                  justifyContent: 'space-evenly',
                }}>
                <View>
                  <Text style={styles.txt_head}>Bank Details for Review</Text>
                  <DropDown
                    title={
                      editAudit.branch_name
                        ? editAudit.branch_name
                        : 'Branch Name/Code *'
                    }
                    data={branchDetail}
                    renderItem={displaybranchDropDown}
                    dropDown={branchNameDropDown}
                    data_name={'brach_name'}
                    setdropDown={setbranchNameDropDown}
                    setTimeDropDown={setdropDown}
                  />
                  {/* <DropDown
                  title={editAudit ? editAudit.city_name : 'City'}
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
                    {editAudit ? editAudit.city_name : 'City'}
                  </Text>

                  <Text
                    style={{
                      backgroundColor: GREY_TEXT_COLOR,
                      borderRadius: 5,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      marginVertical: 10,
                    }}>
                    {editAudit.branch_manager
                      ? editAudit.branch_manager
                      : 'Branch Manager Name/Code *'}
                  </Text>
                  {/* <DropDown title="Branch Name / ATM Name" data={data} />
                                        <DropDown title="Branch Manager Name / ATM Code" data={data} /> */}
                </View>
                <View>
                  <Text style={styles.txt_head}>Schedule on:</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <TouchableOpacity
                        style={styles.date_time}
                        onPress={() => {
                          setopenDates(true);
                          setAllDropDown();
                        }}>
                        <Image source={CALENDAR} style={{marginRight: 10}} />
                        {editAudit ? (
                          <Text>{editAudit.audit_date}</Text>
                        ) : (
                          <Text>Date</Text>
                        )}
                      </TouchableOpacity>
                      <DatePicker
                        modal
                        open={openDates}
                        mode="date"
                        date={Cdate}
                        onConfirm={date => {
                          setopenDates(false);
                          if (
                            moment(date).format('DD-MM-YYYY') ==
                            moment(moment()).format('DD-MM-YYYY')
                          ) {
                            if (
                              editAudit.audit_time <
                              moment(new Date()).format('H-mm')
                            ) {
                              setopenDates(!openDates);
                              Alert.alert('Please select vaild time.');
                            } else {
                              setopenDates(!openDates);
                              ACDATE = moment(date).format('DD-MM-YYYY');
                              seteditAudit({
                                ...editAudit,
                                audit_date: moment(date).format('DD-MM-YYYY'),
                              });
                            }
                          } else if (moment(date) < moment(moment())) {
                            Alert.alert(
                              'date',
                              "You can't select previous date",
                            );
                          } else if (
                            !moment(date).isSameOrBefore(
                              moment().add(1, 'week'),
                            )
                          ) {
                            Alert.alert(
                              'You are restricted from choosing a date beyond one week.',
                            );
                          } else {
                            setopenDates(!openDates);
                            ACDATE = moment(date).format('DD-MM-YYYY');
                            seteditAudit({
                              ...editAudit,
                              audit_date: moment(date).format('DD-MM-YYYY'),
                            });
                          }
                          // if (
                          //   moment(date)<
                          //   moment(moment())
                          // ) {
                          //   Alert.alert('date', "You can't select previous date");
                          // } else {
                          //   if (
                          //     moment(date).format('DD-MM-YYYY') ==
                          //     moment(moment()).format('DD-MM-YYYY')
                          //   ) {
                          //     if (
                          //       editAudit.audit_time <
                          //       moment(new Date()).format('H-mm')
                          //     ) {
                          //       setopenDates(!openDates);
                          //       Alert.alert('Please select vaild time.');
                          //     } else {
                          //       setopenDates(!openDates);
                          //       ACDATE = moment(date).format('DD-MM-YYYY');
                          //       seteditAudit({
                          //         ...editAudit,
                          //         audit_date: moment(date).format('DD-MM-YYYY'),
                          //       });
                          //     }
                          //   } else {
                          //     setopenDates(!openDates);
                          //     ACDATE = moment(date).format('DD-MM-YYYY');
                          //     seteditAudit({
                          //       ...editAudit,
                          //       audit_date: moment(date).format('DD-MM-YYYY'),
                          //     });
                          //   }

                          // setopenDates(!openDates)
                          // seteditAudit({...editAudit,audit_date:moment(date).format('DD-MM-YYYY')})
                          // }
                        }}
                        onCancel={() => {
                          setopenDates(false);
                        }}
                      />
                    </View>

                    <View style={{position: 'absolute', right: 1, zIndex: 999}}>
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
                          {editAudit.audit_time ? editAudit.audit_time : 'Time'}
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
                            height:
                              Platform.OS == 'ios'
                                ? editAudit.audit_type === 1
                                  ? 115
                                  : 150
                                : editAudit.audit_type === 1
                                ? 115
                                : 200,
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
                                      ACDATE ==
                                      moment(new Date()).format('DD-MM-YYYY')
                                    ) {
                                      if (
                                        item < moment(new Date()).format('H-mm')
                                      ) {
                                        setdropDown(false);
                                        Alert.alert(
                                          'Kindly choose an appropriate time.',
                                        );
                                      } else {
                                        seteditAudit({
                                          ...editAudit,
                                          audit_time: item,
                                        });
                                        setdropDown(false);
                                      }
                                    } else {
                                      seteditAudit({
                                        ...editAudit,
                                        audit_time: item,
                                      });
                                      setdropDown(false);
                                    }
                                  }}>
                                  <Text style={styles.drop_down_txt}>
                                    {item}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                        </ScrollView>
                      )}
                    </View>
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
                      source={
                        editAudit.audit_type === 2
                          ? CHECKED_ICON
                          : UNCHECKED_ICON
                      }
                      style={{marginRight: 5}}
                    />
                    <Text
                      style={{
                        color:
                          editAudit.audit_type === 2
                            ? PRIMARY_BLUE_COLOR
                            : 'gray',
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
                      source={
                        editAudit.audit_type === 1
                          ? CHECKED_ICON
                          : UNCHECKED_ICON
                      }
                      style={{marginRight: 5}}
                    />
                    <Text
                      style={{
                        color:
                          editAudit.audit_type === 1
                            ? PRIMARY_BLUE_COLOR
                            : 'gray',
                      }}>
                      Virtual/online review
                    </Text>
                  </TouchableOpacity>
                </View>
                {editAudit.audit_type === 1 ? (
                  <>
                    <View style={{flex: 1, marginTop: -30}}>
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => handleBMDropdown()}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: GREY_TEXT_COLOR,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            width: '100%',
                          }}>
                          <View>
                            <Text>
                              {editAudit.bm_availability === 1
                                ? 'Branch Manager Available'
                                : editAudit.bm_availability === 2
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
                                seteditAudit({
                                  ...editAudit,
                                  bm_availability: 1,
                                });
                              }}
                              style={[styles.drop_down_item, {zIndex: 10}]}>
                              <Text>Branch Manager Available</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setBmDropDown(!bmDropDown);
                                setAvailability(2);
                                seteditAudit({
                                  ...editAudit,
                                  bm_availability: 2,
                                });
                              }}
                              style={[styles.drop_down_item, {zIndex: 10}]}>
                              <Text>Branch Manager Unavailable</Text>
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                      {editAudit.bm_availability === 2 ? (
                        <>
                          <View
                            style={{flex: 1, marginTop: 20, marginBottom: 10}}>
                            <Text style={styles.txt_head}>
                              Employee Details
                            </Text>
                            <TextInput
                              style={{
                                backgroundColor: GREY_TEXT_COLOR,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                marginVertical: 10,
                              }}
                              value={editAudit.emp_name}
                              placeholder={'Employee name *'}
                              onFocus={() => setAllDropDown()}
                              onChangeText={text =>
                                seteditAudit({...editAudit, emp_name: text})
                              }
                            />
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                              }}>
                              <TextInput
                                style={{
                                  backgroundColor: GREY_TEXT_COLOR,
                                  borderTopLeftRadius: 5,
                                  borderBottomLeftRadius: 5,
                                  paddingVertical: 10,
                                  paddingHorizontal: 10,
                                  marginVertical: 5,
                                  width : '62%'
                                }}
                                value={editAudit.emp_email}
                                placeholder={'Employee email *'}
                                onFocus={() => setAllDropDown()}
                                onChangeText={text =>
                                  seteditAudit({...editAudit, emp_email: text})
                                }
                              />
                              <Text
                                style={{
                                  backgroundColor: GREY_TEXT_COLOR,
                                  borderTopRightRadius: 5,
                                  borderBottomRightRadius: 5,
                                  paddingVertical: 15,
                                  paddingHorizontal: 10,
                                  marginVertical: 10,
                                }}>
                                @hdfcbank.com
                              </Text>
                            </View>
                            <Text
                              style={{
                                ...styles.txt_head,
                                fontSize: normalize(TINY_FONT_SIZE),
                                marginTop: 7,
                              }}>
                              Enter employee mobile number to share review link
                              via SMS
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
                              value={editAudit?.bm_mobile}
                              placeholder="Employee Mobile"
                              onFocus={() => setAllDropDown()}
                              onChangeText={text =>
                                seteditAudit({...editAudit, bm_mobile: text})
                              }
                            />
                            {/* <Text style={{...styles.txt_head, top: 15}}>
                            Employee Designation
                          </Text> */}
                            {/* <TouchableOpacity
                            onPress={() => handleRoleDropdown()}
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
                                {editAudit.emp_role_type === '1'
                                  ? 'Backup BM'
                                  : 'Other'}
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
                          </TouchableOpacity>
                          {roleDropDown ? (
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                              
                                top: -20,
                                left: 0,
                              
                                backgroundColor: GREY_TEXT_COLOR,
                                zIndex: 1,
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  setRoleDropDown(!roleDropDown);
                                  setEmployeeRole(1);
                                  seteditAudit({
                                    ...editAudit,
                                    emp_role_type: '1',
                                  });
                                }}
                                style={[styles.drop_down_item, {zIndex: 10}]}>
                                <Text>Backup BM</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  setRoleDropDown(!roleDropDown);
                                  setEmployeeRole(2);
                                  seteditAudit({
                                    ...editAudit,
                                    emp_role_type: '2',
                                  });
                                }}
                                style={[styles.drop_down_item, {zIndex: 10}]}>
                                <Text>Other</Text>
                              </TouchableOpacity>
                            </View>
                          ) : null} */}
                            {/* {editAudit.emp_role_type === '2' ? ( */}
                            <TextInput
                              style={{
                                backgroundColor: GREY_TEXT_COLOR,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                marginVertical: 5,
                              }}
                              value={editAudit.emp_role}
                              placeholder={'Employee designation *'}
                              onFocus={() => setAllDropDown()}
                              onChangeText={text =>
                                seteditAudit({...editAudit, emp_role: text})
                              }
                            />
                            {/* ) : null} */}
                          </View>
                        </>
                      ) : (
                        editAudit.bm_availability === 1 && (
                          <View
                            style={{flex: 1, marginTop: 20, marginBottom: 10}}>
                            <Text
                              style={{
                                ...styles.txt_head,
                                fontSize: normalize(TINY_FONT_SIZE),
                              }}>
                              Enter BM's mobile number to share review link via
                              SMS
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
                              value={editAudit.bm_mobile}
                              placeholder="Branch Manager Mobile"
                              onFocus={() => setAllDropDown()}
                              onChangeText={text =>
                                seteditAudit({...editAudit, bm_mobile: text})
                              }
                            />
                          </View>
                        )
                      )}
                    </View>
                  </>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
              <Button title="Schedule" onPress={() => handleSumbit()} />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

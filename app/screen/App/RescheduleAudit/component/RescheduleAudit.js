import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
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
} from '../../../../utils/constant';
import Header from '../../../../component/Header';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

let ACDATE;
let timeData = [];
export default function RescheduleAudit(props) {
  const [Cdate, setCdate] = useState(new Date());
  const [openDate, setopenDate] = useState(false);
  const [openTime, setopenTime] = useState(false);
  const [dropDown, setdropDown] = useState(false);
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
  } = props;
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
        onPress={() => handleSelectBranch(item.branch_name, item.branch_id)}
        style={styles.drop_down_item}>
        <Text style={styles.txt}>{item.branch_name}</Text>
      </TouchableOpacity>
    );
  };
  const handleDropDown = () => {
    setdropDown(!dropDown);
  };
  for (var i = 10; i <= 18; i++) {
    for (var j = 0; j <= 55; j += 15) {
      if (j == 0) timeData.push(i + '-0' + j);
      else timeData.push(i + '-' + j);
    }
  }
  timeData.push('19-00');
  const navigation = useNavigation();
  return (
    <>
      {isLoading ? (
        <Text> Loading...</Text>
      ) : (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.contianer}>
            <Header
              headerText={'Reschedule Audit'}
              leftImg={ARROW}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <View
              style={{
                padding: 20,
                padding: 20,
                justifyContent: 'space-evenly',
              }}>
              <View>
                <Text style={styles.txt_head}>Bank Details for Audit</Text>
                <DropDown
                  title={editAudit ? editAudit.city_name : 'City'}
                  data={cityBranch}
                  renderItem={displayCityDropDown}
                  dropDown={citydropDown}
                  data_name={'city_name'}
                  setdropDown={setcitydropDown}
                />

                <DropDown
                  title={
                    editAudit.branch_name
                      ? editAudit.branch_name
                      : 'Branch Name / ATM Name'
                  }
                  data={branchDetail}
                  renderItem={displaybranchDropDown}
                  dropDown={branchNameDropDown}
                  data_name={'brach_name'}
                  setdropDown={setbranchNameDropDown}
                />

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
                    : 'Branch Manager Name / ATM Code'}
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
                        setopenDate(true);
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
                      open={openDate}
                      mode="date"
                      date={Cdate}
                      onConfirm={date => {
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
                            if (
                              editAudit.audit_time <
                              moment(new Date()).format('H-mm')
                            ) {
                              setopenDate(!openDate);
                              alert('Please select vaild time.');
                            } else {
                              setopenDate(!openDate);
                              ACDATE = moment(date).format('DD-MM-YYYY');
                              seteditAudit({
                                ...editAudit,
                                audit_date: moment(date).format('DD-MM-YYYY'),
                              });
                            }
                          } else {
                            setopenDate(!openDate);
                            ACDATE = moment(date).format('DD-MM-YYYY');
                            seteditAudit({
                              ...editAudit,
                              audit_date: moment(date).format('DD-MM-YYYY'),
                            });
                          }

                          // setopenDate(!openDate)
                          // seteditAudit({...editAudit,audit_date:moment(date).format('DD-MM-YYYY')})
                        }
                      }}
                      onCancel={() => {
                        setopenDate(false);
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
                        // <View 
                        //   style={{backgroundColor: GREY_TEXT_COLOR, height: 200}}>
                        //   <FlatList
                        //     data={timeData}
                        //     renderItem={({item}) => {
                        //       return (
                        //         <TouchableOpacity
                        //           style={styles.drop_down_item}
                        //           onPress={() => {
                        //             if (
                        //               ACDATE ==
                        //               moment(new Date()).format('DD-MM-YYYY')
                        //             ) {
                        //               if (
                        //                 item < moment(new Date()).format('H-mm')
                        //               ) {
                        //                 setdropDown(false);
                        //                 alert('Please Select Proper Time');
                        //               } else {
                        //                 seteditAudit({
                        //                   ...editAudit,
                        //                   audit_time: item,
                        //                 });
                        //                 setdropDown(false);
                        //               }
                        //             } else {
                        //               seteditAudit({
                        //                 ...editAudit,
                        //                 audit_time: item,
                        //               });
                        //               setdropDown(false);
                        //             }
                        //           }}>
                        //           <Text style={styles.drop_down_txt}>{item}</Text>
                        //         </TouchableOpacity>
                        //       );
                        //     }}
                        //   />
                        // </View>
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
                                style={styles.drop_down_item}
                                onPress={() => {
                                  if (
                                    ACDATE ==
                                    moment(new Date()).format('DD-MM-YYYY')
                                  ) {
                                    if (
                                      item < moment(new Date()).format('H-mm')
                                    ) {
                                      setdropDown(false);
                                      alert('Please Select Proper Time');
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
                                <Text style={styles.drop_down_txt}>{item}</Text>
                              </TouchableOpacity>
                            );
                          })}
                      </ScrollView>
                    )}
                  </View>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={styles.txt_head}>Audit Type:</Text>
                <TouchableOpacity
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => _handleSelect(1)}>
                  <Image
                    source={
                      editAudit.audit_type === 1 ? CHECKED_ICON : UNCHECKED_ICON
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
                    Online Audit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => _handleSelect(2)}>
                  <Image
                    source={
                      editAudit.audit_type === 2 ? CHECKED_ICON : UNCHECKED_ICON
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
                    On-Site Audit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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

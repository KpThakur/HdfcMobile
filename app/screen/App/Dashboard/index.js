import React, {useState, useEffect, useContext} from 'react';
import DashboardView from './component/dashboard';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {styles} from './component/style';
import {
  CALENDAR,
  CLOCK,
  DASHBOARD_HEROIC,
  ADD_ICON,
  GREEN_COLOR,
  RED_COLOR,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMI_BOLD,
  TINY_FONT_SIZE,
} from '../../../utils/constant';
import Cancel from '../../../component/Cancel';
import {normalize} from '../../../utils/scaleFontSize';
import {apiCall} from '../../../utils/httpClient';
import apiEndPoints from '../../../utils/apiEndPoints';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {UserContext} from '../../../utils/UserContext';
import {QuestionContext} from '../../../utils/QuestionContext';
import {EditAuditContext} from '../../../utils/EditAuditContext';
import {socket} from '../../../utils/Client';
import _ from 'lodash';

import UpdateAlert from '../../../component/UpdateAlert';
const DashboardScreen = ({navigation}) => {
  const [userData, setUserData] = useContext(UserContext);
  const [question, setquestion] = useContext(QuestionContext);
  const [tabBar, setTabBar] = useState(1);
  const [popup, setpopup] = useState(false);
  const [search, setsearch] = useState('');
  const [auditList, setauditList] = useState([]);
  const [reason, setreason] = useState('');
  const [editAudit, seteditAudit] = useContext(EditAuditContext);
  const [auditArray, setauditArray] = useState([]);
  const [onRefresh, setOnRefresh] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      AuditList(tabBar);
      return;
    }, [tabBar]),
  );
  useEffect(() => {}, [auditList]);
  useEffect(() => {
    AuditList(tabBar);
  }, [tabBar]);
  const togglePopUp = () => {
    setpopup(!popup);
  };
  const [option, setOption] = useState([
    {
      id: 1,
      name: "Today's Audit",
    },
    {
      id: 2,
      name: 'Upcoming Audit',
    },
    {
      id: 3,
      name: 'Open Audit',
    },
    {
      id: 6,
      name: 'Pending Audit',
    },
    {
      id: 4,
      name: 'Completed Audit',
    },
    {
      id: 5,
      name: 'Cancelled Audit',
    },
  ]);
  const onPressSelectedTab = async index => {
    await setauditArray([]);
    setTabBar(index);
    // AuditList(index)
  };
  const handleAddNewAudit = () => {
    navigation.navigate('ScheduleNewAuditScreen');
  };
  const AuditList = async index => {
    try {
      setOnRefresh(true);
      const params = {audit_type: index};
      const response = await apiCall(
        'POST',
        apiEndPoints.GET_AUDIT_LIST,
        params,
      );
      // console.log(response.config?.data, " :response: ", response?.data);
      if (response.status === 200) {
        setOnRefresh(false);
        setauditArray(response.data.data);
        setauditList(response.data.data);
      } else if (response.status === 403) {
        setOnRefresh(false);
        AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
      } else if (response.status === 201) {
        setOnRefresh(false);
        setauditArray([]);
        setauditList([]);
      }
    } catch (error) {
      setOnRefresh(false);
    }
  };
  const onRefreshAuditList = async () => {
    try {
      setOnRefresh(true);
      const params = {audit_type: tabBar};
      const response = await apiCall(
        'POST',
        apiEndPoints.GET_AUDIT_LIST,
        params,
      );
      if (response.status === 200) {
        setOnRefresh(false);
        setauditArray(response.data.data);
        setauditList(response.data.data);
      } else if (response.status === 403) {
        setOnRefresh(false);
        AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
      } else if (response.status === 201) {
        setOnRefresh(false);
        setauditArray([]);
        setauditList([]);
      }
    } catch (error) {
      setOnRefresh(false);
    }
  };

  const handleCancelAudit = async audit_id => {
    const params = {
      audit_id: audit_id,
      audit_status: 2,
      reason: reason,
    };

    const response = await apiCall('POST', apiEndPoints.CANCEL_AUDIT, params);
    Alert.alert('Audit Cancelled', response.data.message);
    setpopup(!popup);
    AuditList(1);
  };
  const StartAudit = async id => {
    const params = {
      audit_id: id,
      audit_status: 4,
    };
    const response = await apiCall('POST', apiEndPoints.CANCEL_AUDIT, params);
  };
  const HandleStatus = async (
    id,
    status,
    questions_id,
    branch_manager,
    time,
  ) => {
    if (status == 1) {
      QuestionList(id, branch_manager, questions_id);
    } else {
      StartAudit(id);
      const params = {
        audit_id: id,
        employee_id: userData.emp_id,
        question_id: questions_id,
        type: 1,
      };
      const response = await apiCall('POST', apiEndPoints.QUESTION, params);
      console.log('The question data --->>>>', response);
      if (response.status === 200) {
        setquestion({
          data: response.data.data,
          audit_id: id,
          branch_manager: branch_manager,
          audit_type: 0,
        });
        navigation.navigate('QuestionScreen');
        //  navigation.navigate("VideoScreen");
      } else {
        if (response.status === 404) {
          // Alert.alert('', response?.data?.message);
          navigation.navigate('VideoScreen');
        }
      }
    }
  };

  const QuestionList = async (id, branch_manager, questions_id) => {
    const params = {
      audit_id: id,
      questions_id: questions_id,
      employee_id: userData.emp_id,
      type: 1,
    };
    socket.emit('getQuestionList', params, data => {
      setquestion({
        data: data.data,
        audit_id: id,
        branch_manager: branch_manager,
        audit_type: 1,
        answer: data.answer,
      });
    });
    navigation.navigate('AuditWelcomeScreen', {audit_id: id});
  };
  const EditAudit = item => {
    seteditAudit(item);
    navigation.navigate('RescheduleAudit');
  };
  const HandleSearch = text => {
    setsearch(text);
    if (text.length > 0) {
      var val = [];
      val = auditArray.filter(item => {
        return item.city_name.toLowerCase().includes(search.toLowerCase());
      });
      const val1 = auditArray.filter(item => {
        return item.branch_manager.toLowerCase().includes(search.toLowerCase());
      });
      const val2 = auditArray.filter(item => {
        return item.branch_name.toLowerCase().includes(search.toLowerCase());
      });
      val = [...val, ...val1, ...val2];
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      setauditList(val.filter(onlyUnique));
    } else {
      setauditList(auditArray);
    }
  };

  const renderAudit = ({item: audit, index}) => {
    return (
      <View
        pointerEvents={onRefresh ? 'none' : 'auto'}
        style={{marginHorizontal: 10}}
        key={audit.city_id}>
        <Cancel
          popup={popup}
          togglePopUp={togglePopUp}
          reason={reason}
          setreason={setreason}
          onPress={() => handleCancelAudit(audit.audit_id)}
        />
        <View style={styles.box}>
          <View
            style={
              audit.branch_type === 0
                ? styles.box_header
                : styles.box_header_new
            }>
            <Text style={styles.header_txt}>{audit.branch_name}</Text>
            <Text style={styles.header_txt}>Bank</Text>
          </View>
          <View style={styles.box_body}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor:"red"
                }}>
                <Image source={CALENDAR} style={styles.img} />
                <Text style={styles.txt}>{'Date: '}</Text>
                <Text style={styles.p_txt}>
                  {moment(audit.audit_date, 'DD-MM-YYYY').format(
                    'DD/MM/YYYY , ddd',
                  )}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor:"blue"
                }}>
                <Image source={CLOCK} style={styles.img} />
                <Text style={styles.txt}>{'Time: '}</Text>
                <Text style={styles.p_txt}>
                  {moment(audit.audit_time, 'H-mm').format('h:mm A')}
                </Text>
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={styles.s_txt}>Branch Manager Name</Text>
              <Text style={styles.txt}>{audit.branch_manager}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <View>
                <Text style={styles.s_txt}>Actionable No.</Text>
                <Text style={styles.txt}>02 Members</Text>
              </View>
              <View>
                <Text style={styles.s_txt}>Audit Status</Text>
                <Text style={styles.txt}>
                  {audit.audit_type === 1 ? 'Online Audit' : 'On-Site Audit'}
                </Text>
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={styles.s_txt}>City</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.txt}>{audit.city_name}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  {tabBar === 1 || tabBar === 2 || tabBar === 6 ? (
                    <TouchableOpacity
                      style={styles.cancel_btn}
                      onPress={() => togglePopUp()}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: normalize(TINY_FONT_SIZE),
                          fontFamily: FONT_FAMILY_SEMI_BOLD,
                        }}>
                        Cancel Audit
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  {tabBar === 1 || tabBar === 6 ? (
                    <TouchableOpacity
                      style={styles.prim_btn}
                      onPress={() =>
                        HandleStatus(
                          audit.audit_id,
                          audit.audit_type,
                          audit.questions_id,
                          audit.branch_manager,
                          audit.audit_time,
                        )
                      }>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: normalize(TINY_FONT_SIZE),
                          fontFamily: FONT_FAMILY_SEMI_BOLD,
                        }}>
                        {audit.audit_status === 4 ? 'Started' : 'Start Audit'}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  {tabBar === 2 ? (
                    <TouchableOpacity
                      style={styles.prim_btn}
                      onPress={() => EditAudit(audit)}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: normalize(TINY_FONT_SIZE),
                          fontFamily: FONT_FAMILY_SEMI_BOLD,
                        }}>
                        Reschedule
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  {tabBar === 3 ? (
                    <TouchableOpacity
                      style={styles.prim_btn}
                      onPress={() => {
                        navigation.navigate('ReviewAduit', {
                          audit_id: audit.audit_id,
                          branch_manager: audit.branch_manager,
                        });
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: normalize(TINY_FONT_SIZE),
                          fontFamily: FONT_FAMILY_SEMI_BOLD,
                        }}>
                        Update
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  {tabBar === 4 || tabBar === 5 ? (
                    <Text
                      style={{
                        color:
                          audit.audit_status === 3 ? GREEN_COLOR : RED_COLOR,
                        fontFamily: FONT_FAMILY_REGULAR,
                      }}>
                      {audit.audit_status === 3 ? 'Completed' : 'Cancelled'}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const tabBarSwitch = type => {
    switch (type) {
      case 1:
        return 'Add New Schedule';
      case 2:
        return 'No Upcoming Audit Found';
      case 3:
        return 'No Open Audit Found';
      case 4:
        return 'No Close Audit Found';
      case 5:
        return 'No Close Audit Found';
      case 6:
        return 'No Pending Audit Found';
      default:
        return 'Add New Schedule';
    }
  };
  const renderEmptyComponent = () => (
    <View style={{flex: 5, backgroundColor: '#fff'}}>
      <View style={{alignItems: 'center'}}>
        <Image
          resizeMode={'contain'}
          style={{width: 250, height: 350}}
          source={DASHBOARD_HEROIC}
        />
        <View style={{padding: 10}}>
          <Text
            style={{
              color: '#5382b5',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {tabBarSwitch(tabBar)}
          </Text>
        </View>
        {tabBar === 1 && (
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 12,
                textAlign: 'center',
                padding: 5,
              }}>
              No Audit for today ,set new Schedule for new audit.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#1b7dec',
                borderRadius: 30,
                marginBottom: 10,
                marginTop: 10,
              }}
              onPress={() => handleAddNewAudit()}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 30,
                  paddingRight: 30,
                  paddingTop: 10,
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: '#fff',
                    marginRight: 5,
                    resizeMode: 'contain',
                  }}
                  source={ADD_ICON}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#ffffff',
                    paddingLeft: 5,
                  }}>
                  Add Schedule
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <>
      <UpdateAlert />
      <DashboardView
        option={option}
        tabBar={tabBar}
        onPressSelectedTab={onPressSelectedTab}
        renderAudit={renderAudit}
        auditList={auditList}
        setauditList={setauditList}
        search={search}
        setsearch={setsearch}
        HandleSearch={HandleSearch}
        onRefresh={onRefresh}
        onRefreshAuditList={onRefreshAuditList}
        renderEmptyComponent={renderEmptyComponent}
      />
    </>
  );
};
export default DashboardScreen;

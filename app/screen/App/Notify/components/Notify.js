import React, {useContext, useEffect, useState} from 'react';
import { useNavigation } from "@react-navigation/core";
import {Text, View, TouchableOpacity, Share, Modal} from 'react-native';
import Header from '../../../../component/Header';
import Button from '../../../../component/Button';
import {styles} from './styles';
import {UserContext} from '../../../../utils/UserContext';
import JoinChannelVideo from '../../../../component/Streaming/App_agora';
import Invitation from '../../Invitation';
const BranchName = props => {
  const {
    handleStartCall,
    question,
    managerJoin,
    joined,
    setstartAudit,
    onShare,
  } = props;
  const [userData, setUserData] = useContext(UserContext);
  const [popup, setPopup] = useState(false);
  const navigation = useNavigation();
  // const [joined, setjoined] = useState(true)
  // const [managerJoin, setmanagerJoin] = useState(true)
  // const handleJoin=(data)=>{
  //     // alert(data)
  //     setjoined(data)
  // }
  useEffect(() => {
    if (props.startAudit == 2) {
      setTimeout(() => {
        props.logout();
      }, 3000000);
    }
  }, []);
  const togglePopUp = () => {
    setPopup(!popup);
  };
  const handleInvitation = () => {
      navigation.navigate("InvitationScreen");
  }
  return (
    <View style={styles.container}>
      {/* <Header leftImg={''} headerText={"Start Review"} /> */}
      <View style={styles.mainvwe}>
        <View style={styles.centfrstvwe}>
          {/* {
                        joined ?
                            <JoinChannelVideo handleJoin={(data) => handleJoin(data)} setmanagerJoin={(s) => (
                                setmanagerJoin(s)
                            )} />
                             :
                            <TouchableOpacity style={styles.bluestreaming}>
                                <Text style={styles.textstraming}>No Live Streaming</Text>
                            </TouchableOpacity>
                    } */}
        </View>
        <View style={styles.body}>
          <View style={styles.teamcall}>
            <Text style={styles.calltxt}>Team ready for the call : </Text>
          </View>
          <View style={styles.brnchmannme}>
            <View style={styles.brnachnme}>
              <Text style={styles.branname}>{question?.branch_manager}</Text>
            </View>
            {managerJoin ? (
              <View
                style={{
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '800',
                    color: '#2bb642',
                  }}>
                  Joined
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.offlinevwe}>
                  <Text style={styles.offiletxt}>Offline</Text>
                </View>
                {/* <TouchableOpacity style={styles.notifyvwe}>
                                        <Text style={styles.notifylble}>Notify</Text>
                                    </TouchableOpacity> */}
              </>
            )}
          </View>

          <View style={styles.brnchmannme}>
            <View style={styles.brnachnme}>
              <Text style={styles.branname}>{userData.name}</Text>
            </View>
            {joined ? (
              <View
                style={{
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '800',
                    color: '#2bb642',
                  }}>
                  Joined
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.offlinevwe}>
                  <Text style={styles.offiletxt}>{'Offline'}</Text>
                </View>
                {/* <TouchableOpacity style={styles.notifyvwe}>
                                        <Text style={styles.notifylble}>Notify</Text>
                                    </TouchableOpacity> */}
              </>
            )}
          </View>
          {/* <View style={styles.brnchmannme}>
                    <View style={styles.brnachnme}>
                        <Text style={styles.branname}>Admin Name</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        marginRight: 10
                    }}>
                        <Text style={{
                            fontSize: 14, fontWeight: '800', color: "#2bb642"
                        }}>Joined</Text>
                    </View>
                </View> */}
          <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 15}}>
            <TouchableOpacity
               onPress={() => handleInvitation()}
              // onPress={() => setPopup(!popup)}
              // onPress={() => props.onShare()}
              style={{
                backgroundColor: '#1b7dec',
                justifyContent: 'center',
                alignItems: 'center',
                width: '33%',
                height: 42,
                borderRadius: 20,
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '800',
                  color: '#ffffff',
                }}>
                Invite
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            {managerJoin ? (
              <Button
                style={{marginBottom: 10}}
                buttonText={'Start Call'}
                onPress={() => handleStartCall()}
              />
            ) : null}
          </View>
        </View>
      </View>
      {/* {popup ? (<Invitation/>): null} */}
      {/* <Invite popup={popup} togglePopUp={togglePopUp} onShare={onShare} /> */}
    </View>
  );
};
export default BranchName;

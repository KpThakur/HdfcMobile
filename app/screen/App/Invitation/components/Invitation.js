import {useNavigation} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Modal} from 'react-native';
import Header from '../../../../component/Header';
import {
    CROSS,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_REGULAR,
  GREY_TEXT_COLOR,
  LEFT_ARROW,
  MAIN_BG_GREY_COLOR,
  SMALL_FONT_SIZE,
  WHATSAPP,
  WHITE_BG_COLOR,
} from '../../../../utils/constant';
import Button from '../../../../component/Button';
import { normalize } from '../../../../utils/scaleFontSize';

const InvitationView = props => {
  const {onShare} = props;
  const navigation = useNavigation();
  const [popup, setPopup] = useState(false);
  const handlePopup = () => {
    setPopup(!popup);
  }

  return (
    <>
      <View style={styles.container}>
        <Header
          leftImg={LEFT_ARROW}
          headerText={'Start Review'}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainBody}>
          <View style={{marginBottom: 70}}>
            <Text style={styles.textStyle}>
              Send Invitation to Branch Manager :
            </Text>
          </View>

          <Button buttonText={'Share'} onPress={() => onShare()}/>
          <View style={{marginTop: 50, marginBottom: 70}}>
            <Text style={styles.textStyle}>
              Send Invitation to Alternative BM :
            </Text>
          </View>

          <Button buttonText={'Share'} onPress={() => onShare()} />
        </View>
        
      </View>
    </>
  );
};
export default InvitationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREY_TEXT_COLOR
  },
  mainBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
    backgroundColor: WHITE_BG_COLOR,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius : 10
  },
  textStyle: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 16,
    color : 'black'
  },
});

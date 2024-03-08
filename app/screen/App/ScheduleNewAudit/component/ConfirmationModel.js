import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Button from '../../../../component/Button';
import {
  FONT_FAMILY_REGULAR,
  MEDIUM_FONT_SIZE,
  SMALL_FONT_SIZE,
} from '../../../../utils/constant';
import {normalize} from '../../../../component/scaleFontSize';

const ConfirmationalModel = props => {
  const {visible, setVisible, message, onModalClose, onYes} = props;
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#004c8f95',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginVertical: 200,
            paddingVertical: 20,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: FONT_FAMILY_REGULAR,
                color: '#000',
                fontSize: normalize(SMALL_FONT_SIZE),
              }}>
             `${message}. Are you sure you want to schedule audit ?`
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 200,
              marginBottom: 10,
              //   backgroundColor: 'red',
            }}>
            <Button buttonText="Yes" onPress={onYes}/>
            <Button buttonText="No" onPress={onModalClose}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
});

export default ConfirmationalModel;

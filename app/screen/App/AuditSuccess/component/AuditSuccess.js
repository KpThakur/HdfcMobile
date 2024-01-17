import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../../../component/Button';
import {styles} from './styles';
import {INSTRUCTION, WHITE_BG_COLOR} from '../../../../utils/constant';
export default function AuditSuccess(props) {
  const {handleHome} = props;
  const WindowWidth = Dimensions.get('window').width;
  const WindowHeight = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              backgroundColor: WHITE_BG_COLOR,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 20.0,
              borderRadius: 5,
              elevation: 5,
              height: WindowHeight / 1.4,
              justifyContent: 'flex-end',
              paddingBottom: 20,
            }}>
            <Image
              resizeMode={'contain'}
             // resizeMode={'contain'}
              source={INSTRUCTION}
            />
            <Text style={styles.txt}>
              Review Report has been Successfully Submitted
            </Text>
            <Button
              style={{marginTop: 30}}
              buttonText={'Home'}
              onPress={() => handleHome()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

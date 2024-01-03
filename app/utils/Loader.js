import React from 'react';
import {Image, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import { DARK_BLUE_COLOR, PRIMARY_BLUE_COLOR } from './constant';
const Loader = props => {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        width: '100%',
        //opacity: 3,
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.5,
      }}>
      {/* <Image
        style={{
          width: 150,
          height: 150,
          //backgroundColor: "red",
          alignSelf: 'center',
          opacity: 1,
        }}
        source={require('../assets/loader/Loading_2.gif')}
      /> */}
      <LottieView
        visible={true}
        style={{
          flex:1,
          backgroundColor: "transparent",
          alignSelf: "center",
          width: 150,
          opacity: 1
        }}
        source={require('../assets/loader/loader.json')}
        colorFilters={[{keypath:'*', color: DARK_BLUE_COLOR, }]}
        autoPlay 
        loop 
        />
    </View>
  );
};
export default Loader;

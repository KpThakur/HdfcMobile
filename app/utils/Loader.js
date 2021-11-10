import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
const Loader = (props) => {
  return (
    <View style={{
      position: "absolute",
      zIndex: 1,
      justifyContent: "center",
      width: '100%',
      opacity: 3,
      height: "100%"
    }}>
      <LottieView
        visible={true}
        style={{
          backgroundColor: "transparent",
          alignSelf: "center",
          width: 150,
        }}
        source={require('../assets/loader/loader.json')}
        autoPlay loop />
    </View>
  );
}
export default Loader;
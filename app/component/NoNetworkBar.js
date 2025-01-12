import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SafeAreaView, StatusBar, Animated, Easing } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { FONT_FAMILY_SEMI_BOLD, RED_COLOR, WHITE_BG_COLOR } from '../utils/constant';

const propTypes = {
  eva: PropTypes.shape({
    style: PropTypes.object,
    theme: PropTypes.object,
  }).isRequired,
};

class OfflineBar extends Component {
  animationConstants = {
    DURATION: 800,
    TO_VALUE: 4,
    INPUT_RANGE: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
    OUTPUT_RANGE: [0, -15, 0, 15, 0, -15, 0, 15, 0],
  };

  state = {
    isConnected: true,
  };

  constructor() {
    super();
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      const { isConnected } = state;
      this.setNetworkStatus(isConnected);
    });
  }

  setNetworkStatus = (status) => {
    this.setState({ isConnected: status });
    if (status) {
      this.triggerAnimation();
    }
  };

  // Took Reference from https://egghead.io/lessons/react-create-a-button-shake-animation-in-react-native#/tab-code
  triggerAnimation = () => {
    this.animation.setValue(0);
    Animated.timing(this.animation, {
      duration: this.animationConstants.DURATION,
      toValue: this.animationConstants.TO_VALUE,
      useNativeDriver: true,
      ease: Easing.bounce,
    }).start();
  };

  render() {
    // const { eva: style, theme,
    // } = this.props;
    const interpolated = this.animation.interpolate({
      inputRange: this.animationConstants.INPUT_RANGE,
      outputRange: this.animationConstants.OUTPUT_RANGE,
    });
    const animationStyle = {
      transform: [{ translateX: interpolated }],
    };
    const { isConnected } = this.state;
    return !isConnected ? (
      <SafeAreaView style={{
        backgroundColor: RED_COLOR,
        paddingVertical: 12,
      }}>
        <StatusBar backgroundColor={RED_COLOR} />
        <Animated.Text style={[{
          color: WHITE_BG_COLOR,
          textAlign: 'center',
          fontFamily: FONT_FAMILY_SEMI_BOLD,
          fontSize: 15,
        }, animationStyle]}>
          No internet connection
        </Animated.Text>
      </SafeAreaView>
    ) : null;
  }
}

// OfflineBar.propTypes = propTypes;

export default OfflineBar;
// export default withStyles(OfflineBar, styles);

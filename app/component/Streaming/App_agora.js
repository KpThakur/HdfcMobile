import React, { Component } from "react";
import ViewShot, { captureScreen } from "react-native-view-shot";
import {
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  Button,
} from "react-native";

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcEngineContext,
  RtcLocalView,
  RtcRemoteView,
} from "react-native-agora";
import SplashScreen from "react-native-splash-screen";
import { MICOFF, MICON, PRIMARY_BLUE_COLOR,PAUSE,PLAY } from "../../utils/constant";
import { apiCall } from "../../utils/httpClient";
import apiEndPoints from "../../utils/apiEndPoints";
import { check, PERMISSIONS, request } from 'react-native-permissions';
const WindowWidth = Dimensions.get("window").width;
const WindowHeight = Dimensions.get("window").height;
const config = require("./agora.config.json");

/* interface State {
  channelId: string;
  isJoined: boolean;
  remoteUid: number[];
  switchCamera: boolean;
  switchRender: boolean;
  audio: boolean;
  pause:boolean;
  token: String;
} */

export default class JoinChannelVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: this.props.channelId,
      isJoined: false,
      remoteUid: [],
      switchCamera: false,
      switchRender: true,
      audio: true,
      pause:false,
      token: this.props.token,
    };
    this.ref = "ViewShot";
  }

  UNSAFE_componentWillMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    this._initEngine();
    this._joinChannel();
  }

  UNSAFE_componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    this._initEngine();
    this._joinChannel();
  }

  componentWillUnmount() {
    this._engine?.destroy();
    this.props.handleJoin(false);
  }

  _initEngine = async () => {
    this._engine = await RtcEngine.createWithContext(
      new RtcEngineContext(config.appId)
    );
    this._addListeners();

    await this._engine.enableVideo();
    await this._engine.startPreview();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);
  };

  _addListeners = () => {
    this._engine?.addListener("Warning", (warningCode) => {
      console.log("Warning", warningCode);
    });
    this._engine?.addListener("Error", (errorCode) => {
      console.log("Error", errorCode);
    });
    this._engine?.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
      console.log("JoinChannelSuccess", channel, uid, elapsed);
      this.setState({ isJoined: true });
      this.props.handleJoin(true);
    });
    this._engine?.addListener("UserJoined", (uid, elapsed) => {
      console.log("UserJoined", uid, elapsed);
      this.props.handleManagerJoin(true);
      this.setState({ remoteUid: [...this.state.remoteUid, uid] });
    });
    this._engine?.addListener("UserOffline", (uid, reason) => {
      console.log("UserOffline", uid, reason);
      
      this.props.handleManagerJoin(false);
      this.setState({
        remoteUid: this.state.remoteUid.filter((value) => value !== uid),
      });
    });
    this._engine?.addListener("LeaveChannel", (stats) => {
      console.log("LeaveChannel", stats);
      this.setState({ isJoined: false, remoteUid: [] });
      this.props.handleJoin(false);
      this.props.handleManagerJoin(false);
    });
  };

  _joinChannel = async () => {
    console.log("AGORA:", this.state.channelId, " ", this.state.token);
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
    if(Platform.OS==='ios')
    {
      await request(PERMISSIONS.IOS.MICROPHONE)
      await request(PERMISSIONS.IOS.CAMERA)
    }
    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelId,
      null,
      config.uid
    );
  };

  _leaveChannel = async () => {
    await this._engine?.leaveChannel();
  };

  _switchCamera = () => {
    const { switchCamera } = this.state;
    this._engine
      ?.switchCamera()
      .then(() => {
        this.setState({ switchCamera: !switchCamera });
      })
      .catch((err) => {
        console.warn("switchCamera", err);
      });
  };

  _switchRender = () => {
    const { switchRender, remoteUid } = this.state;
    this.setState({
      switchRender: !switchRender,
      remoteUid: remoteUid.reverse(),
    });
  };
  _toggleMic = () => {
    const { audio } = this.state;
    // console.log("AUDIO:",audio)
    this.setState({ audio: !audio });
    this._engine.muteLocalAudioStream(this.state.audio);
    // console.log("SETAUDIO:",audio)
  };
  render() {
    const { channelId, isJoined, switchCamera } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {/* <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ channelId: text })}
            placeholder={'Channel ID'}
            value={channelId}
          /> */}
          {/* <Button
            onPress={isJoined ? this._leaveChannel : this._joinChannel}
            title={`${isJoined ? 'Leave' : 'Join'} channel`}
          /> */}
        </View>
        {this._renderVideo()}
        <View style={styles.float}>
          <TouchableOpacity
            onPress={() => this._toggleMic()}
            style={{
              backgroundColor: PRIMARY_BLUE_COLOR,
              padding: 10,
              borderRadius: 100,
            }}
          >
            {this.state.audio ? (
              <Image
                source={MICON}
                style={{ width: 20, height: 20, tintColor: "#fff" }}
              />
            ) : (
              <Image
                source={MICOFF}
                style={{ width: 20, height: 20, tintColor: "#fff" }}
              />
            )}
          </TouchableOpacity>
          {/* <Button
            onPress={this._switchCamera}
            title={`Camera ${switchCamera ? 'front' : 'rear'}`}
          /> */}
        </View>
      </View>
    );
  }

  _renderVideo = () => {
    const { remoteUid } = this.state;
    return (
      <View style={styles.container} collapsable={false}>
        {/*<RtcLocalView.SurfaceView style={styles.local} /> */}
        {remoteUid !== undefined && (
          <ScrollView horizontal={true} style={styles.remoteContainer}>
            <ViewShot ref={"ViewShot"}>
              <View collapsable={false}>
                {remoteUid.map((value, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.remote}
                    onPress={this._switchRender}
                  >
                    <RtcRemoteView.SurfaceView
                      style={styles.container}
                      uid={value}
                      zOrderMediaOverlay={true}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ViewShot>
          </ScrollView>
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  float: {
    position: "absolute",
    bottom: 0,
    right: 1,
    flexDirection:"row"
  },
  top: {
    width: "100%",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
  },
  local: {
    flex: 1,
  },
  remoteContainer: {},
  remote: {
    width: WindowWidth,
    height: "100%",
  },
});

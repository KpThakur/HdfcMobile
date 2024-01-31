import { View, Text, Modal, Image, Platform, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import {
  FONT_FAMILY_REGULAR,
  LARGE_FONT_SIZE,
  PRIMARY_BLUE_COLOR,
  UPDATE_ICON,
} from "../utils/constant";
import { normalize } from "../utils/scaleFontSize";
import Button from "./Button";
import { apiCall } from "../utils/httpClient";
import apiEndPoints from "../utils/apiEndPoints";
import deviceInfoModule from "react-native-device-info";
export default function UpdateAlert() {
  const [updateNotify, setupdateNotify] = useState(false);
  const [link, setlink] = useState();
  useEffect(() => {
    checkAppVersion();
  }, []);

  const checkAppVersion = async () => {
    try {
      const { data } = await apiCall("GET", apiEndPoints.APP_UPDATE);
      console.log(
        deviceInfoModule.getVersion(),
        data.data?.android_version,
        "data: ",
        data
      );
      if (Platform.OS === "ios") {
        setlink(data.data.ios_url);
        setupdateNotify(
          data.data?.ios_version > deviceInfoModule.getVersion() ? false : false
        );
      } else {
        setlink(data.data.android_url);
        setupdateNotify(
          data.data?.android_version > deviceInfoModule.getVersion()
            ? true
            : false
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal visible={updateNotify} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#004c8f95",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: "90%",
            height: "30%",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flex: 0.7,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: normalize(LARGE_FONT_SIZE),
                color: "#000",
                fontFamily: FONT_FAMILY_REGULAR,
                marginBottom: 10,
              }}
            >
              App Update
            </Text>
            <Image
              source={UPDATE_ICON}
              style={{ tintColor: PRIMARY_BLUE_COLOR, width: 50, height: 50 }}
            />
          </View>
          <View
            style={{
              flex: 0.3,
              justifyContent: "center",
            }}
          >
            <Button
              buttonText={"Okay"}
              onPress={() => {
                Linking.openURL(link);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Header from "../../../../component/Header";
import {
  CAMERA,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMI_BOLD,
  PRIMARY_BLUE_COLOR,
} from "../../../../utils/constant";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
export default function Actionable(props) {
  const { data } = props;
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Header
          headerText={"Actionable"}
          leftImg={ARROW}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {data.actionable ? (
          <View style={styles.main}>
            {data.actionable[0].image ? (
              <View style={styles.head}>
                <Image
                  source={{ uri: data.baseURL + data.actionable[0].image }}
                  style={styles.img}
                />
                {/* <TouchableOpacity style={styles.camera_icon}>
                        <Image source={CAMERA} style={styles.icon_img}/>
                    </TouchableOpacity> */}
              </View>
            ) : (
              <View style={styles.head}>
                <Image source={CAMERA} />
                <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>
                  Image not available
                </Text>
              </View>
            )}
            <View style={styles.body}>
              <View>
                <Text style={styles.txt}>Action By</Text>
                <Text style={styles.b_txt}>{data.name}</Text>
              </View>
              {data.actionable[0].score_range ? (
                <View>
                  <Text style={styles.txt}>Rating</Text>
                  <View style={{ alignItems: "center" }}>
                    <Text>
                      Rating:{" "}
                      <Text
                        style={{
                          color: PRIMARY_BLUE_COLOR,
                          fontFamily: FONT_FAMILY_SEMI_BOLD,
                        }}
                      >
                        {data.actionable[0].score_range}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flex: 0.5,
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          color: PRIMARY_BLUE_COLOR,
                          fontFamily: FONT_FAMILY_SEMI_BOLD,
                        }}
                      >
                        {" "}
                        {data.actionable[0].score_range_from}
                      </Text>
                    </View>
                    <Slider
                      style={{ height: 40, flex: 5 }}
                      minimumValue={data.actionable[0].score_range_from}
                      maximumValue={data.actionable[0].score_range_to}
                      minimumTrackTintColor={PRIMARY_BLUE_COLOR}
                      maximumTrackTintColor="#000000"
                      value={data.actionable[0].score_range}
                      thumbTintColor={PRIMARY_BLUE_COLOR}
                      disabled
                      step={1}
                    />
                    <View style={{ flex: 0.5 }}>
                      <Text
                        style={{
                          color: PRIMARY_BLUE_COLOR,
                          fontFamily: FONT_FAMILY_SEMI_BOLD,
                        }}
                      >
                        {data.actionable[0].score_range_to}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}
              <View style={{ marginVertical: 10 }}>
                <Text style={styles.txt}>Remarks</Text>
                <Text style={styles.b_txt}>
                  {data.actionable[0].actionable_remark}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.main}>
            {data.RM[0].image_capture ? (
              <View style={styles.head}>
                <Image
                  source={{ uri: data.baseURL + data.RM[0].image_capture }}
                  style={styles.img}
                />
                {/* <TouchableOpacity style={styles.camera_icon}>
                    <Image source={CAMERA} style={styles.icon_img}/>
                </TouchableOpacity> */}
              </View>
            ) : (
              <View style={styles.head}>
                <Image source={CAMERA} />
                <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>
                  Image not available
                </Text>
              </View>
            )}
            <View style={styles.body}>
              <View>
                <Text style={styles.txt}>Action By</Text>
                <Text style={styles.b_txt}>{data.name}</Text>
              </View>
              {data.RM[0].score_range ? (
                <View>
                  <Text style={styles.txt}>Rating</Text>
                  <View style={{ alignItems: "center" }}>
                    <Text>
                      Rating:{" "}
                      <Text
                        style={{
                          color: PRIMARY_BLUE_COLOR,
                          fontFamily: FONT_FAMILY_SEMI_BOLD,
                        }}
                      >
                        {data.RM[0].score_range}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flex: 0.5,
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          color: PRIMARY_BLUE_COLOR,
                          fontFamily: FONT_FAMILY_SEMI_BOLD,
                        }}
                      >
                        {" "}
                        {data.RM[0].score_range_from}
                      </Text>
                    </View>
                    <Slider
                      style={{ height: 40, flex: 5 }}
                      minimumValue={data.RM[0].score_range_from}
                      maximumValue={data.RM[0].score_range_to}
                      minimumTrackTintColor={PRIMARY_BLUE_COLOR}
                      maximumTrackTintColor="#000000"
                      value={data.RM[0].score_range}
                      thumbTintColor={PRIMARY_BLUE_COLOR}
                      disabled
                      step={1}
                    />
                    <View style={{ flex: 0.5 }}>
                      <Text
                        style={{
                          color: PRIMARY_BLUE_COLOR,
                          fontFamily: FONT_FAMILY_SEMI_BOLD,
                        }}
                      >
                        {data.RM[0].score_range_to}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}
              <View style={{ marginVertical: 10 }}>
                <Text style={styles.txt}>Remarks</Text>
                <Text style={styles.b_txt}>{data.RM[0].remark}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

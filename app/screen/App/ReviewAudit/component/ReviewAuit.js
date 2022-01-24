import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking, Pressable } from "react-native";
import Header from "../../../../component/Header";
import { styles } from "./styles";
import DropDown from "../../../../component/DropDown";
import Button from "../../../../component/Button";
import { useNavigation } from "@react-navigation/core";
import {
  FONT_FAMILY_REGULAR,
  GREY_TEXT_COLOR,
  DOWNARROW,
  FONT_FAMILY_SEMI_BOLD,
  PRIMARY_BLUE_COLOR,
} from "../../../../utils/constant";
import { ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../../../../utils/UserContext";
export default function ReviewAuit(props) {
  const {
    handleSubmitReport,
    BM,
    RM,
    bmDropDown,
    setbmDropDown,
    rmDropDown,
    setrmDropDown,
    baseURL,
    params,
  } = props;
  const [userData, setUserData] = useContext(UserContext);
  const navigation = useNavigation();
  const handleBMDropDown = () => {
    setbmDropDown(!bmDropDown);
  };
  const handleRMDropDown = () => {
    setrmDropDown(!rmDropDown);
  };
  const handleReport=async()=>{
    await Linking.openURL(props.repo?.reporturl);
  }
  return (
    <View style={styles.container}>
      <ScrollView style={{ flexGrow: 1 }}>
        <Header
          headerText={"Audit Actionable Review"}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <View style={styles.main}>
          <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center"}}>
          <Text style={styles.h_txt}>Audits Actions By :</Text>
          <Pressable onPress={()=>handleReport()}><Text style={styles.download_text}>Download Report</Text></Pressable>
          </View>
          {BM ? (
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => handleBMDropDown()}
                style={{
                  backgroundColor: GREY_TEXT_COLOR,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 5,
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}
              >
                <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>
                  {/* {params.branch_manager} */}
                  BM
                </Text>
                {bmDropDown ? (
                  <Image
                    source={DOWNARROW}
                    style={{ transform: [{ rotateZ: "180deg" }] }}
                  />
                ) : (
                  <Image source={DOWNARROW} />
                )}
              </TouchableOpacity>
              {bmDropDown && (
                <View>
                  {BM.map((bm, index) => (
                    <TouchableOpacity
                    style={[styles.drop_down_item,{backgroundColor:bm.actiondone==1?PRIMARY_BLUE_COLOR:"#fff"}]}
                      key={index}
                      onPress={() => props.HandleBM(bm.actionable,bm.question_id,bm.audit_id)}
                    >{console.log("BM=>",bm)}
                      <Text style={[styles.drop_down_txt,{color:bm.actiondone==1?"#fff":PRIMARY_BLUE_COLOR}]}>
                        {bm.audit_question.substring(0, 200)}
                      </Text>
                      {bm?.actionable[0]?.actionable_remark ? (
                        <Text style={{color:bm.actiondone==1?"#fff":PRIMARY_BLUE_COLOR}}>
                          Remark:{" "}
                          {bm?.actionable[0]?.actionable_remark.substring(0, 100)}
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ) : null}
          {RM ? (
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => handleRMDropDown()}
                style={{
                  backgroundColor: GREY_TEXT_COLOR,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 5,
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}
              >
                <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>
                  {/* {userData.name} */}
                  RMM
                </Text>
                {rmDropDown ? (
                  <Image
                    source={DOWNARROW}
                    style={{ transform: [{ rotateZ: "180deg" }] }}
                  />
                ) : (
                  <Image source={DOWNARROW} />
                )}
              </TouchableOpacity>
              {rmDropDown && (
                <View>
                  {RM.map((rm, index) => (
                    <TouchableOpacity
                    key={index}
                    style={[styles.drop_down_item,{backgroundColor:rm.actiondone==1?PRIMARY_BLUE_COLOR:"#fff"}]}
                      onPress={() => props.HandleRMM(rm,rm.question_id,rm.audit_id)}
                    >{console.log("Rm=>",rm)}
                      <Text style={[styles.drop_down_txt,{color:rm.actiondone==1?"#fff":PRIMARY_BLUE_COLOR}]}>
                        {rm.audit_question.substring(0, 200)}
                      </Text>
                      {
                        rm.remark!=='undefined'&&rm.remark!==''?
                        <Text style={{color:rm.actiondone==1?"#fff":PRIMARY_BLUE_COLOR}}>Remark: {rm.remark}</Text>:null
                      }
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View
        style={{
          paddingBottom:5,
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          width: "100%",
          backgroundColor:"#fff"
        }}
      >
        {
          props.repo?.reportbutn==1?
          <>
          <Text style={{marginBottom:10,alignSelf:"center",fontFamily:FONT_FAMILY_SEMI_BOLD,color:"gray"}}>Actionable Completed</Text>
        <Button
          buttonText={"Complete Audit"}
          onPress={() => handleSubmitReport()}
        />
        </>:
        <>
        <Text style={{marginBottom:10,alignSelf:"center",fontFamily:FONT_FAMILY_SEMI_BOLD,color:"gray"}}>Actionable Not Completed</Text>
        <Button
          buttonText={"Complete Audit"}
          onPress={() => {
            navigation.navigate("DashboardScreen")
          }}
        /></>
        }
      </View>
    </View>
  );
}

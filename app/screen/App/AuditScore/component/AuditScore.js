import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { styles } from "./styles";
import Button from "../../../../component/Button";
import moment from "moment";
import { FONT_FAMILY_REGULAR } from "../../../../utils/constant";

export default function AuditScore(props) {
  console.log("🚀 ~ file: AuditScore.js:9 ~ AuditScore ~ props:", props)
  const { handleViewActionable, totalScore,startvideo } = props;
  return (
    // <View style={styles.container}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, marginLeft: 10 }}>
      <View style={styles.main}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heroic_txt}>Audit Questions Completed</Text>
         {/*  <Text style={styles.heroic_txt}>Merchandising Audit Score</Text>
          <View style={styles.score_board}>
            <Text style={styles.hsn_txt}>{totalScore?.score}</Text>
            <Text style={styles.hs_txt}>Audit Score</Text>
          </View> */}
        </View>
        {totalScore?.previous[0].previous_score > 0 && (
          <View style={styles.prev_audit}>
            <Text style={styles.txt}>Previous Audit Score :</Text>
            <FlatList
              data={totalScore?.previous}
              renderItem={displayScoreAudit}
            />
          </View>
        )}
        
        {props.type == 1 ? (
          <Text style={{ fontFamily: FONT_FAMILY_REGULAR, padding: 15 }}>
            Note: Live streaming will be stopped after click on generate report.
          </Text>
        ) : null
        //  ( <Text style={{ fontFamily: FONT_FAMILY_REGULAR, padding: 15 }}>
        //   Note: Make a video of max 30-45 secs showcasing the branch from outside and covering the marketing collaterals displayed.
        // </Text>)
        }
        {/* {props.type == 1 ? ( */}
           <Button
            buttonText={"Generate Report"}
            onPress={() => handleViewActionable()}/> 
          {/* ): ( <Button
            buttonText={"Start your Video Capture"}
            onPress={() => startvideo()}
          />)} */}
          
         
      </View>
    </ScrollView>
    // </View>
  );
}
const displayScoreAudit = ({ item }) => {
  console.log("item?.previous_score_date", item);
  const orderDate = moment(item?.previous_score_date, "DD-MM-YYYY").format(
    "DD/MM/YYYY"
  );
  return (
    <View style={styles.display_score}>
      <Text style={styles.s_txt}>Score tt : {item.previous_score}%</Text>
      <Text style={styles.txt}>{orderDate}</Text>
    </View>
  );
};

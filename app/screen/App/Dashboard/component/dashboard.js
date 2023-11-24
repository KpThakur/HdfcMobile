import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform } from "react-native";
import Header from "../../../../component/Header";
import Input from "../../../../component/Input";
import { styles } from "./style";
import { normalize } from "../../../../utils/scaleFontSize";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  GREY_TEXT_COLOR,
  PRIMARY_BLUE_COLOR,
} from "../../../../utils/constant";
const DashboardView = (props) => {
  const navigation = useNavigation();
  const OnpressDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
    // navigation.openDrawer()
  };
  const renderAuditOption = () => {
    return (
      <View style={styles.nav}>
        <FlatList
          data={props.option}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
              key={item.id}
                onPress={() => props.onPressSelectedTab(item.id)}
              >
                <View
                  style={{
                    flex: 1,
                    padding: 8,
                    borderBottomColor:
                      item.id == props.tabBar ? PRIMARY_BLUE_COLOR : "gray",
                    borderBottomWidth: item.id == props.tabBar ? 2 : 0,
                    borderRadius: 5,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: normalize(12),
                      color:
                        item.id == props.tabBar ? PRIMARY_BLUE_COLOR : "gray",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        headerText={"Merchandising Audit"}
        onPress={() => OnpressDrawer()}
      />
      <View style={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              shadowColor: Platform.OS == "ios" ? "#fff" : "#000",
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                marginTop: 10,
              }}
            >
              <Input
                placeholder={"Search"}
                containerStyle={{ backgroundColor: GREY_TEXT_COLOR }}
                placeholderTextColor={{ color: "black" }}
                value={props.search}
                InputHeading={"Search"}
                onChangeText={(text) => props.HandleSearch(text)}
              />
            </View>
            <View>{renderAuditOption()}</View>
            <FlatList
              data={props.auditList}
              refreshing={props.onRefresh}
              onRefresh={() => props.onRefreshAuditList()}
              ListEmptyComponent={props.renderEmptyComponent()}
              showsVerticalScrollIndicator={false}
              renderItem={(item, index) => props.renderAudit(item, index)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default DashboardView;

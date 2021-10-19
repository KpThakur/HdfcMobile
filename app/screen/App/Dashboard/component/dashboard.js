import React, { useState } from 'react';
import { View, Image, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../../../component/Header';
import Input from '../../../../component/Input';
import Styles from './style';
const DashboardView = (props) => {
    const [searchvalue, setSearchvalue] = useState();
    const [data, setdata] = useState([
        {
            "id": 1,
            "name": "Today's Audit",
        },
    ])
    return (
        <View style={{ flex: 1 }}>
            <Header headerText={"Merchandising Audit"} />
            <ScrollView>
                <View style={{ flex: 5 }}>
                    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                        <View style={{
                            flex: 1,
                            shadowColor: "#000",
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,
                            elevation: 24,
                        }}>
                            <View style={{ flexDirection: "row", paddingLeft: 7, paddingRight: 10 }}>
                                <Input
                                    placeholder={"Search"}
                                    containerStyle={{ backgroundColor: "#f0f0f0" }}
                                    placeholderTextColor={{ color: "#5d5d5d" }}
                                    value={""}
                                    InputHeading={"Search"}
                                />
                            </View>
                            <FlatList
                                data={data}
                                ListHeaderComponent={() => {
                                    return (
                                        <View>
                                            <FlatList
                                                data={props.option}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity
                                                            style={{
                                                            }}
                                                            onPress={() => props.onPressSelectedTab(index)}
                                                        >
                                                            <View style={{
                                                                flex: 1, padding: 8,
                                                                borderBottomColor: index == props.tabBar ? '#1b7dec' : null,
                                                                borderBottomWidth: index == props.tabBar ? 2 : 0, borderRadius: 5, marginLeft: 5, marginRight: 5
                                                            }}>
                                                                <Text style={{ fontSize: 13 }}>{item.name}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                                }
                                            />
                                        </View>
                                    )
                                }}
                                showsVerticalScrollIndicator={false}
                                renderItem={(item, index) => props.renderTodayAudit(item, index)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default DashboardView;

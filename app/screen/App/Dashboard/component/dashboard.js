import React, { useState } from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../../component/Header';
import Input from '../../../../component/Input';
const DashboardView = () => {
    const [searchvalue,setSearchvalue] = useState();
    const [option, setOption] = useState([
        {
            "id": 1,
            "name": "today's Audit",
        },
        {
            "id": 2,
            "name": "Upcoming Audit",
        },
        {
            "id": 3,
            "name": "Open Audit",
        },
        {
            "id": 4,
            "name": "Close Audit",
        }
    ])
    const renderTabOption = ({ item }) => {
        return (
            <View style={{ flex: 1, padding: 8 }}>
                {
                    item.id == 1 ? <Text style={{ color: "#1b7dec", borderBottomColor: "#1b7dec", borderBottomWidth: 3 }}>{item.name}</Text> : <Text style={{ color: "#949494" }}>{item.name}</Text>
                }
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Header headerText={"Merchandising Audit"} />
            <View style={{ flex: 5 }}>
                <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Input
                            placeholder={"Search"}
                            containerStyle={{ backgroundColor: "#f0f0f0" }}
                            placeholderTextColor={{ color: "#5d5d5d" }}
                            value={""}
                            InputHeading={"Search"}
                        />
                    </View>
                    <View style={{
                        flex: 1, shadowColor: "#000",
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,
                        elevation: 24,
                    }}>
                        <FlatList
                            data={option}
                            renderItem={(item) => renderTabOption(item)}
                            horizontal
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
                <View style={{ flex: 5, backgroundColor: "#ffffff" }}>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            resizeMode={"contain"}
                            style={{ width: 250, height: 350 }}
                            source={require('../../../../assets/images/Audit.png')}

                        />
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: "#5382b5", fontSize: 20, fontWeight: "bold" }}>Add New Schedule</Text>
                        </View>
                        <Text style={{ color: "#000000", fontSize: 12, textAlign: "center", padding: 5, fontWeight: '700' }}>
                            No Audit for today ,set new Schedule
                           </Text>
                        <Text style={{ color: "#000000", fontSize: 12, textAlign: "center", paddingBottom: 5, fontWeight: "700" }}>
                            for new audit.
                           </Text>
                        <TouchableOpacity
                            style={{ backgroundColor: "#1b7dec", borderRadius: 30 }}
                        >
                            <View style={{ flexDirection: "row", paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10 }}>
                                <Image
                                    style={{ width: 20, height: 30 }}
                                    source={require('../../../../assets/images/add-alt.png')}
                                />
                                <Text style={{ fontWeight: "bold", fontSize: 20, color: "#ffffff", paddingLeft: 5 }}>
                                    Add  Schedule
                             </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default DashboardView;
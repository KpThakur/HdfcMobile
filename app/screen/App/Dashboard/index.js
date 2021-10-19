import React, { useState } from 'react';
import DashboardView from './component/dashboard';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { styles } from './component/style';
const DashboardScreen = () => {
    const [tabBar, setTabBar] = useState(0)
    const [option, setOption] = useState([
        {
            "id": 1,
            "name": "Today's Audit",
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
    const onPressSelectedTab = (index) => {
        tabBar == index ? setTabBar(null) : setTabBar(index)
    }
    const renderTodayAudit = ({ item, index }) => {
        return (
            <View>
                {tabBar === 0 ?
                    <ScrollView>
                        <View style={{ flex: 5, backgroundColor: "#ffffff" }}>
                            <View style={{ alignItems: "center" }}>
                                <Image
                                    resizeMode={"contain"}
                                    style={{ width: 250, height: 350 }}
                                    source={
                                        require('../../../assets/images/Audit.png')
                                    }
                                />
                                <View style={{ padding: 10 }}>
                                    <Text style={{ color: "#5382b5", fontSize: 20, fontWeight: "bold" }}>Add New Schedule</Text>
                                </View>
                                <Text style={{ color: "#000000", fontSize: 12, textAlign: "center", padding: 5, }}>
                                    No Audit for today ,set new Schedule for new audit.
                                </Text>
                                <TouchableOpacity
                                    style={{ backgroundColor: "#1b7dec", borderRadius: 30, marginBottom: 10, marginTop: 10 }}
                                >
                                    <View style={{ flexDirection: "row", paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10 }}>
                                        <Image
                                            style={{ width: 20, height: 30 }}
                                            source={require('../../../assets/images/add-alt.png')}
                                        />
                                        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#ffffff", paddingLeft: 5 }}>
                                            Add  Schedule
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    :
                    null}
                {tabBar === 1 ?
                    <View style={{ paddingLeft: 10, marginRight: 10 }}>
                        <View style={styles.box}>
                            <View style={{ margin: 12, left: 10, top: 4 }}>
                                <Text style={styles.txt}>
                                    September, 21
                                </Text>
                            </View>
                            <View style={styles.box_header}>
                                <Text style={styles.header_txt}>Palaslya Branch</Text>
                                <Text style={styles.header_txt}>Bank</Text>
                            </View>
                            <View style={styles.box_body}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/calendar-date.png')} style={styles.img} />
                                        <Text style={styles.txt}>Date : </Text>
                                        <Text style={styles.p_txt}>07/10/2021</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/clock.png')} style={styles.img} />
                                        <Text style={styles.txt}>Time : </Text>
                                        <Text style={styles.p_txt}>08:12AM</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={styles.s_txt}>Branch Manager Name</Text>
                                    <Text style={styles.txt}>Vishwas Joshi</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: 10 }}>
                                    <View>
                                        <Text style={styles.s_txt}>Actionable No.</Text>
                                        <Text style={styles.txt}>02 Members</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.s_txt}>Audit Status</Text>
                                        <Text style={styles.txt}>Online Audit</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={styles.s_txt}>City</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.txt}>Indore</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                            <TouchableOpacity style={styles.cancel_btn}>
                                                <Text style={{ color: "#fff" }}>Cancel Audit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.prim_btn}>
                                                <Text style={{ color: "#fff" }}>Start Audit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <View style={{ margin: 12, left: 10, top: 4 }}>
                                <Text style={styles.txt}>
                                    June, 24
                                </Text>
                            </View>
                            <View style={styles.box_header}>
                                <Text style={styles.header_txt}>Palaslya Branch</Text>
                                <Text style={styles.header_txt}>Bank</Text>
                            </View>
                            <View style={styles.box_body}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/calendar-date.png')} style={styles.img} />
                                        <Text style={styles.txt}>Date : </Text>
                                        <Text style={styles.p_txt}>07/10/2021</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/clock.png')} style={styles.img} />
                                        <Text style={styles.txt}>Time : </Text>
                                        <Text style={styles.p_txt}>08:12AM</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={styles.s_txt}>Branch Manager Name</Text>
                                    <Text style={styles.txt}>Vishwas Joshi</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: 10 }}>
                                    <View>
                                        <Text style={styles.s_txt}>Actionable No.</Text>
                                        <Text style={styles.txt}>02 Members</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.s_txt}>Audit Status</Text>
                                        <Text style={styles.txt}>Online Audit</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={styles.s_txt}>City</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.txt}>Indore</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                            <TouchableOpacity style={styles.cancel_btn}>
                                                <Text style={{ color: "#fff" }}>Cancel Audit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.prim_btn}>
                                                <Text style={{ color: "#fff" }}>Start Audit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }
                {tabBar === 2 ?
                    <View style={{ paddingLeft: 10, marginRight: 10 }}>
                        <View style={styles.box}>
                            <View style={{ margin: 12, left: 10, top: 4 }}>
                                <Text style={styles.txt}>
                                    June, 24
                                </Text>
                            </View>
                            <View style={styles.box_header}>
                                <Text style={styles.header_txt}>Palaslya Branch</Text>
                                <Text style={styles.header_txt}>Bank</Text>
                            </View>
                            <View style={styles.box_body}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/calendar-date.png')} style={styles.img} />
                                        <Text style={styles.txt}>Date : </Text>
                                        <Text style={styles.p_txt}>07/10/2021</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/clock.png')} style={styles.img} />
                                        <Text style={styles.txt}>Time : </Text>
                                        <Text style={styles.p_txt}>08:12AM</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={styles.s_txt}>Branch Manager Name</Text>
                                    <Text style={styles.txt}>Vishwas Joshi</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: 10 }}>
                                    <View>
                                        <Text style={styles.s_txt}>Actionable No.</Text>
                                        <Text style={styles.txt}>02 Members</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.s_txt}>Audit Status</Text>
                                        <Text style={styles.txt}>Online Audit</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={styles.s_txt}>City</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.txt}>Indore</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                            <TouchableOpacity style={styles.cancel_btn}>
                                                <Text style={{ color: "#fff" }}>Cancel Audit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.prim_btn}>
                                                <Text style={{ color: "#fff" }}>Start Audit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <View style={{ margin: 12, left: 10, top: 4 }}>
                                <Text style={styles.txt}>
                                    June, 24
                                </Text>
                            </View>
                            <View style={styles.box_header}>
                                <Text style={styles.header_txt}>Palaslya Branch</Text>
                                <Text style={styles.header_txt}>Bank</Text>
                            </View>
                            <View style={styles.box_body}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/calendar-date.png')} style={styles.img} />
                                        <Text style={styles.txt}>Date : </Text>
                                        <Text style={styles.p_txt}>07/10/2021</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/clock.png')} style={styles.img} />
                                        <Text style={styles.txt}>Time : </Text>
                                        <Text style={styles.p_txt}>08:12AM</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={styles.s_txt}>Branch Manager Name</Text>
                                    <Text style={styles.txt}>Vishwas Joshi</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: 10 }}>
                                    <View>
                                        <Text style={styles.s_txt}>Actionable No.</Text>
                                        <Text style={styles.txt}>02 Members</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.s_txt}>Audit Status</Text>
                                        <Text style={styles.txt}>Online Audit</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={styles.s_txt}>City</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.txt}>Indore</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                            <TouchableOpacity style={styles.cancel_btn}>
                                                <Text style={{ color: "#fff" }}>Cancel Audit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.prim_btn}>
                                                <Text style={{ color: "#fff" }}>Start Audit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }
                {tabBar === 3 ?
                    <View style={styles.box}>
                        <View style={{ margin: 12, left: 10, top: 4 }}>
                            <Text style={styles.txt}>
                                June, 24
                            </Text>
                        </View>
                        <View style={styles.box_header}>
                            <Text style={styles.header_txt}>Palaslya Branch</Text>
                            <Text style={styles.header_txt}>Bank</Text>
                        </View>
                        <View style={styles.box_body}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/images/calendar-date.png')} style={styles.img} />
                                    <Text style={styles.txt}>Date : </Text>
                                    <Text style={styles.p_txt}>07/10/2021</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/images/clock.png')} style={styles.img} />
                                    <Text style={styles.txt}>Time : </Text>
                                    <Text style={styles.p_txt}>08:12AM</Text>
                                </View>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.s_txt}>Branch Manager Name</Text>
                                <Text style={styles.txt}>Vishwas Joshi</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: 10 }}>
                                <View>
                                    <Text style={styles.s_txt}>Actionable No.</Text>
                                    <Text style={styles.txt}>02 Members</Text>
                                </View>
                                <View>
                                    <Text style={styles.s_txt}>Audit Status</Text>
                                    <Text style={styles.txt}>Online Audit</Text>
                                </View>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.s_txt}>City</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.txt}>Indore</Text>
                                    {/* <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                        <TouchableOpacity style={styles.cancel_btn}>
                                            <Text style={{ color: "#fff" }}>Cancel Audit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.prim_btn}>
                                            <Text style={{ color: "#fff" }}>Start Audit</Text>
                                        </TouchableOpacity>
                                    </View> */}
                                </View>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: 'green'
                                    }}>
                                        Complete
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }
            </View >
        )
    }

    return (
        <DashboardView
            option={option}
            tabBar={tabBar}
            onPressSelectedTab={onPressSelectedTab}
            renderTodayAudit={renderTodayAudit}
        />
    )
}
export default DashboardScreen;

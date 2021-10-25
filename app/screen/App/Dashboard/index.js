import React, { useState, useEffect } from 'react';
import DashboardView from './component/dashboard';
import { Text, TouchableOpacity, View, Modal, Image, ScrollView, TextInput } from 'react-native'
import { styles } from './component/style';
import { CALENDAR, CLOCK, PRIMARY_BLUE_COLOR, DASHBOARD_HEROIC, CANCEL_ICON, CROSS, GREY_TEXT_COLOR, GREEN_COLOR, RED_COLOR, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMI_BOLD, TINY_FONT_SIZE } from '../../../utils/constant'
import Button from '../../../component/Button';
import Cancel from '../../../component/Cancel'
import { normalize } from '../../../utils/scaleFontSize';
import { apiCall } from '../../../utils/httpClient';
import apiEndPoints from '../../../utils/apiEndPoints';
import moment from 'moment';
const DashboardScreen = ({ navigation }) => {
    const [tabBar, setTabBar] = useState(1)
    const [popup, setpopup] = useState(false)
    const [search, setsearch] = useState()
    const [auditList, setauditList] = useState([])
    const togglePopUp = () => {
        setpopup(!popup)
    }
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
        setTabBar(index)
        AuditList(index)
    }
    const handleAddNewAudit = () => {
        navigation.navigate("ScheduleNewAuditScreen")
    }
    const AuditList = async (index) => {
        try {
            const params = { audit_type: index }
            console.log("PARAMS", params)
            const response = await apiCall('POST', apiEndPoints.GET_AUDIT_LIST, params)
            console.log("response", response.data.data)
            if (response.status = 200) {
                console.log("succuccess")
                setauditList(response.data.data);
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
     AuditList(1)
    }, [])

    console.log("tabBar",tabBar)
    useEffect(() => {
        AuditList(tabBar)
       }, [tabBar])
    console.log("API CALL", auditList)
    const renderTodayAudit = ({ item, index }) => {
        return (
            <View style={{ backgroundColor: "#fff" }}>
                {tabBar === 1 ?
                    auditList ?
                        auditList.map(audit => (
                            <View style={{ marginHorizontal: 10 }} key={audit.city_id}>
                                <View style={styles.box}>
                                    <View style={styles.box_header}>
                                        <Text style={styles.header_txt}>{audit.branch_name}</Text>
                                        <Text style={styles.header_txt}>Bank</Text>
                                    </View>
                                    <View style={styles.box_body}>
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={CALENDAR} style={styles.img} />
                                                <Text style={styles.txt}>Date : </Text>
                                                <Text style={styles.p_txt}>{moment(audit.audit_date, "DD-MM-YYYY").format('DD/MM/YYYY , ddd')}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={CLOCK} style={styles.img} />
                                                <Text style={styles.txt}>Time : </Text>
                                                <Text style={styles.p_txt}>{moment(audit.audit_time, "HH-MM").format('h:mm A')}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: 10 }}>
                                            <Text style={styles.s_txt}>Branch Manager Name</Text>
                                            <Text style={styles.txt}>{audit.branch_manager}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: 10 }}>
                                            <View>
                                                <Text style={styles.s_txt}>Actionable No.</Text>
                                                <Text style={styles.txt}>02 Members</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.s_txt}>Audit Status</Text>
                                                <Text style={styles.txt}>{
                                                    audit.audit_type === 1 ?
                                                        'Online Audit' : 'On-Site Audit'}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: 10 }}>
                                            <Text style={styles.s_txt}>City</Text>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <Text style={styles.txt}>{audit.city_name}</Text>
                                                <View style={{ flexDirection: "row", justifyContent: "flex-end", justifyContent: "center" }}>
                                                    <TouchableOpacity style={styles.cancel_btn} onPress={() => togglePopUp()}>
                                                        <Text style={{ color: "#fff", fontSize: normalize(TINY_FONT_SIZE), fontFamily: FONT_FAMILY_SEMI_BOLD }}>Cancel Audit</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.prim_btn} onPress={() => { navigation.navigate("AuditWelcomeScreen") }}>
                                                        <Text style={{ color: "#fff", fontSize: normalize(TINY_FONT_SIZE), fontFamily: FONT_FAMILY_SEMI_BOLD }}>Reschedule</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))
                        :
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ flex: 5, backgroundColor: "#ffffff" }}>
                                <View style={{ alignItems: "center" }}>
                                    <Image
                                        resizeMode={"contain"}
                                        style={{ width: 250, height: 350 }}
                                        source={DASHBOARD_HEROIC}
                                    />
                                    <View style={{ padding: 10 }}>
                                        <Text style={{ color: "#5382b5", fontSize: 20, fontWeight: "bold" }}>Add New Schedule</Text>
                                    </View>
                                    <Text style={{ color: "#000000", fontSize: 12, textAlign: "center", padding: 5, }}>
                                        No Audit for today ,set new Schedule for new audit.
                                    </Text>
                                    <TouchableOpacity
                                        style={{ backgroundColor: "#1b7dec", borderRadius: 30, marginBottom: 10, marginTop: 10 }}
                                        onPress={() => handleAddNewAudit()}
                                    >
                                        <View style={{ flexDirection: "row", paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10 }}>
                                            <Image
                                                style={{ width: 30, height: 30, tintColor: "#fff", marginRight: 5, resizeMode: "contain" }}
                                                source={CROSS}
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
                {tabBar === 2 ?
                    <View style={{ paddingLeft: 10, marginRight: 10 }}>
                        <Cancel popup={popup} togglePopUp={togglePopUp} />
                        <View style={styles.display_audit}>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={styles.txt}>
                                    September, 21
                                </Text>
                            </View>
                            <View style={styles.box}>
                                <View style={styles.box_header}>
                                    <Text style={styles.header_txt}>Palaslya Branch</Text>
                                    <Text style={styles.header_txt}>Bank</Text>
                                </View>
                                <View style={styles.box_body}>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={CALENDAR} style={styles.img} />
                                            <Text style={styles.txt}>Date : </Text>
                                            <Text style={styles.p_txt}>07/10/2021</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={CLOCK} style={styles.img} />
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
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Text style={styles.txt}>Indore</Text>
                                            <View style={{ flexDirection: "row", justifyContent: "flex-end", justifyContent: "center" }}>
                                                <TouchableOpacity style={styles.cancel_btn} onPress={() => togglePopUp()}>
                                                    <Text style={{ color: "#fff", fontSize: normalize(TINY_FONT_SIZE), fontFamily: FONT_FAMILY_SEMI_BOLD }}>Cancel Audit</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.prim_btn} onPress={() => { navigation.navigate("AuditWelcomeScreen") }}>
                                                    <Text style={{ color: "#fff", fontSize: normalize(TINY_FONT_SIZE), fontFamily: FONT_FAMILY_SEMI_BOLD }}>Reschedule</Text>
                                                </TouchableOpacity>
                                            </View>
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
                    <View style={{ paddingLeft: 10, marginRight: 10 }}>
                        <View style={styles.display_audit}>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={styles.txt}>
                                    September, 21
                                </Text>
                            </View>
                            <View style={styles.box}>
                                <View style={styles.box_header}>
                                    <Text style={styles.header_txt}>Palaslya Branch</Text>
                                    <Text style={styles.header_txt}>Bank</Text>
                                </View>
                                <View style={styles.box_body}>
                                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={CALENDAR} style={styles.img} />
                                            <Text style={styles.txt}>Date : </Text>
                                            <Text style={styles.p_txt}>07/10/2021</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={CLOCK} style={styles.img} />
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
                                                <TouchableOpacity style={styles.prim_btn} onPress={() => { navigation.navigate("AuditWelcomeScreen") }}>
                                                    <Text style={{ color: "#fff", fontSize: normalize(TINY_FONT_SIZE), fontFamily: FONT_FAMILY_SEMI_BOLD }}>Update</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }
                {tabBar === 4 ?
                    <View style={{ paddingLeft: 10, marginRight: 10 }}>
                    <View style={styles.display_audit}>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.txt}>
                                September, 21
                            </Text>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.box_header}>
                                <Text style={styles.header_txt}>Palaslya Branch</Text>
                                <Text style={styles.header_txt}>Bank</Text>
                            </View>
                            <View style={styles.box_body}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={CALENDAR} style={styles.img} />
                                        <Text style={styles.txt}>Date : </Text>
                                        <Text style={styles.p_txt}>07/10/2021</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={CLOCK} style={styles.img} />
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
                                            <Text style={{ color: GREEN_COLOR, fontFamily: FONT_FAMILY_REGULAR }}>Completed</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.box}>
                            <View style={styles.box_header}>
                                <Text style={styles.header_txt}>Palaslya Branch</Text>
                                <Text style={styles.header_txt}>Bank</Text>
                            </View>
                            <View style={styles.box_body}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={CALENDAR} style={styles.img} />
                                        <Text style={styles.txt}>Date : </Text>
                                        <Text style={styles.p_txt}>07/10/2021</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={CLOCK} style={styles.img} />
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
                                            <Text style={{ color: RED_COLOR, fontFamily: FONT_FAMILY_REGULAR }}>Cancelled</Text>
                                        </View>
                                    </View>
                                </View>
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
            search={search} setsearch={setsearch}
        />
    )
}
export default DashboardScreen;

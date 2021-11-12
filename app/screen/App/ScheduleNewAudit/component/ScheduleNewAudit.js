import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { styles } from './styles'
import DropDown from '../../../../component/DropDown'
import DatePicker from 'react-native-date-picker'
import Button from '../../../../component/Button'
import { PRIMARY_BLUE_COLOR, CHECKED_ICON, UNCHECKED_ICON, ARROW, CALENDAR, CLOCK, GREY_TEXT_COLOR, FONT_FAMILY_REGULAR, DOWNARROW } from '../../../../utils/constant'
import Header from '../../../../component/Header'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { FlatList } from 'react-native-gesture-handler'
let ACDATE
let timeData = []
export default function ScheduleNewAudit(props) {
    const [Cdate, setCdate] = useState(new Date())
    const [openDate, setopenDate] = useState(false)
    const [openTime, setopenTime] = useState(false)
    const [dropDown, setdropDown] = useState(false)
    function _handleSelect(params) {
        setauditType(params)
    }
    const { handleSchedule, cityBranch, cityName, isLoading, citydropDown, setcitydropDown,
        handleSelectCity, branchDetail, branchName, setbranchNameDropDown, branchNameDropDown, handleSelectBranch,
        branchManagerName, auditType, setauditType, date, time, setdate, settime, handleSumbit } = props
    const displayCityDropDown = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleSelectCity(item.city_name, item.city_id)} style={styles.drop_down_item}>
                <Text style={styles.txt}>{item.city_name}</Text>
            </TouchableOpacity>
        )
    }
    const displaybranchDropDown = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleSelectBranch(item.branch_name, item.branch_id)} style={styles.drop_down_item}>
                <Text style={styles.txt}>{item.branch_name}</Text>
            </TouchableOpacity>
        )
    }
    const handleDropDown = () => {
        setdropDown(!dropDown)
    }
    for (var i = 10; i <= 18; i++) {
        for (var j = 0; j <= 55; j += 15) {
            if(j==0)
                timeData.push(i + "-0" + j)
            else
                timeData.push(i + "-" + j)
        }
    }
    timeData.push("19-00")
    console.log(timeData)
    const navigation = useNavigation()
    return (
        <>
            {
                isLoading ? (<Text> Loading...</Text >) :
                    (
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={styles.contianer}>
                                <Header headerText={"Schedule New Audit"} leftImg={ARROW} onPress={() => { navigation.goBack() }} />
                                <View style={{
                                    padding: 20, padding: 20,
                                    justifyContent: "space-evenly"
                                }}>
                                    <View>
                                        <Text style={styles.txt_head}>Bank Details for Audit</Text>
                                        <DropDown title={cityName ? cityName : "City"} data={cityBranch}
                                            renderItem={displayCityDropDown} dropDown={citydropDown} data_name={'city_name'}
                                            setdropDown={setcitydropDown}
                                        />
                                        <DropDown title={branchName ? branchName : "Branch Name / ATM Name"} data={branchDetail}
                                            renderItem={displaybranchDropDown} dropDown={branchNameDropDown} data_name={'brach_name'}
                                            setdropDown={setbranchNameDropDown}
                                        />
                                        <Text
                                            style={{
                                                backgroundColor: GREY_TEXT_COLOR, borderRadius: 5,
                                                paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10
                                            }}
                                        >{branchManagerName ? branchManagerName : 'Branch Manager Name / ATM Code'}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.txt_head}>Schedule on:</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View>
                                                <TouchableOpacity style={styles.date_time} onPress={() => { setopenDate(true) }}>
                                                    <Image source={CALENDAR} style={{ marginRight: 10 }} />
                                                    {date ? <Text>{date}</Text> : <Text>Date</Text>}
                                                </TouchableOpacity>
                                                <DatePicker modal open={openDate} mode="date" date={Cdate}
                                                    onConfirm={(date) => {
                                                        if (moment(date).format('DD-MM-YYYY') < moment(moment()).format('DD-MM-YYYY')) {
                                                            Alert.alert('date', "You can't select previous date")
                                                        }
                                                        else {
                                                            setopenDate(!openDate)
                                                            ACDATE = moment(date).format('DD-MM-YYYY')
                                                            setdate(moment(date).format('DD-MM-YYYY'))
                                                        }

                                                    }}
                                                    onCancel={() => {
                                                        setopenDate(false)
                                                    }} />
                                            </View>

                                            <View style={{ position: "absolute", right: 1 ,zIndex:999}}>
                                                <TouchableOpacity onPress={() => handleDropDown()} style={{
                                                    backgroundColor: GREY_TEXT_COLOR, flexDirection: 'row', alignItems: 'center', borderRadius: 5,
                                                    justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10
                                                }} >
                                                    <Image source={CLOCK}/>
                                                    <Text style={{marginHorizontal:10}}>{time ? time : "Time"}</Text>
                                                    {
                                                        dropDown ? <Image source={DOWNARROW} style={{ transform: [{ rotateZ: "180deg" }] }} /> :
                                                            <Image source={DOWNARROW} />
                                                    }
                                                </TouchableOpacity>
                                                {
                                                    dropDown &&
                                                    <View style={{ backgroundColor: GREY_TEXT_COLOR, height: 200 }}>
                                                        <FlatList
                                                            data={timeData}
                                                            renderItem={({ item }) => {
                                                                return (
                                                                    <TouchableOpacity style={styles.drop_down_item} onPress={()=>{
                                                                        settime(item)
                                                                        setdropDown(false)}}>
                                                                        <Text style={styles.drop_down_txt}>{item}</Text>
                                                                    </TouchableOpacity>
                                                                )
                                                            }} />
                                                    </View>
                                                }
                                                {/* <DatePicker modal open={openTime} mode="time" date={new Date()}
                                                    minuteInterval={15}
                                                    onConfirm={(date) => {
                                                        // console.log(moment(date,'H:mm'),"DATE")
                                                        // console.log(moment(date).format('H:mm') <= '19:00' && moment(date).format('H:mm') >= '09:00')
                                                        // console.log((moment(date).format('H:mm')>=moment(new Date()).format('H:mm')))
                                                        console.log(ACDATE);
                                                        console.log(moment(new Date()).format('DD-MM-YYYY'));
                                                        console.log(ACDATE !== moment(new Date()).format('DD-MM-YYYY'))
                                                        if (moment(date).format('H:mm') <= '19:00' && moment(date).format('H:mm') >= '09:00') {
                                                            setopenTime(!openTime)
                                                            
                                                            if (ACDATE !== moment(new Date()).format('DD-MM-YYYY')) {
                                                                if (moment(date.getTime()).format('H-mm') === moment(new Date().getTime()).format('H-mm'))
                                                                    settime(moment(date.getTime()).format("H-00"))
                                                                else
                                                                    settime(moment(date).format('H-mm'))
                                                            } else {
                                                                if ((moment(date).format('H:mm') >= moment(new Date()).format('H:mm'))) {
                                                                    if (moment(date.getTime()).format('H-mm') === moment(new Date().getTime()).format('H-mm'))
                                                                        settime(moment(date.getTime()).format("H-00"))
                                                                    else
                                                                        settime(moment(date).format('H-mm'))
                                                                }
                                                                else {
                                                                    Alert.alert('Time', 'Please Select Proper Time')
                                                                }
                                                            }

                                                        } else {
                                                            setopenTime(!openTime)
                                                            Alert.alert('Time', 'Please Select Time Between 9:00 AM to 7:00 PM')
                                                        }
                                                    }}
                                                    onCancel={() => {
                                                        setopenTime(false)
                                                    }} /> */}
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={styles.txt_head}>Audit Type:</Text>
                                        <TouchableOpacity style={{ marginVertical: 10, flexDirection: "row", alignItems: 'center' }} onPress={() => _handleSelect(2)}>
                                            <Image source={auditType === 2 ? CHECKED_ICON : UNCHECKED_ICON} style={{ marginRight: 5 }} />
                                            <Text style={{
                                                color: auditType === 2 ? PRIMARY_BLUE_COLOR :
                                                    "gray"
                                            }}>On-Site Audit</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ marginVertical: 10, flexDirection: "row", alignItems: 'center' }} onPress={() => _handleSelect(1)}>
                                            <Image source={auditType === 1 ? CHECKED_ICON : UNCHECKED_ICON} style={{ marginRight: 5 }} />
                                            <Text style={{
                                                color: auditType === 1 ? PRIMARY_BLUE_COLOR :
                                                    "gray"
                                            }}>Online Audit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
                                    <Button title="Schedule" onPress={() => handleSumbit()} />
                                </View >
                            </View >
                        </ScrollView>
                    )
            }
        </>
    )
}

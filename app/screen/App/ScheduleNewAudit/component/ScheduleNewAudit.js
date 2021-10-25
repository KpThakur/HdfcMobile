import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import DropDown from '../../../../component/DropDown'
import DatePicker from 'react-native-date-picker'
import Button from '../../../../component/Button'
import { PRIMARY_BLUE_COLOR, CHECKED_ICON, UNCHECKED_ICON, ARROW, CALENDAR, CLOCK, GREY_TEXT_COLOR } from '../../../../utils/constant'
import Header from '../../../../component/Header'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
export default function ScheduleNewAudit(props) {
    const [Cdate, setCdate] = useState(new Date())
    const [openDate, setopenDate] = useState(false)
    const [openTime, setopenTime] = useState(false)
    function _handleSelect(params) {
        setauditType(params)
    }
    const { handleSchedule, cityBranch, cityName, isLoading,citydropDown,setcitydropDown,
        handleSelectCity,branchDetail,branchName,setbranchNameDropDown,branchNameDropDown,handleSelectBranch,
        branchManagerName,auditType,setauditType,date,time,setdate,settime,handleSumbit } = props
    
    const displayCityDropDown = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleSelectCity(item.city_name,item.city_id)} style={styles.drop_down_item}>
                <Text style={styles.txt}>{item.city_name}</Text>
            </TouchableOpacity>
        )
    }
    const displaybranchDropDown = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleSelectBranch(item.branch_name,item.branch_id)} style={styles.drop_down_item}>
                <Text style={styles.txt}>{item.branch_name}</Text>
            </TouchableOpacity>
        )
    }
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
                                            renderItem={displayCityDropDown} dropDown={citydropDown} 
                                            setdropDown={setcitydropDown}/>
                                        
                                        <DropDown title={branchName ? branchName : "Branch Name / ATM Name"} data={branchDetail}
                                            renderItem={displaybranchDropDown} dropDown={branchNameDropDown} 
                                            setdropDown={setbranchNameDropDown} />
                                        <Text 
                                            style={{
                                                backgroundColor: GREY_TEXT_COLOR,borderRadius: 5,
                                                paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10
                                            }} 
                                        >{branchManagerName?branchManagerName:'Branch Manager Name / ATM Code'}</Text>
                                        {/* <DropDown title="Branch Name / ATM Name" data={data} />
                                        <DropDown title="Branch Manager Name / ATM Code" data={data} /> */}
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
                                                        setopenDate(!openDate)
                                                        setdate(moment(date).format('DD-MM-YYYY'))

                                                    }}
                                                    onCancel={() => {
                                                        setopenDate(false)
                                                    }} />
                                            </View>
                                            <View>
                                                <TouchableOpacity style={styles.date_time} onPress={() => { setopenTime(true) }}>
                                                    <Image source={CLOCK} style={{ marginRight: 10 }} />
                                                    {time ? <Text>{time}</Text> : <Text>Date</Text>}
                                                </TouchableOpacity>
                                                <DatePicker modal open={openTime} mode="time" date={Cdate}
                                                    onConfirm={(date) => {
                                                        setopenTime(!openTime)
                                                        settime(moment(date).format('HH-MM'))
                                                    }}
                                                    onCancel={() => {
                                                        setopenTime(false)
                                                    }} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={styles.txt_head}>Audit Type:</Text>
                                        <TouchableOpacity style={{ marginVertical: 10, flexDirection: "row", alignItems: 'center' }} onPress={() => _handleSelect(1)}>
                                            <Image source={auditType === 1 ? CHECKED_ICON : UNCHECKED_ICON} style={{ marginRight: 5 }} />
                                            <Text style={{
                                                color: auditType === 1 ? PRIMARY_BLUE_COLOR :
                                                    "gray"
                                            }}>On-Site Audit</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ marginVertical: 10, flexDirection: "row", alignItems: 'center' }} onPress={() => _handleSelect(2)}>
                                            <Image source={auditType === 2 ? CHECKED_ICON : UNCHECKED_ICON} style={{ marginRight: 5 }} />
                                            <Text style={{
                                                color: auditType === 2 ? PRIMARY_BLUE_COLOR :
                                                    "gray"
                                            }}>Online Audit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
                                    <Button title="Schedule" onPress={()=>handleSumbit()} />
                                </View >
                            </View >
                        </ScrollView>
                    )
            }
        </>
    )
}

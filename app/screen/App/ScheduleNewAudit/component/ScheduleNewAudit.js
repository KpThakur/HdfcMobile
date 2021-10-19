import React, { useState } from 'react'
import { View, Text, Modal, FlatList, Image, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import DropDown from '../../../../component/DropDown'
import DatePicker from 'react-native-date-picker'
import Button from '../../../../component/Button'
import { PRIMARY_BLUE_COLOR } from '../../../../utils/constant'
import Header from '../../../../component/Header'
export default function ScheduleNewAudit() {
    const data = [{ name: "city1" }, { name: "city2" }, { name: "city3" }]
    const [date, setdate] = useState(new Date())
    const [openDate, setOpenDate] = useState(false)
    const [openTime, setOpenTime] = useState(false)

    const [setActive, setsetActive] = useState(1)

    function _handleSelect(params) {
        setsetActive(params)
    }
    return (
        <View style={styles.contianer}>
            <Header headerText={"Add New Schedule"} />
            <View style={{
                padding: 20, padding: 20,
                justifyContent: "space-evenly"
            }}>
                <View>
                    <Text style={styles.txt_head}>Bank Details for Audit</Text>
                    <DropDown title="City" data={data} />
                    <DropDown title="Branch Name / ATM Name" data={data} />
                    <DropDown title="Branch Manager Name / ATM Code" data={data} />
                </View>
                <View>
                    <Text style={styles.txt_head}>Schedule on:</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <TouchableOpacity style={styles.date_time} onPress={() => setOpenDate(true)}>
                                <Image source={require('../../../../assets/images/calendar-date.png')} style={{ marginRight: 10 }} />
                                <Text>Date</Text>
                            </TouchableOpacity>
                            <DatePicker modal open={openDate} mode="date" date={date}
                                onConfirm={(date) => {
                                    setOpenDate(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpenDate(false)
                                }} />
                        </View>
                        <View>
                            <TouchableOpacity style={styles.date_time} onPress={() => setOpenTime(true)}>
                                <Image source={require('../../../../assets/images/clock.png')} style={{ marginRight: 10 }} />
                                <Text>Time</Text>
                            </TouchableOpacity>
                            <DatePicker modal open={openTime} mode="time" date={date}
                                onConfirm={(date) => {
                                    setOpenTime(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpenTime(false)
                                }} />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.txt_head}>Audit Type:</Text>
                    <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => _handleSelect(1)}>
                        <Text style={{
                            color: setActive === 1 ? PRIMARY_BLUE_COLOR :
                                "gray"
                        }}>On-Site Audit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => _handleSelect(2)}>
                        <Text style={{
                            color: setActive === 2 ? PRIMARY_BLUE_COLOR :
                                "gray"
                        }}>Online Audit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
                <Button title="Schedule"
                />
            </View >
        </View >
    )
}
const AuditType = ({ title }) => {
    return (
        <View>

        </View>
    )
}

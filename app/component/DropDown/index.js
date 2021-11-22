import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, ScrollView, Modal, BackHandler, Alert } from 'react-native'
import { FONT_FAMILY_REGULAR, GREY_TEXT_COLOR, DOWNARROW, PRIMARY_BLUE_COLOR } from '../../utils/constant'
import Input from '../../component/Input'
import { ARROW } from '../../utils/constant'
const WindowHeight = Dimensions.get('window').height
export default function index({ data, data_name, title, renderItem, dropDown, setdropDown }) {
    const [search, setsearch] = useState('')
    const [filterData, setfilterData] = useState(null)
    const handleDropDown = () => {
    setdropDown(!dropDown)
}
const handleSearch = (text) => {
    setsearch(text)
    const val = data.filter(city => {
            if(data_name==='city_name')
                return city.city_name.toLowerCase().includes(search.toLowerCase())
            else
                return city.branch_name.toLowerCase().includes(search.toLowerCase())
        })
        setfilterData(val)
    }
    
    return (
        <>
            <TouchableOpacity onPress={() => handleDropDown()} style={{
                backgroundColor: GREY_TEXT_COLOR, flexDirection: 'row', alignItems: 'center', borderRadius: 5,
                justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10
            }} >
                <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>{title}</Text>
                {
                    dropDown ? <Image source={DOWNARROW} style={{ transform: [{ rotateZ: "180deg" }] }} /> :
                        <Image source={DOWNARROW} />
                }

            </TouchableOpacity>
            {
                dropDown &&
                <Modal >
                    <View style={{ flexDirection: 'row', alignItems: 'center',width:"100%",backgroundColor:"#fff" }}>
                        <TouchableOpacity style={{ backgroundColor: PRIMARY_BLUE_COLOR, paddingHorizontal: 10,paddingVertical:18 }} onPress={() => { setdropDown(!dropDown) }}>
                            <Image source={ARROW} style={{ width: 20, height: 20, tintColor: "#fff", resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <Input
                            placeholder={"Search"}
                            containerStyle={{ backgroundColor: GREY_TEXT_COLOR }}
                            placeholderTextColor={{ color: "black" }}
                            InputHeading={"Search"}
                            value={search}
                            onChangeText={(text) => handleSearch(text)}
                        />
                    </View>
                    <FlatList data={filterData !== null ? filterData : data} style={{backgroundColor:"#fff"}}
                        keyExtractor={(item, index) => index.toString()} renderItem={renderItem}
                    />
                </Modal>
            }

        </>
    )
}
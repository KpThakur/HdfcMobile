import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, ScrollView, Modal } from 'react-native'
import { FONT_FAMILY_REGULAR, GREY_TEXT_COLOR, DOWNARROW } from '../../utils/constant'
import { styles } from './styles'
import Input from '../../component/Input'
const WindowHeight = Dimensions.get('window').height
export default function index({ data, title, renderItem, dropDown, setdropDown }) {
    const [search, setsearch] = useState('')
    const [filterData, setfilterData] = useState(null)
    const handleDropDown = () => {
        setdropDown(!dropDown)
    }
    const handleSearch=(text)=>{
        setsearch(text)
        const val=data.filter(city=>{
            return city.city_name.toLowerCase().includes(search.toLowerCase())
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
                // <View style={{ position: 'absolute', backgroundColor: '#ffffff', zIndex: 999, left: 0, right: 0, top: WindowHeight/ 7, height: 200 }}>
                <Modal>
                    <Input
                        placeholder={"Search"}
                        containerStyle={{ backgroundColor: GREY_TEXT_COLOR }}
                        placeholderTextColor={{ color: "black" }}
                        InputHeading={"Search"}
                        value={search}
                        onChangeText={(text)=>handleSearch(text)}
                    />
                    
                    <FlatList data={filterData!==null?filterData: data} 
                    keyExtractor={(item,index)=>index.toString()} renderItem={renderItem} 
                    />
                </Modal>
            }

        </>
    )
}
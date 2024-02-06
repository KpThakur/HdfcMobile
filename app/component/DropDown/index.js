import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, ScrollView, Modal, BackHandler, Alert, Platform } from 'react-native'
import { FONT_FAMILY_REGULAR, GREY_TEXT_COLOR, DOWNARROW, PRIMARY_BLUE_COLOR } from '../../utils/constant'
import Input from '../../component/Input'
import { ARROW } from '../../utils/constant'
import { showMessage } from 'react-native-flash-message'
const WindowHeight = Dimensions.get('window').height
export default function index({ data, data_name, title, renderItem, dropDown, setdropDown, setTimeDropDown,cityId }) {
      useEffect(() => {
          setsearch('');
      },[])

      console.log('---',data)
    const [search, setsearch] = useState('')
    const [filterData, setfilterData] = useState(null)
    const handleDropDown = () => {
        // if (data_name === 'brach_name' && cityId === null){
        //     showMessage({
        //         message: 'Please select city first !',
        //         type:'danger',
        //         duration: 3000
        //     })
        //    Alert.alert('Select City First!')
        // }else{
            setdropDown(!dropDown)
            setTimeDropDown(false)
        // }
        
    }
    const handleSearch = (text) => {
        setsearch(text)
        const val = data.filter(city => {
            if (data_name === 'city_name')
                return city.city_name.toLowerCase().includes(search.toLowerCase())
            else
                return city.branch_name.toLowerCase().includes(search.toLowerCase())
        })

        console.log('00000',val)
        setfilterData(val);
    }
    const set = () => {
        setdropDown(!dropDown);
        setsearch('');
    }
    return (
        <>
            <TouchableOpacity onPress={() => handleDropDown()} style={{
                backgroundColor: GREY_TEXT_COLOR, flexDirection: 'row', alignItems: 'center', borderRadius: 5,
                justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10
            }} >
                <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>{title}</Text>
                {dropDown ? <Image source={DOWNARROW} style={{ transform: [{ rotateZ: "180deg" }] }} /> :
                    <Image source={DOWNARROW} />}
            </TouchableOpacity>
            {
                dropDown &&
                <Modal>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", backgroundColor: "#fff", paddingTop: Platform.OS == "ios" ? 40 : 0 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: PRIMARY_BLUE_COLOR,
                                paddingHorizontal: 10,
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {set()}}>
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
                    <FlatList 
                    keyboardShouldPersistTaps='always' 
                    data={filterData !== null ? filterData : data} 
                    style={{ backgroundColor: "#fff" }}
                    keyExtractor={(item, index) => index.toString()} 
                    renderItem={renderItem}
                    />
                </Modal>
            }

        </>
    )
}
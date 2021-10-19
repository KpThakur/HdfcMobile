import React,{useState} from 'react'
import { View, Text, Modal,FlatList,TouchableOpacity,Image } from 'react-native'

export default function index({data,title}) {
    const [dropDown, setdropDown] = useState(false)
    const handleDropDown = () => {
        setdropDown(!dropDown)
    }
    return (
        <>
        <TouchableOpacity onPress={() => handleDropDown()} style={{
            backgroundColor: "#eee", flexDirection: 'row', alignItems: 'center',
            justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10,marginVertical:10
        }} >
            <Text>{title}</Text>
            <Image source={require('../../assets/images/arrow-ios-downward-outline.png')} />
        </TouchableOpacity>
        {
            dropDown &&
                <FlatList data={data} renderItem={displayDropDown}/>       
        }
    </>
    )
}
const displayDropDown = ({ item }) => {
    return (
        <View style={{
            backgroundColor: "#eee", flexDirection: 'row', alignItems: 'center',
            justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10
        }}>
            <Text>{item.name}</Text>
        </View>
    )
}
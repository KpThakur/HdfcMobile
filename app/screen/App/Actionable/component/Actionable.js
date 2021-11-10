import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import Header from '../../../../component/Header'
import { CAMERA } from '../../../../utils/constant'
import { useNavigation } from '@react-navigation/native'
export default function Actionable(props) {
    const { data } = props
    const navigation = useNavigation();
    const OnpressDrawer = () => {
        navigation.openDrawer()
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Header headerText={"Actionable 1"} onPress={() => OnpressDrawer()} />
                <View style={styles.main}>
                    {
                        data.actionable.image ?
                        <View style={styles.head}>
                            <Image source={{ uri: data.baseURL + data.actionable.image }} style={styles.img} />
                            {/* <TouchableOpacity style={styles.camera_icon}>
                        <Image source={CAMERA} style={styles.icon_img}/>
                    </TouchableOpacity> */}
                        </View>:null
                    }
                    <View style={styles.body}>
                        <Text style={styles.txt}>Action By</Text>
                        <Text style={styles.b_txt}>Branch Manager</Text>
                        <Text style={styles.txt}>Remarks</Text>
                        <Text style={styles.b_txt}>{data.actionable.actionable_remark}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

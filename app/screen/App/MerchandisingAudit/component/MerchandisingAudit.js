import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './styles'
export default function MerchandisingAudit() {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.box_header}>
                    <Text style={styles.header_txt}>Palaslya Branch</Text>
                    <Text style={styles.header_txt}>Bank</Text>
                </View>
                <View style={styles.box_body}>
                    <View style={{ flexDirection: 'row',justifyContent: "space-between" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../../../assets/images/calendar-date.png')} style={styles.img} />
                            <Text style={styles.txt}>Date : </Text>
                            <Text style={styles.p_txt}>07/10/2021</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../../../assets/images/clock.png')} style={styles.img} />
                            <Text style={styles.txt}>Time : </Text>
                            <Text style={styles.p_txt}>08:12AM</Text>
                        </View>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={styles.s_txt}>Branch Manager Name</Text>
                        <Text style={styles.txt}>Vishwas Joshi</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:"space-between",marginVertical:10}}>
                        <View>
                            <Text style={styles.s_txt}>Actionable No.</Text>
                            <Text style={styles.txt}>02 Members</Text>
                        </View>
                        <View>
                            <Text style={styles.s_txt}>Audit Status</Text>
                            <Text style={styles.txt}>Virtual Audit</Text>
                        </View>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={styles.s_txt}>City</Text>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={styles.txt}>Indore</Text>
                            <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                                <TouchableOpacity style={styles.cancel_btn}>
                                    <Text style={{color:"#fff"}}>Cancel Audit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.prim_btn}>
                                    <Text style={{color:"#fff"}}>Start Audit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}


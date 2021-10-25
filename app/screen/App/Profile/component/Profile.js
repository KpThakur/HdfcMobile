import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Header from '../../../../component/Header'
import {styles} from './styles'
export default function Profile() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Header headerText={"Profile"}/>
            <View style={styles.main}>
                <View style={styles.display}>
                    <Text style={styles.txt}>First Name</Text>
                    <Text style={styles.b_txt}>Rohit</Text>
                </View>

                <View style={styles.display}>
                    <Text style={styles.txt}>Last Name</Text>
                    <Text style={styles.b_txt}>Verma</Text>
                </View>

                <View style={styles.display}>
                    <Text style={styles.txt}>Designation</Text>
                    <Text style={styles.b_txt}>Auditor</Text>
                </View>

                <View style={styles.display}>
                    <Text style={styles.txt}>Email</Text>
                    <Text style={styles.b_txt}>Rohitverma@gmail.com</Text>
                </View>

                <View style={styles.display}>
                    <Text style={styles.txt}>Contact Number</Text>
                    <Text style={styles.b_txt}>+91-783-977-1800</Text>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}

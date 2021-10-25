import React from 'react';
import { View, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../../component/Button';
import { styles } from './styles';
import {INSTRUCTION} from '../../../../utils/constant'
export default function AuditSuccess(props) {
    const {handleHome}=props
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.main}>
                    <View style={{ alignItems: 'center' }}>
                        <Image resizeMode={"contain"} style={styles.img} source={INSTRUCTION} />
                        <Text style={styles.txt}>
                            Audit Report has been Successfully Submitted</Text>
                    </View>
                    <Button
                        style={{ marginTop: 30 }}
                        buttonText={"Home"}
                        onPress={() => handleHome()}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

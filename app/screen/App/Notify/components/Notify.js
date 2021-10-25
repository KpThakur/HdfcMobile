import React from "react";
import { Text, View, TouchableOpacity,Share } from 'react-native';
import Header from '../../../../component/Header';
import Button from '../../../../component/Button';
import { styles } from "./styles";

const BranchName = (props) => {
    const {handleStartCall}=props
    return (
        <View style={styles.container}>
            <Header leftImg={''} headerText={"Start Audit"} />
            <View style={styles.mainvwe}>
                <View style={styles.centfrstvwe}>
                    <TouchableOpacity style={styles.bluestreaming}>
                        <Text style={styles.textstraming}>No Live Streaming</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.teamcall}>
                        <Text style={styles.calltxt}>HDFC Team ready for the call : </Text>
                    </View>
                    <View style={styles.brnchmannme}>
                        <View style={styles.brnachnme}>
                            <Text style={styles.branname}>Branch Manager Name</Text>
                        </View>
                        <View style={styles.offlinevwe}>
                            <Text style={styles.offiletxt}>Offline</Text>
                        </View>
                        <TouchableOpacity style={styles.notifyvwe}>
                            <Text style={styles.notifylble}>Notify</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.brnchmannme}>
                        <View style={styles.brnachnme}>
                            <Text style={styles.branname}>RMM</Text>
                        </View>
                        <View style={styles.offlinevwe}>
                            <Text style={styles.offiletxt}>Offline</Text>
                        </View>
                        <TouchableOpacity style={styles.notifyvwe}>
                            <Text style={styles.notifylble}>Notify</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.brnchmannme}>
                        <View style={styles.brnachnme}>
                            <Text style={styles.branname}>Admin Name</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            marginRight: 10
                        }}>
                            <Text style={{
                                fontSize: 14, fontWeight: '800', color: "#2bb642"
                            }}>Joined</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 15 }}>
                        <TouchableOpacity 
                        onPress={()=>props.onShare()}
                        style={{
                            backgroundColor: '#1b7dec',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '33%',
                            height: 42,
                            borderRadius: 20,
                            marginTop: 10
                        }} >
                            <Text style={{
                                fontSize: 16, fontWeight: '800', color: "#ffffff"
                            }}>Invite</Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        style={{ marginBottom: 10 }}
                        buttonText={"Start Call"}
                        onPress={()=>handleStartCall()}
                    />
                </View>
            </View>
        </View>
    )
}
export default BranchName;

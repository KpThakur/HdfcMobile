import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Header from '../../../../component/Header';
import Button from '../../../../component/Button';
import { styles } from "./styles";
import { FONT_FAMILY_REGULAR } from "../../../../utils/constant";

const BranchStartCall = (props) => {
    return (
        <View style={styles.container}>
            <Header leftImg={require('../../../../assets/images/arrow-down.png')} headerText={"Branch f Name"} />
            <ScrollView>
                <View style={styles.mainvwe}>
                    <View style={styles.body}>
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <View style={{ flex: 5, }}>
                                <Text style={styles.branname}>
                                    Lorem ipsum Title
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Image
                                    style={{ width: 10, height: 10 }}
                                    soure={require('../../../../assets/images/Audit.png')}
                                />
                            </View>
                        </View>
                        <Text style={{
                            fontSize: 14, marginLeft: 12, fontFamily: FONT_FAMILY_REGULAR,
                            marginRight: 8
                        }}>
                            Lorem ipsum Title Lorem ipsum Title Lorem ipsum Title
                            Lorem ipsum Title
                        </Text>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            paddingBottom: 5, paddingTop: 5,
                        }}>
                            <Image style={{
                                width: '90%', borderRadius: 10
                            }} source={require('../../../../assets/images/MaskGroup6.png')} />
                        </View>
                        <View style={styles.brnchmannme}>
                            <View style={styles.brnachnme}>
                                <Text style={styles.branname}>Capture The image</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => props.onShare()}
                                style={{
                                    backgroundColor: '#1b7dec',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '45%',
                                    height: 25,
                                    borderRadius: 20,
                                    marginTop: 10
                                }} >
                                <Text style={{
                                    fontSize: 14, fontWeight: '700', color: "#ffffff"
                                }}>Capture Screenshot</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{ marginLeft: 15 }}>
                            <Text style={styles.branname}>
                                Rating
                            </Text>
                            <Image style={{ width: 10, height: 10 }}
                                soure={require('../../../../assets/images/Group_107.png')}
                            />
                        </View> */}
                        <Text style={[styles.branname, { marginLeft: 10 }]}>
                            Actionable
                        </Text>
                        <Button
                            style={{ marginBottom: 10, marginTop: 10 }}
                            buttonText={"Next"}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default BranchStartCall;
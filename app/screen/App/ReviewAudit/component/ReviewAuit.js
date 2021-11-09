import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Header from '../../../../component/Header';
import { styles } from './styles';
import DropDown from '../../../../component/DropDown';
import Button from '../../../../component/Button';
import { useNavigation } from '@react-navigation/native';
export default function ReviewAuit(props) {
    const { setdropDown, cityBranch, handleSubmitReport, cityName, isLoading, citydropDown, setcitydropDown,
        handleSelectCity } = props;
    const [reviewDropDown, setReviewDropDown] = useState(false)
    const navigation = useNavigation();
    const displayCityDropDown = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleSelectCity(item.city_name, item.city_id)} style={styles.drop_down_item}>
                <Text style={styles.txt}>{item.city_name}</Text>
            </TouchableOpacity>
        )
    }
    const OnpressDrawer = () => {
        navigation.openDrawer()
    }
    const data = [{ name: "Actionable 1" }, { name: "Actionable 2" }, { name: "Actionable 3" }]
    return (
        <View style={styles.container}>
            <Header headerText={"Audit Actionable Review"} onPress={OnpressDrawer} />
            <View style={styles.main}>
                <Text style={styles.h_txt}>Audits Actions By :</Text>

                <DropDown title={cityName ? cityName : "Branch Manager"} data={cityBranch}
                    renderItem={displayCityDropDown} dropDown={reviewDropDown} data_name={'city_name'}
                    setdropDown={setReviewDropDown}
                />
                <DropDown title={cityName ? cityName : "Regional Marketing Manager"} data={cityBranch}
                    renderItem={displayCityDropDown} dropDown={reviewDropDown} data_name={'city_name'}
                    setdropDown={setReviewDropDown}
                />
                <DropDown title={cityName ? cityName : "Admin"} data={cityBranch}
                    renderItem={displayCityDropDown} dropDown={reviewDropDown} data_name={'city_name'}
                    setdropDown={setReviewDropDown}
                />

                {/* <DropDown onPress={() => setdropDown(!dropDown)} title={"Branch Manager"} data={data} />
                <DropDown onPress={() => setdropDown(!dropDown)} title={"Regional Marketing Manager"} data={data} />
                <DropDown onPress={() => setdropDown(!dropDown)} title={"Admin"} data={data} /> */}
            </View>
            <View style={{ flex: 4, justifyContent: "flex-end", marginBottom: 10 }}>
                <Button buttonText={"Submit Report"} onPress={() => handleSubmitReport()} />
            </View>
        </View>
    )
}
import React from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { styles } from './styles'
import Button from '../../../../component/Button'
export default function AuditScore() {
    const data=[{sorce:89,date:"01/10/2021"},{sorce:89,date:"01/10/2021"},{sorce:89,date:"01/10/2021"},{sorce:89,date:"01/10/2021"},{sorce:89,date:"01/10/2021"},{sorce:89,date:"01/10/2021"}]
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.main}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.heroic_txt}>Total Branch</Text>
                        <Text style={styles.heroic_txt}>Merchandising Audit Score</Text>
                        <View style={styles.score_board}>
                            <Text style={styles.hsn_txt}>100</Text>
                            <Text style={styles.hs_txt}>Audit Score</Text>
                        </View>
                    </View>
                    <View style={styles.prev_audit}>
                        <Text style={styles.txt}>Preview Audit Score :</Text>
                        <FlatList data={data} renderItem={displayScoreAudit}/>
                    </View>
                    <Button buttonText={"View Actionables"}/>
                </View>
            </ScrollView>
        </View>
    )
}
const displayScoreAudit = ({ item }) => {
    return (
        <View style={styles.display_score}>
            <Text style={styles.s_txt}>Score : 89</Text>
            <Text style={styles.txt}>01/10/2021</Text>
        </View>
    )
}

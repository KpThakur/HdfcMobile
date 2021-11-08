import React from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { styles } from './styles'
import Button from '../../../../component/Button'
export default function AuditScore(props) {
    const {handleViewActionable,totalScore}=props
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.main}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={styles.heroic_txt}>Total Branch</Text>
                        <Text style={styles.heroic_txt}>Merchandising Audit Score</Text>
                        <View style={styles.score_board}>
                            <Text style={styles.hsn_txt}>{totalScore.score}</Text>
                            <Text style={styles.hs_txt}>Audit Score</Text>
                        </View>
                    </View>
                    {
                        totalScore.previous&&
                    <View style={styles.prev_audit}>
                        <Text style={styles.txt}>Preview Audit Score :</Text>
                        <FlatList data={totalScore.previous} renderItem={displayScoreAudit}/>
                    </View>
                    }
                    <Button buttonText={"View Actionables"} onPress={()=>handleViewActionable()}/>
                </View>
            </ScrollView>
        </View>
    )
}
const displayScoreAudit = ({ item }) => {
    return (
        <View style={styles.display_score}>
            <Text style={styles.s_txt}>Score : {item.previous_score}</Text>
            <Text style={styles.txt}>{item.previous_score_date}</Text>
        </View>
    )
}

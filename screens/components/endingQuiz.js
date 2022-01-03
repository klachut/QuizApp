import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function EndOfQuiz(props) {
    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    Congratulation!
                </Text>
            </View>
            <Text style={styles.score}>
                Score: {props.score} / {props.max}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'ivory'
    },
    title: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    titleText:{
        fontSize:30,
        color: "#69d5ff"
    },
    score :{
        flex:1,
        fontSize:25,
        color: "#69d5ff"
    }
})

export default EndOfQuiz;
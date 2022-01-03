import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

function QuestionCard(props) {

  return(
    <View style={styles.container}>
        <Text style={styles.question}>
          {props.task.question}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    alignItems: 'center',
    alignSelf:'center',
    padding:"5%",
    backgroundColor: 'ivory',
    color: '#69d5ff'
  },

  quizTitle:{
    fontSize: 20,
    margin: 10
  },
  question:{
    flex:2,
    fontSize: 30,
    margin: 10,
    textAlign: 'center',
    color: '#69d5ff'
  },

})

export default QuestionCard;
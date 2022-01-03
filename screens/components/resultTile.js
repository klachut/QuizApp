import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

function ResultTile(props) {
  return(
    <View style={styles.container}>

      <Text style={styles.title}>
        {props.result.nick}
      </Text>

      <Text style={styles.score}>
        {props.result.score}/{props.result.total}
      </Text>

      <Text style={styles.date}>
        {props.result.createdOn}
      </Text>

      <Text style={styles.type}>
        {props.result.type}
      </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#69d5ff',
    margin: '0.5%',
  },
  title:{
    flex:1,
    fontSize: 20,
    margin: 10
  },
  score:{
    flex:2,
    fontSize: 20,
    margin: 10
  },
  type:{
    flex:2,
    fontSize: 20,
    margin: 10
  },
  date:{
    flex:1,
    fontSize: 15,
    margin: 10
  }
})

export default ResultTile;
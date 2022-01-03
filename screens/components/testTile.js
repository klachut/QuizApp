import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

function TestTile(props) {
  return(
    <TouchableOpacity
    onPress={()=>props.navigation.navigate(props.test.name)}
    style={styles.container}>

      <Text style={styles.title}>
        {props.test.name}
      </Text>

      <View style={styles.tagsContainer}>
        {props.test.tags.map((tag,tagKey)=>
          <Text key={tagKey} style={styles.tag}>
            #{tag}
          </Text>
        )}
      </View>

      <Text style={styles.description}>
        {props.test.description}
      </Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    height: 200,
    padding: "5%",
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'ivory',
    margin: '0.5%',
  },
  tagsContainer:{
      flexDirection: 'row',
  },
  title:{
    fontSize: 30,
    marginBottom:15,
    color:'darkblue'
  },
  description:{
    marginTop: 10,
    fontSize: 15,
    color: 'darkblue'
  },
  tag:{
    marginRight: 5,
    fontSize: 25,
    color: 'darkblue',
    textDecorationLine: 'underline'
  }
})

export default TestTile;
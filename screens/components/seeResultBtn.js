import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

function SeeResultBtn(props) {
  return(
    <TouchableOpacity
      onPress={()=> props.navigation.navigate('Scores')}
      style={styles.btn}>
      <Text style={styles.btnText}>Check your results!</Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  btn: {
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#328566',
    margin: 5
  },
  btnText : {
    fontSize: 25,
    color: 'white',
    padding: 5,
  }
})

export default SeeResultBtn;
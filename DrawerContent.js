import { DrawerItem } from '@react-navigation/drawer';
import * as React from 'react';
import { View, Text,  Button,StyleSheet, ImageBackground, Image } from 'react-native';

const _ = require('lodash');

export default function DrawerContent(props) {
    const arrTests = [];
    const arr = [];

    for(let i in props.descriptors)
        arrTests.push(props.descriptors[i]);
    for(let i=0; i< props.dividerAfter; i++)
      arr.push(arrTests.shift());

    return(
        <View style={{flex:1}}>

            <View>
                    <ImageBackground style={styles.imageBack}>
                        <Image source={require('./quiz.jpg')} style={styles.imageParams}/>
                    </ImageBackground>


                <Text style={{fontSize: 15, marginTop: 5, display:props.connected?'none':'flex'}}>(No internet connection, using local database)</Text>
            </View>

            {arr.map((item, key)=>
                <DrawerItem
                    label={item.route.name}
                    style={{width:'90%'}}
                    onPress={() => props.navigation.navigate(item.route.name)}
                    focused={item.navigation.isFocused() ? true : false}
                    key={key} />
            )}

            <DrawerItem
                label='Reload Tests'
                onPress={() => props.refreshCallback()}
                activeBackgroundColor='#2b5e5d'
                activeTintColor='#d8eded'
                style={{width: '90%'}}/>

            <DrawerItem
                label='Random test'
                onPress={() => props.navigation.navigate(_.sample(arrTests).route.name)}
                activeBackgroundColor='#2b5e5d'
                activeTintColor='#d8eded'
                style={{width: '90%'}}/>
        </View>
    )
}

const styles = StyleSheet.create({

    imageBack: {
      backgroundColor: '#69d5ff',
      padding: 20,
      borderRadius: 6,
      overflow: 'hidden',
    },
    customDrawer: {
      flex: 1,
      backgroundColor:'#fff',
      paddingTop:10,

    },
    imageParams:{
      height: 250,
      width: 250,
      borderRadius: 40,
      alignSelf:'center'
    }

})

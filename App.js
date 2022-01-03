import * as React from 'react';
import { AsyncStorage} from 'react-native';
import { useState, useEffect } from 'react';
import {setCustomText} from 'react-native-global-props';
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2', 'AsyncStorage']);
import WelcomeScreen from './screens/welcomeScreen';
import Drawer from './Drawer';

const globalTextProps = {
  style: {
    fontFamily: 'Ubuntu-Bold'
  }
};

setCustomText(globalTextProps);

export default function App(props) {
  const [value, setValue] = useState(false);
  const [username, setUsername] = useState('');

  const checkFirst = async() =>{
    try {
      const value = await AsyncStorage.getItem('username');
      if(value != null) {
        setValue(false);
        setUsername(value);

      } else {
        setValue(true);
      }
    } catch (error) {
      setValue(true);
    }
  }

  useEffect( () => {checkFirst();}, []);

  const confirm = async(username) => {
    if(!username)
      return;
    try{
      await AsyncStorage.setItem('username', username);
    } catch (error) {
      console.log(error);
    }
    setValue(false);
    setUsername(username)
  }

  return(
    value ? (<WelcomeScreen confirm={confirm}/>) : (<Drawer username={username}/>)
  )
}

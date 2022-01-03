import * as React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { useState, useEffect } from 'react';

import QuestionCard from './components/questionCard';
import EndOfQuiz from './components/endingQuiz';
import { TouchableOpacity } from 'react-native-gesture-handler';

function TestScreen(props) {

  const [taskNumber, setTaskNumber] = useState(0);
  const [remainingTime, setRemainingTime] = useState(100);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [interval, setMyInterval] = useState(null);
  const [task, setTask] = useState(props.test.details.tasks[0]);
  const tasksLength = props.test.details.tasks.length;

  useEffect(() => {
    const initialize = props.navigation.addListener('focus', () => init());
    return initialize;
  }, [props.navigation]);

  useEffect(() => {
    const uninitialize = props.navigation.addListener('blur', () => exit());
    return uninitialize;
  }, [props.navigation]);



  const sendResult = async() => {
    try {

        await fetch('http://tgryl.pl/quiz/result', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nick: props.username,
            score: score,
            total: props.test.details.tasks.length,
            type: props.test.name
          })
        })
    } catch (error) {
      console.log(error)
    }
  }

  const nextTest = () => {
    if(taskNumber+1== props.test.details.tasks.length){
      setCompleted(true);
      clearInterval(interval);
      sendResult();
    }
    else {
      setTaskNumber(taskNumber + 1);
      setTask(props.test.details.tasks[taskNumber+1]);
      setRemainingTime(props.test.details.tasks[taskNumber+1].duration);
    }
  }

  const tick = () => {
    if(remainingTime <= 0.0) {
      nextTest();
    } else {
      setRemainingTime((remainingTime) => remainingTime-0.1);
    }
  }

  const verify = (isCorrect) => {
    if(isCorrect)
      setScore(score+1);
    nextTest();
  }

  const init = () => {
    setTaskNumber(0);
    setRemainingTime(props.test.details.tasks[0].duration);
    setScore(0);
    setCompleted(false);
    setMyInterval(setInterval( tick, 100));
  }

  const exit = () => {
    clearInterval(interval);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container,{display: completed ? 'none' : 'flex'}]}>
        <QuestionCard task={task} taskNumber={taskNumber+1} tasksLength={tasksLength} time={remainingTime}/>
        {task.answers.map((item, key) =>
          <TouchableOpacity style={{padding: 20, color: "#69d5ff", alignItems:"center", justifyContent:"center",  borderRadius: 4, margin: 20}}
                        key={key} onPress={() => verify(item.isCorrect)}>
            <Text style={{color:"black", fontSize: 20}}>{item.content}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.container, {display: completed ? 'flex' : 'none'}]}>
          <EndOfQuiz completed={completed} score={score} max={tasksLength} type={props.test.name}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#69d5ff',
     borderRadius: 20,
  },

})

export default TestScreen;
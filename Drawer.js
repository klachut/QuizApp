import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

import HomeScreen from './screens/homeScreen';
import TestScreen from './screens/testScreen';
import ScoresScreen from './screens/scoresScreen';
import DrawerContent from './DrawerContent';

const _ = require('lodash');

function Drawer (props) {

    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);

    const getTests = async() => {
        let db;
        try{
            db = await SQLite.openDatabase('tests');
            await db.executeSql(`CREATE TABLE IF NOT EXISTS 'tests' (
                'id' TEXT NOT NULL,
                'test' TEXT NOT NULL,
                PRIMARY KEY ('id')
            );`);
            await db.executeSql(`CREATE TABLE IF NOT EXISTS 'tests_details' (
                'id' TEXT NOT NULL,
                'test' TEXT NOT NULL,
                FOREIGN KEY("id") REFERENCES "tests"("id"),
                PRIMARY KEY("id")
            );`);
            setLoading(true);
            setTests([]);
            let connection = await NetInfo.fetch();
            if(connection.isInternetReachable) {
                const tests = await (await fetch('http://tgryl.pl/quiz/tests')).json();
                await db.executeSql('DELETE FROM tests');
                await db.executeSql('DELETE FROM tests_details');
                for(let test of tests) {
                    const details = await (await fetch('http://tgryl.pl/quiz/test/'+test.id)).json();
                    await db.executeSql(`INSERT INTO tests VALUES (?,?);`, [test.id, JSON.stringify(test)]);
                    await db.executeSql(`INSERT INTO tests_details VALUES (?, ?);`, [details.id, JSON.stringify(details)]);
                }
                setConnected(true);
            } else {
                setConnected(false);
            }
            let status = await db.executeSql(`SELECT test FROM tests;`);
            const tests = [];

            for(let test of status[0].rows.raw()) {
                test=JSON.parse(test.test);
                status = await db.executeSql(`SELECT test FROM tests_details WHERE id=?;`, [test.id]);
                test.details = JSON.parse(status[0].rows.raw()[0].test);
                tests.push(test);
            }
            setTests(_.shuffle(tests));
            setLoading(false);

        } catch(error){
            console.log(error);
            db.close();
        }
    }

    useEffect( () => {
        getTests();
    }, []);

    const username=props.username;
    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer >
            <Drawer.Navigator drawerContent={props =>
                <DrawerContent {...props} dividerAfter={2} refreshCallback={getTests} connected={connected} username={username} />
            }>

            <Drawer.Screen name="Home" options={{ headerShown: false}}>
                {({navigation}) => <HomeScreen navigation={navigation}
                                    tests={tests} loading={loading}
                                    refreshCallback={getTests}/>}
            </Drawer.Screen>

            <Drawer.Screen name="Scores" options={{ headerShown: false}}>
                {({navigation}) => <ScoresScreen navigation={navigation}/>}
            </Drawer.Screen>

            {tests.map((test, key) =>
                <Drawer.Screen name={test.name} options={{ headerShown: false}}  key={key} >
                    {({navigation}) => <TestScreen navigation={navigation} test={test} username={props.username} />}
                </Drawer.Screen>
            )}

            </Drawer.Navigator>
        </NavigationContainer>

        );
    }

export default Drawer;
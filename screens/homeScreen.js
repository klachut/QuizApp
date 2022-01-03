import * as React from 'react';
import { StyleSheet, FlatList, RefreshControl} from 'react-native';
import { useEffect, useState } from 'react';

import SeeResultBtn from './components/seeResultBtn.js';
import TestTile from './components/testTile';

function HomeScreen(props) {
  const [refreshing, setRefreshing] = useState(false);


  const renderItem = ({ item }) => (
        <TestTile test={item} navigation={props.navigation} />
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={props.loading}
          onRefresh={props.refreshCallback}
        />
      }
      data = {props.tests}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />

  );
}


export default HomeScreen;
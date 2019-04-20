import React, {Component} from 'react';
import {Platform, StyleSheet, FlatList, Text, View, TouchableHighlight} from 'react-native';
import { observable, computed, toJS} from 'mobx'
import { observer, inject } from "mobx-react/custom"
import { Navigation } from 'react-native-navigation'

import RunPreview from '../components/RunPreview'

@inject("store")
@observer
export default class ListRuns extends Component {

  constructor(props) {
    super(props)

  }

  @computed get runStore() {
     return this.props.store.RunStore
  }

  @computed get runs() {
    if(this.runStore.runs.length) return this.runStore.runs
    return []
  }

  componentDidMount() {
    this.props.store.RunStore.loadRuns()
  }

  render() {
    return (
      <FlatList
        data={this.runs}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => (
          <TouchableHighlight
          onPress={() => {} }>
            <View style={styles.listItem}>
              <RunPreview mapBoundingBox={item.geography} />
              <Text>{item.title}</Text>
              <Text>{item.distance}</Text>
              <Text>{item.duration}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: '90%',
    backgroundColor: '#eee',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    padding: 10
  }
})
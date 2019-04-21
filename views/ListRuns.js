import React, {Component} from 'react';
import {Platform, StyleSheet, FlatList, Text, View, TouchableHighlight} from 'react-native';
import { observable, computed, toJS} from 'mobx'
import { observer, inject } from "mobx-react/custom"
import { Navigation } from 'react-native-navigation'

import RunPreview from '../components/RunPreview'

@inject("store")
@observer
export default class ListRuns extends Component {

  @observable loading = false

  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
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

  async refresh() {
    this.loading = true
    this.props.store.RunStore.loadRuns()
    .then(() => {
      this.loading = false
    })
  }

  async showRunDetail(run, props) {
    console.log("press")
    await Navigation.push(props.componentId, {
      component: {
        name: 'navigation.runtracker.RunDetail',
        passProps: {
          run,
        },
        options: {
          layout: {

          },
          topBar: {
            title: {
              text: run.title,
              color: '#0000ff',
              fontSize: 14
            }
          }
        }
      }
    })
  }

  render() {
    return (
      <FlatList
        onRefresh={this.refresh}
        refreshing={this.loading}
        data={this.runs}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => (
          <TouchableHighlight
          onPress={ () => {this.showRunDetail(item, this.props)}}>
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
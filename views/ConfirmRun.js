/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { observable, computed } from 'mobx'
import MapView, {Polyline} from 'react-native-maps'
import { observer, inject } from "mobx-react/custom"
import { Navigation } from 'react-native-navigation'
import {Run} from '../models/Run'
import {miles} from '../util/geospacial'
import RunPreview from '../components/RunPreview'


import {
  hours,
  minutes,
  seconds,
  mseconds
} from '../util/time'

function millisToMinutesAndSeconds(millis) {
  ms = 1000*Math.round(millis/100); // round to nearest second
  var d = new Date(ms);
  return d.getUTCMinutes() + ':' + d.getUTCSeconds()
}


@inject("store")
@observer
export default class RunTracker extends Component {

  @observable run

  constructor(props) {
    super(props)
  }

  @computed get milesRan() {
    let {distance} = this.props.run
    return miles(distance)
  }

  @computed get totalTime() {
    let {duration} = this.props.run
    return `${hours(duration)}:${minutes(duration)}:${seconds(duration)}:${mseconds(duration)}`
  }

  @computed get pace() {
    let {duration, distance} = this.props.run
    paceInMs = duration / this.milesRan
    return `${minutes(paceInMs)}:${seconds(paceInMs)}`
  }

  render() {
    let {store, run} = this.props
    let {distance, duration} = run
    return (
      <View style={styles.container}>
        <RunPreview mapBoundingBox={run.geography} />
        <View style={styles.container}>
          <Text>Distance: {this.milesRan} Miles</Text>
          <Text>Time: {this.totalTime} </Text>
          <Text>{this.pace} / Per Mile </Text>
          <Button title="discard" onPress={() => {Navigation.dismissAllModals()}} />
          <Button title="save" onPress={() => {
            store.RunStore.saveRun(run)
            .then(() => {
              Navigation.dismissAllModals()
             })
          }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',

    backgroundColor: '#F5FCFF',

  },
  map: {
   width: '100%',
   height: 300
 },
});

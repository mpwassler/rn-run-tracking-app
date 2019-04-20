/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { observable } from 'mobx'
import { observer, inject } from "mobx-react/custom"
import { Navigation } from 'react-native-navigation'
import {Run} from '../models/Run'

import {
  hours,
  minutes,
  seconds,
  mseconds
} from '../util/time'

@inject("store")
@observer
export default class RunTracker extends Component {

  @observable run

  constructor(props) {
    super(props)
    this.finishRun = this.finishRun.bind(this)
  }

  componentDidMount(props) {
    this.run = new Run(this.props.store.UserStore)
    this.run.start()
  }

  async finishRun() {
    this.run.stop()
    await Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'navigation.runtracker.ConfirmRun',
              passProps: {
                run: this.run,
                test: "test"
              },
            }
          }
        ]
      }
    })
  }

  Timer(){


      return (
        <View style={styles.timer} >
          <Text style={styles.time}>
            {minutes(this.run.duration)}
          </Text>
          <Text style={styles.time}>:</Text>
          <Text style={styles.time}>
            {seconds(this.run.duration)}
          </Text>
          <Text style={styles.time}>:</Text>
          <Text style={styles.time}>
            {mseconds(this.run.duration)}
          </Text>
        </View>
      )

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {this.run && this.Timer()}
        </View>
        <View style={styles.bottom}>
          <Button onPress={this.finishRun} title="Finish" />
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  timer : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '60%'

  },
  time: {
    flex: 1,
    textAlign: 'center',
    fontSize: 34
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

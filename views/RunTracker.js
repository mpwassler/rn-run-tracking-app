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

@inject("store")
@observer
export default class RunTracker extends Component {

  @observable run

  constructor(props) {
    super(props)
    this.pause = this.pause.bind(this)
  }

  componentDidMount(props) {
    this.run = new Run(this.props.store.UserStore)
    this.run.start()
    console.log(this.run)
  }

  pause() {
    this.run.stop()
    console.log(this.run.points)
  }

  render() {

    if(this.run)  {
      let {minutes, seconds, milliseconds, formatted} = this.run.time
      return (
        <View style={styles.container}>
          <View >
              {minutes != null &&
                <Text style={styles.welcome}>
                  {minutes}
                </Text>
              }

              {seconds != null &&
                <Text style={styles.welcome}>
                  {seconds}
                </Text>
              }

              {milliseconds != null &&
                <Text style={styles.welcome}>
                  {milliseconds}
                </Text>
              }
          </View>
        </View>

      )
    } else {
      return <View style={styles.container}></View>
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

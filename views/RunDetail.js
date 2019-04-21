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


@inject("store")
@observer
export default class RunDetail extends Component {

  @observable run

  constructor(props) {
    super(props)
  }



  render() {
    let {run} = this.props
    return (
      <View style={styles.container}>
        <RunPreview mapBoundingBox={run.geography} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  }
});

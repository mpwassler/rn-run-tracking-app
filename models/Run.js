import {observable, autorun, computed, observe, toJS} from 'mobx'
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, InteractionManager} from 'react-native'
import {measureLineString} from '../util/geospacial'

export class Run {

  @observable tracking = false

  @observable duration = null

  @observable title = "Daily Run"

  @observable points = []

  @observable userStore

  @observable timerStart = null

  @observable timerTime = null

  id = null

  intervalTimer

  locationObserver

  constructor(userStore = null) {
    this.userStore = userStore
  }

  @computed get distance() {
    const points = toJS(this.points)
    return measureLineString(points)
  }

  @computed get geography() {
    const points = toJS(this.points)
    return {
      "type" : "Feature",
      "geometry" : {
        "type" : "LineString",
        "coordinates": points
      },
      "properties": {
        "duration" : this.duration,
        "distance" : this.distance,
        "title" : this.title,
      }
    }
  }

  observeUserPosition() {
    this.locationObserverDisposer = observe(
      this.userStore, "userPosition", position => {
        this.points.push([
          position.newValue.longitude,
          position.newValue.latitude
        ])
      }
    )
  }

  startTimer() {
    this.timerStart = new Date()
    this.intervalTimer = setInterval(() => {
      this.duration = new Date() - this.timerStart
    }, 30)
  }

  start() {
    this.observeUserPosition()
    InteractionManager.runAfterInteractions(() => {
      this.startTimer()
    })
  }

  stop() {
    clearInterval(this.intervalTimer)
    this.locationObserverDisposer()
  }

  static fromGeoJSON(json) {
    let run = new Run()
    run.points = json.geometry.coordinates
    run.duration = json.properties.duration
    run.id = json.properties.id
    run.title = json.properties.title
    return run
  }

}
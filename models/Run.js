import {observable, autorun, computed, observe} from 'mobx'
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, InteractionManager} from 'react-native'

export class Run {

  @observable tracking = false

  @observable duration = 0

  @observable title = "Daily Run"

  @observable points = []

  @observable userStore

  intervalTimer

  locationObserver

  constructor(userStore) {
    this.userStore = userStore
    this.position = this.userStore.userPosition
  }

  @computed get time() {
    return this.millisecondsToTime(this.duration)
  }

  millisecondsToTime(duration) {
    let seconds = Math.floor(duration / 100)
    let minutes = Math.floor(duration / 6000)
    let hours = Math.floor(duration / 360000)
    let milliseconds = duration - (seconds * 100)
    seconds = seconds - (minutes * 60)
    minutes = minutes - (hours * 60)
    return {
      hours: `${hours < 10 ? 0 : ""}${hours}`,
      minutes: `${minutes < 10 ? 0 : ""}${minutes}`,
      seconds: `${seconds < 10 ? 0 : ""}${seconds}`,
      milliseconds: `${milliseconds < 10 ? 0 : ""}${milliseconds}`,
    }
  }

  observeUserPosition() {
    this.locationObserverDisposer = observe(
      this.userStore, "userPosition", position => {
        this.points.push(position.newValue)
      }
    )
  }

  startTimer() {
    this.intervalTimer = setInterval(() => { this.duration++ }, 1)
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

}
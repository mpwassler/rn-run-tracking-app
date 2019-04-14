import {observable, autorun, computed} from 'mobx'
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Alert} from 'react-native'
export class UserStore {

  @observable latitude
  @observable longitude
  @observable timestamp

  @computed get userPosition() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      timestamp: this.timestamp
    }
  }

  startTrackingPosition() {
    navigator.geolocation.watchPosition(
        position => {
          //const location = JSON.stringify(position);
          this.latitude = position.coords.latitude
          this.longitude = position.coords.longitude
          this.timestamp = position.timestamp
        },
        error => Alert.alert(error.message),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 500,
          distanceFilter: 1
        }
    )
  }
}




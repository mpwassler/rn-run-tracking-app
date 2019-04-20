import {observable, autorun, computed, observe} from 'mobx'
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, InteractionManager} from 'react-native'
import {Run} from '../models/Run'

export class RunStore {

  @observable runs = []

  @observable runInProgress

  async loadRuns() {
    return new Promise( async (res, rej) => {
      try {
        let response = await fetch('http://localhost:3000/api/v1/runs')
        let responseData = await response.json()
        this.runs = responseData.runs.map( run => {
          return Run.fromGeoJSON(run)
        })
        res({status: 'success'})
      } catch(err) {
        rej({status: 'error'})
      }
    })

  }

  saveRun(run) {
    return new Promise( async (res, rej) => {
      try {
        let response = await fetch('http://localhost:3000/api/v1/runs', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(run.geography)
        })
        this.loadRuns()
        res({status: 'success'})
      } catch(err) {
        rej({status: 'error'})
      }
    })

    console.log(response)
  }
}



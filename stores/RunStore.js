import {observable, autorun, computed, observe} from 'mobx'
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, InteractionManager} from 'react-native'

export class RunStore {

  @observable runs = []

  @observable runInProgress
}



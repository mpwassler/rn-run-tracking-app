import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';
import MapView, {Circle} from 'react-native-maps'
import { observable } from 'mobx'
import { observer, inject } from "mobx-react/custom"
import { Navigation } from 'react-native-navigation'

@inject("store")
@observer
export default class AddRun extends Component {

  constructor(props) {
    super(props)
    this.startRun = this.startRun.bind(this)
  }

  componentDidMount() {
    this.props.store.UserStore.startTrackingPosition()
  }

  async startRun() {
    await Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'navigation.runtracker.RunTracker'
            }
          }
        ]
      }
    });
    // await Navigation.push(this.props.componentId, {
    //   component: {
    //     name: 'navigation.runtracker.RunTracker',
    //     options: {
    //       layout: {

    //       },
    //       topBar: {
    //         title: {
    //           text: 'pushed',
    //           color: '#0000ff',
    //           fontSize: 14
    //         },
    //         subtitle: {
    //           text: 'subtitle',
    //           fontSize: 10,
    //           color: '#00ff00'
    //         }
    //       }
    //     }
    //   }
    // })
  }

  render() {
    let map
    let userLocation = this.props.store.UserStore.userPosition
    if(userLocation.latitude && userLocation.longitude) {
      let {latitude, longitude} = userLocation
      map = <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
       >
         <Circle
           center={{latitude, longitude}}
           radius={300}
           fillColor="rgba(255, 255, 255, 1)"
           strokeColor="rgba(0,0,0,0.5)"
         />
       </MapView>
    }
    return (
      <View>
        <View style={styles.container}>
          {map}
        </View>
        <View style={styles.buttonContainer}>
          <Button
          title="Track Run"
          onPress={this.startRun}
          style={styles.button}/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
 container: {
   //...StyleSheet.absoluteFillObject,
   height: 400,
   width: '100%',
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 buttonContainer: {
   marginTop: 50,
 },
 button: {

 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
})
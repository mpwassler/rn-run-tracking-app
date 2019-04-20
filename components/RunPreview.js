import React, {Component} from 'react'
import MapView, {Polyline} from 'react-native-maps'
import {View, StyleSheet} from 'react-native'

const formattedBoundingBox = (geography) => {
    return geography
      .geometry
      .coordinates
      .reduce( (carry, point, cnt) => {
        if (cnt % 6 == 0) {
          carry.push( {
            latitude: point[1],
            longitude: point[0]
          })
        }
        return carry
      },[])
  }

export default RunPreview = ({mapBoundingBox}) => {

  let bb = formattedBoundingBox(mapBoundingBox)

  let mapView = null

  return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
        scrollEnabled={false}
        ref={ (mapRef) => mapView = mapRef }
        onMapReady={ () => {
          mapView.fitToCoordinates( bb, {
            edgePadding: {
              top: 40,
              right: 60,
              bottom: 40,
              left: 60
            },
            animated: false
          })
        }}
        >
          <Polyline
          coordinates={bb}
          strokeWidth={4}
          strokeColor="#2962FF" />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',

  },
  map: {
   width: '100%',
   height: 300
 },
})
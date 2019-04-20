function radians(degrees){
    return degrees * Math.PI / 180
}

export function miles(i) {
  return  Math.round( ( i * 0.000621371192 ) * 100) / 100
}

export function getDistanceBetweenLatLgnPairs( latLon1, latLon2 ) {
  let R = 6371e3 // metres
  let Lat1 = radians(latLon1[1])
  let Lat2 = radians(latLon2[1])
  let deltaLat = radians(latLon2[1]-latLon1[1])
  let deltaLon = radians(latLon2[0]-latLon1[0])
  let a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(Lat1) * Math.cos(Lat2) * Math.sin(deltaLon/2) * Math.sin(deltaLon/2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

function segmentReduce(list, callback) {
  let chunk = 2
  let carry = 0
  for (var i = 0; i < list.length; i += chunk) {
    carry = callback(carry, list.slice(i, i + chunk))
  }
  return carry
}

export function measureLineString(coordinates) {
  let previusPoint = null
  return coordinates.reduce( (carry, point) => {
    if (previusPoint) {
      carry += getDistanceBetweenLatLgnPairs(previusPoint, point)
    }
    previusPoint = point
    return carry
  },0)
  // return miles(segmentReduce(coordinates, (carry, points) => {
  //   console.log(points)
  //   return carry += getDistanceBetweenLatLgnPairs(points[0], points[1])
  // }))
}

function padZero(time) {
    return time < 10 ? '0' + time : '' + time
}

export function hours(duration) {
  const hours = parseInt((duration/(1000*60*60))%24)
  return padZero(hours)
}

export function minutes(duration) {
  const minutes = parseInt((duration/(1000*60))%60)
  return padZero(minutes)
}

export function seconds(duration) {
  const seconds = parseInt((duration/1000)%60)
  return padZero(seconds)
}

export function mseconds(duration) {
  const milliseconds = parseInt((duration%1000)/10)
 return padZero(milliseconds)
}
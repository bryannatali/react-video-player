export function secondsToTimeString(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds - minutes * 60)

  const minuteValue = minutes.toString().padStart(2, '0')
  const secondValue = seconds.toString().padStart(2, '0')

  return `${minuteValue}:${secondValue}`
}
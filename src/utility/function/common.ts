export const timerSet = (second: number) => {
  const addZero = (value: number) => {
    let result;
    if (value < 59) {
      result = value < 10 ? `0${value}` : value
    } else {
      const modulus = Math.round(value % 60)
      result = modulus < 10 ? `0${modulus}` : modulus
    }

    return result
  }

  const minute = Math.floor(second / 60)
  const hour = Math.floor(minute / 60)
  const date = second < 60 ? `00:${addZero(second)}` : `${hour > 0 ? `${addZero(hour)}:` : ''}${addZero(minute)}:${addZero(second)}`
  return date
}
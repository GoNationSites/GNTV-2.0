import capitalize from './capitalize'

export default (days) => {
  const dayLength = days.length
  switch (true) {
    case dayLength === 7:
      return 'Day'
    case dayLength === 2:
      return days.join(', ').includes('saturday, sunday')
        ? 'Weekend'
        : `Every ${days.map(capitalize).join(' & ').toString()}`
    case dayLength === 5 &&
      days.join(', ').includes('monday, tuesday, wednesday, thursday, friday'):
      return 'Weekday'
    case dayLength === 1:
      return `${capitalize(days[0])}`
    default:
      return `${days.map(capitalize).join(', ').toString()}`
  }
}

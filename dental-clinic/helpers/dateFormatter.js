
function dateFormatter(day, time) {
  let year = day.split("-")[0]
  let month = day.split("-")[1]
  let dayTemp = day.split("-")[2]
  let hour = time.split(":")[0]
  let minutes = time.split(":")[1]
  const date = new Date(year, month, dayTemp, hour, minutes)
  return new Date(date - date.getTimezoneOffset() * 60000)
}

module.exports = dateFormatter
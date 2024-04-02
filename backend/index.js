const express = require('express')
const os = require('os')

const app = express()
const port = 5000

// Function to calculate normalized CPU load average
function getCpuLoadAverage() {
  const numCores = os.cpus().length
  const loadAverage = os.loadavg()[0]
  return loadAverage / numCores
}

// Endpoint to retrieve CPU load data
app.get('/cpu-monitoring/average-load', (_, res) => {
  const average = getCpuLoadAverage()
  res.json({
    cpu: {
      average,
      time: Date.now(),
    },
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

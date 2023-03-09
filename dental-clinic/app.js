const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/dentists', (req, res) => {
  res.send('dentists')
})
app.get('/appointments', (req, res) => {
  res.send('dentists')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

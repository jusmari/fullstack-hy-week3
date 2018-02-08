const express = require('express')
const app = express()
const moment = require('moment')
const bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :body :res[content-length] - :response-time ms'))

let persons = [
    {
        "name": "arto",
        "number": "1312312321",
        "id": 1
    },
    {
        "name": "kalle",
        "number": "444",
        "id": 2
    },
    {
        "name": "pekka",
        "number": "5555",
        "id": 3
    }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
    const len = persons.length
    const date = moment().format()
    res.send('<div>puhelinluettelossa ' + len + ' henkilön tiedot <br/> ' +date+' </div>')
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    res.json(persons[id-1])
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    delete persons[id-1]
    res.json("ok")
})

const checkValidity = (person) => {
    return persons.filter((p) => p.name === person.name).length === 0
}

app.post('/api/persons', (req, res) => {
    const person = req.body

    if (checkValidity(person)) {
        id = Math.floor(Math.random()*50)
        person.id = id
        persons.push(person)
        res.json("ok")
    } else {
        res.statusCode = 400
        res.json({ error: 'name must be unique' })
    }

})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
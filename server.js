const express = require('express')
const app = express()
const moment = require('moment')
const bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')
const PORT = process.env.PORT || 3001
const Info = require('./models/info')
var mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :body :res[content-length] - :response-time ms'))

const formatInfo = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person.id
    }
}

app.get('/api/persons', (req, res) => {
    Info
        .find({})
        .then(result => {
            console.log(result )
            res.json(result.map(formatInfo))
        })
})

app.get('/info', (req, res) => {
    const len = persons.length
    const date = moment().format()
    res.send('<div>puhelinluettelossa ' + len + ' henkilön tiedot <br/> ' +date+' </div>')
})

app.get('/api/persons/:id', (req, res) => {
    Info
    .findById(req.params.id)
    .then(info => {
      if (info) {
        res.json(formatInfo(info))
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    
    Info
    .findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

const checkValidity = (person) => {
    Info
    .find({})
    .then(result => {
        const e = result.filter(r => r.name === person.name).length
        console.log('chekissä')
        return e
    })
}

app.post('/api/persons', async (req, res) => {
    const person = req.body

    const persons = await Info.find({})
    const uniq = persons.filter(p => p.name === person.name).length === 0
    
    if (uniq) {
        console.log('jälkeen check')
        id = Math.floor(Math.random()*50)
        person.id = id

        const uusi = new Info(person)
        uusi
        .save()
        .then(response => {
            res.json(id)
        })
    } else {
        res.statusCode = 400
        res.json({ error: 'name must be unique' })
    }
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body
    
    const info = {
        name: body.name,
        number: body.number
    }

    Info
    .findByIdAndUpdate(request.params.id, info, { new: true } )
    .then(updatedInfo => {
      response.json(formatInfo(updatedInfo))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
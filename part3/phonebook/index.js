require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())

morgan.token("request-body", (req) => JSON.stringify(req.body))

app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :request-body'
))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

const infoHtml = () => {
    const now = new Date()
    let html = `<div>Phonebook has info for ${persons.length} people</div>`
    html += `<p>${now}</p>`
    return html
}

app.get('/info', (request, response) => {
    const now = new Date()
    response.send(infoHtml())
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({error: 'malformed id'})
        })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
            response.status(400).send()
        })
})

const generateId = () => {
  return String(Math.floor(Math.random() * 1000))
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

//   const existing = persons.find(person => person.name === body.name)
//   if (existing) {
//     return response.status(400).json({ 
//       error: 'name already exists in phonebook' 
//     })
//   }

  const person = new Person({
    name: body.name,
    number: body.number || null,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number || null,
    id: id,
  }

  persons = persons.map(p => p.id === id ? person : p)

  response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const http = require('http')
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { response } = require('express')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function getBody (req) {
    return req.bodyStr === "{}" ? "" : req.bodyStr
})

const assignBody = (req, res, next) => {
    req.bodyStr = JSON.stringify(req.body)
    next()
}

app.use(assignBody)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons  = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/' , (request, response) => {
    response.send('Hello World')
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br>${Date()}`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    console.log(`get people id ${request.params.id}`)
    Person.findById(request.params.id)
        .then(people => {
            response.json(people)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log(`delete people id ${request.params.id}`)
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) =>{
    const body = request.body

    const people  = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, people, {new : true})
        .then(updatedPeople => {
            response.json(updatedPeople)
        })
        .catch(error => next(error))
})

const generateId = () => {
    const maxId= persons.length > 0 ? Math.max(...persons.map(people => people.id)) : 0
    return maxId + 1
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    console.log("Add people ", body)
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    /*
    const people = persons.find(people => people.name === body.name)
    if (people) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    */
    const people  = new Person({
        name: body.name,
        number: body.number,
    })

    people.save()
        .then(savedPeople => {
            response.json(savedPeople)
        })
        .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError'){
        console.error('ValidationError')
        return response.status(400).send({error: error.message})
    }
}

app.use(errorHandler)

const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
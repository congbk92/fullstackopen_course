const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
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
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const people = persons.find(people => people.id === id)
    console.log(people)
    if (people) {
        response.json(people)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(`delete people ${id}`)
    persons = persons.filter(people => people.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId= persons.length > 0 ? Math.max(...persons.map(people => people.id)) : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
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
    const people = persons.find(people => people.name === body.name)
    if (people) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPeople  = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(newPeople)
    response.json(newPeople)
})

const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
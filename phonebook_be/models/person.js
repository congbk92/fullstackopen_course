const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`Connecting to ${url}`)

mongoose.connect(url)
        .then(result => {
            console.log("Successful connect to MongoDB")
        })
        .catch(error => {
            console.log('Error connecting to MongoDB:', error.message)
        })

const PersonSchema = new mongoose.Schema({
  name: {
      type: String,
      minlength: 3,
      required: true
    },
  number: String
})

PersonSchema.set('toJSON', {
    transform:  (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('person', PersonSchema)
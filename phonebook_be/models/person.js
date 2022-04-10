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

const validateNumber = num => {
    if (num.length < 8){
        return false
    } else return /^\d{2,3}-[\d]+$/.test(num)
}
const PersonSchema = new mongoose.Schema({
  name: {
      type: String,
      minlength: 3,
      required: true
    },
  number:{
      type: String,
      validate: {
        validator: validateNumber,
        message: props => `${props.value} is not a valid phone number!`
      },
      require: true
  }
})

PersonSchema.set('toJSON', {
    transform:  (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('person', PersonSchema)
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://dbUser:${password}@cluster0.cbwtb.mongodb.net/phonebookDb?retryWrites=true&w=majority`


mongoose.connect(url)
const PersonSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', PersonSchema)

if (process.argv.length === 5){
    const record = {
        name: process.argv[3],
        number: process.argv[4]
    }
    const person = new Person(record)
    person.save().then(result => {
        console.log(`added ${record.name} number ${record.number} to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3){
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        });
        mongoose.connection.close()
    })
}
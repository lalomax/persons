const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  //   `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
  `mongodb+srv://lalomax365:${password}@cluster0.5iirjck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.phone)
    })
    mongoose.connection.close()
  })
  // process.exit(1);
}

if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    phone: number,
  })

  person.save().then(() => {
    console.log('Added! ' + name + ' ' + number + ' to phonebook')
    mongoose.connection.close()
  })
}

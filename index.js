require ('dotenv').config()
const express = require("express");
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json());
app.use(express.static('dist'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))



// getting all persons
app.get("/api/persons", (request, response) => {
  // response.json(persons);
  Person.find({}).then((result) => {
    response.json(result);
    // mongoose.connection.close();
  });
});

// getting info
app.get("/info", (request, response) => {
  // const entries = persons.length;
  // const entries = 0;
  Person.countDocuments({}).then((result) => {
    
    response.send(
      `<p>Phonebook has info for ${result} people</p><br><p>${local}</p>`
    );
  })
  var utc = new Date();
  var local = new Date(utc.getTime());
});

// getting one person
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
});

// deleting one person
app.delete("/api/persons/:id", (request, response) => {
  Person.deleteOne({ _id: request.params.id }).then(result => {
    console.log(result);
  })
  response.status(204).end();
});

// adding new entries
app.post("/api/persons", (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

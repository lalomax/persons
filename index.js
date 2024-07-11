require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body ")
);

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
  });
  var utc = new Date();
  var local = new Date(utc.getTime());
});

// getting one person
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

// deleting one person
app.delete("/api/persons/:id", (request, response) => {
  Person.deleteOne({ _id: request.params.id }).then((result) => {
    console.log(result);
  });
  response.status(204).end();
});


// adding new entries
app.post("/api/persons", async (request, response, next) => {
  const body = request.body;
  // const checkUser = await Person.exists({ name: body.name });

  if (body.name === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  })
  .catch((error) => next(error));

  // if (checkUser) {
    // return response.status(400).json({ error: "name must be unique" });
  // } else {
  
  // }
});

// updating one person

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const app = express();
const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// getting all persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// getting info
app.get("/info", (request, response) => {
  const entries = persons.length;
  var utc = new Date();
  var local = new Date(utc.getTime());
  response.send(
    `<p>Phonebook has info for ${entries} people</p><br><p>${local}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

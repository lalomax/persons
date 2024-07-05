const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
  //   `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
  `mongodb+srv://lalomax365:${password}@cluster0.5iirjck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Note = mongoose.model("Note", noteSchema);

if (process.argv.length < 4) {
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note.name, note.phone);
    });
    mongoose.connection.close();
  });
  // process.exit(1);
}

if (process.argv.length === 5) {
  const note = new Note({
    name: name,
    phone: number,
  });

  note.save().then((result) => {
    console.log("Added! " + name + " " + number + " to phonebook");
    mongoose.connection.close();
  });
}

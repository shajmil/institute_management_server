const autoIncrement = require('mongoose-auto-increment');
const mongodbURI = process.env.MONGODB_URI;
const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const client = new MongoClient(mongodbURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
client
  .connect(mongodbURI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
console.log("hello");
const connection = mongoose.createConnection(mongodbURI);

const user = mongoose.model(
  "teachers",
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    address: String,
    gender: String,
    img: { data: Buffer, contentType: String },
    course: String,
    instituteId:String
  },
  "teachers"
);
const student = mongoose.model(
  "students",
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    address: String,
    gender: String,
    img: { data: Buffer, contentType: String },
    course: String,
    teacher: String,
    fees: Number,
    instituteId:String
  },
  "students"
);
const classes = mongoose.model(
  "class",
  {
    fees: String,
    className: String,
    description: String,
    instituteId:String
  },
  "class"
);
// Enable auto-increment plugin for the connection
autoIncrement.initialize(connection);

// Create the admin schema
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  instituteId: {
    type: Number,
    unique: true
  }
});

// Add auto-increment plugin to the admin schema
adminSchema.plugin(autoIncrement.plugin, {
  model: 'admin',
  field: 'instituteId',
  startAt: 1,
  incrementBy: 1
});

// Create the admin model
const admin = connection.model('admin', adminSchema, 'admin');
module.exports = {
  user,
  admin,
  classes,
  student,
};

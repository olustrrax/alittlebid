const express       = require('express')
const firebase      = require('firebase')
const bodyParser    = require('body-parser')
const cors          = require('cors')

var config = {
  apiKey: "AIzaSyDsN_j_LgVaA17S0rC9erZeERN4mLedrVw",
  authDomain: "egco427-project.firebaseapp.com",
  databaseURL: "https://egco427-project.firebaseio.com",
  projectId: "egco427-project",
  storageBucket: "egco427-project.appspot.com",
  messagingSenderId: "281207958459"
};

firebase.initializeApp(config);

app = express()
port = process.env.PORT || 8081

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/userListRoutes')
routes(app)

var productRoutes = require('./api/routes/productListRoutes')
productRoutes(app)

app.listen(port)
console.log('Server started on:'+port)

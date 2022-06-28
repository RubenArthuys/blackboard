var mongoose = require('mongoose')

//Mongoose options
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

//Mongoose connect
mongoose.connect('mongodb+srv://rubenarth:XH2uztbN9ttgnTVQ@cluster0.v5blhg2.mongodb.net/blackboard?retryWrites=true&w=majority', 
  options,
  function (err) {
    if (err) {
        console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
        console.info("connexion a blackboard réussie");
    }
  }
)
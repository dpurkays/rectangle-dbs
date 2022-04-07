const mongoose = require('mongoose');

function connect () {
    
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true, })
    .then(() => console.log('connected to db!'))
    .catch(err => console.log(err));
}
    
module.exports =  {connect};
  
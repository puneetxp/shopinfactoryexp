let mongoose = require('mongoose');

const server = 'mongodb+srv://shopinfactory:shop%40%23factory@shopinfactory.ntm86.mongodb.net/shopinfactory';



mongoose.connect(server, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db=mongoose.connection;

// db.listCollections().toArray(function(err, collInfos) {
//     console.log(collInfos);
// });
//Bind connection to error event (to get notification of connection errors)

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports=db;
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Property = require('./schema.js').Property;
const mdbUri = process.env.DROP_MDB_URI;

const server = app.listen(process.env.PORT || 3000, listen);

function listen(){
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening at http://' + host + ':' + port);
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/prop', propResult);

app.post('/addloc', function (req, res) {
  let info = req.body;
  res.send('POST request to the homepage')
  console.log(info);
})

function propResult(req, res){
  const data = req.query;
  // const drink_fount = data.drink_fount;
  // const bathrooms = data.bathrooms;
  
  buildQuery(data)
    .then(result => search(result))
  
  //console.log(Object.keys(data));
  
  //search for df & br
}

function buildQuery(data){
  return new Promise(resolve => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    let query = "";
    for (let i = 0; i < keys.length; i++) {
      query = query + "'" + keys[i] + "'" + ": "+ values[i]
      if(i < keys.length - 1){
        query = query + ", "
      }
    }
    resolve(query);
  })
}

function search(query){
  console.log(query);
  
  mongoose.connect(mdbUri);
  console.log('DB Connected');
  
  Property.find({query}, function(err, docs){
    if (err) {
      //res.send(err)
      console.log(err);
      mongoose.disconnect();
      console.log('DB Disconnected');
    } else {
      //res.send(docs);
      console.log(docs);
      mongoose.disconnect();
      console.log('DB Disconnected');
    }
  })
}

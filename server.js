let express = require('express');
let app = express();
let mongoose = require('mongoose');
let schema = require('./schema.js').Property;
let mdbUri = process.env.DROP_MDB_URI;

let server = app.listen(process.env.PORT || 3000, listen);

function listen(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

app.get('/api/prop', propResult);

function propResult(req, res){
  let data = req.query;
  console.log(data);
}

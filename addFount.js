//db.properties.aggregate({ $sample: { size: 1 } })
//db.dropDatabase()

let fs = require('fs');
let schema = require('./schema.js').Property;
let mongoose = require('mongoose');

//[0]Property Name,[1]Property Number,[2]Site Name,[3]Site ID,[4]Borough,[5]Community Board,[6]Drinking Fountains
let fileNameFount = 'drinking_fountains.csv';
let data;
let readableStream = fs.createReadStream(fileNameFount);

let numFountains = [];
let site_id = [];
let site_name = [];
let prop_num = [];

readableStream.setEncoding('utf8');

readableStream.on('data', function(chunk) {
    data += chunk;
});

mongoose.connect('mongodb://localhost:12345/drop');

readableStream.on('end', function() {
  let csvData = data.split('\n');

  makeArrays(csvData).then(updateDocs());

  //if there's a result, update the document with appropriate info
    //if drink_fount == true add new info, else switch to true and add info
  //else add the prop_num and site_name to a list
})

function makeArrays(data){
  return new Promise(resolve => {
    for (let i = 0; i < data.length; i++) {
      let row = data[i].split(',');
      prop_num.push(row[1]);
      site_name.push(row[2]);
      site_id.push(row[3]);
      numFountains.push(row[6])
    }
  })
}

function updateDocs() {

  let count = prop_num.length

  for (var i = 0; i < prop_num.length; i++) {
    let prop = prop_num[i]
    Property.find({'properties.omppropid': prop_num[i] }, function(err, doc){
      console.log(prop);

      if (err) {
        mongoose.disconnect();
        console.log('err DB Disconnected ' + err);
      } else if (doc.length > 0){
        count = count - 1;
        console.log('Doc');

        let property = new Property({
          properties.drink_fount: true,
        })
      } else{
        count = count - 1;
        fs.appendFileSync('drinking_fountain_wo_prop.txt', prop + '\n')
        console.log('No doc');
      }

      if (count == 0){
        mongoose.disconnect();
        console.log('DB Disconnected');
      }
    })
  }
}

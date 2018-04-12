//db.properties.aggregate({ $sample: { size: 1 } })
//db.dropDatabase()

let fs = require('fs');
let schema = require('./schema.js').Property;
let mongoose = require('mongoose');

//[0]Property Name,[1]Property Number,[2]Site Name,[3]Site ID,[4]Borough,[5]Community Board,[6]Drinking Fountains
let fileNameFount = 'drinking_fountains.csv';
let data;
let readableStream = fs.createReadStream(fileNameFount);
readableStream.setEncoding('utf8');

readableStream.on('data', function(chunk) {
    data += chunk;
});

readableStream.on('end', function() {
  let csvData = data.split('\n');
  let numFountains = [];
  let site_id = [];
  let site_name = [];
  let prop_num = [];


  for (var i = 0; i < csvData.length; i++) {
    let row = csvData[i].split(',');
    prop_num.push(row[1]);
    site_name.push(row[2]);
    site_id.push(row[3]);
    numFountains.push(row[6])
  }
  console.log(site_name);

  //search db for prop_num
  //if there's a result, update the document with appropriate info
    //if drink_fount == true add new info, else switch to true and add info
  //else add the prop_num and site_name to a list
})

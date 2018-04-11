let fs = require('fs');
let schema = require('./schema.js');

let fileNameParks = 'parks_properties_data.geojson';
let content = fs.readFileSync(fileNameParks);
let jsonContent = JSON.parse(content);


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



console.log(schema);

  // for (var i = 0; i < csvData.length; i++) {
  //   //[0]Property Name,[1]Property Number,[2]Site Name,[3]Site ID,[4]Borough,[5]Community Board,[6]Drinking Fountains
  //   let row = csvData[i].split(',');
  //   prop_num.push(row[1]);
  //   site_name.push(row[2]);
  //   site_id.push(row[3]);
  //   numFountains.push(row[6])
  // }
  //
  // for (var i = 0; i < jsonContent.features.length; i++) {
  //   jsonContent.features[i].properties.drink_fount = false;
  //   jsonContent.features[i].properties.df_info = [];
  //   jsonContent.features[i].properties.bathrooms = false;
  //   jsonContent.features[i].properties.br_info = [];
  //
  //   console.log(jsonContent.features[i]);
  //
  // }
})

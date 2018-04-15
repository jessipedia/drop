let fs = require('fs');
let schema = require('./schema.js').Property;
let mongoose = require('mongoose');


let fileNameFount = 'bathrooms.tsv';
let data;
let readableStream = fs.createReadStream(fileNameFount);

let site_loc = [];
let site_name = [];
let year_round = [];
let access = [];

readableStream.setEncoding('utf8');

readableStream.on('data', function(chunk) {
    data += chunk;
});

mongoose.connect('mongodb://localhost:12345/drop');

readableStream.on('end', function() {
  let csvData = data.split('\n');

  makeArrays(csvData).then(updateDocs());

})

function makeArrays(data){
  //[0]Name, [1]Location,	[2]Open Year-Round,	[3]Handicap Accessible,	[4]Borough,	[5]Comments
  return new Promise(resolve => {
    //console.log(data);
    for (let i = 0; i < data.length; i++) {
      let row = data[i].split('\t');

      site_loc.push(row[1]);
      site_name.push(row[0]);
      year_round.push(row[2]);
      access.push(row[3]);

    }
  })
}

function updateDocs() {

  let count = site_name.length

  for (var i = 0; i < site_name.length; i++) {
    let siteLoc = site_loc[i];
    let siteName = site_name[i];
    let yearRound = year_round[i];
    let isAccess = access[i];


    Property.find({'properties.eapply': siteName }, function(err, doc){
      //console.log(siteName);
      if (err) {
        mongoose.disconnect();
        console.log('err DB Disconnected ' + err);
      } else if (doc.length > 0){
        count = count - 1;
        doc[0].properties.bathrooms = true;
        fountObj = {
          site_name: siteName,
          site_location: siteLoc,
          year_round: toBoolean(yearRound),
          accessible: toBoolean(isAccess)

        }

        doc[0].properties.br_info.push(fountObj);
        doc[0].save();
        console.log(count);
      } else{
        count = count - 1;
        fs.appendFileSync('bathrooms_wo_loc.txt', siteName + '\n')
        console.log(count);
      }

      if (count == 0){
        mongoose.disconnect();
        console.log('DB Disconnected');
      }
    })
  }
}

function toBoolean(value){
  if(value == 'Yes'){
    return true
  } else {
    return false
  }
}

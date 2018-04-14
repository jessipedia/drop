let fs = require('fs');
let schema = require('./schema.js').Property;
let mongoose = require('mongoose');

//[0]Name, [1]Location,	[2]Open Year-Round,	[3]Handicap Accessible,	[4]Borough,	[5]Comments
let fileNameFount = 'Directory_Of_Toilets_In_Public_Parks.csv';
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

  makeArrays(csvData)//.then(updateDocs());

})

function makeArrays(data){
  return new Promise(resolve => {
    console.log(data);
    // for (let i = 0; i < data.length; i++) {
    //   let row = data[i].split(',');
    //   prop_num.push(row[1]);
    //   site_name.push(row[2]);
    //   site_id.push(row[3]);
    //   numFountains.push(row[6])
    // }
  })
}

function updateDocs() {

  let count = prop_num.length

  for (var i = 0; i < prop_num.length; i++) {
    let prop = prop_num[i];
    let siteId = site_id[i];
    let siteName = site_name[i];
    let num = numFountains[i];

    Property.find({'properties.omppropid': prop_num[i] }, function(err, doc){
      //console.log(prop);
      if (err) {
        mongoose.disconnect();
        console.log('err DB Disconnected ' + err);
      } else if (doc.length > 0){
        count = count - 1;
        doc[0].properties.drink_fount = true;
        fountObj = {
          num: num,
          site_id: siteId,
          site_name: siteName

        }

        doc[0].properties.df_info.push(fountObj);
        doc[0].save();
        console.log(count);
      } else{
        count = count - 1;
        fs.appendFileSync('drinking_fountain_wo_prop.txt', prop + '\n')
        console.log(count);
      }

      if (count == 0){
        mongoose.disconnect();
        console.log('DB Disconnected');
      }
    })
  }
}

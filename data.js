let fs = require('fs');
let schema = require('./schema.js').Property;
var mongoose = require('mongoose');

let fileNameParks = 'parks_properties_data.geojson';
let content = fs.readFileSync(fileNameParks);
let jsonContent = JSON.parse(content);

let count = jsonContent.features.length;

mongoose.connect('mongodb://localhost:12345/drop');

for (var i = 0; i < jsonContent.features.length; i++) {

  let prop = jsonContent.features[i];

  let property = new Property ({
    type: prop.type,
     properties:
      { us_congres: prop.properties.us_congres,
        mapped: toBoolean(prop.properties.mapped),
        global_id: prop.properties.global_id,
        zipcode: prop.properties.zipcode,
        acres: prop.properties.acres,
        location: prop.properties.location,
        typecatego: prop.properties.typecatego,
        commission: prop.properties.commission,
        url: prop.properties.url,
        permitpare: prop.properties.permitpare,
        eapply: prop.properties.eapply,
        parentid: prop.properties.parentid,
        gispropnum: prop.properties.gispropnum,
        acquisitio: prop.properties.acquisitio,
        retired: toBoolean(prop.properties.retired),
        subcategor: prop.properties.subcategor,
        jurisdicti: prop.properties.jurisdicti,
        objectid: prop.properties.objectid,
        communityb: prop.properties.communityb,
        name311: prop.properties.name311,
        permitdist: prop.properties.permitdist,
        pip_ratabl: prop.properties.pip_ratabl,
        department: prop.properties.department,
        precinct: prop.properties.precinct,
        permit: prop.properties.permit,
        omppropid: prop.properties.omppropid,
        gisobjid: prop.properties.gisobjid,
        signname: prop.properties.signname,
        address: prop.properties.address,
        nys_assemb: prop.properties.nys_assemb,
        class: prop.properties.class,
        nys_senate: prop.properties.nys_senate,
        councildis: prop.properties.councildis,
        borough: prop.properties.borough,
        waterfront: prop.properties.waterfront,
        drink_fount: false,
        df_info: [],
        bathrooms: false,
        br_info: []
      },
     geometry: { type: prop.geometry.type, coordinates: prop.geometry.coordinates },
     created: new Date()
  })

  property.save(function(err) {
    if (err) {
      console.log("Complete Error saving: " + err);
    } else{
      count = count - 1
      console.log(count);
    }
    if (count == 0){
      mongoose.disconnect();
    }
  })
}

function toBoolean(value){
  if(value == 'False'){
    return false
  } else if (value == 'True'){
    return true
  }
}

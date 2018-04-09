let fs = require('fs');

let fileNameParks = 'parks_properties_data.geojson';
let content = fs.readFileSync(fileNameParks);
let jsonContent = JSON.parse(content);

let fileNameFount = 'drinking_fountains.csv';

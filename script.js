//console.log(parks.features.length);
//Property Name,Property Number,Site Name,Site ID,Borough,Community Board,Drinking Fountains
let fountains = "drinking_fountains.csv";
let csvData;
let siteId = [];
let numFountains = [];
readTextFile(fountains)

var mymap = L.map('mapid').setView([40.7531114, -73.9450298], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: config.MY_KEY
}).addTo(mymap);


for (var i = 0; i < parks.features.length; i++) {

  //console.log(parks.features[i].properties.omppropid);
  console.log(parks.features[i]);
  L.geoJSON(parks.features[i]).addTo(mymap)

}

console.log(parks.features.length);

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                csvData = allText.split('\n');
                for (var i = 0; i < csvData.length; i++) {
                  let row = csvData[i].split(',');
                  siteId.push(row[3]);
                  numFountains.push(row[6]);

                }
                //console.log(csvData);
                console.log(siteId);
                console.log(numFountains);
            }
        }
    }
    rawFile.send(null);
}

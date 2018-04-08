//console.log(parks.features);

var mymap = L.map('mapid').setView([40.7531114, -73.9450298], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: config.MY_KEY
}).addTo(mymap);

for (var i = 0; i < parks.features.length; i++) {

  console.log(parks.features[i]);
  L.geoJSON(parks.features[i]).addTo(mymap)

}

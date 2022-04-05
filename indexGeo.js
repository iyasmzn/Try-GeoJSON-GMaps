// Check for the various File API support.

let map;

function initMap() {
  let infoBox = document.getElementById('info-box')

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -7, lng: 109 },
  });
  // NOTE: This uses cross-domain XHR, and may not work on older browsers.
  // map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/google.json');
  map.data.loadGeoJson('./maps/multipolygon.geojson');
  // map.data.loadGeoJson('https://iniedu.com/geojson/maps.json');

  map.data.setStyle(function(feature) {
    var TA = feature.getProperty('TA')
    var color = TA == '04. Mangunweni' ? 'red' : 'violet'
    const visible = TA == '04. Mangunweni' ? true : false
    return {
      fillColor: color,
      strokeWeight: 0,
      fillOpacity: 1,
      // visible: visible
    };
  });

  map.data.addListener('click', function(event) {
    map.data.overrideStyle(event.feature, {strokeWeight: 2, fillOpacity: 1});
    infoBox.textContent = event.feature.getProperty('TA');
  });
  map.data.addListener('mouseover', function(event) {
    map.data.overrideStyle(event.feature, {strokeWeight: 1, fillOpacity: .5});
  });

  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
  });
}
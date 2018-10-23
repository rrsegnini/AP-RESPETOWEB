function myMap(mapName) {
    let mapOptions = {
        center: new google.maps.LatLng(9.858052, -83.914426),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new google.maps.Map(document.getElementById(mapName), mapOptions);
    let marker = new google.maps.Marker({
        position: {lat: 9.858052, lng: -83.914426},
        map: map,
        title: 'Denuncia'
    });
}

function myMap() {
    let mapOptions = {
        center: new google.maps.LatLng(9.858052, -83.914426),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    let marker = new google.maps.Marker({
        position: {lat: 9.858052, lng: -83.914426},
        map: map,
        title: 'Denuncia'
    });
}

function heatMap(){
	var heatmapData = [
	  new google.maps.LatLng(37.782, -122.447),
	  new google.maps.LatLng(37.782, -122.445),
	  new google.maps.LatLng(37.782, -122.443),
	  new google.maps.LatLng(37.782, -122.441),
	  new google.maps.LatLng(37.782, -122.439),
	  new google.maps.LatLng(37.782, -122.437),
	  new google.maps.LatLng(37.782, -122.435),
	  new google.maps.LatLng(37.785, -122.447),
	  new google.maps.LatLng(37.785, -122.445),
	  new google.maps.LatLng(37.785, -122.443),
	  new google.maps.LatLng(37.785, -122.441),
	  new google.maps.LatLng(37.785, -122.439),
	  new google.maps.LatLng(37.785, -122.437),
	  new google.maps.LatLng(37.785, -122.435)
	];

	var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

	map = new google.maps.Map(document.getElementById("googleMap"), {
	  center: sanFrancisco,
	  zoom: 13,
	  mapTypeId: 'satellite'
	});

	var heatmap = new google.maps.visualization.HeatmapLayer({
	  data: heatmapData
	});
	heatmap.setMap(map);
}

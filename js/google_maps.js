function myMap() {
    let mapOptions = {
        center: new google.maps.LatLng(9.858052, -83.914426),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    let marker = new google.maps.Marker({
        position: {lat: 9.858052, lng: -83.914426},
        map: map,
        title: 'Denuncia'
    });
}
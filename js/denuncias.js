var map, infoWindow, denuncia, slocation;
var prueba = "Variable Global";
var mLocation = null;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 13,
        mapTypeId: 'roadmap'
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Ubicación actual');
            infoWindow.open(map);
            map.setCenter(pos);
            mLocation = pos;

            // console.log(mLocation)
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));
            mLocation = place.geometry.location;
            slocation = {nombre: place.name,
                        latitud : place.geometry.location.lat(),
                        longitud: place.geometry.location.lng()};
            firebase.database().ref("search_locations").push(slocation);
            console.log(slocation);
            // console.log(place);
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
    prueba = "Variable Local"

    return mLocation;
    // console.log(mLocation);
}
function saveDenuncia() {
    var mDescripcion;
    var mAliasM = firebase.auth().currentUser.email;;
    var user = firebase.auth().currentUser.uid;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    var datetime = today;
    /*Aca va el codigo con el que se obtiene la informacion
    de los INPUTS con la instruccion
     document.getElementById("ID").value;
     Todos los INPUT del HTML debe
     tener un id (id="el_id")*/
    mDescripcion = document.getElementById("txt_descripcion").value;
    console.log(mDescripcion);
    var index = mAliasM.indexOf("@");
    var mAlias = mAliasM.substr(0, index);
    var select_location = document.getElementById("select_ubicacion");
    var selection = select_location.options[select_location.selectedIndex].value;

    if (selection === "0") {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            mLocation = pos;
                denuncia = {
                    descripcion: mDescripcion,
                    latitud: mLocation.lat,
                    longitud: mLocation.lng,
                    fechaHora: datetime,
                    idUsuario: user,
                    alias: mAlias
                };
                firebase.database().ref("denuncias").push(denuncia);
            Alert("Denuncia agregada correctamente")
        });
    } else if(selection === "5"){
        var db = firebase.database();
        var ref = db.ref("search_locations").orderByKey().limitToLast(1);
        // Query lastQuery = databaseReference.child("mp").orderByKey().limitToLast(1);
        ref.on("child_added", function(snapshot) {
            console.log('new record', snapshot.val());
            denuncia = {
                descripcion: mDescripcion,
                latitud: snapshot.val().latitud,
                longitud: snapshot.val().longitud,
                fechaHora: datetime,
                idUsuario: user,
                alias: mAlias
            };
            firebase.database().ref("denuncias").push(denuncia);
            Alert("Denuncia agregada correctamente")
        });
    } else if(selection === "2"){
        denuncia = {
            descripcion: mDescripcion,
            ubicacion: "En un taxi",
            fechaHora: datetime,
            idUsuario: user,
            alias: mAlias
        };
        firebase.database().ref("denuncias").push(denuncia);
        Alert("Denuncia agregada correctamente")
    } else if(selection === "3"){
        denuncia = {
            descripcion: mDescripcion,
            ubicacion: "En un uber",
            fechaHora: datetime,
            idUsuario: user,
            alias: mAlias
        };
        firebase.database().ref("denuncias").push(denuncia);
        Alert("Denuncia agregada correctamente")
    } else if(selection === "4"){
        denuncia = {
            descripcion: mDescripcion,
            ubicacion: "En casa",
            fechaHora: datetime,
            idUsuario: user,
            alias: mAlias
        };
        firebase.database().ref("denuncias").push(denuncia);
        Alert("Denuncia agregada correctamente")
    }
}

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }


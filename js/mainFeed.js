//import firebase from 'firebase';

/*
Main Function used to create the MAIN FEED
*/
 function mainFeed() {
    loadUserData();
    fetchReports();

}


/*
Function used to fetch reports from the Database
*/
function fetchReports(){
    var database = firebase.database();


    // Get a database reference to our posts
    var db = firebase.database();
    var ref = db.ref("denuncias").orderByKey();

    ref.on("child_added", function(snapshot, prevChildKey) {
        creatingHTMLelements(snapshot.val());
    });

    }



/*
Function used to load the user Data into the HTML page
*/
function loadUserData() {
      firebase.auth().onAuthStateChanged(user=>{
      if(user){
          //alert("Usuario loggeado");
          if (user) {
            // User is signed in.

              var name, email, photoUrl, uid, emailVerified;

              console.log("User's id" + user.uid);
              console.log("User's name" + user.email);


              var userId = firebase.auth().currentUser.uid;


              const dbRefObject = firebase.database().ref('usuarios').
              orderByChild("id").equalTo(userId).once('child_added',
                  function(snapshot) {
                      //set up user info in the HTML elements
                      settingUserHTMLelements(snapshot.val());
                  });

          } else {
            // No user is signed in.
            console.log("User not logged in");
          }
      } else{
        alert("Usuario desloggeado");
      }
      });
}


/*
Function used to set up HTML elements regarding the user that's logged in

Recieves the snapshot from the query information of the user
*/
function settingUserHTMLelements(snapshotVal) {

  //console.log(snapshotVal);
  //console.log(snapshotVal.alias)
    var userData = snapshotVal;
    document.getElementById("loggedUserUsername").innerHTML = userData.nombreCompleto;
    document.getElementById("loggedUserEmail").innerHTML= userData.email;
    //info contains pseudoname & gender
    document.getElementById("loggedUserInfo").innerHTML= userData.alias;
}



/*
Function used to create HTML elements after querying all the reports.
Basically creating the app's Main Feed

Recieves the snapshot from the query
*/
function creatingHTMLelements(snapshotVal) {
    var feedList = document.getElementById("feedList");
    var flag = false,
        latlon = [];
    //console.log(snapshotVal);

    var newPost =  snapshotVal;

    //variables creation
    var newReport = document.createElement("li"),
        usernameH = document.createElement("h3"),
        placeH = document.createElement("h5"),
        mapFrame = document.createElement("div"),
        breakSpace = document.createElement("br"),
        infoParagraph = document.createElement("p"),
        username = document.createTextNode(newPost.alias),
        place = document.createTextNode(newPost.idLugar),
        reportInfo = document.createTextNode(newPost.descripcion);

    //creating map id in iframe
    mapFrame.setAttribute("style", "width:100%;height:400px;");


    // adding text to elements
    usernameH.appendChild(username);
    placeH.appendChild(place);
    infoParagraph.appendChild(reportInfo);


    
    

    //adding link
    usernameH.setAttribute("href","#");

    // adding HTML elements to the new report Item
    newReport.appendChild(usernameH);
    

    //verifies if the report has a location given.
    if (snapshotVal.latitud !== undefined && snapshotVal.longitud !== undefined){
          latlon.push(snapshotVal.latitud);
          latlon.push(snapshotVal.longitud);
          //lat and long found
          flag = true;

          //adds the map frame to the report
          newReport.appendChild(mapFrame);
    } else {
      newReport.appendChild(placeH);

    }
    newReport.appendChild(infoParagraph);
    newReport.appendChild(breakSpace);

    // adding the new report Item to the HTML list items
    feedList.appendChild(newReport);

    if (flag) {
      //creating map
      initMap(mapFrame,latlon);
    }


}

//console.log("Author: " + newPost.alias);
//console.log("Description: " + newPost.descripcion);



// Initialize and add the map
/*
function initMap() {
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}



function initMap(htmlMap,coords) {
  var map = new google.maps.Map(htmlMap, {
    zoom: 13,
    center: {lat: coords[0], lng: coords[1]},
    mapTypeId: 'satellite'
  });
  var latLng = new google.maps.LatLng(coords[1],coords[0]);
  var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });

}
*/
function initMap(htmlMap,coords) {
        var myLatLng = {lat: coords[0], lng: coords[1]};

        var map = new google.maps.Map(htmlMap, {
          zoom: 15,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
      }



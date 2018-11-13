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
    var ref = db.ref("denuncias").orderByChild("fechaHora");

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
              orderByChild("id").equalTo(userId).once('value',
                  function(snapshot) {
                      //set up user info in the HTML elements

                      //ESTE METODO ESTABA DANDO ERROR TypeError: userData is null
                      /////////////////////////////////////////////////////settingUserHTMLelements(snapshot.val());
                      //Lo comente para que vea lo de la informacion del usuario en la consola
                  });

              return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
                  // ...
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
    var userData = snapshotVal;
    document.getElementById("loggedUserUsername").innerHTML = userData.nombreCompleto;
    document.getElementById("loggedUserEmail").innerHTML= userData.email;
    //info contains pseudoname & gender
    document.getElementById("loggedUserInfo").innerHTML= userData.alias + "\n" + userData.genero;
}



/*
Function used to create HTML elements after querying all the reports.
Basically creating the app's Main Feed

Recieves the snapshot from the query
*/
function creatingHTMLelements(snapshotVal) {
    var feedList = document.getElementById("feedList");

    //console.log(feedList);

    var newPost =  snapshotVal;

    //variables creation
    var newReport = document.createElement("li"),
        usernameH = document.createElement("h3"),
        datetimeH = document.createElement("h5"),
        infoParagraph = document.createElement("p"),
        username = document.createTextNode(newPost.alias),
        datetime = document.createTextNode(newPost.fechaHoraString),
        reportInfo = document.createTextNode(newPost.descripcion);





    // adding text to elements
    usernameH.appendChild(username);
    datetimeH.appendChild(datetime);
    infoParagraph.appendChild(reportInfo);


    //adding link
    usernameH.setAttribute("href","#");

    // adding HTML elements to the new report Item
    newReport.appendChild(usernameH);
    newReport.appendChild(datetimeH);
    newReport.appendChild(infoParagraph);


    // adding the new report Item to the HTML list items
    feedList.appendChild(newReport);

}

//console.log("Author: " + newPost.alias);
//console.log("Description: " + newPost.descripcion);

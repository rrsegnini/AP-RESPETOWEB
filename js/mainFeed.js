 function mainFeed() {
    //Variables
    var feedList = document.getElementById("feedList");



    //Functions

    function fetchReports(list){
        var database = firebase.database();


        // Get a database reference to our posts
        var db = firebase.database();
        var ref = db.ref("denuncias");

        ref.on("child_added", function(snapshot, prevChildKey, list) {
            var newPost = snapshot.val();
            var newReport = document.createElement("li"),
                usernameH = document.createElement("h3"),
                username = document.createTextNode(newPost.alias);

            console.log("Author: " + newPost.alias);
            console.log("Description: " + newPost.descripcion);


            // adding
            usernameH.appendChild(username);
            newReport.appendChild(usernameH);
            list.appendChild(newReport);
            ne

        });

    }


    //execute function
    fetchReports(feedList);


    var addReports = function(){



    };






}
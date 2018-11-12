 function mainFeed() {
    //Functions

    function fetchReports(){
        var database = firebase.database();


        // Get a database reference to our posts
        var db = firebase.database();
        var ref = db.ref("denuncias");

        ref.on("child_added", function(snapshot, prevChildKey) {
            creatingHTMLelements(snapshot.val());
            
        });

    }
    var addReports = function(){



    };


    //execute function
    fetchReports();



}



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
        


    //console.log("Author: " + newPost.alias);
    //console.log("Description: " + newPost.descripcion);

    // adding text to elements
    usernameH.appendChild(username);
    datetimeH.appendChild(datetime);
    infoParagraph.appendChild(reportInfo);

    // adding HTML elements to the new report Item
    newReport.appendChild(usernameH);
    newReport.appendChild(datetimeH);
    newReport.appendChild(infoParagraph);


    // adding the new report Item to the HTML list items
    feedList.appendChild(newReport);



}
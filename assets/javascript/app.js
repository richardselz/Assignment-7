 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBHljGJyonFx72WZpBnC4u46FErCsUw8mo",
    authDomain: "first-project-cbc-ccc91.firebaseapp.com",
    databaseURL: "https://first-project-cbc-ccc91.firebaseio.com",
    projectId: "first-project-cbc-ccc91",
    storageBucket: "first-project-cbc-ccc91.appspot.com",
    messagingSenderId: "828827239913"
  };
  firebase.initializeApp(config);

  //Easier reference for database service
  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	var trainName = $("#train-name-input").val().trim();
  	var trainDestination = $("#destination-input").val().trim();
  	var trainFirst = $("#first-train-input").val().trim();
  	var trainFrequency = $("#frequency-input").val().trim();
  	var trainNext = 0;
  	var trainMinutes = 0;
  	// var trainNext = First Time + Frequency
  	// var trainMinutes = Time of Arrival - Current Time

  	var newTrain = {
	  	name: trainName,
	  	destination: trainDestination,
	  	frequency: trainFrequency,
	  	next: trainNext,
	  	minutes: trainMinutes
	}

	database.ref("/trainData").push(newTrain);

  });


  //start of the update schedule
  database.ref("/trainData").on("child_added", function(childSnap) {

  	$("tbody").append("<tr><td>"+childSnap.val().name+"</td><td>"+childSnap.val().destination+"</td><td>"+childSnap.val().frequency+"</td><td>"+childSnap.val().next+"</td><td>"+childSnap.val().minutes+"</td></tr>");

  }, function(errorObj) {
  	console.log("Errors Handles: " + errorObj.code);
  });
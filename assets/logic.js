  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB5OplUTODl4BuCOsSLLLdMBaroNOxc09Q",
    authDomain: "train-project-89b7b.firebaseapp.com",
    databaseURL: "https://train-project-89b7b.firebaseio.com",
    projectId: "train-project-89b7b",
    storageBucket: "train-project-89b7b.appspot.com",
    messagingSenderId: "768272953892"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFirst = $("#first-train-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

var newTrain = {
    name: trainName,
    destination: trainDest,
    firstTrain: trainFirst,
    frequency: trainFrequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

    return false;
});

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().firstTrain;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFrequency);

  var tFrequency = trainFrequency;
  var firstTime = trainFirst;
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
  var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

  var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));
  var nextTrainTime = moment(nextTrain).format("hh:mm a");

$("#current-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrainTime + "</td><td>" + tMinutesTillTrain + "</td><td>");




});
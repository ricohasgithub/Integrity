
// Read the data from the firebase

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
    apiKey: "AIzaSyCnhYzqx8xAE3_wZT9nUMu_xUFZdpce1Rg",
    authDomain: "integrity-ed5a5.firebaseapp.com",
    databaseURL: "https://integrity-ed5a5.firebaseio.com",
    projectId: "integrity-ed5a5",
    storageBucket: "integrity-ed5a5.appspot.com",
    messagingSenderId: "388555029204",
    appId: "1:388555029204:web:34de47d43f8feca52ed941",
    measurementId: "G-9N1K8KZ5RG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize the database
let database = firebase.database();

// Retrieve the DOM element with the form ID for innerHTML rendering
let test = document.getElementById("form");

function getTest (roomId) {
    firebase.database().ref("/rooms/" + roomId).once("value").then(function(snapshot) {
        let testJson = snapshot.val().test;
        console.log(testJson);
    });
}

function parseForm () {

}

// Video initialization

let video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}

// Google forms objects render

function renderFormTitle (title, description) {
    let template = `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text"${description}</p>
        </div>
    </div>
    `;
    document.body.innerHTML = template;
}

renderFormTitle("Hello world!", "whatsup guys welcome to this awesome test!");

function renderWrittenResponse () {

}

function renderMultipleChoice () {

}

function renderCheckboxes () {

}
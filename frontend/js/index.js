var firebaseConfig = {
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
 

document.getElementById("teacher").onclick = () => {

    document.getElementById("teacher-prompt").style.visibility = "visible";

    // Firebase code for handling form

}
function callWhenGoogleFormAdded(){
  console.log("PLS RUN");
  var roomId = document.getElementById("room-link").value;
  var testData = document.getElementById("teacher-form").value;
  var createRoomwithTestData = firebase.database().ref('/rooms/' + roomId).set({url:testData});
      document.getElementById("teacher-prompt").style.visibility = "hidden";
  //var createStudentData = firebase.database().ref('/rooms/' + roomId + "/" + userId).push({studentData:"student test data"});
}
function studentJoining(){
  var roomId = document.getElementById("room-link").value;
  var studentName = document.getElementById("student-name").value;
    var createRoomwithTestData = firebase.database().ref('/rooms/' + roomId + "/users/" + studentName).set({cheatscore:"fill in with cheat score"});
    window.location.href = "..//room.html";
}
document.getElementById("student").onclick = () => {

    document.getElementById("student-prompt").style.visibility = "visible";

}

function closeOverlay(){
  var overlay = $('.overlay'),
    close = $('<div class="back">back</div>');

  $(overlay, close).on('click', function () {
    overlay.fadeOut();
});
}
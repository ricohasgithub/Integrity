

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  const auth = firebase.auth();

  function createNewUser() {

              var userEmail = document.getElementById('email').value;
              var userPassword = document.getElementById('password').value;

              const promise = auth.createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
                  window.alert("Error : " + errorMessage + " (code " + errorCode + ")");
    // ...
  });

              alert("Your account has been created");

            }

  function signIn(){
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;

    const promise = auth.signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
// ...
        window.alert("Error : " + errorMessage + " (code " + errorCode + ")");
// ...
});


  }

function signOut(){
  auth.signOut();
  alert("Signed out");
}

auth.onAuthStateChanged(function(user){
  if(user){
    alert("Signed In @ " + user.email);
//    window.location.href="whatever.html"; // send users to main page
  } else {
    alert("No active user");
  }
})

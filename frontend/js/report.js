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

let report = document.getElementById("report");

async function getStudentsFromRoom (roomId) {
    let templateHead = `
    <div class="card rendered" style="width: 50vw;">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Rico's Report</th>
                <th scope="col">% Absent</th>
                <th scope="col">% Away</th>
                <th scope="col">Face Illumination</th>
            </tr>
            </thead>
            <tbody>`;

    await firebase.database().ref("/rooms/" + roomId + "/students/Rico/").once("value").then(function(snapshot) {
        snapshot.forEach(function(childNodes){
            console.log(childNodes);
            templateHead += `
            <tr>
            <th scope="row">${childNodes.val().time}</th>
            <td>${childNodes.val().frameCheat}</td>
            <td>${childNodes.val().turnCheat}</td>
            <td>${childNodes.val().lightCheat}</td>
            </tr>`;
            console.log(childNodes.val().time);
            console.log(childNodes.val().name);
            console.log(childNodes.val().turnCheat);
        });
    });

    let templateTail =
    `</tbody>
    </table>
    </div>
    `;

    let template = templateHead + templateTail;
    console.log(template);

    let widget = document.createElement("div");
    widget.innerHTML = template;
    report.appendChild(widget);
}

function renderStudentReport (data) {
}

getStudentsFromRoom("chemistrytest");

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
var frameCheat = 0;
var notFrameCheat = 0;
var turnCheat = 0;
var notTurnCheat = 0;
var lightCheat = 0;

// Retrieve the DOM element with the form ID for innerHTML rendering
let test = document.getElementById("form");

function getTest (roomId) {
    firebase.database().ref("/rooms/" + roomId).once("value").then(function(snapshot) {
        let testJson = snapshot.val().test;
        console.log(testJson);
        parseForm(testJson);
    });
}

getTest("chemistrytest");

function parseForm (testJson) {

    renderFormTitle(testJson.testTitle, testJson.testDescription);

    // Iterate through the test/form questions and render each questions individually
    let questionsList = testJson.questions;

    for (question of questionsList) {
        console.log(question);
        let questionType = question.questionType;
        if (questionType === "Multiple Choice") {
            renderMultipleChoice(question.questionTitle, question.options);
        } else if (questionType === "Short Answer") {
            renderShortAnswer(question.questionTitle);
        } else if (questionType === "Written Response") {
            renderLongAnswer(question.questionTitle);
        } else if (questionType === "Checkboxes") {
            renderCheckboxes(question.questionTitle, question.options);
        }
    }

}

// Video initialization

let video = document.querySelector("#videoElement");
const ctrack = new clm.tracker();
ctrack.init();
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      ctrack.start(video);
      trackingLoop();
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}

// Google forms objects render

function renderFormTitle (title, description) {
    let template = `
    <div class="card rendered" style="width: 50vw;">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text"${description}</p>
        </div>
    </div>
    `;
    let widget = document.createElement("div");
    widget.innerHTML = template;
    test.appendChild(widget);
}

function renderShortAnswer (question) {
    let template = `
    <div class="card rendered" style="width: 50vw;">
        <div class="card-body">
            <label for="exampleFormControlTextarea1">${question}</label>
            <input type="email" class="form-control" id="exampleFormControlInput1">
        </div>
    </div>
    `;
    let widget = document.createElement("div");
    widget.innerHTML = template;
    test.appendChild(widget);
}

function renderLongAnswer (question) {
    let template = `
    <div class="card rendered" style="width: 50vw;">
        <div class="card-body">
            <label for="exampleFormControlTextarea1">${question}</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
    </div>
    `;
    let widget = document.createElement("div");
    widget.innerHTML = template;
    test.appendChild(widget);
}

function renderMultipleChoice (question, options) {

    let templateHead = `
    <div class="card rendered" style="width: 50vw;">
        <div class="card-body">
            <label for="exampleFormControlTextarea1">${question}</label>
    `;

    let templateTail =
    `</div>
    </div>`

    for (option of options) {
        templateHead += `<div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios">
            <label class="form-check-label" for="exampleRadios">${option}</label>
        </div>`;
    }

    let template = templateHead + templateTail;
    console.log(template);

    let widget = document.createElement("div");
    widget.innerHTML = template;
    test.appendChild(widget);

}

function renderCheckboxes (question, options) {

    let templateHead = `
    <div class="card rendered" style="width: 50vw;">
        <div class="card-body">
            <label for="exampleFormControlTextarea1">${question}</label>
    `;

    let templateTail =
    `</div>
    </div>`

    for (option of options) {
        templateHead += `<div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">${option}</label>
        </div>`;
    }

    let template = templateHead + templateTail;
    console.log(template);

    let widget = document.createElement("div");
    widget.innerHTML = template;
    test.appendChild(widget);

}

const overlay = $('#faceoverlay')[0];
const overlayCC = overlay.getContext('2d');

function trackingLoop() {
  // Check if a face is detected, and if so, track it.
  requestAnimationFrame(trackingLoop);

  let currentPosition = ctrack.getCurrentPosition();
  overlayCC.clearRect(0, 0, 200, 150);

  if (currentPosition) {
  // Draw facial mask on overlay canvas:
  ctrack.draw(overlay);

  // Get the eyes rectangle and draw it in red:
  const eyesRect = getEyesRectangle(currentPosition);
  overlayCC.strokeStyle = 'red';
  overlayCC.strokeRect(eyesRect[0], eyesRect[1], eyesRect[2], eyesRect[3]);
  const faceRect = getFaceRectangle(currentPosition);
  overlayCC.strokeStyle = 'blue';
  overlayCC.strokeRect(faceRect[0], faceRect[1], faceRect[2], faceRect[3]);

  // The video might internally have a different size, so we need these
  // factors to rescale the eyes rectangle before cropping:
  const resizeFactorX = video.videoWidth / video.width;
  const resizeFactorY = video.videoHeight / video.height;

  // Crop the eyes from the video and paste them in the eyes canvas:
  const eyesCanvas = $('#eyes')[0];
  const eyesCC = eyesCanvas.getContext('2d');
  const faceCanvas = $('#face')[0];
  const faceCC = faceCanvas.getContext('2d');

  eyesCC.drawImage(
    video,
    eyesRect[0] * resizeFactorX, eyesRect[1] * resizeFactorY,
    eyesRect[2] * resizeFactorX, eyesRect[3] * resizeFactorY,
    0, 0, eyesCanvas.width, eyesCanvas.height
  );
  faceCC.drawImage(
    video,
    faceRect[0] * resizeFactorX, faceRect[1] * resizeFactorY,
    faceRect[2] * resizeFactorX, faceRect[3] * resizeFactorY,
    0, 0, faceCanvas.width, faceCanvas.height
  );
// cheating detection for turning head left or right
  if(eyesRect[0]-faceRect[0] < (faceRect[2]/10) || (faceRect[0]+faceRect[2]) - (eyesRect[0]+eyesRect[2]) < (faceRect[2]/10) ){
    console.log("CHEATING");
    turnCheat++;
  } else {
    notTurnCheat++;
  }
  notFrameCheat++;
}else{
  console.log("CHEATING");
  frameCheat++;
}
}

function getEyesRectangle(positions) {
  const minX = positions[23][0] - 5;
  const maxX = positions[28][0] + 5;
  const minY = positions[24][1] - 5;
  const maxY = positions[26][1] + 5;

  const width = maxX - minX;
  const height = maxY - minY;

  return [minX, minY, width, height];
}

function getFaceRectangle(positions) {
  const minX = positions[0][0] - 5;
  const maxX = positions[14][0] + 5;
  const minY = positions[20][1] - 20;
  const maxY = positions[7][1];

  const width = maxX - minX;
  const height = maxY - minY;

  return [minX, minY, width, height];
}

// Track mouse movement:
const mouse = {
  x: 0,
  y: 0,

  handleMouseMove: function(event) {
    // Get the mouse position and normalize it to [-1, 1]
    mouse.x = (event.clientX / $(window).width()) * 2 - 1;
    mouse.y = (event.clientY / $(window).height()) * 2 - 1;
  },
}

document.onmousemove = mouse.handleMouseMove;

function getImage() {
  // Capture the current image in the eyes canvas as a tensor.
  return tf.tidy(function() {
    const eyesimage = tf.browser.fromPixels($('#eyes')[0]);
    const faceimage = tf.browser.fromPixels($('#face')[0]);
    // Add a batch dimension:
    const batchedImage = eyesimage.expandDims(0);
    const batchedfaceImage = faceimage.expandDims(0);
    // Normalize and return it:
    //console.log(batchedImage);
    return [batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1)), batchedfaceImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1))];
  });
}

const dataset = {
  train: {
    n: 0,
    x: null,
    y: null,
  },
  val: {
    n: 0,
    x: null,
    y: null,
  },
}

function captureExample() {
  // Take the latest image from the eyes canvas and add it to our dataset.
  tf.tidy(function() {
    const images = getImage();
    const image = images[0];
    const mousePos = tf.tensor1d([mouse.x, mouse.y]).expandDims(0);

    // Choose whether to add it to training (80%) or validation (20%) set:
    const subset = dataset[Math.random() > 0.2 ? 'train' : 'val'];

    if (subset.x == null) {
      // Create new tensors
      subset.x = tf.keep(image);
      subset.y = tf.keep(mousePos);
    } else {
      // Concatenate it to existing tensors
      const oldX = subset.x;
      const oldY = subset.y;

      subset.x = tf.keep(oldX.concat(image, 0));
      subset.y = tf.keep(oldY.concat(mousePos, 0));
    }

    // Increase counter
    subset.n += 1;
  });
}

$('body').keyup(function(event) {
  // On space key:
  if (event.keyCode == 32) {
    captureExample();

    event.preventDefault();
    return false;
  }
});

let currentModel;

function createModel() {
  const model = tf.sequential();

  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 20,
    strides: 1,
    activation: 'relu',
    inputShape: [$('#eyes').height(), $('#eyes').width(), 3],
  }));

  model.add(tf.layers.maxPooling2d({
    poolSize: [2, 2],
    strides: [2, 2],
  }));

  model.add(tf.layers.flatten());

  model.add(tf.layers.dropout(0.2));

  // Two output values x and y
  model.add(tf.layers.dense({
    units: 2,
    activation: 'tanh',
  }));

  // Use ADAM optimizer with learning rate of 0.0005 and MSE loss
  model.compile({
    optimizer: tf.train.adam(0.0005),
    loss: 'meanSquaredError',
  });

  return model;
}

function fitModel() {
  let batchSize = Math.floor(dataset.train.n * 0.1);
  if (batchSize < 4) {
    batchSize = 4;
  } else if (batchSize > 64) {
    batchSize = 64;
  }

  if (currentModel == null) {
    currentModel = createModel();
  }

  currentModel.fit(dataset.train.x, dataset.train.y, {
    batchSize: batchSize,
    epochs: 20,
    shuffle: true,
    validationData: [dataset.val.x, dataset.val.y],
  });
}

// $('#train').click(function() {
  //  fitModel();
  // saveModel();
   loadModel();
// });
// async function saveModel() {
//   const save = await currentModel.save('downloads://my-model');
// }
async function loadModel() {
  currentModel = await tf.loadLayersModel('https://raw.githubusercontent.com/ricozhuthegreat/Integrity/master/frontend/js/my-model.json');
  console.log(currentModel)
}

let coordinates = [];
async function moveTarget() {

  //console.log(currentModel)
  if (currentModel === null || currentModel === undefined) {
    //console.log("Model missing");
    return;
  }
  tf.tidy(function() {

    const images = getImage();
     image = images[0];

    const prediction = currentModel.predict(image);

    // Convert normalized position back to screen position:
    const targetWidth = $('#target').outerWidth();
    const targetHeight = $('#target').outerHeight();

    // It's okay to run this async, since we don't have to wait for it.
    prediction.data().then(prediction => {
      const x = ((prediction[0] + 1) / 2) * ($(window).width() - targetWidth);
      const y = ((prediction[1] + 1) / 2) * ($(window).height() - targetHeight);
      //console.log(x, y);
      coordinates.push([x, y]);

    //  console.log(document.elementFromPoint(x, y));

    //   if (document.elementFromPoint(x, y).className !== "overlay") {
    //     document.elementFromPoint(x, y).classList.add("highlight");
    //   }

      // Move target there:
      const $target = $('#target');
      $target.css('left', x + 'px');
      $target.css('top', y + 'px');
    });
  });
}
var luminances = [];
async function checkImage(){
  var c = document.getElementById("face");
  var ctx = c.getContext("2d");
  var imgData = ctx.getImageData(0, 0, 200, 150);
  var luminance = [];
  var sum = 0;
  // console.log(imgData);
  for(var y = 0; y < imgData.height; y++){
       for(var x = 0; x < imgData.width; x++){
           var i = (y * 4) * imgData.width + x * 4;
           var avg = (0.2126*imgData.data[i] + 0.7152*imgData.data[i + 1] + 0.0722*imgData.data[i + 2]) / 3;
           luminance.push(avg);
       }
   }
   for(var i = 0; i < luminance.length; i++){
     sum += luminance[i];
   }
   var average = sum/luminance.length;
   console.log("luminosity " + average);

   luminances.push(average);

   if(Math.abs(luminances[luminances.length-2] - average) > 3){
     console.log("CHEATING");
     lightCheat++;
   }
  // push eye coordinates to firebase to make heatmap or something;
}
async function checkCheat() {
  frameCheatPercent = frameCheat/notFrameCheat*100;
  turnCheatPercent = turnCheat/notTurnCheat*100;
  console.log("%1: " + frameCheatPercent)
  console.log("%2: " + turnCheatPercent)
  console.log("%2: " + lightCheat)
}
setInterval(checkImage, 5000);
setInterval(checkCheat, 30000);

setInterval(moveTarget, 100);

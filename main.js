objectDetector= "";

img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('dog_cat.jpg');
}


function setup() {
  canvas = createCanvas(385 ,385 );
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect( video , gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video ,  0 , 0 ,  385, 386);

      if(status != "")
      {
          r = random( 256 );
          g = random( 256 );
          b = random( 256 );

          objectDetector.detect(video , gotResult );


        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("number_of_objects").innerHTML = "number of objects detcted are : " + objects.length;

          fill(r, g, b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r, g, b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}

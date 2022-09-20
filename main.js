video ="";
status="";
objects= [];

function preload() {
    video = createCapture(VIDEO);
    video.size(480, 380);
}

function setup() {
    canvas = createCanvas(480 ,380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480 ,380);
    if (status !="") 
    {
        objectDetector.detect(video , gotResult);
        for (i = 0;  i < objects.length; i++) 
        {
           document.getElementById("Status").innerHTML = "Status :  Objects Detected";
           document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are: "+ objects.length;

           fill("#FF0000");
           percent = floor(objects[i].cofidence * 100);
           text(objects[i].label +""+ percent+"%"+ objects[i].x + 15 + objects[i].y + 15);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x , objects[i].y ,objects[i].width ,objects[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("Status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error ,results) {
    if (error) 
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
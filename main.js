var state = "";
var obj = [];
var Obj_detector = "";
var video = "";
function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(canvas.width, canvas.height);
    video.hide();
}
function start(){
    Obj_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Object detection status "+ " : "+state;
}
function modelLoaded(){
    console.log("Model Loaded");
    state = true;
}
function draw(){
    image(video, 0, 0, 640, 420);
    if(state != ""){
        Obj_detector.detect(video, gotResults);
        for(var i = 0; i < obj.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("no").innerHTML = "No of objects detected : "+obj.length
            var confidence = floor(obj[i].confidence * 100);
            r = random(255);
            g = random(255);
            b = random(255);

            fill(r, g, b);
            text(obj[i].label + " " + confidence + " % ", obj[i].x+10, obj[i].y+15);
            noFill();
            stroke(r, g, b);
            rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
        }
    }
}

function gotResults(error, results){
    if(error){
        console.error(error)
    }else{
        console.log(results);
        obj = results;
    }
}

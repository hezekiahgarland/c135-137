objects=[];
video="";
status="";
function preload(){
    video=createVideo("video.mp4");
   video.hide();
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}
function start(){
    model = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "status : object detector started"
}
function modelloaded(){
    console.log("modelloaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
image(video,0,0,480,380)
if (status !=""){
    model.detect(video, getresults);
}
for(i=0; i<objects.length; i++){
    objectname=objects[i].label;
    objectaccurcay=floor(objects[i].confidence*100);
    objx=objects[i].x;
    objy=objects[i].y;
    objwidth=objects[i].width;
    objheight=objects[i].height;
    fill("red")
    text(objectname +" "+objectaccurcay+"%",objx,objy)
    noFill();
    stroke("blue");
    rect(objx,objy,objwidth,objheight);
}

}
function getresults(e,r){
    if(e){
        console.error(e);
    }
    else{
        console.log(r);
        objects=r;
    }
}
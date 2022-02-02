function setup()
{
    canvas = createCanvas(650, 480);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}

 
 status1 = "";
 objects = [];
 percent = 0;
 song = "";
 img = "";

 function preload()
{
     //song = loadSound("music.mp3");
     img = loadImage("baby.jpg");
}

function draw()
{
    image(img, 0, 0, 650, 480);
    if(status1 !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResults);
        for(i=0; i<objects.length; i++)
        {
            
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are:" + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);


        }
    }
    
}

function modelLoaded()
{
    console.log("Model is Loaded!");
    status1 = true;
    
}

function gotResults(error, results)
{
   if(error)
   {
       console.log(error);
   }

   else
   {
       console.log(results);
       objects = results;
      
   }
}


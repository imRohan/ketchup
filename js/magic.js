//Rohan Likhite

// Acceleration
var ax = 0;
var ay = 0;
var az = 0;

// Timer
var clicked = false;
var sec = 0;
var min = 0;
var pomodoros = 0;
var pomMins = 25; //minutes
var oneMin = 60; //seconds
var breakTime = false; //after one pom
var resume = false; 
var lastPom = 0;
var minDisplay = 0;
var clock;



function startClock() {
    if (clicked === false) {
        clock = setInterval("stopWatch()", 1000);
        clicked = true;
    } else if (clicked === true) {}


}

function stopWatch() {
    lastPom = pomodoros;
    if (pomodoros > 0 && breakTime) {
        document.body.style.backgroundColor = "#2ECC71";
        document.getElementById("labelIcon").src = "images/success.svg";
        document.getElementById("labelIcon").className = "symbol";
        document.getElementById("bottomTag").innerHTML = "Take a 5 min break";
        

    }
    if (!breakTime) {
        document.getElementById("labelIcon").src = "images/logo.svg";
        document.getElementById("labelIcon").className = "symbol fa-spin";
        document.getElementById("bottomTag").innerHTML = "25 min = 1 Pomodoro";
    }
    min = Math.floor(sec / oneMin);
    pomodoros = Math.floor(min / pomMins);
    if (pomodoros - lastPom == 1) {
        breakTime = true;
    }
    minDisplay = min % pomMins;
    document.getElementById("timer").innerHTML = minDisplay;
    document.getElementById("pomNum").innerHTML = pomodoros;
    sec++;
    console.log(sec);
  

}

function stopClock() {
    //alert(resume);
    document.getElementById("timer").innerHTML = "";
    document.getElementById("pomNum").innerHTML = "";
    if (!resume && pomodoros > 0) {
        sec = 0;
        pomodoros = 0;
        min = 0;
        window.clearInterval(clock);
    }
    window.clearInterval(clock);
    pomodoros = lastPom;    
    clicked = false;
}

function pauseClock() {
    //alert("on pause");

    clicked = false;
    breakTime = false;
    lastPom = pomodoros;
    resume = true;
   



}


if (window.DeviceMotionEvent == undefined) {
    document.getElementById("no").style.display = "block";
    document.getElementById("yes").style.display = "none";
} else {

    window.ondevicemotion = function (event) {
        ax = Math.round(Math.abs(event.accelerationIncludingGravity.x * 1));
        ay = Math.round(Math.abs(event.accelerationIncludingGravity.y * 1));
        az = Math.round(Math.abs(event.accelerationIncludingGravity.z * 1));
        ai = Math.round(event.interval * 100) / 100;

        if (ax !== 0 | ay !== 0) {
            if (breakTime) {
                pauseClock();
                stopClock();
            } else if (!breakTime) {
                stopClock()                
                document.getElementById("bottomTag").innerHTML = "A Pomodoro Timer";
                document.body.style.backgroundColor = "#D9304F";
                
                if(minDisplay > 0){
                  document.getElementById("line1").innerHTML = "Place your phone down to resume the timer.";
                  document.getElementById("total").innerHTML = "Don't Stop!";
                  document.getElementById("line2").innerHTML = "";
                  document.body.style.backgroundColor = "#F2E638";  
                }
            }
            if (lastPom > 0) {
                document.getElementById("line1").innerHTML = "Take a little break";
                document.getElementById("line2").innerHTML = "WOAH!";
                document.getElementById("total").innerHTML = "<b>" + lastPom + "<br/>Poms Done";
                document.body.style.backgroundColor = "#04BF55";
            }

            document.getElementById("leveled").style.display = "none";
            document.getElementById("notLeveled").style.display = "block";




        } else {
            startClock()
            document.getElementById("notLeveled").style.display = "none";
            document.getElementById("leveled").style.display = "block";
            if (!breakTime) {
                document.body.style.backgroundColor = "#D9304F";
                document.getElementById("bottomTag").innerHTML = "25 min = 1 Pomodoro";
            }


        }

    }


}
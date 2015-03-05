// Acceleration
var ax = 0;
var ay = 0;
var az = 0;

var clicked = false;
var sec = 0;
var min = 0;
var pomodoros = 0;
var time = 10;

function startClock() {
    if (clicked === false) {
        clock = setInterval("stopWatch()", 1000);
        clicked = true;
    }
    else if (clicked === true) {
    }
}

function stopWatch() {
    min = Math.round(sec / 60);
    pomodoros = Math.round(min / 25);
    sec++; 
    document.getElementById("sec").innerHTML = sec;
    document.getElementById("timer").innerHTML = min;
    if(pomodoros >= 1){
    document.getElementById("pomNum").innerHTML = pomodoros;
    }
}

function stopClock() {
    window.clearInterval(clock);
    sec = 0;
    pomodoros = 0;
    min = 0;
    document.getElementById("timer").innerHTML="";
   
    document.getElementById("pomNum").innerHTML = "";
    
    clicked = false;
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
            stopClock() 
            document.getElementById("leveled").style.display = "none";
            document.getElementById("notLeveled").style.display = "block";
            document.body.style.backgroundColor = "#e74c3c";

        } else {
            startClock()
            document.getElementById("notLeveled").style.display = "none";
            document.getElementById("leveled").style.display = "block";
            document.body.style.backgroundColor = "#D24D57";


        }

    }

    setInterval(function () {
        document.getElementById("xlabel").innerHTML = "X: " + ax;
        document.getElementById("ylabel").innerHTML = "Y: " + ay;
        document.getElementById("zlabel").innerHTML = "Z: " + az;

    }, delay);
}


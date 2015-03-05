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
var pomMins = 2;
var breakTime = false;
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
        document.getElementById("labelIcon").className += "symbol";
        document.getElementById("bottomTag").innerHTML = "Take a 5 min break";

    }
    if (!breakTime) {
        document.getElementById("labelIcon").src = "images/logo.svg";
        document.getElementById("labelIcon").className = "symbol fa-spin";
        document.getElementById("bottomTag").innerHTML = "25 min = 1 Pomodoro";
    }
    min = Math.floor(sec / 10);
    pomodoros = Math.floor(min / pomMins);
    if (pomodoros - lastPom == 1) {
        breakTime = true;
    }
    minDisplay = min % pomMins;
    sec++;
    console.log(sec);
    document.getElementById("timer").innerHTML = minDisplay;
    document.getElementById("pomNum").innerHTML = pomodoros;

}

function stopClock() {
    //alert(resume);
    if (!resume) {
        sec = 0;
        pomodoros = 0;
        min = 0;
        window.clearInterval(clock);
    }
    window.clearInterval(clock);
    pomodoros = lastPom;
    document.getElementById("timer").innerHTML = "";
    document.getElementById("pomNum").innerHTML = "";
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
                document.body.style.backgroundColor = "#E26A6A";
            }
            if (lastPom > 0) {
                document.getElementById("line1").innerHTML = "You can take a 5 min break";
                document.getElementById("total").innerHTML = lastPom + "<br/> Pomodoros Completed";
                document.body.style.backgroundColor = "#2ECC71";
            }

            document.getElementById("leveled").style.display = "none";
            document.getElementById("notLeveled").style.display = "block";




        } else {
            startClock()
            document.getElementById("notLeveled").style.display = "none";
            document.getElementById("leveled").style.display = "block";
            if (!breakTime) {
                document.body.style.backgroundColor = "#E26A6A";
                document.getElementById("bottomTag").innerHTML = "25 min = 1 Pomodoro";
            }


        }

    }


}
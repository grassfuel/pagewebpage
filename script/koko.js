var light = document.getElementById("light");
var conveyer = document.getElementById("conveyer");
var windowsize = document.getElementById("windowsize");
var sidehandle = document.getElementById("sidehandle");
var platform_button = document.getElementById("buttonbox");
var selector_switch = document.getElementById("selector_switch");
var dig = 0;
var tinko = selector_switch.offsetHeight / 1.5;
var fuck = 30 / (selector_switch.offsetWidth / 2);
conveyer.style.top = "100%";
sidehandle.style.top = "0px";
sidehandle.style.right = "-200%";
platform_button.style.top = "100%";

var sound_toggle = new Audio('./sound/toggle.ogg');


sidehandle.ondragstart = function(){
    return false;
}
selector_switch.ondragstart = function(){
    return false;
}


switchafter = function(){
    timecount+=1;
    if(timecount > 50){
        light.style.borderColor = "#ffcc00";
        light.style.backgroundColor = "#ffcc00";
    }
    if(parseInt(sidehandle.style.right) < 0 && timecount > 100){
        sidehandle.style.right = parseInt(sidehandle.style.right) + 10 +"%";
        conveyer.style.top = parseInt(conveyer.style.top) + -5 + "%"
    }
    if(timecount < 200){
        window.requestAnimationFrame(switchafter);
    }
}

sidehandle.onmousedown = function(e){
    fg = e.clientY - parseInt(sidehandle.style.top,10);
    function getXY(e){
        var y = e.clientY;
        if(parseInt(sidehandle.style.top,10) >= 0 && parseInt(sidehandle.style.top,10) + sidehandle.offsetHeight <= windowsize.clientHeight){
            handlestyle = sidehandle.offsetHeight / 2.5 / (windowsize.clientHeight - sidehandle.offsetHeight);
            sidehandle.style.top = y-fg + "px";
            platform_button.style.top = windowsize.clientHeight - parseInt(sidehandle.style.top,10) - parseInt(sidehandle.style.top,10) * handlestyle + "px";
//          conveyer.style.top = windowsize.clientHeight - y + "px";
        }
        else{
            document.removeEventListener("mousemove",getXY);
            if(parseInt(sidehandle.style.top,10) < 0){
                sidehandle.style.top = 0 + "px";
            }
            if(parseInt(sidehandle.style.top,10) + sidehandle.offsetHeight > windowsize.clientHeight){
                sidehandle.style.top = windowsize.clientHeight - sidehandle.offsetHeight + "px";
            }
        }
    }
    document.addEventListener("mousemove",getXY);
    sidehandle.onmouseup = function(){
        document.removeEventListener("mousemove",getXY);
    }
}

selector_switch.onmousedown = function(e){
    var selector_switchstartX = e.clientX;
    var selector_switchstartY = e.clientY;
    console.log(selector_switch.style.transform);
    function switchON(e){
        selector_switchcatchX = e.clientX - selector_switchstartX;
        selector_switchcatchY = e.clientY - selector_switchstartY;
        selector_switchstartX = e.clientX;
        if(dig < 30){
            dig += fuck*selector_switchcatchX;
            selector_switch.style.transform = "rotate(" + dig + "deg)";
        }else{
            if(selector_switchcatchY > tinko){
                selector_switch.style.transform = "rotate(90deg)";
                sound_toggle.play();
                document.removeEventListener("mousemove",switchON);
                timecount = 0;
                switchafter();
                console.log(parseInt(sidehandle.style.right));
            }
        }
        
    }
    document.addEventListener("mousemove",switchON);
    selector_switch.onmouseup = function(){
        document.removeEventListener("mousemove",switchON);
    }
}

/*
function getXY(e){
    y = e.clientY - fy;
    fy = e.clientY;
    if(parseInt(sidehandle.style.top,10) >= 0 && parseInt(sidehandle.style.top,10) + sidehandle.offsetHeight <= windowsize.clientHeight){
            sidehandle.style.top = parseInt(sidehandle.style.top) + y + "px";
            conveyer.style.top = windowsize.clientHeight - y - 0.1 + "px";
    }
}
*/
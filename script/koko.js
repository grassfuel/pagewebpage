windowsize = document.getElementById("windowsize");
sidehandle = document.getElementById("sidehandle");
sidehandle.style.top = "0px";
sidehandle.style.right = "-200%";
conveyer.style.top = "100%";
conveyer = document.getElementById("conveyer");
button = document.getElementById("button1");
light = document.getElementById("light");
fuck = 30 / (button.offsetWidth / 2);
tinko = button.offsetHeight / 1.5;
dig = 0;

switchafter = function(){
    timecount+=1;
    if(timecount > 50){
        light.style.backgroundColor = "#ffcc00";
        light.style.borderColor = "#ffcc00";
    }
    if(parseInt(sidehandle.style.right) < 0 && timecount > 100){
        sidehandle.style.right = parseInt(sidehandle.style.right) + 2 +"%";
        conveyer.style.top = parseInt(conveyer.style.top) + -1 + "%"
        console.log(sidehandle.style.right);
        console.log(conveyer.style.top);
    }
    window.requestAnimationFrame(switchafter);
}




sidehandle.ondragstart = function(){
    return false;
}
button.ondragstart = function(){
    return false;
}


sidehandle.onmousedown = function(e){
    fg = event.clientY - parseInt(sidehandle.style.top,10);
    function getXY(e){
        var y = event.clientY;
        if(parseInt(sidehandle.style.top,10) >= 0 && parseInt(sidehandle.style.top,10) + sidehandle.offsetHeight <= windowsize.clientHeight){
            handlestyle = sidehandle.offsetHeight / (windowsize.clientHeight - sidehandle.offsetHeight);
            sidehandle.style.top = y-fg + "px";
            conveyer.style.top = windowsize.clientHeight - parseInt(sidehandle.style.top,10) - parseInt(sidehandle.style.top,10) * handlestyle + "px";
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

button.onmousedown = function(e){
    var buttonstartX = e.clientX;
    var buttonstartY = e.clientY;
    console.log(button.style.transform);
    function switchON(e){
        buttoncatchX = e.clientX - buttonstartX;
        buttoncatchY = e.clientY - buttonstartY;
        buttonstartX = e.clientX;
        if(dig < 30){
            dig += fuck*buttoncatchX;
            button.style.transform = "rotate(" + dig + "deg)";
        }else{
            if(buttoncatchY > tinko){
                button.style.transform = "rotate(90deg)";
                document.removeEventListener("mousemove",switchON);
                timecount = 0;
                switchafter();
                console.log(parseInt(sidehandle.style.right));
            }
        }
        
    }
    document.addEventListener("mousemove",switchON);
    button.onmouseup = function(){
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
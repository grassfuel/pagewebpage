windowsize = document.getElementById("windowsize");
sidehandle = document.getElementById("sidehandle");
conveyer = document.getElementById("conveyer");
sidehandle.style.top = "0px";
handlestyle = sidehandle.offsetHeight / (windowsize.clientHeight - sidehandle.offsetHeight);
sidehandle.ondragstart = function(){
    return false;
};
sidehandle.onmousedown = function(e){
    fg = event.clientY - parseInt(sidehandle.style.top,10);
    function getXY(e){
        var y = event.clientY;
        if(parseInt(sidehandle.style.top,10) >= 0 && parseInt(sidehandle.style.top,10) + sidehandle.offsetHeight <= windowsize.clientHeight){
            handlestyle = sidehandle.offsetHeight / (windowsize.clientHeight - sidehandle.offsetHeight);
            sidehandle.style.top = y-fg + "px";
            conveyer.style.top = windowsize.clientHeight - parseInt(sidehandle.style.top,10) - parseInt(sidehandle.style.top,10) * handlestyle + "px";
//            conveyer.style.top = windowsize.clientHeight - y + "px";
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

function konnitiha(){
    console.log("よみこめました");
    console.log(windowsize.clientHeight);
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


konnitiha();
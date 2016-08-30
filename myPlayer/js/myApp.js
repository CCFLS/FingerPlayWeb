/**
 * Created by seven on 2016/8/21.
 */
window.onload = function () {
    var myApp = {
        init:function(){
            var h = window.innerHeight;
            var w = window.innerWidth;
            document.getElementById("contentBox").style.height = 0.8*h + "px";
            document.getElementById("contentBox").style.width = 0.8*w + "px";
            document.getElementById("contentBox").style.top = (h - 0.9*h)/2 + "px";
            document.getElementById("contentBox").style.left = (w - 0.8*w)/2 + "px";
            document.getElementById("battlefield").style.width = 0.8*w - 440 + "px";
            document.getElementById("adversaryInfo").style.height = 0.8*h  - 220 + "px";
            document.getElementById("myselfInfo").style.height = 0.8*h  - 220 + "px";
            document.getElementById("modalBox").style.height = h + "px";
        }
    };
    myApp.init();
};
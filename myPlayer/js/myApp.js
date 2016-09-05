/**
 * Created by seven on 2016/8/21.
 */
window.onload = function () {

};
$(function(){
    function myApp(){
        this.init();
    }
    myApp.prototype = {
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
            var userData = this.getRequest();
            this.setUserImage(userData);
            this.setUserName(userData);
            this.setUserHP(userData);
        },
        finger:function(){

        },
        setUserImage:function(data){
            $("#myself").children().attr("src","images/face/img_shidao.jpg");
        },
        setUserName:function(data){
            $("#myselfInfo").children('h6').html(data.userName);
        },
        setUserHP:function(data){
            $("#myselfInfo").children('span').html("HP："+10);
        },
        getRequest:function(){
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = {};
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                str = str.split("&");
                for(var i = 0,len = str.length;i<len;i++){
                    theRequest[str[i].split("=")[0]] = decodeURI(str[i].split("=")[1]);
                }
            }
            console.log(JSON.parse(theRequest.userData));
            return JSON.parse(theRequest.userData);
        }

    };
    var myAppGame = new myApp();
});
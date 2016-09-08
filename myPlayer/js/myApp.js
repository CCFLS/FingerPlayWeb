/**
 * Created by seven on 2016/8/21.
 */
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
            this.isDisabled();
            var that = this;
            $.ajax({
                // url: 'http://101.200.228.199:8080/checkTheOtherSide',
                url:'data/check.json',
                data: {},
                dataType: 'json',
                beforeSend: function(){
                    console.log("ready");
                },
                error: function(){
                    console.log("error");
                },
                success: function(data){
                    // console.log(data);
                    if(data.error !== "OK"){
                        return;
                    }
                    var adversaryData = data.data;
                    adversaryData.userHP = 10;
                    // console.log(adversaryData);
                    that.setAdversaryImage(adversaryData);
                    that.setAdversaryName(adversaryData);
                    that.setAdversaryHP(adversaryData);
                },
                complete: function(){
                    console.log("complete");
                }
            });
            //点击选择手势
            $("#finger").on("click",function(){
                $("#modalBox").show(500);
            });
            //选择手势
            $("#gesture").on("click",function(e){
                // console.log($(e.target));
                $(this).children('span').removeClass("checkedGesture");
                $(e.target).parent('span').addClass("checkedGesture");
                that.isDisabled();
            });
            //点击确定按钮
            $("#confirm").on("click",function () {
                that.finger(userData);
            });
            //点击关闭按钮
            $(".close").on("click",function(){
                $(this).parent().hide(500);
                $(".checkedGesture").removeClass("checkedGesture");
                that.isDisabled();
            });
            //点击外层关闭按钮，内层同样关闭
            $('#modalBox>.close').on('click',function(){
                $("#alertAction").hide();
            });
            //提交失败界面确定按钮
            $("#alertAction").children('button').on("click",function(){
                $(this).parent().hide(500);
                $(".checkedGesture").removeClass("checkedGesture");
                that.isDisabled();
            });
        },
        isDisabled:function(){
            //未选择手势，禁用确定按钮
            if($('#gesture>.checkedGesture').length === 0){
                $("#confirm").attr('disabled',true);
            }else{
                $("#confirm").attr('disabled',false);
            }
        },
        finger:function(data){
            var params = {};
            params.userToken = data.userToken;
            params.action = $(".checkedGesture").attr('id').slice(-1);
            params = JSON.stringify(params);
            params = "params="+params;
            console.log(params);
            $.ajax({
                // url: 'http://101.200.228.199:8080/checkTheOtherSide',
                url:'data/sumbitAction.json',
                data: {},
                dataType: 'json',
                beforeSend: function(){
                    console.log("ready");
                },
                error: function(){
                    console.log("error");
                },
                success: function(data){
                    console.log(data);
                    if(data.error !== "OK"){
                        $("#alertAction").show();
                        $("#alertAction").children("h1").html("服务器未响应，请重新选择手势！");
                        return;
                    }
                    $("#modalBox").hide(500);
                },
                complete: function(){
                    console.log("complete");
                }
            });
        },
        setUserImage:function(data){
            $("#myself").children().attr("src",data.userImage);
        },
        setUserName:function(data){
            $("#myselfInfo").children('h6').html(data.userName);
        },
        setUserHP:function(data){
            $("#myselfInfo").children('span').html("HP："+data.userHP);
        },
        setAdversaryImage:function(data){
            // $("#adversary").children().attr("src",data.userImage);
        },
        setAdversaryName:function(data){
            $("#adversaryInfo").children('h6').html(data.userName);
        },
        setAdversaryHP:function(data){
            $("#adversaryInfo").children('span').html("HP："+data.userHP);
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
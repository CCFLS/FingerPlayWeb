/**
 * Created by Chenxl on 2016/8/30.
 */
$(function(){
    function myGame(){
        this.init();
    }
    myGame.prototype = {
        init:function(){
            $(".modalBox").height(window.innerHeight);
            //选择人物
            $("#heroBox").on("click",function(e){
                //console.log(e.target);
                $(".heroChecked").show();
                $(e.target).hide();
                //console.log($(e.target).prev());
                var imgSrc = $(e.target).prev().attr("src");
                return imgSrc;
            });
            //点击登录游戏
            $("#login").on("click",function () {
                $("#loginModal").show(500);
            });
            //点击关闭按钮
            $(".close").on("click",function(){
                $(this).parent().hide(500);
            });
            //点击参战
            var that = this;
            $("#join").on("click",function(){
                var parmas = {
                    "userName": that.getUserName(),
                    "type": that.getType(this)
                };
                parmas = JSON.stringify(parmas);
                parmas = "parmas="+parmas;
                console.log(parmas);
                $.ajax({
                    type:  'GET',
                    // url: 'http://101.200.228.199:8080/initUserStatus',
                    url:'data/login.json',
                    data: parmas,
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
                        var userData = data.data;
                        window.location.href = "myPlayer.html?userData="+JSON.stringify(userData);
                    },
                    complete: function(){
                        console.log("complete");
                    }
                });
            });
        },
        getUserName:function(){
            //console.log($("#username").val());
            return $("#username").val();
        },
        getType:function(data){
            //console.log($(data).val());
            return $(data).val();
        },
        getUserImage:function(data){
            return data;
        }
    };
    var myGameStart = new myGame();
});
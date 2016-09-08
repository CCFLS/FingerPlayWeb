/**
 * Created by Chenxl on 2016/8/30.
 */
$(function(){
    function myGame(){
        this.init();
    }
    myGame.prototype = {
        init:function(){
            var that = this;
            $("#username").focus();
            //光标离开用户名输入框
            $("#username").on("blur",function () {
                that.checkUserName();
            });
            //点击参战
            $(".modalBox").height(window.innerHeight);
            //选择人物
            $("#heroBox>.hero").on("click",function(e){
                console.log(e.target);
                $(".heroChecked").show();
                $(".onlyChecked").removeClass("onlyChecked");
                $(e.target).parent().addClass("onlyChecked");
                $(".onlyChecked").children('div').hide();
            });
            //点击登录游戏
            $("#login").on("click",function () {
                $("#loginModal").show(500);
            });
            //点击关闭按钮
            $(".close").on("click",function(){
                $(this).parent().hide(500);
            });
            $("#join").on("click",function(){
                var params = {
                    userName: that.getUserName(),
                    type: that.getType(this)
                };
                var userImgSrc = that.getUserImage();
                params = JSON.stringify(params);
                params = "params="+params;
                console.log(params);
                // $.ajax({
                //     type:  'GET',
                //     url: 'http://101.200.228.199:8080/initUserStatus',
                //     // url:'data/login.json',
                //     data: params,
                //     dataType : 'jsonp',
                //     jsonp:"jsoncallback",
                //     // jsonpCallback: 'getName',
                //     beforeSend: function(){
                //         console.log("ready");
                //     },
                //     error: function(){
                //         console.log("error");
                //     },
                //     success: function(data){
                //         console.log(data);
                //         if(data.error !== "OK"){
                //             return;
                //         }
                //         var userData = data.data;
                //         userData.userImage = userImgSrc;
                //         userData.userHP = 10;
                //         console.log(userData);
                //         window.location.href = "myPlayer.html?userData="+JSON.stringify(userData);
                //     },
                //     complete: function(){
                //         console.log("complete");
                //     }
                // });
                $.ajax({
                    type:  'GET',
                    // url: 'http://101.200.228.199:8080/initUserStatus',
                    url:'data/login.json',
                    data: params,
                    dataType : 'json',
                    beforeSend: function(){
                        console.log("ready");
                    },
                    error: function(){
                        console.log("error");
                    },
                    success: function(data){
                        console.log(data);
                        if(data.error !== "OK"){
                            return;
                        }
                        var userData = data.data;
                        userData.userImage = userImgSrc;
                        userData.userHP = 10;
                        console.log(userData);
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
        getUserImage:function(){
            var imgSrc = $(".onlyChecked").children("img").attr("src");
            // console.log(imgSrc);
            return imgSrc;
        },
        checkUserName:function(){
            console.log($("#username").val());
            if($("#username").val()===""){
                $("#userCheckInfo").html("请输入用户名");
                $("#username").focus();
            }
        },
        isDisabled:function(){
            //未选择，禁用确定按钮
            if($('#gesture>.checkedGesture').length === 0){
                $("#confirm").attr('disabled',true);
            }else{
                $("#confirm").attr('disabled',false);
            }
        }
    };
    var myGameStart = new myGame();
});
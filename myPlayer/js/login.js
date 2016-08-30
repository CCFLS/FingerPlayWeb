/**
 * Created by Chenxl on 2016/8/30.
 */
$(function(){
    $(".modalBox").height(window.innerHeight);
    $("#login").on("click",function () {
        $.ajax( {
            type:  'GET',
            url: 'http://HOST:PORT/FingerPlay/initUserStatus',
            data: {"userName":"", "type":""},
            dataType: 'json',
            beforeSend: function(){ },
            error: function(){ },
            success: function(){ },
            complete: function(){ }
        } )
    })
});
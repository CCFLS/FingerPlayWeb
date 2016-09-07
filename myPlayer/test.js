/**
 * Created by Chenxl on 2016/9/6.
 */
$.ajax({
    url: 'http://www.wp.com/getData.php',       //跨域到http://www.wp.com，另，http://test.com也算跨域
    type: 'GET',
    dataType: 'jsonp',                          //指定为jsonp类型
    data: {
        "name": "Zjmainstay"
    },                //数据参数
    jsonp: 'callback',                          //服务器端获取回调函数名的key，对应后台有$_GET['callback']='getName';callback是默认值
    jsonpCallback: 'getName',                   //回调函数名
    success: function (result) {                  //成功执行处理，对应后台返回的getName(data)方法。
        $("#myData").html('1、My name is ' + result.name + '.I\'m ' + result.age + ' years old.<br />');
    }
    ,
    error: function (msg) {
        alert(msg.toSource());                 //执行错误
    }
})
;

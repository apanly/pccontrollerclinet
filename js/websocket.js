;
var socket=null;
var connectlimit=3;
var debug=false;
var util={
    init:function(){
        if(debug){
            this.host="127.0.0.1:1234";
        }else{
            this.host="192.168.192.191:1234";
        }
        this.sconnect();
    },
    log:function(msg){
        //console.log(msg);
    },
    close:function(){
        if(socket!=null){
            this.log("Goodbye!");
            socket.close();
            socket = null;
        }else{
            this.log("WebSocket Has closed!");
        }

    },
    connect:function(){
        if(socket==null){
            this.sconnect();
        }
    },
    sconnect:function(){
        var that=this;
        var host = "ws://"+this.host+"/ws.py";
        try {
            socket = new WebSocket(host);
            that.log("正在连接");
            socket.onopen = function (msg) {
                //socket.send('I am the client and I\'m listening!');
                connectlimit=3;
                that.log("连接成功");
            };
            socket.onmessage = function (msg) {
                    //that.log(msg.data);
                console.log("wlog:"+msg.data)
                var cmd=msg.data;
                 if(cmd=="prev"){
                    $(".deck-prev-link").click();
                 }else if(cmd=="next"){
                    $(".deck-next-link").click();
                 }else if(cmd=="refresh"){
                    window.location.href=window.location.href;
                 }else if(/^\d+$/.test(cmd)){
                     $("#goto-slide").val(cmd);
                     $(".goto-form").submit();
                 }
            };
            socket.onclose = function (msg) {
                socket=null;
                that.log("连接失败");
                connectlimit--;
                if(connectlimit>0){
                    that.sconnect();
                }
            };
        }
        catch (e) {
            this.log("error");
        }
    }
};
$(document).ready(function(){
    util.init();
});

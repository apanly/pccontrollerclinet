;
function controll(cmd){
    $.ajax({
        type:'GET',
        url:"ctr.php?cmd="+cmd,
        dataType:'json',
        success:function(res){
            console.log(res);
        }
    });
}

$(document).ready(function(){
    $("#ninebox .home").click(function(){
        controll(1);
    });
    $("#ninebox .prev").click(function(){
        controll("prev");
    });
    $("#ninebox .refresh").click(function(){
        controll("refresh");
    });
    $("#ninebox .next").click(function(){
        controll("next");
    });
    $("#ninebox .go").click(function(){
        var page=parseInt($.trim($("#page").val()));
        controll(page);
    });
});
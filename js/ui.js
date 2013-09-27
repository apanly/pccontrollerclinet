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
    $("#ui li").each(function(index){
        $(this).click({'flag':index},function(event){
            if(index===0){
                controll("prev");
            }else{
                controll("next");
            }

        });
    });
});
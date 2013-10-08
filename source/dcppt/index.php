<?php
function dateToMicroTime($idate){
    return strtotime($idate." 08:00:00")*1000;
}
$resdata=file_get_contents("tt.log");
if($resdata){
    $tmparr=explode("\n",$resdata);
    $data['unit']="W";
    $data['source'] = array();
    $data['categories'] = array();
    $tmpsource=array();
    foreach($tmparr as $item){
        $tmpitem=explode(",",$item);
        $data['categories'][]=dateToMicroTime($tmpitem[0]);
        $tmpsource[]=(int)($tmpitem[1]/10000);
    }
    $data['source'][]=array(
        "name"=>"pv",
        "data"=>$tmpsource
    );
    echo  json_encode($data);exit();
}else{
    $ret=array();
    for($i=90;$i>0;$i--){
        $idate=date("Y-m-d",strtotime("-{$i} day"));
//    $ret[]=array(
//      $idate=>getPv($idate)
//    );
        echo $idate.",".getPv($idate)."\n";
    }
    function getPv($idate){
        $ch = curl_init();
        $uri="http://knowing.corp.anjuke.com/chart/data?id_list=851%2C851&delta_list=0%2C-7&start={$idate}+00%3A00&end={$idate}+23%3A59&daily=false";
// 2. 设置选项，包括URL
        curl_setopt($ch, CURLOPT_URL, $uri);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
// 3. 执行并获取HTML文档内容
        $output = curl_exec($ch);
        $tmparr=explode("],",$output);
        $totalCnt=0;
        foreach($tmparr as $item){
            $tmp=explode(",",$item);
            if($tmp[1]){
                $totalCnt+=$tmp[1];
            }
        }
// 4. 释放curl句柄
        curl_close($ch);
        return $totalCnt;
    }
}

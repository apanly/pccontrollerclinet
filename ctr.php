<?php
$cmd=$_GET['cmd'];
$message="false";
if(!empty($cmd)){
    $dns="tcp://localhost:5558";
    $queue = new ZMQSocket(new ZMQContext(), ZMQ::SOCKET_REQ);
    $queue->setSockOpt(ZMQ::SOCKOPT_SNDTIMEO,1000);
    $queue->setSockOpt(ZMQ::SOCKOPT_RCVTIMEO,1000);
    $queue->connect($dns);
    $queue->send($cmd);
    $message="ok";
}
echo json_encode(array('msg'=>$message));
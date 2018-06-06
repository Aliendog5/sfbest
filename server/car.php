<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/6 0006
 * Time: 21:43
 */
include "config.php";
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $u_id=$_REQUEST["u_id"];
    $p_id=$_REQUEST["p_id"];
    $c_num=$_REQUEST["c_num"];
    $c_status=$_REQUEST["c_status"];
    $sql="INSERT INTO `sfbest`.`car` (`u_id`,`p_id`,`c_num`,`c_status`)VALUES('".$u_id."','".$p_id."','".$c_num."',1)";
    // 执行sql
    $result = $conn->query($sql);
    $conn->close();
    $printArr = Array();
    if ($result == 1) {
        $printArr["status"] = 1;
        $printArr["msg"] = "添加成功";
        print_r(json_encode($printArr));
    } else {
        $printArr["status"] = 0;
        $printArr["msg"] = "添加失败";
        print_r(json_encode($printArr));
    }

}
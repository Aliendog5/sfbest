<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/7 0007
 * Time: 20:07
 */
include "config.php";
if ($_SERVER["REQUEST_METHOD"]=="POST"){
    $uid=$_REQUEST["u_id"];
    $pid=$_REQUEST["p_id"];
    $sql = "DELETE FROM car
WHERE p_id='".$pid."' AND u_id='".$uid."'";
    // 执行sql
    $result = $conn->query($sql);
    $conn->close();
    $printArr = Array();
    if ($result == 1) {
        $printArr["status"] = 1;
        $printArr["msg"] = "删除成功";
        print_r(json_encode($printArr));
    } else {
        $printArr["status"] = 0;
        $printArr["msg"] = "删除失败";
        print_r(json_encode($printArr));
    }
}
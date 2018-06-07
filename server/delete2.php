<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/7 0007
 * Time: 20:09
 */
include "config.php";

if ($_SERVER["REQUEST_METHOD"]=="POST"){
    $u_id=$_REQUEST["u_id"];
    $sql = "DELETE FROM car WHERE u_id='".$u_id."'";
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

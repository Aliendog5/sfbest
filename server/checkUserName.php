<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/1 0001
 * Time: 09:13
 */
include "config.php";
if(!empty($_REQUEST["uname"])){

    //准备sql语句
    $sql="select*from sfbest.userinfo where u_name=?";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param("s",$_REQUEST["uname"]);
    $stmt->execute();
    $result=$stmt->get_result();
    if($result->num_rows>=1){
        print_r("false");
    }else{
        print_r("true");
    }
}
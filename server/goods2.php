<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/6 0006
 * Time: 19:37
 */
include "config.php";
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $sql="SELECT*FROM `sfbest`.`goods` where p_id='".$_REQUEST["pid"]."'";

    $result=$conn->query($sql);

    $row=array();
    while($row=$result->fetch_assoc()){
        $rows[]=$row;
    }
    print_r(json_encode($rows));

}
$conn->close();


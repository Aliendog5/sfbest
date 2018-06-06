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
//    $stmt = $conn->prepare($sql);
//    $stmt->bind_param("i", $_REQUEST["pid"]);
//    $stmt->execute();
    $result=$conn->query($sql);
//    $res = $stmt->get_result();
    $row=array();
    while($row=$result->fetch_assoc()){
        $rows[]=$row;
    }
    print_r(json_encode($rows));
//    if($res->num_rows >= 1){
//
//    }
    //

//    print_r( mysqli_fetch_array($res)["p_id"]);
}
$conn->close();


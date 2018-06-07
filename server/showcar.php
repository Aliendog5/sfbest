<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/7 0007
 * Time: 12:33
 */


//购物车

include "config.php";
$u_id=$_REQUEST["uid"];
//联查
$sql="SELECT * FROM car AS a
JOIN goods AS b
ON a.`p_id`=b.`p_id`
WHERE u_id='".$u_id."'";

$result=$conn->query($sql);
$result=$conn->query($sql);
if ($result->num_rows<=0){
    print_r("false");
}else{
    $row=array();
    while($row=$result->fetch_assoc()){
        $rows[]=$row;
    }
    print_r(json_encode($rows));
}
$conn->close();
<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/6 0006
 * Time: 17:27
 */
include "config.php";
    $sql="SELECT*FROM `sfbest`.`goods`";
    $res=$conn->query($sql);
    // 输出数据
    $rows=array();
    while($row = $res->fetch_assoc()) {
    $rows[]=$row;
};
    print_r(json_encode($rows));
    $conn->close();


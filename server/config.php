<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/31
 * Time: 9:31
 */

header("Content-Type:application/json;charset=utf-8");
header("Access-Control-Allow-Origin:*");

$dbServer="127.0.0.1";
$dbUserName="root";
$dbPwd="";
$dbDataBase="sfbest";

$conn=new mysqli($dbServer,$dbUserName,$dbPwd,$dbDataBase,3306);
mysqli_query($conn,"set names utf8");

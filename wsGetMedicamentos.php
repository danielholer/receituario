<?php
include_once('connectDB.php');

$db = new db();
$db->connect();

$sql = mysql_query("select id, substancia, dose_min, dose_max, dose_usual, horario, uso, controlado from medicamento");

$jsonObj= array();
while($dados=mysql_fetch_object($sql))
{
    $jsonObj[] = $dados;
}
header('Content-type: application/json'); 

echo json_encode($jsonObj);

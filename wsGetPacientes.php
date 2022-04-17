<?php
include_once('connectDB.php');

$db = new db();
$db->connect();

$sql = mysql_query("select id, nome, cpf, data_nasc, email from paciente");

$jsonObj= array();
while($dados=mysql_fetch_object($sql))
{
    $jsonObj[] = $dados;
}
header('Content-type: application/json'); 

echo json_encode($jsonObj);

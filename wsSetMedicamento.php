<?php
if($_SERVER['REQUEST_METHOD'] == "POST"){
    
    include_once('connectDB.php');

    $id = isset($_POST['id']) ? $_POST['id'] : "";
    $substancia = isset($_POST['substancia']) ? $_POST['substancia'] : "";
    $dosagem = isset($_POST['dosagem']) ? $_POST['dosagem'] : "";
    $horario = isset($_POST['horario']) ? $_POST['horario'] : "";

    $db = new db();
    $db->connect();
    
    if($id)
    {
        $str = "update medicamento set  substancia = '$substancia'
                                          ,dose_usual = '$dosagem'
                                          ,horario = '$horario'
                   where id = $id;
                   ";
    }
    else
    {
        $str = "insert into medicamento
                          (substancia,    dose_min, dose_max, dose_usual, horario,   uso,  controlado)
                   values ('$substancia',  null,     null,   '$dosagem', '$horario', null,   null);
                  ";
    }

    $sql = mysql_query($str);

    if($sql)
    {
    	//retorna o último id inserido pelo auto-increment
        $sql = mysql_query("SELECT LAST_INSERT_ID();");
        $msg = mysql_result($sql, 0);
        $msg .= "§Medicamento salvo com sucesso.";
    }
    else
    {
        $msg = "§Erro! Não foi possível salvar o medicamento.";
    }

    echo $msg;
}

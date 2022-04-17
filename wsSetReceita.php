<?php
if($_SERVER['REQUEST_METHOD'] == "POST"){
    
    include_once('connectDB.php');

    $idPaciente = isset($_POST['idPaciente']) ? $_POST['idPaciente'] : "";

    $db = new db();
    $db->connect();
    
    //$result = mysql_query("SHOW TABLE STATUS LIKE 'receita'");
    //$row = mysql_fetch_array($result);
    //$nextId = $row['Auto_increment'];   

    //$insert = "insert into receita (id, id_paciente, data_emissao) values ($nextId, $idPaciente, sysdate)";
    //$sql = mysql_query("insert into receita (id, id_paciente, data_emissao) values ($nextId, $idPaciente, now());");
    //faz o insert na tabela RECEITA
    $sql = mysql_query("insert into receita (id_paciente, data_emissao) values ($idPaciente, now());");

    //$sql2 = false;
    if($sql)
    {
        $sql = mysql_query("SELECT LAST_INSERT_ID();");
        $id = mysql_result($sql, 0);

        $strMedicamentos = isset($_POST['medicamentos']) ? $_POST['medicamentos'] : "";
        $arrMedicamentos = explode("§",$strMedicamentos);
        foreach($arrMedicamentos as $key => $value)
        {
            $arrValue = explode("|",$value);
            
            $idMedicamento = $arrValue[0];
            $dosagem = $arrValue[1];
            $horario = $arrValue[2];
            //$insert = "insert into medicamento_receita (id_receita, id_medicamento, dosagem, horario) values ($nextId, $idMedicamento, $dosagem, $horario);";
            $sql = mysql_query("insert into medicamento_receita (id_receita, id_medicamento, dosagem, horario) values ($id, $idMedicamento, '$dosagem', '$horario');");
        }
    }
    
    if($sql)
    {
        $msg = $id."§Receita salva com sucesso.";
    }
    else
    {
        $msg = "§Erro! Não foi possível salvar.";
    }

    echo $msg;
}

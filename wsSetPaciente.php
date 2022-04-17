<?php
if($_SERVER['REQUEST_METHOD'] == "POST"){
    
    include_once('connectDB.php');

    $id = isset($_POST['id']) ? $_POST['id'] : "";
    $nome = isset($_POST['nome']) ? $_POST['nome'] : "";
    $cpf = isset($_POST['cpf']) ? $_POST['cpf'] : "";
    $dt_nasc = isset($_POST['dtNascimento']) ? $_POST['dtNascimento'] : "";
    $email = isset($_POST['email']) ? $_POST['email'] : "";

    $db = new db();
    $db->connect();
    
    if($id)
    {
        $str = "update paciente set  nome = '$nome'
                                          ,cpf = '$cpf'
                                          ,data_nasc = '$dt_nasc'
					  ,email = '$email'
                   where id = $id;
                   ";
    }
    else
    {
        $str = "insert into paciente
                          (nome, cpf, data_nasc, email)
                   values ('$nome', '$cpf', '$dt_nasc', '$email');
                  ";
    }

    $sql = mysql_query($str);

    if($sql)
    {
    	//retorna o último id inserido pelo auto-increment
        $sql = mysql_query("SELECT LAST_INSERT_ID();");
        $msg = mysql_result($sql, 0);
	
        $msg .= "§Paciente salvo com sucesso.";
    }
    else
    {
        $msg = "§Erro! Não foi possível salvar o paciente.";
    }

    echo $msg;
}

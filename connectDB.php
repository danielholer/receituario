<?php
class db{
    private $hostname="localhost";
    private $username="root";
    private $password="vertrigo";
    private $db_name="receituario";
    
    public function db(){
        
    }
    
    public function connect(){
            $con=mysql_connect($this->hostname, $this->username, $this->password);
            mysql_select_db($this->db_name,$con) or die(); 
            mysql_query("SET NAMES 'utf8'",$con);
    }    
}
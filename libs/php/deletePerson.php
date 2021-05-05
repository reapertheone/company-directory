<?php

$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');
    if(isset($_REQUEST['confirmation'])&& $_REQUEST['confirmation']){
	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    $query = "DELETE FROM personnel Where id={$_REQUEST['id']}";

	$result = $conn->query($query);
    
    mysqli_close($conn);

    $output['data']['message']="{$_REQUEST['id']} deleted";
    $output=json_encode($output);
    echo $output;}
    else{
        $data['confirmed']=false;
        $data['message']="Conformiation needed";
        
    }
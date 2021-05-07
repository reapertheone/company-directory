<?php

$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');
    
	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);
    $output=["status"=>["message"=>"","error"=>"false"]];
    

        $query = "DELETE FROM {$_REQUEST['table']} Where id={$_REQUEST['id']}";

	    $result = $conn->query($query);
    
        mysqli_close($conn);
        if($result){
           $output['status']['message']="Data has been removed from the database";
           $output['status']['error']=false;
        }else{
            $output['status']['message']="Something went wrong during the process";
           $output['status']['error']=true;
        }
    
    $output=json_encode($output);
    echo $output;
    
        
    
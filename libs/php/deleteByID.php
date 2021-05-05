<?php

$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');
    
	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);
    $output=["status"=>["message"=>"","error"=>"false"]];
    if($_REQUEST['table']=="personnel"){

        $query = "DELETE FROM {$_REQUEST['table']} Where id={$_REQUEST['id']}";

	    $result = $conn->query($query);
    
        mysqli_close($conn);
        if(!$result){
           $output['status']['message']="Record have been removed already";
           $output['status']['error']=true;
        }else{
           $output['status']['message']="Data has been removed from the database";
           $output['status']['error']=false;
        }
    }else{
        if($_REQUEST['table']=="location"){
            $request=file_get_contents('http://localhost/libs/php/getDepartmentByLocationID.php?id='.$_REQUEST['id']);
            $response=json_decode($request,true);
            if($response['data']['0']['count']==0){
                $query="DELETE FROM {$_REQUEST['table']} Where id={$_REQUEST['id']}";
                $result=$conn->query($query);
                if(!$result){
                    $output['status']['message']="Record have been removed already";
                    $output['status']['error']=true;
                 }else{
                    $output['status']['message']="Data has been removed from the database";
                    $output['status']['error']=false;
                 }

            }else{
                $output['status']['message']="Data cant be removed because it is in use";
                $output['status']['error']=true;
            }
            
        }else{
            $request=file_get_contents('http://localhost/libs/php/getPersonByDepartmentID.php?id='.$_REQUEST['id']);
            $response=json_decode($request,true);
            if($response['data']['0']['count']==0){
                $query="DELETE FROM {$_REQUEST['table']} Where id={$_REQUEST['id']}";
                $result=$conn->query($query);
                if(!$result){
                    $output['status']['message']="Record have been removed already";
                    $output['status']['error']=true;
                 }else{
                    $output['status']['message']="Data has been removed from the database";
                    $output['status']['error']=false;
                 }

            }else{
                $output['status']['message']="Data cant be removed because it is in use";
                $output['status']['error']=true;
            }
        }
    }
    $output=json_encode($output);
    echo $output;
    
        
    
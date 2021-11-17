<?php

	// example use from browser
	// http://localhost/companyDirectory/libs/php/insertEmployee.php?firstName=Test&lastName=Test&jobTitle=Tester&email=test@test.com&departmentID=1

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	// $_REQUEST used for development / debugging. Remember to change to $_POST for production

	$queryOne = $conn->prepare('INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES(?,?," ",?,?)');
   
    //  $_REQUEST["id"] = '97';
         $_REQUEST["lastName"] = 'Cora';
         $_REQUEST["firstName"] = 'Massi';
         $_REQUEST["email"] = 'mmkila@qwerty.net';
         $_REQUEST["departmentID"] = 3;
    //  $_REQUEST["locationID"] = '2';

    $queryOne->bind_param("sssi", $_REQUEST["firstName"], $_REQUEST["lastName"], $_REQUEST["email"], $_REQUEST["departmentID"]);
	
    $queryOne->execute();
    
    $last_id = $conn->insert_id;
	
	if (false === $queryOne) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
    

    $query2 = $conn->prepare('INSERT INTO department (name, locationID) VALUES(?,?)');
    
    $_REQUEST["name"] = 'Sales';
    $_REQUEST["locationID"] = 3;
    
    $query2->bind_param("si", $_REQUEST["name"], $_REQUEST["locationID"]);
	
    $query2->execute();

    if (false === $query2) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}

    $query3 = $conn->prepare('INSERT INTO location (name) VALUES(?)');
   
    $_REQUEST["name"] = 'London';
        
    $query3->bind_param("s", $_REQUEST["name"]);
	
    $query3->execute();
	
	if (false === $query3) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}

    $queryResult = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) ORDER BY p.lastName, p.firstName, d.name, l.name';

	$result = $conn->query($queryResult);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}


    $output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>
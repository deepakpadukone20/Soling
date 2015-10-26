<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/


// drivers
$app->get('/drivers', function() { 
    global $db;
    $rows = $db->select("driver","id,name,address,phone,isOwnEmployee,date,isActive,salary",array());
    echoResponse(200, $rows);
});

$app->post('/drivers', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("driver", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "driver added successfully.";
    echoResponse(200, $rows);
});


$app->put('/drivers', function() use ($app) { 
    $id = $_REQUEST['id'];
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("driver", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "driver information updated successfully.";
    echoResponse(200, $rows);
});



$app->delete('/drivers', function() { 
    $id = $_REQUEST['id'];
    global $db;
    $rows = $db->delete("driver", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "driver removed successfully.";
    echoResponse(200, $rows);
});


function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>
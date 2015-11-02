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


// users
$app->get('/users', function() { 
    global $db;
    $rows = $db->select("user","id,name,date,isActive",array());
    echoResponse(200, $rows);
});

$app->post('/users', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("user", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "user added successfully.";
    echoResponse(200, $rows);
});


$app->put('/users', function() use ($app) { 
    $id = $_REQUEST['id'];
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("user", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "user information updated successfully.";
    echoResponse(200, $rows);
});



$app->delete('/users', function() { 
    $id = $_REQUEST['id'];
    global $db;
    $rows = $db->delete("user", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "user removed successfully.";
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
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


// items
$app->get('/items', function() { 
    global $db;
    $rows = $db->select("inventory","id,name,price,quantity,sellable,date,modifieddate,deleted",array());
    echoResponse(200, $rows);
});

$app->post('/items', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("inventory", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Item added successfully.";
    echoResponse(200, $rows);
});

$app->put('/items', function() use ($app) { 
    $id = $_REQUEST['id'];
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("inventory", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Item information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/items', function() { 
    $id = $_REQUEST['id'];
    global $db;
    $rows = $db->delete("inventory", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Item removed successfully.";
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
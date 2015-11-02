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

session_start();

$app->get('/orders', function() use ($app) {
    $type = $_REQUEST['type'];
    global $db;
    if($type == "1"){
        $startdate =  date('Y-m-d G:i:s',mktime(0,0,0,date("m")-1,date("d"),date("Y")));
        $enddate =  date('Y-m-d G:i:s');
    }else if($type =="2"){
         $startdate =  date('Y-m-d G:i:s',mktime(0,0,0,date("m"),date("d")-7,date("Y")));
        $enddate =  date('Y-m-d G:i:s');
    }else {
        $startdate =  date('Y-m-d G:i:s',mktime(0,0,0,date("m"),date("d")-1,date("Y")));
        $enddate =  date('Y-m-d G:i:s');
    }
    $condition = " WHERE date BETWEEN '" . $startdate ."' and '". $enddate ."'";
    $response = $db->countTable("orders", $condition);   
    $response['$condition']=$condition ;
    echoResponse(200, $response);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>
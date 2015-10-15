<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

$app->post('/signUp', function() use ($app) { 
     $response = array();
    $r = json_decode($app->request->getBody());
    require_once 'passwordHash.php';
    global $db;
        $condition =  array('email' => $r->name );

    $isUserExists = $db->select("users","id", $condition);
    if($isUserExists["code"] == 204){
        $password = $r->password;
        $r->password = passwordHash::hash($password);
        $result = $db->insert("user", $r,array());
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["id"] = $result["data"];
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["id"];
            $_SESSION['name'] = $r->name;
            $_SESSION['email'] = $r->email;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create User. Please try again";
            echoResponse(201, $response);
        }            
    }else{
        $response["status"] = "error";
        $response["message"] = "An user with the provided username exists!";
        echoResponse(201, $response);
    }
});


function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>
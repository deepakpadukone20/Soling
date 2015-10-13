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



$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    global $db;
    $r = json_decode($app->request->getBody());
    $response = array();
    //$password = $r->password;
   
    $email = $r->email;
    $password = $r->password;
    $condition =  array('email' => $email);
    $user = $db->select("users","id,name,password,email,date",$condition);
   
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['name'] = $user['name'];
        $response['uid'] = $user['uid'];
        $response['email'] = $user['email'];
        $response['createdAt'] = $user['created'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['id'] = $user['id'];
        $_SESSION['email'] = $email;
        $_SESSION['name'] = $user['name'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
        }
    echoResponse(200, $response);
});

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
        $result = $db->insert("users", $r,array());
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
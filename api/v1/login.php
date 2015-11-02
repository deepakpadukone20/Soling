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
    $dbselect = $db->select("user","id,name,password,email,date",$condition);
   
    if ($dbselect["code"]==200) {
        $user = $dbselect["data"]["0"];
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['name'] = $user['name'];
        $response['id'] = $user['id'];
        $response['email'] = $user['email'];
        $response['createdAt'] = $user['date'];
        session_start();
        
        $_SESSION['id'] = $user['id'];
        $_SESSION['email'] = $email;
        $_SESSION['name'] = $user['name'];
         //   echoResponse(200, $_SESSION);

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

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>
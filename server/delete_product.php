<?php

/*

Rough serverside handling.

*/

print_r($_POST);


$del_name = $_POST['name'];

$inp = file_get_contents('products.json');

$tempArray = json_decode($inp,true);

for($i=0;$i<count($tempArray);$i++){
    if($tempArray[$i]['name'] == $del_name) {
        unset($tempArray[$i]);
        break;
    }
}


$jsonData = json_encode(array_values($tempArray));

file_put_contents('products.json', $jsonData);

return json_encode($data);


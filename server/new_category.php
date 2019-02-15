<?php


/*

Rough serverside handling.

*/


// print_r($_POST);



/*
    Array
    (
        [name] => b
        [title] => a
        [description] => d
        [image] => 120x80.png
    )
*/

$data = $_POST;

$inp = file_get_contents('categories.json');

$tempArray = json_decode($inp);

array_push($tempArray, $data);

$jsonData = json_encode($tempArray);

file_put_contents('categories.json', $jsonData);

return json_encode($data);


<?php

require_once('vendor/autoload.php');

$stripe = [
  "secret_key"      => "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
  "publishable_key" => "pk_test_TYooMQauvdEDq54NiTphI7jx",
];

\Stripe\Stripe::setApiKey($stripe['secret_key']);
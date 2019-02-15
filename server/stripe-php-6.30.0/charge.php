<?php

    session_start();

    require_once('config.php');

    $token  = $_POST['stripeToken'];
    $email  = $_POST['stripeEmail'];

    $customer = \Stripe\Customer::create([
      'email' => $email,
      'source'  => $token,
    ]);

    $charge = \Stripe\Charge::create([
      'customer' => $customer->id,
      'amount'   => $_SESSION['amount'],
      'currency' => 'usd',
    ]);

    echo '<h1>Successfully charged $'.$_SESSION['amount'].'!</h1>';

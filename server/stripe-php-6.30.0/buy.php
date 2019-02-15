<?php

// https://stripe.com/docs/checkout/php

require_once('vendor/autoload.php');

require_once('config.php');

?>

<p><?=$_POST['amount']?></p>

<form action="charge.php" method="post">
    <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
        data-key="<?php echo $stripe['publishable_key']; ?>"
        data-description="Access for a year"
        data-amount="<?php $_POST['amount']?>"
        data-locale="auto"
    >
    </script>
</form>

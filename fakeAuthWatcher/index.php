<?php
if(!isset($_POST["login"]) || !isset($_POST["pwd"])){
	header('HTTP/1.1 404 Not Found');
}

print_r($_POST);
?>
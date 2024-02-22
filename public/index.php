<?php

// get the requested path
$path = $_SERVER['REQUEST_URI'];

switch ($path) {
  case '/':
    # TODO display the home page
    die('home');
    break;
  case '/api/tickets':
    # TODO display the tickets
    die('tickets');
    break;
  default:
    # TODO not found page
    die('not found');
}

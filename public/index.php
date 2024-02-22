<?php

// get the requested path
$path = $_SERVER['REQUEST_URI'];

$home_html_contents = file_get_contents(__DIR__ . '/../views/home.html');

switch ($path) {
  case '/':
    // get contents of the `views/home.html`
    echo $home_html_contents;
    break;
  case '/api/tickets':
    # TODO display the tickets
    die('tickets');
    break;
  default:
    # TODO not found page
    die('not found');
}

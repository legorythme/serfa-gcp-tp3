<?php

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

// get the requested path
$path = $_SERVER['REQUEST_URI'];

$home_html_contents = file_get_contents(__DIR__ . '/../views/home.html');
$home_html_contents = str_replace('$HOST', $_ENV['HOST'], $home_html_contents);

$tickets = [
  [
    'id' => 1,
    'title' => 'Fix broken login form',
    'description' => 'The login form is not submitting correctly.',
    'status' => 'Open',
    'assignedTo' => 'John Doe',
  ],
  [
    'id' => 2,
    'title' => 'Implement new search feature',
    'description' => 'Users should be able to search for content on the website.',
    'status' => 'In Progress',
    'assignedTo' => null,
  ],
];

switch ($path) {
  case '/':
    // get contents of the `views/home.html`
    echo $home_html_contents;
    break;

  case '/api/tickets':
    // display the tickets
    echo json_encode($tickets);
    break;

  default:
    // TODO not found page
    die('not found');
}

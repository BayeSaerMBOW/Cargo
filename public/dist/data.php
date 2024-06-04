<?php
function saveFile($data) {
    $data = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents('./data.json', $data);
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    //secho json_encode($data);
    
    saveFile($data);

    // Recharger les données pour les renvoyer
  /*   $data = file_get_contents('./data.json');
    echo $data; */
} else {
    $data = file_get_contents('./data.json');
    echo $data;
}
// Simulate processing received data
/* $data = json_decode(file_get_contents('php://input'), true);

// Simply echo the received data back
echo json_encode($data);
?>
<?php
// Chemin du fichier JSON
$file_path = '../ficjier.json';

// Lire les données JSON existantes depuis le fichier
$json_data = file_get_contents($file_path);

// Parser les données JSON en une structure PHP
$data = json_decode($json_data, true);

// Ajouter les données reçues dans la structure PHP
$data[] = $_POST; // Ajoutez les données reçues telles quelles, assurez-vous qu'elles sont sécurisées contre les injections

// Convertir la structure PHP en JSON
$new_json_data = json_encode($data, JSON_PRETTY_PRINT);

// Écrire les données JSON mises à jour dans le fichier
file_put_contents($file_path, $new_json_data);

// Répondre avec un message de confirmation
echo 'Données écrites dans le fichier JSON.'; */
?>

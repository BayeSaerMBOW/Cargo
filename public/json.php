<?php
header('Content-Type: application/json');

// Path to data.json file
$dataFile = __DIR__ . '/dist/data.json';

// Function to read data from the JSON file
function readData($dataFile) {
    if (!file_exists($dataFile)) {
        return [];
    }
    $data = json_decode(file_get_contents($dataFile), true);
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Erreur de décodage JSON: ' . json_last_error_msg());
    }
    return $data;
}

// Function to save data to the JSON file
function saveData($dataFile, $data) {
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

try {
    $data = readData($dataFile);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if ($input !== null) {
            $data[] = $input;
            saveData($dataFile, $data);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON input']);
            exit;
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);

        if ($input === null && json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(['success' => false, 'message' => 'Données JSON invalides: ' . json_last_error_msg()]);
            exit;
        }

        $numero = $input['codeCargo'];
        $etat = $input['etatGlobal'] ?? null;

        $updated = false; // Variable pour suivre si une cargaison a été mise à jour

        // Parcourir les données existantes pour trouver la cargaison à mettre à jour
        foreach ($data as &$cargo) {
            if ($cargo['codeCargo'] === $numero) {
                if ($etat) {
                    // Vérifier si l'état est valide (ouvert ou ferme)
                    if (in_array($etat, ['Ouvert', 'Ferme'])) {
                        $currentEtat = strtolower($cargo['etatGlobal']); // Convertir l'état actuel en minuscules
                        $newEtat = strtolower($etat); // Convertir le nouvel état en minuscules

                        // Vérifier si l'état actuel est déjà le même que le nouvel état
                        if ($currentEtat === 'ferme' && $newEtat === 'ferme') {
                            echo json_encode(['success' => false, 'message' => 'La cargaison est déjà fermée.']);
                            exit;
                        } elseif ($currentEtat === 'ouvert' && $newEtat === 'ouvert') {
                            echo json_encode(['success' => false, 'message' => 'La cargaison est déjà ouverte.']);
                            exit;
                        } else {
                            // Mettre à jour l'état de la cargaison
                            $cargo['etatGlobal'] = $etat;
                        }
                    } else {
                        // Retourner une réponse d'erreur pour un état non reconnu
                        echo json_encode(['success' => false, 'message' => 'État non reconnu.']);
                        exit;
                    }
                }
                $updated = true; // Marquer la cargaison comme mise à jour
                break;
            }
        }

      
        if ($updated) {
            try {
                saveData($dataFile, $data);
                echo json_encode(['success' => true, 'message' => 'Cargaison mise à jour avec succès.']);
            } catch (Exception $e) {
                echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'écriture du fichier JSON: ' . $e->getMessage()]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Cargaison non trouvée.']);
        }
    } else {
        echo json_encode($data);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la lecture du fichier JSON: ' . $e->getMessage()]);
    exit;
}
?>

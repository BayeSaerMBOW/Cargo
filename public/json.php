<?php

 ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); 

require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
header('Content-Type: application/json');


// Créer une nouvelle instance de PHPMailer
function sendMail(){
    $mail = new PHPMailer(true);

    try {
        // Paramètres du serveur
         $mail->SMTPDebug = 0;                                        // Activer le débogage SMTP (0 pour désactiver)
        $mail->isSMTP();                                             // Utiliser SMTP
        $mail->Host       = 'smtp.gmail.com';                      // Spécifier le serveur SMTP principal et de secours
        $mail->SMTPAuth   = true;                                    // Activer l'authentification SMTP
        $mail->Username   = 'saermbow070@gmail.com';               // Nom d'utilisateur SMTP
        $mail->Password   = 'zdos nbkv jknd acqy';                    // Mot de passe SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;          // Activer le chiffrement TLS
        $mail->Port       = 587;                                     // Port TCP à utiliser
    
         //Destinataires
        $mail->setFrom('saermbow070@gmail.com', 'Saermbow');
        $mail->addAddress('diariatou591@gmail.com', 'Diary DIOP');    // Ajouter un destinataire
        // $mail->addAddress('destinataire2@example.com');                       // Ajouter un autre destinataire
        // $mail->addReplyTo('info@example.com', 'Information');
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('bcc@example.com');
    
        // Pièces jointes (facultatif)
        // $mail->addAttachment('/path/to/file.jpg');         // Ajouter une pièce jointe
        // $mail->addAttachment('/path/to/file.zip', 'nom.zip');    // Ajouter une pièce jointe avec un nom personnalisé
    
        // Contenu
        $mail->isHTML(true);                                  // Définir le format de l'email en HTML
        $mail->Subject = 'Voici le sujet';
        $mail->Body    = 'je taime <b>en cours</b> est arrivé';
        $mail->AltBody = 'Voici le corps du message en texte brut pour les clients non-HTML';
    
        $mail->send();
        echo 'Le message a été envoyé avec succès';
    } catch (Exception $e) {
        echo "Le message n'a pas pu être envoyé. Erreur: {$mail->ErrorInfo}";
    } 
    
}
 
// Path to data.json file
$dataFile = __DIR__ . '/dist/data.json';


// Exemple d'utilisation



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
                        //ajouter des valeurs
                        // Ajouter des journaux pour vérifier les valeurs des variables
                        error_log("Current Etat: $currentEtat");
                        error_log("New Etat: $newEtat");
                        error_log("Cargo EtatGlobal: " . strtolower($cargo['etatGlobal']));
                        if ($newEtat == 'ferme' && ($currentEtat == 'ferme' || strtolower($cargo['etatGlobal']) == 'perdue')) {
                            echo json_encode(['success' => false, 'message' => 'Une cargaison fermée ou perdue ne peut pas être fermée ni ouverte à nouveau.']);
                           /*  sendMail(); */
                            exit;
                        }
                        if ($newEtat == 'ouvert' && ($currentEtat == 'ouvert' || strtolower($cargo['etatGlobal']) == 'perdue')) {
                            echo json_encode(['success' => false, 'message' => 'Une cargaison fermée ou perdue ne peut pas être fermée ni ouverte à nouveau.']);
                           /*  sendMail(); */
                            exit;
                        } 
                        /*  if ($newEtat == 'ouvert' && ($currentEtat == 'ferme' || strtolower($cargo['etatGlobal']) == 'perdue')) {
                            echo json_encode(['success' => false, 'message' => 'Une cargaison fermée ou perdue ne peut pas être fermée ni ouverte à nouveau.']);
                            exit;
                        }   */
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
                                     if ($cargo['etatGlobal'] == 'Ferme' && $cargo['etatAvancement'] === 'Encours') {
                            echo json_encode(['success' => false, 'message' => 'Une cargaison en cours ne peut pas être fermée.']);
                            sendMail(); 
                            exit;
                        }
                     
                        if ($cargo['etatGlobal'] == 'Ouvert' && $cargo['etatAvancement'] === 'Encours') {
                            echo json_encode(['success' => false, 'message' => 'Une cargaison en cours ne peut pas être ouverte.']);
                            exit;
                        }
                        if ($cargo['etatGlobal']  === 'Ferme' && ($cargo['etat'] === 'ferme' || $cargo['statut'] === 'Perdu')) {
                            echo json_encode(['success' => false, 'message' => 'Une cargaison fermée ou perdue ne peut pas être fermée ni ouverte à nouveau.']);
                            exit;
                        }
                        if ($cargo['etatGlobal'] == 'Perdue' && $cargo['etatAvancement'] === 'Encours') {
                            echo json_encode(['success' => false, 'message' => 'Une cargaison en cours ne peut pas être ouverte.']);
                            exit;
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

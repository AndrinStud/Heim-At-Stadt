<h1>Livechat Comment posten</h1>
<form action="livechatcreator.php">
  <label for="livechatId">Livechat ID:</label><br>
  <input type="text" id="livechatId" name="livechatId" required><br>
  <label for="comment">Comment:</label><br>
  <input type="text" id="comment" name="comment" value="Hallo Welt!" required><br><br>
  <input type="submit" value="Submit">
</form> 
<?php
// Get access to DB and to Enviroment Variables
require_once 'config.php';

// Start session
session_start();

$client_id = getenv('OAUTH2_CLIENTID');
$client_secret = getenv('OAUTH2_CLIENTSECRET');
$redirect_uri = 'https://heimatstadt.info/php/livechatcreator.php';
$scope = 'https://www.googleapis.com/auth/youtube';

$authorization_endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
$token_endpoint = 'https://oauth2.googleapis.com/token';

// Kommentar posten
if (isset($_GET['livechatId']) && isset($_GET['comment'])) {
    $response = postYtLivechatComment($_GET['livechatId'], $_GET['comment']);
    if (isset($response->error)) {
        echo '<p>Fehler beim Posten des Kommentars: ' . htmlspecialchars($response->error->message) . '</p>';
    } else {
        echo '<p>Kommentar erfolgreich gepostet!</p>';
    }
}

// Logout: Sitzung beenden
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: /php/livechatcreator.php');
    exit();
}

// Wenn der Benutzer eingeloggt ist, zeige die Daten
if (isset($_SESSION['access_token'])) {
    echo '<p>Du bist eingeloggt!</p>';
    echo '<p>Access Token: ' . htmlspecialchars($_SESSION['access_token']) . '</p>';
    echo '<p><a href="?logout">Log Out</a></p>';
    exit();
}

// Wenn kein "code" vorhanden ist, leite den Benutzer zur Google Login-Seite
if (!isset($_GET['code'])) {
    // Generiere den PKCE Code Verifier und Challenge
    $_SESSION['code_verifier'] = bin2hex(random_bytes(50));
    $code_challenge = base64_urlencode(hash('sha256', $_SESSION['code_verifier'], true));

    // Generiere den Login-Link
    $authorize_url = $authorization_endpoint . '?' . http_build_query([
        'response_type' => 'code',
        'client_id' => $client_id,
        'redirect_uri' => $redirect_uri,
        'scope' => $scope,
        'state' => bin2hex(random_bytes(5)),
        'code_challenge' => $code_challenge,
        'code_challenge_method' => 'S256',
        'access_type' => 'offline' // Ermöglicht das Abrufen von Refresh Tokens
    ]);

    echo '<p>Du bist nicht eingeloggt!</p>';
    echo '<p><a href="' . htmlspecialchars($authorize_url) . '">Log In mit Google</a></p>';
    exit();
}

// Nach der Weiterleitung: Überprüfe den State und tausche den Code gegen ein Token aus
if (isset($_GET['code'])) {
    // Tausche den Authorization Code gegen ein Access Token aus
    $response = http($token_endpoint, [
        'code' => $_GET['code'],
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'redirect_uri' => $redirect_uri,
        'grant_type' => 'authorization_code',
        'code_verifier' => $_SESSION['code_verifier'],
    ]);

    if (isset($response->access_token)) {
        $_SESSION['access_token'] = $response->access_token;

        echo '<p>Erfolgreich eingeloggt!</p>';
        echo '<p>Access Token: ' . htmlspecialchars($response->access_token) . '</p>';
        echo '<p><a href="?logout">Log Out</a></p>';
    } else {
        die('Fehler beim Abrufen des Access Tokens: ' . htmlspecialchars(json_encode($response)));
    }
}

// Hilfsfunktion: Führt eine HTTP-Anfrage aus
function http($url, $params = false)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    if ($params) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    }
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response);
}

// Hilfsfunktion: Führt eine HTTP-POST-Anfrage aus
function http_post($url, $headers, $body)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response);
}

// Hilfsfunktion: Base64-urlencoding
function base64_urlencode($string)
{
    return rtrim(strtr(base64_encode($string), '+/', '-_'), '=');
}

function postYtLivechatComment($livechatId, $comment) {
    $url = 'https://youtube.googleapis.com/youtube/v3/liveChat/messages?part=snippet';
    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $_SESSION['access_token']
    ];
    $body = json_encode([
        'snippet' => [
            'type' => 'textMessageEvent',
            'liveChatId' => $livechatId,
            'textMessageDetails' => [
                'messageText' => $comment
            ]
        ]
    ]);
    return http_post($url, $headers, $body);
}
?>
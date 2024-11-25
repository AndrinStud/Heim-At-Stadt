<h1>Livechat Comment posten</h1>
<form action="livechatcreator.php" method="post">
  <label for="livechatId">Livechat ID:</label><br>
  <input type="text" id="livechatId" name="livechatId" required><br>
  <label for="comment">Comment:</label><br>
  <input type="text" id="comment" name="comment" value="Hallo Welt!" required><br><br>
  <label for="tokenIndex">Select Access Token:</label><br>
  <select id="tokenIndex" name="tokenIndex" required>
    <?php
    session_start();
    if (isset($_SESSION['access_tokens'])) {
        foreach ($_SESSION['access_tokens'] as $index => $token) {
            echo '<option value="' . $index . '">Token ' . ($index + 1) . '</option>';
        }
    }
    ?>
  </select><br><br>
  <input type="submit" value="Submit">
</form> 

<?php
// Get access to DB and to Environment Variables
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
if (isset($_POST['livechatId']) && isset($_POST['comment']) && isset($_POST['tokenIndex'])) {
    $tokenIndex = intval($_POST['tokenIndex']);
    if (isset($_SESSION['access_tokens'][$tokenIndex])) {
        $accessToken = $_SESSION['access_tokens'][$tokenIndex];
        $response = postYtLivechatComment($_POST['livechatId'], $_POST['comment'], $accessToken);
        if (isset($response->error)) {
            echo '<p>Fehler beim Posten des Kommentars: ' . htmlspecialchars($response->error->message) . '</p>';
        } else {
            echo '<p>Kommentar erfolgreich gepostet!</p>';
        }
    } else {
        echo '<p>Ungültiger Token ausgewählt.</p>';
    }
}

// Destroy all tokens
if (isset($_GET['destroy_tokens'])) {
    unset($_SESSION['access_tokens']);
    echo '<p>Alle Tokens wurden zerstört.</p>';
    echo '<script>window.location.href = window.location.pathname;</script>'; // Full page reload without GET parameters
}

// Logout: Sitzung beenden
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: /php/livechatcreator.php');
    exit();
}

// Wenn der Benutzer eingeloggt ist, speichere den Access Token
if (isset($_SESSION['access_token'])) {
    if (!isset($_SESSION['access_tokens'])) {
        $_SESSION['access_tokens'] = [];
    }
    $_SESSION['access_tokens'][] = $_SESSION['access_token'];
    unset($_SESSION['access_token']);
    echo '<script>location.reload();</script>'; // Full page reload
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

    echo '<p>Du hast ' . (isset($_SESSION['access_tokens']) ? count($_SESSION['access_tokens']) : 0) . ' Tokens generiert.</p>';
    echo '<p><a href="' . htmlspecialchars($authorize_url) . '">Add Token</a></p>';
    echo '<p><a href="?destroy_tokens=1">Destroy All Tokens</a></p>';
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
        header('Location: /php/livechatcreator.php');
        exit();
    } else {
        die('Fehler beim Abrufen des Access Tokens: ' . htmlspecialchars(json_encode($response)));
    }
}

// Zeige die Access Tokens an
if (isset($_SESSION['access_tokens'])) {
    echo '<h2>Access Tokens</h2>';
    echo '<table>';
    foreach ($_SESSION['access_tokens'] as $index => $token) {
        echo '<tr><td>Token ' . ($index + 1) . ':</td><td>' . htmlspecialchars($token) . '</td></tr>';
    }
    echo '</table>';
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

function postYtLivechatComment($livechatId, $comment, $accessToken) {
    $url = 'https://youtube.googleapis.com/youtube/v3/liveChat/messages?part=snippet';
    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $accessToken
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
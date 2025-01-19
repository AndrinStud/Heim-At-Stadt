<?php
require_once '../php/config.php';
$pdo = new PDO($dsn, $db_user, $db_pass, $options);

$stmt = $pdo->query("SELECT id FROM site WHERE name='DefensiveArchitektur'");
$site = $stmt->fetch();
$site_id = $site['id'];

$stmt = $pdo->query("SELECT a.name, f.comment, f.video_timestamp 
                      FROM fact f 
                      JOIN account a ON f.account = a.id 
                      WHERE f.site='" . $site_id . "'");
$facts = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Heim@Stadt - Defensive Architektur</title>
  <script src="https://kit.fontawesome.com/e5010892c5.js" crossorigin="anonymous"></script>
  <link rel="icon" type="image/x-icon" href="../images/WebsiteIcon.png">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/subpage.css">
</head>
<body id="top">
  <header id="menu">
    <nav>
      <ul>
        <a href="https://heimatstadt.info/">
          <li>
            <img src="../images/Logo_Heimatstadt.png" alt="Logo Heim@Stadt">
          </li>
        </a>
        <a href="ServicedApartments.php">
          <li>Serviced Apartments</li>
        </a>
        <a href="Hausbesetzung.php">
          <li>Hausbesetzung</li>
        </a>
        <a href="SmartCity.php">
          <li>Smart City</li>
        </a>
        <a href="https://open.spotify.com/show/6VrQMTrcKcIwBZdBUiqksx?si=45XMnEBaSuivcg1DRX6dBg" target="_blank">
          <li>Podcast</li>
        </a>
      </ul>
    </nav>
  </heade>
  <main>
    <section class="titleAndLead">
      <h1>Defensive Architektur: Verborgene Barrieren in der Stadt <span class="word andrin">von
          Andrin Schärli</span></h1>
      <p>Defensive Architektur, von Skatestoppern bis hin zu ungemütlichen Sitzbänken, beeinflusst den öffentlichen Raum
        in Schweizer Städten auf subtile, aber tiefgreifende Weise. Diese Massnahmen sollen Sicherheit fördern und
        Nutzungskonflikte entschärfen, schränken jedoch gleichzeitig die Zugänglichkeit und Aneignung öffentlicher Orte
        ein. Entdecken Sie, wie diese Architektur gestaltet wird, welche Debatten sie auslöst und welche
        gesellschaftlichen Ziele damit verfolgt werden - von klassischer Musik am Hauptbahnhof bis hin zu Sperren, die
        Liegen oder Skaten verhindern. Ein Blick auf die Grenzen zwischen Funktionalität und sozialer Exklusion.</p>
    </section>
    <section class="playerAndFactcheck">
      <aside id="player"></aside>
      <article id="factcheck">
        <div id="checkArea"></div>
      </article>
    </section>
  </main>
  <script type="module">
    import { Factchecker } from "../js/Factchecker.js";
    let facts = <?php echo json_encode($facts); ?>;
    new Factchecker("0aMJ8EGVAEs", facts);
  </script>
</body>
</html>
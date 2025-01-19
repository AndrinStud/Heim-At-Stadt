<?php
require_once '../php/config.php';
$pdo = new PDO($dsn, $db_user, $db_pass, $options);

$stmt = $pdo->query("SELECT id FROM site WHERE name='SmartCity'");
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
  <title>Heim@Stadt - Smart City</title>
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
        <a href="DefensiveArchitektur.php">
          <li>Defensive Architektur</li>
        </a>
        <a href="https://open.spotify.com/show/6VrQMTrcKcIwBZdBUiqksx?si=45XMnEBaSuivcg1DRX6dBg" target="_blank">
          <li>Podcast</li>
        </a>
      </ul>
    </nav>
  </header>
  <main>
    <section class="titleAndLead">
      <h1>Smart City: Chancen und Gefahren <span class="word jermyn">von Jermyn Dörig</span></h1>
      <p>Zürich wurde zum fünften Mal zur weltweit smartesten Stadt ausgezeichnet. Doch was macht eine Stadt wirklich
        smart? In Smart Cities entscheiden etwa Strassenlaternen selbst, ob sie leuchten oder nicht. Die
        Stadtentwicklerin Anna Schindler erklärt, warum Zürich so erfolgreich ist. Der Präsident der Piratenpartei
        beleuchtet das Thema kritisch und warnt vor kommerziellen Interessen. Fachpersonen, darunter ein Hacker,
        analysieren brisante Fragen zu Datenschutz und Cyberangriffen. Am Ende bleibt die zentrale Frage: Wie schlau ist
        eine Smart City wirklich?</p>
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
    new Factchecker("Ce4C790pRR8", facts);
  </script>
</body>

</html>
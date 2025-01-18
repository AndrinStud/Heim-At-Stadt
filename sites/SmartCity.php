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
  <header>
    <a href="https://heimatstadt.info/"><img src="../images/Logo_Heimatstadt.png" alt="Logo Heim@Stadt"></a>
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
  <footer class="footer">
    <div class="footer-inner">
      <!-- Erste Zeile mit drei Spalten -->
      <div class="footer-row top-row">
        <div class="footer-col">
          <div class="logo">
            <a href="https://heimatstadt.info/">
              <img src="../images/Logo_Heimatstadt.png" alt="heimatstadt logo">
            </a>
          </div>
        </div>
        <div class="footer-col rotator">
          <div class="rotating-text">
            <p>Ein Projekt von <span class="word jermyn">jermyn</span></p>
          </div>
        </div>
        <div class="footer-col oben">
          <a href="#top">Nach oben</a>
        </div>
      </div>

      <!-- Zweite Zeile mit drei Spalten, mittlere Spalte unterteilt in vier Sub-Spalten -->
      <div class="footer-row bottom-row">
        <div class="footer-col">
          <a href="../sites/Impressum.html">Impressum</a>
        </div>
        <div class="footer-col col-with-subgrid">
          <!-- Hier in vier Spalten aufgeteilt -->
          <div class="subgrid">
            <div class="sub-col">
              <a href="https://www.instagram.com/heimatstadt.info/" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </div>
            <div class="sub-col">
              <a href="https://www.youtube.com/@heimatstadt" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </div>
            <div class="sub-col">
              <a href="https://open.spotify.com/user/31qms57eosf6edpkozi6zww6g5dy?si=8c1c324d77c3422d" target="_blank"
                rel="noopener noreferrer">
                <i class="fa-brands fa-spotify"></i>
              </a>
            </div>
            <div class="sub-col" id="last">
              <a href="https://github.com/AndrinStud/Heim-At-Stadt" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-col">
          <!-- Beispiel: Über uns -->
          <a href="../sites/UeberUns.html">Über uns</a>
        </div>
      </div>
    </div>
  </footer>
  <script type="module">
    import { Factchecker } from "../js/Factchecker.js";
    let facts = <?php echo json_encode($facts); ?>;
    new Factchecker("Ce4C790pRR8", facts);
  </script>
</body>

</html>
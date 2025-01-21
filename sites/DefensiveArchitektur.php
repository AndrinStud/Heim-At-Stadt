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
        <p>Defensive Architektur, von Skatestoppern bis hin zu ungemütlichen Sitzbänken, beeinflusst den öffentlichen
          Raum
          in Schweizer Städten auf subtile, aber tiefgreifende Weise. Diese Massnahmen sollen Sicherheit fördern und
          Nutzungskonflikte entschärfen, schränken jedoch gleichzeitig die Zugänglichkeit und Aneignung öffentlicher
          Orte
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
    <footer class="footer">
      <div class="top-row">
        <div class="footer-col">
          <div class="logo">
            <a href="/Heim-At-Stadt/index.html">
              <img src="/images/Logo_Heimatstadt.png" alt="heimatstadt logo">
            </a>
          </div>
        </div>
        <div class="footer-col rotating-text">
          <p>
            Ein Projekt von
          </p>
          <p class="rotating-names">
            <span class="word heimatstadt">HEIM@STADT.</span>
            <span class="word elina">ELINA.</span>
            <span class="word patrick">PATRICK.</span>
            <span class="word yuri">YURI.</span>
            <span class="word andrea">ANDREA.</span>
            <span class="word jermyn">JERMYN.</span>
            <span class="word andrin">ANDRIN.</span>
          </p>
        </div>
        <div class="footer-col oben">
          <a href="#top">Nach oben</a>
          <a href="Impressum.html">Impressum</a>
          <a href="UeberUns.html">Über uns</a>
        </div>
      </div>
      <div class="footer-row bottom-row">
        <div class="footer-col"></div>
        <div class="footer-col col-with-subgrid">
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
        <div class="footer-col"></div>
      </div>
    </footer>
    <script type="module">
      import "../js/rotator.js";
      import { Factchecker } from "../js/Factchecker.js";
      let facts = <?php echo json_encode($facts); ?>;
      new Factchecker("0aMJ8EGVAEs", facts);
    </script>
</body>

</html>
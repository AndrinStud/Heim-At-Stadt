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
<html lang="de">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>heim@stadt - Defensive Architektur</title>
  <script src="https://kit.fontawesome.com/e5010892c5.js" crossorigin="anonymous"></script>
  <link rel="icon" type="image/x-icon" href="../images/WebsiteIcon.png">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/subpage.css">
</head>

<body id="top" class="videoBody">
  <div class="logoAndMobileNav">
    <div class="mobileNavTop">
      <a href="https://heimatstadt.info/">
        <img src="../images/Logo_Heimatstadt.png" alt="Logo Heim@Stadt" class="logo">
      </a>
      <a href="javascript:void(0);" id="hamburgerIcon">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    <div id="mobileNavBottom">
      <a href="ServicedApartments.php">Serviced Apartments</a>
      <a href="UntilPublication.html">Hausbesetzung</a>
      <a href="SmartCity.php">Smart City</a>
      <a href="#">Defensive Architektur</a>
      <a href="Podcast.html">Podcast</a>
    </div>
  </div>
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
        <a href="UntilPublication.html">
          <li>Hausbesetzung</li>
        </a>
        <a href="SmartCity.php">
          <li>Smart City</li>
        </a>
        <a href="Podcast.html">
          <li>Podcast</li>
        </a>
      </ul>
    </nav>
  </header>
  <main>
    <section class="titleAndLead">
      <h1>Defensive Architektur: Verborgene Barrieren <span class="word andrin">von
          Andrin Schärli</span></h1>
      <p>Was haben ungemütliche Sitzbänke, Skatestopper und klassische Musik an Bahnhöfen gemeinsam? Solche Elemente
        sind typische Beispiele für sogenannte defensive Architektur. Sie zielen darauf ab, bestimmte Verhaltensweisen
        im öffentlichen Raum einzuschränken oder zu lenken. Oft geht es auch darum, obdachlose Menschen aus dem
        öffentlichen Raum zu vertreiben. Ein Stadtführer des Magazin Surprise, eine Gassenarbeiterin, ein Architekt und
        ein Betroffener erläutern, was hinter dieser Gestaltungsweise steckt. Der Film zeigt neue Perspektiven auf
        Städte in der Deutschschweiz und macht Barrieren sichtbar, die vielen bislang verborgen geblieben sein könnten.
      </p>
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
          <a href="https://heimatstadt.info/">
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
    import { MobileMenu } from '../js/Navigation.js';
    new MobileMenu(true);

    import { Factchecker } from "../js/Factchecker.js";
    let facts = <?php echo json_encode($facts); ?>;
    new Factchecker("Jmsm83UL_Hg", facts);
  </script>
</body>

</html>
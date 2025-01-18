<?php
  require_once '../php/config.php';
  $pdo = new PDO($dsn, $db_user, $db_pass, $options);

  $stmt = $pdo->query("SELECT id FROM site WHERE name='Hausbesetzung'");
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
    <title>Heim@Stadt - Hausbesetzungen</title>
    <script src="https://kit.fontawesome.com/e5010892c5.js" crossorigin="anonymous"></script>
    <link rel="icon" type="image/x-icon" href="../images/WebsiteIcon.png">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/subpage.css">
</head>
<body id="top">
    <header>
        <a href="https://heimatstadt.info/"><img src="../images/Logo_Heimatstadt.png" alt="Logo Heim@Stadt"></a>
    </header>
    <h1>Hausbesetzungen: Blick hinter die Mauern <span class="word yuri">von Yuri Fontanive</span></h1>
    <p>Wer besetzt heute in der Schweiz überhaupt noch leerstehende Häuser und was bewegt die Menschen dazu? Ist die Hausbesetzer:innenbewegung noch so präsent wie früher – oder nur ein staubiges Kapitel der Geschichte?<br /><br />In diesem Film gehe ich den Fragen nach, was hinter den Fassaden besetzter Häuser steckt und was Hausbesetzungen heute noch bewirken können. Mit einem Blick auf die ELSI Hausbesetzung in Basel und die Perspektiven der Bewohner:innen zeigt sich, wie lebendig diese kontroverse Bewegung noch ist.</p>
    <br />
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
        <aside id="player"></aside>
        <main id="factcheck">
            <h3>Faktencheck</h3>
            <article id="checkArea"></article>
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
                  <p>Ein Projekt von <span class="word yuri">yuri</span></p>
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
                  <a href="https://open.spotify.com/user/31qms57eosf6edpkozi6zww6g5dy?si=8c1c324d77c3422d" target="_blank" rel="noopener noreferrer">
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
    new Factchecker("pHA20yu3Lco", facts);
  </script>
</body>
</html>
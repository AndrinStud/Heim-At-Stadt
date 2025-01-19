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
        <a href="SmartCity.php">
          <li>Smart City</li>
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
      <h1>Hausbesetzungen: Blick hinter die Mauern <span class="word yuri">von Yuri Fontanive</span></h1>
      <p>Wer besetzt heute in der Schweiz überhaupt noch leerstehende Häuser und was bewegt die Menschen dazu? Ist die
        Hausbesetzer:innenbewegung noch so präsent wie früher - oder nur ein staubiges Kapitel der
        Geschichte?<br /><br />In diesem Film gehe ich den Fragen nach, was hinter den Fassaden besetzter Häuser steckt
        und was Hausbesetzungen heute noch bewirken können. Mit einem Blick auf die ELSI Hausbesetzung in Basel und die
        Perspektiven der Bewohner:innen zeigt sich, wie lebendig diese kontroverse Bewegung noch ist.</p>
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
    new Factchecker("pHA20yu3Lco", facts);
  </script>
</body>

</html>
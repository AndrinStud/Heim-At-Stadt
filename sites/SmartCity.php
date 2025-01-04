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
    <h1>Smart City: Chancen und Gefahren <span class="word jermyn">von Jermyn Dörig</span></h1>
    <p>Zürich wurde zum fünften Mal zur weltweit smartesten Stadt ausgezeichnet. Doch was macht eine Stadt wirklich smart? In Smart Cities entscheiden etwa Strassenlaternen selbst, ob sie leuchten oder nicht. Die Stadtentwicklerin Anna Schindler erklärt, warum Zürich so erfolgreich ist. Der Präsident der Piratenpartei beleuchtet das Thema kritisch und warnt vor kommerziellen Interessen. Fachpersonen, darunter ein Hacker, analysieren brisante Fragen zu Datenschutz und Cyberangriffen. Am Ende bleibt die zentrale Frage: Wie schlau ist eine Smart City wirklich?</p>
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
    <script>
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
  
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'Ce4C790pRR8',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        }
  
        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
          event.target.playVideo(); // You can omit this to prevent the video starting as soon as it loads.
        }
  
        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;
        var checkArea = document.getElementById('checkArea');

        function onPlayerStateChange(event) {
          if (event.data == YT.PlayerState.PLAYING && !done) {
            console.log('changed!');
            <?php
                $factsLength = count($facts);
                $factCache = [];
                for ($i = 0; $i < $factsLength; $i++) {
                  $fact = $facts[$i];
                  
                  if ($i < $factsLength - 1 && $facts[$i + 1]['video_timestamp'] - $fact['video_timestamp'] == 1) {
                    echo 'console.log("True for: ' . $fact['comment'] . '");';
                    $factCache[] = $fact; // Corrected line
                    continue;
                  }

                  if (count($factCache) > 0) {
                    foreach ($factCache as $factCacheItem) {
                      $fact['comment'] .= $factCacheItem['comment'];
                    }
                    $fact['video_timestamp'] = $factCache[0]['video_timestamp'];
                    $factCache = [];
                  }
                  
                  echo 'setTimeout(function() { showFact("' . $fact['name'] . '", "' . $fact['comment'] . '"); }, ' . $fact['video_timestamp'] . ');';
                }
            ?>
            done = true;
          }
        }
        function stopVideo() {
          player.stopVideo();
        }
        function showFact(type, text) {
            console.log('showing fact');
            let accountProfilePicture = document.createElement('img');
            accountProfilePicture.src = '../images/' + type + '.png';
            let comment = document.createElement('span');
            comment.innerText = text;

                        // Detect links in the text and convert them to <a> elements
                        let linkRegex = /(https?:\/\/[^\s]+)/g;
            let parts = text.split(linkRegex);
            parts.forEach(part => {
                if (linkRegex.test(part)) {
                    let link = document.createElement('a');
                    link.href = part;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.innerText = part;
                    comment.appendChild(link);
                } else {
                    comment.appendChild(document.createTextNode(part));
                }
            });
            
            let fact = document.createElement('div');
            let bgColor = 'white';
            switch (type) {
                case 'Fakt':
                    bgColor = '#00D072';
                    break;
                case 'Falschinformation':
                    bgColor = '#ECAE71';
                    break;
                case 'Nicht überprüfbar':
                    bgColor = '#EEFF00';
                    break;
                case 'Produktionsinformation':
                    bgColor = '#76E0FF';
                    break;
            }
            fact.style.backgroundColor = bgColor;
            fact.appendChild(accountProfilePicture);
            fact.appendChild(comment);
            checkArea.appendChild(fact);
            checkArea.scrollTop = checkArea.scrollHeight;
        }
      </script>
</body>
</html>
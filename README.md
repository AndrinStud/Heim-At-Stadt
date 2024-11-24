# Anleitung zum Start (Programmierung in VS Code)
## Schritt 1: Variablen für Visual Studio SFTP-Extension einrichten
1. Die SFTP Extension von Natizyskunk installieren
2. Auf oberster Ebene Ordner **.vscode** erstellen
3. Darin eine Datei mit dem Namen **sftp.json** erstellen
4. Folgendes muss dort rein:

    	{
          "name": "DEIN WUNSCHNAME",
          "host": "HOST",
          "protocol": "ftp",
          "port": 21,
          "username": "USERNAME",
          "password": "PASSWORD",
          "remotePath": "/",
          "uploadOnSave": true,
          "useTempFile": false,
          "openSsh": false,
          "ignore": [
              ".vscode",
              "README.md",
              ".git",
              ".DS_Store",
              ".gitignore",
              "sql"
          ]
      }
   
    > **Wichtig:** *HOST*, *USERNAME* und *PASSWORD* müssen nun durch die FTP-Anmeldedaten des Entwicklungsserver ersetzt werden!

## Schritt 2: Umgebungsvariablen einrichten
1. Auf oberster Ebene Datei **.env** erstellen
2. Folgendes muss dort rein:

    	OAUTH2_CLIENTID=GOOGLE_API_OAUTH2.0_CLIENT_ID
    	OAUTH2_CLIENTSECRET=GOOGLE_API_OAUTH2.0_CLIENT_SECRET
        DB_HOST=DATENBANKHOST
        DB_NAME=DATENBANKNAME
        DB_USER=BENUTZERNAME
        DB_PASS=PASSWORT

    > **Wichtig:** *GOOGLE_API_OAUTH2.0_CLIENT_ID* und *GOOGLE_API_OAUTH2.0_CLIENT_SECRET* müssen durch deine Anmeldedaten zur Tokengewinnung bei Google API OAuth 2.0 ersetzt werden. DATENBANKHOST, DATENBANKNAME, BENUTZERNAME und PASSWORT müssen durch die Anmeldedaten der Datenbank deines Entwicklungsserver ersetzt werden.

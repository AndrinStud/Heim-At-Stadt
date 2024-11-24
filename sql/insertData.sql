-- Betroffene Tabellen leeren
    TRUNCATE TABLE fact;
-- ////////////////////////////////////////////////////

-- Existente Funktionen löschen und neu erstellen
    DROP FUNCTION IF EXISTS get_site_id;
    DROP FUNCTION IF EXISTS get_account_id;

    DELIMITER //

    CREATE FUNCTION get_site_id(param_name VARCHAR(255))
    RETURNS CHAR(36)
    DETERMINISTIC
    BEGIN
        DECLARE ret_id CHAR(36);
        SELECT id INTO ret_id FROM site WHERE name = param_name;
        RETURN ret_id;
    END //

    CREATE FUNCTION get_account_id(param_name VARCHAR(255))
    RETURNS CHAR(36)
    DETERMINISTIC
    BEGIN
        DECLARE ret_id CHAR(36);
        SELECT id INTO ret_id FROM account WHERE name = param_name;
        RETURN ret_id;
    END //

    DELIMITER ;
-- ////////////////////////////////////////////////////

-- Tabellen befüllen
    INSERT INTO fact (site, account, comment, video_timestamp)
    VALUES
    (get_site_id('Faktenchecker'), get_account_id('Produktionsinformation'), 'Animation von Alisa A.', 1000),
    (get_site_id('Faktenchecker'), get_account_id('Fakt'), 'In monatelanger Arbeit haben im Jahr 2005 Kletterer den Bunker also zum Kletterturm umgebaut. Und dabei haben sie sich richtig Mühe gegeben:', 15000),
    (get_site_id('Faktenchecker'), get_account_id('Fakt'), 'Es gibt ungefähr 40 Möglichkeiten, den Kegel zu erklimmen, die Schwierigkeitsgrade gehen von 3+ bis 10. Quelle: https://www.in-berlin-brandenburg.com/Wellness/Sport/Freizeitsport/Klettern/Kegel.html', 15001),
    (get_site_id('Faktenchecker'), get_account_id('Produktionsinformation'), 'Das Archivfoto stammt von Christian W. aus dem Buch Musterbuch (2010)', 24000),
    (get_site_id('Faktenchecker'), get_account_id('Fakt'), 'Höhe des Turms (18.7m) und Bekletterbarkeit des Turms haben wir von: https://www.in-berlin-brandenburg.com/Wellness/Sport/Freizeitsport/Klettern/Kegel.html', 33000),
    (get_site_id('Faktenchecker'), get_account_id('Falschinformation'), 'Er heisst nicht Lee, sondern Legion', 41000),
    (get_site_id('Faktenchecker'), get_account_id('Nicht überprüfbar'), 'Es ist nicht überprüfbar ob er wirklich 28 Jahre alt ist und seit 5 Jahren Trainer am Kegel ist, sorry.', 47000);
-- ////////////////////////////////////////////////////
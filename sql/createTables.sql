-- Existente Tabellen löschen
    DROP TABLE IF EXISTS account;
    DROP TABLE IF EXISTS site;
    DROP TABLE IF EXISTS fact;
-- ////////////////////////////////////////////////////

-- Tabellen erstellen
    CREATE TABLE account (
        id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE site (
        id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE fact (
        id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
        site CHAR(36) NOT NULL REFERENCES site(id),
        account CHAR(36) NOT NULL REFERENCES account(id),
        comment VARCHAR(200) NOT NULL,
        video_timestamp INTEGER NOT NULL,
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
-- ////////////////////////////////////////////////////

-- Tabellen befüllen
    INSERT INTO account (name)
    VALUES 
    ('Fakt'),
    ('Falschinformation'),
    ('Nicht überprüfbar'),
    ('Produktionsinformation');

    INSERT INTO site (name)
    VALUES 
    ('DefensiveArchitektur'),
    ('Faktenchecker'),
    ('Hausbesetzung'),
    ('ServicedApartments'),
    ('SmartCity');
-- ////////////////////////////////////////////////////
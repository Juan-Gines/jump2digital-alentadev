-- Creamos la DB
DROP DATABASE IF EXISTS skinsdb;
CREATE DATABASE skinsdb DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE skinsdb;

CREATE TABLE skins (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  skin_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  color VARCHAR(50) NOT NULL,
  price INT UNSIGNED NOT NULL
);

-- Insertamos unos registros para probarla
INSERT INTO skins (skin_id, user_id, name, category, type, color, price) VALUES
  (1, 1, "Rey Oscuro", "Legión Oscura", "Caballero", "negro", 500),
  (2, 1, "Terrorífico", "Legión Oscura", "Elfo", "violeta", 500),
  (10, 1, "Bañador a rayas", "Fiesta en la piscina", "Orco", "rojo", 350),
  (13, 1, "La muerte", "Muerte", "Orco", "negro", 350),
  (5, 2, "Caballero de la luz", "Legión de la luz", "Caballero", "oro", 500),
  (12, 2, "Que fiestón", "Fiesta en la piscina", "Elfo", "amarillo", 350),
  (15, 2, "El gran minero", "Minero", "Enano", "marron", 200),
  (14, 3, "Alto rey", "Rey", "Elfo", "azul", 200),
  (7, 3, "Enano de la luz", "Legión de la luz", "Enano", "blanco", 500);
-- Active: 1687995790268@@127.0.0.1@3306@banco_solar
CREATE DATABASE banco_solar;

use banco_solar;

CREATE TABLE
    usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        balance INT CHECK (balance >= 0) NOT NULL
    );

CREATE TABLE
    transferencias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        emisor INT NOT NULL,
        receptor INT NOT NULL,
        monto INT NOT NULL,
        fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (emisor) REFERENCES usuarios (id),
        FOREIGN KEY (receptor) REFERENCES usuarios (id)
    );

--Crear 4 Usuarios ADD
INSERT INTO
    usuarios (nombre, balance)
VALUES
    ('Frank', 7500),
    ('Juan', 4050),
    ('Pedro', 9400),
    ('Ana', 10000);

-- Crear 4 Transferencias 
INSERT INTO
    transferencias (emisor, receptor, monto, fecha)
VALUES
    (1, 2, 1000, '2022-01-01 10:00:00'),
    (2, 3, 2000, '2022-01-01 11:00:00'),
    (3, 4, 3000, '2022-01-01 12:00:00'),
    (4, 1, 4000, '2022-01-01 13:00:00');

-- SELECT * FROM usuarios;
-- SELECT * FROM transferencias;
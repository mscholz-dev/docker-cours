require('dotenv').config();
const express = require('express');
const app = express();

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

connection.connect();

const initDB = async () => {
  try {
    // Créer la base de données
    await connection.promise().query('CREATE DATABASE page_counter;');

    // Utiliser la base de données nouvellement créée
    await connection.promise().query('USE page_counter;');

    // Créer la table counter
    await connection
      .promise()
      .query(
        'CREATE TABLE counter (id INT PRIMARY KEY NOT NULL, value INT NOT NULL);',
      );

    // Initialiser le compteur à 0
    await connection.promise().query('INSERT INTO counter VALUES (0, 0);');
  } catch (error) {
    throw error;
  }
};

app.get('/reset-db', async (req, res) => {
  try {
    // Supprimer la base de données si elle existe
    await connection.promise().query('DROP DATABASE IF EXISTS page_counter;');

    await initDB();

    res
      .status(200)
      .json('Everything is set up from scratch. Counter initialized at 0');
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('*', async (req, res) => {
  try {
    // Mise à jour de la valeur
    await connection
      .promise()
      .query('UPDATE page_counter.counter SET value = value + 1 WHERE id = 0');

    // Récupération de la valeur mise à jour
    const [selectResult] = await connection
      .promise()
      .query('SELECT value FROM page_counter.counter WHERE id = 0');

    // Envoi de la valeur mise à jour en réponse
    res.status(200).json({ value: selectResult[0].value });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(80);

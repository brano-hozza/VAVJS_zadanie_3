CREATE DATABASE IF NOT EXISTS zahrada CHARACTER SET utf8 COLLATE utf8_general_ci;

USE zahrada;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

FLUSH PRIVILEGES;

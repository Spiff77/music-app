import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'passw0rd',
    database: 'music_db',
});

export default connection;

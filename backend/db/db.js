import mysql2  from 'mysql2/promise';

export const db =   mysql2.createPool({
    host: 'localhost',
    database: 'tpiprog3',
    user: 'root',
    password: '46967641',
    port: 3306
})


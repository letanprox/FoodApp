var sql = require("mssql");

// create here sql connection.
var config = {
    user: 'sa',
    password: 'reallyStrongPwd123',
    server: 'localhost', 
    database: 'FOODAPP',
    synchronize: true,
    trustServerCertificate: true,
};


const poolPromise = new sql.ConnectionPool(config)  
.connect()  
.then(pool => {  
    console.log('Connected to MSSQL')  
    return pool  
}) 
.catch(err => console.log('Database Connection Failed! Bad Config: ', err))  



module.exports = {  
sql, poolPromise  
}  
const sql = require('mssql')  
const { poolPromise } = require('../../config/db.sql.config.js');
let pool;

var NguoiDung = function (){
}

NguoiDung.getInsertUser = async (ten, anh, email, matkhau, sdt ,result) =>{
    pool = await poolPromise  
    await pool.request().query("INSERT INTO USERS (TEN, ANH, EMAIL, MATKHAU, SDT) "+
    "OUTPUT Inserted.ID "+
    "VALUES('"+ten+"', '"+anh+"', '"+email+"','"+matkhau+"', '"+sdt+"');",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


NguoiDung.getUpdateUser = async (id ,ten, anh, email, sdt ,result) =>{
    pool = await poolPromise  
    await pool.request().query("UPDATE USERS SET TEN = '"+ten+"', EMAIL= '"+email+"' , SDT= '"+sdt+"' , ANH= '"+anh+"' WHERE ID = "+id+";",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


NguoiDung.getLoginUser = async (ten, matkhau ,result) =>{
    pool = await poolPromise  
    await pool.request().query("select * from USERS WHERE TEN = '"+ten+"' AND MATKHAU = '"+matkhau+"'",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


NguoiDung.getGoogleAuth = async (ten, email ,result) =>{
    pool = await poolPromise  
    await pool.request().query("select * from USERS WHERE TEN = '"+ten+"' AND EMAIL = '"+email+"'",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


NguoiDung.getPhoneUser = async (sdt,result) =>{
    pool = await poolPromise  
    await pool.request().query("select * from USERS WHERE SDT = '"+sdt+"'",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}




module.exports = NguoiDung;

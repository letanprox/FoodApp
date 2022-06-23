const sql = require('mssql')  
const { poolPromise } = require('../../config/db.sql.config.js');
let pool;

var NguoiDung = function (){
}


NguoiDung.getLoginUser = async (tendangnhap, matkhau ,result) =>{
    console.log(tendangnhap, matkhau);
    pool = await poolPromise  
    await pool.request().query("select * from CUAHANG WHERE TENDANGNHAP = '"+tendangnhap + "' AND MATKHAU = '"+matkhau + "';",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


NguoiDung.getInsertUser = async (tendangnhap, tencuahang, mota, matkhau ,result) =>{
    pool = await poolPromise  
    await pool.request().query("INSERT INTO CUAHANG (TENDANGNHAP, TEN , MOTA, ID_LOAISANPHAM, MATKHAU) VALUES ( '"+tendangnhap + "', N'"+tencuahang + "' , N'"+mota +"' , 1 , '"+matkhau + "');",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}

NguoiDung.getUserDetail = async (req,result) =>{
    pool = await poolPromise  
    await pool.request().query('SELECT CUAHANG.TEN, CUAHANG.TENDANGNHAP, CUAHANG.ANH, CUAHANG.MOTA, CUAHANG.VITRI, CUAHANG.ID_LOAISANPHAM, CUAHANG.THOIGIANMO, LOAISANPHAM.TEN AS TEN_LOAISANPHAM FROM CUAHANG, LOAISANPHAM WHERE CUAHANG.ID = '+req.query.idch +  'AND CUAHANG.ID_LOAISANPHAM = LOAISANPHAM.ID',function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


NguoiDung.postUpdateUserImage = async (req,result) =>{
    pool = await poolPromise  
    await pool.request().query("UPDATE CUAHANG SET TEN = N'"+req.fields.tencuahang+"', MOTA = N'"+req.fields.gioithieu+"', VITRI = N'"+req.fields.diachi+"', THOIGIANMO = N'"+req.fields.thoigianmo+"', TENDANGNHAP = N'"+req.fields.tendangnhap+"' , ID_LOAISANPHAM = "+req.fields.idloaisanpham+", ANH = 'http://localhost:4000/public/"+ req.files.file.name.replace(/\s+/g, '') +"' WHERE ID = "+req.fields.idch+";",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}

NguoiDung.postUpdateUser = async (req,result) =>{
    pool = await poolPromise  
    await pool.request().query("UPDATE CUAHANG SET TEN = N'"+req.fields.tencuahang+"', MOTA = N'"+req.fields.gioithieu+"', VITRI = N'"+req.fields.diachi+"', THOIGIANMO = N'"+req.fields.thoigianmo+"', TENDANGNHAP = N'"+req.fields.tendangnhap+"' , ID_LOAISANPHAM = "+req.fields.idloaisanpham+" WHERE ID = "+req.fields.idch+";",function(err, databack){  
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

const sql = require('mssql')  
const { poolPromise } = require('../../config/db.sql.config.js');
let pool;

var CuaHang = function (){
}

CuaHang.getLoaiCuaHangList = async (result) =>{
    pool = await poolPromise  
    await pool.request().query('select * from LOAISANPHAM',function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}

CuaHang.getCuaHangTheoLoaiCuaHangList = async (idsp, result) =>{
    pool = await poolPromise  
    await pool.request().query('select * from CUAHANG WHERE ID_LOAISANPHAM = ' + idsp ,function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}

CuaHang.getCuaHangDeXuatList = async (result) =>{
    pool = await poolPromise  
    await pool.request().query('select * from CUAHANG',function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


CuaHang.getCuaHangTimKiemList = async (setxt,result) =>{
    pool = await poolPromise  
    await pool.request().query("select * from CUAHANG WHERE TEN LIKE '%"+setxt+"%'",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


CuaHang.getSanPhamCuaCuaHang = async (id,result) =>{
    pool = await poolPromise  
    await pool.request().query('select * from SANPHAM where IDCUAHANG = '+id,function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}




CuaHang.getCheckSaveCuaHang = async (iduser, idch ,result) =>{
    pool = await poolPromise  
    await pool.request().query('select * from USER_CUAHANG WHERE ID_USER = '+iduser + ' AND ID_CUAHANG = '+idch,function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


CuaHang.getInsertSaveCuaHang = async (iduser, idch, danhgia, mark ,result) =>{
    pool = await poolPromise  
    await pool.request().query("INSERT INTO USER_CUAHANG (ID_USER, ID_CUAHANG, DANHGIA, MARK) VALUES ("+iduser + ", "+idch + " , "+danhgia +" , "+mark +");",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


CuaHang.getUpdateSaveCuaHang = async (iduser, idch, danhgia, mark ,result) =>{
    pool = await poolPromise  
    await pool.request().query("UPDATE USER_CUAHANG SET DANHGIA = "+danhgia +" , MARK = "+mark +" WHERE ID_USER = "+iduser +" AND ID_CUAHANG = "+idch +";",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}

CuaHang.getSaveCuaHangList = async (iduser,result) =>{
    pool = await poolPromise  
    await pool.request().query("SELECT CUAHANG.ID , CUAHANG.TEN , CUAHANG.MOTA, CUAHANG.VITRI, CUAHANG.THOIGIANMO, CUAHANG.DANHGIA, CUAHANG.GIATB, CUAHANG.ANH FROM CUAHANG INNER JOIN USER_CUAHANG ON CUAHANG.ID=USER_CUAHANG.ID_CUAHANG WHERE ID_USER="+iduser +" AND MARK > 0;",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}



module.exports = CuaHang;

const sql = require('mssql')  
const { poolPromise } = require('../../config/db.sql.config.js');
let pool;

var SanPham = function (){
}


SanPham.postInsertSanPham = async (req ,result) =>{
    pool = await poolPromise  
    await pool.request().query("INSERT INTO SANPHAM (TEN, SOLUONGBAN, ANH, GIA, IDCUAHANG) VALUES ( N'"+req.fields.tensanpham + "', '"+req.fields.soluong + "' , 'http://localhost:4000/public/"+ req.files.file.name.replace(/\s+/g, '') +"' , '"+req.fields.gia +"' , '"+req.fields.idcuahang + "');",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


SanPham.postUpdateSanPhamImage = async (req ,result) =>{
    pool = await poolPromise  
    await pool.request().query("UPDATE SANPHAM SET TEN = N'"+req.fields.tensanpham+"', SOLUONGBAN = '"+req.fields.soluong+"', GIA = '"+req.fields.gia+"', ANH = 'http://localhost:4000/public/"+ req.files.file.name.replace(/\s+/g, '') +"' WHERE ID = "+req.fields.idsanpham+";",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


SanPham.postUpdateSanPham = async (req ,result) =>{
    pool = await poolPromise  
    await pool.request().query("UPDATE SANPHAM SET TEN = N'"+req.fields.tensanpham+"', SOLUONGBAN = '"+req.fields.soluong+"', GIA = '"+req.fields.gia+"' WHERE ID = "+req.fields.idsanpham+";",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


module.exports = SanPham;

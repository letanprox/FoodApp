const sql = require('mssql')  
const { poolPromise } = require('../../config/db.sql.config.js');
let pool;

var DonHang = function (){
}


DonHang.getDonHangList= async (result) =>{
    pool = await poolPromise  
    await pool.request().query('SELECT * FROM  (SELECT DONHANG.ID, DONHANG.GIA, DONHANG.NGAYDAT, DONHANG.TRANGTHAI, USERS.ANH, USERS.TEN, USERS.DIACHI FROM DONHANG LEFT JOIN USERS ON (DONHANG.ID_USERS = USERS.ID)) A INNER JOIN   (SELECT ID_DONHANG, SUM(SOLUONG) AS SOLUONG FROM DONHANG_SANPHAM  WHERE ID_DONHANG IN (SELECT DONHANG.ID FROM DONHANG INNER JOIN USERS  ON DONHANG.ID_USERS = USERS.ID)  GROUP BY ID_DONHANG ) B ON (A.ID = B.ID_DONHANG)',function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}

DonHang.getDonHangDetail= async (req ,result) =>{
    pool = await poolPromise  
    await pool.request().query('SELECT * FROM DONHANG_SANPHAM, SANPHAM WHERE DONHANG_SANPHAM.ID_SANPHAM = SANPHAM.ID AND DONHANG_SANPHAM.ID_DONHANG = '+req.query.idorder,function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}

DonHang.getDonHangApprove= async (req ,result) =>{
    pool = await poolPromise  
    await pool.request().query("UPDATE DONHANG SET TRANGTHAI = '"+req.query.trangthai +"' WHERE ID = "+req.query.id,function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}




module.exports = DonHang;

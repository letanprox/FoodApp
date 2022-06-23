const sql = require('mssql')  
const { poolPromise } = require('../../config/db.sql.config.js');
let pool;

var DonHang = function (){
}

DonHang.postInsertDonHangList = async ( gia ,result) =>{
    pool = await poolPromise  
    await pool.request().query("INSERT INTO DONHANG (GIA, TRANGTHAI, ID_USERS) " + "OUTPUT Inserted.ID "+ "VALUES("+gia+", 'N', 3);",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}

DonHang.postInsertDonHangSanPhamList = async ( ID, k, fk ,result) =>{
    pool = await poolPromise  
    await pool.request().query("INSERT INTO DONHANG_SANPHAM (ID_DONHANG, ID_SANPHAM,SOLUONG) "+" VALUES("+ID+", "+k+", "+fk+");",function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


DonHang.getDonHangCuaNguoiDung = async (result) =>{
    pool = await poolPromise  
    await pool.request().query('select * from DONHANG',function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}

DonHang.getSanPhamCuaDonHang = async ( id ,result) =>{
    pool = await poolPromise  
    await pool.request().query('SELECT * FROM SANPHAM INNER JOIN DONHANG_SANPHAM ON SANPHAM.ID=DONHANG_SANPHAM.ID_SANPHAM WHERE ID_DONHANG='+id,function(err, databack){  
        if(err){
            console.log('Error while fetching ', err);
            result(null,err);
        }else{
            console.log('Fetched successfully');
            result(null,databack);
        }
    }) 
}


DonHang.getDataChart = async (result) =>{
    pool = await poolPromise  
    await pool.request().query("SELECT NGAYDAT, COUNT(NGAYDAT) AS SOLUONG FROM DONHANG GROUP BY NGAYDAT ORDER BY NGAYDAT;",function(err, databack){  
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

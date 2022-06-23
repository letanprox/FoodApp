var express = require('express');
var app = express();
const path = require('path');
const fs = require('fs');
const formidableMiddleware = require('express-formidable');


var sql = require("mssql");
// config for your database
var config = {
    user: 'sa',
    password: 'reallyStrongPwd123',
    server: 'localhost', 
    database: 'FOODAPP',
    synchronize: true,
    trustServerCertificate: true,
};


sql.connect(config, function (err) {
    // connect to your database
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    app.use(formidableMiddleware());


    let CORSres = (res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        return res;
    }

    let QueryFu = async (sql) => {
        request.query(sql, function (err, recordset) {
            if (err) console.log(err)
            return recordset;    
        });
    }




///////ADMIN

    //STORE:
    app.post('/api/insert/sanpham', async function(req, res) {
        console.log(req.files.file);
        console.log(req.fields.tensanpham);
        console.log(req.fields.soluong);
        console.log(req.fields.gia);

        let newPath =path.join(__dirname, "./public/" + req.files.file.name.replace(/\s+/g, ''));
        console.log(req.files.file.path,newPath)
        fs.readFile(req.files.file.path, function (err, data) {
            fs.writeFile(newPath, data, function (err) {
             });
        });
        let resu = await QueryFu("INSERT INTO SANPHAM (TEN, SOLUONGBAN, ANH, GIA, IDCUAHANG) VALUES ( N'"+req.fields.tensanpham + "', '"+req.fields.soluong + "' , 'http://localhost:4000/public/"+ req.files.file.name.replace(/\s+/g, '') +"' , '"+req.fields.gia +"' , '"+req.fields.idcuahang + "');");
        CORSres(res).send(resu);
    });

    app.post('/api/update/0/sanpham', async function(req, res) {
        console.log(req.files.file);
        console.log(req.fields.tensanpham);
        console.log(req.fields.soluong);
        console.log(req.fields.gia);

        let newPath =path.join(__dirname, "./public/" + req.files.file.name.replace(/\s+/g, ''));
        console.log(req.files.file.path,newPath)
        fs.readFile(req.files.file.path, function (err, data) {
            fs.writeFile(newPath, data, function (err) {
             });
           });

        let resu = await QueryFu("UPDATE SANPHAM SET TEN = N'"+req.fields.tensanpham+"', SOLUONGBAN = '"+req.fields.soluong+"', GIA = '"+req.fields.gia+"', ANH = 'http://localhost:4000/public/"+ req.files.file.name.replace(/\s+/g, '') +"' WHERE ID = "+req.fields.idsanpham+";");
        CORSres(res).send(resu);
    });

    app.post('/api/update/1/sanpham', async function(req, res) {
        console.log(req.fields.tensanpham);
        console.log(req.fields.soluong);
        console.log(req.fields.gia);
        console.log(req.fields.idcuahang);
        console.log(req.fields.idsanpham);

        let resu = await QueryFu("UPDATE SANPHAM SET TEN = N'"+req.fields.tensanpham+"', SOLUONGBAN = '"+req.fields.soluong+"', GIA = '"+req.fields.gia+"' WHERE ID = "+req.fields.idsanpham+";");
        CORSres(res).send(resu);
    });







    ///LOGIN:
    app.post('/api/insert/cuahang', async function(req, res) {
            console.log(req.fields.tendangnhap);
            console.log(req.fields.tencuahang);
            console.log(req.fields.mota);
            console.log(req.fields.matkhau);

            let resu = await QueryFu("INSERT INTO CUAHANG (TENDANGNHAP, TEN , MOTA, ID_LOAISANPHAM, MATKHAU) VALUES ( '"+req.fields.tendangnhap + "', N'"+req.fields.tencuahang + "' , N'"+req.fields.mota +"' , 1 , '"+req.fields.matkhau + "');");
            CORSres(res).send(resu);
        });

        app.get('/api/checklogin/cuahang', async function(req, res) {
            console.log(req.query.matkhau);
            console.log(req.query.tendangnhap);

            request.query("select * from CUAHANG WHERE TENDANGNHAP = '"+req.query.tendangnhap + "' AND MATKHAU = '"+req.query.matkhau + "';", function (err, recordset) {
                if (err) console.log(err)
                // send records as a response
                console.log(recordset['recordsets'][0].length);
                if(recordset['recordsets'][0].length > 0){
                    CORSres(res).send(recordset['recordsets'][0]);
                }else{
                    CORSres(res).send(recordset['recordsets'][0]);
                }
            });
        });




        /// ACCOUNT:
        app.get('/cuahang/admin/detail', function (req, res) {
            request.query('SELECT CUAHANG.TEN, CUAHANG.TENDANGNHAP, CUAHANG.ANH, CUAHANG.MOTA, CUAHANG.VITRI, CUAHANG.ID_LOAISANPHAM, CUAHANG.THOIGIANMO, LOAISANPHAM.TEN AS TEN_LOAISANPHAM FROM CUAHANG, LOAISANPHAM WHERE CUAHANG.ID = '+req.query.idch +  'AND CUAHANG.ID_LOAISANPHAM = LOAISANPHAM.ID', function (err, recordset) {
                if (err) console.log(err)
                // send records as a response
                CORSres(res).send(recordset);
            });
        }); 

        app.post('/api/update/0/account', function(req, res) {
            console.log(req.fields.idch);
            console.log(req.fields.tendangnhap);
            console.log(req.fields.tencuahang);
            console.log(req.fields.diachi);
            console.log(req.fields.gioithieu);
            console.log(req.fields.thoigianmo);
            console.log(req.fields.idloaisanpham);
            request.query("UPDATE CUAHANG SET TEN = N'"+req.fields.tencuahang+"', MOTA = N'"+req.fields.gioithieu+"', VITRI = N'"+req.fields.diachi+"', THOIGIANMO = N'"+req.fields.thoigianmo+"', TENDANGNHAP = N'"+req.fields.tendangnhap+"' , ID_LOAISANPHAM = "+req.fields.idloaisanpham+" WHERE ID = "+req.fields.idch+";", function (err, recordset) {
                if (err) console.log(err) 
                // send records as a response
                CORSres(res).send("success");
            });
        });

        app.post('/api/update/1/account', function(req, res) {
            console.log(req.fields.idch);
            console.log(req.fields.tendangnhap);
            console.log(req.fields.tencuahang);
            console.log(req.fields.diachi);
            console.log(req.fields.gioithieu);
            console.log(req.fields.thoigianmo);
            console.log(req.fields.idloaisanpham);

            let newPath =path.join(__dirname, "./public/" + req.files.file.name.replace(/\s+/g, ''));
            console.log(req.files.file.path,newPath)
            fs.readFile(req.files.file.path, function (err, data) {
                fs.writeFile(newPath, data, function (err) {
                 });
               });
            request.query("UPDATE CUAHANG SET TEN = N'"+req.fields.tencuahang+"', MOTA = N'"+req.fields.gioithieu+"', VITRI = N'"+req.fields.diachi+"', THOIGIANMO = N'"+req.fields.thoigianmo+"', TENDANGNHAP = N'"+req.fields.tendangnhap+"' , ID_LOAISANPHAM = "+req.fields.idloaisanpham+", ANH = 'http://localhost:4000/public/"+ req.files.file.name.replace(/\s+/g, '') +"' WHERE ID = "+req.fields.idch+";", function (err, recordset) {
                if (err) console.log(err) 
                // send records as a response
                CORSres(res).send("success");
            });
        });




    ///ORDERS: 
    app.get('/cuahang/donhang/list', function (req, res) {
        request.query('SELECT * FROM  (SELECT DONHANG.ID, DONHANG.GIA, DONHANG.NGAYDAT, DONHANG.TRANGTHAI, USERS.ANH, USERS.TEN, USERS.DIACHI FROM DONHANG LEFT JOIN USERS ON (DONHANG.ID_USERS = USERS.ID)) A INNER JOIN   (SELECT ID_DONHANG, SUM(SOLUONG) AS SOLUONG FROM DONHANG_SANPHAM  WHERE ID_DONHANG IN (SELECT DONHANG.ID FROM DONHANG INNER JOIN USERS  ON DONHANG.ID_USERS = USERS.ID)  GROUP BY ID_DONHANG ) B ON (A.ID = B.ID_DONHANG)', function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });

    app.get('/cuahang/donhang/detail', function (req, res) {
        request.query('SELECT * FROM DONHANG_SANPHAM, SANPHAM WHERE DONHANG_SANPHAM.ID_SANPHAM = SANPHAM.ID AND DONHANG_SANPHAM.ID_DONHANG = '+req.query.idorder, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });

    app.get('/order/update/approve', async function (req, res) {
        let resu = await QueryFu("UPDATE DONHANG SET TRANGTHAI = '"+req.query.trangthai +"' WHERE ID = "+req.query.id);
        CORSres(res).send(resu);
    });















//////////ADNROID:
    app.get('/api/loaicuahang/list', function (req, res) {
        request.query('select * from LOAISANPHAM', function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });
    app.get('/api/loaicuahang/cuahang/list', function (req, res) {
        request.query('select * from CUAHANG WHERE ID_LOAISANPHAM = '+req.query.idsp, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });








    app.get('/api/cuahang/dexuat/list', function (req, res) {
        request.query('select * from CUAHANG', function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            console.log(recordset);
            CORSres(res).send(recordset);
        });
    });

    app.get('/api/cuahang/timkiem/list', function (req, res) {
        request.query("select * from CUAHANG WHERE TEN LIKE '%"+req.query.setxt+"%'", function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            console.log("select * from CUAHANG WHERE TEN LIKE '%"+req.query.setxt+"%'");
            CORSres(res).send(recordset);
        });
    });








    app.get('/api/cuahang/sanpham/list', function (req, res) {
        request.query('select * from SANPHAM where IDCUAHANG = '+req.query.id, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });


    app.get('/api/user/cuahang/checksave', function (req, res) {
        request.query('select * from USER_CUAHANG WHERE ID_USER = '+req.query.iduser + ' AND ID_CUAHANG = '+req.query.idch, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });

    app.get('/api/user/cuahang/insertsave', function (req, res) {
        request.query("INSERT INTO USER_CUAHANG (ID_USER, ID_CUAHANG, DANHGIA, MARK) VALUES ("+req.query.iduser + ", "+req.query.idch + " , "+req.query.danhgia +" , "+req.query.mark +");", function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });
    app.get('/api/user/cuahang/updatesave', function (req, res) {
        request.query("UPDATE USER_CUAHANG SET DANHGIA = "+req.query.danhgia +" , MARK = "+req.query.mark +" WHERE ID_USER = "+req.query.iduser +" AND ID_CUAHANG = "+req.query.idch +";", function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });


    app.get('/api/user/cuahang/save/list', function (req, res) {
        request.query("SELECT CUAHANG.ID , CUAHANG.TEN , CUAHANG.MOTA, CUAHANG.VITRI, CUAHANG.THOIGIANMO, CUAHANG.DANHGIA, CUAHANG.GIATB, CUAHANG.ANH FROM CUAHANG INNER JOIN USER_CUAHANG ON CUAHANG.ID=USER_CUAHANG.ID_CUAHANG WHERE ID_USER="+req.query.iduser +" AND MARK > 0;", function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });








    app.post('/api/user/donhang/insert', function (req, res) {
        console.log(req.fields);
        console.log(req.query);

        request.query("INSERT INTO DONHANG (GIA, TRANGTHAI, ID_USERS) "+
        "OUTPUT Inserted.ID "+
        "VALUES("+req.query.gia+", 'N', 3);", function (err, recordset) {
            if (err) console.log(err)

            console.log(recordset)

            // send records as a response
            data = recordset['recordset'];
            data = JSON.parse(JSON.stringify( data[0]));
            console.log(data.ID)

              for(var k in req.fields) {
                console.log(k, req.fields[k]);
                request.query("INSERT INTO DONHANG_SANPHAM (ID_DONHANG, ID_SANPHAM,SOLUONG) "+
                " VALUES("+data.ID+", "+k+", "+req.fields[k]+");");
             }
            CORSres(res).send(data);
        });
    });

    app.get('/api/user/donhang/list', function (req, res) {
        request.query('select * from DONHANG', function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });

    app.get('/api/user/donhang/sanpham/list', function (req, res) {
        request.query('SELECT * FROM SANPHAM INNER JOIN DONHANG_SANPHAM ON SANPHAM.ID=DONHANG_SANPHAM.ID_SANPHAM WHERE ID_DONHANG='+req.query.id, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            CORSres(res).send(recordset);
        });
    });

    app.get('/api/user/donhang/chartdata', function (req, res) {
        request.query("SELECT NGAYDAT, COUNT(NGAYDAT) AS SOLUONG FROM DONHANG GROUP BY NGAYDAT ORDER BY NGAYDAT;", function (err, recordset) {
            if (err) console.log(err)

            // send records as a response
            CORSres(res).send(recordset);
        });
    });








    app.get('/api/user/insert', function (req, res) {
        // CORSres(res).send(req.query.anh);
        request.query("INSERT INTO USERS (TEN, ANH, EMAIL, MATKHAU, SDT) "+
        "OUTPUT Inserted.ID "+
        "VALUES('"+req.query.ten+"', '"+req.query.anh+"', '"+req.query.email+"','"+req.query.matkhau+"', '"+req.query.sdt+"');", function (err, recordset) {
            if (err) console.log(err)
            CORSres(res).send(recordset);
        });
    });

    app.get('/api/user/update', function (req, res) {
        // CORSres(res).send(req.query.anh);
        request.query("UPDATE USERS SET TEN = '"+req.query.ten+"', EMAIL= '"+req.query.email+"' , SDT= '"+req.query.sdt+"' , ANH= '"+req.query.anh+"' WHERE ID = "+req.query.id+";", function (err, recordset) {
            if (err) console.log(err)
            CORSres(res).send(recordset);
        });
    });

    app.get('/api/users/get', function (req, res) {
        request.query("select * from USERS WHERE TEN = '"+req.query.ten+"' AND MATKHAU = '"+req.query.matkhau+"'", function (err, recordset) {
            if (err) console.log(err)

            // send records as a response
            console.log("select * from USERS WHERE TEN = '"+req.query.ten+"' AND MATKHAU = '"+req.query.matkhau+"'");
            CORSres(res).send(recordset);
        });
    });

    app.get('/api/user/googleauth', function (req, res) {
        request.query("select * from USERS WHERE TEN = '"+req.query.ten+"' AND EMAIL = '"+req.query.email+"'", function (err, recordset) {
            if (err) console.log(err)
            if(recordset['recordset'].length < 1){
                request.query("INSERT INTO USERS (TEN, ANH, EMAIL, MATKHAU, SDT) "+
                        "OUTPUT Inserted.ID, Inserted.TEN,  Inserted.ANH , Inserted.EMAIL, Inserted.MATKHAU, Inserted.SDT "+
                        "VALUES('"+req.query.ten+"', '"+req.query.anh+"', '"+req.query.email+"','xxx', 'xxx');", function (err, recordsetx) {
                        if (err) console.log(err)
                        CORSres(res).send(recordsetx);
                });
            }else{
                CORSres(res).send(recordset);
            }
        });
    });

    app.get('/api/user/getphone', function (req, res) {
        request.query("select * from USERS WHERE SDT = '"+req.query.sdt+"'", function (err, recordset) {
            if (err) console.log(err)

            // send records as a response
            CORSres(res).send(recordset);
        });
    });






////GET IMAGE:
    app.get('/public/:version', function (req, res) {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
      
        // Build file path
        let filePath = path.join(
          __dirname,
          req.url === "/" ? "index.html" : req.url
        );
      
        // Extension of file
        let extname = path.extname(filePath);
      
        // Initial content type
        let contentType = "text/html";
      
        // Check ext and set content type
        switch (extname) {
          case ".js":
            contentType = "text/javascript";
            break;
          case ".css":
            contentType = "text/css";
            break;
          case ".json":
            contentType = "application/json";
            break;
          case ".png":
            contentType = "image/png";
            break;
          case ".jpg":
            contentType = "image/jpg";
            break;
        }
      
        // Check if contentType is text/html but no .html file extension
        if (contentType == "text/html" && extname == "") filePath += ".html";
      
        // log the filePath
        console.log(filePath);
      
        // Read File
        fs.readFile(filePath, (err, content) => {
          if (err) {
            if (err.code == "ENOENT") {
              // Page not found
              fs.readFile(
                path.join(__dirname, "public", "404.html"),
                (err, content) => {
                  res.writeHead(404, { "Content-Type": "text/html" });
                  res.end(content, "utf8");
                }
              );
            } else {
              //  Some server error
              res.writeHead(500);
              res.end(`Server Error: ${err.code}`);
            }
          } else {
            // Success
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf8");
          }
        });
      });

});
var server = app.listen(4000, function () {
    console.log('Server is running..');
});
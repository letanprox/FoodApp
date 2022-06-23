const SanPham = require('../../Model/Web/SanPham');
const path = require('path');
const fs = require('fs');


let CORSres = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    return res;
}

exports.postInsertSanPham = (req, res)=> {
    let newPath =path.join(__dirname.replace('/Controllers/Web',''), "./public/" + req.files.file.name.replace(/\s+/g, ''));
    fs.readFile(req.files.file.path, function (err, data) {
        fs.writeFile(newPath, data, function (err) {
         });
    });

    SanPham.postInsertSanPham(req, (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result)
    })
}


exports.postUpdateSanPhamImage = (req, res)=> {
    let newPath =path.join(__dirname.replace('/Controllers/Web',''), "./public/" + req.files.file.name.replace(/\s+/g, ''));
    fs.readFile(req.files.file.path, function (err, data) {
        fs.writeFile(newPath, data, function (err) {
         });
    });

    SanPham.postUpdateSanPhamImage(req, (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result)
    })
}


exports.postUpdateSanPham = (req, res)=> {
    SanPham.postUpdateSanPham(req, (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result)
    })
}

const NguoiDung = require('../../Model/Web/NguoiDung');
const path = require('path');
const fs = require('fs');

let CORSres = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    return res;
}


exports.getLoginUser = (req, res)=> {
    NguoiDung.getLoginUser(req.query.tendangnhap, req.query.matkhau, (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result['recordsets'][0])
    })
}

exports.getInsertUser = (req, res)=> {
    NguoiDung.getInsertUser(req.query.tendangnhap, req.query.tencuahang, req.query.mota, req.query.matkhau,  (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result)
    })
}

exports.getUserDetail = (req, res)=> {
    NguoiDung.getUserDetail(req,  (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result)
    })
}

exports.postUpdateUserImage = (req, res)=> {
    let newPath =path.join(__dirname.replace('/Controllers/Web',''), "./public/" + req.files.file.name.replace(/\s+/g, ''));
    fs.readFile(req.files.file.path, function (err, data) {
        fs.writeFile(newPath, data, function (err) {
         });
    });
    NguoiDung.postUpdateUserImage(req, (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result)
    })
}


exports.postUpdateUser = (req, res)=> {
    NguoiDung.postUpdateUser(req,  (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result)
    })
}
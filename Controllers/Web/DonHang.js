const DonHang = require('../../Model/Web/DonHang');
const path = require('path');
const fs = require('fs');


let CORSres = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    return res;
}

exports.getDonHangList = (req, res)=> {
    DonHang.getDonHangList( (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result)
    })
}

exports.getDonHangDetail = (req, res)=> {
    DonHang.getDonHangDetail(req, (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result)
    })
}


exports.getDonHangApprove = (req, res)=> {
    DonHang.getDonHangApprove(req, (err, result) =>{
        if(err) res.send(err);
        CORSres(res).send(result)
    })
}

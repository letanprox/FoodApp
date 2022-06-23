const CuaHang = require('../../Model/Android/CuaHang');
// get all employee list
exports.getLoaiCuaHangList = (req, res)=> {
    CuaHang.getLoaiCuaHangList((err, result) =>{
        if(err) res.send(err);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.send(result)
    })
}

exports.getCuaHangTheoLoaiCuaHangList = (req, res)=> {
    CuaHang.getCuaHangTheoLoaiCuaHangList( req.query.idsp, (err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}


exports.getCuaHangDeXuatList = (req, res)=> {
    CuaHang.getCuaHangDeXuatList((err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}


exports.getCuaHangTimKiemList = (req, res)=> {
    CuaHang.getCuaHangTimKiemList(req.query.setxt, (err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}

exports.getSanPhamCuaCuaHang = (req, res)=> {
    CuaHang.getSanPhamCuaCuaHang(req.query.id, (err, result) =>{
        if(err) res.send(err);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.send(result)
    })
}


exports.getCheckSaveCuaHang = (req, res)=> {
    CuaHang.getCheckSaveCuaHang(req.query.iduser, req.query.idch, (err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}
exports.getInsertSaveCuaHang = (req, res)=> {
    CuaHang.getCheckSaveCuaHang(req.query.iduser, req.query.idch, req.query.danhgia , req.query.mark, (err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}
exports.getUpdateSaveCuaHang = (req, res)=> {
    CuaHang.getUpdateSaveCuaHang(req.query.iduser, req.query.idch, req.query.danhgia , req.query.mark, (err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}


exports.getSaveCuaHangList = (req, res)=> {
    CuaHang.getSaveCuaHangList(req.query.iduser, (err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}
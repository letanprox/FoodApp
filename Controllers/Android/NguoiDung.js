const NguoiDung = require('../../Model/Android/NguoiDung');
// get all employee list
exports.getInsertUser = (req, res)=> {
    NguoiDung.getInsertUser(req.query.ten, req.query.anh, req.query.email, req.query.matkhau, req.query.sdt, (err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}


exports.getUpdateUser = (req, res)=> {
    NguoiDung.getUpdateUser(req.query.id, req.query.ten, req.query.anh, req.query.email, req.query.sdt, (err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}


exports.getLoginUser = (req, res)=> {
    NguoiDung.getLoginUser(req.query.ten, req.query.matkhau, (err, result) =>{
        if(err) res.send(err);
        console.log(result)
        res.send(result)
    })
}


exports.getGoogleAuth = (req, res)=> {
    NguoiDung.getGoogleAuth(req.query.ten, req.query.email, (err, recordset) =>{
        if(err) res.send(err);

        if(recordset['recordset'].length < 1){
            NguoiDung.getInsertUser(req.query.ten, req.query.anh, req.query.email, 'xxx', 'xxx', (err, result) =>{
                try {
                    if(err) res.send(err);
                    res.send(result)
                } catch (error) {
                    console.log(error)
                }
            })
        }else{
            res.send(recordset);
        }
    })
}


exports.getPhoneUser = (req, res)=> {
    NguoiDung.getPhoneUser(req.query.sdt, (err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}
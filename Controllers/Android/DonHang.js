const DonHang = require('../../Model/Android/DonHang');
// get all employee list
exports.postInsertDonHang = (req, res)=> {
    
    DonHang.postInsertDonHangList(req.query.gia, (err, recordset) =>{
        if(err) res.send(err);

        data = recordset['recordset'];
        data = JSON.parse(JSON.stringify( data[0]));

        console.log(req.body)

        for(var k in req.body) {
            DonHang.postInsertDonHangSanPhamList(data.ID, k, req.body[k], (err, result) =>{
                try {
                    if(err) res.send(err);
                    res.send(result)
                } catch (error) {
                    console.log(error)
                }
   
            })
         }

    })
}


exports.getDonHangCuaNguoiDung = (req, res)=> {
    DonHang.getDonHangCuaNguoiDung((err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}



exports.getSanPhamCuaDonHang = (req, res)=> {
    DonHang.getSanPhamCuaDonHang(req.query.id, (err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}


exports.getDataChart = (req, res)=> {
    DonHang.getDataChart((err, result) =>{
        if(err) res.send(err);
        res.send(result)
    })
}

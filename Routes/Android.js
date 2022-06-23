const express = require('express');
const router = express.Router();


const CuaHangControllers = require('../Controllers/Android/CuaHang');
const DonHangControllers = require('../Controllers/Android/DonHang');
const NguoiDungControllers = require('../Controllers/Android/NguoiDung');


router.get('/loaicuahang/list', CuaHangControllers.getLoaiCuaHangList);
router.get('/loaicuahang/cuahang/list', CuaHangControllers.getCuaHangTheoLoaiCuaHangList);
router.get('/cuahang/dexuat/list', CuaHangControllers.getCuaHangDeXuatList);
router.get('/cuahang/timkiem/list', CuaHangControllers.getCuaHangTimKiemList);
router.get('/cuahang/sanpham/list', CuaHangControllers.getSanPhamCuaCuaHang);
router.get('/user/cuahang/checksave', CuaHangControllers.getCheckSaveCuaHang);
router.get('/user/cuahang/insertsave', CuaHangControllers.getInsertSaveCuaHang);
router.get('/user/cuahang/updatesave', CuaHangControllers.getUpdateSaveCuaHang);
router.get('/user/cuahang/save/list', CuaHangControllers.getSaveCuaHangList);


router.post('/user/donhang/insert', DonHangControllers.postInsertDonHang);
router.get('/user/donhang/list', DonHangControllers.getDonHangCuaNguoiDung);
router.get('/user/donhang/sanpham/list', DonHangControllers.getSanPhamCuaDonHang);
router.get('/user/donhang/chartdata', DonHangControllers.getDataChart);


router.get('/user/insert', NguoiDungControllers.getInsertUser);
router.get('/user/update', NguoiDungControllers.getUpdateUser);
router.get('/users/get', NguoiDungControllers.getLoginUser);
router.get('/user/googleauth', NguoiDungControllers.getGoogleAuth);
router.get('/user/getphone', NguoiDungControllers.getPhoneUser);



module.exports = router;
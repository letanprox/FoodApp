const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');


const NguoiDungControllers = require('../Controllers/Web/NguoiDung');
const SanPhamControllers = require('../Controllers/Web/SanPham');
const DonHangControllers = require('../Controllers/Web/DonHang');


router.get('/checklogin/cuahang', NguoiDungControllers.getLoginUser);
router.get('/insert/cuahang', NguoiDungControllers.getInsertUser);
router.get('/detail/cuahang', NguoiDungControllers.getUserDetail);
router.post('/update/1/account', NguoiDungControllers.postUpdateUserImage);
router.post('/update/0/account', NguoiDungControllers.postUpdateUser);

router.post('/insert/sanpham', SanPhamControllers.postInsertSanPham);
router.post('/update/0/sanpham', SanPhamControllers.postUpdateSanPhamImage);
router.post('/update/1/sanpham', SanPhamControllers.postUpdateSanPham);

router.get('/cuahang/donhang/list', DonHangControllers.getDonHangList);
router.get('/cuahang/donhang/detail', DonHangControllers.getDonHangDetail);
router.get('/order/update/approve', DonHangControllers.getDonHangApprove);

module.exports = router;
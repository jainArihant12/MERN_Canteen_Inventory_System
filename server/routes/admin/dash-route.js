const express = require('express');
const router = express.Router();

const { countUsers, TotalOrder, getTotalProducts } = require('../../controllers/admin/dash-controller');


router.get('/userCount',countUsers)
router.get('/totalOrder',TotalOrder)
router.get('/totalProduct',getTotalProducts)

module.exports = router
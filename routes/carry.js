const express = require('express')
const router = express.Router()
const carryUtil = require('../controller/carry_controller')
const validateUtil = require('../controller/validate_controller')





router.get('/get_asset_data',
carryUtil.get_asset_data(),
    function (req, res) {

        res.status(200).json({
            'success': true,
            result: res.result
        })
      
    })

router.post('/insert_asset_data',
carryUtil.insert_asset_data(),
    function (req, res) {

        res.status(200).json({
            'success': true,
            'message': "บันทึกข้อมูลเรียบร้อย"
        })
      
    })







module.exports = router
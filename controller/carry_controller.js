let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let jsonwebToken = require('jsonwebtoken')

// Register new user
exports.get_asset_data = function () {
    return function (req, res, next) {
        db.query('SELECT * FROM asset', function (err, result) {
            if (err) throw err;
            res.result = result
            next()
        })
    }
}

exports.insert_asset_data = function () {
    return function (req, res, next) {

        let asset_info = {
            // swap_day: req.body.swap_day,
            port_swap_margin: req.body.port_swap_margin,
            port_no_swap_margin: req.body.port_no_swap_margin,
            lot: req.body.lot,
            balance_all: req.body.balance_all,
            equity_all: req.body.equity_all,
            swap_all: req.body.swap_all,
            profit_all: req.body.profit_all,
        }

        let swap_day = 0


        db.query('SELECT swap_all FROM asset ORDER BY id DESC', function (err, result) {
            if (err) throw err;
            res.result = result
            if(result[0]){
                swap_day =  parseFloat(asset_info.swap_all)  - parseFloat(result[0].swap_all) 
                if(swap_day < 0){
                    swap_day = parseFloat(asset_info.swap_all)
                }
            }
            db.query(`INSERT INTO asset (id,swap_day,port_swap_margin,port_no_swap_margin,lot,balance_all,equity_all,swap_all,profit_all,date_time) 
            VALUES (NULL,'${swap_day.toFixed(4)}', 
            '${asset_info.port_swap_margin}', 
            '${asset_info.port_no_swap_margin}', 
            '${asset_info.lot}', 
            '${asset_info.balance_all}', 
            '${asset_info.equity_all}',
            '${asset_info.swap_all}',
            '${asset_info.profit_all}',CURRENT_TIMESTAMP);`, function (err, result) {
                    if (err) throw err;
                    // res.result = result
                    next()
                })
        })

    }
}





// exports.check_admin = function () {
//     return function (req, res, next) {

//         // console.log(req)

//         db.query('SELECT * FROM user_information WHERE user_id = \'' + req.user_id + '\'', function (err, result) {
//             if (err) throw err;
//             if (typeof result[0] !== 'undefined') {

//                 req.token = jsonwebToken.sign({
//                     id: result[0].admin_id
//                 }, constance.sign_admin)
//                 req.admin = result[0].admin
//                 next()

//             } else {
//                 res.status(200).json(errorMessages.err_user_not_found)
//             }
//         })
//     }
// }
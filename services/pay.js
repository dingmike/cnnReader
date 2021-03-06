/**
 * 支付相关服务
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');

/**
 * 判断用户是否登录后支付 普通商品支付
 */
function payOrder(orderId,repay) {
    return new Promise(function (resolve, reject) {
        util.request(api.PayPrepayId, {
            orderId: orderId,
            repay: repay==1?1:0
        }).then((res) => {
            console.log(res)
            if (res.errno === 0) {
                const payParam = res.data;
                wx.requestPayment({
                    'timeStamp': payParam.timeStamp,
                    'nonceStr': payParam.nonceStr,
                    'package': payParam.package,
                    'signType': payParam.signType,
                    'paySign': payParam.paySign,
                    'success': function (res) {
                        resolve(res);
                    },
                    'fail': function (res) {
                        reject(res);
                    },
                    'complete': function (res) {
                        reject(res);
                    }
                });
            } else {
                reject(res);
            }
        });
    });
}


/**
 *  共读商品支付
 */
function gongDuPayOrder(orderId) {
    return new Promise(function (resolve, reject) {
        util.request(api.PayGongDuPrepayId, {
            orderId: orderId
        }).then((res) => {
            console.log(res)
            if (res.errno === 0) {
                const payParam = res.data;
                wx.requestPayment({
                    'timeStamp': payParam.timeStamp,
                    'nonceStr': payParam.nonceStr,
                    'package': payParam.package,
                    'signType': payParam.signType,
                    'paySign': payParam.paySign,
                    'success': function (res) {
                        resolve(res);
                    },
                    'fail': function (res) {
                        reject(res);
                    },
                    'complete': function (res) {
                        reject(res);
                    }
                });
            } else {
                reject(res);
            }
        });
    });
}


module.exports = {
    payOrder,
    gongDuPayOrder
};












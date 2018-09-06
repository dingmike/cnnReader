
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
// import Card from '../../palette/image-example';

let t = wx.createCanvasContext("myCanvas");
let e = getApp();
Page({
    imagePath: '',
    data: {
        template: {},
        avatorUrl:''
    },
    onImgOK(e) {
        this.imagePath = e.detail.path;
        console.log(e);
    },

    shareImg() {
        wx.saveImageToPhotosAlbum({
            filePath: this.imagePath,
            success: function(t) {
                wx.showToast({
                    title: "已保存到相册"
                });
            }
        });
    },
    onLoad: function(t) {
        var eData = wx.getSystemInfoSync();
        wx.showNavigationBarLoading();
        // var a = this, n = .9 * e.windowWidth, o = .85 * e.windowHeight;
        var a = this, n =  eData.windowWidth, o = .85 * eData.windowHeight;
         a.setData({
            phoneWidth: n,
            phoneHeight: o
        });
        wx.downloadFile({
            url: e.globalData.userInfo.avatar,
            success: function (e) {
                if (200 === e.statusCode) {
                    a.setData({
                        avatorUrl: e.tempFilePath
                    })
                    // a.data.avatorUrl = e.tempFilePath;
                    debugger
                    a.getCardNum();
                }
            }
        })
    },
    extendRead: function() {
        wx.reLaunch({
            url: "../orale/orale-extend/orale-extend"
        });
    },
    getCardNum(){
        var openid = e.globalData.openid, a = e.globalData.type;
        var aThis = this;
        util.request(api.GetCardNums, {uid: wx.getStorageSync('openid'), type: 1,}, 'POST').then( res =>{
            debugger
            // this.canvas(res.data.length, a);
            var totalDay=  res.data.length;
            aThis.setData({
                template:{
                    width: aThis.data.phoneWidth*2 +'rpx',
                    height: aThis.data.phoneHeight*2 + 'rpx' ,
                    background: '#ffffff',
                    views: [
                        {
                            type: 'image',
                            url: '/static/image/logos/123.jpg',
                            css:{
                                width: aThis.data.phoneWidth*2 +'rpx',
                                height: aThis.data.phoneHeight*2 + 'rpx',
                                left: '0rpx',
                                bottom: '0rpx',
                            },
                        },
                        {
                            type: 'image',
                            url: '/static/image/icon/code.jpg',
                            css: {
                                borderWidth:'2rpx',
                                borderColor: '#000',
                                width: '240rpx',
                                height: '240rpx',
                                right: '20rpx',
                                bottom: '20rpx',
                            },
                        },
                        {
                            type: 'image',
                            url: aThis.data.avatorUrl,
                            css: {
                                width: '100rpx',
                                height: '100rpx',
                                left:'20rpx',
                                top: .78 * aThis.data.phoneHeight*2+'rpx',
                            },
                        },
                        //"已坚持学习" + n + (a+1) + "天", .2 * this.data.phoneWidth, .9 * this.data.phoneHeight
                        {
                            type: 'text',
                            text: "我已坚持" + a + (totalDay+1) + "天，加油！",
                            css: [{
                                left: '140rpx',
                                width: '280rpx',
                                top: .78 * aThis.data.phoneHeight*2+'rpx',
                                color: '#fff',
                                fontSize:'24rpx' ,
                                lineHeight:'30rpx'
                            }]
                        }
                    ],
                }
            });
            wx.hideNavigationBarLoading();
        })
    },
    shareImgOld: function() {
        wx.canvasToTempFilePath({
            fileType: "png",
            canvasId: "myCanvas",
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "已保存到相册"
                        });
                    }
                });
            }
        });
    },
    returnIndex: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    onReady: function() {

       /* this.setData({
            template: new Card().palette(),
        });*/
    },
    onShow: function() {
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});


/*
function _downloadAvator(avator, phoneHeight){

    return ({ //10, .88 * s.data.phoneHeight, 50, 50
        type: 'image',
        url: this.,
        css: [{
            width: '100rpx',
            height: '100rpx',
            left: '20rpx',
            top: .78 * phoneHeight * 2 + 'rpx',
        }]
    })
};*/

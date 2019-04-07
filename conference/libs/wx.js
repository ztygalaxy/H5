
var _title = "12月10日，HTML5移动生态大会，等你加入";
var _desc = '立足当下 共享未来，200+行业大佬，100+媒体，6000+从业者，邀您共赴盛会。';
// var gameId = egret_gc_getQueryString('gameId');
var _link = 'http://wx.qimi.com/html/1210/161128164200/index.html';


var _imgUrl = 'http://wx.qimi.com/html/1210/161128164200/libs/shareicon.jpg';
// console.log(1212,_imgUrl)

// _imgUrl = 'http://gamecenter.egret-labs.org/misc/images/v2/share_'+egret_rand+'.jpg';


//如果页中定义了优先使用
if(typeof wxShare == 'undefined') {
    var wxShare = {};
}
if(typeof wxShare.title != 'undefined') {
    _title = wxShare.title;
}
if(typeof wxShare.desc != 'undefined') {
    _desc = wxShare.desc;
}
if(typeof wxShare.imgUrl != 'undefined') {
    _imgUrl = wxShare.imgUrl;
}
if(typeof wxShare.link != 'undefined') {
    _link = wxShare.link;
}

//地衣网
// if(chanJSON.chan_id == 20779) {
//     _link = 'http://wx.dyygame.com/redirectGame.php';
//     if(gameId) {
//         _link += '?gameId='+gameId;
//     }
// }

//初始化配置数据 
var configData = {
    appId: '',
    timestamp: 0,
    nonceStr: '',
    signature: ''
};

//初始化分享数据
var shareData = {
    title: _title,
    desc: _desc,
    link: _link,
    imgUrl: _imgUrl
};
function getJSON(signurl,callback){
    var request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(signurl,egret.HttpMethod.POST);
    request.send();
     request.addEventListener(egret.Event.COMPLETE,function(msg){
        callback(JSON.parse(request.response))

     },this);
}
// wx_error();
function ready() {
    var signurl = "http://gamecenter.egret-labs.org/Api.wxsignature?chanId=20409&url="+encodeURIComponent(location.href.split('#')[0]);
    //alert(signurl);
    //初始化配置
    
    getJSON(signurl, function (msg) {
        // console.log('msg',msg)
        // console.log(msg)
        wx_config(msg);//配置
// console.log(111,shareData)
        wx.ready(function() {

// alert("dasdfasdf21")

            wx_checkJsApi();//检测JS
            // alert("dasdfasdf22")
            var friend = {
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.link,
                imgUrl: shareData.imgUrl,
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    //alert('用户点击发送给朋友');
                },
                success: function (res) {
                    wx_shareSuccess('onMenuShareAppMessage');
                    // alert('已分享');
                },
                cancel: function (res) {
                    // alert('已取消');
                },
                fail: function (res) {
                    // alert(JSON.stringify(res));
                }
            }
            wx.onMenuShareAppMessage(friend); //默认分享朋友
            wx.onMenuShareQQ(friend); //分享到QQ
            wx.onMenuShareQZone(friend); //分享到QZone
            var timeline = {
                title: shareData.title,
                link: shareData.link,
                imgUrl: shareData.imgUrl,
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    //alert('用户点击发送给朋友');
                },
                success: function (res) {
                    wx_shareSuccess('onMenuShareTimeline');
                    // alert('已分享');
                },
                cancel: function (res) {
                    // alert('已取消');
                },
                fail: function (res) {
                    // alert(JSON.stringify(res));
                }
            }
            wx.onMenuShareTimeline(timeline);//默认分享朋友圈
            

            wx.hideMenuItems({
                menuList: ['menuItem:copyUrl'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        })
    });
};
ready();
/**
 * ajax回调
 * @param _url
 * @param _type
 * @param _dataType
 * @param callback
 */
function wx_loaddata(_url,_type,_dataType,callback,param){
    // alert('wx_loaddata')
    $.ajax({
        type:_type,
        url:_url,
        dataType:_dataType,
        success: function (msg) {
            //alert(JSON.stringify(msg));
            //console.log(msg);
            callback(msg,param);
        }
    });
}

//初始化配置
function wx_config(cd){
    // console.log('cd',cd)
    wx.config({
        debug: false,

        // appId: 123123123, // 必填，公众号的唯一标识
        // timestamp: 2313123, // 必填，生成签名的时间戳，切记时间戳是整数型，别加引号
        // nonceStr: 123123, // 必填，生成签名的随机串
        // signature: 123123, // 必填，签名，见附录1

        appId: cd.appId, // 必填，公众号的唯一标识
        timestamp: cd.timestamp, // 必填，生成签名的时间戳，切记时间戳是整数型，别加引号
        nonceStr: cd.nonceStr, // 必填，生成签名的随机串
        signature: cd.signature, // 必填，签名，见附录1

        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ]
    });
}

//出错检测
function wx_error(){
    // alert('wx_error')
    wx.error(function (res) {
		alert(JSON.stringify(res));
        alert(res.errMsg);
    });
}

//微信分享成功 回调
function wx_shareSuccess(type) {
    // var url = '/Api.wxshare?chanId='+chanJSON.chan_id+'&type='+type;
    // getJSON(url, '', function(e) {
    //     //To do...
    // })
}

// 1 判断当前版本是否支持指定 JS 接口，支持批量判断
function wx_checkJsApi(){
    wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage',
                'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
            ],
            success: function (res) {
                // alert(JSON.stringify(res));
            }
        });
}

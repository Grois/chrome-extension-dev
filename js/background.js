/**
 * 点击按钮之后 向前台发送消息
 */
chrome.browserAction.onClicked.addListener(function () {
    console.log("click");
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, {event: "click"}, function (response) {
            console.log("收到回复");
        });
    });
});

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    // var data=$.parseJSON(request);
    console.log(JSON.stringify(request));

    if (JSON.stringify(request).endsWith("url\"}")) {
        var url = JSON.stringify(request).split("\"")[3];
        var data = get_data(url);
        sendResponse(data);
    } else if (JSON.stringify(request).endsWith("support\"}")) {
        var url = JSON.stringify(request).split("\"")[3];
        var data = get_data(url);
        console.log(data.status);
        if (data.status) {
            //    支持该站  图标变亮
            active_browser_icon(true);
        } else {
            console.log(sender.tabId);
            active_browser_icon(false);
        }
    }

});


/*
* 从url中提取站点
* xxx.com
* xxx.net
* */
function get_site(url) {
    var arr = url.split('/');
    arr2 = arr[2].split('.');
    var site = arr2[arr2.length - 2] + '.' + arr2[arr2.length - 1];
    console.log('site:' + site);
    return site;
}


function get_data(url) {
    console.log(url);
    var site = get_site(url);
    console.log(site);
    var coupon_detail = null;
    $.ajax({
        url: "http://192.168.8.137:8888/api/" + site,
        // data: { url: message},
        dataType: 'json',
        async: false,
        timeout: 3000,
        method: 'GET',
        success: function (data) {
            console.log("success:" + data.status);
            coupon_detail = data;
        },
        error: function (data) {
            console.log("error");
        }
    });
    return coupon_detail;
}


function active_browser_icon(tag) {

    getCurrentTabId(tabId => {
        if (tag)
            var path = chrome.extension.getURL("images/bird-logo.png");
        else
            var path = chrome.extension.getURL("images/bird-logo-gray.png");
        console.log(tabId);
        console.log(path);
        chrome.browserAction.setIcon({
            path: path,
            tabId: tabId
        });
    });


}

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     var coupon_detail = "";
//     var site = get_site(message);
//
//     $.ajax({
//         url: "http://192.168.8.137:8888/api/" + site,
//         // data: { url: message},
//         dataType: 'json',
//         async: false,
//         timeout: 3000,
//         method: 'GET',
//         success: function (data) {
//             console.log("success" + data);
//             coupon_detail = data;
//         },
//         error: function (data) {
//             console.log("error");
//         }
//     });
//
//
//     if (coupon_detail != "") {
//         sendResponse(coupon_detail);
//     } else {
//         sendResponse("Error");
//         console.log("Error")
//     }
//
//     sendResponse(null);
//
// });


// web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
// chrome.webRequest.onBeforeRequest.addListener(details => {
//     // 大部分网站视频的type并不是media，且视频做了防下载处理，所以这里仅仅是为了演示效果，无实际意义
//     console.log("收到请求........");
//         chrome.notifications.create(null, {
//             type: 'basic',
//             iconUrl: 'img/icon.png',
//             title: 'support',
//             message: '找到coupon code：' + details.url,
//         });
// }, {urls: ["<all_urls>"]}, ["blocking"]);
//



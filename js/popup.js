//点击之后,向后台发送当前tab地址
// chrome.tabs.getSelected(null, function (tab) {
//     chrome.runtime.sendMessage(tab.url, function (response) {
//         var bg = chrome.extension.getBackgroundPage();
//         var data = bg.get_data(tab.url);
//         document.write(data);
//
//     });
// });

//加载完毕  向content_js发送消息
// $(document).ready(function () {
    // sendMessageToContentScript('ready！', (response) => {
    //     if (response) alert('收到来自content-script的回复：' + response);
    // });
// });


// 显示桌面通知
// function show_notification() {
//     chrome.notifications.create(null, {
//         type: 'image',
//         iconUrl: 'images/get_started16.png',
//         title: 'support',
//         message: 'Sorry, this site is not yet supported.',
//         imageUrl: 'images/get_started16.png'
//     });
// }
//
//
// // 显示badge
// function show_badge(num){
//     chrome.browserAction.setBadgeText({text: num});
//     chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
// }
// function hide_badge(){
//     chrome.browserAction.setBadgeText({text: ''});
//     chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 0]});
// }


//
// function get_support(data) {
//     var jsonData = $.parseJSON(data);
//     return jsonData.count;
//
// }
//
//
// function parse_result(data, count, support, list) {
//     console.log("parse_result" + data);
//     var jsonData = $.parseJSON(data);
//     count = jsonData.count;
//     support = jsonData.status;
//     console.log('count:' + count);
//     console.log('support:' + support);
//     var detail = jsonData.result;
//     var i;
//     for (i = 0; i < jsonData.count; i++) {
//         console.log('code:' + detail[i].code);
//         console.log('discount:' + detail[i].discount)
//     }
// }


// 向content-script主动发送消息
// function sendMessageToContentScript(message, callback) {
//     getCurrentTabId((tabId) => {
//         chrome.tabs.sendMessage(tabId, message, function (response) {
//             if (callback) callback(response);
//         });
//     });
// }
//
// // 向content-script注入JS片段
// function executeScriptToCurrentTab(code) {
//     getCurrentTabId((tabId) => {
//         chrome.tabs.executeScript(tabId, {code: code});
//     });
// }
//
//

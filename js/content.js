console.log('这是content script!');

// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function () {
    // 注入自定义JS
    injectCustomJs();
    initCustomPanel();

});

function init_not_support() {

}


function initCustomPanel() {
    console.log("初始化div");
    var panel = document.createElement('div');
    panel.className = 'chrome-plugin-demo-panel';
    panel.innerHTML = `
		<h2>injected-script操作content-script演示区：</h2>
		<div class="btn-area">
			<a href="javascript:sendMessageToContentScriptByPostMessage('你好，我是普通页面！')">通过postMessage发送消息给content-script</a><br>
			<a href="javascript:sendMessageToContentScriptByEvent('你好啊！我是通过DOM事件发送的消息！')">通过DOM事件发送消息给content-script</a><br>
			<a href="javascript:invokeContentScript('sendMessageToBackground()')">发送消息到后台或者popup</a><br>
		</div>
		<div id="my_custom_log">
		</div>
	`;
    document.body.appendChild(panel);
}

function initPage() {
    var page = document.createElement("div");
    page.id = 'rmnGenieWrappingDiv';
    page.innerHTML = `
    <div id="__rmnGenieCodes" class="fixed-top-right" merchantname="HP" checkedcodescount="0" currentcode="" finalprice="0" finaldiscount="0" bestcodes="" results="" merchantdomain="hp.com" testcodesresults="[object Object]" completionaction="reload"><div data-v-758493e6="" class="__rmnGeniePopover--header"><div data-v-758493e6="" class="__rmnGeniePopover--icon"><svg data-v-75f78a44="" data-v-758493e6="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.128 63.388" class="genie-lamp __rmnGeniePopover--lampIcon"><path data-v-75f78a44="" fill="#A97AB2" d="M51.972 18.708a3.843 3.843 0 1 1 3.184.18c8.723 1.271 14.223 9 14.223 9l-17.4 9.6s-1.587.872-16.07-10.3c5.9-6.007 11.348-8.24 16.058-8.455zM70.646 63.379a154.9 154.9 0 0 0-15.538-1.86c-4.872-.35-9.633-.46-14.22-.35a95.932 95.932 0 0 0 9.76-4.687l3.093-3.8 3.094 3.8a91.385 91.385 0 0 0 13.23 6 .853.853 0 0 1 .585.908z"></path><path data-v-75f78a44="" fill="#784382" d="M72.808 28.681a3.716 3.716 0 0 0-2.64-.79c-18.8 1.68-54.92-4.93-63.87-6.66a7.575 7.575 0 0 0-4.03.32l-2.27.827c33.06 10.65 33.6 34.176 53.65 34.32 10.04.071 15.37-7.972 18.17-15.674.29.219 1.69 1.013 8.22 3.866 10.63 4.65 15.76-16.46 11.7-23.82-3.345-6.07-14.942 3.916-18.912 7.61zm-.27 10.169a55.772 55.772 0 0 0 1.44-5.732c19.23-19.446 14.74.375 11.28 6.35-2.807 4.847-9.217 1.652-12.707-.618z"></path><path data-v-75f78a44="" fill="#e6b224" d="M37.82 12.909a8.941 8.941 0 0 1-3.55-3.56l-.66-1.21a.775.775 0 0 0-1.37 0l-.66 1.21a8.945 8.945 0 0 1-3.55 3.564l-1.2.66a.783.783 0 0 0 0 1.38l1.21.66a8.962 8.962 0 0 1 3.558 3.563l.66 1.21a.783.783 0 0 0 1.375 0l.66-1.21a8.962 8.962 0 0 1 3.558-3.563l1.206-.66a.787.787 0 0 0 0-1.38l-1.206-.66"></path><path data-v-75f78a44="" fill="#f9ca62" d="M29.254 3.634a6.271 6.271 0 0 1-2.492-2.5L26.3.287a.545.545 0 0 0-.96 0l-.46.847a6.26 6.26 0 0 1-2.49 2.5l-.84.463a.553.553 0 0 0 0 .967l.85.462a6.291 6.291 0 0 1 2.5 2.5l.47.848a.55.55 0 0 0 .965 0l.463-.847a6.278 6.278 0 0 1 2.5-2.5l.845-.463a.551.551 0 0 0 0-.967l-.845-.463M77.497 12.654a6.276 6.276 0 0 1-2.494-2.5l-.464-.847a.549.549 0 0 0-.964 0l-.46.847a6.291 6.291 0 0 1-2.5 2.5l-.84.463a.553.553 0 0 0 0 .967l.85.462a6.348 6.348 0 0 1 2.5 2.5l.46.848a.554.554 0 0 0 .97 0l.47-.847a6.272 6.272 0 0 1 2.5-2.5l.85-.463a.553.553 0 0 0 0-.967l-.846-.463"></path></svg></div> <div data-v-758493e6="" class="__rmnGeniePopover--headerTitle"><a data-v-758493e6="" href="http://hp.com" target="_blank"><h1 data-v-758493e6="" class="rmnGenie-header underline">HP</h1></a></div> <!----> <!----> <div data-v-758493e6="" class="rmnGenieModalHeader--right"><!----> <!----> <div data-v-758493e6="" class="__rmnGeniePopover--close"><svg data-v-5d8d561a="" data-v-758493e6="" xmlns="http://www.w3.org/2000/svg" viewBox="431 37 19 18" class="close-icon"><g data-v-5d8d561a="" fill-rule="evenodd"><path data-v-5d8d561a="" d="M433.602 54.684l15.364-15.137a1.069 1.069 0 0 0 0-1.528 1.108 1.108 0 0 0-1.55 0l-15.364 15.137a1.069 1.069 0 0 0 0 1.528 1.108 1.108 0 0 0 1.55 0z"></path><path data-v-5d8d561a="" d="M448.948 53.156L433.585 38.02a1.108 1.108 0 0 0-1.55 0 1.069 1.069 0 0 0 0 1.528l15.363 15.137a1.108 1.108 0 0 0 1.55 0 1.069 1.069 0 0 0 0-1.528z"></path></g></svg></div></div></div> <!----> <div class="__rmnGenieCodes--body"><div data-v-c4c6fb48="" class="__rmnGenieCodes--cashbackCTAwrapper on-list-view cbo-ui"><div data-v-c4c6fb48=""><div data-v-cefb4840="" class="action-prompt" data-v-c4c6fb48=""><div data-v-cefb4840="" class="cta-row"><div data-v-cefb4840="" class="activation-success"><h2 data-v-cefb4840="" class="rmnGenie-subheader">Earn $200 Cash Back</h2> <p data-v-cefb4840="" class="cbo-description">
						$200 Cash Back for Online<br data-v-cefb4840="">
						Purchases of $1499
					</p> <a data-v-cefb4840="" href="https://www.retailmenot.com/rebates/online/2/55QTEVGHE5BZFACGMBUW2VEHUM" target="_blank" class="__rmnGenieCodes--detailsLinksBox walletLink">See Details</a></div> <div data-v-24d86341="" class="cbo-action-wrapper activate-button cbo-cta-wrapper" merchantuuid="ULURMJZUNFCN5E4GU2H7KZIO5E" data-v-cefb4840=""><button data-v-24d86341="" class="rmnGenie-button">Activate Cash Back</button></div></div> <!----></div></div></div> <div class="best-deal-equation-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 25 34"><path fill="#F9CA62" fill-rule="evenodd" d="M22.298 4.21l.982.536a.638.638 0 0 1 0 1.12l-.982.537a7.285 7.285 0 0 0-2.895 2.895l-.537.982a.638.638 0 0 1-1.12 0l-.537-.982a7.298 7.298 0 0 0-2.898-2.895l-.982-.537a.639.639 0 0 1 0-1.12l.983-.537a7.298 7.298 0 0 0 2.895-2.898l.536-.982a.639.639 0 0 1 1.12 0l.537.983a7.296 7.296 0 0 0 2.897 2.895"></path> <!----></svg> <div class="best-deal-equation">Cash Back + Codes = Our Best Deal!</div> <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 25 34"><path fill="#F9CA62" fill-rule="evenodd" d="M22.298 4.21l.982.536a.638.638 0 0 1 0 1.12l-.982.537a7.285 7.285 0 0 0-2.895 2.895l-.537.982a.638.638 0 0 1-1.12 0l-.537-.982a7.298 7.298 0 0 0-2.898-2.895l-.982-.537a.639.639 0 0 1 0-1.12l.983-.537a7.298 7.298 0 0 0 2.895-2.898l.536-.982a.639.639 0 0 1 1.12 0l.537.983a7.296 7.296 0 0 0 2.897 2.895"></path> <path fill="#E6B224" fill-rule="evenodd" d="M16.26 16.002l1.398.765a.91.91 0 0 1 0 1.597l-1.4.766a10.383 10.383 0 0 0-4.128 4.13l-.766 1.398a.91.91 0 0 1-1.596 0l-.766-1.4a10.383 10.383 0 0 0-4.13-4.128l-1.398-.766a.91.91 0 0 1 0-1.597l1.4-.765a10.383 10.383 0 0 0 4.128-4.13l.766-1.4a.91.91 0 0 1 1.596 0l.766 1.4a10.375 10.375 0 0 0 4.13 4.13"></path></svg></div> <!----> <ul class="__rmnGenieCodes--codesList"><li class="__rmnGenieCodes--codesListItem"><h3 class="rmnGenieCodes--title rmnGenie-heavyText mnGenie-italicText">25% Off Select consumer laptops $599 or more + Free Shipping</h3> <p class="rmnGenieCodes--description">Get 25% off select consumer laptops $599 or more (before taxes &amp; shipping) + free shipping. Non-combinable with other offers. </p> <!----> <button class="rmnGenie-codeButton">25SPRING18</button></li><li class="__rmnGenieCodes--codesListItem"><h3 class="rmnGenieCodes--title rmnGenie-heavyText mnGenie-italicText">40% Off Retail Price On All HP Workstations</h3> <p class="rmnGenieCodes--description">Get 40% Off Retail Price On All HP Workstations</p> <!----> <button class="rmnGenie-codeButton">RTWORK40</button></li><li class="__rmnGenieCodes--codesListItem"><h3 class="rmnGenieCodes--title rmnGenie-heavyText mnGenie-italicText">Extra 25% off the HP Z VR Backpack G1 Workstation</h3> <p class="rmnGenieCodes--description">Get an extra 25% off the HP Z VR Backpack G1 Workstation!</p> <!----> <button class="rmnGenie-codeButton">HPVRDEAL25</button></li><li class="__rmnGenieCodes--codesListItem"><h3 class="rmnGenieCodes--title rmnGenie-heavyText mnGenie-italicText">40% Off Intel 8th Gen Business PC</h3> <p class="rmnGenieCodes--description">Get 40% Off Intel 8th Gen Business PC</p> <!----> <button class="rmnGenie-codeButton">DRBWSK2J40</button></li><li class="__rmnGenieCodes--codesListItem"><h3 class="rmnGenieCodes--title rmnGenie-heavyText mnGenie-italicText">10% Off Small Business Configurable PCs</h3> <p class="rmnGenieCodes--description">Get 10% Off Select SMB Configurable PCs. Stackable Discount. Cart Limit: 5 per cart. Each coupon code limited to one use per customer; one code per checkout.</p> <!----> <button class="rmnGenie-codeButton">SMBHP10</button></li><li class="__rmnGenieCodes--codesListItem"><h3 class="rmnGenieCodes--title rmnGenie-heavyText mnGenie-italicText">15% Off Select Small Business Non-Configurable PCs</h3> <p class="rmnGenieCodes--description">Get 15% Off Select SMB Non-Configurable (STO &amp; BTO) PCs. Stackable Discount. Each coupon code limited to one use per customer; one code per checkout; 5 units per cart.</p> <!----> <button class="rmnGenie-codeButton">SMBHP15</button></li><li class="__rmnGenieCodes--codesListItem"><h3 class="rmnGenieCodes--title rmnGenie-heavyText mnGenie-italicText">60% off HP Smartwatches Engineered by HP</h3> <p class="rmnGenieCodes--description">Get 60% off HP Smartwatches Engineered by HP. Discount Increased.</p> <!----> <button class="rmnGenie-codeButton">TIMEOFF</button></li><li class="__rmnGenieCodes--codesListItem"><h3 class="rmnGenieCodes--title rmnGenie-heavyText mnGenie-italicText">40% off retail all Workstations</h3> <p class="rmnGenieCodes--description">Get 40% off retail all Workstations</p> <!----> <button class="rmnGenie-codeButton">HPWORK40</button></li></ul></div> <div class="links-container"><a href="https://secure.retailmenot.com/my-cashback" target="_blank" class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#C5C5C5" fill-rule="evenodd" stroke="#C5C5C5" stroke-width=".25" d="M13 1c6.628 0 12 5.373 12 12s-5.372 12-12 12C6.373 25 1 19.627 1 13S6.373 1 13 1zm0 23c3.352 0 6.353-1.512 8.372-3.883-.415-2.046-1.887-3.688-3.824-4.117h-.619a5.973 5.973 0 0 1-7.919 0h-.557c-1.938.429-3.407 2.073-3.822 4.12C6.65 22.49 9.65 24 13 24zm3.53-9a4.977 4.977 0 0 0 1.439-3.5c0-2.757-2.243-5-5-5s-5 2.243-5 5A4.98 4.98 0 0 0 9.407 15c.188.19.395.359.613.517.019.013.036.032.055.045.237.167.489.312.753.438.651.312 1.372.5 2.141.5.768 0 1.489-.188 2.14-.5a5.17 5.17 0 0 0 .753-.438c.02-.013.036-.032.056-.045.218-.158.425-.327.612-.517zM13 2C6.935 2 2 6.935 2 13c0 2.259.686 4.358 1.857 6.107.689-2.026 2.31-3.571 4.29-4.046A5.97 5.97 0 0 1 6.969 11.5a6 6 0 0 1 12 0 5.967 5.967 0 0 1-1.167 3.545c2.008.462 3.639 2.027 4.332 4.076A10.928 10.928 0 0 0 24 13c0-6.065-4.935-11-11-11z"></path></svg></a> <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#C5C5C5" fill-rule="evenodd" d="M10.5 19.5c-4.964 0-9-4.037-9-9 0-4.964 4.036-9 9-9 4.963 0 9 4.036 9 9 0 4.963-4.037 9-9 9m13.28 3.22l-5.351-5.352a10.435 10.435 0 0 0 2.57-6.868C21 4.7 16.3 0 10.5 0 4.702 0 0 4.7 0 10.5 0 16.299 4.7 21 10.5 21c2.63 0 5.028-.972 6.868-2.571l5.352 5.352a.75.75 0 0 0 1.06-1.06"></path></svg></div> <a href="https://help.retailmenot.com/" target="_blank" class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="#C5C5C5" fill-rule="evenodd"><path d="M16.303 7.483a3.959 3.959 0 0 0-2.762-.98 4.022 4.022 0 0 0-3.006 1.166A4.205 4.205 0 0 0 9.4 10.606h2.062v-.109a3.277 3.277 0 0 1 .315-1.439 1.72 1.72 0 0 1 1.696-.83 1.764 1.764 0 0 1 1.41.507c.29.343.444.777.433 1.225 0 .348-.102.687-.296.978a2.464 2.464 0 0 1-.443.528l-.66.638a4.728 4.728 0 0 0-1.233 1.644 4.039 4.039 0 0 0-.246 1.752h1.972a4.76 4.76 0 0 1 .147-1.252c.253-.447.588-.842.987-1.166a10.602 10.602 0 0 0 1.468-1.595c.277-.458.41-.985.385-1.518a3.269 3.269 0 0 0-1.094-2.486M12.897 17.5h1.004c.275 0 .499.222.499.497v1.006a.498.498 0 0 1-.499.497h-1.004a.497.497 0 0 1-.497-.497v-1.006c0-.275.222-.497.497-.497"></path> <path stroke="#FFF" stroke-width=".7" d="M13 23.417C7.256 23.417 2.583 18.744 2.583 13S7.256 2.584 13 2.584 23.417 7.256 23.417 13c0 5.744-4.673 10.417-10.417 10.417M13 .5C6.097.5.5 6.097.5 13c0 6.905 5.597 12.5 12.5 12.5S25.5 19.905 25.5 13C25.5 6.097 19.903.5 13 .5"></path></g></svg></a></div></div>
    
    `;
    document.body.appendChild(page);
}


// 向页面注入JS
function injectCustomJs(jsPath) {
    console.log("页面注入js");
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.body.appendChild(temp);
}

// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
    if (request.cmd == 'update_font_size') {
        var ele = document.createElement('style');
        ele.innerHTML = `* {font-size: ${request.size}px !important;}`;
        document.head.appendChild(ele);
    }
    else {
        tip(JSON.stringify(request));
        sendResponse('我收到你的消息了：' + JSON.stringify(request));
    }
});

// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(message) {
    var url = window.location.href;
    chrome.runtime.sendMessage({greeting: message || url}, function (response) {
        var support = get_support(response);
        console.log(support);
        if (support){
            initPage();
        } else{
            init_not_support();
        }

        tip('收到来自后台的回复：' + response);
    });
}

// 监听长连接
chrome.runtime.onConnect.addListener(function (port) {
    console.log(port);
    if (port.name == 'test-connect') {
        port.onMessage.addListener(function (msg) {
            console.log('收到长连接消息：', msg);
            tip('收到长连接消息：' + JSON.stringify(msg));
            if (msg.question == '你是谁啊？') port.postMessage({answer: '我是你爸！'});
        });
    }
});


window.addEventListener("message", function (e) {
    console.log('收到消息：', e.data);
    if (e.data && e.data.cmd == 'invoke') {
        eval('(' + e.data.code + ')');
    }
    else if (e.data && e.data.cmd == 'message') {
        tip(e.data.data);
    }
}, false);


function initCustomEventListen() {
    var hiddenDiv = document.getElementById('myCustomEventDiv');
    if (!hiddenDiv) {
        hiddenDiv = document.createElement('div');
        hiddenDiv.style.display = 'none';
        hiddenDiv.id = 'myCustomEventDiv';
        document.body.appendChild(hiddenDiv);
    }
    hiddenDiv.addEventListener('myCustomEvent', function () {
        var eventData = document.getElementById('myCustomEventDiv').innerText;
        tip('收到自定义事件：' + eventData);
    });
}

var tipCount = 0;

// 简单的消息通知
function tip(info) {
    info = info || '';
    var ele = document.createElement('div');
    ele.className = 'chrome-plugin-simple-tip slideInLeft';
    ele.style.top = tipCount * 70 + 20 + 'px';
    ele.innerHTML = `<div>${info}</div>`;
    document.body.appendChild(ele);
    ele.classList.add('animated');
    tipCount++;
    setTimeout(() => {
        ele.style.top = '-100px';
        setTimeout(() => {
            ele.remove();
            tipCount--;
        }, 400);
    }, 3000);
}


function parse_result(data, count, support, list) {
    console.log("parse_result" + data);
    var jsonData = $.parseJSON(data);
    count = jsonData.count;
    support = jsonData.status;
    console.log('count:' + count);
    console.log('support:' + support);
    var detail = jsonData.result;
    var i;
    for (i = 0; i < jsonData.count; i++) {
        console.log('code:' + detail[i].code);
        console.log('discount:' + detail[i].discount)
    }
}


function get_support(data) {
    console.log(data);
    var jsonData = $.parseJSON(data);
    return jsonData.status;
}

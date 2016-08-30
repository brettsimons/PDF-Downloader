chrome.tabs.onUpdated.addListener(checkForValidUrl);

var tabUrl = "";

function checkForValidUrl(tabId, changeInfo, tab) {	
	if (tab.url != null && (tab.url.indexOf("ebscohost.com") > 0 || tab.url.indexOf("eblib.com") > 0)) {
		chrome.pageAction.show(tabId);
		tabUrl = tab.url;
	}
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.startDownload) {
		if (tabUrl.indexOf("ebscohost.com") > 0) {
			execute('ebscohost.js', {pageRange: message.pageRange});
		}
		else if (tabUrl.indexOf("eblib.com") > 0) {
			execute('eblib.js', {pageRange: message.pageRange});
		}
	}
});

function execute(fileName, toSend, iteration = 0) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { 
		var tabId = tabs[0].id; 
	
		if (tabId == null || tabId < 0) {
			if (iteration > 10) return;
			
			execute(fileName, toSend, iteration++);
			return;
		}
	
		chrome.tabs.executeScript(tabId, {
			file: fileName
		},
		function() {
			chrome.tabs.sendMessage(tabId, toSend);
		});
	});
}
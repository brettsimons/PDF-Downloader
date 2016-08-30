chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var pageRange = message.pageRange;
    getUrls(pageRange);
});

function getUrls(pageRange) {
	var children = document.getElementById("viewport").childNodes;
	var url = "";
	var pageIds = [];

	for (var i = 0; i < children.length; i++) {
		var pageId = children[i].id;
		var endIndex = pageId.indexOf(".pdf") + 4;
		var startIndex = pageId.lastIndexOf("/") + 1;
		pageId = pageId.substr(startIndex, endIndex - startIndex);
		startIndex = pageId.indexOf("_") + 1;
		endIndex = pageId.indexOf(".", startIndex);
		var pageNumber = pageId.substr(startIndex, endIndex - startIndex);
		
		if (pageRange == null || (pageRange != null && (pageRange.length == 0 || pageRange.indexOf(pageNumber) > -1))) {	
			pageIds.push(pageId);
		}
		
		if (url == "" && children[i].innerHTML.length > 0 && children[i].innerHTML.indexOf("iframe") > 0) {
			var source = children[i].childNodes[0].src;
			startIndex = source.indexOf("&artifactRef=") + 13;
			endIndex = source.indexOf("&", startIndex);
			source = decodeURIComponent(source.substr(startIndex, endIndex - startIndex));
			url = source.substr(0, source.lastIndexOf("/") + 1);
		}
	}

	for (var i = 0; i < pageIds.length; i++) {
		pageIds[i] = {
			Url: url + pageIds[i],
			FileName: pageIds[i]
		};
	}

	chrome.extension.sendRequest(pageIds);
}
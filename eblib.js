chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var pageRange = message.pageRange;
    getUrls(pageRange);
});

function getUrls(pageRange) {
	var children = document.getElementById("imagecontainer").childNodes;
	var startUrl = "";
	var endUrl = "";
	var pageIds = [];

	for (var i = 2; i < children.length; i++) {
		var pageId = children[i].id;
		
		if (children[i].className != "sp") continue;
		
		var pageNumber = (Number(pageId.substr(1)) + 1).toString();
		
		if (pageRange == null || (pageRange != null && (pageRange.length == 0 || pageRange.indexOf(pageNumber) > -1))) {	
			pageIds.push(pageNumber);
		}
		
		if (startUrl == "" && children[i].innerHTML.length > 0 && children[i].innerHTML.indexOf("img") > 0) {
			var source = children[i].childNodes[0].src;
			source = source.substr(0, source.indexOf("r=img")) + "r=pdf" + source.substr(source.indexOf("r=img") + 5);
			var startIndex = source.indexOf("pg=") + 3;
			startUrl = source.substr(0, startIndex);
			endUrl = source.substr(source.indexOf("&", startIndex));
		}
	}
	
	if (startUrl == "") {
		var source = document.getElementById("pdfframe").src;
		var startIndex = source.indexOf("pg=") + 3;
		startUrl = source.substr(0, startIndex);
		endUrl = source.substr(source.indexOf("&", startIndex));
	}

	if (startUrl != "" && endUrl != "") {
		for (var i = 0; i < pageIds.length; i++) {
			pageIds[i] = {
				Url: startUrl + pageIds[i] + endUrl,
				FileName: pageIds[i] + ".pdf"
			};
		}
	}

	chrome.extension.sendRequest(pageIds);
}
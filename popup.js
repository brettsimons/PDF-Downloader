var downloadLocation = "eBook";

chrome.extension.onRequest.addListener(function(links) {
	var completed = 0;
	var totalTime = 0;
	for (var i = 0; i < links.length; i++) {
		setTimeout(function() {
			chrome.downloads.download({url: links[completed].Url, filename: ".\\" + downloadLocation + "\\" + links[completed].FileName});
			completed++;
			
			if (completed == i) document.getElementById('download').value = "Download";
		},
		totalTime);
		
		totalTime += Math.random() * 10000;
	}
});

window.onload = function startup() {
	document.getElementById('download').onclick = startDownload;
};

function startDownload() {
	downloadLocation = document.getElementById('location').value.trim();
	if (downloadLocation.length == 0) downloadLocation = "eBook";
	document.getElementById('download').innerHTML = "Downloading...";
	chrome.runtime.sendMessage({startDownload: true, pageRange: getPageRange(document.getElementById("pageRange").value)});
}

function getPageRange(input) {
	var range = input.trim().split(',');
	
	if (range.length == 0) return null;
	if (range.length == 1 && range[0] == "") return null;
	
	var length = range.length;
	for (var i = 0; i < length; i++) {
		if (range[i].indexOf("-") == -1) continue;
		
		var startEnd = range[i].split('-');
		if (startEnd.length != 2) continue;
		
		var start = Number(startEnd[0]);
		var end = Number(startEnd[1]);
		
		if (start == NaN || end == NaN) continue;
		
		range[i] = start.toString();
		range.push(end.toString());
		
		for (var x = start + 1; x < end; x++) range.push(x.toString());
	}
	
	return range;
}
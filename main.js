try{

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status == 'complete') {
        chrome.scripting.executeScript({
            files: ['lamp.js'],
            target: {tabId: tab.id}
        })
        chrome.scripting.insertCSS({
            files: ['lamp.css'],
            target: {tabId: tab.id}
        })
    }
})

} catch(e) {
    console.log(e);
}
    
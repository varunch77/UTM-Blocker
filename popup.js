//const key_block = "sites_to_turn_off_blocking"

document.getElementById("reload").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        let url = activeTab.url;
        chrome.storage.local.get(['key_block'], function (result) {
            alert(JSON.stringify(result.key_block));
            var duplicate = false;
            for (var i = 0; i < result.key_block.length; i++) {
                if (JSON.stringify(result.key_block[i]) === JSON.stringify(new URL(url).origin)) {
                    duplicate = true;
                }
            }
            if (!duplicate) {
                result.key_block.push(new URL(url).origin)
                chrome.storage.local.set({ key_block: result.key_block }, function () {
                    console.log("list updated")
                });
            }
        });
    });
    chrome.tabs.reload();
    setTimeout(function () { }, 500)
    chrome.tabs.reload();
});
var links = document.getElementsByTagName("a");
const key = "total_trackers_blocked"
const key_block = "sites_to_turn_off_blocking"

chrome.storage.local.get(['key_block'], function (result) {
    let contains = false;
    for (var i = 0; i < result.key_block.length; i++) {
        if (JSON.stringify(result.key_block[i]) === JSON.stringify(new URL(location.href).origin)) {
            contains = true;
        }
    }
    if (!contains) {
        for (var i = 0; i < links.length; i++) {
            let long_link = links[i].href;
            let short_link = long_link.replace(/utm_[^&]+&?/g, '');
            short_link = short_link.replace(/fbclid[^&]+&?/g, '');
            if (short_link != long_link) {
                chrome.storage.local.get(['key'], function (result) {
                    let old_num = result.key
                    let new_num = parseInt(old_num) + 1
                    new_num = new_num.toString()
                    chrome.storage.local.set({ key: new_num }, function () {
                        console.log(new_num)
                    });
                });
            }
            links[i].href = short_link;
        }
    }
});

var title = document.getElementById("title");
chrome.storage.local.get(['key'], function (result) {
    let new_num = result.key
    title.innerHTML = new_num
});
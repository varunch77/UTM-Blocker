const key = "total_trackers_blocked"
const val = "0"

chrome.storage.local.set({key: val}, function(){
    console.log("success")
});


const key_block = "sites_to_turn_off_blocking"
const val_block = []

chrome.storage.local.set({key_block: val_block}, function(){
    console.log("success_block")
});
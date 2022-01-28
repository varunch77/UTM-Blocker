const key = "total_trackers_blocked";
const key_block = "sites_to_turn_off_blocking";

let links = document.getElementsByTagName("a");
chrome.storage.local.get(["key_block"], function (result) {
  let contains = false;
  for (let i = 0; i < result.key_block.length; i++) {
    if (result.key_block[i] === new URL(location.href).origin) {
      contains = true;
    }
  }
  if (!contains) {
    for (let i = 0; i < links.length; i++) {
      let long_link = links[i].href;
      let short_link = long_link.replace(/utm_[^&]+&?/g, "");
      short_link = short_link.replace(/fbclid[^&]+&?/g, "");
      if (short_link != long_link) {
        chrome.storage.local.get(["key"], function (result) {
          let new_num = parseInt(result.key) + 1;
          new_num = new_num.toString();
          chrome.storage.local.set({ key: new_num }, function () {
            console.log(new_num);
          });
        });
      }
      links[i].href = short_link;
    }
  }
});

let elements = document.getElementsByClassName("number");
chrome.storage.local.get(["key"], function (result) {
  elements[0].innerHTML = result.key;
  elements[1].innerHTML = result.key;
});
window.onload = function () {
  chrome.storage.local.get(["key_theme"], function (theme) {
    if (theme.key_theme === "light") {
      var light = document.getElementById("light-container");
      light.classList.replace("d-none", "d-block");
    }
    else {
      var dark = document.getElementById("dark-container");
      dark.classList.replace("d-none", "d-block");
    }
  });
};

Array.from(document.getElementsByClassName('reload')).forEach(item => {
  item.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      chrome.storage.local.get(["key_block"], function (result) {
        let duplicate = false;
        for (let i = 0; i < result.key_block.length; i++) {
          if (result.key_block[i] === new URL(url).origin) {
            duplicate = true;
          }
        }
        if (!duplicate) {
          result.key_block.push(new URL(url).origin);
          chrome.storage.local.set({ key_block: result.key_block }, function () {
            console.log("list updated");
          });
        }
      });
    });
    chrome.tabs.reload();
    setTimeout(function () { }, 250);
    chrome.tabs.reload();
  })
})
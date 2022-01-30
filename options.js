window.onload = function () {
    chrome.storage.local.get(["key_theme"], function (theme) {
        if (theme.key_theme === "light") {
        }
        else {
            var checkbox = document.getElementById("theme");
            checkbox.setAttribute("checked", "");
        }
    });
};

document.getElementById("theme").addEventListener("change", function () {
    if (this.checked) {
        chrome.storage.local.set({ key_theme: "dark" }, function () {
            console.log("theme preference updated");
        });
    }
    else {
        chrome.storage.local.set({ key_theme: "light" }, function () {
            console.log("theme preference updated");
        });
    }
});  
document.getElementById("theme").addEventListener("change", function () {
    if (this.checked) {
        chrome.storage.local.set({ key_theme: "dark" }, function () {
            console.log("theme preference updated");
        });
    }
    else{
        chrome.storage.local.set({ key_theme: "light" }, function () {
            console.log("theme preference updated");
        });
    }
});  
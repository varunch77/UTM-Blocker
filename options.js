window.onload = function () {
    chrome.storage.local.get(["key_theme"], function (theme) {
        if (theme.key_theme === "light") {
            document.body.style.background = "#eeeeee";
            document.getElementById("options-body").classList.add("bg-white");
        }
        else {
            var checkbox = document.getElementById("theme");
            checkbox.setAttribute("checked", "");
            document.body.style.background = "#2E2E2F";
            document.getElementById("options-body").classList.add("bg-dark");
            document.getElementById("options-body").classList.add("muted-text");
        }
    });
    chrome.storage.local.get(["key_block"], function (result) {
        let table = document.getElementsByClassName("table")[0];
        for (let i = 0; i < result.key_block.length; i++) {
            let row = table.insertRow();
            let websiteUrl = row.insertCell(0);
            let removeIcon = row.insertCell(1);
            websiteUrl.innerHTML = result.key_block[i];
            removeIcon.innerHTML = "<a href='' class='icons light-icons'><i class='fas fa-minus-circle'></i></a>"
            removeIcon.setAttribute("id", i.toString());
            removeIcon.addEventListener("click", function () {
                removeIcon.closest("tr").remove();
                result.key_block.splice(i, 1);
                chrome.storage.local.set({ key_block: result.key_block }, function () {
                    console.log("list updated");
                });
            })
        };
    });
}

document.getElementById("theme").addEventListener("change", function () {
    if (this.checked) {
        chrome.storage.local.set({ key_theme: "dark" }, function () {
            console.log("theme preference updated");
        });
        chrome.tabs.reload();
    }
    else {
        chrome.storage.local.set({ key_theme: "light" }, function () {
            console.log("theme preference updated");
        });
        chrome.tabs.reload();
    }
});
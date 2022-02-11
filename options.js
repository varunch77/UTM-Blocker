window.onload = function () {
    let theme_mode = "";
    chrome.storage.local.get(["key_theme"], function (theme) { 
        if (theme.key_theme === "light") {
            theme_mode = "light";
            document.body.style.background = "#eeeeee";
            document.getElementById("options-body").classList.add("bg-white");
            document.getElementById("options-body").classList.add("border-white");
        }
        else {
            theme_mode = "dark";
            var checkbox = document.getElementById("theme");
            checkbox.setAttribute("checked", "");
            document.body.style.background = "#2E2E2F";
            document.getElementById("options-body").classList.add("bg-dark");
            document.getElementById("options-body").classList.add("muted-text");
            document.getElementById("options-body").classList.add("border-dark");
            document.getElementsByTagName("tbody")[0].classList.add("muted-text");
            let dividers = document.getElementsByTagName("hr");
            for (let m = 0; m < dividers.length; m++)
            {
                dividers[m].classList.add("lightDivider");
            }
            let iconList = document.getElementsByClassName("icons");
            for (let n = 0; n < iconList.length; n++)
            {
                iconList[n].classList.replace("light-icons", "dark-icons");
            }
        }
    });
    chrome.storage.local.get(["key_block"], function (result) {
        let table = document.getElementsByClassName("table")[0];
        for (let i = 0; i < result.key_block.length; i++) {
            let row = table.insertRow();
            let websiteUrl = row.insertCell(0);
            let removeIcon = row.insertCell(1);
            websiteUrl.innerHTML = result.key_block[i];
            if(theme_mode == "light") 
            {
                removeIcon.innerHTML = "<a href='' class='icons light-icons'><i class='fas fa-minus-circle'></i></a>"
            }
            else
            {
                removeIcon.innerHTML = "<a href='' class='icons dark-icons'><i class='fas fa-minus-circle'></i></a>"
            }
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
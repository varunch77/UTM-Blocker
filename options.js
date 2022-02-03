window.onload = function () {
    chrome.storage.local.get(["key_theme"], function (theme) {
        if (theme.key_theme === "light") {
        }
        else {
            var checkbox = document.getElementById("theme");
            checkbox.setAttribute("checked", "");
        }
    });
    chrome.storage.local.get(["key_block"], function (result) {
        let table = document.getElementsByClassName("table")[0];
        for (let i = 0; i < result.key_block.length; i++) {
            let row = table.insertRow();
            let websiteUrl = row.insertCell(0);
            websiteUrl.innerHTML = result.key_block[i];
            let removeIcon = row.insertCell(1);
            removeIcon.innerHTML = "<a href='' class='icons light-icons'><i class='fas fa-minus-circle'></i></a>";
            removeIcon.setAttribute("id", i.toString());
        }
    });
};

Array.from(document.getElementsByClassName('.fas')).forEach(icon => {
    icon.addEventListener('click', function() {
        alert("click");
        chrome.storage.local.get(["key_block"], function (result) {
            let table = document.getElementsByClassName("table")[0];
            table.deleteRow(parseInt(icon.id));
            result.key_block = result.key_block.splice(parseInt(icon.id), 1);
            alert(result.key_block);
            chrome.storage.local.set({ key_block: result.key_block }, function () {
                console.log("list updated");
              });
        });
    });
  });


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
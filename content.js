if (window.location.href.includes("wordreference")) {
    // Creation of a button next to each result
    var results = document.querySelectorAll(".FrWrd");
    results.forEach((result) => {
        if (!result.parentElement.classList.contains("langHeader")) {
            let btn = document.createElement("button");
            let img = document.createElement("img");
            img.src = "https://raw.githubusercontent.com/Rush/Font-Awesome-SVG-PNG/master/black/svg/star.svg";
            img.style.width = "20px";
            btn.appendChild(img);
            btn.classList.toggle("btnAdd");
            btn.style.border = "none";
            btn.style.textDecoration = "none";
            btn.style.background = "transparent";
            btn.style.cursor = "pointer";
            btn.style.display = "grid";
            btn.style.placeItems = "center";
            // btn.style.padding = "0";
            result.appendChild(btn);
        }
    });

    // Append the selected choice to the extension storage
    var btns = document.querySelectorAll(".btnAdd");
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            chrome.storage.local.get("history", (data) => {
                btn.parentElement.parentElement.lastChild.lastChild.style.display = "none";
                
                let VOWord = btn.parentElement.firstChild.textContent;
                let translatedWord =
                    btn.parentElement.parentElement.lastChild.innerText;

                let search = `${VOWord}:${translatedWord}`;
                chrome.storage.local.set({
                    history: `${data.history}\n${search}`
                });
            });
        });
    });
} else {
    let btn = document.createElement("button");
    btn.classList.toggle("btnAdd");
    btn.innerHTML = "Add";
    document.querySelector(".lmt__target_toolbar.lmt__target_toolbar--visible").appendChild(btn);

    btn.addEventListener("click", () => {
        chrome.storage.local.get("history", (data) => {
            let VOWord = document.querySelector("#source-dummydiv").textContent.trim();
            let translatedWord = document.querySelector("#target-dummydiv").textContent.trim();

            let search = `${VOWord}:${translatedWord}`;
            chrome.storage.local.set({
                history: data.history + "\n" + search,
            });
        });
    });
}

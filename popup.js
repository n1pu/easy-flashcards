chrome.storage.local.get('history', data => {
    if (data.history) document.querySelector(".history").innerText = data.history;
});

document.querySelector(".reset").addEventListener("click", () => {
    chrome.storage.local.set({history: ""});
    document.querySelector(".history").innerText = "";
});

document.querySelector(".export").addEventListener("click", () => {
    var content = document.querySelector("h2").innerText.trim();
    var blob = new Blob([content], {type: "text/plain"});
    
    var url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "flashcards.txt";

    anchor.click();

    window.URL.revokeObjectURL(url);
    doc
});
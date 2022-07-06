let popup = document.getElementById("popup");
let ovl = document.getElementById("overlay");

function openPopup() {
    popup.classList.add("open-popup");
    ovl.classList.add("ovl");
}

function closePopup() {
    popup.classList.remove("open-popup");
    ovl.classList.remove("ovl");
}
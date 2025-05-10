let popup = document.getElementById("popup");

function openpopup(event) {
    event.preventDefault();
    popup.classList.add("open-popup");
}

function closepopup() {
    popup.classList.remove("open-popup");
    document.querySelector(".contact").reset();
}

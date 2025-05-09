let popup = document.getElementById("popup");

function openpopup() {
    popup.classList.add("open-popup");
}

function closepopup() {
    popup.classList.remove("open-popup");
    document.querySelector(".contact").reset();
}
// add footer and navbar
fetch('navbar.html')
.then(res => res.text())
.then(data => {
  document.getElementById('navbar-placeholder').innerHTML = data;
});

// Load Footer
fetch('footer.html')
.then(res => res.text())
.then(data => {
  document.getElementById('footer-placeholder').innerHTML = data;
});
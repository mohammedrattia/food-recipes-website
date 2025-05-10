let currentTheme = localStorage.getItem("currentTheme") || "lightmode";
const switchthemes = document.getElementById("switch-themes");
var root = document.documentElement;
const enableDarkmode = () => {
  root.classList.add("darkmode");
  localStorage.setItem("currentTheme", "darkmode");
  switchthemes.getElementsByTagName("svg")[0].style.display="block";
  switchthemes.getElementsByTagName("svg")[1].style.display="none";
  
};

const disableDarkmode = () => {
  root.classList.remove("darkmode");
  localStorage.setItem("currentTheme", "lightmode");
  switchthemes.getElementsByTagName("svg")[1].style.display="block";
  switchthemes.getElementsByTagName("svg")[0].style.display="none";
};

if (currentTheme === "darkmode") {
  enableDarkmode();
} else {
  disableDarkmode();
}

function switchTheme() {
  currentTheme = localStorage.getItem("currentTheme");
  if (currentTheme === "darkmode") {
    console.log("I don't work")
    disableDarkmode();
  } else {
    console.log("I work");
    enableDarkmode();
  }
}
let darkmode = localStorage.getItem('darkmode')
const switchthemes = document.getElementById('switch-themes')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode' , 'active')
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode' , null)
}

if (darkmode === 'active') {
  enableDarkmode();
} else {
  disableDarkmode();
}

switchthemes.addEventListener('click', () => {
  darkmode = localStorage.getItem('darkmode');
  if (darkmode !== 'active') {
      enableDarkmode();
  } else {
      disableDarkmode();
  }
});

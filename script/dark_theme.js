(function() {
  
  if (!window.matchMedia) return
  
  const darkChk = document.querySelector('#dark_theme'),
    darkScheme = window.matchMedia('(prefers-color-scheme: dark)')

  function setTheme(darkScheme) { darkChk.checked = darkScheme.matches }
  
  setTheme()
  darkScheme.addEventListener('change', setTheme)
  
})()

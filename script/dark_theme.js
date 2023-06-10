(function() {
  if (!window.matchMedia) return
  
  const darkChk = document.querySelector('#dark_theme'),
    darkScheme = window.matchMedia('(prefers-color-scheme: dark)')
  if (darkChk.checked && !darkScheme.matches) return

  function setTheme() { darkChk.checked = darkScheme.matches }
  
  darkScheme.addEventListener('change', setTheme)
  setTheme()
  console.debug('dark_theme.js', darkChk.value)
})()

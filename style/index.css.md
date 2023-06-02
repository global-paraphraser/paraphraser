/*
# Native overrides
*/

html, body { height: 100vw; }
body { margin: 0; }



/*
# Variables
*/

#app {
  --lighter: rgba(255,255,255,.1);
  --darker: rgba(0,0,0,.1);
  --lightened: rgba(255,255,255,.05);
  --darkened: rgba(0,0,0,.5);
}



/*
# Debug
*/

#app * {
  background-color: var(--lighter);
  border: 1px solid var(--darkened);
}


/*
# Base
*/

#app {
  display: grid;
  width: 100vw;
  height: 100vh;
  margin: 0;
  grid-template:
    "header"
    "main" 1fr
    "footer";
  box-sizing: border-box;
}



/*
# Header
*/

#header {
  grid-area: header;
  display: grid;
  /* align-items: center; */
  /* grid-gap: 3em; */
  /* grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); */
  /* grid-template-columns: repeat(2, min-content); */
  /* grid-template-columns: min-content 1fr; */
  /* grid-template-columns: min-content minmax(100px, 1fr); */
  /* grid-template-columns: auto 1fr; */
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  /* grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); */
  grid-auto-columns: minmax(300px, 1fr);
  grid-auto-flow: dense;
  /* grid-auto-rows: 3em; */
  /* justify-content: end; */
  /* justify-content: space-between; */
  justify-items: end;
}

#header #site_logo {
  justify-self: start;
  height: 3em;
  /* max-height: 100%; */
  /* height: 3rem; */
}


/*
## Navigation bar
*/

#header nav {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, minmax(auto, 1fr));
  grid-template-rows: 3em;
  /* width: 500px; */
  /* justify-self: end; */
  /* height: 100%; */
  /*width: max-content;
  max-width: 100%;*/
  /* min-width: max-content; */
  /* grid-template: 3em / repeat(minmax(10rem, 1fr)); */
}
#header nav a {
  margin: 0 1rem;
  text-align: center;
}



/*
# Footer
*/

#footer {
  grid-area: footer;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  background-color: var(--lighter);
}

#footer .toggle_dark_theme {
  text-align: right;
}



/*
# Dark theme
*/

.themed_container {
  background-color: var(--bg-color);
  color: var(--font-color);
  --bg-color: #222;
  --font-color: #ddd;
}

#dark_theme { display: none; }
#dark_theme:checked + * {
  --bg-color: #444;
  --font-color: #ddd;
  background-color: var(--bg-color);
  color: var(--font-color);
}

'use strict';

let currentTheme=applyTheme(readTheme());

document.addEventListener('click',event=>{
  const button=event.target.closest('#theme-toggle');
  if(!button)return;
  currentTheme=applyTheme(currentTheme==='dark'?'light':'dark');
  updateThemeButton(button,currentTheme);
  try{localStorage.setItem(THEME_KEY,currentTheme)}catch{}
});

fetch('content/site.json',{cache:'no-cache'})
  .then(r=>{if(!r.ok)throw Error('Could not load content');return r.json()})
  .then(validate)
  .then(d=>{
    document.title=d.profile.name+' · Personal website';
    document.querySelector('#site').innerHTML=renderSite(d);
    updateThemeButton(document.querySelector('#theme-toggle'),currentTheme);
    applyNewsLimit(document,d.profile);
  })
  .catch(()=>{document.querySelector('#site').innerHTML='<p class="loading">Content is temporarily unavailable. Please refresh to try again.</p>'});

(() => {
  if (document.getElementById('edu-global-nav')) return;
  const script = document.currentScript;
  const root = new URL('../', script.src);
  const links = [
    ['Home','index.html','⌂'],
    ['Class 11','notes1.html','11'],
    ['Class 12','notes.html','12'],
    ['Notes Library','notes-f.html','▤'],
    ['Flashcards','flashcard.html','▦'],
    ['Quiz','Quiz.html','✓'],
    ['Graphing Studio','graphing/tr-01.html','∿']
  ];

  // Restore the saved preference, or follow the operating system until the user chooses.
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('edu-suite-theme'); } catch (_) {}
  const initialDark = savedTheme ? savedTheme === 'dark' : window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', Boolean(initialDark));
  document.documentElement.dataset.theme = initialDark ? 'dark' : 'light';

  const nav = document.createElement('nav');
  nav.id = 'edu-global-nav';
  nav.setAttribute('aria-label','Main navigation');
  const inner = document.createElement('div'); inner.className='edu-nav-inner';
  const brand = document.createElement('a'); brand.className='edu-brand'; brand.href=new URL('index.html',root).href;
  brand.innerHTML='<span class="edu-brand-mark" aria-hidden="true">✦</span><span>Edu Suite</span>';

  const actions = document.createElement('div'); actions.className='edu-nav-actions';
  const theme = document.createElement('button'); theme.className='edu-theme-toggle'; theme.type='button';
  theme.setAttribute('aria-label','Switch to light mode'); theme.setAttribute('title','Switch to light mode');
  const updateThemeButton = () => {
    const dark = document.documentElement.classList.contains('dark');
    theme.innerHTML = dark ? '<span aria-hidden="true">☀</span><span class="edu-theme-label">Light mode</span>' : '<span aria-hidden="true">☾</span><span class="edu-theme-label">Dark mode</span>';
    theme.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    theme.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  const applyTheme = (dark, persist=true) => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    if (persist) { try { localStorage.setItem('edu-suite-theme', dark ? 'dark' : 'light'); } catch (_) {} }
    updateThemeButton();
  };
  theme.addEventListener('click', () => applyTheme(!document.documentElement.classList.contains('dark')));
  updateThemeButton();

  const toggle = document.createElement('button'); toggle.className='edu-menu-toggle'; toggle.type='button';
  toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-controls','edu-global-links');
  toggle.innerHTML='<span aria-hidden="true">☰</span><span>Menu</span>';
  const list = document.createElement('div'); list.className='edu-links'; list.id='edu-global-links';
  const currentPath = new URL(location.href).pathname.replace(/\/+$/,'');
  links.forEach(([label,path]) => {
    const a=document.createElement('a'); a.className='edu-link'; a.textContent=label; a.href=new URL(path,root).href;
    const target=new URL(a.href).pathname.replace(/\/+$/,'');
    if(target===currentPath || (path==='index.html' && currentPath.endsWith('/'))){a.setAttribute('aria-current','page');}
    list.appendChild(a);
  });
  toggle.addEventListener('click',()=>{const open=list.classList.toggle('edu-open');toggle.setAttribute('aria-expanded',String(open));});
  actions.append(theme, toggle);
  inner.append(brand,actions,list); nav.appendChild(inner);
  document.body.insertBefore(nav,document.body.firstChild);

  // Full-viewport graphing apps need to account for the additional shared navigation row.
  if(document.querySelector('.app') && /graphing\/te-02\.html$/.test(location.pathname)){
    const app=document.querySelector('.app');
    app.style.height='calc(100vh - 60px)';
  }
})();

// Minimal hash router. Each screen module exports render(container, params)
// and may return a cleanup function -- the router always runs the previous
// screen's cleanup before rendering the next (stops TTS/recognition, removes
// listeners, prevents leaks).

const routes = [];
let currentCleanup = null;

export function registerRoute(pattern, render) {
  // pattern like 'dialogue/:id' -> regex with named groups
  const names = [];
  const re = new RegExp('^' + pattern.replace(/:[^/]+/g, (m) => {
    names.push(m.slice(1));
    return '([^/]+)';
  }) + '$');
  routes.push({ re, names, render });
}

export function navigate(path) {
  location.hash = '#/' + path.replace(/^#?\/?/, '');
}

export function currentPath() {
  return location.hash.replace(/^#\/?/, '');
}

async function handleRoute() {
  const full = currentPath();
  const [path, queryStr] = full.split('?');
  const query = Object.fromEntries(new URLSearchParams(queryStr || ''));
  const container = document.getElementById('screen');

  if (typeof currentCleanup === 'function') {
    try { currentCleanup(); } catch (e) { console.error('cleanup error', e); }
    currentCleanup = null;
  }

  for (const r of routes) {
    const m = path.match(r.re);
    if (m) {
      const params = { ...query };
      r.names.forEach((n, i) => { params[n] = decodeURIComponent(m[i + 1]); });
      container.scrollTop = 0;
      window.scrollTo(0, 0);
      try {
        currentCleanup = await r.render(container, params) || null;
      } catch (e) {
        console.error('Screen render failed:', e);
        container.innerHTML = `
          <div class="boot-error" role="alert">
            <h2>Something went wrong</h2>
            <p style="color:var(--text-dim);margin:0.5rem 0">${String(e.message || e)}</p>
            <button class="btn" onclick="location.hash='#/'">Back to Home</button>
          </div>`;
      }
      updateNav(path);
      return;
    }
  }
  // Unknown route -> home
  navigate('');
}

function updateNav(path) {
  const seg = path.split('/')[0] || 'home';
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.nav === seg || (seg === 'home' && a.dataset.nav === 'home'));
  });
  // Hide the nav during a dialogue or a full-screen branching conversation so
  // it can't be tapped mid-recording. The Story map (bare 'story') keeps it.
  const isFullScreen = seg === 'dialogue' || /^story\/.+/.test(path) || seg === 'branchmap' || seg === 'shorts';
  document.getElementById('bottom-nav').style.display = isFullScreen ? 'none' : '';
}

export function startRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

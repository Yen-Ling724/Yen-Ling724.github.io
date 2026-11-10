const grid = document.querySelector('.grid');
const filters = document.querySelector('.filters');
let projects = [];
let current = '全部';

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  }
  node.append(...children);
  return node;
}

function card(p) {
  const cover = el('div', { class: 'cover', style: `background: var(--c-${p.color || 'yellow'})` });
  if (p.image) cover.append(el('img', { src: p.image, alt: p.title, loading: 'lazy' }));
  else cover.append(el('span', { text: p.emoji || '✨', 'aria-hidden': 'true' }));

  const actions = el('div', { class: 'actions' });
  if (p.demo) actions.append(el('a', { class: 'btn', href: p.demo, target: '_blank', rel: 'noopener', text: '看網站' }));
  if (p.code) actions.append(el('a', { class: 'btn ghost', href: p.code, target: '_blank', rel: 'noopener', text: '看程式碼' }));

  const body = el('div', { class: 'card-body' }, [
    el('h3', { text: p.title }),
    el('p', { text: p.summary }),
    el('div', { class: 'tags' }, (p.tags || []).map((t) => el('span', { class: 'tag', text: '#' + t }))),
  ]);
  if (actions.children.length) body.append(actions);

  const node = el('article', { class: 'card' }, [cover, body]);
  if (p.sample) node.append(el('span', { class: 'badge', text: '範例' }));
  return node;
}

function render() {
  const list = current === '全部' ? projects : projects.filter((p) => p.category === current);
  grid.replaceChildren(...list.map(card));
  filters.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === current)));
}

function renderFilters() {
  const cats = ['全部', ...new Set(projects.map((p) => p.category).filter(Boolean))];
  filters.replaceChildren(...cats.map((c) => {
    const b = el('button', { type: 'button', 'data-cat': c, text: c });
    b.addEventListener('click', () => { current = c; render(); });
    return b;
  }));
}

fetch('projects.json')
  .then((r) => r.json())
  .then((data) => { projects = data; renderFilters(); render(); })
  .catch(() => { grid.textContent = '作品資料載入失敗，請稍後再試。'; });

// 風格切換（記住上次的選擇）
const root = document.documentElement;
try { const saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch {}
document.querySelectorAll('[data-set-theme]').forEach((b) => b.addEventListener('click', () => {
  root.dataset.theme = b.dataset.setTheme;
  try { localStorage.setItem('theme', b.dataset.setTheme); } catch {}
}));

// Email 拆開寫，減少被垃圾信程式抓到
const mail = ['a0968550502', 'gmail.com'].join('@');
document.getElementById('mail').href = 'mailto:' + mail;
document.getElementById('year').textContent = new Date().getFullYear();

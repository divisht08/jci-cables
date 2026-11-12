/* JCI Cables — shared header behaviour: mobile menu, products dropdown, product search */
(function () {
  var script = document.currentScript;
  var BASE = script ? script.src.replace(/site\.js(\?.*)?$/, '') : '';

  /* mobile menu */
  var toggle = document.getElementById('jhToggle');
  var collapse = document.getElementById('jhCollapse');
  function closeMenu() {
    if (!collapse) return;
    collapse.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }
  if (toggle && collapse) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = collapse.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* products dropdown */
  var drop = document.getElementById('jhDrop');
  var dropBtn = document.getElementById('jhDropBtn');
  function setDrop(open) {
    if (!drop) return;
    drop.classList.toggle('open', open);
    dropBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (drop && dropBtn) {
    dropBtn.addEventListener('click', function (e) { e.stopPropagation(); setDrop(!drop.classList.contains('open')); });
    var hoverable = window.matchMedia && window.matchMedia('(hover:hover) and (min-width:1061px)');
    var timer;
    drop.addEventListener('mouseenter', function () { if (hoverable && hoverable.matches) { clearTimeout(timer); setDrop(true); } });
    drop.addEventListener('mouseleave', function () { if (hoverable && hoverable.matches) { timer = setTimeout(function () { setDrop(false); }, 160); } });
  }

  /* search */
  var input = document.getElementById('jhSearchInput');
  var results = document.getElementById('jhSearchResults');
  var DATA = null, pending = [], sel = -1;

  function loadData(cb) {
    if (DATA) return cb(DATA);
    pending.push(cb);
    if (pending.length > 1) return;
    fetch(BASE + 'products-index.json')
      .then(function (r) { return r.json(); })
      .catch(function () { return []; })
      .then(function (json) { DATA = json; pending.forEach(function (f) { f(DATA); }); pending = []; });
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }

  function render() {
    var q = norm(input.value);
    sel = -1;
    if (!q) { results.innerHTML = ''; results.classList.remove('open'); return; }
    var words = q.split(' ');
    var squashed = q.replace(/ /g, '');
    loadData(function (data) {
      var scored = [];
      data.forEach(function (item) {
        var name = norm(item.n), hay = name + ' ' + norm(item.c);
        var haySquashed = hay.replace(/ /g, '');
        var all = words.every(function (w) { return hay.indexOf(w) !== -1; });
        if (!all && haySquashed.indexOf(squashed) === -1) return;
        var score = name.indexOf(q) === 0 ? 0 : name.indexOf(q) !== -1 ? 1 : words.every(function (w) { return name.indexOf(w) !== -1; }) ? 2 : 3;
        scored.push({ item: item, score: score });
      });
      scored.sort(function (a, b) { return a.score - b.score; });
      if (!scored.length) {
        results.innerHTML = '<div class="jh-res-note">No products found for "' + esc(input.value) + '". <a href="' + BASE + 'contact.html">Ask us for it</a> — we make cables to order.</div>';
        results.classList.add('open');
        return;
      }
      var html = scored.slice(0, 8).map(function (s) {
        var it = s.item;
        return '<a class="jh-res" href="' + BASE + it.u + '">' +
          '<img src="' + BASE + it.img + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
          '<span class="jh-res-info"><span class="jh-res-name">' + esc(it.n) + '</span>' +
          '<span class="jh-res-meta">' + esc(it.c) + ' · ' + esc(it.p) + '</span></span></a>';
      }).join('');
      if (scored.length > 8) html += '<div class="jh-res-note">' + (scored.length - 8) + ' more — keep typing to narrow down</div>';
      results.innerHTML = html;
      results.classList.add('open');
    });
  }
  function move(d) {
    var items = results.querySelectorAll('.jh-res');
    if (!items.length) return;
    if (sel >= 0 && items[sel]) items[sel].classList.remove('is-sel');
    sel = (sel + d + items.length) % items.length;
    items[sel].classList.add('is-sel');
    items[sel].scrollIntoView({ block: 'nearest' });
  }
  if (input && results) {
    input.addEventListener('input', render);
    input.addEventListener('focus', function () { loadData(function () {}); if (input.value.trim()) render(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') {
        var items = results.querySelectorAll('.jh-res');
        var go = items[sel >= 0 ? sel : 0];
        if (go) { e.preventDefault(); window.location.href = go.href; }
      } else if (e.key === 'Escape') { results.classList.remove('open'); input.blur(); }
    });
  }

  document.addEventListener('click', function (e) {
    if (results && input && !input.parentNode.contains(e.target)) results.classList.remove('open');
    if (drop && !drop.contains(e.target)) setDrop(false);
    if (collapse && toggle && !collapse.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setDrop(false); closeMenu(); } });
  if (collapse) collapse.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
})();

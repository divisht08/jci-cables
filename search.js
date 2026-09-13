(function () {
  var input = document.getElementById('siteSearchInput');
  var results = document.getElementById('siteSearchResults');
  var wrap = document.getElementById('siteSearchWrap');
  if (!input || !results || !wrap) return;

  var DATA = null;
  var loading = false;

  function loadData(cb) {
    if (DATA) return cb(DATA);
    if (loading) { setTimeout(function () { loadData(cb); }, 60); return; }
    loading = true;
    fetch('products-index.json')
      .then(function (r) { return r.json(); })
      .then(function (json) { DATA = json; loading = false; cb(DATA); })
      .catch(function () { DATA = []; loading = false; cb(DATA); });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function render(query) {
    var q = query.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; results.classList.remove('open'); return; }
    loadData(function (data) {
      var matches = data.filter(function (item) {
        return item.n.toLowerCase().indexOf(q) !== -1 || item.c.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 8);

      if (!matches.length) {
        results.innerHTML = '<div class="ss-empty">No products found for "' + escapeHtml(query) + '"</div>';
        results.classList.add('open');
        return;
      }

      results.innerHTML = matches.map(function (item) {
        return '<a class="ss-item" href="' + item.u + '">' +
          '<img src="' + item.img + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
          '<span class="ss-info"><span class="ss-name">' + escapeHtml(item.n) + '</span>' +
          '<span class="ss-meta">' + escapeHtml(item.c) + ' · ' + escapeHtml(item.p) + '</span></span>' +
          '</a>';
      }).join('');
      results.classList.add('open');
    });
  }

  input.addEventListener('input', function () { render(input.value); });
  input.addEventListener('focus', function () { if (input.value.trim()) render(input.value); });
  document.addEventListener('click', function (e) {
    if (!wrap.contains(e.target)) { results.classList.remove('open'); }
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { results.classList.remove('open'); input.blur(); }
  });
})();


(function () {
  var toggle = document.getElementById('navToggle');
  var collapse = document.getElementById('navCollapse');
  if (!toggle || !collapse) return;
  function closeMenu() {
    collapse.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = collapse.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  collapse.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', function (e) {
    if (!collapse.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

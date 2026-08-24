(function () {
  'use strict';

  var sellers = [
    { code: 7101, name: 'Alex Lima' },
    { code: 7202, name: 'Bianca Reis' },
    { code: 7303, name: 'Caio Prado' },
    { code: 7404, name: 'Dora Monte' },
  ];
  var demoRows = [
    { seller_code: 7101, seller_name: 'Alex Lima', customer_code: 91001, customer_name: 'Estúdio Aurora', last_date: '2026-08-02', qty_invoiced: 6, qty_sold: 2, qty_returned: 0, qty_pending: 4, pending_value: 540 },
    { seller_code: 7101, seller_name: 'Alex Lima', customer_code: 91002, customer_name: 'Loja Horizonte', last_date: '2026-07-15', qty_invoiced: 10, qty_sold: 4, qty_returned: 1, qty_pending: 5, pending_value: 625 },
    { seller_code: 7202, seller_name: 'Bianca Reis', customer_code: 91003, customer_name: 'Casa Ipê', last_date: '2026-08-04', qty_invoiced: 8, qty_sold: 3, qty_returned: 1, qty_pending: 4, pending_value: 480 },
    { seller_code: 7303, seller_name: 'Caio Prado', customer_code: 91004, customer_name: 'Vitrine Nuvem', last_date: '2026-07-06', qty_invoiced: 15, qty_sold: 5, qty_returned: 2, qty_pending: 8, pending_value: 990 },
    { seller_code: 7404, seller_name: 'Dora Monte', customer_code: 91005, customer_name: 'Ateliê Orla', last_date: '2026-08-07', qty_invoiced: 7, qty_sold: 2, qty_returned: 0, qty_pending: 5, pending_value: 525 },
  ];

  var byId = function (id) { return document.getElementById(id); };
  var elements = {
    loginView: byId('loginView'), dashboardView: byId('dashboardView'),
    modeSwitcher: byId('modeSwitcher'), userAvatar: byId('userAvatar'), userName: byId('userName'), userRole: byId('userRole'), logout: byId('logoutButton'),
    scenario: byId('scenarioSelect'), seller: byId('sellerSelect'), sellerLabel: byId('sellerFieldLabel'), refresh: byId('refreshButton'),
    eyebrow: byId('eyebrow'), title: byId('pageTitle'), heroCopy: byId('heroCopy'), metrics: byId('metrics'), sellerMetric: byId('sellerMetric'),
    sellerCount: byId('sellerCount'), clientCount: byId('clientCount'), quantity: byId('pendingQuantity'), value: byId('pendingValue'),
    summarySection: byId('sellerSummarySection'), summary: byId('sellerSummary'), showAll: byId('showAllSellers'), adminFilters: byId('adminFilters'),
    search: byId('searchInput'), dateFrom: byId('dateFrom'), dateTo: byId('dateTo'), qtyMin: byId('qtyMin'), valueMin: byId('valueMin'), clearFilters: byId('clearFilters'),
    panel: byId('dataPanel'), context: byId('resultContext'), loading: byId('loadingState'), error: byId('errorState'), retry: byId('retryButton'),
    empty: byId('emptyState'), emptyTitle: byId('emptyTitle'), emptyMessage: byId('emptyMessage'), emptyAction: byId('emptyAction'),
    tableWrap: byId('tableWrap'), rows: byId('tableRows'), sellerHeader: byId('sellerHeader'), updated: byId('updatedAt'),
  };
  var state = {
    accountRole: 'admin', mode: 'admin', activeSeller: 7101, dataRows: [],
    sortKey: 'qty_pending', sortDirection: 'desc', loadTimer: null,
  };

  function money(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);
  }

  function quantity(value) {
    return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 3 }).format(Number(value) || 0);
  }

  function date(value) {
    if (!value) return '—';
    var parts = value.split('-');
    return parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : '—';
  }

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function initials(name) {
    return String(name).split(/\s+/).slice(0, 2).map(function (part) { return part.charAt(0); }).join('').toUpperCase();
  }

  function enterDemo(role) {
    document.querySelectorAll('[data-demo-role]').forEach(function (button) { button.disabled = true; });
    window.setTimeout(function () {
      document.querySelectorAll('[data-demo-role]').forEach(function (button) { button.disabled = false; });
      state.accountRole = role === 'seller' ? 'seller' : 'admin';
      state.mode = state.accountRole;
      state.activeSeller = 7101;
      openDashboard();
    }, 420);
  }

  function openDashboard() {
    elements.loginView.hidden = true;
    elements.dashboardView.hidden = false;
    elements.modeSwitcher.hidden = state.accountRole !== 'admin';
    elements.userAvatar.textContent = state.accountRole === 'admin' ? 'DA' : 'AL';
    elements.userName.textContent = state.accountRole === 'admin' ? 'Demo Administrador' : 'Alex Lima (Demo)';
    elements.userRole.textContent = state.accountRole === 'admin' ? 'Perfil administrador' : 'Perfil vendedor';
    elements.scenario.value = 'data';
    configureMode(state.mode, false);
    window.location.hash = 'dashboard';
    loadData();
  }

  function logout() {
    window.clearTimeout(state.loadTimer);
    elements.dashboardView.hidden = true;
    elements.loginView.hidden = false;
    window.location.hash = 'login';
    document.querySelector('[data-demo-role]').focus();
  }

  function populateSellers() {
    elements.seller.replaceChildren();
    if (state.mode === 'admin') {
      var all = document.createElement('option');
      all.value = 'all';
      all.textContent = 'Todos os vendedores';
      elements.seller.append(all);
    }
    var available = state.accountRole === 'seller' ? sellers.slice(0, 1) : sellers;
    available.forEach(function (seller) {
      var option = document.createElement('option');
      option.value = String(seller.code);
      option.textContent = seller.name + ' · ' + seller.code;
      elements.seller.append(option);
    });
    elements.seller.value = state.mode === 'admin' ? 'all' : String(state.activeSeller);
  }

  function configureMode(mode, reload) {
    state.mode = state.accountRole === 'seller' ? 'seller' : mode;
    var admin = state.mode === 'admin';
    document.querySelectorAll('[data-mode]').forEach(function (button) {
      var active = button.dataset.mode === state.mode;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    });
    elements.metrics.classList.toggle('admin', admin);
    elements.sellerMetric.hidden = !admin;
    elements.sellerHeader.hidden = !admin;
    elements.adminFilters.hidden = !admin;
    elements.sellerLabel.textContent = admin ? 'Filtrar vendedor' : 'Vendedor';
    elements.eyebrow.textContent = admin ? 'Visão administrativa' : 'Carteira individual';
    elements.title.textContent = admin ? 'Panorama das carteiras' : 'Clientes da sua carteira';
    elements.heroCopy.textContent = admin
      ? 'Priorize os lotes com maior saldo e acompanhe a operação em um só lugar.'
      : 'Acompanhe os lotes ainda em aberto e concentre os próximos acertos.';
    if (!admin && state.sortKey === 'seller_name') state.sortKey = 'qty_pending';
    populateSellers();
    clearFilters(false);
    if (reload !== false) loadData();
  }

  function setLoading() {
    elements.panel.setAttribute('aria-busy', 'true');
    elements.loading.hidden = false;
    elements.error.hidden = true;
    elements.empty.hidden = true;
    elements.tableWrap.hidden = true;
    elements.summarySection.hidden = true;
    elements.summary.replaceChildren();
    elements.refresh.disabled = true;
    elements.seller.disabled = true;
    elements.scenario.disabled = true;
    elements.context.textContent = 'Carregando os dados da demonstração…';
    [elements.sellerCount, elements.clientCount, elements.quantity, elements.value].forEach(function (item) { item.textContent = '—'; });
  }

  function finishLoading() {
    elements.panel.setAttribute('aria-busy', 'false');
    elements.loading.hidden = true;
    elements.refresh.disabled = false;
    elements.seller.disabled = false;
    elements.scenario.disabled = false;
  }

  function loadData() {
    window.clearTimeout(state.loadTimer);
    setLoading();
    state.loadTimer = window.setTimeout(function () {
      finishLoading();
      if (elements.scenario.value === 'error') {
        state.dataRows = [];
        elements.error.hidden = false;
        elements.context.textContent = 'Falha simulada; nenhum resultado foi aplicado.';
        elements.updated.textContent = 'Última atualização não concluída';
        return;
      }
      if (elements.scenario.value === 'empty') {
        state.dataRows = [];
      } else if (state.mode === 'admin') {
        state.dataRows = demoRows.slice();
      } else {
        state.dataRows = demoRows.filter(function (row) { return row.seller_code === state.activeSeller; });
      }
      elements.updated.textContent = 'Atualizado às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      render();
    }, 620);
  }

  function filteredRows() {
    var term = normalize(elements.search.value.trim());
    var selectedSeller = state.mode === 'admin' && elements.seller.value !== 'all' ? Number(elements.seller.value) : null;
    var minimumQuantity = elements.qtyMin.value === '' ? null : Number(elements.qtyMin.value);
    var minimumValue = elements.valueMin.value === '' ? null : Number(elements.valueMin.value);
    return state.dataRows.filter(function (row) {
      if (selectedSeller && row.seller_code !== selectedSeller) return false;
      if (term && !normalize(row.customer_code + ' ' + row.customer_name).includes(term)) return false;
      if (elements.dateFrom.value && row.last_date < elements.dateFrom.value) return false;
      if (elements.dateTo.value && row.last_date > elements.dateTo.value) return false;
      if (minimumQuantity !== null && row.qty_pending < minimumQuantity) return false;
      if (minimumValue !== null && row.pending_value < minimumValue) return false;
      return true;
    });
  }

  function visibleRows() {
    var direction = state.sortDirection === 'asc' ? 1 : -1;
    return filteredRows().slice().sort(function (left, right) {
      var a = left[state.sortKey];
      var b = right[state.sortKey];
      if (typeof a === 'number' && typeof b === 'number') return (a - b) * direction;
      return String(a || '').localeCompare(String(b || ''), 'pt-BR', { numeric: true }) * direction;
    });
  }

  function updateMetrics(rows) {
    elements.sellerCount.textContent = quantity(new Set(rows.map(function (row) { return row.seller_code; })).size);
    elements.clientCount.textContent = quantity(rows.length);
    elements.quantity.textContent = quantity(rows.reduce(function (sum, row) { return sum + row.qty_pending; }, 0));
    elements.value.textContent = money(rows.reduce(function (sum, row) { return sum + row.pending_value; }, 0));
  }

  function makeCell(text, className, label) {
    var cell = document.createElement('td');
    cell.textContent = text;
    cell.className = className || '';
    cell.dataset.label = label;
    return cell;
  }

  function renderRows(rows) {
    elements.rows.replaceChildren();
    rows.forEach(function (row) {
      var tr = document.createElement('tr');
      if (state.mode === 'admin') {
        var sellerCell = makeCell('', 'seller-cell', 'Vendedor');
        var sellerName = document.createElement('strong'); sellerName.textContent = row.seller_name;
        var sellerCode = document.createElement('small'); sellerCode.textContent = 'ID ' + row.seller_code;
        sellerCell.append(sellerName, sellerCode); tr.append(sellerCell);
      }
      var customerCell = makeCell('', 'customer-cell', 'Cliente');
      var customerName = document.createElement('strong'); customerName.textContent = row.customer_name;
      var customerCode = document.createElement('small'); customerCode.textContent = 'Código ' + row.customer_code;
      customerCell.append(customerName, customerCode); tr.append(customerCell);
      tr.append(makeCell(date(row.last_date), '', 'Último lote'));
      tr.append(makeCell(quantity(row.qty_invoiced), 'numeric', 'Enviada'));
      tr.append(makeCell(quantity(row.qty_sold), 'numeric', 'Vendida'));
      tr.append(makeCell(quantity(row.qty_returned), 'numeric', 'Devolvida'));
      var pending = makeCell('', 'numeric pending-cell', 'Pendente');
      var badge = document.createElement('span'); badge.className = 'pending-pill'; badge.textContent = quantity(row.qty_pending); pending.append(badge); tr.append(pending);
      tr.append(makeCell(money(row.pending_value), 'numeric pending-cell', 'Valor pendente'));
      elements.rows.append(tr);
    });
  }

  function renderSortState() {
    document.querySelectorAll('th[data-sort]').forEach(function (header) {
      var active = header.dataset.sort === state.sortKey;
      var icon = header.querySelector('.sort-button span');
      if (active) {
        header.setAttribute('aria-sort', state.sortDirection === 'asc' ? 'ascending' : 'descending');
        icon.textContent = state.sortDirection === 'asc' ? '↑' : '↓';
      } else {
        header.removeAttribute('aria-sort');
        icon.textContent = '↕';
      }
    });
  }

  function renderSummary() {
    elements.summary.replaceChildren();
    if (state.mode !== 'admin' || elements.scenario.value === 'error') {
      elements.summarySection.hidden = true;
      return;
    }
    elements.summarySection.hidden = false;
    sellers.forEach(function (seller) {
      var rows = state.dataRows.filter(function (row) { return row.seller_code === seller.code; });
      var card = document.createElement('button'); card.type = 'button'; card.className = 'seller-summary-card'; card.dataset.sellerCode = String(seller.code);
      var person = document.createElement('span'); person.className = 'summary-person';
      var avatar = document.createElement('span'); avatar.className = 'summary-avatar'; avatar.textContent = initials(seller.name);
      var copy = document.createElement('span'); var name = document.createElement('strong'); name.textContent = seller.name; var code = document.createElement('small'); code.textContent = 'ID ' + seller.code; copy.append(name, code); person.append(avatar, copy);
      var numbers = document.createElement('span'); numbers.className = 'summary-numbers';
      var clients = document.createElement('span'); var clientValue = document.createElement('b'); clientValue.textContent = quantity(rows.length); var clientLabel = document.createElement('small'); clientLabel.textContent = rows.length === 1 ? 'cliente' : 'clientes'; clients.append(clientValue, clientLabel);
      var total = document.createElement('span'); var totalValue = document.createElement('b'); totalValue.textContent = money(rows.reduce(function (sum, row) { return sum + row.pending_value; }, 0)); var totalLabel = document.createElement('small'); totalLabel.textContent = 'pendente'; total.append(totalValue, totalLabel);
      numbers.append(clients, total); card.append(person, numbers);
      card.addEventListener('click', function () { elements.seller.value = String(seller.code); render(); });
      elements.summary.append(card);
    });
  }

  function render() {
    if (!elements.loading.hidden) return;
    var rows = visibleRows();
    renderSortState();
    updateMetrics(rows);
    renderSummary();
    renderRows(rows);
    elements.error.hidden = true;
    if (state.dataRows.length === 0) {
      elements.tableWrap.hidden = true;
      elements.empty.hidden = false;
      elements.emptyTitle.textContent = 'Nenhuma pendência neste cenário';
      elements.emptyMessage.textContent = 'O conjunto mock retornou uma carteira sem saldos em aberto.';
      elements.emptyAction.hidden = true;
      elements.context.textContent = 'Nenhum lote pendente nos dados carregados.';
    } else if (rows.length === 0) {
      elements.tableWrap.hidden = true;
      elements.empty.hidden = false;
      elements.emptyTitle.textContent = 'Nenhum resultado para os filtros';
      elements.emptyMessage.textContent = 'Ajuste a busca, o vendedor ou os intervalos para ampliar o resultado.';
      elements.emptyAction.hidden = false;
      elements.context.textContent = '0 de ' + state.dataRows.length + ' clientes correspondem aos filtros.';
    } else {
      elements.empty.hidden = true;
      elements.tableWrap.hidden = false;
      elements.context.textContent = rows.length + ' de ' + state.dataRows.length + (state.dataRows.length === 1 ? ' cliente pendente' : ' clientes pendentes') + ' nos dados carregados.';
    }
  }

  function clearFilters(renderAfter) {
    elements.search.value = '';
    elements.dateFrom.value = '';
    elements.dateTo.value = '';
    elements.qtyMin.value = '';
    elements.valueMin.value = '';
    if (state.mode === 'admin') elements.seller.value = 'all';
    if (renderAfter !== false && !elements.loading.hidden) return;
    if (renderAfter !== false) render();
  }

  document.querySelectorAll('[data-demo-role]').forEach(function (button) {
    button.addEventListener('click', function () {
      enterDemo(button.dataset.demoRole);
    });
  });
  document.querySelectorAll('[data-mode]').forEach(function (button) {
    button.addEventListener('click', function () { configureMode(button.dataset.mode, true); });
  });
  document.querySelectorAll('th[data-sort]').forEach(function (header) {
    header.querySelector('button').addEventListener('click', function () {
      var key = header.dataset.sort;
      if (state.sortKey === key) state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      else { state.sortKey = key; state.sortDirection = ['customer_name', 'seller_name'].includes(key) ? 'asc' : 'desc'; }
      render();
    });
  });
  elements.logout.addEventListener('click', logout);
  elements.scenario.addEventListener('change', loadData);
  elements.refresh.addEventListener('click', loadData);
  elements.retry.addEventListener('click', function () { elements.scenario.value = 'data'; loadData(); });
  elements.seller.addEventListener('change', function () {
    if (state.mode === 'admin') render();
    else { state.activeSeller = Number(elements.seller.value); loadData(); }
  });
  [elements.search, elements.dateFrom, elements.dateTo, elements.qtyMin, elements.valueMin].forEach(function (input) { input.addEventListener('input', render); });
  elements.clearFilters.addEventListener('click', function () { clearFilters(true); });
  elements.emptyAction.addEventListener('click', function () { clearFilters(true); });
  elements.showAll.addEventListener('click', function () { elements.seller.value = 'all'; render(); });

  if (window.location.hash === '#dashboard') window.location.hash = 'login';
}());

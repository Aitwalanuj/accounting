const APP_KEY = 'nepa_accounting_erp_github_pages_v1';
const LOGIN_KEY = 'nepa_accounting_erp_session_v1';

const navItems = [
  ['dashboard', 'Dashboard'],
  ['companies', 'Companies'],
  ['branches', 'Branches'],
  ['contacts', 'Contacts'],
  ['products', 'Products'],
  ['accounts', 'Chart of Accounts'],
  ['sales', 'Sales Invoices'],
  ['purchases', 'Vendor Bills'],
  ['inventory', 'Inventory'],
  ['journals', 'Journal Entries'],
  ['reports', 'Reports'],
  ['audit', 'Audit Log'],
  ['setup', 'Setup / Backup']
];

let currentPage = 'dashboard';
let state = loadState();

function seedData() {
  const today = new Date().toISOString().slice(0, 10);
  const s = {
    companies: [
      { id: 'COMP-NEPA', name: 'NEPA Wholesale Inc.', currency: 'USD', taxId: '27-1325247', status: 'Active' },
      { id: 'COMP-NEPA2', name: 'NEPA 2 Wholesale LLC', currency: 'USD', taxId: '', status: 'Active' }
    ],
    branches: [
      { id: 'BR-WPB', companyId: 'COMP-NEPA', name: 'West Palm Beach', address: '4365 Okeechobee Blvd, West Palm Beach, FL', status: 'Active' },
      { id: 'BR-MIA', companyId: 'COMP-NEPA', name: 'Miami 305', address: 'Miami, FL', status: 'Active' },
      { id: 'BR-NEPA2', companyId: 'COMP-NEPA2', name: 'NEPA 2 Main Branch', address: 'Florida', status: 'Active' }
    ],
    warehouses: [
      { id: 'WH-WPB', companyId: 'COMP-NEPA', branchId: 'BR-WPB', name: 'WPB Main Warehouse' },
      { id: 'WH-MIA', companyId: 'COMP-NEPA', branchId: 'BR-MIA', name: 'Miami Warehouse' },
      { id: 'WH-NEPA2', companyId: 'COMP-NEPA2', branchId: 'BR-NEPA2', name: 'NEPA 2 Warehouse' }
    ],
    contacts: [
      { id: 'CUST-001', type: 'Customer', name: 'ABC Market', email: 'abc@example.com', phone: '', companyId: 'COMP-NEPA', creditLimit: 5000, terms: 'Net 15' },
      { id: 'CUST-002', type: 'Customer', name: 'Sunrise Convenience', email: 'sunrise@example.com', phone: '', companyId: 'COMP-NEPA', creditLimit: 7500, terms: 'Net 15' },
      { id: 'SUP-001', type: 'Supplier', name: 'Global Cigar Supply', email: 'vendor@example.com', phone: '', companyId: 'COMP-NEPA', creditLimit: 0, terms: 'Net 30' },
      { id: 'EMP-001', type: 'Employee', name: 'Admin User', email: 'admin@nepa.local', phone: '', companyId: 'COMP-NEPA', creditLimit: 0, terms: '' }
    ],
    products: [
      { id: 'PROD-001', sku: 'CIG-001', name: 'Premium Cigar Box', category: 'Cigars', brand: 'House', uom: 'Box', salesPrice: 120, cost: 72, taxRate: 'TAX-FL-0' },
      { id: 'PROD-002', sku: 'VAPE-001', name: 'Disposable Vape', category: 'Vape', brand: 'House', uom: 'Case', salesPrice: 210, cost: 140, taxRate: 'TAX-FL-0' },
      { id: 'PROD-003', sku: 'GROC-001', name: 'Grocery Item Pack', category: 'Grocery', brand: 'General', uom: 'Case', salesPrice: 48, cost: 32, taxRate: 'TAX-FL-0' }
    ],
    taxes: [
      { id: 'TAX-FL-0', name: 'No Sales Tax', rate: 0 },
      { id: 'TAX-FL-6', name: 'Sales Tax 6%', rate: 6 }
    ],
    accounts: [
      { id: '1000', code: '1000', name: 'Cash', type: 'Asset' },
      { id: '1010', code: '1010', name: 'Bank', type: 'Asset' },
      { id: '1100', code: '1100', name: 'Accounts Receivable', type: 'Asset' },
      { id: '1200', code: '1200', name: 'Inventory', type: 'Asset' },
      { id: '1300', code: '1300', name: 'Input Tax Receivable', type: 'Asset' },
      { id: '2000', code: '2000', name: 'Accounts Payable', type: 'Liability' },
      { id: '2100', code: '2100', name: 'Output Tax Payable', type: 'Liability' },
      { id: '3000', code: '3000', name: 'Owner Capital', type: 'Equity' },
      { id: '4000', code: '4000', name: 'Sales Revenue', type: 'Income' },
      { id: '5000', code: '5000', name: 'Cost of Goods Sold', type: 'Expense' },
      { id: '5100', code: '5100', name: 'Purchase Expense', type: 'Expense' },
      { id: '6000', code: '6000', name: 'General Expense', type: 'Expense' },
      { id: '6999', code: '6999', name: 'Inventory Adjustment', type: 'Expense' }
    ],
    salesInvoices: [],
    vendorBills: [],
    inventoryMoves: [],
    journalEntries: [],
    payments: [],
    audit: []
  };
  s.inventoryMoves.push(
    { id: nextId('STK'), date: today, companyId: 'COMP-NEPA', branchId: 'BR-WPB', warehouseId: 'WH-WPB', productId: 'PROD-001', qty: 50, unitCost: 72, type: 'Opening', ref: 'OPENING' },
    { id: nextId('STK'), date: today, companyId: 'COMP-NEPA', branchId: 'BR-WPB', warehouseId: 'WH-WPB', productId: 'PROD-002', qty: 35, unitCost: 140, type: 'Opening', ref: 'OPENING' },
    { id: nextId('STK'), date: today, companyId: 'COMP-NEPA', branchId: 'BR-MIA', warehouseId: 'WH-MIA', productId: 'PROD-003', qty: 100, unitCost: 32, type: 'Opening', ref: 'OPENING' }
  );
  s.journalEntries.push({
    id: 'JE-OPENING', date: today, companyId: 'COMP-NEPA', branchId: 'BR-WPB', ref: 'OPENING', memo: 'Opening inventory and capital', auto: true,
    lines: [
      { accountId: '1200', debit: 11700, credit: 0, partyId: '', memo: 'Opening stock' },
      { accountId: '3000', debit: 0, credit: 11700, partyId: '', memo: 'Opening capital' }
    ]
  });
  s.audit.push({ date: new Date().toISOString(), user: 'admin', action: 'Seed data created', module: 'System', ref: 'INIT' });
  return s;
}

function loadState() {
  const raw = localStorage.getItem(APP_KEY);
  if (!raw) return seedData();
  try { return JSON.parse(raw); } catch (e) { return seedData(); }
}
function saveState(action, module, ref) {
  if (action) state.audit.unshift({ date: new Date().toISOString(), user: 'admin', action, module, ref: ref || '' });
  localStorage.setItem(APP_KEY, JSON.stringify(state));
}
function money(n) { return Number(n || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' }); }
function num(n) { return Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 2 }); }
function byId(list, id) { return (state[list] || []).find(x => x.id === id); }
function esc(v) { return String(v ?? '').replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
function nextId(prefix) { return prefix + '-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 999).toString().padStart(3, '0'); }
function selectedCompany() { return document.getElementById('companyFilter')?.value || 'ALL'; }
function selectedBranch() { return document.getElementById('branchFilter')?.value || 'ALL'; }
function filteredByScope(rows) {
  const c = selectedCompany();
  const b = selectedBranch();
  return rows.filter(r => (c === 'ALL' || r.companyId === c) && (b === 'ALL' || r.branchId === b));
}
function accountName(id) { const a = byId('accounts', id); return a ? `${a.code} - ${a.name}` : id; }
function contactName(id) { const c = byId('contacts', id); return c ? c.name : id; }
function productName(id) { const p = byId('products', id); return p ? `${p.sku} - ${p.name}` : id; }
function warehouseName(id) { const w = byId('warehouses', id); return w ? w.name : id; }
function companyName(id) { const c = byId('companies', id); return c ? c.name : id; }
function branchName(id) { const b = byId('branches', id); return b ? b.name : id; }

function init() {
  renderNav();
  document.getElementById('loginBtn').onclick = login;
  document.getElementById('logoutBtn').onclick = logout;
  document.getElementById('backupBtn').onclick = exportBackup;
  document.getElementById('restoreFile').onchange = importBackup;
  document.getElementById('resetBtn').onclick = resetDemo;
  document.getElementById('companyFilter').onchange = () => { renderBranchFilter(); renderPage(); };
  document.getElementById('branchFilter').onchange = renderPage;
  if (sessionStorage.getItem(LOGIN_KEY) === 'yes') showApp();
}
function login() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  if (u === 'admin' && p === 'admin123') { sessionStorage.setItem(LOGIN_KEY, 'yes'); showApp(); }
  else document.getElementById('loginMsg').textContent = 'Invalid username or password.';
}
function logout() { sessionStorage.removeItem(LOGIN_KEY); document.getElementById('appShell').classList.add('hidden'); document.getElementById('loginScreen').classList.remove('hidden'); }
function showApp() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('appShell').classList.remove('hidden');
  renderFilters();
  renderPage();
}
function renderNav() {
  document.getElementById('nav').innerHTML = navItems.map(([key, label]) => `<button class="nav-btn ${key === currentPage ? 'active' : ''}" data-page="${key}">${label}</button>`).join('');
  document.querySelectorAll('.nav-btn').forEach(btn => btn.onclick = () => { currentPage = btn.dataset.page; renderNav(); renderPage(); });
}
function renderFilters() {
  const c = document.getElementById('companyFilter');
  c.innerHTML = `<option value="ALL">All Companies</option>` + state.companies.map(x => `<option value="${x.id}">${esc(x.name)}</option>`).join('');
  renderBranchFilter();
}
function renderBranchFilter() {
  const c = selectedCompany();
  const branches = state.branches.filter(b => c === 'ALL' || b.companyId === c);
  const sel = document.getElementById('branchFilter');
  const old = sel.value;
  sel.innerHTML = `<option value="ALL">All Branches</option>` + branches.map(x => `<option value="${x.id}">${esc(x.name)}</option>`).join('');
  if ([...sel.options].some(o => o.value === old)) sel.value = old;
}
function setTitle(title, sub) {
  document.getElementById('pageTitle').textContent = title;
  document.getElementById('pageSubtitle').textContent = sub || '';
}
function renderPage() {
  const map = { dashboard: renderDashboard, companies: renderCompanies, branches: renderBranches, contacts: renderContacts, products: renderProducts, accounts: renderAccounts, sales: renderSales, purchases: renderPurchases, inventory: renderInventory, journals: renderJournals, reports: renderReports, audit: renderAudit, setup: renderSetup };
  map[currentPage]();
}

function calcTotals() {
  const invoices = filteredByScope(state.salesInvoices);
  const bills = filteredByScope(state.vendorBills);
  const journals = filteredByScope(state.journalEntries);
  const moves = filteredByScope(state.inventoryMoves);
  const sales = invoices.reduce((a, x) => a + Number(x.total || 0), 0);
  const purchases = bills.reduce((a, x) => a + Number(x.total || 0), 0);
  const ar = balanceForAccount('1100', journals);
  const ap = -balanceForAccount('2000', journals);
  const bank = balanceForAccount('1010', journals) + balanceForAccount('1000', journals);
  const cogs = balanceForAccount('5000', journals);
  const revenue = -balanceForAccount('4000', journals);
  const profit = revenue - cogs - balanceForAccount('6000', journals) - balanceForAccount('6999', journals);
  const invValue = moves.reduce((a, m) => a + Number(m.qty || 0) * Number(m.unitCost || 0), 0);
  return { sales, purchases, ar, ap, bank, cogs, revenue, profit, invValue };
}
function balanceForAccount(accountId, journals) {
  return journals.flatMap(j => j.lines || []).filter(l => l.accountId === accountId).reduce((a, l) => a + Number(l.debit || 0) - Number(l.credit || 0), 0);
}
function renderDashboard() {
  setTitle('Dashboard', 'Live summary from browser database.');
  const t = calcTotals();
  const topProducts = [...state.products].map(p => {
    const sold = filteredByScope(state.inventoryMoves).filter(m => m.productId === p.id && Number(m.qty) < 0).reduce((a, m) => a + Math.abs(Number(m.qty)), 0);
    return { product: p.name, sold };
  }).sort((a, b) => b.sold - a.sold).slice(0, 5);
  document.getElementById('content').innerHTML = `
    <div class="grid cols-4">
      ${kpi('Total Sales', money(t.sales))}
      ${kpi('Total Purchases', money(t.purchases))}
      ${kpi('Receivables', money(t.ar))}
      ${kpi('Payables', money(t.ap))}
      ${kpi('Cash / Bank', money(t.bank))}
      ${kpi('Inventory Value', money(t.invValue))}
      ${kpi('Gross Profit', money(t.revenue - t.cogs))}
      ${kpi('Net Profit', money(t.profit))}
    </div>
    <div class="grid cols-2" style="margin-top:16px">
      <div class="card"><h3>Top Selling Products</h3>${simpleTable(['Product','Qty Sold'], topProducts.map(x => [x.product, num(x.sold)]))}</div>
      <div class="card"><h3>Recent Activity</h3>${simpleTable(['Date','Module','Action'], state.audit.slice(0,8).map(x => [new Date(x.date).toLocaleString(), x.module, x.action]))}</div>
    </div>`;
}
function kpi(label, value) { return `<div class="card kpi"><span>${label}</span><strong>${value}</strong></div>`; }

function renderCompanies() {
  setTitle('Companies', 'Maintain legal entities.');
  renderMaster('companies', 'Company', [
    ['id','Company ID'], ['name','Company Name'], ['currency','Currency'], ['taxId','Tax ID'], ['status','Status']
  ], companyForm);
}
function companyForm(existing) {
  return formHtml([
    field('id', 'Company ID', existing?.id || nextId('COMP')),
    field('name', 'Company Name', existing?.name || ''),
    field('currency', 'Currency', existing?.currency || 'USD'),
    field('taxId', 'Tax ID', existing?.taxId || ''),
    selectField('status', 'Status', ['Active','Inactive'], existing?.status || 'Active')
  ]);
}
function renderBranches() {
  setTitle('Branches', 'Branch setup under each company.');
  renderMaster('branches', 'Branch', [
    ['id','Branch ID'], ['companyId','Company', companyName], ['name','Branch Name'], ['address','Address'], ['status','Status']
  ], branchForm);
}
function branchForm(existing) {
  return formHtml([
    field('id', 'Branch ID', existing?.id || nextId('BR')),
    selectObj('companyId', 'Company', state.companies, existing?.companyId),
    field('name', 'Branch Name', existing?.name || ''),
    field('address', 'Address', existing?.address || '', true),
    selectField('status', 'Status', ['Active','Inactive'], existing?.status || 'Active')
  ]);
}
function renderContacts() {
  setTitle('Contacts', 'Customers, suppliers, employees and other contacts.');
  const rows = filteredByCompanyOnly(state.contacts);
  renderCustomMaster('contacts', 'Contact', rows, [
    ['id','Contact ID'], ['type','Type'], ['name','Name'], ['companyId','Company', companyName], ['creditLimit','Credit Limit', money], ['terms','Payment Terms']
  ], contactForm);
}
function contactForm(existing) {
  return formHtml([
    field('id', 'Contact ID', existing?.id || nextId('CNT')),
    selectField('type', 'Type', ['Customer','Supplier','Employee','Other'], existing?.type || 'Customer'),
    selectObj('companyId', 'Company', state.companies, existing?.companyId),
    field('name', 'Name', existing?.name || ''),
    field('email', 'Email', existing?.email || ''),
    field('phone', 'Phone', existing?.phone || ''),
    field('creditLimit', 'Credit Limit', existing?.creditLimit || 0, false, 'number'),
    field('terms', 'Payment Terms', existing?.terms || 'Net 15')
  ]);
}
function renderProducts() {
  setTitle('Products', 'Product master with cost and sales price.');
  renderMaster('products', 'Product', [
    ['id','Product ID'], ['sku','SKU'], ['name','Product'], ['category','Category'], ['uom','UOM'], ['salesPrice','Sales Price', money], ['cost','Cost', money]
  ], productForm);
}
function productForm(existing) {
  return formHtml([
    field('id', 'Product ID', existing?.id || nextId('PROD')),
    field('sku', 'SKU', existing?.sku || ''),
    field('name', 'Product Name', existing?.name || ''),
    field('category', 'Category', existing?.category || ''),
    field('brand', 'Brand', existing?.brand || ''),
    field('uom', 'UOM', existing?.uom || 'Each'),
    field('salesPrice', 'Sales Price', existing?.salesPrice || 0, false, 'number'),
    field('cost', 'Cost', existing?.cost || 0, false, 'number'),
    selectObj('taxRate', 'Tax Rate', state.taxes, existing?.taxRate)
  ]);
}
function renderAccounts() {
  setTitle('Chart of Accounts', 'Accounts used for journal entries and posting rules.');
  renderMaster('accounts', 'Account', [
    ['code','Code'], ['name','Account Name'], ['type','Type']
  ], accountForm);
}
function accountForm(existing) {
  return formHtml([
    field('id', 'Account ID', existing?.id || ''),
    field('code', 'Code', existing?.code || ''),
    field('name', 'Account Name', existing?.name || ''),
    selectField('type', 'Type', ['Asset','Liability','Equity','Income','Expense'], existing?.type || 'Asset')
  ]);
}

function renderMaster(key, label, cols, formFn) {
  renderCustomMaster(key, label, state[key], cols, formFn);
}
function renderCustomMaster(key, label, rows, cols, formFn) {
  document.getElementById('content').innerHTML = `
    <div class="card">
      <div class="toolbar"><div class="left"><input id="searchBox" placeholder="Search ${label.toLowerCase()}..." /></div><div class="right"><button class="primary" id="addBtn">Add ${label}</button></div></div>
      <div id="tableHost"></div>
    </div>`;
  const draw = () => {
    const q = document.getElementById('searchBox').value.toLowerCase();
    const data = rows.filter(r => JSON.stringify(r).toLowerCase().includes(q));
    document.getElementById('tableHost').innerHTML = table(cols.map(c => c[1]).concat(['Actions']), data.map(r => cols.map(c => c[2] ? c[2](r[c[0]]) : r[c[0]]).concat([`<button data-edit="${r.id}" class="outline">Edit</button>`])));
    document.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => openMasterModal(key, label, formFn, state[key].find(x => x.id === b.dataset.edit)));
  };
  document.getElementById('searchBox').oninput = draw;
  document.getElementById('addBtn').onclick = () => openMasterModal(key, label, formFn);
  draw();
}
function openMasterModal(key, label, formFn, existing) {
  openModal((existing ? 'Edit ' : 'Add ') + label, `<form id="masterForm">${formFn(existing)}<button class="primary full">Save</button></form>`);
  document.getElementById('masterForm').onsubmit = e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    Object.keys(data).forEach(k => { if (!isNaN(data[k]) && data[k] !== '') data[k] = Number(data[k]); });
    if (existing) Object.assign(existing, data); else state[key].push(data);
    saveState(existing ? `Updated ${label}` : `Created ${label}`, label, data.id);
    closeModal(); renderFilters(); renderPage();
  };
}

function renderSales() {
  setTitle('Sales Invoices', 'Customer invoices with automatic AR, sales, COGS and inventory posting.');
  const rows = filteredByScope(state.salesInvoices);
  document.getElementById('content').innerHTML = `<div class="card"><div class="toolbar"><div></div><button id="newInvoice" class="primary">Create Sales Invoice</button></div>${table(['Invoice','Date','Customer','Company','Branch','Total','Status'], rows.map(x => [x.id, x.date, contactName(x.customerId), companyName(x.companyId), branchName(x.branchId), money(x.total), badge(x.status, 'green')]))}</div>`;
  document.getElementById('newInvoice').onclick = openSalesModal;
}
function openSalesModal() {
  const company = selectedCompany() === 'ALL' ? state.companies[0].id : selectedCompany();
  const branch = selectedBranch() === 'ALL' ? state.branches.find(b => b.companyId === company)?.id : selectedBranch();
  openModal('Create Sales Invoice', `
    <form id="invoiceForm">
      <div class="form-grid">
        ${field('id', 'Invoice No.', nextId('SINV'))}
        ${field('date', 'Invoice Date', new Date().toISOString().slice(0,10), false, 'date')}
        ${selectObj('companyId', 'Company', state.companies, company)}
        ${selectObj('branchId', 'Branch', state.branches, branch)}
        ${selectObj('customerId', 'Customer', state.contacts.filter(c => c.type === 'Customer'), '')}
        ${selectObj('warehouseId', 'Warehouse', state.warehouses, '')}
      </div>
      <div class="line-box"><h3>Invoice Lines</h3><div id="lineRows"></div><button type="button" id="addLine" class="outline">Add Line</button><div class="totals"><span>Net: <b id="netTotal">$0.00</b></span><span>Tax: <b id="taxTotal">$0.00</b></span><span>Total: <b id="grandTotal">$0.00</b></span></div></div>
      <button class="primary full">Post Invoice</button>
    </form>`);
  setupProductLines();
  document.getElementById('invoiceForm').onsubmit = e => { e.preventDefault(); saveSalesInvoice(e.target); };
}
function setupProductLines() {
  const host = document.getElementById('lineRows');
  function add() {
    const div = document.createElement('div');
    div.className = 'line-row';
    div.innerHTML = `${selectObj('productId', 'Product', state.products, '')}${field('qty', 'Qty', 1, false, 'number')}${field('price', 'Price', 0, false, 'number')}${field('tax', 'Tax %', 0, false, 'number')}<button type="button" class="danger remove">Remove</button>`;
    host.appendChild(div);
    div.querySelector('[name=productId]').onchange = ev => { const p = byId('products', ev.target.value); if (p) { div.querySelector('[name=price]').value = p.salesPrice; const tax = byId('taxes', p.taxRate); div.querySelector('[name=tax]').value = tax ? tax.rate : 0; } calcLineTotals(); };
    div.querySelectorAll('input,select').forEach(x => x.oninput = calcLineTotals);
    div.querySelector('.remove').onclick = () => { div.remove(); calcLineTotals(); };
    const sel = div.querySelector('[name=productId]'); if (state.products[0]) { sel.value = state.products[0].id; sel.onchange({ target: sel }); }
  }
  document.getElementById('addLine').onclick = add;
  add();
}
function collectProductLines() {
  return [...document.querySelectorAll('.line-row')].map(r => ({ productId: r.querySelector('[name=productId]').value, qty: Number(r.querySelector('[name=qty]').value || 0), price: Number(r.querySelector('[name=price]').value || 0), tax: Number(r.querySelector('[name=tax]').value || 0) })).filter(l => l.productId && l.qty);
}
function calcLineTotals() {
  const lines = collectProductLines();
  const net = lines.reduce((a, l) => a + l.qty * l.price, 0);
  const tax = lines.reduce((a, l) => a + l.qty * l.price * l.tax / 100, 0);
  document.getElementById('netTotal').textContent = money(net);
  document.getElementById('taxTotal').textContent = money(tax);
  document.getElementById('grandTotal').textContent = money(net + tax);
}
function saveSalesInvoice(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const lines = collectProductLines();
  const net = lines.reduce((a, l) => a + l.qty * l.price, 0);
  const tax = lines.reduce((a, l) => a + l.qty * l.price * l.tax / 100, 0);
  const total = net + tax;
  const invoice = { ...data, lines, net, tax, total, status: 'Posted' };
  state.salesInvoices.push(invoice);
  lines.forEach(l => {
    const p = byId('products', l.productId);
    const unitCost = Number(p?.cost || 0);
    state.inventoryMoves.push({ id: nextId('STK'), date: data.date, companyId: data.companyId, branchId: data.branchId, warehouseId: data.warehouseId, productId: l.productId, qty: -l.qty, unitCost, type: 'Sale', ref: data.id });
  });
  const cogs = lines.reduce((a, l) => a + l.qty * Number(byId('products', l.productId)?.cost || 0), 0);
  state.journalEntries.push({ id: nextId('JE'), date: data.date, companyId: data.companyId, branchId: data.branchId, ref: data.id, memo: 'Auto posting sales invoice', auto: true, lines: [
    { accountId: '1100', debit: total, credit: 0, partyId: data.customerId, memo: 'Customer receivable' },
    { accountId: '4000', debit: 0, credit: net, partyId: data.customerId, memo: 'Sales revenue' },
    { accountId: '2100', debit: 0, credit: tax, partyId: data.customerId, memo: 'Output tax' },
    { accountId: '5000', debit: cogs, credit: 0, partyId: '', memo: 'COGS' },
    { accountId: '1200', debit: 0, credit: cogs, partyId: '', memo: 'Inventory out' }
  ].filter(l => l.debit || l.credit) });
  saveState('Posted sales invoice', 'Sales', data.id); closeModal(); renderPage();
}

function renderPurchases() {
  setTitle('Vendor Bills', 'Supplier bills with automatic AP and inventory posting.');
  const rows = filteredByScope(state.vendorBills);
  document.getElementById('content').innerHTML = `<div class="card"><div class="toolbar"><div></div><button id="newBill" class="primary">Create Vendor Bill</button></div>${table(['Bill','Date','Supplier','Company','Branch','Total','Status'], rows.map(x => [x.id, x.date, contactName(x.supplierId), companyName(x.companyId), branchName(x.branchId), money(x.total), badge(x.status, 'green')]))}</div>`;
  document.getElementById('newBill').onclick = openPurchaseModal;
}
function openPurchaseModal() {
  const company = selectedCompany() === 'ALL' ? state.companies[0].id : selectedCompany();
  const branch = selectedBranch() === 'ALL' ? state.branches.find(b => b.companyId === company)?.id : selectedBranch();
  openModal('Create Vendor Bill', `
    <form id="billForm">
      <div class="form-grid">
        ${field('id', 'Bill No.', nextId('BILL'))}
        ${field('date', 'Bill Date', new Date().toISOString().slice(0,10), false, 'date')}
        ${selectObj('companyId', 'Company', state.companies, company)}
        ${selectObj('branchId', 'Branch', state.branches, branch)}
        ${selectObj('supplierId', 'Supplier', state.contacts.filter(c => c.type === 'Supplier'), '')}
        ${selectObj('warehouseId', 'Warehouse', state.warehouses, '')}
      </div>
      <div class="line-box"><h3>Bill Lines</h3><div id="lineRows"></div><button type="button" id="addLine" class="outline">Add Line</button><div class="totals"><span>Net: <b id="netTotal">$0.00</b></span><span>Tax: <b id="taxTotal">$0.00</b></span><span>Total: <b id="grandTotal">$0.00</b></span></div></div>
      <button class="primary full">Post Bill</button>
    </form>`);
  setupPurchaseLines();
  document.getElementById('billForm').onsubmit = e => { e.preventDefault(); saveVendorBill(e.target); };
}
function setupPurchaseLines() {
  setupProductLines();
  document.querySelectorAll('.line-row').forEach(r => {
    const sel = r.querySelector('[name=productId]');
    sel.onchange = ev => { const p = byId('products', ev.target.value); if (p) { r.querySelector('[name=price]').value = p.cost; const tax = byId('taxes', p.taxRate); r.querySelector('[name=tax]').value = tax ? tax.rate : 0; } calcLineTotals(); };
    if (state.products[0]) { sel.value = state.products[0].id; sel.onchange({target: sel}); }
  });
}
function saveVendorBill(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const lines = collectProductLines();
  const net = lines.reduce((a, l) => a + l.qty * l.price, 0);
  const tax = lines.reduce((a, l) => a + l.qty * l.price * l.tax / 100, 0);
  const total = net + tax;
  state.vendorBills.push({ ...data, lines, net, tax, total, status: 'Posted' });
  lines.forEach(l => state.inventoryMoves.push({ id: nextId('STK'), date: data.date, companyId: data.companyId, branchId: data.branchId, warehouseId: data.warehouseId, productId: l.productId, qty: l.qty, unitCost: l.price, type: 'Purchase', ref: data.id }));
  state.journalEntries.push({ id: nextId('JE'), date: data.date, companyId: data.companyId, branchId: data.branchId, ref: data.id, memo: 'Auto posting vendor bill', auto: true, lines: [
    { accountId: '1200', debit: net, credit: 0, partyId: '', memo: 'Inventory purchase' },
    { accountId: '1300', debit: tax, credit: 0, partyId: data.supplierId, memo: 'Input tax' },
    { accountId: '2000', debit: 0, credit: total, partyId: data.supplierId, memo: 'Supplier payable' }
  ].filter(l => l.debit || l.credit) });
  saveState('Posted vendor bill', 'Purchase', data.id); closeModal(); renderPage();
}

function renderInventory() {
  setTitle('Inventory', 'Stock movements and valuation.');
  const rows = filteredByScope(state.inventoryMoves);
  const summary = state.products.map(p => {
    const moves = rows.filter(m => m.productId === p.id);
    return [p.sku, p.name, num(moves.reduce((a, m) => a + Number(m.qty), 0)), money(moves.reduce((a, m) => a + Number(m.qty) * Number(m.unitCost), 0))];
  });
  document.getElementById('content').innerHTML = `
    <div class="grid cols-2">
      <div class="card"><div class="toolbar"><h3>Stock Summary</h3><button id="stockAdj" class="primary">Add Stock Adjustment</button></div>${table(['SKU','Product','Qty','Value'], summary)}</div>
      <div class="card"><h3>Stock Ledger</h3>${table(['Date','Type','Ref','Warehouse','Product','Qty','Unit Cost'], rows.map(m => [m.date, m.type, m.ref, warehouseName(m.warehouseId), productName(m.productId), num(m.qty), money(m.unitCost)]))}</div>
    </div>`;
  document.getElementById('stockAdj').onclick = openStockAdjustment;
}
function openStockAdjustment() {
  const company = selectedCompany() === 'ALL' ? state.companies[0].id : selectedCompany();
  const branch = selectedBranch() === 'ALL' ? state.branches.find(b => b.companyId === company)?.id : selectedBranch();
  openModal('Stock Adjustment', `<form id="stockForm"><div class="form-grid">
    ${field('date','Date',new Date().toISOString().slice(0,10),false,'date')}
    ${selectObj('companyId','Company',state.companies,company)}
    ${selectObj('branchId','Branch',state.branches,branch)}
    ${selectObj('warehouseId','Warehouse',state.warehouses,'')}
    ${selectObj('productId','Product',state.products,'')}
    ${field('qty','Quantity Adjustment',0,false,'number')}
    ${field('unitCost','Unit Cost',0,false,'number')}
    ${field('memo','Memo','',true)}
  </div><button class="primary full">Post Adjustment</button></form>`);
  document.getElementById('stockForm').onsubmit = e => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(e.target).entries()); d.qty = Number(d.qty); d.unitCost = Number(d.unitCost);
    const id = nextId('ADJ'); state.inventoryMoves.push({ id: nextId('STK'), ...d, type: 'Adjustment', ref: id });
    const val = d.qty * d.unitCost;
    state.journalEntries.push({ id: nextId('JE'), date: d.date, companyId: d.companyId, branchId: d.branchId, ref: id, memo: d.memo || 'Inventory adjustment', auto: true, lines: val >= 0 ? [
      { accountId: '1200', debit: val, credit: 0, partyId: '', memo: 'Inventory increase' },
      { accountId: '6999', debit: 0, credit: val, partyId: '', memo: 'Adjustment gain' }
    ] : [
      { accountId: '6999', debit: Math.abs(val), credit: 0, partyId: '', memo: 'Adjustment loss' },
      { accountId: '1200', debit: 0, credit: Math.abs(val), partyId: '', memo: 'Inventory decrease' }
    ]});
    saveState('Posted stock adjustment', 'Inventory', id); closeModal(); renderPage();
  };
}

function renderJournals() {
  setTitle('Journal Entries', 'Manual and automatic accounting entries.');
  const rows = filteredByScope(state.journalEntries);
  document.getElementById('content').innerHTML = `<div class="card"><div class="toolbar"><div></div><button id="newJournal" class="primary">Create Manual Journal</button></div>${table(['Date','JE No.','Ref','Company','Branch','Memo','Debit','Credit','Type'], rows.map(j => [j.date, j.id, j.ref, companyName(j.companyId), branchName(j.branchId), j.memo, money((j.lines||[]).reduce((a,l)=>a+Number(l.debit),0)), money((j.lines||[]).reduce((a,l)=>a+Number(l.credit),0)), j.auto ? badge('Auto','yellow') : badge('Manual','green')]))}</div>`;
  document.getElementById('newJournal').onclick = openJournalModal;
}
function openJournalModal() {
  const company = selectedCompany() === 'ALL' ? state.companies[0].id : selectedCompany();
  const branch = selectedBranch() === 'ALL' ? state.branches.find(b => b.companyId === company)?.id : selectedBranch();
  openModal('Manual Journal Entry', `<form id="journalForm"><div class="form-grid">
    ${field('id','Journal No.',nextId('JE'))}${field('date','Date',new Date().toISOString().slice(0,10),false,'date')}
    ${selectObj('companyId','Company',state.companies,company)}${selectObj('branchId','Branch',state.branches,branch)}
    ${field('ref','Reference','')}${field('memo','Memo','')}
  </div><div class="line-box"><h3>Journal Lines</h3><div id="journalRows"></div><button type="button" id="addJLine" class="outline">Add Line</button><div class="totals"><span>Debit: <b id="debitTotal">$0.00</b></span><span>Credit: <b id="creditTotal">$0.00</b></span></div></div><button class="primary full">Post Journal</button></form>`);
  setupJournalLines();
  document.getElementById('journalForm').onsubmit = e => { e.preventDefault(); saveJournal(e.target); };
}
function setupJournalLines() {
  const host = document.getElementById('journalRows');
  function add() {
    const div = document.createElement('div'); div.className = 'line-row journal';
    div.innerHTML = `${selectObj('accountId','Account',state.accounts,'')}${field('debit','Debit',0,false,'number')}${field('credit','Credit',0,false,'number')}${field('memo','Memo','')}<button type="button" class="danger remove">Remove</button>`;
    host.appendChild(div); div.querySelectorAll('input,select').forEach(x => x.oninput = calcJournalTotals); div.querySelector('.remove').onclick = () => { div.remove(); calcJournalTotals(); };
  }
  document.getElementById('addJLine').onclick = add; add(); add();
}
function collectJournalLines() {
  return [...document.querySelectorAll('.line-row.journal')].map(r => ({ accountId: r.querySelector('[name=accountId]').value, debit: Number(r.querySelector('[name=debit]').value || 0), credit: Number(r.querySelector('[name=credit]').value || 0), partyId: '', memo: r.querySelector('[name=memo]').value })).filter(l => l.accountId && (l.debit || l.credit));
}
function calcJournalTotals() {
  const lines = collectJournalLines();
  document.getElementById('debitTotal').textContent = money(lines.reduce((a,l)=>a+l.debit,0));
  document.getElementById('creditTotal').textContent = money(lines.reduce((a,l)=>a+l.credit,0));
}
function saveJournal(form) {
  const d = Object.fromEntries(new FormData(form).entries()); const lines = collectJournalLines();
  const debit = lines.reduce((a,l)=>a+l.debit,0); const credit = lines.reduce((a,l)=>a+l.credit,0);
  if (Math.abs(debit - credit) > 0.001) { alert('Journal is not balanced. Debit must equal Credit.'); return; }
  state.journalEntries.push({ ...d, lines, auto: false }); saveState('Posted manual journal', 'Accounting', d.id); closeModal(); renderPage();
}

function renderReports() {
  setTitle('Reports', 'Trial Balance, ledgers, AR/AP and inventory valuation.');
  const journals = filteredByScope(state.journalEntries);
  const tb = state.accounts.map(a => {
    const bal = balanceForAccount(a.id, journals);
    return [a.code, a.name, a.type, money(Math.max(bal, 0)), money(Math.max(-bal, 0)), money(bal)];
  }).filter(r => r[3] !== '$0.00' || r[4] !== '$0.00');
  const arRows = state.contacts.filter(c => c.type === 'Customer').map(c => [c.name, money(balanceByParty('1100', c.id, journals))]).filter(r => r[1] !== '$0.00');
  const apRows = state.contacts.filter(c => c.type === 'Supplier').map(c => [c.name, money(-balanceByParty('2000', c.id, journals))]).filter(r => r[1] !== '$0.00');
  const inv = state.products.map(p => {
    const ms = filteredByScope(state.inventoryMoves).filter(m => m.productId === p.id);
    return [p.sku, p.name, num(ms.reduce((a,m)=>a+Number(m.qty),0)), money(ms.reduce((a,m)=>a+Number(m.qty)*Number(m.unitCost),0))];
  });
  document.getElementById('content').innerHTML = `<div class="grid cols-2">
    <div class="card"><h3>Trial Balance</h3>${table(['Code','Account','Type','Debit','Credit','Net Balance'], tb)}</div>
    <div class="card"><h3>Inventory Valuation</h3>${table(['SKU','Product','Closing Qty','Closing Value'], inv)}</div>
    <div class="card"><h3>Receivable Outstanding</h3>${table(['Customer','Outstanding'], arRows)}</div>
    <div class="card"><h3>Payable Outstanding</h3>${table(['Supplier','Outstanding'], apRows)}</div>
  </div>`;
}
function balanceByParty(accountId, partyId, journals) {
  return journals.flatMap(j => j.lines || []).filter(l => l.accountId === accountId && l.partyId === partyId).reduce((a,l)=>a+Number(l.debit||0)-Number(l.credit||0),0);
}
function renderAudit() {
  setTitle('Audit Log', 'User activity and posting history.');
  document.getElementById('content').innerHTML = `<div class="card">${table(['Date/Time','User','Module','Action','Reference'], state.audit.map(x => [new Date(x.date).toLocaleString(), x.user, x.module, x.action, x.ref]))}</div>`;
}
function renderSetup() {
  setTitle('Setup / Backup', 'Export, restore and deployment information.');
  document.getElementById('content').innerHTML = `<div class="grid cols-2">
    <div class="card"><h3>Backup</h3><p>Export a JSON backup regularly. This file contains your local browser data.</p><button class="primary" onclick="exportBackup()">Export Backup</button></div>
    <div class="card"><h3>GitHub Pages Hosting</h3><p>Upload these files to a GitHub repository and enable Pages from the main branch root folder. The app will run from your github.io link.</p><p class="muted">For central multi-user storage, replace browser storage with an API and database.</p></div>
    <div class="card"><h3>Storage Mode</h3><p><b>Current:</b> Browser localStorage.</p><p>Works without server or database setup, but data stays on the same browser/device unless exported and imported.</p></div>
    <div class="card"><h3>Default Login</h3><p>Username: <b>admin</b><br>Password: <b>admin123</b></p><p class="muted">This is not production security.</p></div>
  </div>`;
}

function filteredByCompanyOnly(rows) {
  const c = selectedCompany();
  return rows.filter(r => c === 'ALL' || r.companyId === c || !r.companyId);
}
function simpleTable(headers, rows) { return table(headers, rows); }
function table(headers, rows) {
  return `<div class="table-wrap"><table><thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map(r => `<tr>${r.map(c => `<td>${typeof c === 'string' && c.startsWith('<') ? c : esc(c)}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${headers.length}" class="muted">No records found.</td></tr>`}</tbody></table></div>`;
}
function badge(text, color) { return `<span class="badge ${color || ''}">${esc(text)}</span>`; }
function field(name, label, value, wide, type) { return `<div class="${wide ? 'wide' : ''}"><label>${label}</label><input name="${name}" type="${type || 'text'}" value="${esc(value)}" /></div>`; }
function selectField(name, label, opts, value) { return `<div><label>${label}</label><select name="${name}">${opts.map(o => `<option ${o === value ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></div>`; }
function selectObj(name, label, rows, value) { return `<div><label>${label}</label><select name="${name}"><option value="">Select ${label}</option>${rows.map(o => `<option value="${esc(o.id)}" ${o.id === value ? 'selected' : ''}>${esc(o.name || o.code || o.id)}</option>`).join('')}</select></div>`; }
function formHtml(parts) { return `<div class="form-grid">${parts.join('')}</div>`; }
function openModal(title, body) {
  closeModal();
  const tpl = document.getElementById('modalTemplate').content.cloneNode(true);
  tpl.querySelector('h3').textContent = title;
  tpl.querySelector('.modal-body').innerHTML = body;
  document.body.appendChild(tpl);
  document.querySelector('.close-modal').onclick = closeModal;
}
function closeModal() { document.querySelectorAll('.modal-bg').forEach(x => x.remove()); }

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `nepa-erp-backup-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url);
}
function importBackup(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { try { state = JSON.parse(reader.result); saveState('Imported backup', 'System', file.name); renderFilters(); renderPage(); alert('Backup imported successfully.'); } catch (err) { alert('Invalid backup file.'); } };
  reader.readAsText(file); e.target.value = '';
}
function resetDemo() {
  if (!confirm('This will erase current browser data and recreate demo data. Continue?')) return;
  state = seedData(); saveState('Reset demo data', 'System', 'RESET'); renderFilters(); renderPage();
}

window.exportBackup = exportBackup;
document.addEventListener('DOMContentLoaded', init);

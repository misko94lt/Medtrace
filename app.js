/* MedTrace v3.0-IT (c) 2025-2026 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
return new (P || (P = Promise))(function (resolve, reject) {
function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
step((generator = generator.apply(thisArg, _arguments || [])).next());
});
};
var __rest = (this && this.__rest) || function (s, e) {
var t = {};
for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
t[p] = s[p];
if (s != null && typeof Object.getOwnPropertySymbols === "function")
for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
t[p[i]] = s[p[i]];
}
return t;
};
const SUPA_URL = 'https://mrljyxrafaoirnbkzcwd.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ybGp5eHJhZmFvaXJuYmt6Y3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNTU1NTUsImV4cCI6MjA5NDkzMTU1NX0.MaUWjcNjNp-fFjs47d9oqSHj8asToU_JTyDNQ0RwuAg';
let _supa = null;
function getSupa() {
if (!_supa && window.supabase) {
_supa = window.supabase.createClient(SUPA_URL, SUPA_KEY, {
auth: { autoRefreshToken: true, persistSession: true },
});
}
return _supa;
}
const supaSignUp = (email, pw) => { var _a; return (_a = getSupa()) === null || _a === void 0 ? void 0 : _a.auth.signUp({ email, password: pw }); };
const supaSignIn = (email, pw) => { var _a; return (_a = getSupa()) === null || _a === void 0 ? void 0 : _a.auth.signInWithPassword({ email, password: pw }); };
const supaSignOut = () => { var _a; return (_a = getSupa()) === null || _a === void 0 ? void 0 : _a.auth.signOut(); };
const supaGetUser = () => { var _a; return (_a = getSupa()) === null || _a === void 0 ? void 0 : _a.auth.getUser(); };
const supaOnAuth = (cb) => { var _a; return (_a = getSupa()) === null || _a === void 0 ? void 0 : _a.auth.onAuthStateChange(cb); };
const supaDB = {
getAll(table) {
return __awaiter(this, void 0, void 0, function* () {
const { data, error } = yield getSupa().from(table).select('*').order('created_at', { ascending: false });
if (error)
throw error;
return data || [];
});
},
insert(table, record) {
return __awaiter(this, void 0, void 0, function* () {
const { data, error } = yield getSupa().from(table).insert(record).select().single();
if (error)
throw error;
return data;
});
},
update(table, id, updates) {
return __awaiter(this, void 0, void 0, function* () {
const { data, error } = yield getSupa().from(table).update(updates).eq('id', id).select().single();
if (error)
throw error;
return data;
});
},
delete(table, id) {
return __awaiter(this, void 0, void 0, function* () {
const { error } = yield getSupa().from(table).delete().eq('id', id);
if (error)
throw error;
});
},
};
const STATUS_COLOR = { "operativo": "#22c55e", "in manutenzione": "#f59e0b", "fuori servizio": "#ef4444", "aperto": "#2DD4BF", "in corso": "#f59e0b", "chiuso": "#22c55e", "in attesa": "#94a3b8", "confermato": "#2DD4BF", "spedito": "#a855f7", "ricevuto": "#22c55e", "annullato": "#ef4444", "emessa": "#2DD4BF", "pagata": "#22c55e", "scaduta": "#ef4444", "bozza": "#94a3b8" };
const PRI_COLOR = { "urgente": "#ef4444", "alta": "#f97316", "normale": "#6366f1", "bassa": "#94a3b8" };
const TIMELINE_ICON = { "diagnosi": "", "intervento": "", "ordine_parti": "", "attesa_parti": "·", "test": "✓", "sopralluogo": "·", "contatto": "", "nota": "·" };
const TIMELINE_LABEL = { "diagnosi": "Diagnosi", "intervento": "Intervento", "ordine_parti": "Ordine parti", "attesa_parti": "Attesa parti", "test": "Test/Verifica", "sopralluogo": "Sopralluogo", "contatto": "Contatto cliente", "nota": "Nota generica" };
const STORAGE_KEY = "medtrace-v1";
const IVA_DEFAULT = 22;
function loadData() { try {
const r = localStorage.getItem(STORAGE_KEY);
return r ? JSON.parse(r) : null;
}
catch (_a) {
return null;
} }
function saveData(d) {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
return true;
}
catch (e) {
if (e.name === "QuotaExceededError") {
alert("⚠ Memoria piena! Esporta un backup e cancella alcune foto pesanti.");
}
return false;
}
}
function useMedia(q) {
const [m, setM] = React.useState(() => window.matchMedia(q).matches);
React.useEffect(() => {
const mq = window.matchMedia(q);
const h = e => setM(e.matches);
mq.addEventListener("change", h);
return () => mq.removeEventListener("change", h);
}, [q]);
return m;
}
function compressImage(file, maxWidth = 1024, quality = 0.7) {
return new Promise((resolve, reject) => {
const reader = new FileReader();
reader.onload = e => {
const img = new Image();
img.onload = () => {
const canvas = document.createElement("canvas");
let w = img.width, h = img.height;
if (w > maxWidth) {
h = h * (maxWidth / w);
w = maxWidth;
}
canvas.width = w;
canvas.height = h;
const ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0, w, h);
resolve(canvas.toDataURL("image/jpeg", quality));
};
img.onerror = reject;
img.src = e.target.result;
};
reader.onerror = reject;
reader.readAsDataURL(file);
});
}
function buildCSV(rows, cols) {
var keys = cols.map(function (c) { return typeof c === "string" ? c : c.key; });
var hdrs = cols.map(function (c) { return typeof c === "string" ? c : (c.label || c.key); });
function esc(v) {
var s = (v === null || v === undefined) ? "" : v;
if (Array.isArray(s))
s = s.join(", ");
if (typeof s === "object")
s = JSON.stringify(s);
s = String(s).split('"').join('""');
return '"' + s + '"';
}
var lines = [hdrs.map(esc).join(";")].concat(rows.map(function (r) {
return keys.map(function (k) { return esc(r[k]); }).join(";");
}));
return lines.join("\r\n");
}
function downloadCSV(filename, rows, cols) {
window._csvPending = { filename: filename, data: buildCSV(rows, cols) };
window.dispatchEvent(new CustomEvent("show-csv", { detail: { filename: filename, data: buildCSV(rows, cols) } }));
}
function downloadJSON(filename, data) {
var jsonData = JSON.stringify(data, null, 2);
window.dispatchEvent(new CustomEvent("show-csv", {
detail: { filename: filename, data: jsonData, isJson: true }
}));
}
function openPrintWindow(htmlContent) {
window.dispatchEvent(new CustomEvent('show-pdf', { detail: htmlContent }));
}
const PDF_STYLE = `
@page { size: A4; margin: 15mm 15mm 15mm 15mm; }
@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #1a202c; background: #fff; }
.header { background: #2DD4BF; color: #fff; padding: 16px 20px; display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.header h1 { font-size: 18px; font-weight: 900; letter-spacing: -0.5px; margin-top:4px; }
.header-logo { height: 36px; object-fit: contain; filter: brightness(0) invert(1); margin-bottom: 4px; display: block; }
.header .sub { font-size: 10px; opacity: .8; margin-top: 3px; }
.header .right { text-align: right; }
.header .docnum { font-size: 18px; font-weight: 800; }
.section { margin-bottom: 16px; }
.section-title { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 6px; }
.kv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 20px; }
.kv { display: flex; gap: 6px; padding: 3px 0; border-bottom: 1px solid #f1f5f9; }
.kv-label { color: #94a3b8; min-width: 110px; font-size: 10px; }
.kv-value { font-weight: 600; font-size: 11px; }
table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 11px; }
th { background: #f8fafc; color: #64748b; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; padding: 6px 8px; text-align: left; border-bottom: 2px solid #e2e8f0; }
td { padding: 6px 8px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
tr:last-child td { border-bottom: none; }
.total-box { background: #0D9488; color: #fff; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; border-radius: 4px; margin-top: 8px; }
.total-box .label { font-size: 11px; font-weight: 700; }
.total-box .amount { font-size: 18px; font-weight: 900; }
.badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .3px; }
.pass { color: #0D9488; background: #CCFBF1; }
.fail { color: #dc2626; background: #fee2e2; }
.nd { color: #6b7280; background: #f3f4f6; }
.footer { margin-top: 24px; padding-top: 10px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8; }
.desc-box { background: #f8fafc; border-left: 3px solid #2563eb; padding: 8px 12px; margin: 8px 0; font-size: 11px; line-height: 1.5; color: #374151; }
.vis-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px solid #f1f5f9; font-size: 11px; }
`;
function generateJobPDF(job, assets, parts, customers, company) {
const asset = assets.find(a => a.id === job.assetId) || {};
const customer = customers.find(c => c.id === (job.customerId || asset.customerId)) || {};
const partsTotal = job.parts.reduce((s, p) => {
const pt = parts.find(x => x.id === p.partId);
return s + (pt ? (pt.sellPrice || pt.unitPrice) * p.qty : 0);
}, 0);
const laborTotal = job.laborHours * job.laborRate;
const total = partsTotal + laborTotal;
const PRI = { urgente: '#dc2626', alta: '#ea580c', normale: '#7c3aed', bassa: '#6b7280' };
const STA = { aperto: '#2563eb', 'in corso': '#d97706', chiuso: '#059669', 'fuori servizio': '#dc2626' };
const partsRows = job.parts.map(p => {
const pt = parts.find(x => x.id === p.partId) || {};
const price = pt.sellPrice || pt.unitPrice || 0;
return `<tr>
<td style="font-family:monospace;font-size:10px">${pt.code || p.partId}</td>
<td>${pt.name || '—'}</td>
<td style="text-align:right">${p.qty}</td>
<td style="text-align:right">€${price.toFixed(2)}</td>
<td style="text-align:right;font-weight:700">€${(price * p.qty).toFixed(2)}</td>
</tr>`;
}).join('');
const tlRows = (job.timeline || []).map(t => `
<tr>
<td>${t.date}</td>
<td>${t.type}</td>
<td>${t.note || '—'}</td>
<td style="text-align:right">${t.hours ? t.hours + 'h' : '—'}</td>
</tr>`).join('');
const html = `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8">
<title>Rapporto ${job.id}</title>
<style>${PDF_STYLE}</style></head><body>
<div class="header">
<div><img src=\"data:image/svg+xml,%3Csvg viewBox='0 0 180 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M8 20 Q12 12 16 20 Q20 28 24 20'/%3E%3Cpath d='M4 20 Q10 8 16 20 Q22 32 28 20'/%3E%3Cpath d='M0 20 Q8 4 16 20 Q24 36 32 20'/%3E%3Ccircle cx='38' cy='20' r='4' fill='%23ffffff'/%3E%3C/g%3E%3Ctext x='50' y='27' font-family='Arial' font-size='18' font-weight='800' fill='white'%3EMedTrace%3C/text%3E%3Ctext x='50' y='37' font-family='Arial' font-size='7' font-weight='600' fill='rgba(255,255,255,0.7)'%3EMEDICAL%3C/text%3E%3C/svg%3E\" class=\"header-logo\" alt=\"MedTrace\"/><h1>${company.name || 'MedTrace'}</h1><div class="sub">${company.subtitle || ''}</div></div>
<div class="right">
<div style="font-size:9px;opacity:.7;margin-bottom:4px">RAPPORTO DI INTERVENTO</div>
<div class="docnum">${job.id}</div>
<div style="font-size:10px;margin-top:4px">
<span class="badge" style="background:${PRI[job.priority] || '#6b7280'}22;color:${PRI[job.priority] || '#6b7280'};border:1px solid ${PRI[job.priority] || '#6b7280'}44">${job.priority.toUpperCase()}</span>
&nbsp;<span class="badge" style="background:${STA[job.status] || '#6b7280'}22;color:${STA[job.status] || '#6b7280'};border:1px solid ${STA[job.status] || '#6b7280'}44">${job.status.toUpperCase()}</span>
</div>
</div>
</div>
${customer.name ? `<div class="section">
<div class="section-title">Cliente</div>
<div class="kv-grid">
<div class="kv"><span class="kv-label">Ragione sociale</span><span class="kv-value">${customer.name}</span></div>
${customer.vat ? `<div class="kv"><span class="kv-label">P.IVA</span><span class="kv-value">${customer.vat}</span></div>` : ''}
${customer.address ? `<div class="kv"><span class="kv-label">Indirizzo</span><span class="kv-value">${customer.address}</span></div>` : ''}
</div>
</div>` : ''}
<div class="section">
<div class="section-title">Apparecchio</div>
<div class="kv-grid">
<div class="kv"><span class="kv-label">Nome</span><span class="kv-value">${asset.name || job.assetId}</span></div>
<div class="kv"><span class="kv-label">Marca / Modello</span><span class="kv-value">${asset.brand || ''} ${asset.model || ''}</span></div>
<div class="kv"><span class="kv-label">N° Serie</span><span class="kv-value" style="font-family:monospace">${asset.serial || '—'}</span></div>
<div class="kv"><span class="kv-label">Ubicazione</span><span class="kv-value">${asset.location || '—'}</span></div>
</div>
</div>
<div class="section">
<div class="section-title">Dettagli Intervento</div>
<div class="kv-grid">
<div class="kv"><span class="kv-label">Tipo</span><span class="kv-value" style="text-transform:capitalize">${job.type}</span></div>
<div class="kv"><span class="kv-label">Tecnico</span><span class="kv-value">${job.assignee || '—'}</span></div>
<div class="kv"><span class="kv-label">Data apertura</span><span class="kv-value">${job.openDate}</span></div>
<div class="kv"><span class="kv-label">Data chiusura</span><span class="kv-value">${job.closeDate || '—'}</span></div>
</div>
${job.description ? `<div class="desc-box" style="margin-top:8px">${job.description}</div>` : ''}
${job.notes ? `<div style="margin-top:6px;font-size:10px;color:#64748b"><strong>Note:</strong> ${job.notes}</div>` : ''}
</div>
<div class="section">
<div class="section-title">Parti Utilizzate</div>
<table>
<thead><tr><th>Codice</th><th>Parte</th><th style="text-align:right">Qtà</th><th style="text-align:right">P. Unit.</th><th style="text-align:right">Totale</th></tr></thead>
<tbody>${partsRows || '<tr><td colspan="5" style="text-align:center;color:#94a3b8">Nessuna parte utilizzata</td></tr>'}</tbody>
</table>
</div>
${tlRows ? `<div class="section">
<div class="section-title">Cronologia Intervento</div>
<table>
<thead><tr><th>Data</th><th>Tipo</th><th>Descrizione</th><th style="text-align:right">Ore</th></tr></thead>
<tbody>${tlRows}</tbody>
</table>
</div>` : ''}
<div style="display:flex;justify-content:flex-end;flex-direction:column;align-items:flex-end;gap:4px;margin-top:4px">
<div style="display:flex;justify-content:space-between;width:260px;padding:4px 0;border-bottom:1px solid #e2e8f0"><span style="color:#64748b">Parti</span><span style="font-weight:700">€${partsTotal.toFixed(2)}</span></div>
<div style="display:flex;justify-content:space-between;width:260px;padding:4px 0;border-bottom:1px solid #e2e8f0"><span style="color:#64748b">Manodopera (${job.laborHours}h × €${job.laborRate}/h)</span><span style="font-weight:700">€${laborTotal.toFixed(2)}</span></div>
<div class="total-box" style="width:260px"><span class="label">TOTALE INTERVENTO</span><span class="amount">€${total.toFixed(2)}</span></div>
</div>
<div style="margin-top:32px;display:flex">
<div style="width:200px;border-top:1px solid #94a3b8;padding-top:6px;text-align:center;font-size:10px;color:#64748b">Firma Tecnico Verificatore<br><br>${job.assignee || ''}</div>
</div>
<div class="footer">
<span>${company.name || 'MedTrace'} — Generato il ${new Date().toLocaleDateString('it-IT')}</span>
<span>${job.id} · ${asset.serial || ''}</span>
</div>
</body></html>`;
openPrintWindow(html);
}
function generateInvoicePDF(invoice, customer, jobs, assets, parts, company) {
const subtotal = invoice.items.reduce((s, it) => s + it.qty * it.unitPrice, 0);
const totalVAT = invoice.items.reduce((s, it) => s + it.qty * it.unitPrice * it.vat / 100, 0);
const grandTotal = subtotal + totalVAT;
const STA = { bozza: '#6b7280', emessa: '#2563eb', pagata: '#059669', scaduta: '#dc2626', annullato: '#dc2626' };
const itemRows = invoice.items.map(it => `<tr>
<td>${it.description}</td>
<td style="text-align:right">${it.qty}</td>
<td style="text-align:right">€${it.unitPrice.toFixed(2)}</td>
<td style="text-align:right">${it.vat}%</td>
<td style="text-align:right;font-weight:700">€${(it.qty * it.unitPrice).toFixed(2)}</td>
</tr>`).join('');
const html = `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8">
<title>Fattura ${invoice.number}</title>
<style>${PDF_STYLE}</style></head><body>
<div class="header">
<div>
<img src=\"data:image/svg+xml,%3Csvg viewBox='0 0 180 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M8 20 Q12 12 16 20 Q20 28 24 20'/%3E%3Cpath d='M4 20 Q10 8 16 20 Q22 32 28 20'/%3E%3Cpath d='M0 20 Q8 4 16 20 Q24 36 32 20'/%3E%3Ccircle cx='38' cy='20' r='4' fill='%23ffffff'/%3E%3C/g%3E%3Ctext x='50' y='27' font-family='Arial' font-size='18' font-weight='800' fill='white'%3EMedTrace%3C/text%3E%3Ctext x='50' y='37' font-family='Arial' font-size='7' font-weight='600' fill='rgba(255,255,255,0.7)'%3EMEDICAL%3C/text%3E%3C/svg%3E\" class=\"header-logo\" alt=\"MedTrace\"/><h1>${company.name || 'MedTrace'}</h1>
<div class="sub">${company.address || ''}</div>
${company.vat ? `<div class="sub">P.IVA: ${company.vat}</div>` : ''}
</div>
<div class="right">
<div style="font-size:9px;opacity:.7;margin-bottom:4px">FATTURA</div>
<div class="docnum">${invoice.number}</div>
<div style="font-size:10px;margin-top:4px">
<span class="badge" style="background:${STA[invoice.status] || '#6b7280'}22;color:${STA[invoice.status] || '#6b7280'};border:1px solid ${STA[invoice.status] || '#6b7280'}44">${invoice.status.toUpperCase()}</span>
</div>
<div style="font-size:10px;margin-top:4px;opacity:.8">Data: ${invoice.date}${invoice.dueDate ? ' · Scad: ' + invoice.dueDate : ''}</div>
</div>
</div>
<div class="section">
<div class="section-title">Cliente</div>
<div style="font-size:14px;font-weight:700;margin-bottom:4px">${(customer === null || customer === void 0 ? void 0 : customer.name) || '—'}</div>
${(customer === null || customer === void 0 ? void 0 : customer.address) ? `<div style="font-size:11px;color:#64748b">${customer.address}</div>` : ''}
${(customer === null || customer === void 0 ? void 0 : customer.vat) ? `<div style="font-size:11px;color:#64748b">P.IVA: ${customer.vat}</div>` : ''}
${(customer === null || customer === void 0 ? void 0 : customer.fiscalCode) ? `<div style="font-size:11px;color:#64748b">C.F.: ${customer.fiscalCode}</div>` : ''}
</div>
<div class="section">
<div class="section-title">Voci Fattura</div>
<table>
<thead><tr><th>Descrizione</th><th style="text-align:right">Q.tà</th><th style="text-align:right">Prezzo Unit.</th><th style="text-align:right">IVA</th><th style="text-align:right">Importo</th></tr></thead>
<tbody>${itemRows}</tbody>
</table>
</div>
<div style="display:flex;justify-content:flex-end;flex-direction:column;align-items:flex-end;gap:4px">
<div style="display:flex;justify-content:space-between;width:280px;padding:4px 0;border-bottom:1px solid #e2e8f0"><span style="color:#64748b">Imponibile</span><span style="font-weight:700">€${subtotal.toFixed(2)}</span></div>
<div style="display:flex;justify-content:space-between;width:280px;padding:4px 0;border-bottom:1px solid #e2e8f0"><span style="color:#64748b">IVA</span><span style="font-weight:700">€${totalVAT.toFixed(2)}</span></div>
<div class="total-box" style="width:280px"><span class="label">TOTALE FATTURA</span><span class="amount">€${grandTotal.toFixed(2)}</span></div>
</div>
${invoice.paymentTerms ? `<div style="margin-top:16px;padding:10px;background:#f8fafc;border-radius:4px;font-size:10px"><strong>Modalità di pagamento:</strong> ${invoice.paymentTerms}${company.iban ? '<br><strong>IBAN:</strong> ' + company.iban : ''}</div>` : ''}
${invoice.notes ? `<div style="margin-top:8px;font-size:10px;color:#64748b"><strong>Note:</strong> ${invoice.notes}</div>` : ''}
<div class="footer">
<span>${company.name || 'MedTrace'} — Generato il ${new Date().toLocaleDateString('it-IT')}</span>
<span>${invoice.number}</span>
</div>
</body></html>`;
openPrintWindow(html);
}
function generateIECPDF(rep, asset, customer, company) {
const normL = rep.norm === '61010' ? 'IEC 61010-1 — Strumentazione Lab.' : 'IEC 62353 — Elettromedicale';
const ptLabel = rep.norm !== '61010' ? (' · Tipo ' + (rep.patientType || 'BF')) : '';
const vi = rep.visual || {};
const visItems = [
['Involucro integro', vi.housing],
['Cavo di rete e spina integri', vi.cable],
['Connettori in buono stato', vi.connectors],
['Etichette e marcatura CE leggibili', vi.labels],
['Documentazione tecnica presente', vi.docs],
];
const visRows = visItems.map(([label, val]) => `
<div class="vis-row">
<span>${label}</span>
<span class="badge ${val === true ? 'pass' : val === false ? 'fail' : 'nd'}">${val === true ? '✓ OK' : val === false ? '✗ NO' : 'N/D'}</span>
</div>`).join('');
const measRows = (rep.measures || []).map(m => {
const v = parseFloat(m.value);
const lv = parseFloat(m.limitVal);
const measured = m.value !== '' && m.value !== undefined && !isNaN(v);
const pass = measured ? (m.invertPass ? v >= lv : v <= lv) : null;
return `<tr>
<td>${m.name}</td>
<td style="text-align:center;font-family:monospace">${m.limit}</td>
<td style="text-align:center;font-family:monospace;font-weight:700">${measured ? m.value : '—'}</td>
<td style="text-align:center">${m.unit}</td>
<td style="text-align:center"><span class="badge ${pass === null ? 'nd' : pass ? 'pass' : 'fail'}">${pass === null ? 'N/D' : pass ? '✓ PASS' : '✗ FAIL'}</span></td>
</tr>`;
}).join('');
const esitoColor = rep.overallPass ? '#059669' : '#dc2626';
const esitoLabel = rep.overallPass ? 'CONFORME' : 'NON CONFORME';
const html = `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8">
<title>Verifica ${rep.reportNumber || rep.id}</title>
<style>${PDF_STYLE}</style></head><body>
<div class="header">
<div>
<img src=\"data:image/svg+xml,%3Csvg viewBox='0 0 180 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M8 20 Q12 12 16 20 Q20 28 24 20'/%3E%3Cpath d='M4 20 Q10 8 16 20 Q22 32 28 20'/%3E%3Cpath d='M0 20 Q8 4 16 20 Q24 36 32 20'/%3E%3Ccircle cx='38' cy='20' r='4' fill='%23ffffff'/%3E%3C/g%3E%3Ctext x='50' y='27' font-family='Arial' font-size='18' font-weight='800' fill='white'%3EMedTrace%3C/text%3E%3Ctext x='50' y='37' font-family='Arial' font-size='7' font-weight='600' fill='rgba(255,255,255,0.7)'%3EMEDICAL%3C/text%3E%3C/svg%3E\" class=\"header-logo\" alt=\"MedTrace\"/><h1>${company.name || 'MedTrace'}</h1>
<div class="sub">Rapporto di Verifica Sicurezza Elettrica</div>
<div class="sub">${normL}${ptLabel}</div>
</div>
<div class="right">
<div style="font-size:9px;opacity:.7;margin-bottom:4px">N° RAPPORTO</div>
<div class="docnum">${rep.reportNumber || rep.id}</div>
<div style="margin-top:6px;background:${esitoColor};color:#fff;padding:4px 12px;border-radius:4px;font-size:11px;font-weight:800">${esitoLabel}</div>
<div style="font-size:10px;margin-top:4px;opacity:.8">Data: ${rep.date || '—'}</div>
</div>
</div>
<div class="section">
<div class="section-title">Apparecchio</div>
<div class="kv-grid">
<div class="kv"><span class="kv-label">Nome</span><span class="kv-value">${(asset === null || asset === void 0 ? void 0 : asset.name) || '—'}</span></div>
<div class="kv"><span class="kv-label">Marca / Modello</span><span class="kv-value">${(asset === null || asset === void 0 ? void 0 : asset.brand) || ''} ${(asset === null || asset === void 0 ? void 0 : asset.model) || ''}</span></div>
<div class="kv"><span class="kv-label">N° Serie</span><span class="kv-value" style="font-family:monospace">${(asset === null || asset === void 0 ? void 0 : asset.serial) || '—'}</span></div>
<div class="kv"><span class="kv-label">Ubicazione</span><span class="kv-value">${(asset === null || asset === void 0 ? void 0 : asset.location) || '—'}</span></div>
${(customer === null || customer === void 0 ? void 0 : customer.name) ? `<div class="kv"><span class="kv-label">Cliente</span><span class="kv-value">${customer.name}</span></div>` : ''}
</div>
</div>
<div class="section">
<div class="section-title">Dati Verifica</div>
<div class="kv-grid">
<div class="kv"><span class="kv-label">Tecnico verificatore</span><span class="kv-value">${rep.technician || '—'}</span></div>
<div class="kv"><span class="kv-label">Strumento di misura</span><span class="kv-value">${rep.instrument || '—'}</span></div>
<div class="kv"><span class="kv-label">N° calibrazione</span><span class="kv-value" style="font-family:monospace">${rep.calNumber || '—'}</span></div>
<div class="kv"><span class="kv-label">Tipo verifica</span><span class="kv-value" style="text-transform:capitalize">${rep.verifyType || '—'}</span></div>
<div class="kv"><span class="kv-label">Classe apparecchio</span><span class="kv-value">Classe ${rep.equipClass || '—'}</span></div>
${rep.norm !== '61010' ? `<div class="kv"><span class="kv-label">Tipo parte paziente</span><span class="kv-value">Tipo ${rep.patientType || 'BF'}</span></div>` : ''}
</div>
</div>
<div class="section">
<div class="section-title">Ispezione Visiva</div>
${visRows}
</div>
<div class="section">
<div class="section-title">Misure Elettriche</div>
<table>
<thead><tr><th>Parametro</th><th style="text-align:center">Limite (norma)</th><th style="text-align:center">Valore misurato</th><th style="text-align:center">Unità</th><th style="text-align:center">Esito</th></tr></thead>
<tbody>${measRows || '<tr><td colspan="5" style="text-align:center;color:#94a3b8">Nessuna misura inserita</td></tr>'}</tbody>
</table>
</div>
<div class="total-box" style="margin-top:12px">
<span class="label">ESITO FINALE VERIFICA</span>
<span class="amount">${esitoLabel}</span>
</div>
${rep.notes ? `<div style="margin-top:12px;padding:8px 12px;background:#f8fafc;border-left:3px solid #64748b;font-size:11px"><strong>Note:</strong> ${rep.notes}</div>` : ''}
<div style="margin-top:32px;display:flex">
<div style="width:200px;border-top:1px solid #94a3b8;padding-top:6px;text-align:center;font-size:10px;color:#64748b">Firma Tecnico Verificatore<br><br>${rep.technician || ''}</div>
</div>
<div class="footer">
<span>${company.name || 'MedTrace'} — Generato il ${new Date().toLocaleDateString('it-IT')} — ${normL}</span>
<span>${rep.reportNumber || rep.id} · ${(asset === null || asset === void 0 ? void 0 : asset.serial) || ''}</span>
</div>
</body></html>`;
openPrintWindow(html);
}
function generateFuncPDF(rep, asset, customer, company) {
const tpl = (typeof FUNC_TEMPLATES !== "undefined" ? FUNC_TEMPLATES : {})[rep.templateId] || { label: "Verifica Funzionale", icon: "›", norm: "IEC 60601-1", sections: [] };
const esitoColor = rep.overallPass ? "#0D9488" : "#dc2626";
const esitoLabel = rep.overallPass ? "CONFORME" : "NON CONFORME";
const sectionsHtml = (tpl.sections || []).map(sec => {
const sd = (rep.sections || {})[sec.id] || { items: {}, measures: {} };
const itemsHtml = (sec.items || []).map(item => {
const val = sd.items[item.id];
const icon = val === true ? "✓" : val === false ? "✗" : "—";
const color = val === true ? "#0D9488" : val === false ? "#dc2626" : "#9ca3af";
return `<div class="check-row">
<span class="check-text">${item.text}</span>
<span class="check-result" style="color:${color};background:${color}18;border-color:${color}44">${icon}</span>
</div>`;
}).join("");
const measHtml = (sec.measures || []).map(m => {
const val = sd.measures[m.id] || "";
const vNum = parseFloat(val);
let pass = null;
if (!isNaN(vNum) && val !== "") {
pass = true;
if (m.limitMin !== undefined && vNum < m.limitMin)
pass = false;
if (m.limitVal !== undefined) {
if (m.invertPass) {
if (vNum < m.limitVal)
pass = false;
}
else {
if (vNum > m.limitVal)
pass = false;
}
}
}
const pc = pass === null ? "#9ca3af" : pass ? "#0D9488" : "#dc2626";
return `<tr>
<td>${m.name}</td>
<td style="text-align:center;font-family:monospace;font-size:10px;color:#6b7280">${m.expected || ""}</td>
<td style="text-align:center;font-family:monospace;font-weight:700">${val || "—"}</td>
<td style="text-align:center;color:#6b7280">${m.unit}</td>
<td style="text-align:center"><span style="background:${pc}18;color:${pc};border:1px solid ${pc}44;border-radius:4px;padding:2px 8px;font-size:9px;font-weight:700">${pass === null ? "N/D" : pass ? "✓ PASS" : "✗ FAIL"}</span></td>
</tr>`;
}).join("");
const allItems = (sec.items || []);
const anyFail = allItems.some(it => sd.items[it.id] === false);
const allOk = allItems.length > 0 && allItems.every(it => sd.items[it.id] === true);
const secColor = anyFail ? "#dc2626" : allOk ? "#0D9488" : "#6b7280";
return `<div class="section">
<div class="section-header" style="border-left:3px solid ${secColor}">
<span class="section-title">${sec.title}</span>
</div>
${sec.note ? `<div class="section-note">${sec.note}</div>` : ""}
${itemsHtml}
${measHtml ? `<table style="margin-top:${(sec.items || []).length > 0 ? 8 : 0}px">
<thead><tr><th>Misura</th><th style="text-align:center">Atteso</th><th style="text-align:center">Valore</th><th style="text-align:center">U.M.</th><th style="text-align:center">Esito</th></tr></thead>
<tbody>${measHtml}</tbody>
</table>` : ""}
</div>`;
}).join("");
const html = `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8">
<title>Verifica Funzionale ${rep.reportNumber || rep.id}</title>
<style>
@page { size: A4; margin: 14mm 14mm 14mm 14mm; }
@media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
body { font-family:'Segoe UI',Arial,sans-serif; font-size:11px; color:#1a202c; background:#fff; }
.header { background:#2DD4BF; color:#fff; padding:14px 18px; display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
.header h1 { font-size:18px; font-weight:900; letter-spacing:-.3px; }
.header .sub { font-size:9px; opacity:.8; margin-top:2px; }
.header .right { text-align:right; }
.header .docnum { font-size:16px; font-weight:800; }
.esito-badge { margin-top:6px; padding:4px 12px; border-radius:4px; font-size:10px; font-weight:800; display:inline-block; background:${esitoColor}; color:#fff; }
.kv-grid { display:grid; grid-template-columns:1fr 1fr; gap:3px 20px; margin-bottom:12px; }
.kv { display:flex; gap:6px; padding:3px 0; border-bottom:1px solid #f1f5f9; }
.kv-label { color:#94a3b8; min-width:100px; font-size:9px; text-transform:uppercase; letter-spacing:.5px; }
.kv-value { font-weight:600; font-size:11px; }
.section { margin-bottom:12px; break-inside:avoid; }
.section-header { background:#f8fafc; padding:6px 10px; margin-bottom:4px; border-radius:0 4px 4px 0; }
.section-title { font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:.8px; color:#374151; }
.section-note { font-size:9px; color:#6b7280; font-style:italic; margin:0 0 6px 2px; padding:4px 8px; background:#fffbeb; border-left:2px solid #f59e0b; }
.check-row { display:flex; justify-content:space-between; align-items:center; padding:4px 2px; border-bottom:1px solid #f9fafb; gap:8px; }
.check-text { font-size:10px; color:#374151; flex:1; }
.check-result { font-size:10px; font-weight:800; padding:2px 8px; border-radius:4px; border:1px solid; white-space:nowrap; }
table { width:100%; border-collapse:collapse; font-size:10px; }
th { background:#f1f5f9; color:#64748b; font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; padding:5px 7px; border-bottom:1px solid #e2e8f0; text-align:left; }
td { padding:5px 7px; border-bottom:1px solid #f1f5f9; }
.total-box { background:#0F766E; color:#fff; padding:9px 14px; display:flex; justify-content:space-between; align-items:center; border-radius:4px; margin-top:10px; }
.total-box .label { font-size:10px; font-weight:700; }
.total-box .amount { font-size:14px; font-weight:900; }
.footer { margin-top:16px; padding-top:8px; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between; font-size:8px; color:#94a3b8; }
.sig-row { display:flex; gap:32px; margin-top:24px; }
.sig-box { flex:1; border-top:1px solid #94a3b8; padding-top:5px; text-align:center; font-size:9px; color:#64748b; }
</style></head><body>
<div class="header">
<div>
<img src=\"data:image/svg+xml,%3Csvg viewBox='0 0 180 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M8 20 Q12 12 16 20 Q20 28 24 20'/%3E%3Cpath d='M4 20 Q10 8 16 20 Q22 32 28 20'/%3E%3Cpath d='M0 20 Q8 4 16 20 Q24 36 32 20'/%3E%3Ccircle cx='38' cy='20' r='4' fill='%23ffffff'/%3E%3C/g%3E%3Ctext x='50' y='27' font-family='Arial' font-size='18' font-weight='800' fill='white'%3EMedTrace%3C/text%3E%3Ctext x='50' y='37' font-family='Arial' font-size='7' font-weight='600' fill='rgba(255,255,255,0.7)'%3EMEDICAL%3C/text%3E%3C/svg%3E\" class=\"header-logo\" alt=\"MedTrace\"/><h1>${company.name || "MedTrace"}</h1>
<div class="sub">${company.subtitle || ""}</div>
<div class="sub" style="margin-top:3px">RAPPORTO DI VERIFICA FUNZIONALE</div>
<div class="sub">${tpl.norm}</div>
</div>
<div class="right">
<div style="font-size:8px;opacity:.7;margin-bottom:3px">N° RAPPORTO</div>
<div class="docnum">${rep.reportNumber || rep.id}</div>
<div class="esito-badge">${esitoLabel}</div>
<div style="font-size:9px;margin-top:4px;opacity:.8">Data: ${rep.date || "—"}</div>
</div>
</div>
<div class="kv-grid">
<div class="kv"><span class="kv-label">Tipo apparecchio</span><span class="kv-value">${tpl.icon} ${tpl.label}</span></div>
<div class="kv"><span class="kv-label">Apparecchio</span><span class="kv-value">${(asset === null || asset === void 0 ? void 0 : asset.name) || "—"}</span></div>
<div class="kv"><span class="kv-label">Marca / Modello</span><span class="kv-value">${(asset === null || asset === void 0 ? void 0 : asset.brand) || ""} ${(asset === null || asset === void 0 ? void 0 : asset.model) || ""}</span></div>
<div class="kv"><span class="kv-label">N° Serie</span><span class="kv-value" style="font-family:monospace">${(asset === null || asset === void 0 ? void 0 : asset.serial) || "—"}</span></div>
<div class="kv"><span class="kv-label">Ubicazione</span><span class="kv-value">${(asset === null || asset === void 0 ? void 0 : asset.location) || "—"}</span></div>
${(customer === null || customer === void 0 ? void 0 : customer.name) ? `<div class="kv"><span class="kv-label">Cliente</span><span class="kv-value">${customer.name}</span></div>` : ""}
<div class="kv"><span class="kv-label">Tecnico verificatore</span><span class="kv-value">${rep.technician || "—"}</span></div>
<div class="kv"><span class="kv-label">Strumento/tester</span><span class="kv-value">${rep.instrument || "—"}</span></div>
</div>
${sectionsHtml}
${rep.notes ? `<div style="margin-top:8px;padding:8px 10px;background:#f8fafc;border-left:3px solid #64748b;font-size:10px"><strong>Note:</strong> ${rep.notes}</div>` : ""}
<div class="total-box">
<span class="label">ESITO FINALE VERIFICA FUNZIONALE</span>
<span class="amount">${esitoLabel}</span>
</div>
<div class="sig-row">
<div class="sig-box">Firma Tecnico Verificatore<br><br>${rep.technician || ""}</div>
</div>
<div class="footer">
<span>${company.name || "MedTrace"} — Generato il ${new Date().toLocaleDateString("it-IT")} — ${tpl.norm}</span>
<span>${rep.reportNumber || rep.id} · ${(asset === null || asset === void 0 ? void 0 : asset.serial) || ""}</span>
</div>
</body></html>`;
openPrintWindow(html);
}
function FuncVerifyForm({ initial, assetId: propAssetId, assets, customers, onSave, onClose }) {
const asset = assets.find(a => a.id === propAssetId) || null;
const [selectedAssetId, setSelectedAssetId] = React.useState(propAssetId || (initial === null || initial === void 0 ? void 0 : initial.assetId) || "");
const effectiveAsset = asset || assets.find(a => a.id === selectedAssetId) || null;
const suggestedTpl = guessTemplate((effectiveAsset === null || effectiveAsset === void 0 ? void 0 : effectiveAsset.name) || "");
const [templateId, setTemplateId] = React.useState((initial === null || initial === void 0 ? void 0 : initial.templateId) || suggestedTpl || "generico");
const tpl = FUNC_TEMPLATES[templateId] || FUNC_TEMPLATES["generico"];
const blank = {
id: "FV" + Date.now().toString().slice(-6),
reportNumber: "",
assetId: propAssetId || "",
date: new Date().toISOString().slice(0, 10),
technician: "",
instrument: "",
templateId: templateId,
verifyType: "periodica",
sections: {},
notes: "",
overallPass: false,
};
const [f, setF] = React.useState(() => {
const init = initial || blank;
if (!init.sections)
return Object.assign(Object.assign({}, init), { sections: {} });
return init;
});
const sv = k => e => setF(x => (Object.assign(Object.assign({}, x), { [k]: e.target.value })));
React.useEffect(() => {
setF(x => (Object.assign(Object.assign({}, x), { templateId })));
}, [templateId]);
const getSectionData = (secId) => f.sections[secId] || { items: {}, measures: {} };
const setItem = (secId, itemId, val) => setF(x => (Object.assign(Object.assign({}, x), { sections: Object.assign(Object.assign({}, x.sections), { [secId]: Object.assign(Object.assign({}, getSectionData(secId)), { items: Object.assign(Object.assign({}, getSectionData(secId).items), { [itemId]: val }) }) }) })));
const setMeasure = (secId, mId, val) => setF(x => (Object.assign(Object.assign({}, x), { sections: Object.assign(Object.assign({}, x.sections), { [secId]: Object.assign(Object.assign({}, getSectionData(secId)), { measures: Object.assign(Object.assign({}, getSectionData(secId).measures), { [mId]: val }) }) }) })));
const computePass = () => {
for (const sec of tpl.sections) {
const sd = getSectionData(sec.id);
for (const item of (sec.items || [])) {
if (sd.items[item.id] === false)
return false;
}
for (const m of (sec.measures || [])) {
const v = parseFloat(sd.measures[m.id] || "");
if (isNaN(v))
continue;
if (m.limitMin !== undefined && v < m.limitMin)
return false;
if (m.limitVal !== undefined) {
if (m.invertPass) {
if (v < m.limitVal)
return false;
}
else {
if (v > m.limitVal)
return false;
}
}
}
}
return true;
};
const pass = computePass();
const FLD = { display: "flex", flexDirection: "column", gap: 5 };
const LBL = { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 };
const INP = { background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "9px 11px", color: "#e2e8f0", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" };
const isMobile = useMedia("(max-width:600px)");
const renderItemRow = ({ secId, item }) => {
const val = getSectionData(secId).items[item.id];
return (React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #1a2030", gap: 10 } },
React.createElement("span", { style: { fontSize: 12, color: "#94a3b8", flex: 1 } }, item.text),
React.createElement("div", { style: { display: "flex", gap: 5, flexShrink: 0 } }, [true, false, null].map((v, i) => (React.createElement("button", { key: i, onClick: () => setItem(secId, item.id, v), style: {
background: val === v ? (v === true ? "#22c55e22" : v === false ? "#ef444422" : "#2A2A38") : "#141418",
border: `1px solid ${val === v ? (v === true ? "#22c55e44" : v === false ? "#ef444433" : "#32323F") : "#202028"}`,
color: val === v ? (v === true ? "#22c55e" : v === false ? "#ef4444" : "#64748b") : "#475569",
borderRadius: 5, padding: "3px 9px", cursor: "pointer", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap"
} }, v === true ? "✓" : v === false ? "✗" : "N/D"))))));
};
const renderMeasureRow = ({ secId, m }) => {
const val = getSectionData(secId).measures[m.id] || "";
const vNum = parseFloat(val);
let pass = null;
if (!isNaN(vNum)) {
pass = true;
if (m.limitMin !== undefined && vNum < m.limitMin)
pass = false;
if (m.limitVal !== undefined) {
if (m.invertPass) {
if (vNum < m.limitVal)
pass = false;
}
else {
if (vNum > m.limitVal)
pass = false;
}
}
}
return (React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 90px 60px 40px", gap: 6, alignItems: "center", marginBottom: 6, background: "#0D0D12", borderRadius: 6, padding: "6px 8px" } },
React.createElement("span", { style: { fontSize: 11, color: "#94a3b8" } }, m.name),
React.createElement("span", { style: { fontSize: 10, color: "#64748b", fontFamily: "monospace" } }, m.expected || ""),
React.createElement("input", { type: "number", step: "any", value: val, onChange: e => setMeasure(secId, m.id, e.target.value), placeholder: "\u2014", style: { background: "#16161C", border: "1px solid #2a3040", borderRadius: 5, padding: "4px 7px", color: "#e2e8f0", fontSize: 12, outline: "none", fontFamily: "monospace" } }),
React.createElement("span", { style: { fontWeight: 700, fontSize: 13, textAlign: "center", color: pass === null ? "#475569" : pass ? "#22c55e" : "#ef4444" } }, m.unit)));
};
return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
React.createElement("div", { style: { background: pass ? "#22c55e15" : "#ef444415", border: `1px solid ${pass ? "#22c55e44" : "#ef444433"}`, borderRadius: 8, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
React.createElement("span", { style: { fontSize: 11, color: "#94a3b8" } },
"Template: ",
React.createElement("strong", { style: { color: "#e2e8f0" } },
tpl.icon,
" ",
tpl.label),
" \u2014 ",
tpl.norm),
React.createElement("span", { style: { fontWeight: 800, fontSize: 14, color: pass ? "#22c55e" : "#ef4444" } }, pass ? "CONFORME" : "NON CONFORME")),
React.createElement("div", { style: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 13 } },
!propAssetId && (React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Apparecchio"),
React.createElement("select", { value: selectedAssetId, onChange: e => { setSelectedAssetId(e.target.value); setF(x => (Object.assign(Object.assign({}, x), { assetId: e.target.value }))); const a = assets.find(x => x.id === e.target.value); if (a) {
const t = guessTemplate(a.name);
setTemplateId(t);
} }, style: INP },
React.createElement("option", { value: "" }, "\u2014 Seleziona \u2014"),
assets.map(a => React.createElement("option", { key: a.id, value: a.id },
a.name,
" \u2014 ",
a.serial || "—"))))),
effectiveAsset && React.createElement("div", { style: Object.assign(Object.assign({}, FLD), { justifyContent: "flex-end" }) },
React.createElement("label", { style: LBL }, "Apparecchio selezionato"),
React.createElement("div", { style: { background: "#141418", borderRadius: 8, padding: "8px 14px", border: "1px solid #1e2a3a", fontSize: 12, color: "#94a3b8" } },
React.createElement("strong", { style: { color: "#e2e8f0" } }, effectiveAsset.name),
" \u00B7 ",
effectiveAsset.brand,
" ",
effectiveAsset.model,
" \u00B7 S/N: ",
effectiveAsset.serial || "—")),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Template verifica funzionale"),
React.createElement("select", { value: templateId, onChange: e => setTemplateId(e.target.value), style: INP }, Object.entries(FUNC_TEMPLATES).map(([id, t]) => React.createElement("option", { key: id, value: id },
t.icon,
" ",
t.label)))),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "N\u00B0 Rapporto"),
React.createElement("input", { value: f.reportNumber, onChange: sv("reportNumber"), placeholder: "VF-2026-001", style: INP })),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Data verifica"),
React.createElement("input", { type: "date", value: f.date, onChange: sv("date"), style: INP })),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Tecnico"),
React.createElement("input", { value: f.technician, onChange: sv("technician"), style: INP })),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Tipo verifica"),
React.createElement("select", { value: f.verifyType || "periodica", onChange: sv("verifyType"), style: INP },
React.createElement("option", { value: "periodica" }, "Periodica programmata"),
React.createElement("option", { value: "dopo riparazione" }, "Dopo riparazione"),
React.createElement("option", { value: "prima messa in servizio" }, "Prima messa in servizio"),
React.createElement("option", { value: "straordinaria" }, "Straordinaria")),
(f.verifyType === "straordinaria") && React.createElement("span", { style: { fontSize: 10, color: "#f59e0b", marginTop: 3 } }, "\u26A0 Straordinaria: non aggiorna la pianificazione annuale")),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Strumento/tester utilizzato"),
React.createElement("input", { value: f.instrument, onChange: sv("instrument"), placeholder: "es. Fluke Impulse 6000D", style: INP }))),
tpl.sections.map(sec => (React.createElement("div", { key: sec.id, style: { background: "#141418", borderRadius: 10, padding: "12px 16px", border: "1px solid #1e2a3a" } },
React.createElement("div", { style: { fontSize: 11, color: "#5EEAD4", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: sec.note ? 4 : 10 } }, sec.title),
sec.note && React.createElement("div", { style: { fontSize: 10, color: "#64748b", marginBottom: 10, fontStyle: "italic" } }, sec.note),
(sec.items || []).map(item => renderItemRow({ secId: sec.id, item })),
(sec.measures || []).length > 0 && (React.createElement("div", { style: { marginTop: (sec.items || []).length > 0 ? 10 : 0 } },
React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 90px 60px 40px", gap: 6, marginBottom: 6 } }, ["Misura", "Atteso", "Valore", "U.M."].map(h => React.createElement("div", { key: h, style: { fontSize: 9, color: "#475569", fontWeight: 700, textTransform: "uppercase" } }, h))),
(sec.measures || []).map(m => renderMeasureRow({ secId: sec.id, m }))))))),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Note e osservazioni"),
React.createElement("textarea", { value: f.notes, onChange: sv("notes"), rows: 3, style: { background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "9px 11px", color: "#e2e8f0", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" } })),
React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Annulla"),
React.createElement(Btn, { onClick: () => onSave(Object.assign(Object.assign({}, f), { assetId: f.assetId || selectedAssetId, overallPass: pass, templateId })) }, "Salva rapporto"))));
}
function IECReportForm({ initial, assetId: propAssetId, assets, customers, onSave, onClose }) {
const getMeasures = React.useCallback((norm, cls, patientType) => {
if (norm === "61010")
return [
{ id: "pe", name: "Resistenza conduttore di protezione (PE)", unit: "Ω", limit: "≤ 0.1", limitVal: 0.1, value: "" },
{ id: "ins", name: "Resistenza di isolamento (500 Vdc)", unit: "MΩ", limit: "≥ 1", limitVal: 1, value: "", invertPass: true },
{ id: "id1", name: "Corrente di dispersione — carcassa", unit: "mA", limit: "≤ 3.5", limitVal: 3.5, value: "" },
{ id: "id2", name: "Corrente di dispersione — circuito prova", unit: "mA", limit: "≤ 0.5", limitVal: 0.5, value: "" },
];
const pt = patientType || "BF";
const patLim = {
"B": { cn: { lim: "≤ 100", val: 100 }, cg: { lim: "≤ 500", val: 500 }, aux: { lim: "≤ 100", val: 100 } },
"BF": { cn: { lim: "≤ 100", val: 100 }, cg: { lim: "≤ 500", val: 500 }, aux: { lim: "≤ 100", val: 100 } },
"CF": { cn: { lim: "≤ 10", val: 10 }, cg: { lim: "≤ 50", val: 50 }, aux: { lim: "≤ 10", val: 10 } },
};
const lim = patLim[pt] || patLim["BF"];
if (cls === "III")
return [
{ id: "ins", name: "Resistenza di isolamento (250 Vdc)", unit: "MΩ", limit: "≥ 2", limitVal: 2, value: "", invertPass: true },
{ id: "id_cn", name: "Corrente dispersione parte paziente " + pt + " (c.n.)", unit: "µA", limit: lim.cn.lim, limitVal: lim.cn.val, value: "" },
{ id: "id_aux", name: "Corrente ausiliaria paziente " + pt, unit: "µA", limit: lim.aux.lim, limitVal: lim.aux.val, value: "" },
];
if (cls === "II")
return [
{ id: "ins", name: "Resistenza di isolamento (500 Vdc)", unit: "MΩ", limit: "≥ 2", limitVal: 2, value: "", invertPass: true },
{ id: "id_eq", name: "Corrente dispersione — carcassa c.n. (Cl.II)", unit: "mA", limit: "≤ 0.5", limitVal: 0.5, value: "" },
{ id: "id_eq2", name: "Corrente dispersione — carcassa c.g. (Cl.II)", unit: "mA", limit: "≤ 1.0", limitVal: 1.0, value: "" },
{ id: "id_cn", name: "Corrente dispersione parte paziente " + pt + " (c.n.)", unit: "µA", limit: lim.cn.lim, limitVal: lim.cn.val, value: "" },
{ id: "id_cg", name: "Corrente dispersione parte paziente " + pt + " (c.g.)", unit: "µA", limit: lim.cg.lim, limitVal: lim.cg.val, value: "" },
{ id: "id_aux", name: "Corrente ausiliaria paziente " + pt + " (c.n.)", unit: "µA", limit: lim.aux.lim, limitVal: lim.aux.val, value: "" },
];
return [
{ id: "pe", name: "Resistenza conduttore di protezione (PE)", unit: "Ω", limit: "≤ 0.3", limitVal: 0.3, value: "" },
{ id: "ins", name: "Resistenza di isolamento (500 Vdc)", unit: "MΩ", limit: "≥ 2", limitVal: 2, value: "", invertPass: true },
{ id: "id_eq", name: "Corrente dispersione — alimentatore / terra (c.n.)", unit: "mA", limit: "≤ 0.5", limitVal: 0.5, value: "" },
{ id: "id_eq2", name: "Corrente dispersione — alimentatore / terra (c.g.)", unit: "mA", limit: "≤ 1.0", limitVal: 1.0, value: "" },
{ id: "id_cn", name: "Corrente dispersione parte paziente " + pt + " (c.n.)", unit: "µA", limit: lim.cn.lim, limitVal: lim.cn.val, value: "" },
{ id: "id_cg", name: "Corrente dispersione parte paziente " + pt + " (c.g.)", unit: "µA", limit: lim.cg.lim, limitVal: lim.cg.val, value: "" },
{ id: "id_aux", name: "Corrente ausiliaria paziente " + pt + " (c.n.)", unit: "µA", limit: lim.aux.lim, limitVal: lim.aux.val, value: "" },
];
}, []);
const blank = { id: "R" + Date.now().toString().slice(-6), reportNumber: "", norm: "62353", date: new Date().toISOString().slice(0, 10),
technician: "", instrument: "", calNumber: "", verifyType: "periodica",
equipClass: "I", equipType: "", assetId: propAssetId || "",
visual: { housing: null, cable: null, connectors: null, labels: null, docs: null },
measures: [], notes: "", overallPass: false };
const [f, setF] = React.useState(() => {
var _a;
const init = initial || blank;
if (!((_a = init.measures) === null || _a === void 0 ? void 0 : _a.length))
return Object.assign(Object.assign({}, init), { measures: getMeasures(init.norm || "62353", "I", init.patientType || "BF") });
return init;
});
const sv = k => e => setF(x => (Object.assign(Object.assign({}, x), { [k]: e.target.value })));
const setVis = (k, v) => setF(x => (Object.assign(Object.assign({}, x), { visual: Object.assign(Object.assign({}, x.visual), { [k]: v }) })));
const setMeas = (id, val) => setF(x => (Object.assign(Object.assign({}, x), { measures: x.measures.map(m => m.id === id ? Object.assign(Object.assign({}, m), { value: val }) : m) })));
React.useEffect(() => { setF(x => (Object.assign(Object.assign({}, x), { measures: getMeasures(x.norm, x.equipClass, x.patientType) }))); }, [f.norm, f.equipClass, f.patientType]);
const computePass = React.useCallback((measures, visual) => {
const mf = measures.some(m => { if (m.value === "" || m.value === undefined)
return false; const v = parseFloat(m.value); const lv = parseFloat(m.limitVal); if (isNaN(v) || isNaN(lv))
return false; return m.invertPass ? v < lv : v > lv; });
const vf = Object.values(visual).some(v => v === false);
return !mf && !vf;
}, []);
React.useEffect(() => { setF(x => (Object.assign(Object.assign({}, x), { overallPass: computePass(x.measures, x.visual) }))); }, [f.measures, f.visual]);
const asset = assets.find(a => a.id === (f.assetId || propAssetId));
const FLD = { display: "flex", flexDirection: "column", gap: 5 };
const LBL = { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 };
const INP = { background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "9px 11px", color: "#e2e8f0", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" };
const isMobile = useMedia("(max-width:600px)");
return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
React.createElement("div", { style: { background: f.overallPass ? "#22c55e15" : "#ef444415", border: `1px solid ${f.overallPass ? "#22c55e44" : "#ef444433"}`, borderRadius: 8, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
React.createElement("span", { style: { fontSize: 11, color: "#94a3b8" } },
"Norma: ",
React.createElement("strong", { style: { color: "#e2e8f0" } }, f.norm === "61010" ? "IEC 61010-1 (Lab)" : "IEC 62353 (Elettromedicale)")),
React.createElement("span", { style: { fontWeight: 800, fontSize: 14, color: f.overallPass ? "#22c55e" : "#ef4444" } }, f.overallPass ? "CONFORME" : "NON CONFORME")),
!propAssetId && (React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Apparecchio"),
React.createElement("select", { value: f.assetId, onChange: sv("assetId"), style: INP },
React.createElement("option", { value: "" }, "\u2014 Seleziona \u2014"),
assets.map(a => React.createElement("option", { key: a.id, value: a.id },
a.name,
" \u2014 ",
a.serial || "—"))))),
asset && React.createElement("div", { style: { background: "#141418", borderRadius: 8, padding: "8px 14px", border: "1px solid #1e2a3a", fontSize: 12, color: "#94a3b8" } },
React.createElement("strong", { style: { color: "#e2e8f0" } }, asset.name),
" \u00B7 ",
asset.brand,
" ",
asset.model,
" \u00B7 S/N: ",
asset.serial || "—"),
React.createElement("div", { style: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 13 } },
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "N\u00B0 Rapporto"),
React.createElement("input", { value: f.reportNumber, onChange: sv("reportNumber"), placeholder: "VSE-2026-001", style: INP })),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Data"),
React.createElement("input", { type: "date", value: f.date, onChange: sv("date"), style: INP })),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Norma"),
React.createElement("select", { value: f.norm, onChange: sv("norm"), style: INP },
React.createElement("option", { value: "62353" }, "IEC 62353 \u2014 Elettromedicale"),
React.createElement("option", { value: "61010" }, "IEC 61010-1 \u2014 Laboratorio"))),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Classe apparecchio"),
React.createElement("select", { value: f.equipClass, onChange: sv("equipClass"), style: INP },
React.createElement("option", { value: "I" }, "Classe I \u2014 Con PE (messa a terra)"),
React.createElement("option", { value: "II" }, "Classe II \u2014 Doppio isolamento (no PE)"),
React.createElement("option", { value: "III" }, "Classe III \u2014 SELV (alimentazione interna/sicura)")),
React.createElement("span", { style: { fontSize: 10, color: "#64748b", marginTop: 3 } },
f.equipClass === "I" && "Misure: PE + isolamento + dispersione terra + dispersione paziente",
f.equipClass === "II" && "Misure: isolamento + dispersione carcassa + dispersione paziente (NO PE)",
f.equipClass === "III" && "Misure: isolamento + dispersione paziente soltanto (circuito SELV, NO terra)")),
f.norm !== "61010" && (React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Tipo parte applicata (paziente)"),
React.createElement("select", { value: f.patientType || "BF", onChange: sv("patientType"), style: INP },
React.createElement("option", { value: "B" }, "Tipo B \u2014 Contatto corpo (\u2264 500\u00B5A)"),
React.createElement("option", { value: "BF" }, "Tipo BF \u2014 Parte isolata (\u2264 100\u00B5A)"),
React.createElement("option", { value: "CF" }, "Tipo CF \u2014 Applicazione cardiaca (\u2264 10\u00B5A)")),
React.createElement("span", { style: { fontSize: 10, color: "#64748b", marginTop: 3 } },
(f.patientType || "BF") === "B" && "Tipo B: contatto diretto con paziente, non cardiaco",
(f.patientType || "BF") === "BF" && "Tipo BF: parte applicata isolata (es. ECG, SpO2)",
(f.patientType || "BF") === "CF" && "Tipo CF: applicazione cardiaca diretta — limiti più severi"))),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Tecnico verificatore"),
React.createElement("input", { value: f.technician, onChange: sv("technician"), style: INP })),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Strumento di misura"),
React.createElement("input", { value: f.instrument, onChange: sv("instrument"), style: INP })),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "N\u00B0 calibrazione"),
React.createElement("input", { value: f.calNumber, onChange: sv("calNumber"), style: INP })),
React.createElement("div", { style: FLD },
React.createElement("label", { style: LBL }, "Tipo verifica"),
React.createElement("select", { value: f.verifyType, onChange: sv("verifyType"), style: INP }, ["periodica", "dopo riparazione", "prima messa in servizio", "straordinaria"].map(v => React.createElement("option", { key: v }, v))),
f.verifyType === "straordinaria" && React.createElement("span", { style: { fontSize: 10, color: "#f59e0b", marginTop: 3 } }, "\u26A0 Straordinaria: non aggiorna la pianificazione annuale"))),
React.createElement("div", { style: { background: "#141418", borderRadius: 10, padding: "12px 16px", border: "1px solid #1e2a3a" } },
React.createElement("div", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 10 } }, "Ispezione visiva"),
[["housing", "Involucro integro e privo di danni"], ["cable", "Cavo di rete e spina integri"], ["connectors", "Connettori e prese in buono stato"], ["labels", "Etichette e marcatura CE leggibili"], ["docs", "Documentazione tecnica presente"]].map(([k, label]) => (React.createElement("div", { key: k, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #1a2030" } },
React.createElement("span", { style: { fontSize: 12, color: "#94a3b8" } }, label),
React.createElement("div", { style: { display: "flex", gap: 6 } }, [true, false, null].map((v, i) => (React.createElement("button", { key: i, onClick: () => setVis(k, v), style: {
background: f.visual[k] === v ? (v === true ? "#22c55e22" : v === false ? "#ef444422" : "#202028") : "#141418",
border: `1px solid ${f.visual[k] === v ? (v === true ? "#22c55e44" : v === false ? "#ef444433" : "#32323F") : "#202028"}`,
color: f.visual[k] === v ? (v === true ? "#22c55e" : v === false ? "#ef4444" : "#64748b") : "#475569",
borderRadius: 5, padding: "3px 9px", cursor: "pointer", fontSize: 11, fontWeight: 700
} }, v === true ? "✓ OK" : v === false ? "✗ NO" : "N/D")))))))),
React.createElement("div", { style: { background: "#141418", borderRadius: 10, padding: "12px 16px", border: "1px solid #1e2a3a" } },
React.createElement("div", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 10 } }, "Misure elettriche"),
React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 80px 80px 50px 50px", gap: 6, marginBottom: 6 } }, ["Parametro", "Limite", "Valore", "Unità", "Esito"].map(h => React.createElement("div", { key: h, style: { fontSize: 9, color: "#475569", fontWeight: 700, textTransform: "uppercase" } }, h))),
f.measures.map(m => {
const v = parseFloat(m.value);
const lv = parseFloat(m.limitVal);
const ok = m.value !== "" && m.value !== undefined ? (m.invertPass ? v >= lv : v <= lv) : null;
return (React.createElement("div", { key: m.id, style: { display: "grid", gridTemplateColumns: "1fr 80px 80px 50px 50px", gap: 6, alignItems: "center", marginBottom: 6, background: "#0D0D12", borderRadius: 6, padding: "6px 8px" } },
React.createElement("span", { style: { fontSize: 11, color: "#94a3b8" } }, m.name),
React.createElement("span", { style: { fontSize: 11, color: "#64748b", fontFamily: "monospace" } }, m.limit),
React.createElement("input", { type: "number", step: "0.001", value: m.value, onChange: e => setMeas(m.id, e.target.value), placeholder: "\u2014", style: { background: "#16161C", border: "1px solid #2a3040", borderRadius: 5, padding: "4px 7px", color: "#e2e8f0", fontSize: 12, outline: "none", fontFamily: "monospace" } }),
React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, m.unit),
React.createElement("span", { style: { fontWeight: 700, fontSize: 13, color: ok === null ? "#475569" : ok ? "#22c55e" : "#ef4444" } }, ok === null ? "—" : ok ? "✓" : "✗")));
})),
React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 5 } },
React.createElement("label", { style: LBL }, "Note e osservazioni"),
React.createElement("textarea", { value: f.notes, onChange: sv("notes"), rows: 3, style: { background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "9px 11px", color: "#e2e8f0", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical" } })),
React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Annulla"),
React.createElement(Btn, { onClick: () => onSave(Object.assign(Object.assign({}, f), { assetId: f.assetId || propAssetId || "" })) }, "Salva rapporto"))));
}
const FUNC_TEMPLATES = {
"defibrillatore": {
label: "Defibrillatore manuale", icon: "›", norm: "IEC 60601-2-4:2010+AMD1:2021",
sections: [
{
id: "ispezione", title: "Ispezione visiva e meccanica",
items: [
{ id: "cavo_al", text: "Cavo alimentazione e spina: integri, nessun danno visibile" },
{ id: "involucro", text: "Involucro e display: privi di crepe, bruciature o danni meccanici" },
{ id: "piastre", text: "Palette/piastre manuali: superficie conduttiva integra, impugnatura isolata" },
{ id: "pad_adesivi", text: "Pad adesivi (se presenti): non scaduti, gel integro, connettori OK" },
{ id: "cavo_ecg", text: "Cavo ECG paziente e connettori: integrità isolamento, clip/elettrodi funzionanti" },
{ id: "stampante", text: "Stampante termica: carta presente, funzionante" },
{ id: "etichette", text: "Etichette di sicurezza, classe e numero serie: leggibili e presenti" },
]
},
{
id: "batteria", title: "Batteria e alimentazione",
items: [
{ id: "batt_scad", text: "Data scadenza batteria: non superata" },
{ id: "batt_carica", text: "Indicatore carica: livello adeguato per utilizzo" },
{ id: "batt_autotest", text: "Autotest batteria (se previsto dal costruttore): superato" },
{ id: "rete_ok", text: "Funzionamento da rete: corretto, indicatore carica attivo" },
],
measures: [
{ id: "batt_perc", name: "Carica residua batteria", unit: "%", expected: "≥ 80%", limitVal: 80, invertPass: true, value: "" },
]
},
{
id: "funz_base", title: "Funzionalità di base",
items: [
{ id: "accensione", text: "Accensione: nessun messaggio di errore o allarme anomalo" },
{ id: "display", text: "Display: leggibile, nessun pixel morto o artefatto" },
{ id: "sel_energia", text: "Selettore energia: funzionante a tutti i livelli (da minimo a massimo)" },
{ id: "puls_carica", text: "Tasto CARICA: funzionante, tempo carica entro specifiche costruttore" },
{ id: "puls_scarica", text: "Tasto SCARICA: funzionante (test su analizzatore/carico resistivo)" },
{ id: "beep_carica", text: "Segnale acustico carica completata: presente e udibile" },
{ id: "annullamento", text: "Annullamento carica (tasto o timeout): funzionante" },
]
},
{
id: "energia", title: "Energia erogata (IEC 60601-2-4 cl.201.12.4.101)",
note: "Misurare con analizzatore certificato su carico resistivo 50 Ω. Tolleranza ammessa: ±15% del valore selezionato oppure ±3 J (si applica il maggiore dei due). Eseguire anche a 25 Ω e 175 Ω se richiesto dal costruttore.",
items: [
{ id: "carico_50", text: "Analizzatore collegato: carico 50 Ω" },
{ id: "forma_onda", text: "Forma d'onda di scarica (bifasica/monofasica): conforme alle specifiche costruttore" },
],
measures: [
{ id: "e_low", name: "Energia — selezione minima", unit: "J", expected: "sel. ±15% o ±3J", value: "" },
{ id: "e_50j", name: "Energia — selezione 50 J", unit: "J", expected: "50 ±15% (42.5–57.5) o ±3J", limitVal: 57.5, limitMin: 42.5, value: "" },
{ id: "e_100j", name: "Energia — selezione 100 J", unit: "J", expected: "100 ±15% (85–115)", limitVal: 115, limitMin: 85, value: "" },
{ id: "e_150j", name: "Energia — selezione 150 J", unit: "J", expected: "150 ±15% (127.5–172.5)", limitVal: 172.5, limitMin: 127.5, value: "" },
{ id: "e_200j", name: "Energia — selezione 200 J", unit: "J", expected: "200 ±15% (170–230)", limitVal: 230, limitMin: 170, value: "" },
{ id: "e_max", name: "Energia — selezione massima", unit: "J", expected: "max ±15% o ±3J", value: "" },
{ id: "t_carica", name: "Tempo di carica a energia max", unit: "s", expected: "≤ 15 s (IEC 60601-2-4)", limitVal: 15, value: "" },
]
},
{
id: "sync", title: "Cardioversione sincronizzata (IEC 60601-2-4 cl.201.12.4.4)",
note: "Il ritardo tra picco R e inizio scarica deve essere < 60 ms (IEC 60601-2-4).",
items: [
{ id: "sync_attiva", text: "Modalità SYNC: attivabile, indicatore visivo presente" },
{ id: "sync_marker", text: "Marker di sincronismo sull'onda R del tracciato ECG: visibile" },
{ id: "sync_auto_off", text: "Disattivazione automatica SYNC dopo scarica: confermata" },
],
measures: [
{ id: "sync_delay", name: "Ritardo scarica dal picco R (sync delay)", unit: "ms", expected: "< 60 ms", limitVal: 60, value: "" },
]
},
{
id: "ecg_mon", title: "Monitoraggio ECG (IEC 60601-2-27)",
items: [
{ id: "ecg_tracciato", text: "Tracciato ECG su simulatore: morfologia corretta, no artefatti" },
{ id: "ecg_derivazioni", text: "Selezione derivazioni (I, II, III, aVR, aVL, aVF, V): funzionante" },
{ id: "ecg_allarmi", text: "Allarmi FC alta/bassa: attivazione nei range impostati" },
{ id: "ecg_vf", text: "Rilevazione FV (se previsto): segnale di allarme presente" },
],
measures: [
{ id: "fc_sim60", name: "FC visualizzata — simulatore a 60 bpm", unit: "bpm", expected: "60 ±1% o ±1 bpm", limitVal: 61, limitMin: 59, value: "" },
{ id: "fc_sim120", name: "FC visualizzata — simulatore a 120 bpm", unit: "bpm", expected: "120 ±1% o ±1 bpm", limitVal: 122, limitMin: 118, value: "" },
]
},
{
id: "pacing", title: "Pacing esterno transcutaneo (se presente)",
items: [
{ id: "pacing_attiva", text: "Modalità pacing: attivabile" },
{ id: "pacing_freq", text: "Frequenza pacing: selezionabile nel range indicato" },
{ id: "pacing_corrente", text: "Corrente stimolazione: selezionabile da min a max" },
{ id: "pacing_cattura", text: "Cattura ventricolare verificabile su simulatore ECG" },
{ id: "pacing_spike", text: "Spike di pacing visibile sul tracciato" },
]
},
]
},
"dae": {
label: "DAE — Defibrillatore Automatico Esterno", icon: "DAE", norm: "IEC 60601-2-4 / D.Lgs. 53/2021",
sections: [
{
id: "ispezione", title: "Ispezione visiva e stato operativo",
items: [
{ id: "contenitore", text: "Contenitore/zaino: integrità, chiusura funzionante" },
{ id: "segnalatore", text: "Segnalatore di pronto intervento (luce verde/LED): attivo" },
{ id: "involucro", text: "Involucro DAE: privo di danni, sporco o umidità" },
{ id: "display", text: "Display/segnalazioni vocali: funzionanti" },
{ id: "pad_adulti", text: "Pad adulti: non scaduti, confezionamento integro" },
{ id: "pad_pediatrici", text: "Pad pediatrici (se presenti): non scaduti, integri" },
{ id: "accessori", text: "Accessori kit (forbici, rasoio, guanti, garze): presenti e integri" },
]
},
{
id: "batteria", title: "Batteria (IEC 60601-2-4)",
items: [
{ id: "batt_scad", text: "Data scadenza batteria: non superata" },
{ id: "batt_status", text: "Indicatore stato batteria: OK / pronto" },
{ id: "batt_autotest", text: "Autotest automatico superato (log di sistema)" },
],
measures: [
{ id: "batt_perc", name: "Carica residua batteria", unit: "%", expected: "≥ 80%", limitVal: 80, invertPass: true, value: "" },
{ id: "n_scariche", name: "Numero scariche residue stimate", unit: "n", expected: "≥ 100 scariche", limitVal: 100, invertPass: true, value: "" },
]
},
{
id: "funz_dae", title: "Verifica funzionale (con analizzatore/simulatore)",
note: "Usare simulatore ECG con pattern FV/TV. NON eseguire scarica su persona.",
items: [
{ id: "analisi_fv", text: "Analisi ritmo FV: DAE consiglia scarica correttamente" },
{ id: "analisi_rns", text: "Analisi ritmo sinusale normale: DAE NON consiglia scarica" },
{ id: "guida_vocale", text: "Guida vocale durante procedura: chiara e corretta" },
{ id: "segnale_cpr", text: "Segnale guida RCP post-scarica: presente (se previsto)" },
]
},
{
id: "energia_dae", title: "Verifica energia erogata",
note: "Misurare con analizzatore su carico 50 Ω. Tolleranza ±15% o ±3J.",
items: [
{ id: "scarica_ok", text: "Scarica su carico 50 Ω: eseguita correttamente" },
],
measures: [
{ id: "e_scarica1", name: "Energia 1ª scarica", unit: "J", expected: "secondo costruttore ±15%", value: "" },
{ id: "e_scarica2", name: "Energia 2ª scarica (se escalation)", unit: "J", expected: "secondo costruttore ±15%", value: "" },
]
},
{
id: "registro", title: "Registro e documentazione",
items: [
{ id: "log_ok", text: "Log eventi scaricato e verificato (nessun allarme anomalo)" },
{ id: "data_manut", text: "Data prossima manutenzione/scadenza aggiornata" },
{ id: "posizione", text: "Segnaletica posizione DAE: visibile e corretta" },
{ id: "registro_aggiornato", text: "Registro manutenzioni aggiornato" },
]
},
]
},
"aspiratore_chirurgico": {
label: "Aspiratore chirurgico / da secreti", icon: "ASP", norm: "ISO 10079-1:2015",
sections: [
{
id: "ispezione", title: "Ispezione visiva e meccanica",
items: [
{ id: "cavo_al", text: "Cavo alimentazione: integro, spina OK" },
{ id: "involucro", text: "Involucro e carrello (se presente): integrità strutturale" },
{ id: "tubazioni", text: "Tubazioni, raccordi e connettori: integri, senza cricche o occlusioni" },
{ id: "filtro_batt", text: "Filtro batterico: presente, non scaduto, non otturato" },
{ id: "filtro_idr", text: "Filtro idrofobico (protezione pompa): presente e integro" },
{ id: "contenitore", text: "Contenitore liquidi: integro, guarnizioni OK, sistema di smaltimento funzionante" },
{ id: "overflow", text: "Dispositivo di protezione overflow: presente e funzionante" },
{ id: "valvola_sic", text: "Valvola di sicurezza/limitatore di pressione: presente" },
]
},
{
id: "vuoto", title: "Verifica del vuoto (ISO 10079-1 cl.5.2)",
note: "Aspiratore chirurgico: vuoto max ≥ 80 kPa. Aspiratore da secreti: ≥ 60 kPa. Misurare a contenitore chiuso.",
items: [
{ id: "otturazione", text: "Occlusione dell'uscita paziente: corretta per test" },
],
measures: [
{ id: "vuoto_max", name: "Vuoto massimo (contenitore chiuso)", unit: "kPa", expected: "≥ 80 kPa (chirurgico) / ≥ 60 kPa (secreti)", limitVal: 80, invertPass: true, value: "" },
{ id: "t_vuoto", name: "Tempo raggiungimento vuoto max", unit: "s", expected: "< 20 s (chirurgico)", limitVal: 20, value: "" },
]
},
{
id: "portata", title: "Verifica portata (ISO 10079-1 cl.5.3)",
note: "Portata libera misurata a pressione atmosferica. Chirurgico: ≥ 25 L/min. Da secreti: ≥ 15 L/min.",
measures: [
{ id: "portata_lib", name: "Portata libera (max, a 0 kPa)", unit: "L/min", expected: "≥ 25 L/min (chir.)", limitVal: 25, invertPass: true, value: "" },
{ id: "portata_50", name: "Portata a 50 kPa di depressione", unit: "L/min", expected: "≥ 15 L/min", limitVal: 15, invertPass: true, value: "" },
{ id: "regolazione", name: "Depressione regolabile (valore max impostato)", unit: "kPa", expected: "regolabile", value: "" },
]
},
{
id: "batteria_asp", title: "Batteria (se dispositivo portatile)",
items: [
{ id: "batt_scad", text: "Batteria: non scaduta, carica adeguata" },
{ id: "autonomia", text: "Autonomia su batteria: sufficiente per l'uso previsto" },
],
measures: [
{ id: "batt_perc", name: "Carica residua", unit: "%", expected: "≥ 80%", limitVal: 80, invertPass: true, value: "" },
]
},
]
},
"elettrobisturi": {
label: "Elettrobisturi / Unità HF chirurgica", icon: "ESU", norm: "IEC 60601-2-2:2017",
sections: [
{
id: "ispezione", title: "Ispezione visiva",
items: [
{ id: "cavo_al", text: "Cavo alimentazione e spina: integrità isolamento" },
{ id: "involucro", text: "Involucro: privo di danni, ventilazione libera" },
{ id: "cavi_att", text: "Cavi elettrodi attivi (monopolare/bipolare): isolamento integro, connettori OK" },
{ id: "elettrodo_n", text: "Elettrodo neutro (piastra): integrità, connettore, cavo" },
{ id: "pedale", text: "Pedale di comando (se presente): funzionante, cavo integro" },
{ id: "etichette", text: "Etichette potenza, avvertenze e classe: leggibili" },
]
},
{
id: "funz_hf", title: "Verifica funzionale",
items: [
{ id: "accensione", text: "Accensione: nessun allarme anomalo" },
{ id: "display", text: "Display potenza e modalità: corretto" },
{ id: "sel_modo", text: "Selezione modalità (CUT/COAG/BLEND): funzionante" },
{ id: "attivazione", text: "Attivazione manuale e pedale: funzionanti" },
{ id: "allarme_en", text: "Allarme elettrodo neutro disconnesso: attivo (IEC 60601-2-2 cl.201.8.4)" },
]
},
{
id: "potenza", title: "Verifica potenza erogata (IEC 60601-2-2 cl.201.12.4.101)",
note: "Misurare con analizzatore HF certificato su carico resistivo. Tolleranza: ±20% della potenza nominale per ciascuna modalità.",
items: [
{ id: "carico_300", text: "Analizzatore su carico resistivo 300 Ω (monopolare standard)" },
],
measures: [
{ id: "p_cut_low", name: "Potenza CUT — selezione bassa (es. 30W)", unit: "W", expected: "30 ±20% (24–36 W)", limitVal: 36, limitMin: 24, value: "" },
{ id: "p_cut_med", name: "Potenza CUT — selezione media (es. 60W)", unit: "W", expected: "60 ±20% (48–72 W)", limitVal: 72, limitMin: 48, value: "" },
{ id: "p_cut_high", name: "Potenza CUT — selezione alta (es. 100W)", unit: "W", expected: "100 ±20% (80–120 W)", limitVal: 120, limitMin: 80, value: "" },
{ id: "p_coag_low", name: "Potenza COAG — selezione bassa", unit: "W", expected: "secondo costruttore ±20%", value: "" },
{ id: "p_coag_high", name: "Potenza COAG — selezione alta", unit: "W", expected: "secondo costruttore ±20%", value: "" },
{ id: "p_bip", name: "Potenza BIPOLARE (se presente)", unit: "W", expected: "secondo costruttore ±20%", value: "" },
{ id: "i_hf_leak", name: "Corrente di perdita HF (IEC 60601-2-2 cl.202.8.4)", unit: "mA", expected: "< 150 mA", limitVal: 150, value: "" },
]
},
]
},
"monitor_multipar": {
label: "Monitor multiparametrico", icon: "MON", norm: "IEC 60601-2-27/30/49 · ISO 80601-2-61",
sections: [
{
id: "ispezione", title: "Ispezione visiva",
items: [
{ id: "cavo_al", text: "Cavo alimentazione: integro" },
{ id: "involucro", text: "Involucro e schermo: privi di danni, schermo leggibile" },
{ id: "cavi_paz", text: "Cavi paziente (ECG, SpO2, NIBP, temperatura): integrità e connettori" },
{ id: "manicotti", text: "Manicotti NIBP: integrità, assenza perdite d'aria" },
{ id: "sensori", text: "Sensori SpO2 e temperatura: condizioni operative OK" },
]
},
{
id: "ecg_mon", title: "ECG (IEC 60601-2-27)",
note: "Tolleranza FC: ±1% del valore visualizzato oppure ±1 bpm (il maggiore dei due).",
items: [
{ id: "tracciato", text: "Tracciato ECG con simulatore: morfologia corretta, assenza artefatti" },
{ id: "derivazioni", text: "Selezione derivazioni: tutte funzionanti (almeno I, II, III)" },
{ id: "allarmi_fc", text: "Allarmi FC alta/bassa: attivazione nei limiti impostati" },
{ id: "st_analisi", text: "Analisi del tratto ST (se presente): visualizzazione corretta" },
],
measures: [
{ id: "fc_30", name: "FC — simulatore 30 bpm", unit: "bpm", expected: "30 ±1 bpm", limitVal: 31, limitMin: 29, value: "" },
{ id: "fc_60", name: "FC — simulatore 60 bpm", unit: "bpm", expected: "60 ±1 bpm", limitVal: 61, limitMin: 59, value: "" },
{ id: "fc_120", name: "FC — simulatore 120 bpm", unit: "bpm", expected: "120 ±1 bpm", limitVal: 121, limitMin: 119, value: "" },
{ id: "fc_200", name: "FC — simulatore 200 bpm", unit: "bpm", expected: "200 ±1% o ±1 bpm", limitVal: 202, limitMin: 198, value: "" },
]
},
{
id: "spo2", title: "SpO₂ (ISO 80601-2-61)",
note: "Accuratezza richiesta: ±3% ARMS nel range 70–100% SaO2.",
items: [
{ id: "spo2_display", text: "Visualizzazione SpO2 e curva pletismografica: corretta" },
{ id: "spo2_allarmi", text: "Allarmi SpO2 bassa: attivazione corretta" },
],
measures: [
{ id: "spo2_98", name: "SpO2 — simulatore 98%", unit: "%", expected: "98 ±3% (95–100)", limitVal: 100, limitMin: 95, value: "" },
{ id: "spo2_90", name: "SpO2 — simulatore 90%", unit: "%", expected: "90 ±3% (87–93)", limitVal: 93, limitMin: 87, value: "" },
{ id: "spo2_80", name: "SpO2 — simulatore 80%", unit: "%", expected: "80 ±3% (77–83)", limitVal: 83, limitMin: 77, value: "" },
{ id: "fc_spo2", name: "FC da SpO2 — simulatore 60 bpm", unit: "bpm", expected: "60 ±3 bpm", limitVal: 63, limitMin: 57, value: "" },
]
},
{
id: "nibp", title: "NIBP — PA non invasiva (IEC 60601-2-30)",
note: "Errore medio ≤ 5 mmHg, deviazione standard ≤ 8 mmHg (IEC 60601-2-30 cl.201.12.1.101).",
items: [
{ id: "gonfiaggio", text: "Gonfiaggio e sgonfiaggio automatico: corretto" },
{ id: "allarmi_pa", text: "Allarmi PA alta/bassa: attivazione corretta" },
{ id: "modalita", text: "Modalità manuale, automatica e STAT: funzionanti" },
],
measures: [
{ id: "pa_sis_120", name: "PA sistolica — riferimento 120 mmHg", unit: "mmHg", expected: "120 ±5 mmHg (115–125)", limitVal: 125, limitMin: 115, value: "" },
{ id: "pa_dias_80", name: "PA diastolica — riferimento 80 mmHg", unit: "mmHg", expected: "80 ±5 mmHg (75–85)", limitVal: 85, limitMin: 75, value: "" },
{ id: "pa_map_93", name: "PA media (MAP) — riferimento 93 mmHg", unit: "mmHg", expected: "93 ±5 mmHg", limitVal: 98, limitMin: 88, value: "" },
]
},
{
id: "temp", title: "Temperatura (IEC 60601-2-56)",
note: "Accuratezza richiesta: ±0.3°C nel range clinico 35–42°C.",
measures: [
{ id: "temp_37", name: "Temperatura — riferimento 37.0°C", unit: "°C", expected: "37.0 ±0.3°C (36.7–37.3)", limitVal: 37.3, limitMin: 36.7, value: "" },
{ id: "temp_39", name: "Temperatura — riferimento 39.0°C", unit: "°C", expected: "39.0 ±0.3°C (38.7–39.3)", limitVal: 39.3, limitMin: 38.7, value: "" },
]
},
{
id: "allarmi_mon", title: "Sistema allarmi (IEC 60601-1-8)",
note: "IEC 60601-1-8 impone che tutti gli allarmi di priorità alta siano visivi E acustici.",
items: [
{ id: "allarme_vis", text: "Allarmi alta priorità: segnalazione visiva (lampeggio rosso) presente" },
{ id: "allarme_ac", text: "Allarmi alta priorità: segnalazione acustica presente e udibile" },
{ id: "allarme_sil", text: "Silenziamento allarmi: funzionante con ripristino automatico" },
{ id: "allarme_tecn", text: "Allarmi tecnici (guasto tecnico, batteria scarica): attivazione corretta" },
]
},
{
id: "etco2", title: "etCO₂ (ISO 80601-2-55) — se presente",
measures: [
{ id: "etco2_val", name: "etCO2 — gas di riferimento (es. 38 mmHg)", unit: "mmHg", expected: "±2 mmHg o ±8%", value: "" },
{ id: "fr_etco2", name: "FR da capnografia", unit: "atti/min", expected: "±1 atto/min", value: "" },
]
},
]
},
"ventilatore": {
label: "Ventilatore polmonare (terapia intensiva)", icon: "VEN", norm: "ISO 80601-2-12:2020",
sections: [
{
id: "ispezione", title: "Ispezione visiva e meccanica",
items: [
{ id: "cavo_al", text: "Cavo alimentazione e spina: integri" },
{ id: "involucro", text: "Involucro: privo di danni, ventilazione libera" },
{ id: "circuito", text: "Circuito paziente: integrità tubi, raccordi, valvole espiratoria/inspiratoria" },
{ id: "filtri", text: "Filtri (antibatterico, HMEF): presenti e non scaduti" },
{ id: "sensori_fl", name: "Sensori di flusso e pressione: puliti, non otturati" },
{ id: "umidif", text: "Umidificatore (se presente): livello acqua corretto, integro" },
{ id: "polmone_test", text: "Polmone test per calibrazione: disponibile" },
{ id: "o2_supply", text: "Alimentazione O2 e aria compressa: pressione corretta (3.5–6 bar)" },
]
},
{
id: "calibrazione", title: "Calibrazione e autotest",
items: [
{ id: "autotest", text: "Autotest all'accensione: superato senza errori" },
{ id: "calib_fluido", text: "Calibrazione sensori di flusso: eseguita secondo costruttore" },
{ id: "test_tenuta", text: "Test tenuta circuito (leak test): perdita entro specifiche costruttore" },
{ id: "calib_o2", text: "Calibrazione cella O2 (se applicabile): eseguita" },
]
},
{
id: "parametri", title: "Verifica accuratezza parametri erogati (ISO 80601-2-12 cl.201.12.4)",
note: "ISO 80601-2-12: VT ±10% o ±10 mL; FR ±1 atto/min; PEEP ±2 cmH2O; FiO2 ±3%; Ppeak ±4% o ±2 cmH2O.",
items: [
{ id: "connessione", text: "Ventilatore connesso al polmone test" },
],
measures: [
{ id: "vt_500", name: "Volume corrente erogato (impostato 500 mL)", unit: "mL", expected: "500 ±10% (450–550)", limitVal: 550, limitMin: 450, value: "" },
{ id: "fr_15", name: "Frequenza respiratoria (impostata 15 a/min)", unit: "atti/min", expected: "15 ±1 (14–16)", limitVal: 16, limitMin: 14, value: "" },
{ id: "peep_5", name: "PEEP (impostata 5 cmH2O)", unit: "cmH2O", expected: "5 ±2 (3–7)", limitVal: 7, limitMin: 3, value: "" },
{ id: "peep_10", name: "PEEP (impostata 10 cmH2O)", unit: "cmH2O", expected: "10 ±2 (8–12)", limitVal: 12, limitMin: 8, value: "" },
{ id: "fio2_40", name: "FiO2 (impostata 40%)", unit: "%", expected: "40 ±3% (37–43)", limitVal: 43, limitMin: 37, value: "" },
{ id: "fio2_100", name: "FiO2 (impostata 100%)", unit: "%", expected: "100 ±3% (97–100)", limitVal: 100, limitMin: 97, value: "" },
{ id: "ppeak", name: "Pressione di picco inspiratoria", unit: "cmH2O", expected: "±4% o ±2 cmH2O del valore misurato", value: "" },
]
},
{
id: "allarmi_vent", title: "Allarmi (ISO 80601-2-12 + IEC 60601-1-8)",
note: "Allarmi obbligatori per ventilatori TI: disconnessione, alta pressione, apnea, alimentazione gas, O2.",
items: [
{ id: "alarm_disc", text: "Allarme DISCONNESSIONE paziente: attivazione < 15 s" },
{ id: "alarm_press", text: "Allarme ALTA PRESSIONE: attivazione al superamento del limite impostato" },
{ id: "alarm_apnea", text: "Allarme APNEA: attivazione entro il tempo impostato (default 20 s)" },
{ id: "alarm_o2", text: "Allarme MANCANZA O2/ARIA: attivazione corretta" },
{ id: "alarm_power", text: "Allarme MANCANZA ALIMENTAZIONE elettrica: attivazione" },
{ id: "batt_vent", text: "Autonomia su batteria interna: sufficiente (≥ 30 min o secondo costruttore)" },
{ id: "alarm_fio2", text: "Allarme FiO2 bassa/alta: attivazione corretta (se presente)" },
]
},
]
},
"pompa_infusionale": {
label: "Pompa infusionale / siringa elettrica", icon: "POM", norm: "IEC 60601-2-24:2012",
sections: [
{
id: "ispezione", title: "Ispezione visiva",
items: [
{ id: "cavo_al", text: "Cavo alimentazione: integro" },
{ id: "involucro", text: "Involucro: privo di danni, slot siringa/sacca funzionante" },
{ id: "display", text: "Display e tastiera: leggibili e funzionanti" },
{ id: "porta_set", text: "Porta set infusionale / sede siringa: pulizia, usura meccanismo" },
{ id: "sensori", text: "Sensori aria in linea e occlusione: presenti e attivi" },
]
},
{
id: "accuratezza", title: "Accuratezza portata (IEC 60601-2-24 cl.201.12.4.101)",
note: "IEC 60601-2-24: errore portata ≤ ±5% dopo periodo di stabilizzazione (almeno 1h a portata nominale). Misurare con metodo gravimetrico o contagocce calibrato.",
items: [
{ id: "stabilizz", text: "Periodo di stabilizzazione ≥ 1 ora prima della misurazione" },
{ id: "metodo_grav", text: "Metodo di misura: gravimetrico (bilancia ±0.01 g) o contagocce calibrato" },
],
measures: [
{ id: "q_5", name: "Portata — impostata 5 mL/h", unit: "mL/h", expected: "5 ±5% (4.75–5.25)", limitVal: 5.25, limitMin: 4.75, value: "" },
{ id: "q_25", name: "Portata — impostata 25 mL/h", unit: "mL/h", expected: "25 ±5% (23.75–26.25)", limitVal: 26.25, limitMin: 23.75, value: "" },
{ id: "q_100", name: "Portata — impostata 100 mL/h", unit: "mL/h", expected: "100 ±5% (95–105)", limitVal: 105, limitMin: 95, value: "" },
{ id: "q_kvo", name: "Portata KVO (Keep Vein Open)", unit: "mL/h", expected: "1–5 mL/h (secondo costruttore)", value: "" },
]
},
{
id: "allarmi_pompa", title: "Allarmi (IEC 60601-2-24 + IEC 60601-1-8)",
items: [
{ id: "alarm_occ", text: "Allarme OCCLUSIONE a valle: attivazione entro pressione specificata dal costruttore" },
{ id: "alarm_aria", text: "Allarme ARIA IN LINEA: attivazione con bolla ≥ 50 µL (se presente sensore)" },
{ id: "alarm_fine", text: "Allarme FINE INFUSIONE / SIRINGA QUASI VUOTA: attivazione corretta" },
{ id: "alarm_batt", text: "Allarme BATTERIA SCARICA: attivazione con preavviso adeguato" },
{ id: "alarm_porta", text: "Allarme PORTA APERTA / SIRINGA RIMOSSA: attivazione immediata" },
]
},
{
id: "batteria_pompa", title: "Batteria",
items: [
{ id: "batt_scad", text: "Batteria: non scaduta" },
],
measures: [
{ id: "batt_perc", name: "Carica residua", unit: "%", expected: "≥ 80%", limitVal: 80, invertPass: true, value: "" },
{ id: "autonomia_h", name: "Autonomia su batteria", unit: "h", expected: "≥ 4 h (o secondo costruttore)", limitVal: 4, invertPass: true, value: "" },
]
},
]
},
"ecografo": {
label: "Ecografo", icon: "ECO", norm: "IEC 60601-2-37:2007+AMD1:2015",
sections: [
{
id: "ispezione", title: "Ispezione visiva",
items: [
{ id: "cavo_al", text: "Cavo alimentazione: integro" },
{ id: "involucro", text: "Carrello/console: integrità strutturale, stabilità" },
{ id: "sonde", text: "Sonde: nessuna cricca, scheggia o delaminazione del trasduttore" },
{ id: "cavi_sonde", text: "Cavi sonde: isolamento integro, connettori puliti e funzionanti" },
{ id: "monitor", text: "Monitor: nessun pixel morto, luminosità adeguata" },
{ id: "gel", text: "Gel ecografico: disponibile e adeguato" },
]
},
{
id: "funz_eco", title: "Verifica funzionale",
note: "Usare fantoccio ecografico (phantom) per verifica accuratezza. Se non disponibile, documentare verifica su soggetto/mano.",
items: [
{ id: "accensione", text: "Accensione: nessun errore, autotest OK" },
{ id: "b_mode", text: "Modalità B-mode: immagine acquisita, risoluzione adeguata" },
{ id: "m_mode", text: "Modalità M-mode (se presente): tracciato tempo/movimento corretto" },
{ id: "doppler_col", text: "Color Doppler (se presente): flusso visualizzato correttamente" },
{ id: "doppler_pw", text: "PW/CW Doppler (se presente): spettro Doppler corretto" },
{ id: "misure", text: "Misure caliper (distanza/area): funzionanti" },
{ id: "stampa_arch", text: "Stampa/archiviazione immagini: funzionante" },
{ id: "selezione_sonde", text: "Selezione sonde (se multiple): tutte riconosciute" },
]
},
{
id: "phantom", title: "Verifica con fantoccio (phantom test)",
note: "Se disponibile fantoccio calibrato, verificare risoluzione assiale/laterale e accuratezza distanze.",
measures: [
{ id: "dist_10mm", name: "Distanza misurata — target 10 mm", unit: "mm", expected: "10 ±1 mm (±10%)", limitVal: 11, limitMin: 9, value: "" },
{ id: "dist_50mm", name: "Distanza misurata — target 50 mm", unit: "mm", expected: "50 ±5 mm (±10%)", limitVal: 55, limitMin: 45, value: "" },
{ id: "profondita", name: "Profondità massima immagine", unit: "cm", expected: "secondo costruttore", value: "" },
]
},
]
},
"letto_elettrico": {
label: "Letto elettrico / barella motorizzata", icon: "LET", norm: "IEC 60601-2-38:2014",
sections: [
{
id: "ispezione", title: "Ispezione visiva e meccanica",
items: [
{ id: "cavo_al", text: "Cavo alimentazione e spina: integri, nessun danno" },
{ id: "struttura", text: "Struttura, sponde e materasso: integrità, nessun spigolo tagliente" },
{ id: "freni", text: "Freni ruote: funzionanti su tutti i punti di frenatura" },
{ id: "comandi", text: "Comandi paziente e infermiere: tutti funzionanti, etichettati" },
{ id: "cavo_comandi", text: "Cavo telecomando: integro, connettore OK" },
{ id: "fine_corsa", text: "Fine corsa meccanici e elettrici: presenti e funzionanti" },
{ id: "giunti", text: "Giunti, snodi e meccanismi di articolazione: lubrificati, nessun gioco anomalo" },
]
},
{
id: "movimenti", title: "Verifica movimenti (IEC 60601-2-38 cl.201.15)",
note: "Verificare assenza di movimenti inattesi, vibrazioni, rumori anomali. Velocità massima limitata da norma.",
items: [
{ id: "schienale_su", text: "Alzata schienale: movimento fluido, senza scatti, fine corsa funzionante" },
{ id: "schienale_giu", text: "Abbassamento schienale: corretto" },
{ id: "trendelenburg", text: "Trendelenburg (se presente): movimento fluido, fine corsa OK" },
{ id: "antitrendel", text: "Anti-Trendelenburg (se presente): corretto" },
{ id: "alzata_letto", text: "Alzata/abbassamento altezza letto: fluido, nessun bloccaggio" },
{ id: "sponde_el", text: "Sponde elettriche (se presenti): alzata/abbassamento corretti" },
{ id: "posizione_card", text: "Posizione cardiaca/sedia (se presente): funzionante" },
{ id: "posizione_prone", text: "Posizione prona (se presente): corretta" },
],
measures: [
{ id: "altezza_min", name: "Altezza minima dal suolo", unit: "cm", expected: "≤ 40 cm (accessibilità)", value: "" },
{ id: "altezza_max", name: "Altezza massima dal suolo", unit: "cm", expected: "secondo costruttore", value: "" },
{ id: "angolo_schienale", name: "Angolo massimo schienale", unit: "°", expected: "≥ 75°", limitVal: 75, invertPass: true, value: "" },
]
},
{
id: "sicurezza_letto", title: "Sicurezza e carichi",
items: [
{ id: "carico_max", text: "Carico massimo: etichetta presente e leggibile" },
{ id: "arresto_emerg", text: "Tasto di arresto emergenza (se presente): funzionante" },
{ id: "sovraccarico", text: "Protezione da sovraccarico: attiva" },
{ id: "cpe", text: "Sistema CPR/RCP (tasto emergenza schienale piatto): funzionante e raggiungibile" },
]
},
]
},
"generico": {
label: "Apparecchio generico", icon: "›", norm: "IEC 60601-1 generale",
sections: [
{
id: "ispezione", title: "Ispezione visiva e meccanica",
items: [
{ id: "cavo_al", text: "Cavo alimentazione e spina: integri" },
{ id: "involucro", text: "Involucro: privo di danni meccanici visibili" },
{ id: "acc", text: "Accessori e cavi paziente: integrità isolamento e connettori" },
{ id: "etichette", text: "Etichette identificazione, classe, tensione: presenti e leggibili" },
{ id: "ventilazione", text: "Aperture di ventilazione: libere, non ostruite" },
]
},
{
id: "funz_gen", title: "Verifica funzionale generale",
items: [
{ id: "accensione", text: "Accensione regolare: nessun messaggio di errore" },
{ id: "autotest", text: "Autotest (se previsto): superato" },
{ id: "funzione_1", text: "Funzione principale 1: operativa e conforme alle specifiche" },
{ id: "funzione_2", text: "Funzione principale 2: operativa" },
{ id: "allarmi", text: "Sistema allarmi: funzionante (visivo e acustico)" },
{ id: "display", text: "Display e interfaccia: leggibili e funzionanti" },
]
},
{
id: "misure_gen", title: "Misure (compilare secondo tipo apparecchio)",
measures: [
{ id: "misura_1", name: "Misura 1 (specificare)", unit: "", expected: "secondo costruttore", value: "" },
{ id: "misura_2", name: "Misura 2 (specificare)", unit: "", expected: "secondo costruttore", value: "" },
{ id: "misura_3", name: "Misura 3 (specificare)", unit: "", expected: "secondo costruttore", value: "" },
]
},
]
},
};
const FUNC_TEMPLATE_MAP = [
{ keys: ["defibrillatore manuale", "defib manual", "cardioversore"], id: "defibrillatore" },
{ keys: ["dae", "aed", "defibrillatore automatico", "defibrillatore semiautomatico"], id: "dae" },
{ keys: ["aspiratore chirurgico", "aspiratore mucosità", "aspiratore secreti", "aspiratore"], id: "aspiratore_chirurgico" },
{ keys: ["elettrobisturi", "bisturi elettrico", "hf chirurgico", "chirurgia hf"], id: "elettrobisturi" },
{ keys: ["monitor multipar", "monitor paziente", "multiparametrico", "bedside monitor"], id: "monitor_multipar" },
{ keys: ["ventilatore", "respiratore", "polmonare"], id: "ventilatore" },
{ keys: ["pompa infus", "siringa infus", "infusore", "syringe pump"], id: "pompa_infusionale" },
{ keys: ["ecografo", "ecografia", "ultrasound"], id: "ecografo" },
{ keys: ["letto elettr", "barella motor"], id: "letto_elettrico" },
];
function guessTemplate(assetName) {
if (!assetName)
return "generico";
const n = assetName.toLowerCase();
for (const { keys, id } of FUNC_TEMPLATE_MAP) {
if (keys.some(k => n.includes(k)))
return id;
}
return "generico";
}
const HELP_SECTIONS = [
{
icon: "◈", title: "Dashboard", color: "#2DD4BF",
steps: [
"La dashboard mostra i KPI principali: job aperti, urgenti, fatture in sospeso, verifiche IEC effettuate.",
"I riquadri colorati mostrano lo stato del parco macchine in tempo reale.",
"Il grafico a barre mostra i ricavi mensili dell'anno selezionato.",
"In basso trovi gli apparecchi con manutenzione in scadenza — clicca una riga per aprire la scheda.",
]
},
{
icon: "›", title: "Apparecchi (Parco Macchine)", color: "#2DD4BF",
steps: [
"Ogni riga rappresenta un apparecchio. Clicca ✏ per modificare, ✕ per eliminare.",
"DOPPIO CLICK su una riga per aprire la Scheda Dettaglio completa: dati tecnici, tutti i job, verifiche IEC e funzionali.",
"Dalla scheda puoi aprire + Job, Verifica IEC o  Verifica Funzionale direttamente per quell'apparecchio.",
"Compila sempre: Classe di rischio (A/B/C), Norma IEC, Data acquisto, Scadenza garanzia, Prossimo servizio.",
"Il badge alert (rosso/arancione/verde) mostra i giorni alla prossima manutenzione.",
]
},
{
icon: "›", title: "Job / Interventi", color: "#f59e0b",
steps: [
"Un Job è qualsiasi intervento su un apparecchio: correttivo, preventivo, verifica, calibrazione.",
"Crea un nuovo job con + Nuovo, oppure direttamente dalla scheda apparecchio.",
"Usa la Timeline (·) per aggiungere step datati: arrivo, diagnosi, riparazione, collaudo.",
"Aggiungi le parti usate con relativo costo — il totale job si calcola automaticamente.",
"Quando una Verifica IEC o Funzionale viene salvata, crea automaticamente un job 'chiuso' collegato.",
]
},
{
icon: "›", title: "Verifiche IEC (Sicurezza Elettrica)", color: "#2DD4BF",
steps: [
"Seleziona l'apparecchio, poi scegli Norma (IEC 62353 per elettromedicali, IEC 61010 per laboratorio).",
"Scegli la Classe: I (con PE), II (doppio isolamento, no PE), III (SELV, alimentazione interna).",
"Le misure cambiano automaticamente in base alla classe — i limiti sono quelli normativi.",
"Per Classe I/II scegli il Tipo parte paziente: B (≤100µA), BF (≤100µA isolato), CF (≤10µA cardiaco).",
"Ogni misura mostra PASS ✓ o FAIL ✗ in tempo reale mentre digiti il valore.",
"Salvando: si crea un Job collegato e si aggiorna il Prossimo Servizio a +1 anno.",
"Il PDF include intestazione, dati apparecchio, ispezione visiva, tabella misure e firma tecnico.",
]
},
{
icon: "›", title: "Verifiche Funzionali", color: "#0D9488",
steps: [
"Apri una nuova verifica e seleziona l'apparecchio — il template viene auto-rilevato dal nome.",
"Template disponibili: Defibrillatore manuale (IEC 60601-2-4), DAE (CEI 62-13), Aspiratore chirurgico, Elettrobisturi (IEC 60601-2-2), Monitor multipar., Ventilatore (ISO 80601-2-12), Pompa infusionale (IEC 60601-2-24), Ecografo (IEC 60601-2-37), Generico.",
"Per ogni sezione: spunta ✓/✗/N/D ogni voce, inserisci i valori numerici delle misure.",
"L'esito CONFORME/NON CONFORME si aggiorna in automatico man mano che compili.",
"Salvando: si crea un Job collegato con esito nella descrizione.",
]
},
{
icon: "›", title: "Pianificazione Annuale", color: "#f59e0b",
steps: [
"Mostra tutti gli apparecchi con Prossimo Servizio nell'anno selezionato, raggruppati per mese.",
"Si popola automaticamente quando salvi una Verifica IEC (nextService = +1 anno stesso mese).",
"Puoi anche impostare manualmente la data 'Prossimo servizio' nella scheda apparecchio.",
"Clicca Verifica su una riga per aprire subito il form IEC per quell'apparecchio.",
"Esporta il CSV per avere il piano annuale in Excel.",
]
},
{
icon: "›", title: "Magazzino (Stock, Ordini, Scarichi)", color: "#a855f7",
steps: [
"Stock Parti: tieni traccia delle parti di ricambio con quantità, costo acquisto e prezzo vendita.",
"Imposta la Quantità minima — le righe sotto soglia diventano gialle come alert.",
"Ordini Fornitori: crea un ordine e quando arriva clicca ✓ Ricevuto per aggiornare lo stock.",
"Scarichi: registra l'uscita manuale di parti dal magazzino collegandole a un apparecchio.",
"Il margine (vendita - acquisto) viene calcolato automaticamente per ogni parte.",
]
},
{
icon: "›", title: "Fatture", color: "#2DD4BF",
steps: [
"Crea una fattura manualmente oppure importa le righe da un job esistente.",
"Ogni riga ha descrizione, quantità, prezzo unitario e aliquota IVA — il totale è automatico.",
"Cambia stato: bozza → emessa → pagata.",
"Clicca  per generare il PDF professionale con intestazione, tabella voci e totali.",
]
},
{
icon: "›", title: "Analytics", color: "#22c55e",
steps: [
"Filtra per anno e mese per vedere ricavi, IVA, costo parti e margine lordo.",
"Il grafico mostra i ricavi mese per mese per l'anno selezionato.",
"I dati si basano sulle fatture emesse nel periodo filtrato.",
]
},
{
icon: "", title: "Backup e Ripristino", color: "#64748b",
steps: [
"Vai in Impostazioni (⚙ in fondo alla sidebar) per esportare il backup completo.",
"Il backup include TUTTO: apparecchi, job, parti, ordini, clienti, fatture, verifiche IEC e funzionali.",
"Clicca 'Esporta backup' → si apre il pannello con il JSON completo.",
"Clicca  Copia tutto, poi apri Blocco Note, incolla e salva come 4service-backup.json.",
"Per ripristinare: Impostazioni → Importa backup → seleziona il file .json salvato.",
"Fai il backup regolarmente — i dati sono salvati nel browser e potrebbero perdersi se svuoti la cache.",
]
},
];
function HelpTab({ helpOpen, setHelpOpen }) {
return (React.createElement("div", { style: { maxWidth: 860, margin: "0 auto" } },
React.createElement("div", { style: { marginBottom: 24 } },
React.createElement("h1", { style: { margin: "0 0 4px", fontSize: 22, fontWeight: 900, color: "#F0F0F5" } }, " Guida all'uso"),
React.createElement("p", { style: { color: "#5A5A70", margin: 0, fontSize: 13 } }, "Tutorial completo per usare MedTrace \u2014 clicca una sezione per espanderla")),
HELP_SECTIONS.map((section, si) => {
const isOpen = helpOpen[si] !== false && (helpOpen[si] === true || si === 0);
return (React.createElement("div", { key: si, style: { marginBottom: 10, background: "#141418", border: "1px solid #2A2A38", borderRadius: 12, overflow: "hidden" } },
React.createElement("button", { onClick: () => setHelpOpen(o => (Object.assign(Object.assign({}, o), { [si]: !isOpen }))), style: { width: "100%", background: "none", border: "none", padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" } },
React.createElement("span", { style: { fontSize: 20 } }, section.icon),
React.createElement("span", { style: { flex: 1, fontSize: 14, fontWeight: 700, color: "#F0F0F5" } }, section.title),
React.createElement("span", { style: { color: "#5A5A70", fontSize: 16, transition: "transform .2s", transform: isOpen ? "rotate(180deg)" : "none" } }, "\u25BE")),
isOpen && (React.createElement("div", { style: { padding: "0 18px 16px 18px", borderTop: "1px solid #2A2A38" } },
React.createElement("ol", { style: { margin: "12px 0 0", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 } }, section.steps.map((step, i) => (React.createElement("li", { key: i, style: { fontSize: 13, color: "#9090A8", lineHeight: 1.6, paddingLeft: 4 } },
React.createElement("span", { style: { color: "#F0F0F5" } }, step)))))))));
}),
React.createElement("div", { style: { marginTop: 20, background: "#0D948818", border: "1px solid #0D948844", borderRadius: 10, padding: "14px 18px" } },
React.createElement("div", { style: { fontWeight: 700, color: "#2DD4BF", marginBottom: 6, fontSize: 13 } }, "Nota"),
React.createElement("p", { style: { color: "#9090A8", fontSize: 12, margin: 0, lineHeight: 1.7 } },
"Per ogni apparecchio il flusso ideale \u00E8: ",
React.createElement("strong", { style: { color: "#F0F0F5" } }, "1. Crea apparecchio"),
" \u2192 ",
React.createElement("strong", { style: { color: "#F0F0F5" } }, "2. Esegui Verifica IEC"),
" \u2192 ",
React.createElement("strong", { style: { color: "#F0F0F5" } }, "3. Esegui Verifica Funzionale"),
" \u2192 il sistema crea automaticamente i job e pianifica la manutenzione dell'anno successivo."))));
}
const TH_S = { background: "#0F0F14", color: "#64748b", padding: "8px 10px", textAlign: "left", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: .7, borderBottom: "2px solid #1e2a3a", borderRight: "1px solid #141e2e", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none", position: "sticky", top: 0, zIndex: 2 };
const TD_S = { padding: "7px 10px", borderBottom: "1px solid #1A1A24", borderRight: "1px solid #1A1A24", fontSize: 12, color: "#C8C8D8", whiteSpace: "nowrap", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "middle" };
function ExcelTable({ cols, rows, onEdit, onDelete, actions, defaultSort, rowBg, onRowClick }) {
var _a;
const [sort, setSort] = React.useState({ key: defaultSort || ((_a = cols[0]) === null || _a === void 0 ? void 0 : _a.key), dir: "asc" });
const [filters, setFilters] = React.useState({});
const [gs, setGs] = React.useState("");
const setF = (k, v) => setFilters(f => (Object.assign(Object.assign({}, f), { [k]: v })));
const clearF = () => { setFilters({}); setGs(""); };
const hasF = Object.values(filters).some(v => v) || gs;
const filtered = React.useMemo(() => {
let r = rows;
if (gs) {
const q = gs.toLowerCase();
r = r.filter(row => cols.some(c => String(row[c.key] || "").toLowerCase().includes(q)));
}
Object.entries(filters).forEach(([k, v]) => { if (!v)
return; r = r.filter(row => String(row[k] || "").toLowerCase().includes(v.toLowerCase())); });
return [...r].sort((a, b) => {
let av = a[sort.key] || "", bv = b[sort.key] || "";
if (!isNaN(av) && !isNaN(bv)) {
av = +av;
bv = +bv;
}
if (av < bv)
return sort.dir === "asc" ? -1 : 1;
if (av > bv)
return sort.dir === "asc" ? 1 : -1;
return 0;
});
}, [rows, filters, gs, sort]);
const toggleSort = k => setSort(s => s.key === k ? Object.assign(Object.assign({}, s), { dir: s.dir === "asc" ? "desc" : "asc" }) : { key: k, dir: "asc" });
return (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", background: "#0F0F14", border: "1px solid #1e2a3a", borderBottom: "none", borderRadius: "10px 10px 0 0", flexWrap: "wrap" } },
React.createElement("input", { placeholder: " Cerca\u2026", value: gs, onChange: e => setGs(e.target.value), style: { background: "#16161C", border: "1px solid #1e2a3a", borderRadius: 6, padding: "5px 10px", color: "#e2e8f0", fontSize: 12, outline: "none", width: 200 } }),
hasF && React.createElement("button", { onClick: clearF, style: { background: "none", border: "1px solid #ef444433", borderRadius: 5, color: "#ef4444", padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700 } }, "\u2715 Azzera"),
React.createElement("span", { style: { marginLeft: "auto", fontSize: 11, color: "#475569", fontFamily: "monospace" } },
filtered.length,
"/",
rows.length)),
React.createElement("div", { style: { overflow: "auto", border: "1px solid #1e2a3a", borderRadius: "0 0 10px 10px", background: "#111116", maxHeight: "65vh" } },
React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "monospace" } },
React.createElement("thead", null,
React.createElement("tr", null,
cols.map(c => (React.createElement("th", { key: c.key, style: Object.assign(Object.assign({}, TH_S), { color: sort.key === c.key ? "#5EEAD4" : "#64748b" }), onClick: () => toggleSort(c.key) },
c.label,
" ",
React.createElement("span", { style: { fontSize: 9, opacity: .6 } }, sort.key === c.key ? (sort.dir === "asc" ? "▲" : "▼") : "⇅")))),
(onEdit || onDelete || actions) && React.createElement("th", { style: Object.assign(Object.assign({}, TH_S), { cursor: "default" }) }, "Azioni")),
React.createElement("tr", null,
cols.map(c => (React.createElement("td", { key: c.key, style: { padding: "3px 5px", background: "#090910", borderBottom: "2px solid #2563eb" } }, c.opts ? (React.createElement("select", { value: filters[c.key] || "", onChange: e => setF(c.key, e.target.value), style: { background: "#16161C", border: "1px solid #1e2a3a", borderRadius: 4, padding: "3px 6px", color: "#e2e8f0", fontSize: 11, width: "100%", outline: "none" } },
React.createElement("option", { value: "" }, "Tutti"),
c.opts.map(o => React.createElement("option", { key: o, value: o }, o)))) : (React.createElement("input", { placeholder: "\u2026", value: filters[c.key] || "", onChange: e => setF(c.key, e.target.value), style: { background: "#16161C", border: "1px solid #1e2a3a", borderRadius: 4, padding: "3px 6px", color: "#e2e8f0", fontSize: 11, width: "100%", outline: "none" } }))))),
(onEdit || onDelete || actions) && React.createElement("td", { style: { padding: "3px 5px", background: "#090910", borderBottom: "2px solid #2563eb" } }))),
React.createElement("tbody", null, filtered.length === 0 ? (React.createElement("tr", null,
React.createElement("td", { colSpan: cols.length + (onEdit || onDelete || actions ? 1 : 0), style: { textAlign: "center", padding: 32, color: "#475569" } }, "Nessun risultato"))) : filtered.map((row, i) => {
const bg = rowBg ? rowBg(row) : "";
return (React.createElement("tr", { key: row.id || i, style: { background: bg, cursor: onRowClick ? "pointer" : undefined }, onDoubleClick: onRowClick ? () => onRowClick(row) : undefined },
cols.map(c => (React.createElement("td", { key: c.key, style: Object.assign({}, TD_S), title: String(row[c.key] || "") }, c.render ? c.render(row[c.key], row) : String(row[c.key] || "—")))),
(onEdit || onDelete || actions) && (React.createElement("td", { style: Object.assign(Object.assign({}, TD_S), { whiteSpace: "nowrap" }) },
React.createElement("div", { style: { display: "flex", gap: 4 } },
actions && actions(row),
onEdit && React.createElement("button", { onClick: () => onEdit(row), style: { background: "#202028", border: "1px solid #2a3040", borderRadius: 5, color: "#94a3b8", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }, "\u270F"),
onDelete && React.createElement("button", { onClick: () => onDelete(row.id), style: { background: "#ef444415", border: "1px solid #ef444430", borderRadius: 5, color: "#ef4444", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }, "\u2715"))))));
}))))));
}
function AlertChip({ days }) {
if (days === null || days === undefined)
return React.createElement("span", { style: { color: "#475569", fontSize: 11 } }, "\u2014");
const [bg, col, label] = days < 0 ? ["#ef444420", "#ef4444", "SCAD." + (Math.abs(days)) + "gg"] : days === 0 ? ["#ef444420", "#ef4444", "OGGI"] : days <= 7 ? ["#f9730020", "#f97316", "⚠" + (days) + "gg"] : days <= 30 ? ["#f59e0b20", "#f59e0b", (days) + "gg"] : ["#22c55e20", "#22c55e", (days) + "gg"];
return React.createElement("span", { style: { background: bg, color: col, border: "1px solid " + (col) + "44", borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 700, fontFamily: "monospace", whiteSpace: "nowrap" } }, label);
}
const Badge = ({ text, color }) => (React.createElement("span", { style: { background: color + "18", color, border: "1px solid " + (color) + "40", borderRadius: 20, padding: "2px 10px", fontSize: 10, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", whiteSpace: "nowrap" } }, text));
const Pill = ({ label, value, color, sub }) => (React.createElement("div", { style: { background: "#141418", border: "1px solid #2A2A38", borderTop: "3px solid " + (color || "#2DD4BF"), borderRadius: 10, padding: "12px 16px", flex: 1, minWidth: 110, boxShadow: "0 2px 8px #0006" } },
React.createElement("div", { style: { fontSize: 22, fontWeight: 900, color: color || "#F0F0F5", lineHeight: 1, fontFamily: "monospace" } }, value),
React.createElement("div", { style: { fontSize: 10, color: "#5A5A70", marginTop: 5, textTransform: "uppercase", letterSpacing: .7, fontWeight: 600 } }, label),
sub && React.createElement("div", { style: { fontSize: 9, color: "#3A3A50", marginTop: 2 } }, sub)));
function Btn(_a) {
var { children, variant = "primary", sm } = _a, props = __rest(_a, ["children", "variant", "sm"]);
const base = { borderRadius: 8, cursor: "pointer", fontWeight: 700, transition: "all .15s", border: "none", display: "inline-flex", alignItems: "center", gap: 6, letterSpacing: .2 };
const vars = {
primary: { background: "linear-gradient(135deg,#2DD4BF,#0D9488)", color: "#fff", boxShadow: "0 2px 8px #2DD4BF44" },
success: { background: "#15803d22", color: "#22c55e", border: "1px solid #22c55e44" },
danger: { background: "#ef444422", color: "#ef4444", border: "1px solid #ef444433" },
ghost: { background: "transparent", color: "#9090A8", border: "1px solid #32323F" },
warning: { background: "#f59e0b22", color: "#f59e0b", border: "1px solid #f59e0b44" },
};
return (React.createElement("button", Object.assign({}, props, { style: Object.assign(Object.assign(Object.assign(Object.assign({}, base), vars[variant]), { padding: sm ? "6px 12px" : "9px 18px", fontSize: sm ? 12 : 13 }), props.style) }), children));
}
function Inp(_a) {
var { label } = _a, p = __rest(_a, ["label"]);
return (React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 5 } },
label && React.createElement("span", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 } }, label),
React.createElement("input", Object.assign({}, p, { style: Object.assign({ background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", outline: "none", width: "100%", boxSizing: "border-box" }, (p.style || {})) }))));
}
function Sel(_a) {
var { label, children } = _a, p = __rest(_a, ["label", "children"]);
return (React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 5 } },
label && React.createElement("span", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 } }, label),
React.createElement("select", Object.assign({}, p, { style: { background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", outline: "none", width: "100%", boxSizing: "border-box" } }), children)));
}
function Txt(_a) {
var { label } = _a, p = __rest(_a, ["label"]);
return (React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 5 } },
label && React.createElement("span", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 } }, label),
React.createElement("textarea", Object.assign({}, p, { style: { background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", minHeight: 64 } }))));
}
function Modal({ title, onClose, wide, children }) {
return (React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000c", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }, onClick: e => e.target === e.currentTarget && onClose() },
React.createElement("div", { style: { background: "#18181F", border: "1px solid #2a3040", borderRadius: 16, width: wide ? "min(820px,97vw)" : "min(640px,97vw)", maxHeight: "93vh", overflowY: "auto", padding: "22px 22px" } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } },
React.createElement("span", { style: { fontWeight: 800, fontSize: 16 } }, title),
React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", color: "#64748b", fontSize: 24, cursor: "pointer", lineHeight: 1, padding: 0 } }, "\u00D7")),
children)));
}
function Grid({ cols, gap = 14, children }) {
const isMobile = useMedia("(max-width:600px)");
return React.createElement("div", { style: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : cols, gap } }, children);
}
function Span2({ children }) {
const isMobile = useMedia("(max-width:600px)");
return React.createElement("div", { style: { gridColumn: isMobile ? "span 1" : "span 2" } }, children);
}
function EmptyState({ icon, title, message, action }) {
return (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 42, marginBottom: 12, opacity: .55 } }, icon),
React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } }, title),
React.createElement("div", { style: { fontSize: 12, color: "#475569", marginBottom: 18 } }, message),
action));
}
function BarChart({ data, height = 160, color = "#2DD4BF" }) {
if (!data.length)
return null;
const max = Math.max(...data.map(d => d.value), 1);
return (React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 6, height, padding: "10px 0" } }, data.map((d, i) => (React.createElement("div", { key: i, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 0 } },
React.createElement("div", { style: { fontSize: 10, color: "#94a3b8", fontWeight: 700 } }, d.value > 0 ? "€" + (d.value.toFixed(0)) : ""),
React.createElement("div", { style: { width: "100%", maxWidth: 40, background: color, opacity: .7, height: ((d.value / max) * 100) + "%", minHeight: 2, borderRadius: "4px 4px 0 0", transition: "height .3s" } }),
React.createElement("div", { style: { fontSize: 10, color: "#64748b", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" } }, d.label))))));
}
function AssetCard({ a, customer, onEdit, onDelete, onHistory }) {
return (React.createElement("div", { style: { background: "#1E1E28", borderRadius: 12, padding: "14px 16px", border: "1px solid #2a3040", marginBottom: 8 } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 10 } },
React.createElement("div", { style: { minWidth: 0 } },
React.createElement("div", { style: { fontWeight: 700, fontSize: 15 } }, a.name),
React.createElement("div", { style: { fontSize: 11, color: "#64748b", marginTop: 2 } },
a.id,
" \u00B7 ",
a.brand,
" ",
a.model)),
React.createElement(Badge, { text: a.status, color: STATUS_COLOR[a.status] || "#64748b" })),
React.createElement("div", { style: { display: "flex", gap: 14, fontSize: 12, color: "#94a3b8", flexWrap: "wrap", marginBottom: 12 } },
(customer === null || customer === void 0 ? void 0 : customer.name) && React.createElement("span", null,
" ",
customer.name),
a.location && React.createElement("span", null,
"\u00B7 ",
a.location),
a.nextService && React.createElement("span", null,
" ",
a.nextService)),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => onHistory(a) }, " Storico"),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => onEdit(a) }, "\u270F Modifica"),
React.createElement(Btn, { sm: true, variant: "danger", onClick: () => onDelete(a.id) }, "\u2715"))));
}
function JobCard({ j, assets, parts, customers, onEdit, onDelete, onPDF, onTimeline }) {
var _a, _b;
const asset = assets.find(a => a.id === j.assetId) || {};
const customer = customers.find(c => c.id === (j.customerId || asset.customerId));
const total = j.parts.reduce((s, p) => { const pt = parts.find(x => x.id === p.partId); return s + (pt ? (pt.sellPrice || pt.unitPrice) * p.qty : 0); }, 0) + j.laborHours * j.laborRate;
const tlCount = ((_a = j.timeline) === null || _a === void 0 ? void 0 : _a.length) || 0;
const photoCount = ((_b = j.photos) === null || _b === void 0 ? void 0 : _b.length) || 0;
return (React.createElement("div", { style: { background: "#1E1E28", borderRadius: 12, padding: "14px 16px", border: "1px solid " + (PRI_COLOR[j.priority]) + "33", marginBottom: 8 } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 10 } },
React.createElement("div", null,
React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } },
React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, j.id),
React.createElement(Badge, { text: j.status, color: STATUS_COLOR[j.status] || "#64748b" }),
React.createElement(Badge, { text: j.priority, color: PRI_COLOR[j.priority] || "#64748b" })),
React.createElement("div", { style: { fontWeight: 700, fontSize: 14, marginTop: 4 } }, asset.name || j.assetId),
(customer === null || customer === void 0 ? void 0 : customer.name) && React.createElement("div", { style: { fontSize: 11, color: "#64748b", marginTop: 2 } },
" ",
customer.name)),
total > 0 && React.createElement("span", { style: { color: "#a855f7", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" } },
"\u20AC",
total.toFixed(0))),
React.createElement("div", { style: { fontSize: 12, color: "#94a3b8", marginBottom: 12, lineHeight: 1.4 } },
j.description.slice(0, 90),
j.description.length > 90 ? "…" : ""),
(tlCount > 0 || photoCount > 0) && (React.createElement("div", { style: { display: "flex", gap: 10, fontSize: 11, color: "#64748b", marginBottom: 10 } },
tlCount > 0 && React.createElement("span", null,
"\u00B7 ",
tlCount,
" step"),
photoCount > 0 && React.createElement("span", null,
" ",
photoCount,
" foto"))),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => onTimeline(j) }, "\u00B7 Timeline"),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => onPDF(j) }, " PDF"),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => onEdit(j) }, "\u270F Modifica"),
React.createElement(Btn, { sm: true, variant: "danger", onClick: () => onDelete(j.id) }, "\u2715"))));
}
function PartCard({ p, onEdit, onDelete }) {
const low = p.qty <= p.minQty;
const sellPrice = p.sellPrice || p.unitPrice;
const margin = sellPrice - p.unitPrice;
return (React.createElement("div", { style: { background: "#1E1E28", borderRadius: 12, padding: "14px 16px", border: "1px solid " + (low ? "#f59e0b33" : "#32323F"), marginBottom: 8 } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, gap: 10 } },
React.createElement("div", { style: { minWidth: 0 } },
React.createElement("div", { style: { fontWeight: 700, fontSize: 14 } }, p.name),
React.createElement("div", { style: { fontSize: 11, color: "#64748b", marginTop: 2 } },
p.code,
" \u00B7 ",
p.brand)),
React.createElement("span", { style: { fontWeight: 800, fontSize: 20, color: p.qty === 0 ? "#ef4444" : low ? "#f59e0b" : "#22c55e" } }, p.qty)),
React.createElement("div", { style: { display: "flex", gap: 14, fontSize: 12, color: "#94a3b8", marginBottom: 10, flexWrap: "wrap" } },
React.createElement("span", null,
"Costo: \u20AC",
p.unitPrice.toFixed(2)),
React.createElement("span", { style: { color: "#a855f7" } },
"Vendita: \u20AC",
sellPrice.toFixed(2)),
margin > 0 && React.createElement("span", { style: { color: "#22c55e" } },
"+\u20AC",
margin.toFixed(2)),
p.location && React.createElement("span", null, p.location)),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => onEdit(p) }, "\u270F"),
React.createElement(Btn, { sm: true, variant: "danger", onClick: () => onDelete(p.id) }, "\u2715"))));
}
function CustomerCard({ c, assets, onEdit, onDelete }) {
const count = assets.filter(a => a.customerId === c.id).length;
return (React.createElement("div", { style: { background: "#1E1E28", borderRadius: 12, padding: "14px 16px", border: "1px solid #2a3040", marginBottom: 8 } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 10 } },
React.createElement("div", null,
React.createElement("div", { style: { fontWeight: 700, fontSize: 15 } }, c.name),
React.createElement("div", { style: { fontSize: 11, color: "#64748b", marginTop: 2 } },
c.id,
" ",
c.vat && "· P.IVA " + (c.vat))),
React.createElement(Badge, { text: (count) + " apparec.", color: "#2DD4BF" })),
React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#94a3b8", marginBottom: 10 } },
c.address && React.createElement("span", null,
"\u00B7 ",
c.address),
c.contact && React.createElement("span", null, c.contact),
c.email && React.createElement("span", null, c.email),
c.phone && React.createElement("span", null,
" ",
c.phone)),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => onEdit(c) }, "\u270F Modifica"),
React.createElement(Btn, { sm: true, variant: "danger", onClick: () => onDelete(c.id) }, "\u2715"))));
}
function CustomerForm({ initial, onSave, onClose }) {
const blank = { name: "", vat: "", fiscalCode: "", address: "", contact: "", email: "", phone: "", notes: "" };
const [f, setF] = React.useState(initial || blank);
const s = k => e => setF(x => (Object.assign(Object.assign({}, x), { [k]: e.target.value })));
return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
React.createElement(Grid, { cols: "1fr 1fr" },
React.createElement(Span2, null,
React.createElement(Inp, { label: "Ragione sociale", value: f.name, onChange: s("name") })),
React.createElement(Inp, { label: "Partita IVA", value: f.vat, onChange: s("vat") }),
React.createElement(Inp, { label: "Codice fiscale", value: f.fiscalCode, onChange: s("fiscalCode") }),
React.createElement(Span2, null,
React.createElement(Inp, { label: "Indirizzo", value: f.address, onChange: s("address") })),
React.createElement(Inp, { label: "Referente", value: f.contact, onChange: s("contact") }),
React.createElement(Inp, { label: "Email", value: f.email, onChange: s("email") }),
React.createElement(Inp, { label: "Telefono", value: f.phone, onChange: s("phone") }),
React.createElement("div", null),
React.createElement(Span2, null,
React.createElement(Txt, { label: "Note", value: f.notes, onChange: s("notes") }))),
React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Annulla"),
React.createElement(Btn, { onClick: () => onSave(f) }, "Salva"))));
}
function AssetForm({ initial, customers, onSave, onClose }) {
const blank = { name: "", brand: "", model: "", serial: "", location: "", customerId: "", status: "operativo", lastService: "", nextService: "", serviceInterval: 6, notes: "" };
const [f, setF] = React.useState(initial || blank);
const s = k => e => setF(x => (Object.assign(Object.assign({}, x), { [k]: e.target.value })));
return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
React.createElement(Grid, { cols: "1fr 1fr" },
React.createElement(Inp, { label: "Nome apparecchio", value: f.name, onChange: s("name") }),
React.createElement(Inp, { label: "Marca", value: f.brand, onChange: s("brand") }),
React.createElement(Inp, { label: "Modello", value: f.model, onChange: s("model") }),
React.createElement(Inp, { label: "Numero di serie", value: f.serial, onChange: s("serial") }),
React.createElement(Sel, { label: "Cliente / Struttura", value: f.customerId, onChange: s("customerId") },
React.createElement("option", { value: "" }, "\u2014 Nessuno \u2014"),
customers.map(c => React.createElement("option", { key: c.id, value: c.id }, c.name))),
React.createElement(Inp, { label: "Ubicazione", value: f.location, onChange: s("location") }),
React.createElement(Sel, { label: "Stato", value: f.status, onChange: s("status") }, ["operativo", "in manutenzione", "fuori servizio"].map(v => React.createElement("option", { key: v }, v))),
React.createElement(Inp, { label: "Intervallo manutenz. (mesi)", type: "number", value: f.serviceInterval, onChange: s("serviceInterval") }),
React.createElement(Inp, { label: "Ultimo servizio", type: "date", value: f.lastService, onChange: s("lastService") }),
React.createElement(Inp, { label: "Prossimo servizio", type: "date", value: f.nextService, onChange: s("nextService") }),
React.createElement(Sel, { label: "Norma sicurezza", value: f.iecNorm || "62353", onChange: e => setF(x => (Object.assign(Object.assign({}, x), { iecNorm: e.target.value }))) },
React.createElement("option", { value: "62353" }, "IEC 62353 \u2014 Elettromedicale"),
React.createElement("option", { value: "61010" }, "IEC 61010-1 \u2014 Laboratorio"),
React.createElement("option", { value: "" }, "Non applicabile")),
React.createElement(Sel, { label: "Classe di rischio", value: f.riskClass || "", onChange: s("riskClass") },
React.createElement("option", { value: "" }, "\u2014"),
React.createElement("option", { value: "A" }, "Classe A \u2014 Basso rischio"),
React.createElement("option", { value: "B" }, "Classe B \u2014 Medio rischio"),
React.createElement("option", { value: "C" }, "Classe C \u2014 Alto rischio")),
React.createElement(Inp, { label: "Data acquisto", type: "date", value: f.purchaseDate || "", onChange: s("purchaseDate") }),
React.createElement(Inp, { label: "Scadenza garanzia", type: "date", value: f.warrantyExpiry || "", onChange: s("warrantyExpiry") }),
React.createElement(Span2, null,
React.createElement(Inp, { label: "Contratto assistenza / Fornitore servizio", value: f.serviceContract || "", onChange: s("serviceContract") })),
React.createElement(Span2, null,
React.createElement(Txt, { label: "Note", value: f.notes, onChange: s("notes") }))),
React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Annulla"),
React.createElement(Btn, { onClick: () => onSave(Object.assign(Object.assign({}, f), { serviceInterval: +f.serviceInterval })) }, "Salva"))));
}
function PartForm({ initial, assets, onSave, onClose }) {
const blank = { code: "", name: "", brand: "", compatible: [], qty: 0, minQty: 0, unitPrice: 0, sellPrice: 0, markupPct: 30, location: "", notes: "" };
const [f, setF] = React.useState(initial ? Object.assign(Object.assign({}, initial), { sellPrice: initial.sellPrice || initial.unitPrice, markupPct: initial.markupPct || 0 }) : blank);
const s = k => e => setF(x => (Object.assign(Object.assign({}, x), { [k]: e.target.value })));
const toggle = id => setF(x => (Object.assign(Object.assign({}, x), { compatible: x.compatible.includes(id) ? x.compatible.filter(c => c !== id) : [...x.compatible, id] })));
const applyMarkup = () => {
const cost = +f.unitPrice;
const pct = +f.markupPct;
setF(x => (Object.assign(Object.assign({}, x), { sellPrice: +(cost * (1 + pct / 100)).toFixed(2) })));
};
return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
React.createElement(Grid, { cols: "1fr 1fr" },
React.createElement(Inp, { label: "Codice parte", value: f.code, onChange: s("code") }),
React.createElement(Inp, { label: "Nome", value: f.name, onChange: s("name") }),
React.createElement(Inp, { label: "Marca", value: f.brand, onChange: s("brand") }),
React.createElement(Inp, { label: "Ubicazione magazzino", value: f.location, onChange: s("location") }),
React.createElement(Inp, { label: "Quantit\u00E0", type: "number", value: f.qty, onChange: s("qty") }),
React.createElement(Inp, { label: "Quantit\u00E0 minima", type: "number", value: f.minQty, onChange: s("minQty") }),
React.createElement(Inp, { label: "Prezzo di acquisto (\u20AC)", type: "number", step: "0.01", value: f.unitPrice, onChange: s("unitPrice") }),
React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "end" } },
React.createElement("div", { style: { flex: 1 } },
React.createElement(Inp, { label: "Markup %", type: "number", value: f.markupPct, onChange: s("markupPct") })),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: applyMarkup, style: { padding: "10px 12px" } }, "Applica")),
React.createElement(Span2, null,
React.createElement(Inp, { label: "Prezzo di vendita (\u20AC)", type: "number", step: "0.01", value: f.sellPrice, onChange: s("sellPrice") })),
assets.length > 0 && (React.createElement(Span2, null,
React.createElement("span", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, display: "block", marginBottom: 8 } }, "Apparecchi compatibili"),
React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, assets.map(a => (React.createElement("button", { key: a.id, onClick: () => toggle(a.id), style: { background: f.compatible.includes(a.id) ? "#2DD4BF22" : "#1E1E28", border: "1px solid " + (f.compatible.includes(a.id) ? "#2DD4BF" : "#32323F"), color: f.compatible.includes(a.id) ? "#5EEAD4" : "#64748b", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12 } },
a.id,
" \u2014 ",
a.name)))))),
React.createElement(Span2, null,
React.createElement(Txt, { label: "Note", value: f.notes, onChange: s("notes") }))),
React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Annulla"),
React.createElement(Btn, { onClick: () => onSave(Object.assign(Object.assign({}, f), { qty: +f.qty, minQty: +f.minQty, unitPrice: +f.unitPrice, sellPrice: +f.sellPrice, markupPct: +f.markupPct })) }, "Salva"))));
}
function JobForm({ initial, assets, parts, customers, onSave, onClose }) {
var _a;
const blank = { assetId: ((_a = assets[0]) === null || _a === void 0 ? void 0 : _a.id) || "", customerId: "", type: "correttiva", priority: "normale", status: "aperto", assignee: "", openDate: new Date().toISOString().slice(0, 10), closeDate: "", description: "", parts: [], laborHours: 0, laborRate: 55, notes: "", timeline: [], photos: [] };
const [f, setF] = React.useState(initial ? Object.assign(Object.assign({}, initial), { timeline: initial.timeline || [], photos: initial.photos || [] }) : blank);
const s = k => e => setF(x => (Object.assign(Object.assign({}, x), { [k]: e.target.value })));
const addPart = () => setF(x => { var _a; return (Object.assign(Object.assign({}, x), { parts: [...x.parts, { partId: ((_a = parts[0]) === null || _a === void 0 ? void 0 : _a.id) || "", qty: 1 }] })); });
const remPart = i => setF(x => (Object.assign(Object.assign({}, x), { parts: x.parts.filter((_, idx) => idx !== i) })));
const setPart = (i, k, v) => setF(x => { const a = [...x.parts]; a[i] = Object.assign(Object.assign({}, a[i]), { [k]: k === "qty" ? +v : v }); return Object.assign(Object.assign({}, x), { parts: a }); });
const partsTot = f.parts.reduce((s, p) => { const pt = parts.find(x => x.id === p.partId); return s + (pt ? (pt.sellPrice || pt.unitPrice) * p.qty : 0); }, 0);
const laborTot = +f.laborHours * +f.laborRate;
if (assets.length === 0) {
return (React.createElement("div", { style: { textAlign: "center", padding: "20px 0", color: "#94a3b8" } },
"Devi prima registrare almeno un apparecchio.",
React.createElement("div", { style: { marginTop: 14 } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Chiudi"))));
}
return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
React.createElement(Grid, { cols: "1fr 1fr" },
React.createElement(Sel, { label: "Apparecchio", value: f.assetId, onChange: s("assetId") }, assets.map(a => React.createElement("option", { key: a.id, value: a.id },
a.id,
" \u2014 ",
a.name))),
React.createElement(Sel, { label: "Cliente (opzionale)", value: f.customerId, onChange: s("customerId") },
React.createElement("option", { value: "" }, "\u2014 Auto da apparecchio \u2014"),
customers.map(c => React.createElement("option", { key: c.id, value: c.id }, c.name))),
React.createElement(Sel, { label: "Tipo", value: f.type, onChange: s("type") }, ["correttiva", "preventiva", "verifica", "calibrazione"].map(v => React.createElement("option", { key: v }, v))),
React.createElement(Sel, { label: "Priorit\u00E0", value: f.priority, onChange: s("priority") }, ["urgente", "alta", "normale", "bassa"].map(v => React.createElement("option", { key: v }, v))),
React.createElement(Sel, { label: "Stato", value: f.status, onChange: s("status") }, ["aperto", "in corso", "chiuso"].map(v => React.createElement("option", { key: v }, v))),
React.createElement(Inp, { label: "Tecnico", value: f.assignee, onChange: s("assignee") }),
React.createElement(Inp, { label: "Data apertura", type: "date", value: f.openDate, onChange: s("openDate") }),
React.createElement(Inp, { label: "Data chiusura", type: "date", value: f.closeDate, onChange: s("closeDate") }),
React.createElement(Span2, null,
React.createElement(Txt, { label: "Descrizione", value: f.description, onChange: s("description") }))),
parts.length > 0 && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } },
React.createElement("span", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 } }, "Parti"),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: addPart }, "+ Aggiungi")),
f.parts.map((p, i) => (React.createElement("div", { key: i, style: { display: "grid", gridTemplateColumns: "1fr 80px auto", gap: 8, marginBottom: 8 } },
React.createElement("select", { value: p.partId, onChange: e => setPart(i, "partId", e.target.value), style: { background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "9px 10px", color: "#e2e8f0" } }, parts.map(pt => React.createElement("option", { key: pt.id, value: pt.id },
pt.code,
" \u2014 ",
pt.name,
" (\u20AC",
pt.sellPrice || pt.unitPrice,
")"))),
React.createElement("input", { type: "number", min: 1, value: p.qty, onChange: e => setPart(i, "qty", e.target.value), style: { background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "9px 10px", color: "#e2e8f0" } }),
React.createElement(Btn, { variant: "danger", sm: true, onClick: () => remPart(i) }, "\u2715")))))),
React.createElement(Grid, { cols: "1fr 1fr" },
React.createElement(Inp, { label: "Ore manodopera", type: "number", step: "0.5", value: f.laborHours, onChange: s("laborHours") }),
React.createElement(Inp, { label: "Tariffa oraria (\u20AC)", type: "number", value: f.laborRate, onChange: s("laborRate") })),
React.createElement("div", { style: { background: "#0D0D12", borderRadius: 10, padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: 20 } },
React.createElement("span", { style: { color: "#64748b", fontSize: 12 } },
"Parti: ",
React.createElement("strong", { style: { color: "#e2e8f0" } },
"\u20AC",
partsTot.toFixed(2))),
React.createElement("span", { style: { color: "#64748b", fontSize: 12 } },
"Manodopera: ",
React.createElement("strong", { style: { color: "#e2e8f0" } },
"\u20AC",
laborTot.toFixed(2))),
React.createElement("span", { style: { color: "#64748b", fontSize: 12 } },
"Totale: ",
React.createElement("strong", { style: { color: "#22c55e", fontSize: 15 } },
"\u20AC",
(partsTot + laborTot).toFixed(2)))),
React.createElement(Txt, { label: "Note", value: f.notes, onChange: s("notes") }),
React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Annulla"),
React.createElement(Btn, { onClick: () => onSave(Object.assign(Object.assign({}, f), { laborHours: +f.laborHours, laborRate: +f.laborRate })) }, "Salva"))));
}
function OrderForm({ initial, parts, onSave, onClose }) {
var _a;
const blank = { supplier: "", partId: ((_a = parts[0]) === null || _a === void 0 ? void 0 : _a.id) || "", qty: 1, unitPrice: 0, status: "in attesa", orderDate: new Date().toISOString().slice(0, 10), expectedDate: "", notes: "" };
const [f, setF] = React.useState(initial || blank);
const s = k => e => setF(x => (Object.assign(Object.assign({}, x), { [k]: e.target.value })));
React.useEffect(() => { if (!initial) {
const pt = parts.find(x => x.id === f.partId);
if (pt)
setF(x => (Object.assign(Object.assign({}, x), { unitPrice: pt.unitPrice })));
} }, [f.partId]);
if (parts.length === 0) {
return (React.createElement("div", { style: { textAlign: "center", padding: "20px 0", color: "#94a3b8" } },
"Devi prima registrare almeno una parte.",
React.createElement("div", { style: { marginTop: 14 } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Chiudi"))));
}
return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
React.createElement(Grid, { cols: "1fr 1fr" },
React.createElement(Inp, { label: "Fornitore", value: f.supplier, onChange: s("supplier") }),
React.createElement(Sel, { label: "Parte", value: f.partId, onChange: s("partId") }, parts.map(p => React.createElement("option", { key: p.id, value: p.id },
p.code,
" \u2014 ",
p.name))),
React.createElement(Inp, { label: "Quantit\u00E0", type: "number", value: f.qty, onChange: s("qty") }),
React.createElement(Inp, { label: "Prezzo unitario (\u20AC)", type: "number", step: "0.01", value: f.unitPrice, onChange: s("unitPrice") }),
React.createElement(Sel, { label: "Stato ordine", value: f.status, onChange: s("status") }, ["in attesa", "confermato", "spedito", "ricevuto", "annullato"].map(v => React.createElement("option", { key: v }, v))),
React.createElement("div", null),
React.createElement(Inp, { label: "Data ordine", type: "date", value: f.orderDate, onChange: s("orderDate") }),
React.createElement(Inp, { label: "Data prevista consegna", type: "date", value: f.expectedDate, onChange: s("expectedDate") }),
React.createElement(Span2, null,
React.createElement(Txt, { label: "Note", value: f.notes, onChange: s("notes") }))),
React.createElement("div", { style: { background: "#0D0D12", borderRadius: 10, padding: "12px 16px" } },
React.createElement("span", { style: { color: "#64748b", fontSize: 12 } },
"Valore ordine: ",
React.createElement("strong", { style: { color: "#a855f7", fontSize: 15 } },
"\u20AC",
(+f.qty * (+f.unitPrice)).toFixed(2)))),
React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Annulla"),
React.createElement(Btn, { onClick: () => onSave(Object.assign(Object.assign({}, f), { qty: +f.qty, unitPrice: +f.unitPrice })) }, "Salva"))));
}
function InvoiceForm({ initial, customers, jobs, assets, parts, generateNumber, onSave, onClose }) {
var _a;
const blank = {
number: generateNumber(),
customerId: ((_a = customers[0]) === null || _a === void 0 ? void 0 : _a.id) || "",
date: new Date().toISOString().slice(0, 10),
dueDate: "",
status: "bozza",
items: [],
jobIds: [],
paymentTerms: "Bonifico bancario a 30gg data fattura",
notes: ""
};
const [f, setF] = React.useState(initial || blank);
const s = k => e => setF(x => (Object.assign(Object.assign({}, x), { [k]: e.target.value })));
const addItem = () => setF(x => (Object.assign(Object.assign({}, x), { items: [...x.items, { description: "", qty: 1, unitPrice: 0, vat: IVA_DEFAULT }] })));
const remItem = i => setF(x => (Object.assign(Object.assign({}, x), { items: x.items.filter((_, idx) => idx !== i) })));
const setItem = (i, k, v) => setF(x => { const a = [...x.items]; a[i] = Object.assign(Object.assign({}, a[i]), { [k]: k === "qty" || k === "unitPrice" || k === "vat" ? +v : v }); return Object.assign(Object.assign({}, x), { items: a }); });
const importFromJob = (jobId) => {
const job = jobs.find(j => j.id === jobId);
if (!job)
return;
const asset = assets.find(a => a.id === job.assetId);
const newItems = [];
job.parts.forEach(p => {
const pt = parts.find(x => x.id === p.partId);
if (pt)
newItems.push({
description: (pt.name) + " (" + (pt.code) + ")",
qty: p.qty, unitPrice: pt.sellPrice || pt.unitPrice, vat: IVA_DEFAULT
});
});
if (job.laborHours > 0) {
newItems.push({
description: "Manodopera - " + ((asset === null || asset === void 0 ? void 0 : asset.name) || "intervento") + " (rif. " + (job.id) + ")",
qty: job.laborHours, unitPrice: job.laborRate, vat: IVA_DEFAULT
});
}
setF(x => (Object.assign(Object.assign({}, x), { items: [...x.items, ...newItems], jobIds: x.jobIds.includes(jobId) ? x.jobIds : [...x.jobIds, jobId], customerId: x.customerId || job.customerId || (asset === null || asset === void 0 ? void 0 : asset.customerId) || x.customerId })));
};
const subtotal = f.items.reduce((s, it) => s + it.qty * it.unitPrice, 0);
const totalVAT = f.items.reduce((s, it) => s + (it.qty * it.unitPrice * it.vat / 100), 0);
const grandTotal = subtotal + totalVAT;
const customerJobs = jobs.filter(j => {
if (j.status !== "chiuso")
return false;
const asset = assets.find(a => a.id === j.assetId);
return (j.customerId || (asset === null || asset === void 0 ? void 0 : asset.customerId)) === f.customerId;
});
return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
React.createElement(Grid, { cols: "1fr 1fr" },
React.createElement(Inp, { label: "Numero fattura", value: f.number, onChange: s("number") }),
React.createElement(Sel, { label: "Stato", value: f.status, onChange: s("status") }, ["bozza", "emessa", "pagata", "scaduta", "annullato"].map(v => React.createElement("option", { key: v }, v))),
React.createElement(Sel, { label: "Cliente", value: f.customerId, onChange: s("customerId") },
React.createElement("option", { value: "" }, "\u2014 Seleziona \u2014"),
customers.map(c => React.createElement("option", { key: c.id, value: c.id }, c.name))),
React.createElement("div", null),
React.createElement(Inp, { label: "Data fattura", type: "date", value: f.date, onChange: s("date") }),
React.createElement(Inp, { label: "Data scadenza", type: "date", value: f.dueDate, onChange: s("dueDate") })),
f.customerId && customerJobs.length > 0 && (React.createElement("div", { style: { background: "#0D0D12", borderRadius: 10, padding: "10px 14px", border: "1px solid #2a3040" } },
React.createElement("div", { style: { fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 8 } }, "Job chiusi del cliente"),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, customerJobs.map(j => {
const used = f.jobIds.includes(j.id);
return (React.createElement("button", { key: j.id, onClick: () => !used && importFromJob(j.id), disabled: used, style: {
background: used ? "#22c55e22" : "#1E1E28",
border: "1px solid " + (used ? "#22c55e44" : "#32323F"),
color: used ? "#22c55e" : "#94a3b8", borderRadius: 8, padding: "5px 10px", cursor: used ? "default" : "pointer", fontSize: 11
} },
used ? "✓ " : "+ ",
j.id));
})))),
React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } },
React.createElement("span", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 } }, "Righe fattura"),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: addItem }, "+ Riga")),
f.items.map((it, i) => (React.createElement("div", { key: i, style: { background: "#141418", borderRadius: 8, padding: 10, marginBottom: 8, display: "grid", gridTemplateColumns: "1fr 70px 90px 60px auto", gap: 6, alignItems: "center" } },
React.createElement("input", { value: it.description, onChange: e => setItem(i, "description", e.target.value), placeholder: "Descrizione", style: { background: "#1E1E28", border: "1px solid #2a3040", borderRadius: 6, padding: "7px 9px", color: "#e2e8f0", outline: "none", minWidth: 0 } }),
React.createElement("input", { type: "number", value: it.qty, onChange: e => setItem(i, "qty", e.target.value), placeholder: "Q.t\u00E0", step: "0.5", style: { background: "#1E1E28", border: "1px solid #2a3040", borderRadius: 6, padding: "7px 9px", color: "#e2e8f0", outline: "none" } }),
React.createElement("input", { type: "number", value: it.unitPrice, onChange: e => setItem(i, "unitPrice", e.target.value), placeholder: "\u20AC", step: "0.01", style: { background: "#1E1E28", border: "1px solid #2a3040", borderRadius: 6, padding: "7px 9px", color: "#e2e8f0", outline: "none" } }),
React.createElement("input", { type: "number", value: it.vat, onChange: e => setItem(i, "vat", e.target.value), placeholder: "IVA%", style: { background: "#1E1E28", border: "1px solid #2a3040", borderRadius: 6, padding: "7px 9px", color: "#e2e8f0", outline: "none" } }),
React.createElement(Btn, { sm: true, variant: "danger", onClick: () => remItem(i) }, "\u2715")))),
f.items.length === 0 && React.createElement("div", { style: { textAlign: "center", color: "#475569", padding: "16px 0", fontSize: 12 } }, "Nessuna riga. Aggiungi a mano o importa da un job.")),
React.createElement("div", { style: { background: "#0D0D12", borderRadius: 10, padding: "14px 16px" } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 } },
React.createElement("span", { style: { color: "#94a3b8" } }, "Imponibile"),
React.createElement("span", { style: { color: "#e2e8f0", fontWeight: 700 } },
"\u20AC",
subtotal.toFixed(2))),
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 } },
React.createElement("span", { style: { color: "#94a3b8" } }, "IVA"),
React.createElement("span", { style: { color: "#e2e8f0", fontWeight: 700 } },
"\u20AC",
totalVAT.toFixed(2))),
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 16, paddingTop: 8, borderTop: "1px solid #2a3040" } },
React.createElement("span", { style: { color: "#94a3b8", fontWeight: 700 } }, "TOTALE"),
React.createElement("span", { style: { color: "#22c55e", fontWeight: 800 } },
"\u20AC",
grandTotal.toFixed(2)))),
React.createElement(Inp, { label: "Modalit\u00E0 di pagamento", value: f.paymentTerms, onChange: s("paymentTerms") }),
React.createElement(Txt, { label: "Note", value: f.notes, onChange: s("notes") }),
React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Annulla"),
React.createElement(Btn, { onClick: () => onSave(f) }, "Salva"))));
}
function TimelineModal({ job, parts, onSave, onClose }) {
const [steps, setSteps] = React.useState(job.timeline || []);
const [photos, setPhotos] = React.useState(job.photos || []);
const [newStep, setNewStep] = React.useState({ date: new Date().toISOString().slice(0, 10), type: "intervento", note: "", hours: 0 });
const [uploading, setUploading] = React.useState(false);
const fileInputRef = React.useRef();
const addStep = () => {
if (!newStep.note.trim()) {
return;
}
setSteps(s => [...s, Object.assign(Object.assign({}, newStep), { id: Date.now(), hours: +newStep.hours })]);
setNewStep({ date: new Date().toISOString().slice(0, 10), type: newStep.type, note: "", hours: 0 });
};
const removeStep = id => setSteps(s => s.filter(x => x.id !== id));
const uploadPhotos = (e) => __awaiter(this, void 0, void 0, function* () {
const files = Array.from(e.target.files || []);
if (!files.length)
return;
setUploading(true);
try {
const newPhotos = [];
for (const file of files) {
if (!file.type.startsWith("image/")) {
continue;
}
try {
const dataUrl = yield compressImage(file);
newPhotos.push({ id: Date.now() + Math.random(), name: file.name, data: dataUrl, date: new Date().toISOString().slice(0, 10) });
}
catch (err) {
console.error("Errore compressione", err);
}
}
setPhotos(p => [...p, ...newPhotos]);
}
finally {
setUploading(false);
if (fileInputRef.current)
fileInputRef.current.value = "";
}
});
const removePhoto = id => setPhotos(p => p.filter(x => x.id !== id));
const sortedSteps = [...steps].sort((a, b) => a.date.localeCompare(b.date));
return (React.createElement(Modal, { title: "Timeline & Foto — " + (job.id), wide: true, onClose: onClose },
React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 18 } },
React.createElement("div", null,
React.createElement("div", { style: { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 10 } }, "\u00B7 Cronologia Intervento"),
sortedSteps.length === 0 && React.createElement("div", { style: { textAlign: "center", color: "#475569", padding: "16px 0", fontSize: 12 } }, "Nessuno step ancora."),
sortedSteps.map((step, i) => (React.createElement("div", { key: step.id, style: { display: "flex", gap: 14, marginBottom: 14, position: "relative" } },
React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" } },
React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "#2DD4BF22", border: "1px solid #2563eb44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 } }, TIMELINE_ICON[step.type] || "·"),
i < sortedSteps.length - 1 && React.createElement("div", { style: { width: 2, flex: 1, background: "#32323F", marginTop: 4 } })),
React.createElement("div", { style: { flex: 1, background: "#141418", borderRadius: 8, padding: "10px 14px", border: "1px solid #2a3040" } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, gap: 8, flexWrap: "wrap" } },
React.createElement("div", null,
React.createElement("span", { style: { color: "#5EEAD4", fontWeight: 700, fontSize: 13 } }, TIMELINE_LABEL[step.type] || step.type),
React.createElement("span", { style: { color: "#64748b", fontSize: 11, marginLeft: 8 } }, step.date)),
React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
step.hours > 0 && React.createElement("span", { style: { color: "#a855f7", fontSize: 11, fontWeight: 700 } },
step.hours,
"h"),
React.createElement(Btn, { sm: true, variant: "danger", onClick: () => removeStep(step.id), style: { padding: "2px 8px", fontSize: 11 } }, "\u2715"))),
React.createElement("div", { style: { color: "#e2e8f0", fontSize: 13, lineHeight: 1.4 } }, step.note))))),
React.createElement("div", { style: { background: "#0D0D12", borderRadius: 10, padding: 14, border: "1px dashed #2a3040", marginTop: 12 } },
React.createElement("div", { style: { fontSize: 11, color: "#64748b", marginBottom: 10, fontWeight: 700 } }, "+ Nuovo step"),
React.createElement(Grid, { cols: "1fr 1fr 80px" },
React.createElement(Sel, { label: "Tipo evento", value: newStep.type, onChange: e => setNewStep(x => (Object.assign(Object.assign({}, x), { type: e.target.value }))) }, Object.entries(TIMELINE_LABEL).map(([k, v]) => React.createElement("option", { key: k, value: k },
TIMELINE_ICON[k],
" ",
v))),
React.createElement(Inp, { label: "Data", type: "date", value: newStep.date, onChange: e => setNewStep(x => (Object.assign(Object.assign({}, x), { date: e.target.value }))) }),
React.createElement(Inp, { label: "Ore", type: "number", step: "0.5", value: newStep.hours, onChange: e => setNewStep(x => (Object.assign(Object.assign({}, x), { hours: e.target.value }))) })),
React.createElement("div", { style: { marginTop: 10 } },
React.createElement(Txt, { label: "Descrizione", value: newStep.note, onChange: e => setNewStep(x => (Object.assign(Object.assign({}, x), { note: e.target.value }))) })),
React.createElement("div", { style: { marginTop: 10, textAlign: "right" } },
React.createElement(Btn, { sm: true, onClick: addStep }, "+ Aggiungi step")))),
React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } },
React.createElement("span", { style: { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 } },
" Foto Allegate (",
photos.length,
")"),
React.createElement("label", null,
React.createElement("input", { ref: fileInputRef, type: "file", accept: "image/*", multiple: true, onChange: uploadPhotos, style: { display: "none" } }),
React.createElement("span", { style: { background: "#1E1E28", color: "#94a3b8", border: "1px solid #2a3040", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, display: "inline-block" } }, uploading ? "Caricamento..." : "+ Aggiungi foto"))),
photos.length === 0 ? (React.createElement("div", { style: { textAlign: "center", color: "#475569", padding: "16px 0", fontSize: 12 } }, "Nessuna foto. Le foto vengono compresse automaticamente per risparmiare memoria.")) : (React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 } }, photos.map(photo => (React.createElement("div", { key: photo.id, style: { position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: "1px solid #2a3040" } },
React.createElement("img", { src: photo.data, alt: photo.name, style: { width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }, onClick: () => window.open(photo.data, "_blank") }),
React.createElement("button", { onClick: () => removePhoto(photo.id), style: { position: "absolute", top: 4, right: 4, background: "#ef4444", border: "none", color: "#fff", borderRadius: "50%", width: 24, height: 24, cursor: "pointer", fontSize: 14, fontWeight: 700 } }, "\u00D7"))))))),
React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Annulla"),
React.createElement(Btn, { variant: "success", onClick: () => onSave({ timeline: steps, photos }) }, "\u2713 Salva tutto")))));
}
function WithdrawalModal({ parts, assets, onWithdraw, onClose }) {
var _a, _b;
const [items, setItems] = React.useState([{ partId: ((_a = parts[0]) === null || _a === void 0 ? void 0 : _a.id) || "", qty: 1 }]);
const [reason, setReason] = React.useState("");
const [assetId, setAssetId] = React.useState(((_b = assets[0]) === null || _b === void 0 ? void 0 : _b.id) || "");
const [tech, setTech] = React.useState("");
const addRow = () => setItems(i => { var _a; return [...i, { partId: ((_a = parts[0]) === null || _a === void 0 ? void 0 : _a.id) || "", qty: 1 }]; });
const remRow = i => setItems(a => a.filter((_, idx) => idx !== i));
const setRow = (i, k, v) => setItems(a => { const r = [...a]; r[i] = Object.assign(Object.assign({}, r[i]), { [k]: k === "qty" ? +v : v }); return r; });
const total = items.reduce((s, r) => { const p = parts.find(x => x.id === r.partId); return s + (p ? p.unitPrice * r.qty : 0); }, 0);
const submit = () => {
const err = items.some(r => { const p = parts.find(x => x.id === r.partId); return !p || r.qty < 1 || r.qty > p.qty; });
if (err) {
return;
}
onWithdraw({ items, reason, assetId, tech, date: new Date().toISOString().slice(0, 10), total });
};
if (parts.length === 0 || assets.length === 0) {
return (React.createElement(Modal, { title: " Scarico Stock", onClose: onClose },
React.createElement("div", { style: { textAlign: "center", padding: "20px 0", color: "#94a3b8" } },
"Servono almeno un apparecchio e una parte.",
React.createElement("div", { style: { marginTop: 14 } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Chiudi")))));
}
return (React.createElement(Modal, { title: " Scarico Stock", wide: true, onClose: onClose },
React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
React.createElement(Grid, { cols: "1fr 1fr" },
React.createElement(Sel, { label: "Apparecchio", value: assetId, onChange: e => setAssetId(e.target.value) }, assets.map(a => React.createElement("option", { key: a.id, value: a.id },
a.id,
" \u2014 ",
a.name))),
React.createElement(Inp, { label: "Tecnico", value: tech, onChange: e => setTech(e.target.value) }),
React.createElement(Span2, null,
React.createElement(Inp, { label: "Motivo / Riferimento", value: reason, onChange: e => setReason(e.target.value) }))),
React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8 } },
React.createElement("span", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 } }, "Parti"),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: addRow }, "+ Aggiungi")),
items.map((row, i) => {
const p = parts.find(x => x.id === row.partId);
return (React.createElement("div", { key: i, style: { display: "grid", gridTemplateColumns: "1fr 70px 80px auto", gap: 6, marginBottom: 8, alignItems: "center" } },
React.createElement("select", { value: row.partId, onChange: e => setRow(i, "partId", e.target.value), style: { background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "9px 10px", color: "#e2e8f0", minWidth: 0 } }, parts.map(pt => React.createElement("option", { key: pt.id, value: pt.id },
pt.code,
" \u2014 ",
pt.name))),
React.createElement("input", { type: "number", value: row.qty, min: 1, max: p === null || p === void 0 ? void 0 : p.qty, onChange: e => setRow(i, "qty", e.target.value), style: { background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "9px 10px", color: "#e2e8f0" } }),
React.createElement("span", { style: { color: "#a855f7", fontWeight: 700, fontSize: 12 } },
"\u20AC",
p ? (p.unitPrice * row.qty).toFixed(2) : "0"),
React.createElement(Btn, { sm: true, variant: "danger", onClick: () => remRow(i) }, "\u2715")));
}),
React.createElement("div", { style: { textAlign: "right", marginTop: 8 } },
React.createElement("span", { style: { color: "#64748b", fontSize: 12 } }, "Totale: "),
React.createElement("span", { style: { color: "#22c55e", fontWeight: 800, fontSize: 16 } },
"\u20AC",
total.toFixed(2)))),
React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Annulla"),
React.createElement(Btn, { variant: "success", onClick: submit }, "\u2713 Conferma")))));
}
function AssetDetailModal({ asset, jobs, parts, iecReports, funcReports, customers, onClose, onEditAsset, onNewJob, onNewIec, onNewFunc, onOpenJob, company, generateJobPDF, generateIECPDF, generateFuncPDF }) {
const [tab, setTab] = React.useState("overview");
const customer = customers.find(c => c.id === asset.customerId) || null;
const assetJobs = jobs
.filter(j => j.assetId === asset.id)
.sort((a, b) => b.openDate.localeCompare(a.openDate));
const assetIec = iecReports
.filter(r => r.assetId === asset.id)
.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
const assetFunc = funcReports
.filter(r => r.assetId === asset.id)
.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
const totalCost = assetJobs.reduce((s, j) => {
const p = j.parts.reduce((s2, p) => { const pt = parts.find(x => x.id === p.partId); return s2 + (pt ? (pt.sellPrice || pt.unitPrice) * p.qty : 0); }, 0);
return s + p + j.laborHours * j.laborRate;
}, 0);
const openJobs = assetJobs.filter(j => j.status !== "chiuso");
const lastIec = assetIec[0] || null;
const lastFunc = assetFunc[0] || null;
const warrantyDays = asset.warrantyExpiry ? Math.round((new Date(asset.warrantyExpiry) - new Date()) / 86400000) : null;
const serviceDays = asset.nextService ? Math.round((new Date(asset.nextService) - new Date()) / 86400000) : null;
const S = { background: "#141418", border: "1px solid #1e2a3a", borderRadius: 10, padding: "14px 16px" };
const LBL = { fontSize: 9, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 3 };
const VAL = { fontSize: 13, color: "#e2e8f0", fontWeight: 600 };
const TABS = [{ id: "overview", label: " Scheda" }, { id: "jobs", label: " Job (" + assetJobs.length + ")" }, { id: "iec", label: "⚡ IEC (" + assetIec.length + ")" }, { id: "func", label: "Funzionale (" + assetFunc.length + ")" }];
const riskColor = { A: "#22c55e", B: "#f59e0b", C: "#ef4444" };
return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 0, minHeight: 0 } },
React.createElement("div", { style: { background: "linear-gradient(135deg,#1e3a8a,#1e2a5a)", borderRadius: 10, padding: "16px 18px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" } },
React.createElement("div", { style: { flex: 1, minWidth: 0 } },
React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 } },
React.createElement("span", { style: { fontSize: 20, fontWeight: 900, color: "#fff" } }, asset.name),
asset.riskClass && React.createElement("span", { style: { background: riskColor[asset.riskClass] + "33", color: riskColor[asset.riskClass], border: "1px solid " + riskColor[asset.riskClass] + "55", borderRadius: 5, padding: "2px 8px", fontSize: 10, fontWeight: 700 } },
"Cl. ",
asset.riskClass),
React.createElement(Badge, { text: asset.status, color: STATUS_COLOR[asset.status] || "#64748b" })),
React.createElement("div", { style: { fontSize: 12, color: "#99F6E4", marginBottom: 2 } },
asset.brand,
" ",
asset.model),
React.createElement("div", { style: { fontSize: 11, color: "#64748b", fontFamily: "monospace" } },
"S/N: ",
asset.serial || "—",
" \u00B7 ID: ",
asset.id),
customer && React.createElement("div", { style: { fontSize: 11, color: "#94a3b8", marginTop: 4 } },
" ",
customer.name)),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 } },
React.createElement("button", { onClick: onEditAsset, style: { background: "#ffffff18", color: "#fff", border: "1px solid #ffffff30", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontSize: 11, fontWeight: 700 } }, "\u270F Modifica"),
React.createElement("button", { onClick: onNewJob, style: { background: "#2DD4BF", color: "#fff", border: "none", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontSize: 11, fontWeight: 700 } }, "+ Job"),
React.createElement("button", { onClick: onNewIec, style: { background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontSize: 11, fontWeight: 700 } }, "\u26A1 IEC"),
React.createElement("button", { onClick: onNewFunc, style: { background: "#0891b2", color: "#fff", border: "none", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontSize: 11, fontWeight: 700 } }, "Funzionale"))),
React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" } }, [
{ label: "Job aperti", value: openJobs.length, color: openJobs.length > 0 ? "#f59e0b" : "#22c55e" },
{ label: "Job totali", value: assetJobs.length, color: "#2DD4BF" },
{ label: "Costo totale", value: "€" + totalCost.toFixed(0), color: "#a855f7" },
{ label: "Ultimo IEC", value: lastIec ? lastIec.date : "mai", color: (lastIec === null || lastIec === void 0 ? void 0 : lastIec.overallPass) ? "#22c55e" : "#ef4444" },
{ label: "Ultima verif.", value: lastFunc ? lastFunc.date : "mai", color: "#64748b" },
].map(k => (React.createElement("div", { key: k.label, style: { background: "#141418", border: "1px solid #1e2a3a", borderRadius: 8, padding: "8px 14px", flex: 1, minWidth: 100 } },
React.createElement("div", { style: { fontSize: 9, color: "#64748b", textTransform: "uppercase", letterSpacing: .7, fontWeight: 700 } }, k.label),
React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: k.color, marginTop: 2 } }, k.value))))),
React.createElement("div", { style: { display: "flex", gap: 4, marginBottom: 12, borderBottom: "2px solid #1e2a3a", paddingBottom: 0 } }, TABS.map(t => (React.createElement("button", { key: t.id, onClick: () => setTab(t.id), style: {
background: "none", border: "none", borderBottom: tab === t.id ? "2px solid #3b82f6" : "2px solid transparent",
color: tab === t.id ? "#5EEAD4" : "#64748b", padding: "7px 12px", cursor: "pointer",
fontSize: 12, fontWeight: tab === t.id ? 700 : 400, marginBottom: -2, whiteSpace: "nowrap"
} }, t.label)))),
tab === "overview" && (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12, overflow: "auto", maxHeight: "55vh" } },
React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
React.createElement("div", { style: S },
React.createElement("div", { style: LBL }, "Identificazione"),
[["Marca", asset.brand], ["Modello", asset.model], ["N° Serie", asset.serial], ["Ubicazione", asset.location], ["Norma IEC", asset.iecNorm]].map(([l, v]) => v ? (React.createElement("div", { key: l, style: { display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #1a2030" } },
React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, l),
React.createElement("span", { style: { fontSize: 11, color: "#e2e8f0", fontFamily: l === "N° Serie" ? "monospace" : "inherit" } }, v))) : null)),
React.createElement("div", { style: S },
React.createElement("div", { style: LBL }, "Date e contratti"),
[
["Acquisto", asset.purchaseDate],
["Scad. garanzia", asset.warrantyExpiry],
["Ultimo servizio", asset.lastService],
["Prossimo servizio", asset.nextService],
["Interv. (mesi)", asset.serviceInterval],
].map(([l, v]) => v ? (React.createElement("div", { key: l, style: { display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #1a2030" } },
React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, l),
React.createElement("span", { style: { fontSize: 11, color: l === "Scad. garanzia" && warrantyDays !== null && warrantyDays < 90 ? "#f59e0b" : "#e2e8f0" } }, v))) : null),
asset.serviceContract && (React.createElement("div", { style: { marginTop: 6, padding: "6px 8px", background: "#0D0D12", borderRadius: 6, fontSize: 10, color: "#94a3b8" } },
React.createElement("span", { style: { color: "#64748b", fontWeight: 700 } }, "Contratto: "),
asset.serviceContract)))),
serviceDays !== null && (React.createElement("div", { style: { background: serviceDays < 0 ? "#ef444415" : serviceDays <= 30 ? "#f59e0b15" : "#22c55e15", border: "1px solid " + (serviceDays < 0 ? "#ef444433" : serviceDays <= 30 ? "#f59e0b33" : "#22c55e33"), borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
React.createElement("span", { style: { fontSize: 12, color: "#94a3b8" } },
"Prossima manutenzione programmata: ",
React.createElement("strong", { style: { color: "#e2e8f0" } }, asset.nextService)),
React.createElement(AlertChip, { days: serviceDays }))),
asset.notes && React.createElement("div", { style: Object.assign(Object.assign({}, S), { fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }) },
React.createElement("div", { style: LBL }, "Note"),
asset.notes))),
tab === "jobs" && (React.createElement("div", { style: { overflow: "auto", maxHeight: "55vh", display: "flex", flexDirection: "column", gap: 8 } }, assetJobs.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: 32, color: "#475569" } }, "Nessun job per questo apparecchio")) : assetJobs.map(j => {
var _a;
const pCost = j.parts.reduce((s, p) => { const pt = parts.find(x => x.id === p.partId); return s + (pt ? (pt.sellPrice || pt.unitPrice) * p.qty : 0); }, 0);
const tot = pCost + j.laborHours * j.laborRate;
return (React.createElement("div", { key: j.id, style: { background: "#141418", border: "1px solid #1e2a3a", borderRadius: 8, padding: "10px 14px", cursor: "pointer" }, onClick: () => onOpenJob(j) },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" } },
React.createElement("div", { style: { flex: 1, minWidth: 0 } },
React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginBottom: 4 } },
React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#64748b" } }, j.id),
React.createElement(Badge, { text: j.status, color: STATUS_COLOR[j.status] || "#64748b" }),
React.createElement(Badge, { text: j.priority, color: PRI_COLOR[j.priority] || "#64748b" }),
React.createElement("span", { style: { fontSize: 11, color: "#64748b", textTransform: "capitalize" } }, j.type)),
React.createElement("div", { style: { fontSize: 12, color: "#94a3b8", marginBottom: 2 } }, j.description || "—"),
React.createElement("div", { style: { fontSize: 10, color: "#475569" } },
j.openDate,
j.closeDate ? " → " + j.closeDate : "",
" \u00B7 ",
j.assignee || "—")),
React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } },
React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: "#a855f7", fontFamily: "monospace" } },
"\u20AC",
tot.toFixed(0)),
((_a = j.timeline) === null || _a === void 0 ? void 0 : _a.length) > 0 && React.createElement("div", { style: { fontSize: 10, color: "#475569" } },
"\u00B7 ",
j.timeline.length,
" step"),
(j.iecReportId || j.funcReportId) && React.createElement("div", { style: { fontSize: 10, color: "#5EEAD4" } }, j.iecReportId ? "⚡" : "")))));
}))),
tab === "iec" && (React.createElement("div", { style: { overflow: "auto", maxHeight: "55vh", display: "flex", flexDirection: "column", gap: 8 } }, assetIec.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: 32, color: "#475569" } }, "Nessuna verifica IEC per questo apparecchio")) : assetIec.map(r => (React.createElement("div", { key: r.id, style: { background: "#141418", border: "1px solid " + (r.overallPass ? "#22c55e33" : "#ef444433"), borderRadius: 8, padding: "10px 14px" } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 } },
React.createElement("div", null,
React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", marginBottom: 3 } },
React.createElement("span", { style: { fontFamily: "monospace", fontWeight: 700, color: "#e2e8f0" } }, r.reportNumber || r.id),
React.createElement("span", { style: { fontSize: 10, color: "#64748b" } },
"IEC ",
r.norm,
" \u00B7 Cl.",
r.equipClass,
" \u00B7 ",
r.patientType || "BF")),
React.createElement("div", { style: { fontSize: 11, color: "#94a3b8" } },
r.date,
" \u00B7 ",
r.technician || "—",
" \u00B7 ",
r.verifyType),
r.notes && React.createElement("div", { style: { fontSize: 10, color: "#475569", marginTop: 3 } }, r.notes)),
React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } },
React.createElement("span", { style: { fontWeight: 800, fontSize: 13, color: r.overallPass ? "#22c55e" : "#ef4444" } }, r.overallPass ? "✓ OK" : "✗ NO"),
React.createElement("button", { onClick: () => generateIECPDF(r, asset, customer, company), style: { background: "#202028", border: "1px solid #2a3040", borderRadius: 5, color: "#5EEAD4", padding: "3px 8px", cursor: "pointer", fontSize: 11 } })))))))),
tab === "func" && (React.createElement("div", { style: { overflow: "auto", maxHeight: "55vh", display: "flex", flexDirection: "column", gap: 8 } }, assetFunc.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: 32, color: "#475569" } }, "Nessuna verifica funzionale per questo apparecchio")) : assetFunc.map(r => {
const tpl = (FUNC_TEMPLATES || {})[r.templateId] || { label: "Generico", icon: "›" };
return (React.createElement("div", { key: r.id, style: { background: "#141418", border: "1px solid " + (r.overallPass ? "#22c55e33" : "#ef444433"), borderRadius: 8, padding: "10px 14px" } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 } },
React.createElement("div", null,
React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", marginBottom: 3 } },
React.createElement("span", { style: { fontFamily: "monospace", fontWeight: 700, color: "#e2e8f0" } }, r.reportNumber || r.id),
React.createElement("span", { style: { fontSize: 11, color: "#64748b" } },
tpl.icon,
" ",
tpl.label)),
React.createElement("div", { style: { fontSize: 11, color: "#94a3b8" } },
r.date,
" \u00B7 ",
r.technician || "—"),
r.notes && React.createElement("div", { style: { fontSize: 10, color: "#475569", marginTop: 3 } }, r.notes)),
React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } },
React.createElement("span", { style: { fontWeight: 800, fontSize: 13, color: r.overallPass ? "#22c55e" : "#ef4444" } }, r.overallPass ? "✓ OK" : "✗ NO"),
React.createElement("button", { onClick: () => generateFuncPDF(r, asset, customer, company), style: { background: "#202028", border: "1px solid #2a3040", borderRadius: 5, color: "#5EEAD4", padding: "3px 8px", cursor: "pointer", fontSize: 11 } })))));
})))));
}
function HistoryModal({ asset, jobs, parts, onClose }) {
return null;
}
function SettingsModal({ data, company, onUpdateCompany, onImport, onMerge, onReset, onClose }) {
const [comp, setComp] = React.useState(company);
const s = k => e => setComp(x => (Object.assign(Object.assign({}, x), { [k]: e.target.value })));
const fileRef = e => {
var _a;
const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
if (!file)
return;
const reader = new FileReader();
reader.onload = ev => {
try {
const imported = JSON.parse(ev.target.result);
if (!imported.assets || !imported.parts) {
return;
}
onImport(imported);
}
catch (_a) { }
};
reader.readAsText(file);
};
return (React.createElement(Modal, { title: "\u2699 Impostazioni", wide: true, onClose: onClose },
React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } },
React.createElement("div", null,
React.createElement("div", { style: { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 10 } }, " Dati Azienda (per fatture e rapporti)"),
React.createElement(Grid, { cols: "1fr 1fr" },
React.createElement(Inp, { label: "Nome / Ragione sociale", value: comp.name, onChange: s("name") }),
React.createElement(Inp, { label: "Sottotitolo", value: comp.subtitle, onChange: s("subtitle") }),
React.createElement(Span2, null,
React.createElement(Inp, { label: "Indirizzo", value: comp.address, onChange: s("address") })),
React.createElement(Inp, { label: "P.IVA", value: comp.vat, onChange: s("vat") }),
React.createElement(Inp, { label: "IBAN", value: comp.iban, onChange: s("iban") }),
React.createElement(Span2, null,
React.createElement(Inp, { label: "Prefisso numerazione fatture", value: comp.invoicePrefix, onChange: s("invoicePrefix"), placeholder: "es: F" }))),
React.createElement("div", { style: { textAlign: "right", marginTop: 10 } },
React.createElement(Btn, { sm: true, onClick: () => { onUpdateCompany(comp); alert("Salvato!"); } }, "Salva dati azienda"))),
React.createElement("div", { style: { background: "#141418", borderRadius: 10, padding: "14px 16px", border: "1px solid #2a3040" } },
React.createElement("div", { style: { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 6 } }, " Dove sono i dati?"),
React.createElement("div", { style: { color: "#64748b", fontSize: 12, lineHeight: 1.5 } },
"Tutto ",
React.createElement("strong", { style: { color: "#94a3b8" } }, "localmente nel browser"),
". Nulla viene mandato online. Esporta backup periodici.")),
React.createElement("div", null,
React.createElement("div", { style: { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 8 } }, "Backup"),
React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
React.createElement(Btn, { variant: "ghost", onClick: () => downloadJSON("4service-backup-" + (new Date().toISOString().slice(0, 10)) + ".json", data) }, "\u2B07 Esporta backup"),
React.createElement("label", null,
React.createElement("input", { type: "file", accept: ".json", onChange: fileRef, style: { display: "none" } }),
React.createElement("span", { style: { background: "#1E1E28", color: "#94a3b8", border: "1px solid #2a3040", borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "inline-block" } }, "\u2B06 Importa backup")),
React.createElement("label", { title: "Aggiunge i record del file JSON ai tuoi senza cancellare niente" },
React.createElement("input", { type: "file", accept: ".json", onChange: e => {
var _a;
const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
if (!file)
return;
const reader = new FileReader();
reader.onload = ev => {
try {
const d = JSON.parse(ev.target.result);
onMerge(d);
}
catch (_a) { }
};
reader.readAsText(file);
e.target.value = '';
}, style: { display: "none" } }),
React.createElement("span", { style: { background: "#2DD4BF18", color: "#2DD4BF", border: "1px solid #2DD4BF44", borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700, display: "inline-block" } }, " Unisci backup")))),
React.createElement("div", null,
React.createElement("div", { style: { fontSize: 11, color: "#ef4444", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 8 } }, "\u26A0 Zona pericolosa"),
React.createElement(Btn, { variant: "danger", onClick: onReset }, " Reset completo")),
React.createElement("div", { style: { display: "flex", justifyContent: "flex-end" } },
React.createElement(Btn, { variant: "ghost", onClick: onClose }, "Chiudi")))));
}
function LoginScreen({ onLogin }) {
const [mode, setMode] = React.useState('login');
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState('');
const handle = () => __awaiter(this, void 0, void 0, function* () {
if (!email || !password) {
setError('Inserisci email e password');
return;
}
setLoading(true);
setError('');
try {
if (mode === 'register') {
const result = yield supaSignUp(email, password);
if (!result)
throw new Error('Supabase non disponibile');
if (result.error)
throw result.error;
setError('Controlla la tua email per confermare la registrazione');
setMode('login');
}
else {
const result = yield supaSignIn(email, password);
if (!result)
throw new Error('Supabase non disponibile');
if (result.error)
throw result.error;
onLogin(result.data.user);
}
}
catch (e) {
setError(e.message || 'Errore di autenticazione');
}
finally {
setLoading(false);
}
});
const INP = { width: '100%', background: '#0D0D12', border: '1px solid #2A2A38', borderRadius: 8, padding: '11px 14px', color: '#F0F0F5', fontSize: 15, outline: 'none', fontFamily: 'inherit' };
const LBL = { fontSize: 10, color: '#5A5A70', textTransform: 'uppercase', letterSpacing: .8, fontWeight: 700, display: 'block', marginBottom: 6 };
return (React.createElement("div", { style: { minHeight: '100vh', background: '#0D0D12', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 } },
React.createElement("div", { style: { width: '100%', maxWidth: 400 } },
React.createElement("div", { style: { textAlign: 'center', marginBottom: 40 } },
React.createElement("svg", { viewBox: "0 0 220 48", xmlns: "http://www.w3.org/2000/svg", style: { width: 200, height: 44 } },
React.createElement("g", { fill: "none", stroke: "#2DD4BF", strokeLinecap: "round", strokeLinejoin: "round" },
React.createElement("path", { d: "M6 24 Q11 14 16 24 Q21 34 26 24", strokeWidth: "2.5" }),
React.createElement("path", { d: "M1 24 Q9 10 16 24 Q23 38 31 24", strokeWidth: "2.5" }),
React.createElement("path", { d: "M-4 24 Q7 6 16 24 Q25 42 36 24", strokeWidth: "2.5" }),
React.createElement("circle", { cx: "42", cy: "24", r: "3.5", fill: "#2DD4BF", stroke: "none" })),
React.createElement("text", { x: "54", y: "28", fontFamily: "'Segoe UI',Arial,sans-serif", fontSize: "20", fontWeight: "800", fill: "#FFFFFF", letterSpacing: "-0.5" }, "4Service"),
React.createElement("text", { x: "54", y: "40", fontFamily: "'Segoe UI',Arial,sans-serif", fontSize: "8.5", fontWeight: "600", fill: "#5A5A70", letterSpacing: "1.5" }, "MEDICAL")),
React.createElement("p", { style: { color: '#5A5A70', fontSize: 11, marginTop: 10, letterSpacing: 1.5, textTransform: 'uppercase' } }, "Gestione Apparecchiature Elettromedicali")),
React.createElement("div", { style: { background: '#141418', border: '1px solid #2A2A38', borderRadius: 14, padding: 32 } },
React.createElement("h2", { style: { fontSize: 18, fontWeight: 800, marginBottom: 24, color: '#F0F0F5' } }, mode === 'login' ? 'Accedi' : 'Crea account'),
React.createElement("div", { style: { marginBottom: 16 } },
React.createElement("label", { style: LBL }, "Email"),
React.createElement("input", { type: "email", value: email, onChange: e => setEmail(e.target.value), onKeyDown: e => e.key === 'Enter' && handle(), placeholder: "tuaemail@esempio.com", style: INP })),
React.createElement("div", { style: { marginBottom: 24 } },
React.createElement("label", { style: LBL }, "Password"),
React.createElement("input", { type: "password", value: password, onChange: e => setPassword(e.target.value), onKeyDown: e => e.key === 'Enter' && handle(), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", style: INP })),
error && React.createElement("div", { style: { background: error.includes('email') ? '#2DD4BF18' : '#ef444418', border: `1px solid ${error.includes('email') ? '#2DD4BF44' : '#ef444444'}`, borderRadius: 8, padding: '10px 14px', fontSize: 13, color: error.includes('email') ? '#2DD4BF' : '#ef4444', marginBottom: 16 } }, error),
React.createElement("button", { onClick: handle, disabled: loading, style: { width: '100%', background: 'linear-gradient(135deg,#2DD4BF,#0D9488)', color: '#000', border: 'none', borderRadius: 8, padding: 13, fontSize: 14, fontWeight: 800, cursor: loading ? 'wait' : 'pointer', opacity: loading ? .7 : 1, fontFamily: 'inherit' } }, loading ? 'Caricamento…' : mode === 'login' ? 'Accedi' : 'Crea account'),
React.createElement("div", { style: { textAlign: 'center', marginTop: 18 } },
React.createElement("button", { onClick: () => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }, style: { background: 'none', border: 'none', color: '#5A5A70', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' } }, mode === 'login' ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'))),
React.createElement("p", { style: { textAlign: 'center', color: '#3A3A50', fontSize: 11, marginTop: 20 } }, "MedTrace \u00B7 Software gestione elettromedicali"))));
}
function AppMain() {
var _a, _b, _c, _d, _e;
const isMobile = useMedia("(max-width:768px)");
const initialData = loadData() || {
assets: [], parts: [], jobs: [], orders: [], withdrawals: [],
customers: [], invoices: [],
company: { name: "MedTrace", subtitle: "Gestione Apparecchiature Elettromedicali", address: "", vat: "", iban: "", invoicePrefix: "F" }
};
const [tab, setTab] = React.useState("dashboard");
const [assets, setAssets] = React.useState(initialData.assets);
const [parts, setParts] = React.useState(initialData.parts);
const [jobs, setJobs] = React.useState(initialData.jobs);
const [orders, setOrders] = React.useState(initialData.orders);
const [withdrawals, setWDs] = React.useState(initialData.withdrawals);
const [customers, setCustomers] = React.useState(initialData.customers || []);
const [invoices, setInvoices] = React.useState(initialData.invoices || []);
const [iecReports, setIecReports] = React.useState(initialData.iecReports || []);
const [funcReports, setFuncReports] = React.useState(initialData.funcReports || []);
const [company, setCompany] = React.useState(initialData.company || { name: "4Service SRL", subtitle: "Service & Manutenzione", invoicePrefix: "F" });
const [modal, setModal] = React.useState(null);
const [search, setSearch] = React.useState("");
const [toast, setToast] = React.useState(null);
const [navOpen, setNavOpen] = React.useState(false);
const [pdfHtml, setPdfHtml] = React.useState(null);
const [csvModal, setCsvModal] = React.useState(null);
const [helpOpen, setHelpOpen] = React.useState({});
const [filterStatus, setFilterStatus] = React.useState("");
const [filterPriority, setFilterPriority] = React.useState("");
const [filterCustomer, setFilterCustomer] = React.useState("");
const [filterYear, setFilterYear] = React.useState(new Date().getFullYear());
const [filterMonth, setFilterMonth] = React.useState("");
const [scheduleYear, setScheduleYear] = React.useState(new Date().getFullYear());
React.useEffect(() => {
const pdfHandler = (e) => setPdfHtml(e.detail);
const csvHandler = (e) => setCsvModal(e.detail);
window.addEventListener('show-pdf', pdfHandler);
window.addEventListener('show-csv', csvHandler);
return () => {
window.removeEventListener('show-pdf', pdfHandler);
window.removeEventListener('show-csv', csvHandler);
};
}, []);
React.useEffect(() => { saveData({ assets, parts, jobs, orders, withdrawals, customers, invoices, iecReports, funcReports, company }); }, [assets, parts, jobs, orders, withdrawals, customers, invoices, iecReports, company]);
const showToast = React.useCallback((msg, color = "#22c55e") => {
setToast({ msg, color });
setTimeout(() => setToast(null), 3000);
}, []);
const stats = React.useMemo(() => {
const stockValue = parts.reduce((s, p) => s + p.qty * p.unitPrice, 0);
const stockSellValue = parts.reduce((s, p) => s + p.qty * (p.sellPrice || p.unitPrice), 0);
return {
totalAssets: assets.length,
operative: assets.filter(a => a.status === "operativo").length,
maintenance: assets.filter(a => a.status === "in manutenzione").length,
outOfService: assets.filter(a => a.status === "fuori servizio").length,
openJobs: jobs.filter(j => j.status !== "chiuso").length,
urgentJobs: jobs.filter(j => j.priority === "urgente" && j.status !== "chiuso").length,
lowStock: parts.filter(p => p.qty <= p.minQty).length,
stockValue, stockSellValue,
pendingOrders: orders.filter(o => o.status !== "ricevuto" && o.status !== "annullato").length,
customers: customers.length,
pendingInvoices: invoices.filter(i => i.status === "emessa" || i.status === "bozza").length,
};
}, [assets, parts, jobs, orders, customers, invoices]);
const financials = React.useMemo(() => {
const yr = +filterYear;
const matchPeriod = dateStr => {
if (!dateStr)
return false;
const d = new Date(dateStr);
if (d.getFullYear() !== yr)
return false;
if (filterMonth !== "" && d.getMonth() !== +filterMonth)
return false;
return true;
};
const periodInvoices = invoices.filter(i => matchPeriod(i.date));
const periodOrders = orders.filter(o => matchPeriod(o.orderDate) && o.status === "ricevuto");
const periodJobs = jobs.filter(j => matchPeriod(j.closeDate || j.openDate));
let revenue = 0, vatCollected = 0;
periodInvoices.forEach(inv => {
if (inv.status === "annullato")
return;
const subtotal = inv.items.reduce((s, it) => s + it.qty * it.unitPrice, 0);
const vat = inv.items.reduce((s, it) => s + (it.qty * it.unitPrice * it.vat / 100), 0);
revenue += subtotal;
vatCollected += vat;
});
let costsPartsBought = 0;
periodOrders.forEach(o => { costsPartsBought += o.qty * o.unitPrice; });
let costsPartsUsed = 0;
periodJobs.forEach(j => {
j.parts.forEach(p => { const pt = parts.find(x => x.id === p.partId); if (pt)
costsPartsUsed += pt.unitPrice * p.qty; });
});
const margin = revenue - costsPartsUsed;
const monthlyData = [];
for (let m = 0; m < 12; m++) {
let rev = 0;
invoices.forEach(inv => {
if (inv.status === "annullato")
return;
const d = new Date(inv.date);
if (d.getFullYear() === yr && d.getMonth() === m) {
rev += inv.items.reduce((s, it) => s + it.qty * it.unitPrice, 0);
}
});
monthlyData.push({ label: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"][m], value: rev });
}
return { revenue, vatCollected, costsPartsBought, costsPartsUsed, margin, periodInvoices, monthlyData };
}, [invoices, orders, jobs, parts, filterYear, filterMonth]);
const scheduleRows = React.useMemo(() => {
const today = new Date();
today.setHours(0, 0, 0, 0);
return assets
.filter(a => a.nextService)
.map(a => {
const d = new Date(a.nextService);
const c = customers.find(x => x.id === a.customerId) || {};
const days = Math.round((d - today) / 86400000);
const lastIec = iecReports
.filter(r => r.assetId === a.id)
.sort((a, b) => { var _a; return (_a = b.date) === null || _a === void 0 ? void 0 : _a.localeCompare(a.date || ""); })[0];
const normMap = { "62353": "IEC 62353", "61010": "IEC 61010-1" };
return {
assetId: a.id,
assetName: a.name,
brand: a.brand,
serial: a.serial,
location: a.location,
customer: c.name || "",
norm: lastIec ? (normMap[lastIec.norm] || "IEC 62353") : (a.iecNorm ? (normMap[a.iecNorm] || a.iecNorm) : "—"),
lastService: (lastIec === null || lastIec === void 0 ? void 0 : lastIec.date) || a.lastService || "",
nextService: a.nextService,
status: a.status,
month: d.getMonth(),
year: d.getFullYear(),
_days: days,
};
})
.filter(r => r.year === scheduleYear);
}, [assets, iecReports, customers, scheduleYear]);
const MONTHS_IT = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const scheduleMonths = React.useMemo(() => MONTHS_IT.map((monthLabel, month) => ({
month, monthLabel,
items: scheduleRows.filter(r => r.month === month)
})), [scheduleRows]);
const upcomingMaintenance = React.useMemo(() => {
const today = new Date();
today.setHours(0, 0, 0, 0);
const in30days = new Date(today);
in30days.setDate(in30days.getDate() + 30);
return assets
.filter(a => a.nextService)
.map(a => (Object.assign(Object.assign({}, a), { daysToService: Math.round((new Date(a.nextService) - today) / (1000 * 60 * 60 * 24)) })))
.filter(a => a.daysToService <= 30)
.sort((a, b) => a.daysToService - b.daysToService);
}, [assets]);
const newId = (prefix, list) => {
const nums = list.map(x => parseInt((x.id || "").replace(/\D/g, ""), 10)).filter(n => !isNaN(n));
const next = (nums.length ? Math.max(...nums) : 0) + 1;
return prefix + String(next).padStart(3, "0");
};
const generateInvoiceNumber = () => {
const year = new Date().getFullYear();
const existing = invoices.filter(i => { var _a; return (_a = i.number) === null || _a === void 0 ? void 0 : _a.includes("/" + (year)); }).length;
return (company.invoicePrefix || "F") + "-" + (String(existing + 1).padStart(4, "0")) + "/" + (year);
};
const saveAsset = f => {
if (modal.data) {
setAssets(a => a.map(x => x.id === modal.data.id ? Object.assign(Object.assign({}, f), { id: modal.data.id }) : x));
}
else {
setAssets(a => [...a, Object.assign(Object.assign({}, f), { id: newId("A", a) })]);
}
setModal(null);
showToast("Apparecchio salvato");
};
const delAsset = id => { appConfirm("Eliminare questo apparecchio?", () => { setAssets(a => a.filter(x => x.id !== id)); showToast("Eliminato", "#ef4444"); }); };
const savePart = f => {
if (modal.data) {
setParts(p => p.map(x => x.id === modal.data.id ? Object.assign(Object.assign({}, f), { id: modal.data.id }) : x));
}
else {
setParts(p => [...p, Object.assign(Object.assign({}, f), { id: newId("P", p) })]);
}
setModal(null);
showToast("Parte salvata");
};
const delPart = id => { appConfirm("Eliminare questo ricambio?", () => { setParts(p => p.filter(x => x.id !== id)); showToast("Eliminata", "#ef4444"); }); };
const saveJob = f => {
if (modal.data) {
setJobs(j => j.map(x => x.id === modal.data.id ? Object.assign(Object.assign({}, f), { id: modal.data.id }) : x));
}
else {
setJobs(j => [...j, Object.assign(Object.assign({}, f), { id: newId("J", j), timeline: [], photos: [] })]);
}
setModal(null);
showToast("Job salvato");
};
const delJob = id => { appConfirm("Eliminare questo job?", () => { setJobs(j => j.filter(x => x.id !== id)); showToast("Eliminato", "#ef4444"); }); };
const saveTimeline = (jobId, data) => {
setJobs(js => js.map(j => j.id === jobId ? Object.assign(Object.assign({}, j), { timeline: data.timeline, photos: data.photos }) : j));
setModal(null);
showToast("Timeline salvata");
};
const saveCustomer = f => {
if (modal.data) {
setCustomers(c => c.map(x => x.id === modal.data.id ? Object.assign(Object.assign({}, f), { id: modal.data.id }) : x));
}
else {
setCustomers(c => [...c, Object.assign(Object.assign({}, f), { id: newId("C", c) })]);
}
setModal(null);
showToast("Cliente salvato");
};
const delCustomer = id => {
if (assets.some(a => a.customerId === id)) {
alert("Non puoi eliminare: ci sono apparecchi associati.");
return;
}
appConfirm("Eliminare questo cliente?", () => {
setCustomers(c => c.filter(x => x.id !== id));
showToast("Eliminato", "#ef4444");
});
};
const saveInvoice = f => {
if (modal.data) {
setInvoices(i => i.map(x => x.id === modal.data.id ? Object.assign(Object.assign({}, f), { id: modal.data.id }) : x));
}
else {
setInvoices(i => [...i, Object.assign(Object.assign({}, f), { id: newId("I", i) })]);
}
setModal(null);
showToast("Fattura salvata");
};
const delInvoice = id => { appConfirm("Eliminare questo preventivo?", () => { setInvoices(i => i.filter(x => x.id !== id)); showToast("Eliminata", "#ef4444"); }); };
const markInvoicePaid = inv => {
setInvoices(is => is.map(i => i.id === inv.id ? Object.assign(Object.assign({}, i), { status: "pagata" }) : i));
showToast("Fattura pagata");
};
const saveOrder = f => {
var _a;
const isReceivedNow = f.status === "ricevuto" && ((_a = modal === null || modal === void 0 ? void 0 : modal.data) === null || _a === void 0 ? void 0 : _a.status) !== "ricevuto";
if (modal === null || modal === void 0 ? void 0 : modal.data) {
setOrders(o => o.map(x => x.id === modal.data.id ? Object.assign(Object.assign({}, f), { id: modal.data.id }) : x));
}
else {
setOrders(o => [...o, Object.assign(Object.assign({}, f), { id: newId("O", o) })]);
}
if (isReceivedNow) {
setParts(ps => ps.map(p => p.id === f.partId ? Object.assign(Object.assign({}, p), { qty: p.qty + f.qty }) : p));
showToast("Ordine ricevuto — stock +" + (f.qty) + " pz.");
}
else
showToast("Ordine salvato");
setModal(null);
};
const delOrder = id => { appConfirm("Eliminare questo ordine?", () => { setOrders(o => o.filter(x => x.id !== id)); showToast("Eliminato", "#ef4444"); }); };
const quickReceive = o => {
setOrders(os => os.map(x => x.id === o.id ? Object.assign(Object.assign({}, x), { status: "ricevuto" }) : x));
setParts(ps => ps.map(p => p.id === o.partId ? Object.assign(Object.assign({}, p), { qty: p.qty + o.qty }) : p));
showToast("Ordine ricevuto — stock +" + (o.qty) + " pz.");
};
const saveIecReport = f => {
var _a;
const isNew = !(((_a = modal === null || modal === void 0 ? void 0 : modal.data) === null || _a === void 0 ? void 0 : _a.reportNumber) && iecReports.some(r => r.id === modal.data.id));
const reportId = isNew ? newId("R", iecReports) : modal.data.id;
const savedReport = Object.assign(Object.assign({}, f), { id: reportId });
if (isNew) {
const asset = assets.find(a => a.id === f.assetId) || {};
const normLabel = f.norm === "61010" ? "IEC 61010-1" : "IEC 62353";
const ptLabel = f.norm !== "61010" ? (" — Tipo " + (f.patientType || "BF")) : "";
const esitoLabel = f.overallPass ? "CONFORME" : "NON CONFORME";
const newJobId = newId("J", jobs);
const linkedJob = {
id: newJobId,
assetId: f.assetId,
customerId: f.customerId || asset.customerId || "",
type: "verifica",
priority: "normale",
status: "chiuso",
assignee: f.technician || "",
openDate: f.date || new Date().toISOString().slice(0, 10),
closeDate: f.date || new Date().toISOString().slice(0, 10),
description: "Verifica di Sicurezza Elettrica " + normLabel + ptLabel + " — " + esitoLabel,
notes: (f.reportNumber ? "Rif. rapporto: " + f.reportNumber + " " : "") + (f.notes || ""),
parts: [],
laborHours: 0,
laborRate: 55,
timeline: [],
photos: [],
iecReportId: reportId,
};
setJobs(js => [...js, linkedJob]);
savedReport.jobId = newJobId;
const isExtraordinary = f.verifyType === "straordinaria";
const verDate = new Date(f.date || new Date());
const nextYear = new Date(verDate);
nextYear.setFullYear(nextYear.getFullYear() + 1);
const nextServiceDate = nextYear.toISOString().slice(0, 10);
if (!isExtraordinary) {
setAssets(as => as.map(a => a.id === f.assetId ? Object.assign(Object.assign({}, a), { lastService: f.date || new Date().toISOString().slice(0, 10), nextService: nextServiceDate }) : a));
showToast("Verifica IEC salvata + Job " + newJobId + " creato · Prossima: " + nextServiceDate);
}
else {
setAssets(as => as.map(a => a.id === f.assetId ? Object.assign(Object.assign({}, a), { lastService: f.date || new Date().toISOString().slice(0, 10) }) : a));
showToast("Verifica IEC straordinaria salvata + Job " + newJobId + " creato (pianificazione invariata)");
}
}
else {
showToast("Rapporto IEC aggiornato");
}
if (isNew) {
setIecReports(rs => [...rs, savedReport]);
}
else {
setIecReports(rs => rs.map(r => r.id === reportId ? savedReport : r));
}
setModal(null);
};
const delIecReport = id => { appConfirm("Eliminare questa verifica di sicurezza elettrica?", () => { setIecReports(rs => rs.filter(r => r.id !== id)); showToast("Eliminato", "#ef4444"); }); };
const saveFuncReport = f => {
const isNew = !(f.id && funcReports.some(r => r.id === f.id));
if (!isNew) {
setFuncReports(rs => rs.map(r => r.id === f.id ? f : r));
}
else {
const rid = newId("FV", funcReports);
const saved = Object.assign(Object.assign({}, f), { id: rid });
const asset = assets.find(a => a.id === f.assetId) || {};
const tpl = FUNC_TEMPLATES[f.templateId] || FUNC_TEMPLATES["generico"];
const esitoLabel = f.overallPass ? "CONFORME" : "NON CONFORME";
const jid = newId("J", jobs);
setJobs(js => [...js, {
id: jid, assetId: f.assetId,
customerId: f.customerId || asset.customerId || "",
type: "verifica", priority: "normale", status: "chiuso",
assignee: f.technician || "",
openDate: f.date || new Date().toISOString().slice(0, 10),
closeDate: f.date || new Date().toISOString().slice(0, 10),
description: "Verifica Funzionale — " + tpl.label + " — " + esitoLabel,
notes: (f.reportNumber ? "Rif.: " + f.reportNumber + " " : "") + (f.notes || ""),
parts: [], laborHours: 0, laborRate: 55, timeline: [], photos: [],
funcReportId: rid,
}]);
saved.jobId = jid;
setFuncReports(rs => [...rs, saved]);
showToast("Verifica funzionale salvata + Job " + jid + " creato");
setModal(null);
return;
}
setModal(null);
showToast("Rapporto funzionale aggiornato");
};
const delFuncReport = id => { appConfirm("Eliminare questa verifica funzionale?", () => { setFuncReports(rs => rs.filter(r => r.id !== id)); showToast("Eliminato", "#ef4444"); }); };
const handleWithdraw = data => {
setParts(ps => ps.map(p => { const r = data.items.find(x => x.partId === p.id); return r ? Object.assign(Object.assign({}, p), { qty: p.qty - r.qty }) : p; }));
setWDs(w => { const id = newId("W", w); return [Object.assign(Object.assign({}, data), { id }), ...w]; });
setModal(null);
showToast("Scarico — €" + (data.total.toFixed(2)));
};
const handleImport = data => {
setAssets(data.assets || []);
setParts(data.parts || []);
setJobs(data.jobs || []);
setOrders(data.orders || []);
setWDs(data.withdrawals || []);
setCustomers(data.customers || []);
setInvoices(data.invoices || []);
setIecReports(data.iecReports || []);
setFuncReports(data.funcReports || []);
if (data.company)
setCompany(data.company);
setModal(null);
showToast("Backup importato");
};
const handleMerge = data => {
const mergeArr = (existing, incoming, idField = 'id') => {
if (!incoming || !incoming.length)
return existing;
const existingIds = new Set(existing.map(x => x[idField]));
const newItems = incoming.filter(x => !existingIds.has(x[idField]));
return [...existing, ...newItems];
};
setAssets(prev => mergeArr(prev, data.assets));
setParts(prev => mergeArr(prev, data.parts));
setJobs(prev => mergeArr(prev, data.jobs));
setOrders(prev => mergeArr(prev, data.orders));
setWDs(prev => mergeArr(prev, data.withdrawals));
setCustomers(prev => mergeArr(prev, data.customers));
setInvoices(prev => mergeArr(prev, data.invoices));
setIecReports(prev => mergeArr(prev, data.iecReports));
setFuncReports(prev => mergeArr(prev, data.funcReports));
setModal(null);
showToast("✓ Backup unito — nuovi record aggiunti senza sovrascrivere");
};
const handleReset = () => {
if (true) {
if (true) {
setAssets([]);
setParts([]);
setJobs([]);
setOrders([]);
setWDs([]);
setCustomers([]);
setInvoices([]);
setModal(null);
showToast("Sistema azzerato", "#ef4444");
}
}
};
const exportAssets = () => downloadCSV("4service_apparecchi.csv", assets.map(a => { var _a; return (Object.assign(Object.assign({}, a), { cliente: ((_a = customers.find(c => c.id === a.customerId)) === null || _a === void 0 ? void 0 : _a.name) || "" })); }), [{ key: "id", label: "ID" }, { key: "name", label: "Nome" }, { key: "brand", label: "Marca" }, { key: "model", label: "Modello" }, { key: "serial", label: "N.Serie" }, { key: "location", label: "Ubicazione" }, { key: "cliente", label: "Cliente" }, { key: "status", label: "Stato" }, { key: "lastService", label: "Ultimo Serv." }, { key: "nextService", label: "Prossimo Serv." }, { key: "iecNorm", label: "Norma IEC" }, { key: "notes", label: "Note" }]);
const exportParts = () => downloadCSV("4service_parti.csv", parts.map(p => (Object.assign(Object.assign({}, p), { compatibile: (p.compatible || []).map(id => { var _a; return ((_a = assets.find(a => a.id === id)) === null || _a === void 0 ? void 0 : _a.name) || id; }).join(", ") }))), [{ key: "id", label: "ID" }, { key: "code", label: "Codice" }, { key: "name", label: "Nome" }, { key: "brand", label: "Marca" }, { key: "qty", label: "Q.tà" }, { key: "minQty", label: "Q.Min" }, { key: "unitPrice", label: "Costo" }, { key: "sellPrice", label: "Vendita" }, { key: "location", label: "Ubicazione" }, { key: "compatibile", label: "Compatibile con" }, { key: "notes", label: "Note" }]);
const exportJobs = () => downloadCSV("4service_job.csv", jobs.map(j => {
const a = assets.find(x => x.id === j.assetId) || {};
const c = customers.find(x => x.id === (j.customerId || a.customerId)) || {};
const cp = j.parts.reduce((s, p) => { const pt = parts.find(x => x.id === p.partId); return s + (pt ? (pt.sellPrice || pt.unitPrice) * p.qty : 0); }, 0);
return Object.assign(Object.assign({}, j), { apparecchio: a.name || j.assetId, cliente: c.name || "", partiUsate: j.parts.map(p => { const pt = parts.find(x => x.id === p.partId); return ((pt === null || pt === void 0 ? void 0 : pt.name) || p.partId) + " x" + p.qty; }).join(", "), costoParti: cp.toFixed(2), costoManodopera: (j.laborHours * j.laborRate).toFixed(2), totale: (cp + j.laborHours * j.laborRate).toFixed(2), parts: undefined, timeline: undefined, photos: undefined });
}), [{ key: "id", label: "ID" }, { key: "apparecchio", label: "Apparecchio" }, { key: "cliente", label: "Cliente" }, { key: "type", label: "Tipo" }, { key: "priority", label: "Priorità" }, { key: "status", label: "Stato" }, { key: "assignee", label: "Tecnico" }, { key: "openDate", label: "Apertura" }, { key: "closeDate", label: "Chiusura" }, { key: "description", label: "Descrizione" }, { key: "partiUsate", label: "Parti" }, { key: "laborHours", label: "Ore" }, { key: "laborRate", label: "Tariffa €/h" }, { key: "costoParti", label: "Costo Parti" }, { key: "costoManodopera", label: "Manodopera" }, { key: "totale", label: "Totale" }]);
const exportOrders = () => downloadCSV("4service_ordini.csv", orders.map(o => { var _a; return (Object.assign(Object.assign({}, o), { nomeParte: ((_a = parts.find(p => p.id === o.partId)) === null || _a === void 0 ? void 0 : _a.name) || o.partId, totale: (o.qty * o.unitPrice).toFixed(2) })); }), [{ key: "id", label: "ID" }, { key: "supplier", label: "Fornitore" }, { key: "nomeParte", label: "Parte" }, { key: "qty", label: "Q.tà" }, { key: "unitPrice", label: "Prezzo Unit." }, { key: "totale", label: "Totale" }, { key: "status", label: "Stato" }, { key: "orderDate", label: "Data Ordine" }, { key: "expectedDate", label: "Consegna Prev." }, { key: "notes", label: "Note" }]);
const exportInvoices = () => downloadCSV("4service_fatture.csv", invoices.map(i => { var _a; const sub = i.items.reduce((s, it) => s + it.qty * it.unitPrice, 0); const vat = i.items.reduce((s, it) => s + it.qty * it.unitPrice * it.vat / 100, 0); return Object.assign(Object.assign({}, i), { cliente: ((_a = customers.find(c => c.id === i.customerId)) === null || _a === void 0 ? void 0 : _a.name) || "", imponibile: sub.toFixed(2), iva: vat.toFixed(2), totale: (sub + vat).toFixed(2), items: undefined, jobIds: undefined }); }), [{ key: "number", label: "N.Fattura" }, { key: "cliente", label: "Cliente" }, { key: "date", label: "Data" }, { key: "dueDate", label: "Scadenza" }, { key: "status", label: "Stato" }, { key: "imponibile", label: "Imponibile" }, { key: "iva", label: "IVA" }, { key: "totale", label: "Totale" }, { key: "paymentTerms", label: "Pagamento" }, { key: "notes", label: "Note" }]);
const exportIecReports = () => downloadCSV("4service_verifiche_IEC.csv", iecReports.map(r => { var _a; const a = assets.find(x => x.id === r.assetId) || {}; const c = customers.find(x => x.id === a.customerId) || {}; return Object.assign(Object.assign({}, r), { apparecchio: a.name || r.assetId || "", nSerie: a.serial || "", cliente: c.name || "", misure: ((_a = r.measures) === null || _a === void 0 ? void 0 : _a.map(m => m.name + ": " + m.value + m.unit + " (lim." + m.limit + ")").join("; ")) || "", measures: undefined, visual: undefined }); }), [{ key: "reportNumber", label: "N.Rapporto" }, { key: "date", label: "Data" }, { key: "norm", label: "Norma" }, { key: "apparecchio", label: "Apparecchio" }, { key: "nSerie", label: "N.Serie" }, { key: "cliente", label: "Cliente" }, { key: "technician", label: "Tecnico" }, { key: "instrument", label: "Strumento" }, { key: "equipClass", label: "Classe" }, { key: "patientType", label: "Tipo Paziente" }, { key: "verifyType", label: "Tipo Verifica" }, { key: "overallPass", label: "Esito" }, { key: "misure", label: "Misure" }, { key: "notes", label: "Note" }]);
const NAV_GROUPS = [
{
id: "g_dash", label: null,
items: [
{ id: "dashboard", label: "Dashboard", icon: "◈" },
]
},
{
id: "g_maint", label: "MANUTENZIONE",
items: [
{ id: "jobs", label: "Job / Interventi", icon: "›", badge: stats.urgentJobs > 0 ? stats.urgentJobs : null, bColor: "#ef4444" },
{ id: "iec", label: "Verifiche IEC", icon: "›" },
{ id: "func", label: "Verif. Funzionale", icon: "›" },
{ id: "schedule", label: "Pianificazione", icon: "›" },
{ id: "calendar", label: "Calendario", icon: "›", badge: upcomingMaintenance.length > 0 ? upcomingMaintenance.length : null, bColor: "#f59e0b" },
]
},
{
id: "g_assets", label: "PARCO MACCHINE",
items: [
{ id: "assets", label: "Apparecchi", icon: "›", badge: stats.outOfService > 0 ? stats.outOfService : null, bColor: "#ef4444" },
{ id: "customers", label: "Clienti", icon: "›" },
]
},
{
id: "g_stock", label: "MAGAZZINO",
items: [
{ id: "parts", label: "Stock Parti", icon: "›", badge: stats.lowStock > 0 ? stats.lowStock : null, bColor: "#f59e0b" },
{ id: "orders", label: "Ordini Fornitori", icon: "›", badge: stats.pendingOrders > 0 ? stats.pendingOrders : null, bColor: "#2DD4BF" },
{ id: "withdrawals", label: "Scarichi", icon: "›" },
]
},
{
id: "g_admin", label: "AMMINISTRAZIONE",
items: [
{ id: "invoices", label: "Fatture", icon: "›", badge: stats.pendingInvoices > 0 ? stats.pendingInvoices : null, bColor: "#2DD4BF" },
{ id: "finance", label: "Analytics", icon: "›" },
]
},
{
id: "g_sys", label: "SISTEMA",
items: [
{ id: "help", label: "Guida / Help", icon: "›" },
]
},
];
const NAV = NAV_GROUPS.flatMap(g => g.items);
const filteredJobs = React.useMemo(() => {
return jobs.filter(j => {
if (filterStatus && j.status !== filterStatus)
return false;
if (filterPriority && j.priority !== filterPriority)
return false;
if (filterCustomer) {
const asset = assets.find(a => a.id === j.assetId);
if ((j.customerId || (asset === null || asset === void 0 ? void 0 : asset.customerId)) !== filterCustomer)
return false;
}
if (search) {
const q = search.toLowerCase();
return [j.id, j.assignee, j.description].join(" ").toLowerCase().includes(q);
}
return true;
});
}, [jobs, assets, search, filterStatus, filterPriority, filterCustomer]);
const filteredAssets = React.useMemo(() => assets.filter(a => !search || [a.name, a.brand, a.model, a.serial, a.location].join(" ").toLowerCase().includes(search.toLowerCase())), [assets, search]);
const filteredParts = React.useMemo(() => parts.filter(p => !search || [p.code, p.name, p.brand, p.location].join(" ").toLowerCase().includes(search.toLowerCase())), [parts, search]);
const filteredOrders = React.useMemo(() => orders.filter(o => !search || [o.id, o.supplier, o.notes].join(" ").toLowerCase().includes(search.toLowerCase())), [orders, search]);
const filteredCustomers = React.useMemo(() => customers.filter(c => !search || [c.name, c.vat, c.email, c.contact].join(" ").toLowerCase().includes(search.toLowerCase())), [customers, search]);
const filteredInvoices = React.useMemo(() => invoices.filter(i => {
if (!search)
return true;
const customer = customers.find(c => c.id === i.customerId);
return [i.number, customer === null || customer === void 0 ? void 0 : customer.name, i.status].join(" ").toLowerCase().includes(search.toLowerCase());
}), [invoices, customers, search]);
const sideW = 200;
const isEmpty = assets.length === 0 && parts.length === 0 && jobs.length === 0 && customers.length === 0;
return (React.createElement("div", { style: { minHeight: "100vh", background: "#0D0D12" } },
toast && React.createElement("div", { style: { position: "fixed", top: 16, right: 16, background: toast.color + "22", border: "1px solid " + (toast.color) + "55", color: toast.color, borderRadius: 10, padding: "11px 18px", zIndex: 2000, fontSize: 13, fontWeight: 700, maxWidth: "90vw" } }, toast.msg),
isMobile && navOpen && (React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000a", zIndex: 800 }, onClick: () => setNavOpen(false) },
React.createElement("div", { style: { position: "absolute", left: 0, top: 0, bottom: 0, width: 240, background: "#0D0D12", borderRight: "1px solid #1a2030", padding: "20px 0", display: "flex", flexDirection: "column", overflowY: "auto" }, onClick: e => e.stopPropagation() },
React.createElement("div", { style: { padding: "0 18px 18px", borderBottom: "1px solid #1a2030", marginBottom: 8 } },
React.createElement("div", { style: { marginBottom: 4 } },
React.createElement("svg", { viewBox: "0 0 220 48", xmlns: "http://www.w3.org/2000/svg", style: { width: "100%", maxWidth: 200, height: 36 } },
React.createElement("g", { fill: "none", stroke: "#2DD4BF", strokeLinecap: "round", strokeLinejoin: "round" },
React.createElement("path", { d: "M6 24 Q11 14 16 24 Q21 34 26 24", strokeWidth: "2.5" }),
React.createElement("path", { d: "M1 24 Q9 10 16 24 Q23 38 31 24", strokeWidth: "2.5" }),
React.createElement("path", { d: "M-4 24 Q7 6 16 24 Q25 42 36 24", strokeWidth: "2.5" }),
React.createElement("circle", { cx: "42", cy: "24", r: "3.5", fill: "#2DD4BF", stroke: "none" })),
React.createElement("text", { x: "54", y: "28", fontFamily: "'Segoe UI',Arial,sans-serif", fontSize: "20", fontWeight: "800", fill: "#FFFFFF", letterSpacing: "-0.5" }, "4Service"),
React.createElement("text", { x: "54", y: "40", fontFamily: "'Segoe UI',Arial,sans-serif", fontSize: "8.5", fontWeight: "600", fill: "#5A5A70", letterSpacing: "1.5" }, "MEDICAL"))),
React.createElement("div", { style: { fontSize: 9, color: "#5A5A70", letterSpacing: 1, textTransform: "uppercase" } }, company.subtitle)),
NAV_GROUPS.map(group => (React.createElement("div", { key: group.id },
group.label && (React.createElement("div", { style: { padding: "10px 18px 4px", fontSize: 9, color: "#5A5A70", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginTop: 4 } }, group.label)),
group.items.map(n => (React.createElement("button", { key: n.id, onClick: () => { setTab(n.id); setSearch(""); setNavOpen(false); }, style: {
width: "100%", textAlign: "left", background: tab === n.id ? "#2DD4BF18" : "transparent",
borderLeft: "3px solid " + (tab === n.id ? "#2DD4BF" : "transparent"), border: "none", borderRight: "none",
color: tab === n.id ? "#F0F0F5" : "#6A6A80", padding: "9px 18px 9px 22px", fontSize: 12, cursor: "pointer",
display: "flex", alignItems: "center", gap: 9, transition: "all .15s"
} },
React.createElement("span", { style: { fontSize: 14 } }, n.icon),
React.createElement("span", { style: { flex: 1 } }, n.label),
n.badge && React.createElement("span", { style: { background: n.bColor, color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 10, fontWeight: 700 } }, n.badge))))))),
React.createElement("div", { style: { marginTop: "auto", padding: "12px 18px", borderTop: "1px solid #1A1A24" } },
React.createElement("button", { onClick: () => { setModal({ type: "settings" }); setNavOpen(false); }, style: { background: "none", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer", padding: 0 } }, "\u2699 Impostazioni"))))),
!isMobile && (React.createElement("div", { style: { position: "fixed", left: 0, top: 0, bottom: 0, width: sideW, background: "#06090f", borderRight: "1px solid #1a2030", zIndex: 100, display: "flex", flexDirection: "column" } },
React.createElement("div", { style: { padding: "22px 18px 18px", borderBottom: "1px solid #1a2030" } },
React.createElement("div", { style: { fontSize: 10, color: "#2DD4BF", letterSpacing: 3, textTransform: "uppercase", marginBottom: 3 } },
React.createElement("svg", { viewBox: "0 0 220 48", xmlns: "http://www.w3.org/2000/svg", style: { width: "100%", maxWidth: 200, height: 36 } },
React.createElement("g", { fill: "none", stroke: "#2DD4BF", strokeLinecap: "round", strokeLinejoin: "round" },
React.createElement("path", { d: "M6 24 Q11 14 16 24 Q21 34 26 24", strokeWidth: "2.5" }),
React.createElement("path", { d: "M1 24 Q9 10 16 24 Q23 38 31 24", strokeWidth: "2.5" }),
React.createElement("path", { d: "M-4 24 Q7 6 16 24 Q25 42 36 24", strokeWidth: "2.5" }),
React.createElement("circle", { cx: "42", cy: "24", r: "3.5", fill: "#2DD4BF", stroke: "none" })),
React.createElement("text", { x: "54", y: "28", fontFamily: "'Segoe UI',Arial,sans-serif", fontSize: "20", fontWeight: "800", fill: "#FFFFFF", letterSpacing: "-0.5" }, "4Service"),
React.createElement("text", { x: "54", y: "40", fontFamily: "'Segoe UI',Arial,sans-serif", fontSize: "8.5", fontWeight: "600", fill: "#5A5A70", letterSpacing: "1.5" }, "MEDICAL"))),
React.createElement("div", { style: { fontSize: 10, fontWeight: 600, color: "#5A5A70" } }, company.subtitle)),
React.createElement("nav", { style: { flex: 1, padding: "12px 0", overflowY: "auto" } }, NAV_GROUPS.map(group => (React.createElement("div", { key: group.id },
group.label && (React.createElement("div", { style: { padding: "8px 18px 2px", fontSize: 9, color: "#5A5A70", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginTop: 2 } }, group.label)),
group.items.map(n => (React.createElement("button", { key: n.id, onClick: () => { setTab(n.id); setSearch(""); }, style: {
width: "100%", textAlign: "left", background: tab === n.id ? "#2DD4BF18" : "transparent",
borderLeft: "3px solid " + (tab === n.id ? "#2DD4BF" : "transparent"), border: "none", borderRight: "none",
color: tab === n.id ? "#F0F0F5" : "#6A6A80", padding: "8px 18px 8px 22px", fontSize: 12, cursor: "pointer",
display: "flex", alignItems: "center", gap: 9
} },
React.createElement("span", { style: { fontSize: 13 } }, n.icon),
React.createElement("span", { style: { flex: 1 } }, n.label),
n.badge && React.createElement("span", { style: { background: n.bColor, color: "#fff", borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 700 } }, n.badge)))))))),
React.createElement("div", { style: { padding: "12px 18px", borderTop: "1px solid #1a2030", display: "flex", justifyContent: "space-between", alignItems: "center" } },
React.createElement("span", { style: { fontSize: 10, color: "#1e293b" } }, "v5.0"),
React.createElement("button", { onClick: () => setModal({ type: "settings" }), style: { background: "none", border: "none", color: "#64748b", fontSize: 14, cursor: "pointer" } }, "\u2699")))),
React.createElement("div", { style: { marginLeft: isMobile ? 0 : sideW, padding: isMobile ? "16px 14px" : "26px 28px", minHeight: "100vh" } },
isMobile && (React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, background: "#06090f", borderRadius: 12, padding: "10px 14px", border: "1px solid #1a2030" } },
React.createElement("button", { onClick: () => setNavOpen(true), style: { background: "none", border: "none", color: "#e2e8f0", fontSize: 20, cursor: "pointer" } }, "\u2261"),
React.createElement("div", null,
React.createElement("span", { style: { fontSize: 10, color: "#2DD4BF", letterSpacing: 2, textTransform: "uppercase" } },
company.name,
" \u00B7 "),
React.createElement("span", { style: { fontSize: 13, fontWeight: 700 } }, (_a = NAV.find(n => n.id === tab)) === null || _a === void 0 ? void 0 : _a.label)),
React.createElement("button", { onClick: () => setModal({ type: "settings" }), style: { background: "none", border: "none", color: "#64748b", fontSize: 18, cursor: "pointer" } }, "\u2699"))),
tab === "dashboard" && (React.createElement("div", null,
!isMobile && React.createElement("h1", { style: { margin: "0 0 20px", fontSize: 20, fontWeight: 900 } }, "Dashboard"),
isEmpty ? (React.createElement(EmptyState, { icon: "", title: "Benvenuto in " + (company.name), message: "Inizia registrando il primo cliente o apparecchio. Tutti i dati restano sul tuo dispositivo.", action: React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" } },
React.createElement(Btn, { onClick: () => { setTab("customers"); setModal({ type: "customer", data: null }); } }, "+ Primo cliente"),
React.createElement(Btn, { variant: "ghost", onClick: () => { setTab("assets"); setModal({ type: "asset", data: null }); } }, "+ Primo apparecchio")) })) : (React.createElement(React.Fragment, null,
React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 } },
React.createElement(Pill, { label: "Apparecchi", value: stats.totalAssets }),
React.createElement(Pill, { label: "Operativi", value: stats.operative, color: "#22c55e" }),
React.createElement(Pill, { label: "Manut.", value: stats.maintenance, color: "#f59e0b" }),
React.createElement(Pill, { label: "Fuori serv.", value: stats.outOfService, color: "#ef4444" })),
React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 } },
React.createElement(Pill, { label: "Job aperti", value: stats.openJobs, color: "#2DD4BF" }),
React.createElement(Pill, { label: "Urgenti", value: stats.urgentJobs, color: "#ef4444" }),
React.createElement(Pill, { label: "Fatture in sospeso", value: stats.pendingInvoices, color: "#2DD4BF" }),
React.createElement(Pill, { label: "Clienti", value: stats.customers, color: "#a855f7" })),
React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 } },
React.createElement(Pill, { label: "Ricavi anno", value: "€" + (financials.revenue / 1000).toFixed(1) + "k", color: "#22c55e", sub: String(filterYear) }),
React.createElement(Pill, { label: "Margine lordo", value: "€" + (financials.margin / 1000).toFixed(1) + "k", color: "#22c55e" }),
React.createElement(Pill, { label: "Verifiche IEC", value: iecReports.length, color: "#9955ff" }),
React.createElement(Pill, { label: "Stock basso", value: stats.lowStock, color: "#f59e0b" })),
React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 } },
React.createElement(Pill, { label: "% Job chiusi", value: jobs.length > 0 ? Math.round(jobs.filter(j => j.status === "chiuso").length / jobs.length * 100) + "%" : "—", color: "#22c55e", sub: "completion rate" }),
React.createElement(Pill, { label: "Fuori servizio", value: stats.outOfService, color: "#ef4444", sub: "apparecchi" }),
React.createElement(Pill, { label: "Garanzie in scad.", value: assets.filter(a => a.warrantyExpiry && Math.round((new Date(a.warrantyExpiry) - new Date()) / 86400000) < 90 && Math.round((new Date(a.warrantyExpiry) - new Date()) / 86400000) >= 0).length, color: "#f59e0b", sub: "entro 90gg" }),
React.createElement(Pill, { label: "In pianificaz.", value: scheduleRows.filter(r => r.year === new Date().getFullYear()).length, color: "#2DD4BF", sub: "anno " + new Date().getFullYear() })),
(stats.urgentJobs > 0 || stats.lowStock > 0 || upcomingMaintenance.length > 0) && (React.createElement("div", { style: { marginBottom: 22 } },
React.createElement("div", { style: { fontSize: 10, color: "#334155", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 } }, "\u26A0 Avvisi"),
jobs.filter(j => j.priority === "urgente" && j.status !== "chiuso").map(j => {
const a = assets.find(x => x.id === j.assetId);
return (React.createElement("div", { key: j.id, style: { background: "#1E1E28", borderLeft: "3px solid #ef4444", borderRadius: 8, padding: "10px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 } },
React.createElement("div", null,
React.createElement("span", { style: { color: "#ef4444", fontSize: 12, fontWeight: 700 } },
j.id,
" URGENTE"),
React.createElement("div", { style: { color: "#94a3b8", fontSize: 12, marginTop: 2 } }, a === null || a === void 0 ? void 0 :
a.name,
" \u2014 ",
j.description.slice(0, 50),
"\u2026")),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => setTab("jobs") }, "\u2192")));
}),
upcomingMaintenance.slice(0, 3).map(a => (React.createElement("div", { key: a.id, style: { background: "#1E1E28", borderLeft: "3px solid " + (a.daysToService < 0 ? "#ef4444" : a.daysToService < 7 ? "#f59e0b" : "#2DD4BF"), borderRadius: 8, padding: "10px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 } },
React.createElement("div", null,
React.createElement("span", { style: { color: a.daysToService < 0 ? "#ef4444" : "#f59e0b", fontSize: 12, fontWeight: 700 } }, a.daysToService < 0 ? "SCADUTA da " + (Math.abs(a.daysToService)) + "gg" : a.daysToService === 0 ? "OGGI" : "tra " + (a.daysToService) + "gg"),
React.createElement("div", { style: { color: "#94a3b8", fontSize: 12, marginTop: 2 } },
a.name,
" \u2014 manut. il ",
a.nextService)),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => setTab("calendar") }, "\u2192")))),
parts.filter(p => p.qty <= p.minQty).slice(0, 3).map(p => (React.createElement("div", { key: p.id, style: { background: "#1E1E28", borderLeft: "3px solid #f59e0b", borderRadius: 8, padding: "10px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 } },
React.createElement("div", null,
React.createElement("span", { style: { color: "#f59e0b", fontSize: 12, fontWeight: 700 } }, "STOCK BASSO"),
React.createElement("div", { style: { color: "#94a3b8", fontSize: 12, marginTop: 2 } },
p.name,
" \u2014 ",
p.qty,
" pz. (min ",
p.minQty,
")")),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => setTab("parts") }, "\u2192")))))))))),
tab === "assets" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", null,
React.createElement("h1", { style: { margin: 0, fontSize: 18, fontWeight: 900 } }, "Apparecchi Medicali"),
React.createElement("p", { style: { color: "#64748b", margin: "2px 0 0", fontSize: 12, fontFamily: "monospace" } },
assets.length,
" totali \u00B7 ",
assets.filter(a => a.status === "fuori servizio").length,
" fuori servizio")),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, variant: "ghost", onClick: exportAssets }, "\u2B07 CSV"),
React.createElement(Btn, { sm: true, onClick: () => setModal({ type: "asset", data: null }) }, "+ Nuovo"))),
React.createElement("div", { style: { fontSize: 11, color: "#475569", marginBottom: 8, fontStyle: "italic" } }, "\u2192 Doppio click su una riga per aprire la scheda dettaglio dell'apparecchio"),
assets.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 40, marginBottom: 10, opacity: .5 } }),
React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } }, "Nessun apparecchio"),
React.createElement(Btn, { onClick: () => setModal({ type: "asset", data: null }) }, "Nuovo apparecchio"))) : (React.createElement(ExcelTable, { defaultSort: "name", onRowClick: row => setModal({ type: "assetDetail", data: assets.find(a => a.id === row.id) }), rowBg: row => row.status === "fuori servizio" ? "#ef333308" : row.status === "in manutenzione" ? "#f59e0b08" : "", cols: [
{ key: "id", label: "ID", render: v => React.createElement("span", { style: { color: "#64748b", fontFamily: "monospace", fontSize: 11 } }, v) },
{ key: "name", label: "Apparecchio", render: v => React.createElement("strong", { style: { color: "#e2e8f0" } }, v) },
{ key: "brand", label: "Marca" },
{ key: "model", label: "Modello" },
{ key: "serial", label: "N. Serie", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11 } }, v || "—") },
{ key: "location", label: "Ubicazione", opts: [...new Set(assets.map(a => a.location).filter(Boolean))] },
{ key: "cliente", label: "Cliente", opts: [...new Set(assets.map(a => { var _a; return ((_a = customers.find(c => c.id === a.customerId)) === null || _a === void 0 ? void 0 : _a.name) || ""; }).filter(Boolean))] },
{ key: "status", label: "Stato", opts: ["operativo", "in manutenzione", "fuori servizio"],
render: v => React.createElement(Badge, { text: v, color: STATUS_COLOR[v] || "#64748b" }) },
{ key: "nextService", label: "Prossimo Serv.", render: (v) => {
const d = v ? Math.round((new Date(v) - new Date()) / 86400000) : null;
return React.createElement(AlertChip, { days: d });
} },
{ key: "riskClass", label: "Classe R.", render: v => v ? React.createElement("span", { style: { fontWeight: 700, color: v === "C" ? "#ef4444" : v === "B" ? "#f59e0b" : "#22c55e" } }, "Cl." + v) : React.createElement("span", { style: { color: "#475569" } }, "\u2014") },
{ key: "warrantyExpiry", label: "Scad. Garanzia", render: (v) => {
if (!v)
return React.createElement("span", { style: { color: "#475569" } }, "\u2014");
const d = Math.round((new Date(v) - new Date()) / 86400000);
return React.createElement("span", { style: { color: d < 0 ? "#ef4444" : d < 90 ? "#f59e0b" : "#22c55e", fontFamily: "monospace", fontSize: 11 } }, v);
} },
{ key: "iecNorm", label: "Norma IEC", render: v => React.createElement("span", { style: { fontSize: 10, color: "#64748b" } }, v || "—") },
], rows: assets.map(a => { var _a; return (Object.assign(Object.assign({}, a), { cliente: ((_a = customers.find(c => c.id === a.customerId)) === null || _a === void 0 ? void 0 : _a.name) || "" })); }), onEdit: row => setModal({ type: "asset", data: assets.find(a => a.id === row.id) }), onDelete: id => delAsset(id), actions: row => (React.createElement(React.Fragment, null,
React.createElement("button", { onClick: () => setModal({ type: "assetDetail", data: assets.find(a => a.id === row.id) }), title: "Scheda apparecchio", style: { background: "#202028", border: "1px solid #2a3040", borderRadius: 5, color: "#94a3b8", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }),
React.createElement("button", { onClick: () => setModal({ type: "iec", assetId: row.id, data: null }), title: "Verifica IEC", style: { background: "#202028", border: "1px solid #2a3040", borderRadius: 5, color: "#5EEAD4", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }, "\u26A1"),
React.createElement("button", { onClick: () => setModal({ type: "func", assetId: row.id, data: null }), title: "Verifica funzionale", style: { background: "#202028", border: "1px solid #2a3040", borderRadius: 5, color: "#a855f7", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }))) })))),
tab === "jobs" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", null,
React.createElement("h1", { style: { margin: 0, fontSize: 18, fontWeight: 900 } }, "Job / Interventi"),
React.createElement("p", { style: { color: "#64748b", margin: "2px 0 0", fontSize: 12, fontFamily: "monospace" } },
jobs.filter(j => j.status !== "chiuso").length,
" aperti \u00B7 ",
jobs.length,
" totali")),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, variant: "ghost", onClick: exportJobs }, "\u2B07 CSV"),
React.createElement(Btn, { sm: true, onClick: () => setModal({ type: "job", data: null }) }, "+ Nuovo"))),
jobs.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 40, marginBottom: 10, opacity: .5 } }),
React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } }, "Nessun job"),
React.createElement("div", { style: { fontSize: 12, color: "#475569", marginBottom: 18 } }, assets.length === 0 ? "Prima registra un apparecchio." : "Apri il primo job."),
React.createElement(Btn, { onClick: () => setModal({ type: "job", data: null }) }, "Nuovo job"))) : (React.createElement(ExcelTable, { defaultSort: "openDate", rowBg: row => row.priority === "urgente" && row.status !== "chiuso" ? "#ef333308" : row.priority === "alta" && row.status !== "chiuso" ? "#f9730008" : "", cols: [
{ key: "id", label: "ID", render: v => React.createElement("span", { style: { color: "#64748b", fontFamily: "monospace", fontSize: 11 } }, v) },
{ key: "apparecchio", label: "Apparecchio", render: v => React.createElement("strong", { style: { color: "#e2e8f0" } }, v) },
{ key: "cliente", label: "Cliente", opts: [...new Set(jobs.map(j => { var _a; const a = assets.find(x => x.id === j.assetId); return ((_a = customers.find(c => c.id === (j.customerId || (a === null || a === void 0 ? void 0 : a.customerId)))) === null || _a === void 0 ? void 0 : _a.name) || ""; }).filter(Boolean))] },
{ key: "type", label: "Tipo", opts: ["correttiva", "preventiva", "verifica", "calibrazione"] },
{ key: "priority", label: "Priorità", opts: ["urgente", "alta", "normale", "bassa"],
render: v => React.createElement(Badge, { text: v, color: PRI_COLOR[v] || "#64748b" }) },
{ key: "status", label: "Stato", opts: ["aperto", "in corso", "chiuso"],
render: v => React.createElement(Badge, { text: v, color: STATUS_COLOR[v] || "#64748b" }) },
{ key: "assignee", label: "Tecnico" },
{ key: "openDate", label: "Apertura" },
{ key: "closeDate", label: "Chiusura", render: v => v || "—" },
{ key: "totale", label: "Costo", render: v => React.createElement("span", { style: { color: "#a855f7", fontWeight: 700, fontFamily: "monospace" } },
"\u20AC",
parseFloat(v || 0).toFixed(0)) },
{ key: "steps", label: "Timeline", render: (v, row) => React.createElement("span", { style: { color: "#64748b", fontSize: 11, display: "flex", gap: 4 } },
row.hasIec && React.createElement("span", { title: "Verifica IEC collegata" }, "\u26A1"),
v > 0 && React.createElement("span", null,
"\u00B7",
v)) },
], rows: jobs.map(j => {
var _a;
const a = assets.find(x => x.id === j.assetId) || {};
const c = customers.find(x => x.id === (j.customerId || a.customerId)) || {};
const tot = j.parts.reduce((s, p) => { const pt = parts.find(x => x.id === p.partId); return s + (pt ? (pt.sellPrice || pt.unitPrice) * p.qty : 0); }, 0) + j.laborHours * j.laborRate;
return Object.assign(Object.assign({}, j), { apparecchio: a.name || j.assetId, cliente: c.name || "", totale: tot.toFixed(2), steps: ((_a = j.timeline) === null || _a === void 0 ? void 0 : _a.length) || 0, hasIec: !!j.iecReportId });
}), onEdit: row => setModal({ type: "job", data: jobs.find(j => j.id === row.id) }), onDelete: id => delJob(id), actions: row => (React.createElement(React.Fragment, null,
React.createElement("button", { onClick: () => setModal({ type: "timeline", data: jobs.find(j => j.id === row.id) }), title: "Timeline", style: { background: "#202028", border: "1px solid #2a3040", borderRadius: 5, color: "#94a3b8", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }, "\u00B7"),
React.createElement("button", { onClick: () => generateJobPDF(jobs.find(j => j.id === row.id), assets, parts, customers, company), title: "PDF rapporto", style: { background: "#202028", border: "1px solid #2a3040", borderRadius: 5, color: "#94a3b8", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }))) })))),
tab === "parts" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", null,
React.createElement("h1", { style: { margin: 0, fontSize: 18, fontWeight: 900 } }, "Stock Parti"),
React.createElement("p", { style: { color: "#64748b", margin: "2px 0 0", fontSize: 12, fontFamily: "monospace" } },
"Costo: \u20AC",
stats.stockValue.toFixed(2),
" \u00B7 Vendita: \u20AC",
stats.stockSellValue.toFixed(2),
" \u00B7 ",
stats.lowStock,
" sotto min.")),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, variant: "ghost", onClick: exportParts }, "\u2B07 CSV"),
React.createElement(Btn, { sm: true, variant: "success", onClick: () => setModal({ type: "withdrawal" }) }, " Scarica"),
React.createElement(Btn, { sm: true, onClick: () => setModal({ type: "part", data: null }) }, "+ Nuova"))),
parts.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 40, marginBottom: 10, opacity: .5 } }),
React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } }, "Magazzino vuoto"),
React.createElement(Btn, { onClick: () => setModal({ type: "part", data: null }) }, "Nuova parte"))) : (React.createElement(ExcelTable, { defaultSort: "name", rowBg: row => row.qty === 0 ? "#ef333308" : row.qty <= row.minQty ? "#f59e0b08" : "", cols: [
{ key: "id", label: "ID", render: v => React.createElement("span", { style: { color: "#64748b", fontFamily: "monospace", fontSize: 11 } }, v) },
{ key: "code", label: "Codice", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11 } }, v) },
{ key: "name", label: "Nome", render: v => React.createElement("strong", { style: { color: "#e2e8f0" } }, v) },
{ key: "brand", label: "Marca", opts: [...new Set(parts.map(p => p.brand).filter(Boolean))] },
{ key: "location", label: "Ubicazione", opts: [...new Set(parts.map(p => p.location).filter(Boolean))] },
{ key: "qty", label: "Q.tà", render: (v, row) => React.createElement("span", { style: { fontWeight: 800, color: v === 0 ? "#ef4444" : v <= row.minQty ? "#f59e0b" : "#22c55e" } }, v) },
{ key: "minQty", label: "Min.", render: v => React.createElement("span", { style: { color: "#64748b" } }, v) },
{ key: "unitPrice", label: "Acquisto", render: v => React.createElement("span", { style: { fontFamily: "monospace" } },
"\u20AC",
parseFloat(v).toFixed(2)) },
{ key: "sellPrice", label: "Vendita", render: v => React.createElement("span", { style: { color: "#a855f7", fontFamily: "monospace" } },
"\u20AC",
parseFloat(v || 0).toFixed(2)) },
{ key: "margine", label: "Margine", render: v => React.createElement("span", { style: { color: "#22c55e", fontFamily: "monospace" } },
"\u20AC",
parseFloat(v || 0).toFixed(2)) },
{ key: "valoreStock", label: "Val. Stock", render: v => React.createElement("span", { style: { fontFamily: "monospace" } },
"\u20AC",
parseFloat(v || 0).toFixed(2)) },
], rows: parts.map(p => (Object.assign(Object.assign({}, p), { sellPrice: p.sellPrice || p.unitPrice, margine: ((p.sellPrice || p.unitPrice) - p.unitPrice).toFixed(2), valoreStock: (p.qty * p.unitPrice).toFixed(2) }))), onEdit: row => setModal({ type: "part", data: parts.find(p => p.id === row.id) }), onDelete: id => delPart(id) })))),
tab === "customers" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", null,
React.createElement("h1", { style: { margin: 0, fontSize: 18, fontWeight: 900 } }, "Clienti"),
React.createElement("p", { style: { color: "#64748b", margin: "2px 0 0", fontSize: 12, fontFamily: "monospace" } },
customers.length,
" totali")),
React.createElement(Btn, { sm: true, onClick: () => setModal({ type: "customer", data: null }) }, "+ Nuovo")),
customers.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 40, marginBottom: 10, opacity: .5 } }),
React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } }, "Nessun cliente"),
React.createElement(Btn, { onClick: () => setModal({ type: "customer", data: null }) }, "Nuovo cliente"))) : (React.createElement(ExcelTable, { defaultSort: "name", cols: [
{ key: "id", label: "ID", render: v => React.createElement("span", { style: { color: "#64748b", fontFamily: "monospace", fontSize: 11 } }, v) },
{ key: "name", label: "Ragione Sociale", render: v => React.createElement("strong", { style: { color: "#e2e8f0" } }, v) },
{ key: "vat", label: "P.IVA", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11 } }, v || "—") },
{ key: "contact", label: "Referente" },
{ key: "email", label: "Email" },
{ key: "phone", label: "Telefono", render: v => React.createElement("span", { style: { fontFamily: "monospace" } }, v || "—") },
{ key: "address", label: "Indirizzo" },
{ key: "nApparecchi", label: "Apparecchi", render: v => React.createElement("span", { style: { color: "#2DD4BF", fontWeight: 700 } }, v) },
], rows: customers.map(c => (Object.assign(Object.assign({}, c), { nApparecchi: assets.filter(a => a.customerId === c.id).length }))), onEdit: row => setModal({ type: "customer", data: customers.find(c => c.id === row.id) }), onDelete: id => delCustomer(id) })))),
tab === "invoices" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", null,
React.createElement("h1", { style: { margin: 0, fontSize: 18, fontWeight: 900 } }, "Fatture"),
React.createElement("p", { style: { color: "#64748b", margin: "2px 0 0", fontSize: 12, fontFamily: "monospace" } },
stats.pendingInvoices,
" in sospeso \u00B7 ",
invoices.length,
" totali")),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, variant: "ghost", onClick: exportInvoices }, "\u2B07 CSV"),
React.createElement(Btn, { sm: true, onClick: () => setModal({ type: "invoice", data: null }) }, "+ Nuova"))),
invoices.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 40, marginBottom: 10, opacity: .5 } }),
React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } }, "Nessuna fattura"),
React.createElement(Btn, { onClick: () => setModal({ type: "invoice", data: null }) }, "Nuova fattura"))) : (React.createElement(ExcelTable, { defaultSort: "date", cols: [
{ key: "number", label: "N. Fattura", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontWeight: 700, color: "#e2e8f0" } }, v) },
{ key: "cliente", label: "Cliente", opts: [...new Set(invoices.map(i => { var _a; return ((_a = customers.find(c => c.id === i.customerId)) === null || _a === void 0 ? void 0 : _a.name) || ""; }).filter(Boolean))] },
{ key: "date", label: "Data" },
{ key: "dueDate", label: "Scadenza", render: v => v || "—" },
{ key: "status", label: "Stato", opts: ["bozza", "emessa", "pagata", "scaduta", "annullato"], render: v => React.createElement(Badge, { text: v, color: STATUS_COLOR[v] || "#94a3b8" }) },
{ key: "imponibile", label: "Imponibile", render: v => React.createElement("span", { style: { fontFamily: "monospace" } },
"\u20AC",
v) },
{ key: "iva", label: "IVA", render: v => React.createElement("span", { style: { fontFamily: "monospace", color: "#64748b" } },
"\u20AC",
v) },
{ key: "totale", label: "Totale", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontWeight: 800, color: "#22c55e" } },
"\u20AC",
v) },
], rows: invoices.map(i => { var _a; const sub = i.items.reduce((s, it) => s + it.qty * it.unitPrice, 0); const vat = i.items.reduce((s, it) => s + it.qty * it.unitPrice * it.vat / 100, 0); return Object.assign(Object.assign({}, i), { cliente: ((_a = customers.find(c => c.id === i.customerId)) === null || _a === void 0 ? void 0 : _a.name) || "—", imponibile: sub.toFixed(2), iva: vat.toFixed(2), totale: (sub + vat).toFixed(2) }); }), onEdit: row => setModal({ type: "invoice", data: invoices.find(i => i.id === row.id) }), onDelete: id => delInvoice(id), actions: row => {
const inv = invoices.find(i => i.id === row.id);
const cust = customers.find(c => c.id === (inv === null || inv === void 0 ? void 0 : inv.customerId));
return (React.createElement(React.Fragment, null,
React.createElement("button", { onClick: () => generateInvoicePDF(inv, cust, jobs, assets, parts, company), title: "PDF", style: { background: "#202028", border: "1px solid #2a3040", borderRadius: 5, color: "#94a3b8", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }),
(inv === null || inv === void 0 ? void 0 : inv.status) !== "pagata" && (inv === null || inv === void 0 ? void 0 : inv.status) !== "annullato" && React.createElement("button", { onClick: () => markInvoicePaid(inv), title: "Segna pagata", style: { background: "#22c55e15", border: "1px solid #22c55e33", borderRadius: 5, color: "#22c55e", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }, "\u2713")));
} })))),
tab === "calendar" && (React.createElement("div", null,
React.createElement("h1", { style: { margin: "0 0 16px", fontSize: 18, fontWeight: 900 } }, "Calendario Manutenzioni"),
upcomingMaintenance.filter(a => a.daysToService < 0).length > 0 && (React.createElement("div", { style: { background: "#ef444415", border: "1px solid #ef444433", borderLeft: "4px solid #ef4444", borderRadius: 8, padding: "10px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" } },
React.createElement("span", { style: { color: "#ef4444", fontWeight: 700, fontSize: 13 } },
"! ",
upcomingMaintenance.filter(a => a.daysToService < 0).length,
" manutenzioni SCADUTE \u2014 intervenire subito"))),
upcomingMaintenance.filter(a => a.daysToService >= 0 && a.daysToService <= 7).length > 0 && (React.createElement("div", { style: { background: "#f9730015", border: "1px solid #f9730033", borderLeft: "4px solid #f97316", borderRadius: 8, padding: "10px 16px", marginBottom: 10 } },
React.createElement("span", { style: { color: "#f97316", fontWeight: 700, fontSize: 13 } },
"\u26A0 ",
upcomingMaintenance.filter(a => a.daysToService >= 0 && a.daysToService <= 7).length,
" manutenzioni entro 7 giorni"))),
React.createElement(ExcelTable, { defaultSort: "daysToService", rowBg: row => row.daysToService < 0 ? "#ef333308" : row.daysToService <= 7 ? "#f9730008" : row.daysToService <= 30 ? "#f59e0b08" : "", cols: [
{ key: "id", label: "ID", render: v => React.createElement("span", { style: { color: "#64748b", fontFamily: "monospace", fontSize: 11 } }, v) },
{ key: "name", label: "Apparecchio", render: v => React.createElement("strong", { style: { color: "#e2e8f0" } }, v) },
{ key: "brand", label: "Marca" },
{ key: "location", label: "Ubicazione", opts: [...new Set(assets.map(a => a.location).filter(Boolean))] },
{ key: "cliente", label: "Cliente", opts: [...new Set(assets.map(a => { var _a; return ((_a = customers.find(c => c.id === a.customerId)) === null || _a === void 0 ? void 0 : _a.name) || ""; }).filter(Boolean))] },
{ key: "status", label: "Stato", opts: ["operativo", "in manutenzione", "fuori servizio"], render: v => React.createElement(Badge, { text: v, color: STATUS_COLOR[v] || "#64748b" }) },
{ key: "nextService", label: "Data manut." },
{ key: "daysToService", label: "Scadenza", render: v => React.createElement(AlertChip, { days: v }) },
{ key: "serviceInterval", label: "Intervallo (mesi)" },
], rows: assets.filter(a => a.nextService).map(a => { var _a; return (Object.assign(Object.assign({}, a), { cliente: ((_a = customers.find(c => c.id === a.customerId)) === null || _a === void 0 ? void 0 : _a.name) || "", daysToService: Math.round((new Date(a.nextService) - new Date()) / 86400000) })); }), actions: row => (React.createElement("button", { onClick: () => setModal({ type: "job", data: { assetId: row.id, type: "preventiva", priority: "normale", status: "aperto", description: "Manutenzione programmata", openDate: new Date().toISOString().slice(0, 10), parts: [], laborHours: 0, laborRate: 55, notes: "", timeline: [], photos: [] } }), style: { background: "#2DD4BF15", border: "1px solid #2563eb33", borderRadius: 5, color: "#5EEAD4", padding: "3px 8px", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" } }, "+ Job")) }))),
tab === "finance" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", { style: { fontSize: 18, fontWeight: 900 } }, "Analytics & Report"),
React.createElement("div", { style: { display: "flex", gap: 6 } },
React.createElement("select", { value: filterYear, onChange: e => setFilterYear(e.target.value), style: { background: "#1E1E28", border: "1px solid #2a3040", borderRadius: 7, padding: "6px 11px", color: "#e2e8f0", fontSize: 12 } }, [new Date().getFullYear() - 2, new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1].map(y => React.createElement("option", { key: y, value: y }, y))),
React.createElement("select", { value: filterMonth, onChange: e => setFilterMonth(e.target.value), style: { background: "#1E1E28", border: "1px solid #2a3040", borderRadius: 7, padding: "6px 11px", color: "#e2e8f0", fontSize: 12 } },
React.createElement("option", { value: "" }, "Anno intero"),
["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"].map((m, i) => React.createElement("option", { key: i, value: i }, m))))),
React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 } },
React.createElement(Pill, { label: "Ricavi (imponibile)", value: "€" + financials.revenue.toFixed(2), color: "#22c55e" }),
React.createElement(Pill, { label: "IVA da versare", value: "€" + financials.vatCollected.toFixed(2), color: "#f59e0b" }),
React.createElement(Pill, { label: "Costo parti acquistate", value: "€" + financials.costsPartsBought.toFixed(2), color: "#ef4444" }),
React.createElement(Pill, { label: "Costo parti usate", value: "€" + financials.costsPartsUsed.toFixed(2), color: "#f97316" })),
React.createElement("div", { style: { background: "#141418", borderRadius: 12, padding: "16px", border: "1px solid #1e2a3a", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" } },
React.createElement("div", null,
React.createElement("div", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 4 } }, " Margine Lordo Stimato"),
React.createElement("div", { style: { fontSize: 11, color: "#475569" } }, "Ricavi \u2212 costo parti usate nei job")),
React.createElement("span", { style: { color: "#22c55e", fontWeight: 800, fontSize: 22, fontFamily: "monospace" } },
"\u20AC",
financials.margin.toFixed(2))),
React.createElement("div", { style: { background: "#141418", borderRadius: 12, padding: "16px", border: "1px solid #1e2a3a", marginBottom: 14 } },
React.createElement("div", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700, marginBottom: 8 } },
"Ricavi mensili \u2014 ",
filterYear),
React.createElement(BarChart, { data: financials.monthlyData, color: "#22c55e" })),
financials.periodInvoices.length > 0 && (React.createElement("div", { style: { background: "#141418", borderRadius: 12, padding: "16px", border: "1px solid #1e2a3a" } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } },
React.createElement("div", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 } },
"Fatture del periodo (",
financials.periodInvoices.length,
")"),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: exportInvoices }, "\u2B07 CSV")),
financials.periodInvoices.map(inv => {
const cust = customers.find(c => c.id === inv.customerId);
const tot = inv.items.reduce((s, it) => s + it.qty * it.unitPrice * (1 + it.vat / 100), 0);
return (React.createElement("div", { key: inv.id, style: { display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #1a2030", gap: 10, flexWrap: "wrap", alignItems: "center" } },
React.createElement("span", { style: { fontSize: 12, color: "#64748b", fontFamily: "monospace" } }, inv.number),
React.createElement(Badge, { text: inv.status, color: STATUS_COLOR[inv.status] || "#94a3b8" }),
React.createElement("span", { style: { fontSize: 12, color: "#94a3b8", flex: 1, minWidth: 100 } }, (cust === null || cust === void 0 ? void 0 : cust.name) || "—"),
React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, inv.date),
React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: "#22c55e", fontFamily: "monospace" } },
"\u20AC",
tot.toFixed(2))));
}))))),
tab === "func" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", null,
React.createElement("h1", { style: { margin: 0, fontSize: 18, fontWeight: 900 } }, " Verifiche Funzionali"),
React.createElement("p", { style: { color: "#64748b", margin: "2px 0 0", fontSize: 12, fontFamily: "monospace" } },
"IEC 60601-1/2 \u2014 ",
funcReports.length,
" rapporti \u00B7 ",
Object.keys(FUNC_TEMPLATES).length - 1,
" template disponibili")),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, onClick: () => setModal({ type: "func", data: null, assetId: null }) }, "+ Nuova verifica"))),
funcReports.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 40, marginBottom: 10, opacity: .5 } }),
React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } }, "Nessuna verifica funzionale"),
React.createElement("div", { style: { fontSize: 12, color: "#475569", marginBottom: 18 } },
"Template disponibili: ",
Object.values(FUNC_TEMPLATES).map(t => t.icon + " " + t.label).join(" · ")),
React.createElement(Btn, { onClick: () => setModal({ type: "func", data: null, assetId: null }) }, "+ Nuova verifica"))) : (React.createElement(ExcelTable, { defaultSort: "date", rowBg: row => row.overallPass === false || row.overallPass === "false" ? "#ef333308" : "", cols: [
{ key: "reportNumber", label: "N. Rapporto", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontWeight: 700 } }, v || "—") },
{ key: "date", label: "Data" },
{ key: "tplLabel", label: "Tipo apparecchio", render: v => React.createElement("span", { style: { fontWeight: 700, color: "#e2e8f0" } }, v) },
{ key: "assetName", label: "Apparecchio", render: v => React.createElement("span", { style: { color: "#94a3b8" } }, v) },
{ key: "serial", label: "N. Serie", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11 } }, v || "—") },
{ key: "cliente", label: "Cliente", opts: [...new Set(funcReports.map(r => { var _a; const a = assets.find(x => x.id === r.assetId); return ((_a = customers.find(c => c.id === (a === null || a === void 0 ? void 0 : a.customerId))) === null || _a === void 0 ? void 0 : _a.name) || ""; }).filter(Boolean))] },
{ key: "verifyType", label: "Tipo", render: v => React.createElement("span", { style: { fontSize: 11, color: v === "straordinaria" ? "#f59e0b" : "#64748b" } }, v || "periodica") },
{ key: "technician", label: "Tecnico" },
{ key: "overallPass", label: "Esito", render: v => React.createElement("span", { style: { fontWeight: 800, color: v === true || v === "true" ? "#22c55e" : "#ef4444" } }, v === true || v === "true" ? "✓ OK" : "✗ NO") },
{ key: "jobId", label: "Job", render: v => v ? React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#5EEAD4" } }, v) : React.createElement("span", { style: { color: "#475569" } }, "\u2014") },
], rows: funcReports.map(r => {
const a = assets.find(x => x.id === r.assetId) || {};
const c = customers.find(x => x.id === a.customerId) || {};
const tpl = FUNC_TEMPLATES[r.templateId] || FUNC_TEMPLATES["generico"];
return Object.assign(Object.assign({}, r), { tplLabel: tpl.icon + " " + tpl.label, assetName: a.name || r.assetId || "—", serial: a.serial || "", cliente: c.name || "" });
}), onEdit: row => setModal({ type: "func", data: funcReports.find(r => r.id === row.id), assetId: row.assetId }), onDelete: id => delFuncReport(id), actions: row => {
const rep = funcReports.find(r => r.id === row.id);
const a = assets.find(x => x.id === (rep === null || rep === void 0 ? void 0 : rep.assetId)) || {};
const c = customers.find(x => x.id === a.customerId) || {};
return React.createElement("button", { onClick: () => generateFuncPDF(rep, a, c, company), title: "PDF", style: { background: "#2DD4BF15", border: "1px solid #2563eb33", borderRadius: 5, color: "#5EEAD4", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }, " PDF");
} })))),
tab === "iec" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", null,
React.createElement("h1", { style: { margin: 0, fontSize: 18, fontWeight: 900 } }, "\u26A1 Verifiche Sicurezza Elettrica"),
React.createElement("p", { style: { color: "#64748b", margin: "2px 0 0", fontSize: 12, fontFamily: "monospace" } },
"IEC 62353 \u00B7 IEC 61010-1 \u00B7 ",
iecReports.length,
" rapporti")),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, variant: "ghost", onClick: exportIecReports }, "\u2B07 CSV"),
React.createElement(Btn, { sm: true, onClick: () => setModal({ type: "iec", data: null, assetId: null }) }, "+ Nuova verifica"))),
iecReports.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 40, marginBottom: 10, opacity: .5 } }, "\u26A1"),
React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } }, "Nessuna verifica registrata"),
React.createElement("div", { style: { fontSize: 12, color: "#475569", marginBottom: 18 } }, "Rapporti di verifica sicurezza elettrica IEC 62353 / 61010"),
React.createElement(Btn, { onClick: () => setModal({ type: "iec", data: null, assetId: null }) }, "+ Nuova verifica"))) : (React.createElement(ExcelTable, { defaultSort: "date", rowBg: row => row.overallPass === false || row.overallPass === "false" ? "#ef333308" : "", cols: [
{ key: "reportNumber", label: "N. Rapporto", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontWeight: 700 } }, v || "—") },
{ key: "date", label: "Data" },
{ key: "apparecchio", label: "Apparecchio", render: v => React.createElement("strong", { style: { color: "#e2e8f0" } }, v) },
{ key: "serial", label: "N. Serie", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11 } }, v || "—") },
{ key: "cliente", label: "Cliente", opts: [...new Set(iecReports.map(r => { var _a; const a = assets.find(x => x.id === r.assetId); return ((_a = customers.find(c => c.id === (a === null || a === void 0 ? void 0 : a.customerId))) === null || _a === void 0 ? void 0 : _a.name) || ""; }).filter(Boolean))] },
{ key: "norm", label: "Norma", opts: ["62353", "61010"], render: v => React.createElement("span", { style: { fontSize: 11, color: "#64748b" } },
"IEC ",
v) },
{ key: "equipClass", label: "Classe" },
{ key: "verifyType", label: "Tipo" },
{ key: "verifyType", label: "Tipo", render: v => React.createElement("span", { style: { fontSize: 11, color: v === "straordinaria" ? "#f59e0b" : "#64748b" } }, v || "periodica") },
{ key: "technician", label: "Tecnico" },
{ key: "overallPass", label: "Esito", render: v => React.createElement("span", { style: { fontWeight: 800, color: v === true || v === "true" ? "#22c55e" : "#ef4444" } }, v === true || v === "true" ? "✓ OK" : "✗ NO") },
{ key: "jobId", label: "Job", render: v => v ? React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11, color: "#5EEAD4" } }, v) : React.createElement("span", { style: { color: "#475569" } }, "\u2014") },
], rows: iecReports.map(r => { const a = assets.find(x => x.id === r.assetId) || {}; const c = customers.find(x => x.id === a.customerId) || {}; return Object.assign(Object.assign({}, r), { apparecchio: a.name || r.assetId || "—", serial: a.serial || "", cliente: c.name || "" }); }), onEdit: row => setModal({ type: "iec", data: iecReports.find(r => r.id === row.id), assetId: row.assetId }), onDelete: id => delIecReport(id), actions: row => {
const rep = iecReports.find(r => r.id === row.id);
const a = assets.find(x => x.id === (rep === null || rep === void 0 ? void 0 : rep.assetId)) || {};
const c = customers.find(x => x.id === a.customerId) || {};
return React.createElement("button", { onClick: () => generateIECPDF(rep, a, c, company), title: "PDF", style: { background: "#2DD4BF15", border: "1px solid #2563eb33", borderRadius: 5, color: "#5EEAD4", padding: "3px 8px", cursor: "pointer", fontSize: 11 } }, " PDF");
} })))),
tab === "schedule" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", null,
React.createElement("h1", { style: { margin: 0, fontSize: 18, fontWeight: 900 } }, "Pianificazione Annuale Annuale"),
React.createElement("p", { style: { color: "#64748b", margin: "2px 0 0", fontSize: 12, fontFamily: "monospace" } }, "Attivit\u00E0 programmate per anno \u2014 basato su nextService degli apparecchi")),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement("select", { value: scheduleYear, onChange: e => setScheduleYear(+e.target.value), style: { background: "#1E1E28", border: "1px solid #2a3040", borderRadius: 7, padding: "7px 11px", color: "#e2e8f0", fontSize: 13 } }, [new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2].map(y => React.createElement("option", { key: y, value: y }, y))),
React.createElement(Btn, { sm: true, variant: "ghost", onClick: () => {
const rows = scheduleRows;
downloadCSV("pianificazione-" + scheduleYear + ".csv", rows, [{ key: "month", label: "Mese" }, { key: "assetName", label: "Apparecchio" }, { key: "brand", label: "Marca" }, { key: "serial", label: "N.Serie" }, { key: "location", label: "Ubicazione" }, { key: "customer", label: "Cliente" }, { key: "norm", label: "Norma IEC" }, { key: "lastService", label: "Ultima verifica" }, { key: "nextService", label: "Data pianificata" }, { key: "status", label: "Stato apparecchio" }]);
} }, "\u2B07 CSV Pianificazione"))),
scheduleMonths.every(m => m.items.length === 0) ? (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 40, marginBottom: 10, opacity: .5 } }),
React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } },
"Nessuna attivit\u00E0 pianificata per ",
scheduleYear),
React.createElement("div", { style: { fontSize: 12, color: "#475569" } }, "Le attivit\u00E0 compaiono automaticamente quando salvi una Verifica IEC o imposti una data \"Prossimo Servizio\" negli apparecchi."))) : scheduleMonths.map(({ month, monthLabel, items }) => items.length === 0 ? null : (React.createElement("div", { key: month, style: { marginBottom: 20 } },
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, padding: "8px 14px", background: "#141418", borderRadius: "8px 8px 0 0", border: "1px solid #2a3040", borderBottom: "none" } },
React.createElement("span", { style: { fontWeight: 800, fontSize: 15, color: "#e2e8f0" } },
monthLabel,
" ",
scheduleYear),
React.createElement("span", { style: { fontSize: 11, color: "#64748b", fontFamily: "monospace" } },
items.length,
" apparecch",
items.length === 1 ? "io" : "i")),
React.createElement(ExcelTable, { defaultSort: "nextService", rowBg: row => {
const d = row._days;
return d < 0 ? "#ef333308" : d <= 30 ? "#f59e0b08" : "";
}, cols: [
{ key: "assetName", label: "Apparecchio", render: v => React.createElement("strong", { style: { color: "#e2e8f0" } }, v) },
{ key: "brand", label: "Marca" },
{ key: "serial", label: "N. Serie", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontSize: 11 } }, v || "—") },
{ key: "location", label: "Ubicazione", opts: [...new Set(items.map(i => i.location).filter(Boolean))] },
{ key: "customer", label: "Cliente", opts: [...new Set(items.map(i => i.customer).filter(Boolean))] },
{ key: "norm", label: "Norma IEC", opts: ["IEC 62353", "IEC 61010-1", "—"], render: v => React.createElement("span", { style: { fontSize: 11, color: "#64748b" } }, v) },
{ key: "lastService", label: "Ultima verifica", render: v => v || React.createElement("span", { style: { color: "#475569" } }, "mai") },
{ key: "nextService", label: "Data pianificata", render: (v, row) => React.createElement(AlertChip, { days: row._days }) },
{ key: "status", label: "Stato", opts: ["operativo", "in manutenzione", "fuori servizio"], render: v => React.createElement(Badge, { text: v, color: STATUS_COLOR[v] || "#64748b" }) },
], rows: items, actions: row => (React.createElement("button", { onClick: () => setModal({ type: "iec", data: null, assetId: row.assetId }), style: { background: "#2DD4BF15", border: "1px solid #2563eb33", borderRadius: 5, color: "#5EEAD4", padding: "3px 8px", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" } }, "Verifica")) })))))),
tab === "help" && React.createElement(HelpTab, { helpOpen: helpOpen, setHelpOpen: setHelpOpen }),
tab === "orders" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", null,
React.createElement("h1", { style: { margin: 0, fontSize: 18, fontWeight: 900 } }, "Ordini Fornitori"),
React.createElement("p", { style: { color: "#64748b", margin: "2px 0 0", fontSize: 12, fontFamily: "monospace" } },
stats.pendingOrders,
" in corso \u00B7 ",
orders.length,
" totali")),
React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
React.createElement(Btn, { sm: true, variant: "ghost", onClick: exportOrders }, "\u2B07 CSV"),
React.createElement(Btn, { sm: true, onClick: () => setModal({ type: "order", data: null }) }, "+ Nuovo"))),
orders.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 40, marginBottom: 10, opacity: .5 } }),
React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } }, "Nessun ordine"),
React.createElement(Btn, { onClick: () => setModal({ type: "order", data: null }) }, "Nuovo ordine"))) : (React.createElement(ExcelTable, { defaultSort: "orderDate", rowBg: row => row.status === "in attesa" ? "#f59e0b08" : "", cols: [
{ key: "id", label: "ID", render: v => React.createElement("span", { style: { color: "#64748b", fontFamily: "monospace", fontSize: 11 } }, v) },
{ key: "supplier", label: "Fornitore", render: v => React.createElement("strong", { style: { color: "#e2e8f0" } }, v) },
{ key: "nomeParte", label: "Parte" },
{ key: "qty", label: "Q.tà", render: v => React.createElement("span", { style: { fontFamily: "monospace" } }, v) },
{ key: "unitPrice", label: "Prezzo Unit.", render: v => React.createElement("span", { style: { fontFamily: "monospace" } },
"\u20AC",
parseFloat(v).toFixed(2)) },
{ key: "totale", label: "Totale", render: v => React.createElement("span", { style: { fontFamily: "monospace", fontWeight: 700, color: "#a855f7" } },
"\u20AC",
v) },
{ key: "status", label: "Stato", opts: ["in attesa", "confermato", "spedito", "ricevuto", "annullato"], render: v => React.createElement(Badge, { text: v, color: STATUS_COLOR[v] || "#94a3b8" }) },
{ key: "orderDate", label: "Data ordine" },
{ key: "expectedDate", label: "Consegna", render: v => v || "—" },
], rows: orders.map(o => { var _a; return (Object.assign(Object.assign({}, o), { nomeParte: ((_a = parts.find(p => p.id === o.partId)) === null || _a === void 0 ? void 0 : _a.name) || o.partId, totale: (o.qty * o.unitPrice).toFixed(2) })); }), onEdit: row => setModal({ type: "order", data: orders.find(o => o.id === row.id) }), onDelete: id => delOrder(id), actions: row => {
const o = orders.find(x => x.id === row.id);
return (o === null || o === void 0 ? void 0 : o.status) !== "ricevuto" && (o === null || o === void 0 ? void 0 : o.status) !== "annullato"
? React.createElement("button", { onClick: () => quickReceive(o), style: { background: "#22c55e15", border: "1px solid #22c55e33", borderRadius: 5, color: "#22c55e", padding: "3px 8px", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" } }, "\u2713 Ricevuto")
: null;
} })))),
tab === "withdrawals" && (React.createElement("div", null,
React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 } },
React.createElement("div", null,
React.createElement("h1", { style: { margin: 0, fontSize: 18, fontWeight: 900 } }, "Scarichi Magazzino"),
React.createElement("p", { style: { color: "#64748b", margin: "2px 0 0", fontSize: 12, fontFamily: "monospace" } },
"\u20AC",
withdrawals.reduce((s, w) => s + w.total, 0).toFixed(2),
" totali")),
parts.length > 0 && assets.length > 0 && React.createElement(Btn, { sm: true, variant: "success", onClick: () => setModal({ type: "withdrawal" }) }, " Nuovo")),
withdrawals.length === 0 ? (React.createElement("div", { style: { textAlign: "center", padding: "40px 18px", background: "#141418", borderRadius: 12, border: "1px dashed #2a3040" } },
React.createElement("div", { style: { fontSize: 40, marginBottom: 10, opacity: .5 } }),
React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 6 } }, "Nessuno scarico"),
React.createElement("div", { style: { fontSize: 12, color: "#475569" } }, "Le uscite di magazzino verranno registrate qui."))) : (React.createElement(ExcelTable, { defaultSort: "date", cols: [
{ key: "id", label: "ID", render: v => React.createElement("span", { style: { color: "#64748b", fontFamily: "monospace", fontSize: 11 } }, v) },
{ key: "date", label: "Data" },
{ key: "apparecchio", label: "Apparecchio", render: v => React.createElement("strong", { style: { color: "#e2e8f0" } }, v) },
{ key: "tech", label: "Tecnico", render: v => v || "—" },
{ key: "reason", label: "Motivo", render: v => React.createElement("span", { style: { color: "#94a3b8", fontSize: 11 } }, v || "—") },
{ key: "partiDesc", label: "Parti", render: v => React.createElement("span", { style: { color: "#64748b", fontSize: 11 } }, v) },
{ key: "total", label: "Totale", render: v => React.createElement("span", { style: { color: "#22c55e", fontWeight: 800, fontFamily: "monospace" } },
"\u20AC",
parseFloat(v).toFixed(2)) },
], rows: withdrawals.map(w => { var _a; return (Object.assign(Object.assign({}, w), { apparecchio: ((_a = assets.find(a => a.id === w.assetId)) === null || _a === void 0 ? void 0 : _a.name) || w.assetId || "—", partiDesc: w.items.map(r => { const p = parts.find(x => x.id === r.partId); return ((p === null || p === void 0 ? void 0 : p.name) || r.partId) + " x" + r.qty; }).join(", ") })); }) })))),
(modal === null || modal === void 0 ? void 0 : modal.type) === "asset" && React.createElement(Modal, { title: modal.data ? "Modifica Apparecchio" : "Nuovo Apparecchio", onClose: () => setModal(null) },
React.createElement(AssetForm, { initial: modal.data, customers: customers, onSave: saveAsset, onClose: () => setModal(null) })),
(modal === null || modal === void 0 ? void 0 : modal.type) === "part" && React.createElement(Modal, { title: modal.data ? "Modifica Parte" : "Nuova Parte", wide: true, onClose: () => setModal(null) },
React.createElement(PartForm, { initial: modal.data, assets: assets, onSave: savePart, onClose: () => setModal(null) })),
(modal === null || modal === void 0 ? void 0 : modal.type) === "job" && React.createElement(Modal, { title: ((_b = modal.data) === null || _b === void 0 ? void 0 : _b.id) ? "Modifica Job" : "Nuovo Job", wide: true, onClose: () => setModal(null) },
React.createElement(JobForm, { initial: ((_c = modal.data) === null || _c === void 0 ? void 0 : _c.id) ? modal.data : null, assets: assets, parts: parts, customers: customers, onSave: saveJob, onClose: () => setModal(null) })),
(modal === null || modal === void 0 ? void 0 : modal.type) === "order" && React.createElement(Modal, { title: modal.data ? "Modifica Ordine" : "Nuovo Ordine", onClose: () => setModal(null) },
React.createElement(OrderForm, { initial: modal.data, parts: parts, onSave: saveOrder, onClose: () => setModal(null) })),
(modal === null || modal === void 0 ? void 0 : modal.type) === "customer" && React.createElement(Modal, { title: modal.data ? "Modifica Cliente" : "Nuovo Cliente", onClose: () => setModal(null) },
React.createElement(CustomerForm, { initial: modal.data, onSave: saveCustomer, onClose: () => setModal(null) })),
(modal === null || modal === void 0 ? void 0 : modal.type) === "invoice" && React.createElement(Modal, { title: modal.data ? "Modifica Fattura" : "Nuova Fattura", wide: true, onClose: () => setModal(null) },
React.createElement(InvoiceForm, { initial: modal.data, customers: customers, jobs: jobs, assets: assets, parts: parts, generateNumber: generateInvoiceNumber, onSave: saveInvoice, onClose: () => setModal(null) })),
(modal === null || modal === void 0 ? void 0 : modal.type) === "withdrawal" && React.createElement(WithdrawalModal, { parts: parts, assets: assets, onWithdraw: handleWithdraw, onClose: () => setModal(null) }),
(modal === null || modal === void 0 ? void 0 : modal.type) === "assetDetail" && false,
(modal === null || modal === void 0 ? void 0 : modal.type) === "timeline" && React.createElement(TimelineModal, { job: modal.data, parts: parts, onSave: (data) => saveTimeline(modal.data.id, data), onClose: () => setModal(null) }),
(modal === null || modal === void 0 ? void 0 : modal.type) === "settings" && React.createElement(SettingsModal, { data: { assets, parts, jobs, orders, withdrawals, customers, invoices, iecReports, funcReports, company }, company: company, onUpdateCompany: setCompany, onImport: handleImport, onMerge: handleMerge, onReset: handleReset, onClose: () => setModal(null) }),
csvModal && (React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000d", zIndex: 1001, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } },
React.createElement("div", { style: { background: "#18181F", border: "1px solid #2a3040", borderRadius: 14, width: "min(640px,97vw)", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" } },
React.createElement("div", { style: { padding: "16px 20px", borderBottom: "1px solid #2a3040", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 } },
React.createElement("div", null,
React.createElement("div", { style: { fontWeight: 800, fontSize: 15, color: "#e2e8f0" } }, csvModal.isJson ? " Backup JSON" : " Esporta CSV"),
React.createElement("div", { style: { fontSize: 11, color: "#64748b", marginTop: 2, fontFamily: "monospace" } }, csvModal.filename)),
React.createElement("button", { onClick: () => setCsvModal(null), style: { background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer", lineHeight: 1 } }, "\u00D7")),
React.createElement("div", { style: { padding: "14px 20px", flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 12 } },
React.createElement("div", { style: { background: "#0D0D12", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e2a3a", fontSize: 11, color: "#64748b", lineHeight: 1.5 } }, csvModal.isJson
? React.createElement(React.Fragment, null,
React.createElement("strong", { style: { color: "#e2e8f0" } },
"Backup completo (",
csvModal.filename,
"):"),
" Clicca \"Copia tutto\", poi apri Blocco Note, incolla e salva come ",
React.createElement("strong", { style: { color: "#22c55e" } }, ".json"),
". Per ripristinare: Impostazioni \u2192 Importa backup.")
: React.createElement(React.Fragment, null,
React.createElement("strong", { style: { color: "#e2e8f0" } }, "Export CSV:"),
" Clicca \"Copia tutto\", poi incolla in Excel/Google Sheets. Oppure apri Blocco Note, incolla e salva come ",
React.createElement("strong", { style: { color: "#22c55e" } }, ".csv"),
".")),
React.createElement("textarea", { readOnly: true, value: csvModal.isJson ? csvModal.data : ("\uFEFF" + csvModal.data), id: "csv-textarea", style: { flex: 1, minHeight: 280, background: "#141418", border: "1px solid #2a3040", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 11, fontFamily: "monospace", resize: "none", outline: "none" }, onClick: e => { e.target.select(); e.target.setSelectionRange(0, 999999); } })),
React.createElement("div", { style: { padding: "12px 20px", borderTop: "1px solid #2a3040", display: "flex", gap: 8, justifyContent: "space-between", alignItems: "center", flexShrink: 0 } },
React.createElement("button", { onClick: () => {
const text = csvModal.isJson ? csvModal.data : ("\uFEFF" + csvModal.data);
if (navigator.clipboard) {
navigator.clipboard.writeText(text).then(() => showToast("Copiato!")).catch(() => { });
}
}, style: { background: "#2DD4BF", color: "#fff", border: "none", borderRadius: 7, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700 } }, "Copia negli appunti"),
React.createElement("button", { onClick: () => {
const text = csvModal.isJson ? csvModal.data : ("\uFEFF" + csvModal.data);
const ta = document.querySelector("#csv-textarea");
if (ta) {
ta.select();
ta.setSelectionRange(0, 999999);
}
if (navigator.clipboard) {
navigator.clipboard.writeText(text).then(() => showToast("✓ Copiato! Incolla in Notepad e salva come ." + (csvModal.isJson ? "json" : "csv"))).catch(() => showToast("Seleziona il testo e copia con Ctrl+C", "#f59e0b"));
}
else {
showToast("Seleziona il testo e copia con Ctrl+C", "#f59e0b");
}
}, style: { background: "#22c55e", color: "#fff", border: "none", borderRadius: 7, padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 700 } }, "Copia tutto"),
React.createElement("button", { onClick: () => setCsvModal(null), style: { background: "#1E1E28", color: "#94a3b8", border: "1px solid #2a3040", borderRadius: 7, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700 } }, "Chiudi"))))),
pdfHtml && (React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000e", zIndex: 1000, display: "flex", flexDirection: "column" } },
React.createElement("div", { style: { background: "#0D0D12", borderBottom: "1px solid #2a3040", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexShrink: 0 } },
React.createElement("span", { style: { color: "#e2e8f0", fontWeight: 700, fontSize: 14 } }, " Anteprima documento"),
React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
React.createElement("button", { onClick: () => {
const w = window.open('', '_blank');
if (w) {
w.document.open();
w.document.write(pdfHtml);
w.document.close();
}
}, style: { background: "#2DD4BF", color: "#000", border: "none", borderRadius: 7, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 } }, "Apri / Stampa PDF"),
React.createElement("button", { onClick: () => setPdfHtml(null), style: { background: "#1E1E28", color: "#94a3b8", border: "1px solid #2a3040", borderRadius: 7, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 } }, "\u2715 Chiudi"))),
React.createElement("div", { style: { flex: 1, overflow: "auto", background: "#f0f0f0", padding: "20px", display: "flex", justifyContent: "center" } },
React.createElement("div", { style: { background: "#fff", width: "210mm", minHeight: "297mm", boxShadow: "0 4px 24px #0004", padding: "15mm" }, dangerouslySetInnerHTML: { __html: (() => {
const styleMatch = pdfHtml.match(/<style>([\s\S]*?)<\/style>/i);
const bodyMatch = pdfHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const style = styleMatch ? '<style>' + styleMatch[1] + '</style>' : '';
const body = bodyMatch ? bodyMatch[1] : pdfHtml;
return style + body;
})() } })))),
(modal === null || modal === void 0 ? void 0 : modal.type) === "iec" && (React.createElement(Modal, { title: modal.data ? "Modifica Rapporto IEC" : "Nuova Verifica Sicurezza Elettrica", wide: true, onClose: () => setModal(null) },
React.createElement(IECReportForm, { initial: modal.data || null, assetId: ((_d = modal.data) === null || _d === void 0 ? void 0 : _d.assetId) || modal.assetId || null, assets: assets, customers: customers, onSave: saveIecReport, onClose: () => setModal(null) }))),
(modal === null || modal === void 0 ? void 0 : modal.type) === "assetDetail" && modal.data && (React.createElement(Modal, { title: " ", wide: true, onClose: () => setModal(null) },
React.createElement(AssetDetailModal, { asset: modal.data, jobs: jobs, parts: parts, iecReports: iecReports, funcReports: funcReports, customers: customers, company: company, generateIECPDF: generateIECPDF, generateFuncPDF: generateFuncPDF, onClose: () => setModal(null), onEditAsset: () => setModal({ type: "asset", data: modal.data }), onNewJob: () => setModal({ type: "job", data: { assetId: modal.data.id, type: "correttiva", priority: "normale", status: "aperto", description: "", openDate: new Date().toISOString().slice(0, 10), parts: [], laborHours: 0, laborRate: 55, notes: "", timeline: [], photos: [] } }), onNewIec: () => setModal({ type: "iec", assetId: modal.data.id, data: null }), onNewFunc: () => setModal({ type: "func", assetId: modal.data.id, data: null }), onOpenJob: j => setModal({ type: "job", data: j }) }))),
(modal === null || modal === void 0 ? void 0 : modal.type) === "func" && (React.createElement(Modal, { title: modal.data ? "Modifica Verifica Funzionale" : "Nuova Verifica Funzionale", wide: true, onClose: () => setModal(null) },
React.createElement(FuncVerifyForm, { initial: modal.data || null, assetId: ((_e = modal.data) === null || _e === void 0 ? void 0 : _e.assetId) || modal.assetId || null, assets: assets, customers: customers, onSave: saveFuncReport, onClose: () => setModal(null) }))))));
}
var _confirmCallback = null;
var _setConfirmState = null;
var _setPromptState = null;
function appConfirm(msg, onYes) {
_confirmCallback = onYes;
if (_setConfirmState)
_setConfirmState({ open: true, msg: msg });
}
function appPromptCb(msg, onOk) {
if (_setPromptState)
_setPromptState({ open: true, msg: msg, value: '', cb: onOk });
}
function ConfirmDialog() {
const [state, setState] = React.useState({ open: false, msg: '' });
React.useEffect(() => { _setConfirmState = setState; }, []);
if (!state.open)
return null;
const answer = ok => {
setState({ open: false, msg: '' });
if (ok && _confirmCallback)
_confirmCallback();
_confirmCallback = null;
};
return (React.createElement("div", { style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999,
display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }, onClick: () => answer(false) },
React.createElement("div", { style: { background: '#1E1E28', border: '1px solid #2A2A38', borderRadius: 14,
padding: '24px 22px', maxWidth: 340, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,.7)' }, onClick: e => e.stopPropagation() },
React.createElement("div", { style: { fontSize: 14, color: '#E2E8F0', lineHeight: 1.6, marginBottom: 20,
whiteSpace: 'pre-line' } }, state.msg),
React.createElement("div", { style: { display: 'flex', gap: 10, justifyContent: 'flex-end' } },
React.createElement("button", { onClick: () => answer(false), style: { background: '#2A2A38',
border: '1px solid #3A3A4A', borderRadius: 8, color: '#94a3b8', padding: '9px 18px',
cursor: 'pointer', fontSize: 13, fontWeight: 600, touchAction: 'manipulation',
WebkitTapHighlightColor: 'transparent' } }, "Annulla"),
React.createElement("button", { onClick: () => answer(true), style: { background: 'linear-gradient(135deg,#ef4444,#dc2626)',
border: 'none', borderRadius: 8, color: '#fff', padding: '9px 18px', cursor: 'pointer',
fontSize: 13, fontWeight: 700, touchAction: 'manipulation',
WebkitTapHighlightColor: 'transparent' } }, "Conferma")))));
}
function PromptDialog() {
const [state, setState] = React.useState({ open: false, msg: '', value: '', cb: null });
React.useEffect(() => { _setPromptState = setState; }, []);
if (!state.open)
return null;
const answer = ok => {
const val = ok ? state.value : null;
const cb = state.cb;
setState({ open: false, msg: '', value: '', cb: null });
if (cb)
cb(val);
};
return (React.createElement("div", { style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999,
display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }, onClick: () => answer(false) },
React.createElement("div", { style: { background: '#1E1E28', border: '1px solid #2A2A38', borderRadius: 14,
padding: '24px 22px', maxWidth: 340, width: '100%' }, onClick: e => e.stopPropagation() },
React.createElement("div", { style: { fontSize: 14, color: '#E2E8F0', lineHeight: 1.6, marginBottom: 14,
whiteSpace: 'pre-line' } }, state.msg),
React.createElement("input", { autoFocus: true, value: state.value, onChange: e => setState(s => (Object.assign(Object.assign({}, s), { value: e.target.value }))), onKeyDown: e => { if (e.key === 'Enter')
answer(true); }, style: { width: '100%', background: '#0D0D12', border: '1px solid #2A2A38',
borderRadius: 8, color: '#F0F0F5', padding: '9px 12px', fontSize: 14,
marginBottom: 16, boxSizing: 'border-box' } }),
React.createElement("div", { style: { display: 'flex', gap: 10, justifyContent: 'flex-end' } },
React.createElement("button", { onClick: () => answer(false), style: { background: '#2A2A38',
border: '1px solid #3A3A4A', borderRadius: 8, color: '#94a3b8', padding: '9px 18px',
cursor: 'pointer', fontSize: 13, fontWeight: 600, touchAction: 'manipulation' } }, "Annulla"),
React.createElement("button", { onClick: () => answer(true), style: { background: 'linear-gradient(135deg,#2DD4BF,#0D9488)',
border: 'none', borderRadius: 8, color: '#000', padding: '9px 18px', cursor: 'pointer',
fontSize: 13, fontWeight: 700, touchAction: 'manipulation' } }, "OK"))),
React.createElement(ConfirmDialog, null),
React.createElement(PromptDialog, null)));
}
function App() {
const [currentUser, setCurrentUser] = React.useState(undefined);
const [authReady, setAuthReady] = React.useState(false);
React.useEffect(() => {
if (!window.supabase) {
setCurrentUser({ id: 'offline-user', email: 'offline@local' });
setAuthReady(true);
return;
}
const supa = getSupa();
if (!supa) {
setCurrentUser({ id: 'offline-user', email: 'offline@local' });
setAuthReady(true);
return;
}
supa.auth.getUser().then(({ data }) => { setCurrentUser(data.user || null); setAuthReady(true); });
const { data: { subscription } } = supa.auth.onAuthStateChange((_, session) => { setCurrentUser((session === null || session === void 0 ? void 0 : session.user) || null); });
return () => subscription.unsubscribe();
}, []);
if (!authReady)
return (React.createElement("div", { style: { minHeight: '100vh', background: '#0D0D12', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
React.createElement("div", { style: { width: 32, height: 32, border: '3px solid #2A2A38', borderTopColor: '#2DD4BF', borderRadius: '50%', animation: 'spin .6s linear infinite' } }),
React.createElement("style", null, "@keyframes spin{to{transform:rotate(360deg)}}")));
if (!currentUser)
return React.createElement(LoginScreen, { onLogin: setCurrentUser });
return React.createElement(AppMain, null);
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));

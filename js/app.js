/* ===================== RedesLingo — motor de la app ===================== */
(() => {
  'use strict';

  /* ---------- Utilidades ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const strip = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[“”"'`]/g, '').replace(/\s+/g, ' ').trim().replace(/[.;]+$/, '');
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const dayDiff = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000);
  const app = document.getElementById('app');
  const FIGS = window.FIG || {};
  const fig = key => (key && FIGS[key] ? FIGS[key]() : '');

  /* ---------- Mascota "Bit" e íconos ---------- */
  function mascot(mood = 'idle') {
    let eyes;
    if (mood === 'happy') {
      eyes = `<path d="M30 48 Q38 38 46 48" stroke="#2B2B2B" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M54 48 Q62 38 70 48" stroke="#2B2B2B" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
    } else if (mood === 'sad') {
      eyes = `<circle cx="38" cy="47" r="11" fill="#fff"/><circle cx="62" cy="47" r="11" fill="#fff"/><circle cx="38" cy="51" r="5.5" fill="#2B2B2B"/><circle cx="62" cy="51" r="5.5" fill="#2B2B2B"/><path d="M27 34 L46 38 M73 34 L54 38" stroke="#3F7F00" stroke-width="3.5" stroke-linecap="round"/>`;
    } else {
      const dx = mood === 'talk' ? 2 : 1;
      eyes = `<circle cx="38" cy="47" r="11" fill="#fff"/><circle cx="62" cy="47" r="11" fill="#fff"/><circle cx="${38 + dx}" cy="48" r="5.5" fill="#2B2B2B"/><circle cx="${62 + dx}" cy="48" r="5.5" fill="#2B2B2B"/><circle cx="${40 + dx}" cy="45.5" r="2" fill="#fff"/><circle cx="${64 + dx}" cy="45.5" r="2" fill="#fff"/>`;
    }
    const beak = mood === 'talk'
      ? `<path d="M43.5 58 L56.5 58 L50 67 Z" fill="#FF9600"/><path d="M46 61 L54 61 L50 65 Z" fill="#C65F00"/>`
      : `<path d="M44 58 L56 58 L50 65 Z" fill="#FF9600"/>`;
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="50" cy="93" rx="24" ry="4" fill="rgba(0,0,0,.12)"/>
      <path d="M50 25 V14" stroke="#3F7F00" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="50" cy="11" r="5" fill="#FFC800"/>
      <path d="M41 6 Q50 -1 59 6" stroke="#1CB0F6" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="40" cy="89" rx="7.5" ry="4" fill="#FF9600"/><ellipse cx="60" cy="89" rx="7.5" ry="4" fill="#FF9600"/>
      <path d="M22 56 Q8 58 13 73 Q20 69 25 67 Z" fill="#46A302"/><path d="M78 56 Q92 58 87 73 Q80 69 75 67 Z" fill="#46A302"/>
      <rect x="20" y="23" width="60" height="66" rx="29" fill="#58CC02"/>
      <ellipse cx="50" cy="71" rx="19" ry="14" fill="#89E219"/>
      <rect x="40" y="70" width="20" height="11" rx="2.5" fill="#3F7F00"/>
      <rect x="43" y="72" width="2.2" height="4" fill="#FFC800"/><rect x="47" y="72" width="2.2" height="4" fill="#FFC800"/><rect x="51" y="72" width="2.2" height="4" fill="#FFC800"/><rect x="55" y="72" width="2.2" height="4" fill="#FFC800"/>
      <circle cx="27" cy="58" r="4.5" fill="#FF86B3" opacity=".55"/><circle cx="73" cy="58" r="4.5" fill="#FF86B3" opacity=".55"/>
      ${eyes}${beak}
    </svg>`;
  }
  const IC = {
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.6l2.85 5.95 6.55.85-4.8 4.55 1.2 6.5L12 17.35 6.2 20.45l1.2-6.5L2.6 9.4l6.55-.85z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" d="M5 12.6l4.5 4.4L19 7.5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 10V8a5 5 0 0110 0v2h1a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9a1 1 0 011-1h1zm2 0h6V8a3 3 0 00-6 0v2z"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 3h10v2h3v3a4 4 0 01-4 4h-.35A5 5 0 0113 14.9V17h3v3H8v-3h3v-2.1A5 5 0 018.35 12H8a4 4 0 01-4-4V5h3zm0 4H6v1a2 2 0 001 1.73zm10 0v2.73A2 2 0 0018 8V7z"/></svg>',
    crown: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 7.5l4.6 4L12 4.5l4.4 7 4.6-4-2 11.5H5zM5.4 20.5h13.2v1.5H5.4z"/></svg>'
  };
  const SAYS = ['¡Mira esto! 👀', 'Esto suele salir en el examen 😉', 'Presta atención a lo resaltado ✨', 'Lee con calma, luego te pregunto 🤓'];
  const PRAISE = ['¡Excelente!', '¡Muy bien!', '¡Genial!', '¡Perfecto!', '¡Así se hace!', '¡Increíble!', '¡Correcto!'];

  /* ---------- Modelo del curso ---------- */
  const UNITS = (window.RL && window.RL.units) || [];
  const LESSONS = {};
  UNITS.forEach(u => u.lessons.forEach((l, i) => { l.unit = u; l.num = i + 1; LESSONS[l.id] = l; }));
  const SECTIONS = [], NODES = [];
  function addUnitSection(u) {
    const sec = { id: u.id, kind: 'unit', unit: u, kicker: u.kicker, title: u.title, color: u.color, dark: u.dark, nodes: [] };
    u.lessons.forEach(l => sec.nodes.push({ id: l.id, type: 'lesson', unit: u, lesson: l, title: l.title, icon: l.icon }));
    sec.nodes.push({ id: u.id + '-rev', type: 'review', unit: u, title: 'Repaso: ' + u.title, icon: '🏆' });
    sec.nodes.forEach(n => { n.sec = sec; NODES.push(n); });
    SECTIONS.push(sec);
  }
  UNITS.filter(u => !u.extra).forEach(addUnitSection);
  const META = { id: 'meta', kind: 'meta', kicker: 'Meta de la ruta del examen', title: 'Examen final', color: '#7A5AF8', dark: '#5B3FD6', nodes: [] };
  META.nodes.push({ id: 'final', type: 'final', title: 'Examen final', icon: '👑', sec: META });
  SECTIONS.push(META); NODES.push(META.nodes[0]);
  UNITS.filter(u => u.extra).forEach(addUnitSection);
  const NODE = {};
  NODES.forEach((n, i) => { n.i = i; NODE[n.id] = n; });
  const MAIN_NODES = NODES.filter(n => !(n.unit && n.unit.extra));

  // Lección de estudio rápido (fuera de la ruta): Tabla de clases IP
  const QUICK = window.RL && window.RL.quick;
  if (QUICK) {
    QUICK.unit = { id: 'quick', kicker: QUICK.kicker, title: QUICK.title, color: QUICK.color, dark: QUICK.dark, lessons: [QUICK] };
    QUICK.num = 1; LESSONS[QUICK.id] = QUICK;
  }
  // Sesiones que no son niveles de la ruta
  const SPECIAL = {
    mistakes: { title: 'Práctica de errores', tag: '🎯 Práctica de errores', xp: 5, doneTitle: '¡Errores repasados!', doneSub: 'Practicar lo que fallas es la mejor forma de aprender.' },
    ipq: { title: 'Tabla de clases IP', tag: '⚡ Estudio rápido', xp: 10, doneTitle: '¡Tabla de clases IP aprendida! 🅰️', doneSub: 'Ahora practica analizando IPs hasta que te salgan todas.' },
    ipdrill: { title: 'Práctica de IPs', tag: '🎯 Práctica de IPs', xp: 10, doneTitle: '¡Práctica de IPs completada! 🎯', doneSub: 'Cada ronda trae IPs nuevas. ¡Repite hasta sacar 100%!' }
  };

  const getStep = (ref, run) => {
    ref = String(ref);
    if (ref.startsWith('gen:')) { const r = run === undefined ? S.run : run; return r && r.gen ? r.gen[ref] || null : null; }
    const [lid, k] = ref.split(':'); const L = LESSONS[lid]; return L ? L.steps[+k] || null : null;
  };
  const lessonOf = ref => (String(ref).startsWith('gen:') ? LESSONS.ipq : LESSONS[String(ref).split(':')[0]]);
  const exRefsOf = l => l.steps.map((s, k) => (s.t === 'teach' || s.t === 'gen' ? null : l.id + ':' + k)).filter(Boolean);

  /* ---------- Generador de ejercicios "Analiza la IP" ---------- */
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const CLS = { A: { r: [1, 127], net: 1 }, B: { r: [128, 191], net: 2 }, C: { r: [192, 223], net: 3 } };
  const MASK_OF = { A: '255.0.0.0', B: '255.255.0.0', C: '255.255.255.0' };
  const TYPE_LABEL = { host: 'Host normal', mask: 'Máscara de subred', broadcast: 'Broadcast', red: 'Dirección de red' };
  function invalidIp() {
    const o = [rnd(1, 223), rnd(0, 255), rnd(0, 255), rnd(1, 254)];
    const k = pick(['big', 'big', 'big', 'big', 'three', 'five', 'letter', 'empty', 'neg']);
    let why;
    if (k === 'big') { const i = rnd(0, 3), v = pick([256, 300, rnd(256, 999)]); o[i] = v; why = `el octeto ${v} es mayor que 255 (cada octeto va de 0 a 255)`; }
    else if (k === 'three') { o.pop(); why = 'tiene solo 3 octetos; una IPv4 necesita exactamente 4'; }
    else if (k === 'five') { o.push(rnd(0, 255)); why = 'tiene 5 octetos; una IPv4 tiene exactamente 4'; }
    else if (k === 'letter') { const i = rnd(1, 3), v = pick(['a', 'x', '1a', 'b2', 'ab']); o[i] = v; why = `contiene "${v}", que no es un número`; }
    else if (k === 'empty') { o[rnd(1, 2)] = ''; why = 'tiene un octeto vacío (dos puntos seguidos)'; }
    else { const i = rnd(1, 3), v = -rnd(1, 20); o[i] = v; why = `tiene un número negativo (${v}); los octetos van de 0 a 255`; }
    return { t: 'ipcheck', ip: o.join('.'), valid: false, e: `❌ Inválida: ${why}.` };
  }
  function genIp(kind) {
    if (kind === 'invalid') return invalidIp();
    if (kind === 'mask') {
      const m = Math.random() < 0.75 ? pick(['255.0.0.0', '255.255.0.0', '255.255.255.0']) : pick(['255.255.255.128', '255.255.255.192', '255.255.240.0', '255.255.255.252', '255.240.0.0']);
      const bits = m.split('.').reduce((a, x) => a + (Number(x).toString(2).match(/1/g) || []).length, 0);
      return { t: 'ipcheck', ip: m, valid: true, type: 'mask', e: `✅ Formato válido · Son 255 (bits en 1) seguidos de 0 → máscara de subred /${bits}. Las máscaras no tienen clase.` };
    }
    const c = pick(['A', 'B', 'C']), n = CLS[c].net;
    let first;
    if (Math.random() < 0.4) first = c === 'A' ? pick([10, 10, 12, 100]) : c === 'B' ? pick([172, 172, 150, 190]) : pick([192, 192, 200, 210]);
    else first = c === 'A' ? rnd(1, 126) : rnd(CLS[c].r[0], CLS[c].r[1]);
    const net = [first];
    while (net.length < n) net.push(net.length === 1 && first === 172 ? rnd(16, 31) : net.length === 1 && first === 192 ? 168 : rnd(0, 255));
    const hn = 4 - n;
    let host;
    if (kind === 'broadcast') host = Array(hn).fill(255);
    else if (kind === 'red') host = Array(hn).fill(0);
    else {
      do {
        host = hn === 1 ? [Math.random() < 0.3 ? pick([1, 254]) : rnd(1, 254)]
          : Array.from({ length: hn }, () => (Math.random() < 0.45 ? pick([0, 255]) : rnd(1, 254)));
      } while (host.every(v => v === 0) || host.every(v => v === 255));
    }
    const hp = host.join('.');
    const verdict = kind === 'broadcast' ? 'toda en 255 → broadcast (no se asigna a equipos)'
      : kind === 'red' ? 'toda en 0 → dirección de red (no se asigna a equipos)'
      : 'no es toda 0 ni toda 255 → host normal (se puede asignar a una PC)';
    return {
      t: 'ipcheck', ip: net.concat(host).join('.'), valid: true, type: kind, cls: c, hp, hn,
      e: `✅ Formato válido · ${first} está entre ${CLS[c].r[0]} y ${CLS[c].r[1]} → Clase ${c} (máscara ${MASK_OF[c]}) · Parte de host: ${hp} → ${verdict}.`
    };
  }
  function genSet(n) {
    const kinds = ['invalid', 'invalid', 'mask', 'broadcast', 'broadcast', 'broadcast', 'red', 'host', 'host', 'host'];
    const out = [], seen = new Set();
    let bag = [];
    while (out.length < n) {
      if (!bag.length) bag = shuffle(kinds);
      const g = genIp(bag.pop());
      if (seen.has(g.ip)) continue;
      seen.add(g.ip); out.push(g);
    }
    return out;
  }
  function buildQuick(id) {
    const L = LESSONS.ipq, gen = {}, list = [];
    let g = 0;
    const addGen = n => genSet(n).forEach(st => { const ref = 'gen:' + g++; gen[ref] = st; list.push(ref); });
    if (id === 'ipq') L.steps.forEach((s, k) => { if (s.t === 'gen') addGen(s.n); else list.push('ipq:' + k); });
    else { addGen(12); sampleLessons([L], 4).forEach(r => list.push(r)); }
    return { list: id === 'ipdrill' ? shuffle(list) : list, gen };
  }
  function sampleLessons(lessons, k) {
    const pools = shuffle(lessons).map(l => shuffle(exRefsOf(l)));
    const out = [];
    while (out.length < k && pools.some(p => p.length)) pools.forEach(p => { if (p.length && out.length < k) out.push(p.pop()); });
    return shuffle(out);
  }

  /* ---------- Estado persistente ---------- */
  const KEY = 'redeslingo:v1';
  const DEF = () => ({ v: 1, done: {}, xp: 0, streak: { n: 0, last: null }, mistakes: {}, run: null, sound: true, theme: 'auto', free: true, avatarAt: null, stats: { first: 0, ex: 0, runs: 0, hints: 0 }, created: Date.now() });
  function sanitize(o) {
    const s = Object.assign(DEF(), o && typeof o === 'object' ? o : {});
    s.done = s.done && typeof s.done === 'object' ? s.done : {};
    s.mistakes = s.mistakes && typeof s.mistakes === 'object' ? s.mistakes : {};
    s.streak = Object.assign({ n: 0, last: null }, s.streak || {});
    s.stats = Object.assign(DEF().stats, s.stats || {});
    Object.keys(s.mistakes).forEach(r => { if (!getStep(r, null)) delete s.mistakes[r]; });
    const r = s.run;
    if (r && (!Array.isArray(r.list) || !r.list.length || r.list.some(x => !getStep(x, r)) || (!SPECIAL[r.node] && !NODE[r.node]))) s.run = null;
    return s;
  }
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) return sanitize(JSON.parse(raw)); } catch (e) { /* almacenamiento no disponible */ }
    return DEF();
  }
  let S = load();
  let saveWarned = false;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); saveWarned = false; }
    catch (e) { if (!saveWarned) toast('⚠️ Este navegador no permite guardar el progreso'); saveWarned = true; }
  }

  const isDone = id => !!S.done[id];
  const doneCount = (list = NODES) => list.filter(n => isDone(n.id)).length;
  const pct = (list = NODES) => Math.round(100 * doneCount(list) / list.length);
  const curIndex = () => NODES.findIndex(n => !isDone(n.id));
  const unlocked = i => i === 0 || isDone(NODES[i].id) || isDone(NODES[i - 1].id);
  const nodeState = (i, ci) => (isDone(NODES[i].id) ? 'done' : i === ci ? 'current' : unlocked(i) || S.free ? 'open' : 'locked');
  const streakNow = () => (!S.streak.last ? 0 : dayDiff(S.streak.last, today()) <= 1 ? S.streak.n : 0);
  const mistakeCount = () => Object.keys(S.mistakes).length;
  const xpFor = n => (n.type === 'final' ? 30 : n.type === 'review' ? 15 : 10);
  const runTitle = r => (SPECIAL[r.node] ? SPECIAL[r.node].title : NODE[r.node].title);

  /* ---------- Sonido (Web Audio, sin archivos) ---------- */
  const Snd = {
    ctx: null,
    get() {
      if (!this.ctx) { const C = window.AudioContext || window.webkitAudioContext; if (C) this.ctx = new C(); }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    },
    tone(f, d, type = 'sine', at = 0, g = 0.16) {
      if (!S.sound) return;
      try {
        const c = this.get(); if (!c) return;
        const t = c.currentTime + at, o = c.createOscillator(), v = c.createGain();
        o.type = type; o.frequency.setValueAtTime(f, t);
        v.gain.setValueAtTime(0.0001, t); v.gain.exponentialRampToValueAtTime(g, t + 0.015); v.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(v); v.connect(c.destination); o.start(t); o.stop(t + d + 0.03);
      } catch (e) { /* sin audio */ }
    },
    ok() { this.tone(784, 0.12); this.tone(1175, 0.24, 'sine', 0.09); },
    bad() { this.tone(220, 0.16, 'square', 0, 0.06); this.tone(170, 0.26, 'square', 0.12, 0.06); },
    tap() { this.tone(560, 0.05, 'sine', 0, 0.05); },
    pair() { this.tone(880, 0.09, 'sine', 0, 0.1); },
    win() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.22, 'triangle', i * 0.12, 0.13)); this.tone(1319, 0.5, 'triangle', 0.5, 0.11); }
  };

  /* ---------- UI genérica ---------- */
  function toast(msg, ms = 2400) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), ms);
  }
  function closeModal() { $$('.modal-back').forEach(m => m.remove()); }
  function modal(html, onMount) {
    closeModal();
    const b = document.createElement('div'); b.className = 'modal-back';
    b.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
    b.addEventListener('click', e => { if (e.target === b) closeModal(); });
    document.body.appendChild(b);
    if (onMount) onMount(b.firstElementChild);
    return b;
  }
  function confirmBox({ title, text, ok = 'ACEPTAR', cancel = 'CANCELAR', danger = false, mood = 'idle' }) {
    return new Promise(res => {
      modal(`<div class="m-mascot">${mascot(mood)}</div><h3 style="text-align:center">${esc(title)}</h3><p style="text-align:center">${esc(text)}</p>
        <div class="m-btns"><button class="btn wide ${danger ? 'red' : ''}" id="mok">${esc(ok)}</button><button class="btn flat wide" id="mno">${esc(cancel)}</button></div>`, m => {
        $('#mok', m).onclick = () => { closeModal(); res(true); };
        $('#mno', m).onclick = () => { closeModal(); res(false); };
      });
    });
  }
  function confetti() {
    const c = document.createElement('div'); c.className = 'confetti';
    const cols = ['#58CC02', '#1CB0F6', '#FFC800', '#FF4B4B', '#CE82FF', '#FF9600'];
    for (let i = 0; i < 90; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + 'vw'; p.style.background = pick(cols);
      p.style.animationDuration = (1.8 + Math.random() * 1.8) + 's'; p.style.animationDelay = Math.random() * 0.6 + 's';
      p.style.width = (7 + Math.random() * 6) + 'px';
      c.appendChild(p);
    }
    document.body.appendChild(c); setTimeout(() => c.remove(), 4800);
  }
  function applyTheme() {
    if (S.theme === 'light' || S.theme === 'dark') document.documentElement.setAttribute('data-theme', S.theme);
    else document.documentElement.removeAttribute('data-theme');
  }
  function syncTopbarH() { const tb = $('#topbar'); if (tb) document.documentElement.style.setProperty('--topbar-h', tb.offsetHeight + 'px'); }

  function topbar() {
    const p = pct(), active = S.streak.last === today();
    return `<header class="topbar" id="topbar"><div class="tb-in">
      <div class="tb-row"><div class="logo">${mascot('idle')}<span>RedesLingo</span></div>
      <div class="chips"><span class="stat ${active ? 'fire' : 'cold'}" title="Días seguidos estudiando">🔥 ${streakNow()}</span><span class="stat xp" title="Puntos de experiencia">⚡ ${S.xp}</span></div></div>
      <div class="gprog" title="Progreso de toda la app"><span class="gp-k">Progreso</span><div class="bar"><i style="width:${p}%"></i></div><span class="gp-l">${doneCount()}/${NODES.length} · ${p}%</span></div>
    </div></header>`;
  }
  function bnav(on) {
    const mc = mistakeCount();
    const items = [['path', '🏠', 'Ruta'], ['guide', '📖', 'Guía'], ['mistakes', '🎯', mc ? `Errores (${mc})` : 'Errores'], ['profile', '👤', 'Perfil']];
    return `<nav class="bnav"><div class="bnav-in">${items.map(([k, ic, l]) => `<button data-tab="${k}" class="${k === on ? 'on' : ''}"><span class="ic">${ic}</span>${l}</button>`).join('')}</div></nav>`;
  }

  /* ---------- Navegación ---------- */
  let screen = null;
  function go(tab, arg) {
    closePop();
    if (tab === 'path') {
      if (history.state && history.state.tab) { history.back(); return; }
      renderPath(true);
      return;
    }
    if (!(history.state && history.state.tab)) history.pushState({ tab: 1 }, '');
    if (tab === 'guide') renderGuide(arg);
    else if (tab === 'mistakes') renderMistakes();
    else if (tab === 'profile') renderProfile();
    if (!arg) window.scrollTo(0, 0);
  }
  app.addEventListener('click', e => {
    const t = e.target.closest('[data-tab]');
    if (t) { Snd.tap(); go(t.dataset.tab); }
  });
  window.addEventListener('popstate', () => {
    closeModal(); closePop();
    if (screen !== 'path') renderPath(true);
  });

  /* ---------- Pantalla: Ruta ---------- */
  const OFFS = [0, 46, 74, 46, 0, -46, -74, -46];
  let pendingWalk = false, io = null;

  function nodeIcon(n, st) {
    if (n.type === 'final') return IC.crown;
    if (n.type === 'review') return IC.trophy;
    if (st === 'done') return IC.check;
    if (st === 'locked') return IC.lock;
    return IC.star;
  }
  function resumeBar() {
    if (!S.run) return '';
    const p = Math.round(100 * S.run.done / S.run.total);
    return `<div class="resume-bar" id="resume"><span>⏸️</span><span class="t">A medias: <b>${esc(runTitle(S.run))}</b> · ${p}%</span><button class="btn sm">CONTINUAR</button></div>`;
  }

  function renderPath(centerCurrent) {
    screen = 'path';
    const ci = curIndex();
    let h = topbar() + `<main class="path-wrap page" id="pw"><svg class="path-svg" id="psvg" aria-hidden="true"></svg>` + quickCard();
    SECTIONS.forEach(sec => {
      const d = doneCount(sec.nodes), tot = sec.nodes.length;
      h += `<section class="unit" style="--u:${sec.color};--u-d:${sec.dark}">
        <div class="unit-banner"><div class="ub-txt"><div class="ub-k">${esc(sec.kicker)}</div><div class="ub-t">${esc(sec.title)}</div>
        <div class="ub-p"><div class="bar sm"><i style="width:${Math.round(100 * d / tot)}%"></i></div><span>${d}/${tot}</span></div></div>
        ${sec.kind === 'unit' ? `<button class="ub-guide" data-guide="${sec.id}" aria-label="Guía de la unidad"><span>📖</span><span>GUÍA</span></button>` : ''}</div>
        ${sec.unit && sec.unit.extra ? '<p class="extra-note">⭐ Contenido extra de la Práctica 3 — opcional para el examen</p>' : ''}
        ${sec.kind === 'meta' ? '<p class="extra-note">Preguntas mezcladas de las 6 unidades. ¡Tu prueba final antes del examen!</p>' : ''}
        <div class="nodes">`;
      sec.nodes.forEach((n, j) => {
        const st = nodeState(n.i, ci);
        const inRun = S.run && S.run.node === n.id;
        const p = inRun ? Math.round(100 * S.run.done / S.run.total) : 0;
        h += `<div class="node-wrap t-${n.type}" style="--x:${OFFS[j % OFFS.length]}px" data-i="${n.i}">
          ${st === 'current' ? `<div class="ring" style="--p:${p}"></div><div class="start-bubble">${inRun ? 'CONTINUAR' : n.type === 'final' ? '¡EXAMEN!' : 'EMPEZAR'}</div>` : ''}
          <button class="node ${st} t-${n.type}" data-node="${n.id}" aria-label="${esc(n.title)}${st === 'done' ? ' (completado)' : st === 'locked' ? ' (bloqueado)' : ''}">${nodeIcon(n, st)}</button>
        </div>`;
      });
      h += '</div></section>';
    });
    h += `<div class="path-end">${pct() === 100 ? '<div class="big">🎉</div>¡Completaste toda la ruta! Toca cualquier nivel para repasar.' : '<div class="big">🏁</div>Fin de la ruta'}</div>`;
    h += `<div class="avatar no-anim" id="avatar">${mascot('happy')}</div></main>`;
    h += resumeBar() + '<button class="fab-cur hidden" id="fabcur" aria-label="Ir a mi nivel actual">📍</button>' + bnav('path');
    app.innerHTML = h;
    app.classList.toggle('has-resume', !!S.run);
    syncTopbarH();
    bindPath();
    requestAnimationFrame(() => { drawRoad(); placeAvatar(centerCurrent !== false); });
  }

  function quickCard() {
    if (!QUICK) return '';
    return `<div class="quick">
      <div class="qk-h">⚡ Estudio rápido para el examen</div>
      <div class="qk-row"><div class="qk-ic">🅰️</div><div class="qk-t"><b>Tabla de clases IP</b><small>Apréndete la tabla y analiza IPs: ¿válida? · ¿host, máscara, red o broadcast? · ¿qué clase?</small></div></div>
      <div class="qk-btns"><button class="btn sm" data-quick="ipq">📖 Aprender la tabla</button><button class="btn sm blue" data-quick="ipdrill">🎯 Practicar IPs</button></div>
      <div class="qk-free"><span>🔓 <b>Modo libre</b>: abre cualquier nivel sin completar los anteriores</span><button class="sw ${S.free ? 'on' : ''}" id="freesw" aria-label="Activar o desactivar modo libre"></button></div>
    </div>`;
  }
  function toggleFree() {
    S.free = !S.free; save(); Snd.tap();
    toast(S.free ? '🔓 Modo libre: puedes abrir cualquier nivel' : '🔒 Ruta en orden: los niveles se desbloquean al completar el anterior');
    if (screen === 'path') { const y = window.scrollY; renderPath(false); window.scrollTo(0, y); } else renderProfile();
  }

  function bindPath() {
    $$('[data-quick]', app).forEach(b => b.addEventListener('click', () => { Snd.tap(); startNode(b.dataset.quick); }));
    const fs = $('#freesw'); if (fs) fs.addEventListener('click', toggleFree);
    $$('.node', app).forEach(b => b.addEventListener('click', e => { e.stopPropagation(); Snd.tap(); openPop(NODE[b.dataset.node], b); }));
    $$('[data-guide]', app).forEach(b => b.addEventListener('click', () => go('guide', b.dataset.guide)));
    const fab = $('#fabcur'); if (fab) fab.addEventListener('click', () => scrollToCurrent(true));
    const rb = $('#resume'); if (rb) rb.addEventListener('click', () => startNode(S.run.node));
    if (io) io.disconnect();
    const cur = $('.node.current');
    if (cur && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([en]) => { const f = $('#fabcur'); if (f) f.classList.toggle('hidden', en.isIntersecting); }, { rootMargin: '-140px 0px -100px 0px' });
      io.observe(cur);
    }
  }

  function drawRoad() {
    const pw = $('#pw'), svg = $('#psvg'); if (!pw || !svg) return;
    const W = pw.clientWidth, H = pw.scrollHeight;
    svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const r0 = pw.getBoundingClientRect();
    const pts = $$('.node', pw).map(b => { const r = b.getBoundingClientRect(); return { x: r.left - r0.left + r.width / 2, y: r.top - r0.top + r.height / 2, id: b.dataset.node }; });
    let s = '';
    for (let k = 1; k < pts.length; k++) {
      const a = pts[k - 1], b = pts[k], my = (a.y + b.y) / 2;
      s += `<path class="road${isDone(a.id) ? ' done' : ''}" d="M${a.x.toFixed(1)} ${a.y.toFixed(1)} C${a.x.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}"/>`;
    }
    svg.innerHTML = s;
  }

  function avatarPos(i) {
    const pw = $('#pw'); const w = pw && $(`.node-wrap[data-i="${i}"]`, pw); if (!w) return null;
    const r0 = pw.getBoundingClientRect(), b = $('.node', w).getBoundingClientRect();
    const cx = b.left - r0.left + b.width / 2, cy = b.top - r0.top + b.height / 2;
    const x = parseFloat(w.style.getPropertyValue('--x')) || 0;
    const side = x > 0 ? -1 : 1;
    let left = cx + side * (b.width / 2 + 40) - 34;
    left = Math.max(0, Math.min(pw.clientWidth - 68, left));
    return { left, top: cy - 46, abs: b.top + window.scrollY + b.height / 2 };
  }
  function scrollToCurrent(smooth) {
    let ti = curIndex(); if (ti < 0) ti = NODES.length - 1;
    const p = avatarPos(ti); if (!p) return;
    window.scrollTo({ top: Math.max(0, p.abs - window.innerHeight * 0.5), behavior: smooth ? 'smooth' : 'auto' });
  }
  function placeAvatar(center) {
    const av = $('#avatar'); if (!av) return;
    let ti = curIndex(); if (ti < 0) ti = NODES.length - 1;
    const to = avatarPos(ti); if (!to) return;
    const fromIdx = S.avatarAt && NODE[S.avatarAt] ? NODE[S.avatarAt].i : ti;
    if (pendingWalk && fromIdx !== ti) {
      // Bit camina por el camino desde el nivel anterior hasta el nuevo
      pendingWalk = false;
      const from = avatarPos(fromIdx) || to;
      av.classList.add('no-anim'); av.style.left = from.left + 'px'; av.style.top = from.top + 'px';
      window.scrollTo({ top: Math.max(0, from.abs - window.innerHeight * 0.5) });
      void av.offsetWidth;
      setTimeout(() => {
        av.classList.remove('no-anim'); av.classList.add('walking');
        av.style.left = to.left + 'px'; av.style.top = to.top + 'px';
        window.scrollTo({ top: Math.max(0, to.abs - window.innerHeight * 0.5), behavior: 'smooth' });
        setTimeout(() => { av.classList.remove('walking'); Snd.pair(); }, 1300);
      }, 500);
    } else {
      pendingWalk = false;
      av.classList.add('no-anim'); av.style.left = to.left + 'px'; av.style.top = to.top + 'px';
      if (center) scrollToCurrent(false);
    }
    if (S.avatarAt !== NODES[ti].id) { S.avatarAt = NODES[ti].id; save(); }
  }

  function closePop() { $$('.pop').forEach(p => p.remove()); }
  document.addEventListener('click', e => { if (!e.target.closest('.pop') && !e.target.closest('.node')) closePop(); });

  function openPop(n, btn) {
    closePop();
    const st = nodeState(n.i, curIndex()), pw = $('#pw');
    const inRun = S.run && S.run.node === n.id;
    let title, sub;
    if (n.type === 'lesson') {
      const L = n.lesson, nt = L.steps.filter(s => s.t === 'teach').length;
      title = `${L.icon} ${L.title}`;
      sub = `Lección ${L.num} de ${L.unit.lessons.length} · ${nt} conceptos · ${L.steps.length - nt} ejercicios`;
    } else if (n.type === 'review') {
      title = '🏆 Repaso de la unidad'; sub = `12 preguntas mezcladas de "${n.unit.title}".`;
    } else {
      title = '👑 Examen final'; sub = '30 preguntas de las 6 unidades principales. ¡Demuestra lo que sabes!';
    }
    const el = document.createElement('div');
    el.className = 'pop' + (st === 'locked' ? ' locked' : '');
    el.style.setProperty('--u', n.sec.color); el.style.setProperty('--u-d', n.sec.dark);
    el.innerHTML = `<h3>${esc(title)}</h3><p>${esc(sub)}</p>` + (st === 'locked'
      ? '<p>🔒 Completa los niveles anteriores para desbloquearlo.</p><button class="btn ghost sm" data-act="1">ABRIR DE TODAS FORMAS</button>'
      : `<button class="btn white" data-act="1">${inRun ? 'CONTINUAR' : st === 'done' ? 'REPASAR +5 XP' : `EMPEZAR +${xpFor(n)} XP`}</button>`);
    pw.appendChild(el);
    const r0 = pw.getBoundingClientRect(), rb = btn.getBoundingClientRect();
    el.style.top = (rb.bottom - r0.top + 18) + 'px';
    const pr = el.getBoundingClientRect();
    el.style.setProperty('--ax', Math.max(20, Math.min(pr.width - 20, rb.left + rb.width / 2 - pr.left)) + 'px');
    $('[data-act]', el).addEventListener('click', e => { e.stopPropagation(); closePop(); startNode(n.id); });
    const over = el.getBoundingClientRect().bottom - (window.innerHeight - 100);
    if (over > 0) window.scrollBy({ top: over + 10, behavior: 'smooth' });
  }

  /* ---------- Motor de lecciones ---------- */
  let cur = null, lastBar = 0;

  function startNode(id, force) {
    if (S.run && S.run.node === id) { openLesson(); return; }
    if (S.run && !force) {
      confirmBox({ title: '¿Empezar otro nivel?', text: `Tienes "${runTitle(S.run)}" a medias. Si empiezas otro, se perderá ese avance.`, ok: 'EMPEZAR ESTE', cancel: 'CANCELAR' })
        .then(y => { if (y) startNode(id, true); });
      return;
    }
    const n = NODE[id];
    let list, gen = null;
    if (id === 'mistakes') list = shuffle(Object.keys(S.mistakes).sort((a, b) => S.mistakes[b] - S.mistakes[a]).slice(0, 15));
    else if (id === 'ipq' || id === 'ipdrill') ({ list, gen } = buildQuick(id));
    else if (n.type === 'lesson') list = n.lesson.steps.map((_, k) => n.lesson.id + ':' + k);
    else if (n.type === 'review') list = sampleLessons(n.unit.lessons, 12);
    else list = shuffle([].concat(...UNITS.filter(u => !u.extra).map(u => sampleLessons(u.lessons, 5))));
    if (!list.length) { toast('No hay preguntas para practicar'); return; }
    const tmp = { gen };
    S.run = { node: id, list, gen, pos: 0, done: 0, total: list.length, exTotal: list.filter(r => getStep(r, tmp).t !== 'teach').length, first: 0, wrong: 0, hints: 0, combo: 0, best: 0, failed: {}, t: 0, replay: n ? isDone(n.id) : false };
    lastBar = 0;
    save();
    openLesson();
  }
  function openLesson() {
    if (!(history.state && history.state.l)) history.pushState({ l: 1 }, '');
    if (S.run) lastBar = Math.round(100 * S.run.done / S.run.total);
    renderLesson();
  }
  function tick() {
    if (!cur || !S.run) return;
    const now = Date.now(); S.run.t += Math.min(now - cur.t0, 90000); cur.t0 = now;
  }

  function renderLesson() {
    screen = 'lesson';
    const r = S.run;
    if (!r) { renderPath(true); return; }
    if (r.pos >= r.list.length) { finishRun(); return; }
    const ref = r.list[r.pos], st = getStep(ref), L = lessonOf(ref), u = L.unit;
    const retry = !!r.failed[ref] && r.list.indexOf(ref) < r.pos;
    cur = { ref, st, L, hint: 0, reveal: 0, sel: null, locked: false, elim: new Set(), t0: Date.now() };
    const p = Math.round(100 * r.done / r.total);
    const sp = SPECIAL[r.node];
    const tag = sp ? sp.tag + (r.node === 'mistakes' ? ' · ' + L.title : '')
      : r.node === 'final' ? '👑 Examen final · ' + L.title : NODE[r.node].type === 'review' ? '🏆 Repaso · ' + L.title : '';
    app.innerHTML = `<div class="lesson" style="--u:${u.color};--u-d:${u.dark}">
      <header class="l-head"><button class="l-close" id="lclose" aria-label="Salir de la lección">✕</button>
        <div class="bar lg" title="Progreso de la lección"><i id="lbar" style="width:${lastBar}%"></i></div><div class="combo" id="combo">${r.combo >= 2 ? '🔥' + r.combo : ''}</div></header>
      <div class="l-body" id="lbody"><div class="l-body-in">
        ${retry ? '<div class="q-kind" style="color:var(--orange)">↻ Pregunta que fallaste</div>' : tag && st.t !== 'teach' ? `<div class="q-kind" style="color:var(--u)">${esc(tag)}</div>` : ''}
        ${bodyFor(st)}
      </div></div>
      <footer class="l-foot" id="lfoot">${footFor(st)}</footer></div>`;
    requestAnimationFrame(() => { const b = $('#lbar'); if (b) b.style.width = p + '%'; lastBar = p; });
    bindLesson();
  }

  function bodyFor(st) {
    const f = fig(st.fig);
    switch (st.t) {
      case 'teach':
        return `<div class="tag-new">✨ Nuevo concepto</div><h2 class="l-title">${esc(st.title)}</h2>
          <div class="speech"><div class="sp-m">${mascot('talk')}</div><div class="sp-b">${esc(st.say || pick(SAYS))}</div></div>
          <div class="tcard">${f}${st.body}</div>`;
      case 'mcq': {
        cur.order = shuffle(st.o.map((_, i) => i));
        const blank = st.q.includes('___');
        const q = blank ? esc(st.q).replace(/___/g, '<span class="blank" data-blank>&nbsp;</span>') : esc(st.q);
        return `<div class="q-kind">${blank ? 'Completa la frase' : 'Elige la respuesta correcta'}</div><h2 class="q">${q}</h2>${f}<div id="hintslot"></div>
          <div class="opts" id="opts">${cur.order.map((oi, k) => `<button class="opt" data-oi="${oi}"><span class="k">${k + 1}</span><span class="t">${esc(st.o[oi])}</span></button>`).join('')}</div>`;
      }
      case 'tf':
        return `<div class="q-kind">¿Verdadero o falso?</div><div class="stmt">${esc(st.q)}</div>${f}<div id="hintslot"></div>
          <div class="tfs"><button class="tf" data-v="1"><span class="e">✅</span>Verdadero</button><button class="tf" data-v="0"><span class="e">❌</span>Falso</button></div>`;
      case 'match': {
        const idx = st.p.map((_, i) => i);
        cur.left = shuffle(idx); cur.right = shuffle(idx); cur.matched = new Set(); cur.selL = null; cur.selR = null; cur.bad = 0;
        return `<div class="q-kind">Une las parejas</div><h2 class="q">${esc(st.q || 'Toca las parejas que van juntas')}</h2><div id="hintslot"></div>
          <div class="match"><div class="mcol">${cur.left.map(i => `<button class="mt" data-side="L" data-i="${i}">${esc(st.p[i][0])}</button>`).join('')}</div>
          <div class="mcol">${cur.right.map(i => `<button class="mt" data-side="R" data-i="${i}">${esc(st.p[i][1])}</button>`).join('')}</div></div>`;
      }
      case 'order': {
        let bank = shuffle(st.o.map((_, i) => i));
        for (let t = 0; t < 5 && bank.every((v, k) => v === k); t++) bank = shuffle(bank);
        cur.bank = bank; cur.ans = [];
        return `<div class="q-kind">Ordena los elementos</div><h2 class="q">${esc(st.q)}</h2><div id="hintslot"></div>
          <div class="ord-ans" id="ordans"></div><div class="ord-bank" id="ordbank">${bank.map(i => `<button class="chip" data-i="${i}">${esc(st.o[i])}</button>`).join('')}</div>`;
      }
      case 'type': {
        const attrs = 'id="tin" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done"';
        const inp = st.term
          ? `<div class="term" id="tbox"><div class="bar3"><i></i><i></i><i></i></div><div class="line"><span class="pr">${esc(st.term)}</span><input ${attrs} aria-label="Comando"></div></div>`
          : `<input class="txtin" ${attrs} placeholder="Escribe aquí…" aria-label="Respuesta">`;
        return `<div class="q-kind">${st.term ? '⌨️ Escribe el comando' : 'Escribe la respuesta'}</div><h2 class="q">${esc(st.q)}</h2>${f}<div id="hintslot"></div>${inp}
          <div class="type-note">No importan mayúsculas ni tildes.</div>`;
      }
      case 'ipcheck':
        cur.phases = st.valid ? (st.type === 'mask' ? ['valid', 'type'] : ['valid', 'type', 'cls']) : ['valid'];
        cur.phase = 0; cur.phHint = 0;
        return `<div class="q-kind">🔍 Analiza la dirección IP</div><div class="ipbig">${esc(st.ip)}</div>
          <p class="ip-note">Usa la máscara por defecto de su clase</p>
          <div class="phases">${['1 · Formato', '2 · Tipo', '3 · Clase'].map((l, k) => `<span class="ph" data-ph="${k}">${l}</span>`).join('')}</div>
          <div id="hintslot"></div><div id="ipph"></div>`;
    }
    return '';
  }

  /* Ejercicio "Analiza la IP": formato → tipo → clase */
  const IP_PHASES = {
    valid: { q: '¿Esta dirección IPv4 tiene un formato válido?', o: [['valid', '✅ Sí, es válida'], ['invalid', '❌ No, es inválida']],
      h: 'Revisa: ¿tiene 4 octetos separados por puntos? ¿Solo números? ¿Cada uno entre 0 y 255?' },
    type: { q: '¿Qué tipo de dirección es?', o: [['host', 'Host normal (asignable a una PC)'], ['mask', 'Máscara de subred'], ['broadcast', 'Broadcast'], ['red', 'Dirección de red']],
      h: '¿Son 255 seguidos de 0? → máscara. Si no, busca la clase y mira su parte de host: toda en 0 = red · toda en 255 = broadcast · otra cosa = host normal.' },
    cls: { q: '¿De qué clase es?', o: [['A', 'Clase A'], ['B', 'Clase B'], ['C', 'Clase C'], ['D', 'Clase D'], ['E', 'Clase E']],
      h: 'Mira el primer octeto: A 1–127 · B 128–191 · C 192–223 · D 224–239 · E 240–255.' }
  };
  const ipAnswer = (st, ph) => (ph === 'valid' ? (st.valid ? 'valid' : 'invalid') : ph === 'type' ? st.type : st.cls);
  const shortLbl = (ph, v) => (ph === 'valid' ? (v === 'valid' ? 'Válida' : 'Inválida') : ph === 'type' ? TYPE_LABEL[v] : 'Clase ' + v);
  function renderIpPhase() {
    const ph = cur.phases[cur.phase], P = IP_PHASES[ph];
    cur.sel = null; cur.phHint = 0;
    $$('.ph').forEach((el, k) => el.classList.toggle('on', k === cur.phase));
    $('#hintslot').innerHTML = '';
    $('#ipph').innerHTML = `<h2 class="q ip-q">${esc(P.q)}</h2><div class="opts" id="ipopts">${P.o.map(([v, l], k) => `<button class="opt" data-v="${v}"><span class="k">${k + 1}</span><span class="t">${esc(l)}</span></button>`).join('')}</div>`;
    $$('#ipopts .opt').forEach(b => b.onclick = () => {
      if (cur.locked) return; Snd.tap();
      $$('#ipopts .opt').forEach(x => x.classList.remove('sel')); b.classList.add('sel');
      cur.sel = b.dataset.v; $('#check').disabled = false;
    });
    $('#check').disabled = true;
  }
  function checkIpPhase() {
    if (cur.locked || cur.sel == null) return;
    const ph = cur.phases[cur.phase];
    if (cur.sel !== ipAnswer(cur.st, ph)) { resolve(false); return; }
    if (cur.phase < cur.phases.length - 1) {
      const chip = $(`.ph[data-ph="${cur.phase}"]`);
      chip.classList.remove('on'); chip.classList.add('ok'); chip.textContent = '✓ ' + shortLbl(ph, cur.sel);
      cur.phase++; Snd.pair(); renderIpPhase();
      return;
    }
    resolve(true);
  }
  function footFor(st) {
    if (st.t === 'teach') return '<div class="l-foot-in"><button class="btn wide" id="next">CONTINUAR</button></div>';
    return `<div class="l-foot-in"><button class="btn ghost hint-btn" id="hint" aria-label="Pedir una pista">💡 PISTA</button>
      <button class="btn" id="check" disabled>${st.t === 'match' ? 'UNE TODAS' : 'COMPROBAR'}</button></div>`;
  }

  function bindLesson() {
    $('#lclose').onclick = exitLesson;
    const st = cur.st;
    if (st.t === 'teach') { $('#next').onclick = nextTeach; return; }
    $('#hint').onclick = useHint;
    $('#check').onclick = check;
    if (st.t === 'mcq') {
      $$('.opt').forEach(b => b.onclick = () => {
        if (cur.locked) return; Snd.tap();
        $$('.opt').forEach(x => x.classList.remove('sel')); b.classList.add('sel');
        cur.sel = +b.dataset.oi; fillBlank(); $('#check').disabled = false;
      });
    } else if (st.t === 'tf') {
      $$('.tf').forEach(b => b.onclick = () => {
        if (cur.locked) return; Snd.tap();
        $$('.tf').forEach(x => x.classList.remove('sel')); b.classList.add('sel');
        cur.sel = b.dataset.v === '1'; $('#check').disabled = false;
      });
    } else if (st.t === 'ipcheck') {
      renderIpPhase();
    } else if (st.t === 'match') {
      $$('.mt').forEach(b => b.onclick = () => tapMatch(b));
    } else if (st.t === 'order') {
      $$('#ordbank .chip').forEach(b => b.onclick = () => {
        if (cur.locked || b.classList.contains('used')) return; Snd.tap();
        cur.ans.push(+b.dataset.i); renderOrder();
      });
    } else if (st.t === 'type') {
      const tin = $('#tin');
      tin.addEventListener('input', () => { $('#check').disabled = !tin.value.trim(); });
      if (window.matchMedia('(hover: hover)').matches) setTimeout(() => tin.focus({ preventScroll: true }), 60);
    }
  }
  function fillBlank() {
    const bl = $$('[data-blank]'); if (!bl.length || cur.sel == null) return;
    const parts = cur.st.o[cur.sel].split(' · ');
    bl.forEach((b, i) => { b.textContent = parts.length === bl.length ? parts[i] : parts.join(' · '); });
  }
  function renderOrder() {
    const st = cur.st;
    $('#ordans').innerHTML = cur.ans.map((i, k) => `<button class="chip" data-k="${k}"><span class="n">${k + 1}</span><span>${esc(st.o[i])}</span></button>`).join('');
    $$('#ordbank .chip').forEach(b => b.classList.toggle('used', cur.ans.includes(+b.dataset.i)));
    $$('#ordans .chip').forEach(b => b.onclick = () => { if (cur.locked) return; Snd.tap(); cur.ans.splice(+b.dataset.k, 1); renderOrder(); });
    $('#check').disabled = cur.ans.length !== st.o.length;
  }
  function matchPair(i) {
    cur.matched.add(i); cur.selL = cur.selR = null;
    $$('.mt.sel').forEach(b => b.classList.remove('sel'));
    $$(`.mt[data-i="${i}"]`).forEach(b => { b.classList.remove('sel'); b.classList.add('ok'); setTimeout(() => { b.classList.remove('ok'); b.classList.add('gone'); }, 420); });
    Snd.pair();
    if (cur.matched.size === cur.st.p.length) setTimeout(() => resolve(true, { perfect: cur.bad === 0 }), 450);
  }
  function tapMatch(b) {
    if (cur.locked) return;
    const side = b.dataset.side, i = +b.dataset.i;
    if (cur.matched.has(i)) return;
    if (side === 'L') cur.selL = cur.selL === i ? null : i; else cur.selR = cur.selR === i ? null : i;
    $$('.mt').forEach(x => x.classList.toggle('sel', (x.dataset.side === 'L' && +x.dataset.i === cur.selL) || (x.dataset.side === 'R' && +x.dataset.i === cur.selR)));
    if (cur.selL == null || cur.selR == null) { Snd.tap(); return; }
    if (cur.selL === cur.selR) { matchPair(i); return; }
    cur.bad++;
    const pair = [$(`.mt[data-side="L"][data-i="${cur.selL}"]`), $(`.mt[data-side="R"][data-i="${cur.selR}"]`)];
    pair.forEach(x => { x.classList.remove('sel'); x.classList.add('bad'); setTimeout(() => x.classList.remove('bad'), 450); });
    cur.selL = cur.selR = null;
    Snd.bad(); if (navigator.vibrate) navigator.vibrate(60);
  }

  function matchesType(st, v) {
    let x = norm(v);
    if (st.term) { const p = norm(st.term); if (x.startsWith(p)) x = x.slice(p.length).trim(); }
    const nos = s => s.replace(/\s+/g, '');
    return st.a.some(a => { const c = norm(a); return c === x || nos(c) === nos(x); });
  }
  function evaluate() {
    const st = cur.st;
    if (st.t === 'mcq') return cur.sel === 0;
    if (st.t === 'tf') return cur.sel === st.a;
    if (st.t === 'order') return cur.ans.length === st.o.length && cur.ans.every((v, k) => v === k);
    if (st.t === 'type') return matchesType(st, $('#tin').value);
    return false;
  }
  function check() {
    if (cur.st.t === 'ipcheck') { checkIpPhase(); return; }
    if (cur.locked || cur.st.t === 'match') return;
    if ((cur.st.t === 'mcq' || cur.st.t === 'tf') && cur.sel == null) return;
    resolve(evaluate());
  }
  function addMistake(ref) { if (String(ref).startsWith('gen:')) return; S.mistakes[ref] = (S.mistakes[ref] || 0) + 1; }

  function resolve(ok, opt = {}) {
    const r = S.run, ref = cur.ref;
    if (!r || cur.locked) return;
    cur.locked = true; tick();
    $('#lbody').classList.add('locked-ex');
    const perfect = opt.perfect !== false;
    if (ok) {
      r.done++;
      if (!r.failed[ref] && perfect) r.first++;
      if (!perfect) addMistake(ref);
      r.combo++; r.best = Math.max(r.best, r.combo);
      if (perfect && !r.failed[ref] && S.mistakes[ref]) {
        if (r.node === 'mistakes') delete S.mistakes[ref];
        else if (--S.mistakes[ref] <= 0) delete S.mistakes[ref];
      }
      Snd.ok();
    } else {
      r.failed[ref] = 1; r.wrong++; r.list.push(ref); r.combo = 0;
      addMistake(ref);
      Snd.bad(); if (navigator.vibrate) navigator.vibrate(140);
    }
    r.pos++;
    save();
    const p = Math.round(100 * r.done / r.total);
    const lb = $('#lbar'); if (lb) lb.style.width = p + '%'; lastBar = p;
    const cb = $('#combo'); if (cb) cb.textContent = r.combo >= 2 ? '🔥' + r.combo : '';
    showFeedback(ok, opt);
  }

  function correctText(st) {
    if (st.t === 'mcq') return st.o[0];
    if (st.t === 'tf') return st.a ? 'Verdadero' : 'Falso';
    if (st.t === 'order') return st.o.join(' → ');
    if (st.t === 'type') return st.a[0];
    if (st.t === 'match') return st.p.map(p => p[0] + ' → ' + p[1]).join(' · ');
    if (st.t === 'ipcheck') return (st.valid ? 'Válida' : 'Inválida') + (st.type ? ' · ' + TYPE_LABEL[st.type] : '') + (st.cls ? ' · Clase ' + st.cls : '');
    return '';
  }
  function showFeedback(ok, opt) {
    const st = cur.st;
    if (st.t === 'mcq') {
      const c = $('.opt[data-oi="0"]'); if (c) c.classList.add('correct');
      if (!ok) { const w = $(`.opt[data-oi="${cur.sel}"]`); if (w) w.classList.add('wrong'); }
      $$('.opt').forEach(b => b.classList.remove('sel'));
    } else if (st.t === 'tf') {
      $$('.tf').forEach(b => b.classList.remove('sel'));
      $(`.tf[data-v="${st.a ? 1 : 0}"]`).classList.add('correct');
      if (!ok) $(`.tf[data-v="${st.a ? 0 : 1}"]`).classList.add('wrong');
    } else if (st.t === 'order') {
      $('#ordans').classList.add(ok ? 'correct' : 'wrong');
    } else if (st.t === 'ipcheck') {
      const ph = cur.phases[cur.phase], ans = ipAnswer(st, ph);
      $$('#ipopts .opt').forEach(b => b.classList.remove('sel'));
      const c = $(`#ipopts .opt[data-v="${ans}"]`); if (c) c.classList.add('correct');
      if (!ok) { const w = $(`#ipopts .opt[data-v="${cur.sel}"]`); if (w) w.classList.add('wrong'); }
      const chip = $(`.ph[data-ph="${cur.phase}"]`);
      if (chip) { chip.classList.remove('on'); chip.classList.add(ok ? 'ok' : 'bad'); chip.textContent = (ok ? '✓ ' : '✕ ') + shortLbl(ph, ok ? ans : cur.sel); }
    } else if (st.t === 'type') {
      const tin = $('#tin'); tin.readOnly = true; tin.blur();
      ($('#tbox') || tin).classList.add(ok ? 'correct' : 'wrong');
    }
    const foot = $('#lfoot');
    foot.className = 'l-foot ' + (ok ? 'ok' : 'bad');
    const r = S.run;
    const streakMsg = ok && [3, 5, 10, 15, 20, 30].includes(r.combo) ? ` ¡${r.combo} seguidas! 🔥` : '';
    const title = ok ? (opt.perfect === false ? '¡Lo lograste!' : pick(PRAISE)) + streakMsg : pick(['Incorrecto', 'Casi…', 'No exactamente']);
    foot.innerHTML = `<div class="sheet"><div class="sh-row"><div class="sh-ic">${ok ? '✓' : '✕'}</div><div>
        <div class="sh-t">${esc(title)}</div>
        ${!ok ? `<div class="sh-l">Respuesta correcta:</div><div class="sh-a">${esc(correctText(st))}</div>` : ''}
        ${opt.perfect === false ? `<div class="sh-e">Tuviste ${cur.bad} pareja(s) equivocada(s). La guardé en "Errores" para repasar.</div>` : ''}
        ${st.e ? `<div class="sh-e">💡 ${esc(st.e)}</div>` : ''}
        ${!ok ? '<div class="sh-e">🔁 La repetirás antes de terminar.</div>' : ''}
      </div></div>
      <div class="sh-btns">${!ok ? '<button class="btn ghost" id="theory" aria-label="Ver la teoría">📖</button>' : ''}<button class="btn ${ok ? '' : 'red'}" id="next">CONTINUAR</button></div></div>`;
    $('#next').onclick = () => { Snd.tap(); renderLesson(); };
    const th = $('#theory'); if (th) th.onclick = () => showTheory(cur.ref);
  }

  function nextTeach() {
    const r = S.run; tick(); r.done++; r.pos++; save(); Snd.tap();
    renderLesson();
  }

  /* Pistas infinitas: 1) pista escrita, luego ayudas progresivas hasta mostrar la respuesta */
  function revealPrefix(ans, n) {
    if (ans.includes(' ')) { const t = ans.split(' '); return t.slice(0, n).join(' ') + (n < t.length ? ' ' : ''); }
    return ans.slice(0, Math.min(ans.length, n * Math.max(1, Math.ceil(ans.length / 4))));
  }
  function useHint() {
    if (cur.locked) return;
    const st = cur.st, r = S.run;
    cur.hint++; r.hints++; S.stats.hints++; save(); Snd.tap();
    const slot = $('#hintslot');
    const box = (text, small) => {
      slot.innerHTML = `<div class="hint-box"><div class="hi">💡</div><div class="ht">${text}${small ? `<small>${small}</small>` : ''}<div><button class="link" id="seeth">📖 Ver la teoría de esta lección</button></div></div></div>`;
      $('#seeth').onclick = () => showTheory(cur.ref);
    };
    const more = 'Pulsa PISTA otra vez para más ayuda. ¡Las pistas son infinitas!';
    if (cur.hint === 1 && st.h) { box(esc(st.h), more); return; }
    if (cur.hint === 1 && st.t === 'tf') {
      const idx = +cur.ref.split(':')[1], teach = cur.L.steps.filter((s, i) => s.t === 'teach' && i < idx).pop() || cur.L.steps[0];
      box(`Repasa el concepto <b>«${esc(teach.title)}»</b>. Lee la afirmación palabra por palabra: un solo detalle puede hacerla falsa.`, more);
      return;
    }
    if (st.t === 'ipcheck') {
      const ph = cur.phases[cur.phase], ans = ipAnswer(st, ph), P = IP_PHASES[ph];
      cur.phHint++;
      if (cur.phHint === 1) { box(esc(P.h), more); return; }
      if (cur.phHint === 2 && ph === 'type' && st.cls) {
        box(`El primer octeto es <b>${esc(st.ip.split('.')[0])}</b> → clase <b>${st.cls}</b>, así que la parte de host son los últimos ${st.hn} octeto(s): <b>${esc(st.hp)}</b>`, more);
        return;
      }
      const wrong = $$('#ipopts .opt').filter(b => b.dataset.v !== ans && !b.classList.contains('elim'));
      if (wrong.length) {
        const b = pick(wrong); b.classList.add('elim'); b.classList.remove('sel');
        if (cur.sel === b.dataset.v) { cur.sel = null; $('#check').disabled = true; }
        box(wrong.length > 1 ? 'Eliminé una opción incorrecta ✂️' : '¡Solo queda la correcta! Tócala 👉', esc(P.h));
      } else {
        const b = $(`#ipopts .opt[data-v="${ans}"]`); b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse');
        box(`Es: <b>${esc(shortLbl(ph, ans))}</b>`);
      }
      return;
    }
    if (st.t === 'mcq') {
      const wrong = cur.order.filter(oi => oi !== 0 && !cur.elim.has(oi));
      if (wrong.length) {
        const oi = pick(wrong); cur.elim.add(oi);
        const b = $(`.opt[data-oi="${oi}"]`); b.classList.add('elim'); b.classList.remove('sel');
        if (cur.sel === oi) { cur.sel = null; $('#check').disabled = true; }
        box(wrong.length > 1 ? 'Eliminé una opción incorrecta ✂️' : '¡Solo queda la correcta! Tócala 👉', st.h ? esc(st.h) : more);
      } else {
        const b = $('.opt[data-oi="0"]'); b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse');
        box(`Es esta: <b>${esc(st.o[0])}</b>`);
      }
    } else if (st.t === 'tf') {
      const good = $(`.tf[data-v="${st.a ? 1 : 0}"]`), bad = $(`.tf[data-v="${st.a ? 0 : 1}"]`);
      bad.classList.add('elim'); bad.classList.remove('sel');
      if (cur.sel === !st.a) { cur.sel = null; $('#check').disabled = true; }
      good.classList.remove('pulse'); void good.offsetWidth; good.classList.add('pulse');
      box(`La respuesta es <b>${st.a ? 'Verdadero' : 'Falso'}</b>`, st.e ? esc(st.e) : '');
    } else if (st.t === 'match') {
      const rem = st.p.map((_, i) => i).filter(i => !cur.matched.has(i));
      if (rem.length) matchPair(rem[0]);
      box('Uní una pareja por ti 🤝', rem.length > 1 ? more : '');
    } else if (st.t === 'order') {
      let k = 0; while (k < cur.ans.length && cur.ans[k] === k) k++;
      cur.ans = cur.ans.slice(0, k);
      if (k < st.o.length) cur.ans.push(k);
      renderOrder();
      box(`Coloqué el elemento ${Math.min(k + 1, st.o.length)} en su lugar 📌`, cur.ans.length < st.o.length ? more : '¡Listo! Pulsa COMPROBAR.');
    } else if (st.t === 'type') {
      const ans = st.a[0], tin = $('#tin');
      cur.reveal++;
      const v = revealPrefix(ans, cur.reveal);
      tin.value = v; tin.dispatchEvent(new Event('input'));
      tin.focus({ preventScroll: true });
      box(v.trim().length >= ans.length ? `La respuesta es: <b>${esc(ans)}</b>` : 'Te escribí una parte 👀', v.trim().length >= ans.length ? 'Pulsa COMPROBAR.' : more);
    }
  }

  function showTheory(ref) {
    const L = lessonOf(ref), idx = String(ref).startsWith('gen:') ? Infinity : +String(ref).split(':')[1];
    const cards = L.steps.map((s, i) => ({ s, i })).filter(o => o.s.t === 'teach');
    if (!cards.length) return;
    let c = 0; cards.forEach((o, j) => { if (o.i < idx) c = j; });
    modal('', m => {
      const draw = () => {
        const card = cards[c].s;
        m.innerHTML = `<div style="--u:${L.unit.color}"><div class="tag-new">📖 Teoría · ${esc(L.title)}</div><h3 style="margin-top:6px">${esc(card.title)}</h3>
          <div class="tcard">${fig(card.fig)}${card.body}</div>
          <div class="m-nav"><button class="btn ghost sm" id="tp" ${c === 0 ? 'disabled' : ''} aria-label="Anterior">◀</button><span>${c + 1} / ${cards.length}</span><button class="btn ghost sm" id="tn" ${c === cards.length - 1 ? 'disabled' : ''} aria-label="Siguiente">▶</button></div>
          <div class="m-btns"><button class="btn wide" id="tclose">ENTENDIDO</button></div></div>`;
        $('#tp', m).onclick = () => { if (c > 0) { c--; draw(); m.scrollTop = 0; } };
        $('#tn', m).onclick = () => { if (c < cards.length - 1) { c++; draw(); m.scrollTop = 0; } };
        $('#tclose', m).onclick = closeModal;
      };
      draw();
    });
  }

  function exitLesson() {
    confirmBox({ title: '¿Salir de la lección?', text: 'Tu avance queda guardado: podrás continuar justo donde lo dejaste.', ok: 'SEGUIR APRENDIENDO', cancel: 'SALIR', mood: 'sad' })
      .then(stay => {
        if (stay) return;
        tick(); save();
        if (history.state && history.state.l) history.back(); else renderPath(true);
      });
  }

  function finishRun() {
    const r = S.run, n = NODE[r.node];
    const acc = r.exTotal ? Math.round(100 * r.first / r.exTotal) : 100;
    const sp = SPECIAL[r.node];
    const xp = sp ? sp.xp + (r.exTotal && acc === 100 ? 5 : 0) : (r.replay ? 5 : xpFor(n)) + (!r.replay && r.exTotal && acc === 100 ? 5 : 0);
    const before = pct();
    const newDone = !!n && !isDone(n.id);
    if (n) { const prev = S.done[n.id]; S.done[n.id] = { at: Date.now(), acc: Math.max(acc, prev ? prev.acc : 0), n: (prev ? prev.n : 0) + 1 }; }
    S.xp += xp;
    const t = today();
    if (S.streak.last !== t) { S.streak.n = S.streak.last && dayDiff(S.streak.last, t) === 1 ? S.streak.n + 1 : 1; S.streak.last = t; }
    S.stats.first += r.first; S.stats.ex += r.exTotal; S.stats.runs++;
    const info = { n, sp, node: r.node, xp, acc, time: r.t, before, after: pct(), newDone, hints: r.hints };
    S.run = null;
    save();
    if (newDone) pendingWalk = true;
    renderDone(info);
  }

  function renderDone(x) {
    screen = 'done';
    let title = '¡Lección completada!';
    let sub = pick(['¡Sigue así, vas volando! 🚀', 'Cada lección te acerca a la meta 😎', '¡Tu cerebro está en modo router! 🧠', '¡Un paquete más que llega a destino! 📦']);
    if (x.sp) { title = x.sp.doneTitle; sub = x.sp.doneSub; }
    else if (x.n.type === 'review') { title = x.newDone ? '¡Unidad completada! 🏆' : '¡Repaso completado!'; sub = `Dominas "${x.n.unit.title}".`; }
    else if (x.n.type === 'final') { title = '¡Ruta del examen completada! 👑'; sub = 'Repasaste todo el contenido de las clases. ¡Vas con todo al examen!'; }
    if (x.newDone && x.after === 100) { title = '¡RedesLingo al 100%! 🎉'; sub = 'Completaste absolutamente todo, extras incluidos. ¡Eres crack de las redes!'; }
    const mm = Math.floor(x.time / 60000), ss = Math.floor(x.time / 1000) % 60;
    app.innerHTML = `<div class="done-scr"><div class="mascot-big">${mascot('happy')}</div><h1>${esc(title)}</h1><p class="sub">${esc(sub)}</p>
      <div class="stats3">
        <div class="st" style="--c:var(--gold)"><div class="h">XP ganada</div><div class="v">⚡ ${x.xp}</div></div>
        <div class="st" style="--c:var(--green)"><div class="h">${x.acc === 100 ? '¡Perfecto!' : 'Precisión'}</div><div class="v">🎯 ${x.acc}%</div></div>
        <div class="st" style="--c:var(--blue)"><div class="h">Tiempo</div><div class="v">⏱ ${mm}:${String(ss).padStart(2, '0')}</div></div></div>
      <div class="done-prog"><div class="k"><span>Progreso del curso</span><span id="dpct">${x.before}%</span></div><div class="bar lg"><i id="dbar" style="width:${x.before}%"></i></div>
      ${x.hints ? `<div class="k" style="margin:8px 0 0;font-weight:700">💡 Usaste ${x.hints} pista(s). ¡Para eso están!</div>` : ''}</div>
      ${x.node === 'ipq' || x.node === 'ipdrill' ? `<button class="btn blue wide" id="again" style="margin-bottom:12px">🎯 ${x.node === 'ipq' ? 'PRACTICAR IPs' : 'OTRA RONDA DE IPs'}</button>` : ''}
      <button class="btn wide" id="cont">CONTINUAR</button></div>`;
    confetti(); Snd.win();
    setTimeout(() => {
      const b = $('#dbar'), l = $('#dpct'); if (!b) return;
      b.style.width = x.after + '%';
      let v = x.before; const step = () => { if (!l || v >= x.after) { if (l) l.textContent = x.after + '%'; return; } v++; l.textContent = v + '%'; setTimeout(step, 40); };
      step();
    }, 500);
    $('#cont').onclick = () => { if (history.state && history.state.l) history.back(); else renderPath(true); };
    const ag = $('#again'); if (ag) ag.onclick = () => startNode('ipdrill');
  }

  /* ---------- Pantalla: Guía ---------- */
  function renderGuide(focus) {
    screen = 'guide';
    let h = topbar() + `<main class="scr page"><h2>📖 Guía de estudio</h2><p class="lead">Toda la teoría de la ruta, por unidad y lección. Ideal para repasar rápido antes del examen.</p>
      <input class="search" id="gsearch" type="search" placeholder="🔎 Buscar (ej: CSMA, ping -t, clase B…)" autocomplete="off"><div id="glist">`;
    (QUICK ? [QUICK.unit] : []).concat(UNITS).forEach(u => {
      h += `<details class="g-unit" data-u="${u.id}" style="--u:${u.color}" ${focus === u.id ? 'open' : ''}><summary><div><small>${esc(u.kicker)}</small>${esc(u.title)}</div><span class="chev">▼</span></summary>`;
      u.lessons.forEach(l => {
        const cards = l.steps.filter(s => s.t === 'teach');
        h += `<details class="g-les" data-l="${l.id}"><summary><span class="i">${l.icon}</span><span class="ttl">${esc(l.title)}</span>${isDone(l.id) ? '<span class="ok">✓</span>' : ''}<span class="chev">▼</span></summary>
          <div class="g-cards">${cards.map(c => `<div class="g-card" data-txt="${esc(norm(c.title + ' ' + strip(c.body)))}"><h4>${esc(c.title)}</h4>${fig(c.fig)}${c.body}</div>`).join('')}</div></details>`;
      });
      h += '</details>';
    });
    h += '</div><div class="g-empty hidden" id="gempty">No encontré nada con esa búsqueda 🤔</div></main>' + bnav('guide');
    app.innerHTML = h; app.classList.remove('has-resume'); syncTopbarH();
    const inp = $('#gsearch');
    inp.addEventListener('input', () => {
      const q = norm(inp.value);
      let any = false;
      $$('.g-unit').forEach(gu => {
        let uAny = false;
        $$('.g-les', gu).forEach(gl => {
          let lAny = false;
          $$('.g-card', gl).forEach(c => { const m = !q || c.dataset.txt.includes(q); c.classList.toggle('hidden', !m); lAny = lAny || m; });
          gl.classList.toggle('hidden', !lAny); gl.open = !!q && lAny; uAny = uAny || lAny;
        });
        gu.classList.toggle('hidden', !uAny); gu.open = q ? uAny : gu.dataset.u === focus; any = any || uAny;
      });
      $('#gempty').classList.toggle('hidden', any);
    });
    if (focus) {
      const el = $(`.g-unit[data-u="${focus}"]`);
      if (el) setTimeout(() => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - $('#topbar').offsetHeight - 10 }), 30);
    }
  }

  /* ---------- Pantalla: Errores ---------- */
  function qText(s) { return s.t === 'tf' ? 'V/F: ' + s.q : s.t === 'match' ? (s.q || 'Une las parejas') : s.q; }
  function renderMistakes() {
    screen = 'mistakes';
    const refs = Object.keys(S.mistakes).sort((a, b) => S.mistakes[b] - S.mistakes[a]);
    let h = topbar() + '<main class="scr page"><h2>🎯 Mis errores</h2>';
    if (!refs.length) {
      h += `<div class="empty-state"><div class="m">${mascot('happy')}</div><p>¡No tienes errores pendientes! Cuando falles una pregunta aparecerá aquí para que la practiques.</p></div>`;
    } else {
      h += `<p class="lead">Preguntas que has fallado. Al acertarlas en la práctica desaparecen de la lista.</p>
        <button class="btn wide" id="pmis">PRACTICAR ${Math.min(15, refs.length)} ERRORES</button><div class="sec-t">Repaso rápido (${refs.length})</div>`;
      h += refs.map(r => {
        const s = getStep(r), L = lessonOf(r);
        return `<div class="mis-item"><div class="q2">${esc(qText(s))}</div><div class="a2">✓ ${esc(correctText(s))}</div><div class="meta">${L.icon} ${esc(L.title)} · fallada ${S.mistakes[r]}×</div></div>`;
      }).join('');
    }
    h += '</main>' + bnav('mistakes');
    app.innerHTML = h; app.classList.remove('has-resume'); syncTopbarH();
    const b = $('#pmis'); if (b) b.onclick = () => startNode('mistakes');
  }

  /* ---------- Pantalla: Perfil ---------- */
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; if (screen === 'profile') renderProfile(); });
  function encodeState() { return btoa(unescape(encodeURIComponent(JSON.stringify(S)))); }
  function renderProfile() {
    screen = 'profile';
    const acc = S.stats.ex ? Math.round(100 * S.stats.first / S.stats.ex) : 0;
    let h = topbar() + `<main class="scr page"><h2>👤 Tu perfil</h2><p class="lead">Redes de Comunicación de Datos · ¡a por el examen!</p>
      <div class="grid2">
        <div class="sbox"><span class="e">🔥</span><div><div class="v">${streakNow()}</div><div class="l">Días de racha</div></div></div>
        <div class="sbox"><span class="e">⚡</span><div><div class="v">${S.xp}</div><div class="l">XP total</div></div></div>
        <div class="sbox"><span class="e">🛣️</span><div><div class="v">${pct(MAIN_NODES)}%</div><div class="l">Ruta del examen</div></div></div>
        <div class="sbox"><span class="e">🎯</span><div><div class="v">${acc}%</div><div class="l">Precisión</div></div></div>
      </div>
      <div class="sec-t">Progreso por unidad · total ${pct()}%</div>
      ${SECTIONS.map(sec => { const p = pct(sec.nodes); return `<div class="u-row" style="--u:${sec.color}"><span class="n">${esc(sec.title)}</span><div class="bar sm"><i style="width:${p}%"></i></div><span class="p">${p}%</span></div>`; }).join('')}
      <div class="sec-t">Ajustes</div>
      <div class="set-row"><div>🔓 Modo libre<small>Abre cualquier nivel sin completar los anteriores</small></div><button class="sw ${S.free ? 'on' : ''}" id="freesw2" aria-label="Activar o desactivar modo libre"></button></div>
      <div class="set-row"><div>🔊 Sonidos</div><button class="sw ${S.sound ? 'on' : ''}" id="snd" aria-label="Activar o desactivar sonidos"></button></div>
      <div class="set-row"><div>🌓 Tema</div><div class="seg" id="theme">${[['auto', 'Auto'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([k, l]) => `<button data-th="${k}" class="${S.theme === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      <div class="sec-t">Tu progreso</div>
      <div class="note">💾 Se guarda <b>automáticamente después de cada respuesta</b> en este dispositivo. Puedes cerrar la app cuando quieras y continuar justo donde la dejaste, incluso a mitad de una lección.</div>
      <div class="note">📲 <b>Instálala en tu teléfono:</b> en Android (Chrome) toca ⋮ → <b>Instalar app</b>. En iPhone (Safari) toca Compartir → <b>Añadir a pantalla de inicio</b>. Funciona sin internet.<br>⚠️ En iPhone, Safari y la app instalada guardan el progreso por separado: usa Exportar/Importar para pasarlo.</div>
      ${deferredPrompt ? '<div class="btn-row"><button class="btn blue" id="inst">📲 INSTALAR REDESLINGO</button></div>' : ''}
      <div class="btn-row"><button class="btn ghost sm" id="exp">📤 Exportar progreso</button><button class="btn ghost sm" id="imp">📥 Importar progreso</button></div>
      <div class="btn-row"><button class="btn red sm" id="reset">🗑️ Reiniciar todo</button></div>
      <p class="lead" style="text-align:center;margin-top:22px;font-size:13px">Contenido basado en las clases y prácticas de Redes de Comunicación de Datos.</p>
      </main>` + bnav('profile');
    app.innerHTML = h; app.classList.remove('has-resume'); syncTopbarH();
    $('#freesw2').onclick = toggleFree;
    $('#snd').onclick = () => { S.sound = !S.sound; save(); $('#snd').classList.toggle('on', S.sound); Snd.tap(); };
    $$('#theme button').forEach(b => b.onclick = () => { S.theme = b.dataset.th; save(); applyTheme(); renderProfile(); });
    const inst = $('#inst'); if (inst) inst.onclick = async () => { deferredPrompt.prompt(); try { await deferredPrompt.userChoice; } catch (e) { /* cancelado */ } deferredPrompt = null; renderProfile(); };
    $('#exp').onclick = () => {
      const code = encodeState();
      modal(`<h3>📤 Exportar progreso</h3><p>Copia este código y pégalo en "Importar progreso" en otro navegador o dispositivo.</p>
        <textarea class="code-box" id="ecode" readonly>${esc(code)}</textarea><div class="m-btns"><button class="btn wide" id="ecopy">COPIAR CÓDIGO</button><button class="btn flat wide" id="eclose">CERRAR</button></div>`, m => {
        $('#ecopy', m).onclick = async () => {
          const ta = $('#ecode', m); ta.select();
          try { await navigator.clipboard.writeText(code); toast('✅ Código copiado'); } catch (e) { try { document.execCommand('copy'); toast('✅ Código copiado'); } catch (e2) { toast('Selecciona y copia el código manualmente'); } }
        };
        $('#eclose', m).onclick = closeModal;
      });
    };
    $('#imp').onclick = () => {
      modal(`<h3>📥 Importar progreso</h3><p>Pega aquí el código exportado. Reemplazará el progreso actual de este dispositivo.</p>
        <textarea class="code-box" id="icode" placeholder="Pega el código aquí…"></textarea><div class="m-btns"><button class="btn wide" id="iok">IMPORTAR</button><button class="btn flat wide" id="iclose">CANCELAR</button></div>`, m => {
        $('#iok', m).onclick = () => {
          try {
            const obj = JSON.parse(decodeURIComponent(escape(atob($('#icode', m).value.trim()))));
            if (!obj || typeof obj.done !== 'object') throw new Error('formato');
            S = sanitize(obj); save(); applyTheme(); closeModal(); toast('✅ Progreso importado'); renderProfile();
          } catch (e) { toast('❌ Código no válido'); }
        };
        $('#iclose', m).onclick = closeModal;
      });
    };
    $('#reset').onclick = () => confirmBox({ title: '¿Reiniciar todo?', text: 'Se borrará todo tu progreso, XP y errores de este dispositivo. No se puede deshacer.', ok: 'SÍ, BORRAR TODO', cancel: 'CANCELAR', danger: true, mood: 'sad' })
      .then(y => { if (!y) return; const keep = { sound: S.sound, theme: S.theme }; S = Object.assign(DEF(), keep); save(); toast('Progreso reiniciado'); go('path'); });
  }

  /* ---------- Teclado (escritorio) ---------- */
  document.addEventListener('keydown', e => {
    if (screen === 'done' && e.key === 'Enter') { const c = $('#cont'); if (c) { e.preventDefault(); c.click(); } return; }
    if (screen !== 'lesson' || !cur || $('.modal-back')) return;
    if (e.key === 'Enter') {
      const nx = $('#next'); if (nx) { e.preventDefault(); nx.click(); return; }
      const ck = $('#check'); if (ck && !ck.disabled) { e.preventDefault(); ck.click(); }
      return;
    }
    if (e.target && e.target.tagName === 'INPUT') return;
    if (/^[1-9]$/.test(e.key)) {
      const k = +e.key - 1;
      const list = cur.st.t === 'mcq' || cur.st.t === 'ipcheck' ? $$('.opt') : cur.st.t === 'tf' ? $$('.tf') : [];
      if (list[k]) list[k].click();
    }
  });

  /* ---------- Guardado al salir / ciclo de vida ---------- */
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { tick(); save(); } });
  window.addEventListener('pagehide', () => { tick(); save(); });
  let rz = null;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { if (screen === 'path') { syncTopbarH(); drawRoad(); placeAvatar(false); } }, 120); });

  /* ---------- Inicio ---------- */
  applyTheme();
  if (!UNITS.length) { app.innerHTML = '<div class="boot">No se pudo cargar el contenido 😕</div>'; return; }
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  history.replaceState(null, '');
  renderPath(true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (screen === 'path') { drawRoad(); placeAvatar(true); } });
  if (S.run) {
    setTimeout(() => {
      if (screen !== 'path' || !S.run) return;
      const p = Math.round(100 * S.run.done / S.run.total);
      confirmBox({ title: '¡Hola de nuevo! 👋', text: `Dejaste "${runTitle(S.run)}" al ${p}%. ¿Continuamos donde la dejaste?`, ok: 'CONTINUAR', cancel: 'AHORA NO', mood: 'happy' })
        .then(y => { if (y && S.run) startNode(S.run.node); });
    }, 350);
  }
})();

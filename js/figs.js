/* Diagramas SVG usados en teoría y ejercicios. Los colores salen de variables CSS para modo claro/oscuro. */
(function () {
  const F = {};
  const W = (w, h, inner) => `<svg class="fig" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`;
  const ln = (a, b, c, d, cls = 'f-ln') => `<line class="${cls}" x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`;
  const tx = (x, y, s, cls = 'f-tx', anchor = 'middle') => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;
  const polar = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
  const pc = (x, y) => `<g class="f-pc" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><rect x="-13" y="-12" width="26" height="18" rx="3"/><rect class="f-scr" x="-10" y="-9" width="20" height="12" rx="1.5"/><rect x="-7" y="7" width="14" height="4" rx="2"/></g>`;
  const hub = (x, y) => `<g class="f-hub" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><rect x="-19" y="-11" width="38" height="22" rx="6"/><circle cx="-9" cy="0" r="2.2"/><circle cx="-3" cy="0" r="2.2"/><circle cx="3" cy="0" r="2.2"/><circle cx="9" cy="0" r="2.2"/></g>`;
  const box = (x, y, w, h, fill, label, sub, tcls = 'f-tx dk') =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" class="f-box"/>` +
    tx(x + w / 2, y + h / 2 + (sub ? -2 : 4.5), label, tcls) + (sub ? tx(x + w / 2, y + h / 2 + 12, sub, 'f-tx dk sm') : '');

  // ---------- Topologías ----------
  F.star = () => {
    let s = '', p = '';
    for (let k = 0; k < 6; k++) { const q = polar(150, 95, 70, -90 + k * 60); s += ln(150, 95, q[0], q[1]); p += pc(q[0], q[1]); }
    return W(300, 190, s + hub(150, 95) + p);
  };
  F.extstar = () => {
    let s = '', p = '';
    const c = [150, 116];
    [-90, 30, 150].forEach(a => {
      const sub = polar(c[0], c[1], 56, a);
      s += ln(c[0], c[1], sub[0], sub[1]);
      [-55, 0, 55].forEach(d => { const q = polar(sub[0], sub[1], 44, a + d); s += ln(sub[0], sub[1], q[0], q[1]); p += pc(q[0], q[1]); });
      p += hub(sub[0], sub[1]);
    });
    return W(300, 216, s + p + hub(c[0], c[1]));
  };
  F.bus = () => {
    let s = `<line class="f-bus" x1="16" y1="95" x2="284" y2="95"/><rect class="f-term" x="8" y="86" width="9" height="18" rx="2"/><rect class="f-term" x="283" y="86" width="9" height="18" rx="2"/>`, p = '';
    [50, 100, 150, 200, 250].forEach((x, k) => { const y = k % 2 ? 150 : 40; s += ln(x, 95, x, y); p += pc(x, y); });
    return W(300, 190, s + p);
  };
  F.ring = () => {
    let s = `<circle class="f-ring" cx="150" cy="95" r="70"/>`, p = '';
    for (let k = 0; k < 6; k++) { const q = polar(150, 95, 70, -90 + k * 60); p += pc(q[0], q[1]); }
    return W(300, 190, s + p);
  };
  F.dualring = () => {
    let s = `<circle class="f-ring" cx="150" cy="98" r="74"/><circle class="f-ring2" cx="150" cy="98" r="56"/>`;
    s += `<path class="f-arrow" d="M157 24 l-11 -6.5 v13 z"/>`; // anillo principal: sentido horario
    s += `<path class="f-arrow2" d="M143 42 l11 -6.5 v13 z"/>`; // anillo de respaldo: sentido contrario
    let p = '';
    for (let k = 0; k < 6; k++) { const q = polar(150, 98, 74, -60 + k * 60); p += pc(q[0], q[1]); }
    return W(300, 196, s + p);
  };
  F.tree = () => {
    let s = '';
    s += ln(150, 30, 85, 95) + ln(150, 30, 215, 95);
    [[85, [45, 120]], [215, [180, 255]]].forEach(([x, ls]) => ls.forEach(l => { s += ln(x, 95, l, 160); }));
    return W(300, 190, s + hub(150, 30) + hub(85, 95) + hub(215, 95) + [45, 120, 180, 255].map(x => pc(x, 160)).join(''));
  };
  F.mesh = () => {
    const ps = []; for (let k = 0; k < 5; k++) ps.push(polar(150, 100, 74, -90 + k * 72));
    let s = '';
    for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) s += ln(ps[i][0], ps[i][1], ps[j][0], ps[j][1]);
    return W(300, 190, s + ps.map(q => pc(q[0], q[1])).join(''));
  };

  // ---------- Modelos ----------
  const OSI = [['7', 'Aplicación', '#FF8A8A'], ['6', 'Presentación', '#FFC36B'], ['5', 'Sesión', '#FFE680'], ['4', 'Transporte', '#A5EBA0'],
    ['3', 'Red', '#8FE3EE'], ['2', 'Enlace de datos', '#9CCBFF'], ['1', 'Física', '#D6C6FF']];
  F.osi = () => W(300, 222, OSI.map((l, k) =>
    `<rect x="30" y="${4 + k * 31}" width="240" height="27" rx="7" fill="${l[2]}"/>` +
    tx(50, 22.5 + k * 31, l[0], 'f-tx dk b') + tx(155, 22.5 + k * 31, l[1], 'f-tx dk')).join(''));
  const TCP = [['Aplicación', '#FFC9A3'], ['Transporte', '#FF9FCF'], ['Internet', '#FFF08A'], ['Acceso a la red', '#B4F0C2']];
  F.tcpip = () => W(300, 132, TCP.map((l, k) => `<rect x="30" y="${4 + k * 31}" width="240" height="27" rx="7" fill="${l[1]}"/>` + tx(150, 22.5 + k * 31, l[0], 'f-tx dk')).join(''));
  F.osivstcp = () => {
    let s = tx(80, 14, 'Modelo OSI', 'f-tx b') + tx(232, 14, 'Modelo TCP/IP', 'f-tx b');
    OSI.forEach((l, k) => { s += `<rect x="8" y="${22 + k * 30}" width="144" height="26" rx="6" fill="${l[2]}"/>` + tx(80, 39.5 + k * 30, l[1], 'f-tx dk sm2'); });
    const R = [['Aplicación', 0, 3, '#FFC9A3'], ['Transporte', 3, 1, '#FF9FCF'], ['Internet', 4, 1, '#FFF08A'], ['Acceso a la red', 5, 2, '#B4F0C2']];
    R.forEach(([n, a, c, col]) => { const y = 22 + a * 30, h = c * 30 - 4; s += `<rect x="165" y="${y}" width="134" height="${h}" rx="6" fill="${col}"/>` + tx(232, y + h / 2 + 4.5, n, 'f-tx dk sm2'); });
    s += `<path class="f-ln thin" d="M152 35 H165 M152 125 H165 M152 155 H165 M152 200 H165"/>`;
    return W(306, 236, s);
  };
  F.encap = () => {
    const or = '#FFB066', g = '#2E9E5B', c = '#4FC3D9', b = '#3DA5F4';
    let s = '';
    const lab = (y, a, b2) => tx(4, y, a, 'f-tx sm2 b', 'start') + tx(4, y + 13, b2, 'f-tx sm', 'start');
    s += lab(28, 'Transporte', '→ Mensaje') + `<rect x="232" y="16" width="44" height="22" rx="4" fill="${g}"/>` + tx(254, 31, 'H4', 'f-tx w sm2') + `<rect x="276" y="16" width="110" height="22" rx="4" fill="${or}"/>` + tx(331, 31, 'DATOS', 'f-tx dk sm2');
    s += lab(70, 'Red', '→ Paquete') + `<rect x="188" y="58" width="44" height="22" rx="4" fill="${c}"/>` + tx(210, 73, 'H3', 'f-tx dk sm2') + `<rect x="232" y="58" width="154" height="22" rx="4" fill="${or}"/>` + tx(309, 73, 'DATOS', 'f-tx dk sm2');
    s += lab(112, 'Enlace', '→ Frame (trama)') + `<rect x="144" y="100" width="44" height="22" rx="4" fill="${b}"/>` + tx(166, 115, 'H2', 'f-tx w sm2') + `<rect x="188" y="100" width="198" height="22" rx="4" fill="${or}"/>` + tx(287, 115, 'DATOS', 'f-tx dk sm2');
    s += lab(154, 'Física', '→ bits') + `<rect x="144" y="142" width="242" height="22" rx="4" fill="${or}"/>` + tx(265, 157, '0101101001011100101…', 'f-tx dk sm2 mono');
    return W(392, 172, s);
  };
  F.ethlayers = () => {
    let s = '';
    const names = ['Aplicación', 'Presentación', 'Sesión', 'Transporte', 'Red'];
    names.forEach((n, k) => { s += `<rect x="10" y="${4 + k * 30}" width="170" height="26" rx="6" class="f-gray"/>` + tx(95, 21.5 + k * 30, n, 'f-tx muted sm2'); });
    s += `<rect x="10" y="154" width="170" height="34" rx="6" class="f-dark"/>` + tx(80, 175, 'Enlace de datos', 'f-tx w sm2') + tx(160, 167, 'LLC', 'f-tx w sm') + tx(160, 183, 'MAC', 'f-tx w sm');
    s += `<rect x="10" y="192" width="170" height="26" rx="6" class="f-dark"/>` + tx(95, 209.5, 'Física', 'f-tx w sm2');
    s += `<rect x="186" y="154" width="72" height="16" rx="3" fill="#CDB4F5"/>` + tx(222, 166, '802.2', 'f-tx dk sm');
    s += `<rect x="186" y="172" width="72" height="46" rx="3" fill="#9FD8F7"/>` + tx(222, 199, '802.3', 'f-tx dk sm2');
    s += `<path class="f-ln thin" d="M264 154 h8 v64 h-8"/>` + tx(296, 190, 'Ethernet', 'f-tx sm2 b');
    return W(324, 222, s);
  };
  F.ethframe = () => {
    const cells = [['Preámbulo', '8 bytes', 66], ['Destino', '6 bytes', 54], ['Origen', '6 bytes', 52], ['Tipo', '2 bytes', 42], ['Datos', '46–1500 bytes', 88], ['FCS', '4 bytes', 44]];
    let x = 6, s = '';
    cells.forEach(([n, z, w]) => {
      s += `<rect x="${x}" y="22" width="${w}" height="30" class="f-cell"/>` + tx(x + w / 2, 41, n, 'f-tx w sm b');
      s += `<rect x="${x}" y="52" width="${w}" height="22" class="f-cell2"/>` + tx(x + w / 2, 67, z, 'f-tx dk xs');
      x += w;
    });
    s += `<path class="f-ln thin" d="M6 16 V10 H${x} V16"/>` + tx(x / 2 + 3, 8, 'Trama Ethernet', 'f-tx sm b');
    return W(x + 6, 80, s);
  };
  F.wififrame = () => {
    let s = `<rect x="10" y="8" width="80" height="26" class="f-cell"/>` + tx(50, 25, 'Header', 'f-tx w sm2 b');
    s += `<rect x="90" y="8" width="170" height="26" fill="#E6D3F7" class="f-box"/>` + tx(175, 25, 'Payload (datos)', 'f-tx dk sm2');
    s += `<rect x="260" y="8" width="66" height="26" fill="#FFF3B0" class="f-box"/>` + tx(293, 25, 'FCS', 'f-tx dk sm2');
    s += `<path class="f-fan" d="M10 34 L10 74 L326 74 L90 34 Z"/>`;
    const f = ['Control', 'Duración', 'Dir. 1', 'Dir. 2', 'Dir. 3', 'Secuencia', 'Dir. 4'];
    const w = 316 / 7;
    f.forEach((n, k) => { s += `<rect x="${10 + k * w}" y="74" width="${w}" height="30" class="f-cell2"/>` + tx(10 + k * w + w / 2, 93, n, 'f-tx dk xs'); });
    return W(336, 110, s);
  };
  F.ipclasses = () => {
    const R = [['A', '0', 1, 'red (7)', 7, 'host (24 bits)', 24], ['B', '10', 2, 'red (14)', 14, 'host (16)', 16], ['C', '110', 3, 'red (21)', 21, 'host (8)', 8],
      ['D', '1110', 4, 'dirección multicast', 28, '', 0], ['E', '1111', 4, 'reservado / experimental', 28, '', 0]];
    const u = 9.4, x0 = 34;
    let s = '';
    R.forEach(([c, bits, nb, a, na, h, nh], k) => {
      const y = 6 + k * 30;
      s += tx(14, y + 17, c, 'f-tx b');
      s += `<rect x="${x0}" y="${y}" width="${nb * u}" height="24" fill="#FFC800" class="f-box"/>` + tx(x0 + nb * u / 2, y + 16.5, bits, 'f-tx dk sm mono');
      s += `<rect x="${x0 + nb * u}" y="${y}" width="${na * u}" height="24" fill="${nh ? '#9CCBFF' : '#D6C6FF'}" class="f-box"/>` + tx(x0 + nb * u + na * u / 2, y + 16.5, a, 'f-tx dk sm');
      if (nh) s += `<rect x="${x0 + (nb + na) * u}" y="${y}" width="${nh * u}" height="24" fill="#A5EBA0" class="f-box"/>` + tx(x0 + (nb + na) * u + nh * u / 2, y + 16.5, h, 'f-tx dk sm');
    });
    return W(x0 + 32 * u + 6, 156, s);
  };
  F.ipbits = () => {
    const o = [['192', '11000000'], ['168', '10101000'], ['10', '00001010'], ['1', '00000001']];
    let s = '';
    o.forEach(([d, b], k) => {
      const x = 8 + k * 80, net = k < 3;
      s += `<rect x="${x}" y="8" width="72" height="50" rx="8" fill="${net ? '#DDF4FF' : '#FFE8CC'}" stroke="${net ? '#1CB0F6' : '#FF9600'}" stroke-width="2"/>`;
      s += tx(x + 36, 30, d, 'f-tx dk b') + tx(x + 36, 49, b, 'f-tx dk sm mono');
      if (k < 3) s += tx(x + 76, 34, '.', 'f-tx b');
    });
    s += `<path d="M10 66 v6 h228 v-6" fill="none" stroke="#1CB0F6" stroke-width="2"/>` + tx(124, 88, 'Red (192.168.10)', 'f-tx sm2 b');
    s += `<path d="M250 66 v6 h68 v-6" fill="none" stroke="#FF9600" stroke-width="2"/>` + tx(284, 88, 'Host', 'f-tx sm2 b');
    s += tx(164, 106, '32 bits = 4 octetos de 8 bits', 'f-tx sm muted');
    return W(328, 112, s);
  };
  F.commsys = () => {
    const bx = (x, y, l, sub, col) => box(x, y, 96, 40, col, l, sub);
    const A = (d) => `<path class="f-ln" d="${d}" marker-end="url(#ah)"/>`;
    let s = `<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="f-ahd"/></marker></defs>`;
    s += bx(6, 10, 'Fuente', 'DTE (PC)', '#9CCBFF') + bx(124, 10, 'Transmisor', 'DCE (módem)', '#FFC36B') + bx(242, 10, 'Sistema de', 'transmisión', '#D6C6FF');
    s += bx(242, 92, 'Receptor', 'DCE (módem)', '#FFC36B') + bx(124, 92, 'Destino', 'DTE (servidor)', '#9CCBFF');
    s += A('M102 30 H120') + A('M220 30 H238') + A('M290 50 V88') + A('M242 112 H224');
    return W(344, 140, s);
  };
  F.casts = () => {
    const panel = (ox, title, hit) => {
      let s = tx(ox + 52, 14, title, 'f-tx sm2 b');
      const src = [ox + 14, 72];
      [26, 56, 86, 116].forEach((y, k) => {
        const on = hit.includes(k);
        s += `<line x1="${src[0] + 8}" y1="${src[1]}" x2="${ox + 86}" y2="${y}" class="${on ? 'f-hit' : 'f-ln thin dim'}"/>`;
        s += `<circle cx="${ox + 92}" cy="${y}" r="8" class="${on ? 'f-on' : 'f-off'}"/>`;
      });
      s += `<circle cx="${src[0]}" cy="${src[1]}" r="10" class="f-src"/>`;
      return s;
    };
    return W(330, 130, panel(2, 'Unicast', [1]) + panel(112, 'Broadcast', [0, 1, 2, 3]) + panel(222, 'Multicast', [0, 2]));
  };

  window.FIG = F;
})();

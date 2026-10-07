/* ESTUDIO RÁPIDO — Tabla de clases IP (acceso directo desde la parte de arriba de la ruta).
   Los pasos {t:'gen', n} se reemplazan por ejercicios "Analiza la IP" generados al azar. */
window.RL.quick = {
  id: 'ipq', title: 'Tabla de clases IP', icon: '🅰️',
  kicker: 'Estudio rápido · Clase 3', color: '#00CD9C', dark: '#00A57D',
  steps: [
    T('La tabla de clases IP', '¡Directo a lo que más importa! Esta tabla hay que sabérsela 🅰️',
      `<div class="tw"><table class="tbl wide"><tr><th>Clase</th><th>Rango</th><th>Bits iniciales</th><th>Máscara</th><th>N.º de redes</th><th>N.º de hosts</th><th>Broadcast</th></tr>
      <tr><td><b>A</b></td><td>1.0.0.0 – 127.255.255.255</td><td>0</td><td>255.0.0.0 (/8)</td><td>2<sup>7</sup> = 128</td><td>2<sup>24</sup> − 2 = 16.777.214</td><td>x.255.255.255</td></tr>
      <tr><td><b>B</b></td><td>128.0.0.0 – 191.255.255.255</td><td>10</td><td>255.255.0.0 (/16)</td><td>2<sup>14</sup> = 16.384</td><td>2<sup>16</sup> − 2 = 65.534</td><td>x.x.255.255</td></tr>
      <tr><td><b>C</b></td><td>192.0.0.0 – 223.255.255.255</td><td>110</td><td>255.255.255.0 (/24)</td><td>2<sup>21</sup> = 2.097.150 (lámina)</td><td>2<sup>8</sup> − 2 = 254</td><td>x.x.x.255</td></tr>
      <tr><td><b>D</b></td><td>224.0.0.0 – 239.255.255.255</td><td>1110</td><td>–</td><td>Multicast</td><td>–</td><td>–</td></tr>
      <tr><td><b>E</b></td><td>240.0.0.0 – 255.255.255.255</td><td>1111</td><td>–</td><td>Experimental / reservado</td><td>–</td><td>–</td></tr></table></div>
      <p class="tnote">↔️ Desliza la tabla para ver todas las columnas.</p>
      Especiales: <b>0.0.0.0</b> = máquina arrancando o sin IP asignada · <b>127.x.x.x</b> = loopback (bucle local).`),
    M('¿A qué clase pertenece 10.25.3.1?', ['A', 'B', 'C', 'D'], 'Mira el primer octeto: la clase A va de 1 a 127.'),
    M('¿A qué clase pertenece 191.200.5.9?', ['B', 'C', 'A', 'E'], 'La clase B termina en 191.'),
    M('¿A qué clase pertenece 223.1.1.1?', ['C', 'D', 'B', 'E'], 'La clase C llega hasta 223.'),
    M('¿A qué clase pertenece 230.0.0.5?', ['D (multicast)', 'C', 'E (experimental)', 'B'], 'D va de 224 a 239.'),
    M('¿A qué clase pertenece 245.10.0.1?', ['E (experimental / reservado)', 'D (multicast)', 'C', 'A'], 'E va de 240 a 255.'),
    T('Truco para memorizarla', 'No la memorices a lo loco: todo sale de los bits 🧠',
      `<ul><li><b>Primer octeto → clase</b>: A <b>1–127</b> · B <b>128–191</b> · C <b>192–223</b> · D <b>224–239</b> · E <b>240–255</b>. Aprende los "cortes": <b>128, 192, 224, 240</b>.</li>
      <li><b>Bits iniciales</b>: cada clase le agrega un 1 al anterior: A <b>0</b> · B <b>10</b> · C <b>110</b> · D <b>1110</b> · E <b>1111</b>.</li>
      <li><b>Máscara</b>: A tiene 1 octeto de red (<b>/8</b> = 255.0.0.0), B tiene 2 (<b>/16</b> = 255.255.0.0) y C tiene 3 (<b>/24</b> = 255.255.255.0).</li>
      <li><b>N.º de hosts</b> = 2<sup>bits de host</sup> − 2 → A 2<sup>24</sup> − 2 · B 2<sup>16</sup> − 2 · C 2<sup>8</sup> − 2. Se restan 2 porque la dirección de <b>red</b> y la de <b>broadcast</b> no se asignan.</li>
      <li><b>N.º de redes</b> = 2<sup>(bits de red − bits iniciales)</sup> → A 2<sup>8−1</sup> = 2<sup>7</sup> · B 2<sup>16−2</sup> = 2<sup>14</sup> · C 2<sup>24−3</sup> = 2<sup>21</sup>.</li>
      <li><b>Broadcast</b>: la parte de host toda en 255 → A x.255.255.255 · B x.x.255.255 · C x.x.x.255.</li></ul>
      <p class="tnote">Ojo: 2<sup>21</sup> en realidad da 2.097.152; en la lámina de clase aparece 2.097.150.</p>`, 'ipclasses'),
    P('Une cada clase con su rango', [
      ['Clase A', '1.0.0.0 – 127.255.255.255'], ['Clase B', '128.0.0.0 – 191.255.255.255'],
      ['Clase C', '192.0.0.0 – 223.255.255.255'], ['Clase D', '224.0.0.0 – 239.255.255.255']]),
    P('Une cada clase con sus bits iniciales', [['Clase A', '0'], ['Clase B', '10'], ['Clase C', '110'], ['Clase D', '1110'], ['Clase E', '1111']]),
    P('Une cada clase con su máscara', [['Clase A', '255.0.0.0 (/8)'], ['Clase B', '255.255.0.0 (/16)'], ['Clase C', '255.255.255.0 (/24)']]),
    P('Une cada clase con su número de hosts', [['Clase A', '2^24 − 2 = 16.777.214'], ['Clase B', '2^16 − 2 = 65.534'], ['Clase C', '2^8 − 2 = 254']]),
    P('Une cada clase con su número de redes', [['Clase A', '2^7 = 128'], ['Clase B', '2^14 = 16.384'], ['Clase C', '2^21 = 2.097.150']]),
    M('¿Cuántas redes hay en la clase A?', ['128 (2^7)', '16.384 (2^14)', '254', '16.777.214'], 'Bits de red de A (8) menos su bit inicial (1) = 7.'),
    M('¿Cuántas redes hay en la clase B?', ['16.384 (2^14)', '128 (2^7)', '65.534', '2.097.150 (2^21)'], '16 bits de red − 2 bits iniciales = 14.'),
    M('¿Cuántos hosts por red tiene la clase A?', ['16.777.214 (2^24 − 2)', '65.534 (2^16 − 2)', '254 (2^8 − 2)', '128 (2^7)'], 'La clase A tiene 24 bits de host.'),
    M('¿Cuál es el formato de broadcast de la clase B?', ['x.x.255.255', 'x.255.255.255', 'x.x.x.255', '255.255.0.0'], 'La clase B tiene 2 octetos de host.'),
    W('Escribe el formato de broadcast de la clase C (usa x)', ['x.x.x.255'], 'La clase C tiene 1 solo octeto de host.'),
    M('¿Por qué al número de hosts se le restan 2?', ['Porque la dirección de red y la de broadcast no se asignan', 'Porque se reservan para el router y el switch', 'Por el loopback y el 0.0.0.0', 'Porque son los bits iniciales']),
    TF('La clase D (224 – 239) se usa para multicast.', true),
    M('¿Qué bits iniciales tiene la clase B?', ['10', '0', '110', '1110'], 'Cada clase agrega un 1: A=0, B=…'),
    O('Ordena las clases según su primer octeto (de menor a mayor)', ['A (1–127)', 'B (128–191)', 'C (192–223)', 'D (224–239)', 'E (240–255)']),
    T('¿Cómo analizar una IP?', 'Así se resuelven los ejercicios del examen 📝',
      `<b>Paso 1 · ¿Formato válido?</b> 4 octetos separados por puntos, solo números, cada uno de <b>0 a 255</b>. Si algo falla → <b>inválida</b>.
      <ul><li>192.168.1.<b>256</b> → inválida (256 &gt; 255)</li><li>10.0.1 → inválida (solo 3 octetos)</li><li>172.16.<b>a</b>.1 → inválida (tiene una letra)</li></ul>
      <b>Paso 2 · ¿Es una máscara?</b> Si son 255 seguidos de 0 (255.0.0.0 · 255.255.0.0 · 255.255.255.0) → <b>máscara de subred</b>.<br><br>
      <b>Paso 3 · Si no, busca la clase</b> con el primer octeto: te dice cuántos octetos son de <b>host</b> (A: 3 · B: 2 · C: 1). Mira la parte de host:
      <ul><li>Toda en <b>255</b> → <b>Broadcast</b></li><li>Toda en <b>0</b> → <b>Dirección de red</b></li><li>Cualquier otra cosa → <b>Host normal</b> (se puede asignar a una PC)</li></ul>
      <div class="tw"><table class="tbl"><tr><th>IP</th><th>Análisis</th><th>Resultado</th></tr>
      <tr><td>192.168.1.255</td><td>C · host = 255</td><td><b>Broadcast</b></td></tr>
      <tr><td>10.255.255.255</td><td>A · host = 255.255.255</td><td><b>Broadcast</b></td></tr>
      <tr><td>172.16.0.0</td><td>B · host = 0.0</td><td><b>Dirección de red</b></td></tr>
      <tr><td>200.5.6.7</td><td>C · host = 7</td><td><b>Host normal</b></td></tr>
      <tr><td>255.255.0.0</td><td>255… y luego 0…</td><td><b>Máscara</b></td></tr></table></div>
      ⚠️ <b>Trampa:</b> terminar en .255 no siempre es broadcast. <b>172.16.5.255</b> es clase B: su host es 5.255 → <b>host normal</b>.<br>
      En estos ejercicios usa siempre la <b>máscara por defecto de la clase</b>.`),
    { t: 'gen', n: 6 }
  ]
};

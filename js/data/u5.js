/* UNIDAD 5 — Clase 3 (parte 2): Direcciones IP y MAC, Protocolo IPv4 */
unit({
  id: 'u5',
  kicker: 'Unidad 5 · Clase 3',
  title: 'Direcciones IP y MAC',
  desc: 'IP vs MAC, ARP, unicast/broadcast/multicast, IPv4 y binario, clases, privadas, NAT y CIDR.',
  color: '#00CD9C', dark: '#00A57D',
  lessons: [
    {
      id: 'u5l1', title: 'IP vs MAC', icon: '🪪',
      steps: [
        T('Direcciones IP y MAC', 'Dos direcciones, dos trabajos distintos 🏷️',
          `<div class="tw"><table class="tbl"><tr><th>Dirección IP</th><th>Dirección MAC</th></tr>
          <tr><td>De <b>32 bits</b>.</td><td>De <b>48 bits</b>, grabada en una <b>ROM</b> de la tarjeta adaptadora.</td></tr>
          <tr><td>Dirección de la <b>capa de red</b>.</td><td>También llamada dirección <b>LAN, física o Ethernet</b>.</td></tr>
          <tr><td>Conduce un datagrama a la <b>subred destino</b>.</td><td>Conduce un datagrama a otra interfaz <b>físicamente conectada</b> (misma red).</td></tr>
          <tr><td>Ej: <b>164.220.15.180</b></td><td>Ej: <b>A3:42:B5:F6:86:4D</b></td></tr></table></div>
          <b>Datagrama</b>: paquete de datos que atraviesa una red basada en IP.`),
        P('Une cada concepto con su descripción', [
          ['Dirección IP', '32 bits, capa de red'],
          ['Dirección MAC', '48 bits, grabada en la ROM de la NIC'],
          ['Datagrama', 'Paquete que atraviesa una red IP'],
          ['164.220.15.180', 'Ejemplo de dirección IP']]),
        M('¿Cuántos bits tiene una dirección MAC?', ['48', '32', '64', '128']),
        M('¿Cuántos bits tiene una dirección IPv4?', ['32', '48', '16', '128']),
        M('¿Cuál de estas es una dirección MAC?', ['A3:42:B5:F6:86:4D', '164.220.15.180', '255.255.255.0', '192.168.1.0/24']),
        TF('La dirección MAC está grabada en la ROM de la tarjeta de red.', true),
        T('¿Dónde se usa cada una?', 'IP para el viaje completo, MAC para cada tramo 🚏',
          `<ul><li>En la <b>capa de red</b> se construye un <b>paquete IP</b> que identifica los hosts de <b>origen y destino</b>.</li>
          <li>En la <b>capa de enlace</b> se usa <b>ARP</b> para determinar las direcciones <b>MAC</b> de origen y destino de la trama.</li>
          <li>Ej. de clase: la laptop envía a otra red → la trama lleva como MAC <b>origen</b> la de la laptop y como MAC <b>destino</b> la de la interfaz <b>Fa0/0 del Router B</b> (su puerta de enlace).</li></ul>`),
        M('Una laptop envía datos a un servidor de OTRA red. ¿Qué MAC destino lleva la trama?', ['La MAC de la interfaz del router (puerta de enlace)', 'La MAC del servidor final', 'Siempre FF:FF:FF:FF:FF:FF', 'La MAC de la propia laptop']),
        M('Otro nombre para la dirección MAC es…', ['Dirección física', 'Dirección lógica', 'Dirección de broadcast', 'Máscara de red'])
      ]
    },
    {
      id: 'u5l2', title: 'ARP y tipos de comunicación', icon: '📢',
      steps: [
        T('ARP', '¿Quién tiene esta IP? 🙋',
          `<b>ARP</b> (Protocolo de Resolución de Direcciones): un host que desea descubrir la <b>dirección MAC</b> de otro host envía un <b>broadcast de ARP</b> a la red. El host que tiene la <b>dirección IP</b> del pedido <b>responde con su dirección MAC</b>.<br><br>
          <b>Broadcast</b>: forma de transmisión en la que un dispositivo transmite a <b>todos</b> los dispositivos de la red.`),
        M('¿Para qué sirve ARP?', ['Descubrir la MAC de un host a partir de su IP', 'Asignar IPs automáticamente', 'Traducir nombres de dominio a IP', 'Encontrar la mejor ruta']),
        O('Ordena cómo funciona ARP', ['El host envía un broadcast ARP preguntando por una IP', 'Todos los hosts de la red reciben la pregunta', 'El host que tiene esa IP responde con su MAC']),
        T('Unicast, broadcast y multicast', 'Las 3 formas de comunicarse en IPv4 📨',
          `<ul><li><b>Unicast</b>: se envía un paquete de un host a <b>un host individual</b>.</li>
          <li><b>Broadcast</b>: se envía un paquete de un host a <b>todos los hosts</b> de la red.</li>
          <li><b>Multicast</b>: se envía un paquete de un host a un <b>grupo seleccionado</b> de hosts.</li></ul>`, 'casts'),
        P('Une cada tipo de comunicación', [['Unicast', 'Uno a uno'], ['Broadcast', 'Uno a todos'], ['Multicast', 'Uno a un grupo seleccionado'], ['ARP', 'Pregunta la MAC usando broadcast']]),
        M('Una solicitud ARP se envía como…', ['Broadcast', 'Unicast', 'Multicast', 'Simplex']),
        TF('Multicast envía un paquete a todos los hosts de la red.', false, null, 'Eso es broadcast. Multicast es a un GRUPO seleccionado de hosts.'),
        M('¿Qué tipo de comunicación es enviar un mensaje privado a una sola PC?', ['Unicast', 'Broadcast', 'Multicast', 'ARP'])
      ]
    },
    {
      id: 'u5l3', title: 'Direcciones IPv4', icon: '🔢',
      steps: [
        T('Direcciones IPv4', '4 números separados por puntos 🔢',
          `<b>IPv4</b>: abreviatura de <b>Protocolo de Internet versión 4</b>.
          <ul><li>Se escriben en <b>notación decimal punteada</b> (ej. 192.168.10.1).</li>
          <li>Son direcciones de <b>32 bits</b>, compuestas de <b>4 octetos</b> (8 bits cada uno).</li>
          <li>Tienen una parte de <b>red</b> y una parte de <b>host</b>.</li>
          <li>Existen <b>5 clases</b>: A, B, C, D y E; usualmente se usan las tres primeras.</li>
          <li>Versión de uso actual: <b>IPv4</b>. Versión a mediano plazo: <b>IPv6</b>.</li></ul>`, 'ipbits'),
        M('¿Cuántos octetos tiene una dirección IPv4?', ['4', '8', '6', '32']),
        M('¿Cuántos bits tiene un octeto?', ['8', '4', '16', '32']),
        T('Del decimal al binario', 'Mini-truco de conversión 🧮',
          `Cada octeto va de <b>0 a 255</b>. Valor de cada bit (de izquierda a derecha): <b>128 · 64 · 32 · 16 · 8 · 4 · 2 · 1</b>
          <div class="tw"><table class="tbl"><tr><th>Decimal</th><th>Suma</th><th>Binario</th></tr>
          <tr><td>192</td><td>128 + 64</td><td><b>11000000</b></td></tr>
          <tr><td>168</td><td>128 + 32 + 8</td><td><b>10101000</b></td></tr>
          <tr><td>10</td><td>8 + 2</td><td><b>00001010</b></td></tr>
          <tr><td>1</td><td>1</td><td><b>00000001</b></td></tr></table></div>
          En 192.168.10.1 (clase C): <b>red</b> = 192.168.10 y <b>host</b> = 1.`),
        M('¿Cuál es el binario de 192?', ['11000000', '10101000', '00001010', '11111111'], '192 = 128 + 64'),
        M('¿Cuál es el valor máximo de un octeto?', ['255', '256', '128', '999']),
        W('Convierte 10 a binario (8 bits)', '00001010', '10 = 8 + 2 → los bits de valor 8 y 2 van en 1.'),
        M('En 192.168.10.1 (clase C), ¿cuál es la parte de host?', ['1', '192.168.10', '192', '168.10.1']),
        TF('La versión de IP que se usará a mediano plazo es IPv6.', true),
        W('Convierte 11111111 a decimal', '255', 'Suma 128+64+32+16+8+4+2+1.')
      ]
    },
    {
      id: 'u5l4', title: 'Clases de direcciones IP', icon: '🅰️',
      steps: [
        T('Clases A, B, C, D y E', 'La tabla más importante de la Clase 3 🌟',
          `<div class="tw"><table class="tbl"><tr><th>Clase</th><th>Rango</th><th>Máscara</th><th>N° redes</th><th>N° hosts</th></tr>
          <tr><td><b>A</b></td><td>1.0.0.0 – 127.255.255.255</td><td>255.0.0.0 (/8)</td><td>128 (2^7)</td><td>16.777.214 (2^24−2)</td></tr>
          <tr><td><b>B</b></td><td>128.0.0.0 – 191.255.255.255</td><td>255.255.0.0 (/16)</td><td>16.384 (2^14)</td><td>65.534 (2^16−2)</td></tr>
          <tr><td><b>C</b></td><td>192.0.0.0 – 223.255.255.255</td><td>255.255.255.0 (/24)</td><td>2.097.150 (2^21)</td><td>254 (2^8−2)</td></tr>
          <tr><td><b>D</b></td><td>224.0.0.0 – 239.255.255.255</td><td colspan="3"><b>Multicast</b></td></tr>
          <tr><td><b>E</b></td><td>240.0.0.0 – 255.255.255.255</td><td colspan="3"><b>Experimentales</b></td></tr></table></div>
          Broadcast: A → x.255.255.255 · B → x.x.255.255 · C → x.x.x.255`),
        M('¿A qué clase pertenece 172.16.5.4?', ['B', 'A', 'C', 'D'], 'B va de 128 a 191.'),
        M('¿A qué clase pertenece 200.10.20.30?', ['C', 'B', 'A', 'D'], 'C va de 192 a 223.'),
        M('¿Cuál es la máscara por defecto de la clase B?', ['255.255.0.0', '255.0.0.0', '255.255.255.0', '255.255.255.255']),
        P('Une cada clase con su máscara o uso', [['Clase A', '255.0.0.0 (/8)'], ['Clase B', '255.255.0.0 (/16)'], ['Clase C', '255.255.255.0 (/24)'], ['Clase D', 'Multicast']]),
        T('Bits iniciales y direcciones especiales', 'Detalles que dan puntos extra ➕',
          `Bits iniciales de cada clase: <b>A = 0</b> · <b>B = 10</b> · <b>C = 110</b> · <b>D = 1110</b> · <b>E = 1111</b>
          <ul><li><b>0.0.0.0</b>: la usan las máquinas cuando están <b>arrancando</b> o no se les ha asignado dirección.</li>
          <li><b>127.x.x.x</b>: reservadas para pruebas de retroalimentación: dirección de <b>bucle local o loopback</b>.</li></ul>
          ¿Por qué "−2" en los hosts? Porque la dirección de <b>red</b> y la de <b>broadcast</b> no se asignan a dispositivos.`, 'ipclasses'),
        M('¿Cuántos hosts permite una red clase C?', ['254', '256', '65.534', '16.777.214']),
        M('La dirección 127.0.0.1 es…', ['Loopback (bucle local)', 'Broadcast', 'Multicast', 'Una IP pública normal']),
        M('¿Qué bits iniciales tiene una dirección clase C?', ['110', '10', '0', '1110']),
        M('¿Para qué se usan las direcciones clase E (240 – 255)?', ['Experimentales', 'Multicast', 'Loopback', 'Hosts normales']),
        W('¿Cuántos hosts tiene una red clase B? (escribe el número)', ['65534', '65.534', '65,534'], '2^16 − 2'),
        TF('La dirección 0.0.0.0 la usa una máquina cuando arranca o no tiene IP asignada.', true)
      ]
    },
    {
      id: 'u5l5', title: 'Privadas, red y broadcast', icon: '🏠',
      steps: [
        T('Direcciones privadas', 'Las IP de tu casa 🏡',
          `La mayoría de las direcciones IPv4 son <b>públicas</b> (accesibles desde Internet). Hay bloques para redes con acceso limitado o sin acceso a Internet: las <b>direcciones privadas</b>.
          <ul><li><b>10.0.0.0</b> a <b>10.255.255.255</b> (10.0.0.0 /8)</li>
          <li><b>172.16.0.0</b> a <b>172.31.255.255</b> (172.16.0.0 /12)</li>
          <li><b>192.168.0.0</b> a <b>192.168.255.255</b> (192.168.0.0 /16)</li></ul>`),
        M('¿Cuál de estas IP es PRIVADA?', ['192.168.1.50', '8.8.8.8', '200.44.32.12', '172.32.0.1'], 'Rangos privados: 10.x · 172.16–172.31 · 192.168.x'),
        M('¿Cuál de estas IP es privada?', ['172.20.10.5', '172.15.0.1', '11.0.0.1', '193.168.1.1'], 'Fíjate en el segundo octeto del 172.'),
        TF('172.32.0.1 es una dirección privada.', false, null, 'El rango privado del 172 es de 172.16.0.0 a 172.31.255.255. El 32 queda fuera.'),
        T('Dirección de red y de broadcast', 'Dos direcciones que NO se asignan 🚫',
          `En cada red hay 2 direcciones que <b>no pueden asignarse</b> a los dispositivos:
          <ul><li><b>Dirección de red</b>: identifica la red (dispositivos en el mismo segmento). Parte de host en <b>0</b>.</li>
          <li><b>Dirección de broadcast</b>: mensaje a todos los dispositivos de la red. Parte de host en <b>255</b>.</li></ul>
          Ej. de clase (clase A) <b>124.12.25.36</b> → red <b>124.0.0.0</b> · broadcast <b>124.255.255.255</b><br>
          Ej. clase C <b>192.168.1.35</b> → red <b>192.168.1.0</b> · broadcast <b>192.168.1.255</b>`),
        W('¿Cuál es la dirección de red de 124.12.25.36 (clase A)?', '124.0.0.0', 'En clase A, la red es solo el primer octeto; el resto va en 0.'),
        W('¿Cuál es la dirección de broadcast de 124.12.25.36 (clase A)?', '124.255.255.255', 'En clase A, los 3 octetos de host van en 255.'),
        W('¿Cuál es la dirección de broadcast de 192.168.1.35 (clase C)?', '192.168.1.255', 'En clase C, solo el último octeto es de host.'),
        M('¿Cuál es la dirección de red de 150.20.30.40 (clase B)?', ['150.20.0.0', '150.0.0.0', '150.20.30.0', '150.20.255.255'], 'Clase B: los 2 primeros octetos son de red.'),
        TF('La dirección de broadcast se puede asignar a una PC.', false),
        P('Une cada dirección con su tipo', [['10.0.0.0/8', 'Privada (bloque 10)'], ['172.16.0.0/12', 'Privada (bloque 172.16)'], ['192.168.0.0/16', 'Privada (bloque 192.168)'], ['127.0.0.1', 'Loopback']])
      ]
    },
    {
      id: 'u5l6', title: 'NAT y CIDR', icon: '🔄',
      steps: [
        T('NAT (Traducción de Direcciones de Red)', 'El traductor de tu router 🔁',
          `El <b>NAT</b> actúa como un <b>"traductor" intermedio</b> en tu router o gateway. Permite que <b>múltiples dispositivos</b> de una red privada usen <b>una sola IP pública</b> para comunicarse con Internet.
          <ol><li>Tu computadora usa una <b>IP privada</b> (ej. 192.168.1.50).</li>
          <li>El router cambia esa IP por la <b>IP pública</b> que te asignó tu proveedor (<b>ISP</b>) antes de enviarlo a la web.</li>
          <li>Al regresar los datos, el router los reenvía a tu computadora mediante una <b>tabla de asignación</b>.</li></ol>
          ✅ <b>Conserva</b> enormemente las IP públicas y añade <b>seguridad</b> al "ocultar" la red interna.`),
        O('Ordena el proceso de NAT', ['Tu PC envía con su IP privada', 'El router cambia la IP privada por la pública del ISP', 'El servidor web responde a la IP pública', 'El router usa su tabla para reenviar la respuesta a tu PC']),
        M('¿Cuál es una ventaja de NAT?', ['Conserva direcciones IP públicas y oculta la red interna', 'Aumenta el número de clases IP', 'Elimina la necesidad de router', 'Hace que todas las IP sean públicas']),
        T('CIDR (Enrutamiento entre dominios sin clases)', 'Adiós a las clases rígidas 👋',
          `<b>CIDR</b> (<i>Classless Inter-Domain Routing</i>) es un método de asignación de IP que <b>reemplazó</b> al antiguo sistema de <b>clases fijas (A, B y C)</b>.
          <ul><li>Introduce la <b>notación con barra</b> (ej. <b>/24</b>): define con precisión cuántos bits son de <b>red</b> y cuántos de <b>host</b>.</li>
          <li>Ej: en <b>192.168.1.0/24</b>, los primeros 24 bits fijan la red → hasta <b>254 hosts</b>.</li>
          <li>✅ Evita el <b>desperdicio</b> de IP y hace que las <b>tablas de enrutamiento</b> sean más pequeñas y eficientes, agrupando redes en un solo prefijo.</li></ul>
          /8 = 255.0.0.0 · /16 = 255.255.0.0 · /24 = 255.255.255.0`),
        M('En 192.168.1.0/24, ¿qué indica el /24?', ['Que los primeros 24 bits son de red', 'Que hay 24 hosts', 'Que es la red número 24', 'Que la máscara es 255.255.0.0']),
        M('¿Qué reemplazó CIDR?', ['El sistema de clases fijas (A, B, C)', 'El protocolo ARP', 'La subcapa MAC', 'El modelo OSI']),
        M('/8 equivale a la máscara…', ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255']),
        P('Une cada concepto con su significado', [['NAT', 'Traduce IP privada a pública'], ['CIDR', 'Notación con barra, sin clases'], ['ISP', 'Proveedor que asigna la IP pública'], ['/24', '255.255.255.0']]),
        TF('CIDR ayuda a que las tablas de enrutamiento de Internet sean más pequeñas.', true),
        W('Escribe la máscara equivalente a /16', '255.255.0.0', '16 bits = dos octetos en 255.')
      ]
    }
  ]
});

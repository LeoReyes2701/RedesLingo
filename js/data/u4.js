/* UNIDAD 4 — Clase 3 (parte 1): Ethernet y Redes LAN inalámbricas */
unit({
  id: 'u4',
  kicker: 'Unidad 4 · Clase 3',
  title: 'Ethernet y LAN inalámbrica',
  desc: 'Ethernet 802.3, subcapas LLC/MAC, trama Ethernet, Wi-Fi 802.11, estándares, modos y trama 802.11.',
  color: '#FF9600', dark: '#E08600',
  lessons: [
    {
      id: 'u4l1', title: 'Ethernet y sus subcapas', icon: '🔗',
      steps: [
        T('Encapsulación Ethernet', 'Ethernet vive abajo, en las capas 1 y 2 🏠',
          `<ul><li>Ethernet funciona en la <b>capa de enlace de datos</b> y en la <b>capa física</b>.</li>
          <li>Es una <b>familia de tecnologías</b> de red definidas en los estándares <b>IEEE 802.2</b> y <b>802.3</b>.</li></ul>`, 'ethlayers'),
        M('¿En qué capas OSI funciona Ethernet?', ['Enlace de datos y física', 'Red y transporte', 'Solo aplicación', 'Sesión y presentación']),
        T('Subcapas LLC y MAC', 'La capa 2 se divide en dos ✂️',
          `Los estándares 802 LAN/MAN (incluido Ethernet) usan <b>dos subcapas</b> de la capa de enlace de datos:
          <ul><li><b>LLC</b> (<b>IEEE 802.2</b>): coloca información en la trama para identificar <b>qué protocolo de capa de red</b> se utiliza.</li>
          <li><b>MAC</b> (<b>IEEE 802.3, 802.11 o 802.15</b>): responsable de la <b>encapsulación de datos</b> y del <b>control de acceso a medios</b>, y proporciona el <b>direccionamiento</b> de capa de enlace de datos.</li></ul>`),
        P('Une cada elemento con su estándar o función', [
          ['LLC', 'IEEE 802.2: identifica el protocolo de red'],
          ['MAC', 'Encapsula, controla el acceso y direcciona'],
          ['Ethernet', 'IEEE 802.3'],
          ['Wi-Fi', 'IEEE 802.11']]),
        M('¿Qué subcapa identifica qué protocolo de capa de red se usa en la trama?', ['LLC', 'MAC', 'Física', 'Transporte']),
        M('El estándar de la subcapa LLC es…', ['IEEE 802.2', 'IEEE 802.3', 'IEEE 802.11', 'IEEE 802.15']),
        TF('La subcapa MAC es responsable del control de acceso a los medios.', true)
      ]
    },
    {
      id: 'u4l2', title: 'Subcapa MAC y trama Ethernet', icon: '🧱',
      steps: [
        T('Encapsulamiento de datos (MAC)', 'Lo que hace la subcapa MAC 📦',
          `La encapsulación IEEE 802.3 incluye:
          <ul><li><b>Trama de Ethernet</b>: la estructura interna de la trama.</li>
          <li><b>Direccionamiento Ethernet</b>: incluye una dirección <b>MAC de origen y destino</b> para entregar la trama de NIC a NIC en la <b>misma LAN</b>.</li>
          <li><b>Detección de errores</b>: un tráiler (remolque) <b>FCS</b> (<i>Frame Check Sequence</i>, secuencia de verificación de trama).</li></ul>`),
        M('¿Para qué sirve el FCS de la trama Ethernet?', ['Detectar errores en la trama', 'Sincronizar', 'Indicar el protocolo superior', 'Guardar la dirección IP']),
        T('Acceso a los medios', 'Antes vs ahora 🕰️➡️🚀',
          `<ul><li>Ethernet <b>heredada</b> (topología de bus o concentradores/hubs) es un <b>medio compartido</b> en <b>semidúplex</b> → usa <b>CSMA/CD</b>.</li>
          <li>Las LAN Ethernet <b>de hoy</b> usan <b>switches</b> en <b>dúplex completo</b> → <b>no requieren CSMA/CD</b>.</li>
          <li>La subcapa MAC 802.3 incluye especificaciones para distintos medios: <b>cobre y fibra</b>.</li></ul>`),
        TF('Las LAN Ethernet actuales con switches en full dúplex necesitan CSMA/CD.', false, null, 'Con switches en dúplex completo no hay colisiones, así que no se requiere CSMA/CD.'),
        T('Campos de la trama Ethernet', '¡Memoriza los tamaños! 🔢',
          `<div class="tw"><table class="tbl"><tr><th>Campo</th><th>Tamaño</th><th>Para qué</th></tr>
          <tr><td><b>Preámbulo</b></td><td>8 bytes</td><td><b>Sincronización</b>; incluye un delimitador que marca el final de la información de tiempo.</td></tr>
          <tr><td><b>Destino</b></td><td>6 bytes</td><td>Dirección <b>MAC</b> de 48 bits del nodo destino.</td></tr>
          <tr><td><b>Origen</b></td><td>6 bytes</td><td>Dirección MAC de 48 bits del nodo origen.</td></tr>
          <tr><td><b>Tipo</b></td><td>2 bytes</td><td>Qué <b>protocolo de capa superior</b> recibirá los datos.</td></tr>
          <tr><td><b>Datos</b></td><td>46 – 1500 bytes</td><td>La PDU, por lo general un <b>paquete IPv4</b>.</td></tr>
          <tr><td><b>FCS</b></td><td>4 bytes</td><td>Controlar las <b>tramas dañadas</b> (errores).</td></tr></table></div>`, 'ethframe'),
        O('Ordena los campos de la trama Ethernet', ['Preámbulo', 'Destino', 'Origen', 'Tipo', 'Datos', 'FCS']),
        P('Une cada campo con su tamaño', [['Preámbulo', '8 bytes'], ['Dirección MAC destino', '6 bytes'], ['Tipo', '2 bytes'], ['FCS', '4 bytes']]),
        M('¿Cuál es el tamaño del campo de datos en Ethernet?', ['46 – 1500 bytes', '6 bytes', '8 – 64 bytes', '1500 – 9000 bytes']),
        M('¿Qué campo indica qué protocolo de capa superior recibirá los datos?', ['Tipo', 'Preámbulo', 'FCS', 'Origen']),
        M('¿Para qué sirve el preámbulo?', ['Sincronización', 'Detección de errores', 'Indicar la IP destino', 'Cifrar la trama']),
        W('¿Cuántos bytes tiene el FCS? (solo el número)', ['4', '4 bytes', 'cuatro'], 'Menos que la MAC (6) y más que el Tipo (2).')
      ]
    },
    {
      id: 'u4l3', title: 'Redes inalámbricas', icon: '📶',
      steps: [
        T('¿Qué es una red inalámbrica?', 'Sin cables, con ondas 🌊',
          `Las <b>redes inalámbricas</b> establecen una conexión entre nodos por medio de <b>ondas electromagnéticas</b>, sin el uso de una red cableada.<br><br><b>Beneficios</b>:
          <ul><li><b>Movilidad</b> de equipos.</li><li><b>Flexibilidad</b>: reubicar equipos sin modificar el cableado, crear una red nueva, agregar nodos.</li>
          <li>Instalación <b>fácil y rápida</b>: evita obras para tirar cable por muros.</li>
          <li><b>Costo</b>: ideal con cambios frecuentes o entornos dinámicos; mayor tiempo de vida; menor gasto de instalación.</li>
          <li><b>Fácil mantenimiento</b> y detección de fallas. <b>Escalabilidad</b>: cambio de configuración sencillo y transparente.</li></ul>
          ⚠️ No es una solución total a pesar de sus beneficios.`),
        M('¿Cuál es un beneficio de las redes inalámbricas?', ['Movilidad de los equipos', 'Mayor seguridad física que el cable', 'Inmunidad total a interferencias', 'Cobertura ilimitada']),
        T('Desventajas', 'No todo es perfecto 😬',
          `<ul><li><b>Área de cobertura</b>: puede verse afectada por las características físicas del lugar.</li>
          <li><b>Interferencia</b>: es susceptible y puede ser interrumpida por muchos dispositivos comunes.</li>
          <li><b>Seguridad</b>: no requiere acceso a un medio físico, así que <b>cualquiera puede acceder</b> a la transmisión.</li>
          <li>Las WLAN de medio compartido funcionan en <b>semidúplex</b>: muchos usuarios a la vez → <b>menor ancho de banda</b> para cada uno.</li></ul>`),
        M('¿Por qué la seguridad es una desventaja del Wi-Fi?', ['No requiere acceso físico al medio: cualquiera puede captar la transmisión', 'Porque usa fibra óptica', 'Porque es full dúplex', 'Porque no usa direcciones MAC']),
        T('¿Qué problemas presenta?', 'Obstáculos y ruido 🧱📻',
          `La cobertura depende de los obstáculos: una onda electromagnética puede ser <b>absorbida, reflejada, atenuada o desviada</b>.
          <ul><li><b>Múltiples trayectorias</b>: la señal rebota y llega por varios caminos.</li>
          <li><b>Interferencia</b> por otras fuentes de radiofrecuencia (hornos microondas, antenas, celulares).</li>
          <li><b>Menor ancho de banda</b>.</li></ul>`),
        M('¿Qué le puede pasar a una onda electromagnética al encontrar un obstáculo?', ['Ser absorbida, reflejada, atenuada o desviada', 'Convertirse en luz', 'Duplicar su velocidad', 'Nada, siempre lo atraviesa']),
        TF('Un horno microondas puede causar interferencia en una red inalámbrica.', true),
        TF('Las WLAN de medio compartido funcionan en full dúplex.', false, null, 'Funcionan en semidúplex: solo un dispositivo puede enviar o recibir a la vez.'),
        M('Muchos usuarios conectados al mismo tiempo a una WLAN provocan…', ['Menor ancho de banda para cada usuario', 'Más velocidad para todos', 'Que se use CSMA/CD', 'Que el AP se apague'])
      ]
    },
    {
      id: 'u4l4', title: 'Estándares inalámbricos', icon: '📜',
      steps: [
        T('Estándares inalámbricos', 'Cada tecnología con su número IEEE 🔢',
          `<ul><li><b>Wi-Fi (IEEE 802.11)</b>: tecnología de LAN inalámbrica (<b>WLAN</b>).</li>
          <li><b>Bluetooth (IEEE 802.15)</b>: red inalámbrica de área personal (<b>WPAN</b>).</li>
          <li><b>WiMAX (IEEE 802.16)</b>: topología <b>punto a multipunto</b> para acceso inalámbrico de <b>banda ancha</b>.</li>
          <li><b>Zigbee (IEEE 802.15.4)</b>: baja velocidad de datos y <b>bajo consumo de energía</b>, para <b>Internet de las cosas (IoT)</b>.</li></ul>`),
        P('Une cada tecnología con su estándar', [['Wi-Fi', 'IEEE 802.11'], ['Bluetooth', 'IEEE 802.15'], ['WiMAX', 'IEEE 802.16'], ['Zigbee', 'IEEE 802.15.4']]),
        M('¿Qué estándar está pensado para IoT con bajo consumo de energía?', ['Zigbee (802.15.4)', 'WiMAX (802.16)', 'Wi-Fi (802.11ac)', 'Ethernet (802.3)']),
        T('Organizaciones de estándares inalámbricos', 'Quién pone las reglas 👮',
          `Los estándares aseguran la <b>interoperabilidad</b> entre dispositivos de distintos fabricantes. Las 3 organizaciones internacionales:
          <ul><li><b>UIT</b> (International Telecommunication Union): regula la <b>asignación del espectro radioeléctrico</b> y las <b>órbitas satelitales</b>.</li>
          <li><b>IEEE</b> (Institute of Electrical and Electronics Engineers): especifica cómo se <b>modula</b> una frecuencia de radio para transportar información; mantiene la familia <b>IEEE 802 LAN/MAN</b>.</li>
          <li><b>Alianza Wi-Fi</b>: asociación de proveedores que <b>promueve</b> el crecimiento y la aceptación de las WLAN y mejora la <b>interoperabilidad</b> de los productos.</li></ul>`),
        P('Une cada organización con su función', [
          ['UIT', 'Asigna el espectro y las órbitas satelitales'],
          ['IEEE', 'Define la modulación y los estándares 802'],
          ['Wi-Fi Alliance', 'Promueve las WLAN y la interoperabilidad']]),
        M('¿Qué organización regula la asignación del espectro radioeléctrico?', ['UIT', 'IEEE', 'Wi-Fi Alliance', 'IETF']),
        W('¿Qué estándar IEEE corresponde a WiMAX? (formato 802.xx)', ['802.16', 'ieee 802.16'], 'Va después de Bluetooth (802.15).'),
        TF('Bluetooth es un estándar de red inalámbrica de área personal (WPAN).', true)
      ]
    },
    {
      id: 'u4l5', title: 'Estándares 802.11 y frecuencias', icon: '📻',
      steps: [
        T('Estándares 802.11 WLAN', 'La tabla de Wi-Fi completa 📶',
          `<div class="tw"><table class="tbl"><tr><th>Estándar</th><th>Frecuencia</th><th>Descripción</th></tr>
          <tr><td>802.11</td><td>2,4 GHz</td><td>Hasta <b>2 Mb/s</b></td></tr>
          <tr><td>802.11a</td><td>5 GHz</td><td>Hasta <b>54 Mb/s</b>. <b>No interoperable</b> con 802.11b ni 802.11g.</td></tr>
          <tr><td>802.11b</td><td>2,4 GHz</td><td>Hasta <b>11 Mb/s</b>. <b>Mayor alcance</b> que 802.11a y mejor penetración en edificios.</td></tr>
          <tr><td>802.11g</td><td>2,4 GHz</td><td>Hasta <b>54 Mb/s</b>. <b>Compatible</b> con 802.11b.</td></tr>
          <tr><td>802.11n</td><td>2,4 y 5 GHz</td><td><b>150 – 600 Mb/s</b>. Requiere múltiples antenas con <b>MIMO</b>.</td></tr>
          <tr><td>802.11ac</td><td>5 GHz</td><td><b>450 Mb/s – 1,3 Gb/s</b>. Admite hasta <b>ocho antenas</b>.</td></tr>
          <tr><td>802.11ax</td><td>2,4 y 5 GHz</td><td><b>High-Efficiency Wireless (HEW)</b>. Capaz de usar frecuencias de 1 GHz y 7 GHz.</td></tr></table></div>`),
        P('Une cada estándar con su dato', [['802.11a', '5 GHz, 54 Mb/s'], ['802.11b', '2,4 GHz, 11 Mb/s'], ['802.11g', '2,4 GHz, 54 Mb/s, compatible con b'], ['802.11n', 'MIMO, 150 – 600 Mb/s']]),
        M('¿Qué estándar requiere tecnología MIMO (múltiples antenas)?', ['802.11n', '802.11b', '802.11a', '802.11g']),
        M('¿Qué estándar NO es interoperable con 802.11b ni 802.11g?', ['802.11a', '802.11n', '802.11ac', '802.11ax']),
        M('¿Cuál es el estándar llamado High-Efficiency Wireless (HEW)?', ['802.11ax', '802.11ac', '802.11n', '802.11g']),
        T('Radiofrecuencias', 'Dos bandas: 2,4 y 5 GHz 📻',
          `Todos los dispositivos inalámbricos funcionan en el espectro electromagnético. Las WLAN funcionan en las bandas de <b>2,4 GHz</b> y <b>5 GHz</b>:
          <ul><li><b>2,4 GHz (UHF)</b>: 802.11 <b>b / g / n / ax</b></li><li><b>5 GHz (SHF)</b>: 802.11 <b>a / n / ac / ax</b></li></ul>`),
        M('¿En qué banda trabaja 802.11ac?', ['5 GHz', '2,4 GHz', 'Ambas, 2,4 y 5 GHz', '900 MHz']),
        M('La banda de 2,4 GHz se clasifica como…', ['UHF', 'SHF', 'VHF', 'HF']),
        TF('802.11g es compatible con versiones anteriores de 802.11b.', true),
        M('¿Hasta cuántas antenas admite 802.11ac?', ['Ocho', 'Dos', 'Cuatro', 'Una']),
        M('¿Qué estándar tiene mayor alcance y mejor penetración en edificios que 802.11a?', ['802.11b', '802.11ac', '802.11ax', '802.11'])
      ]
    },
    {
      id: 'u4l6', title: 'Dispositivos, modos y trama 802.11', icon: '📡',
      steps: [
        T('Dispositivos y antenas', 'Lo que necesita una WLAN 🧰',
          `En general, una LAN inalámbrica (WLAN) requiere:
          <ul><li><b>Punto de Acceso Inalámbrico (AP)</b>: <b>concentra</b> las señales inalámbricas de los usuarios y se conecta a la infraestructura de red de <b>cobre</b> existente.</li>
          <li><b>Adaptadores NIC inalámbricos</b>: brindan capacidad de comunicación inalámbrica a los hosts.</li></ul>
          <b>Antenas</b>: <b>omnidireccionales</b> (irradian en todas direcciones) y <b>direccionales</b> (enfocan la señal en una dirección).`),
        M('¿Qué dispositivo concentra las señales inalámbricas y se conecta a la red cableada?', ['Punto de acceso (AP)', 'NIC inalámbrica', 'Módem', 'Repetidor de fibra']),
        T('Modos de topología 802.11', 'Tres formas de conectarse 🔗',
          `<ul><li><b>Modo ad hoc</b>: conecta clientes de <b>igual a igual sin un AP</b>.</li>
          <li><b>Modo de infraestructura</b>: conecta clientes a la red <b>utilizando un AP</b>.</li>
          <li><b>Tethering</b>: variación de ad hoc en la que un <b>smartphone o tableta</b> con datos móviles crea un <b>punto de acceso personal</b>.</li></ul>`),
        P('Une cada modo con su descripción', [
          ['Ad hoc', 'Igual a igual, sin AP'],
          ['Infraestructura', 'Clientes conectados a través de un AP'],
          ['Tethering', 'El teléfono comparte sus datos móviles'],
          ['AP', 'Punto de acceso']]),
        M('Compartes los datos de tu celular con tu laptop. ¿Qué modo es?', ['Tethering', 'Infraestructura', 'Token Ring', 'CSMA/CD']),
        T('Estructura de la trama 802.11', 'Como Ethernet, pero con más campos ➕',
          `Formato: <b>Header</b> (Frame Control, Duration, Address 1, 2, 3, Sequence Control, Address 4) + <b>Payload</b> + <b>FCS</b>.
          <ul><li><b>Campo de control</b>: información sobre cómo interpretar la trama.</li>
          <li><b>Duración</b>: tiempo que estará <b>ocupado el canal</b> (transmisión de la trama + recepción de la confirmación).</li>
          <li><b>Direcciones</b>: receptor y transmisor Wi-Fi + hosts de origen y destino del mensaje (<b>4 direcciones</b>).</li>
          <li><b>Control de secuencia</b>: numeración de fragmentos y tramas.</li>
          <li><b>Datos</b>: mensaje del nivel superior.</li><li><b>FCS</b>: control de errores de la trama.</li></ul>`, 'wififrame'),
        M('¿Cuántos campos de dirección tiene la trama 802.11?', ['4', '2', '1', '6']),
        M('En la trama 802.11, el campo Duración indica…', ['El tiempo que el canal estará ocupado', 'El tiempo de vida del paquete (TTL)', 'La hora de envío', 'Cuántas antenas hay']),
        P('Une cada campo de la trama 802.11 con su función', [
          ['Frame Control', 'Cómo interpretar la trama'],
          ['Sequence Control', 'Numeración de fragmentos y tramas'],
          ['Payload', 'Mensaje del nivel superior'],
          ['FCS', 'Control de errores']]),
        TF('En modo ad hoc los clientes necesitan un AP para comunicarse.', false, null, 'Ad hoc es de igual a igual, SIN AP. El que usa AP es el modo infraestructura.')
      ]
    }
  ]
});

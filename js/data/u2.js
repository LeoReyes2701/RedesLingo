/* UNIDAD 2 — Clase 2 (parte 1): Arquitectura de protocolos, Modelo OSI y TCP/IP */
unit({
  id: 'u2',
  kicker: 'Unidad 2 · Clase 2',
  title: 'Modelo OSI y TCP/IP',
  desc: 'Modelo en capas, protocolos e interfaces, las 7 capas OSI, encapsulación y TCP/IP.',
  color: '#CE82FF', dark: '#A568CC',
  lessons: [
    {
      id: 'u2l1', title: 'El modelo en capas', icon: '🧅',
      steps: [
        T('¿Por qué usar capas?', 'Dividir para vencer 🧩',
          `Ventajas de un <b>modelo de referencia en capas</b>:
          <ul><li>Reduce la <b>complejidad</b></li><li><b>Estandariza</b> interfaces</li><li>Ingeniería <b>modular</b></li>
          <li>Asegura la <b>interoperabilidad</b></li><li><b>Acelera</b> la evolución</li><li><b>Simplifica</b> el aprendizaje</li></ul>`),
        M('¿Cuál NO es una ventaja de un modelo en capas?', ['Aumenta la complejidad', 'Estandariza interfaces', 'Asegura la interoperabilidad', 'Simplifica el aprendizaje']),
        T('Los dos artistas', 'El ejemplo favorito de la profe 🎨',
          `Dos artistas, uno en <b>Moscú</b> y otro en <b>Valencia</b>, conversan sobre pintura por vía <b>telegráfica</b>. Tienen traductores (ruso→inglés y valenciano→inglés) que pasan el texto en inglés a los <b>telegrafistas</b>, que lo transmiten por el telégrafo en <b>código Morse</b>.
          <div class="tw"><table class="tbl"><tr><th>Capa</th><th>Quién</th><th>"Idioma"</th></tr>
          <tr><td>4</td><td>Artista</td><td>Pintura</td></tr><tr><td>3</td><td>Traductor</td><td>Inglés</td></tr>
          <tr><td>2</td><td>Telegrafista</td><td>Morse</td></tr><tr><td>1</td><td>Telégrafo</td><td>Impulsos eléctricos</td></tr></table></div>
          Entre capas iguales hay comunicación <b>virtual</b>; la comunicación <b>real</b> solo ocurre abajo, por el telégrafo.`),
        O('Ordena las capas del ejemplo de la más alta (4) a la más baja (1)', ['Artista', 'Traductor', 'Telegrafista', 'Telégrafo']),
        M('En el ejemplo, ¿entre quiénes ocurre la comunicación REAL?', ['Entre los telégrafos (capa 1)', 'Entre los artistas', 'Entre los traductores', 'Entre Moscú y París']),
        P('Une cada capa del ejemplo con su "idioma"', [
          ['Artistas', 'Pintura'], ['Traductores', 'Inglés'], ['Telegrafistas', 'Código Morse'], ['Telégrafos', 'Impulsos eléctricos']]),
        TF('Los artistas se comunican de forma virtual: sienten que hablan directo, pero el mensaje baja por las capas.', true)
      ]
    },
    {
      id: 'u2l2', title: 'Protocolos e interfaces', icon: '🤝',
      steps: [
        T('Protocolo vs interfaz', 'Dos conceptos clave, no los confundas ⚠️',
          `<ul><li><b>Protocolo</b>: el lenguaje utilizado <b>dentro de cada capa</b> para que las capas <b>equivalentes</b> se entiendan. Ej: los traductores hablan <b>inglés</b>; los telegrafistas, <b>Morse</b>.</li>
          <li><b>Interfaz</b>: cómo se comunican <b>capas adyacentes</b> del mismo sistema. Ej: el traductor le entrega <b>texto escrito</b> al telegrafista; el telegrafista usa el <b>manipulador</b> del telégrafo.</li></ul>`),
        M('En el ejemplo, el inglés entre los traductores es un…', ['Protocolo', 'Interfaz', 'Medio', 'Host']),
        M('El texto escrito que el traductor le entrega al telegrafista es una…', ['Interfaz', 'Protocolo', 'Trama', 'Topología']),
        T('Principios del modelo de capas', 'Se resume en dos reglas 📏',
          `<ul><li>La comunicación <b>entre capas</b> (adyacentes) se realiza mediante una <b>interfaz</b>.</li>
          <li>Cada capa se comunica con la <b>capa equivalente</b> en el otro sistema utilizando un <b>protocolo</b> característico de esa capa.</li></ul>`),
        TF('Cada capa se comunica con su capa equivalente en el otro sistema usando un protocolo.', true),
        T('Comunicación indirecta', '¡Se dañó el telégrafo! 😱',
          `Se estropea el telégrafo Moscú–Valencia. Nueva ruta:
          <ul><li><b>Moscú → Copenhague</b>: telégrafo por cable</li><li><b>Copenhague → París</b>: radiotelégrafo (<b>ondas de radio</b>)</li><li><b>París → Valencia</b>: telégrafo por cable</li></ul>
          En Copenhague y París solo trabajan las <b>capas inferiores</b> (telegrafista + telégrafo). Los artistas y traductores <b>no se enteran</b> del cambio: ¡esa es la ventaja de las capas!`),
        M('En la comunicación indirecta, ¿qué capas participan en Copenhague y París?', ['Solo telegrafista y telégrafo (capas inferiores)', 'Las cuatro capas', 'Solo los artistas', 'Solo los traductores']),
        M('Entre Copenhague y París el medio fue…', ['Ondas de radio (radiotelégrafo)', 'Fibra óptica', 'Telégrafo por cable', 'Bluetooth']),
        P('Une cada concepto con su definición', [
          ['Protocolo', 'Lenguaje entre capas equivalentes'],
          ['Interfaz', 'Comunicación entre capas adyacentes'],
          ['Comunicación virtual', 'Entre capas pares de distintos sistemas'],
          ['Comunicación real', 'Por el medio físico']])
      ]
    },
    {
      id: 'u2l3', title: 'El modelo OSI', icon: '🏛️',
      steps: [
        T('Modelo de referencia OSI', 'El modelo más famoso de todos 🏆',
          `Todas las arquitecturas de red se describen con un modelo de capas. El más conocido es el <b>Modelo de Referencia OSI</b> (<i>Open Systems Interconnection</i>) de la <b>ISO</b> (<i>International Standarization Organization</i>), que tiene <b>7 capas</b>.<br><br>
          Dentro de los modelos están los <b>protocolos</b>. El conjunto de protocolos que interoperan en todos los niveles de una arquitectura es la <b>pila de protocolos</b> (<i>protocol stack</i>). Ej: OSI, SNA, TCP/IP.`, 'osi'),
        M('¿Cuántas capas tiene el modelo OSI?', ['7', '4', '5', '8']),
        M('¿Qué organización creó el modelo OSI?', ['ISO', 'IEEE', 'IETF', 'UIT']),
        T('Las 7 capas en orden', 'Truco para memorizarlas 🧠',
          `De arriba (7) hacia abajo (1):<br><b>7 Aplicación · 6 Presentación · 5 Sesión · 4 Transporte · 3 Red · 2 Enlace de datos · 1 Física</b><br><br>
          🧠 De abajo hacia arriba (F-E-R-T-S-P-A): "<b>F</b>ernando <b>E</b>s <b>R</b>ealmente <b>T</b>an <b>S</b>impático <b>P</b>ara <b>A</b>prender".`, 'osi'),
        O('Ordena las capas OSI de la 7 (arriba) a la 1 (abajo)', ['Aplicación', 'Presentación', 'Sesión', 'Transporte', 'Red', 'Enlace de datos', 'Física']),
        M('¿Qué número de capa es Transporte?', ['4', '3', '5', '2']),
        M('¿Cuál es la capa 3 del modelo OSI?', ['Red', 'Transporte', 'Enlace de datos', 'Sesión']),
        TF('La pila de protocolos (protocol stack) es el conjunto de protocolos que interoperan en todos los niveles de una arquitectura.', true),
        W('¿Qué significa OSI? (en inglés)', ['open systems interconnection', 'open system interconnection'], 'Open S… I…'),
        P('Une cada número con su capa', [['Capa 1', 'Física'], ['Capa 2', 'Enlace de datos'], ['Capa 5', 'Sesión'], ['Capa 6', 'Presentación']])
      ]
    },
    {
      id: 'u2l4', title: 'Capas 1, 2 y 3', icon: '🔧',
      steps: [
        T('Capa 1 · Física', 'Aquí todo son bits y señales ⚡',
          `<b>Transmisión binaria</b>: acepta un "grupo" de <b>bits</b> y los transporta a través de un medio físico (un enlace).
          <ul><li>Define las características <b>mecánicas, eléctricas y funcionales</b> para establecer, mantener, repetir, amplificar y desactivar conexiones físicas entre nodos.</li>
          <li>Especifica: <b>niveles de voltaje</b>, sincronización de cambios de voltaje, frecuencia de transmisión, velocidades de datos, <b>distancias de los cables</b>, <b>conectores físicos</b>, etc.</li></ul>`),
        M('¿Qué capa especifica niveles de voltaje, conectores y distancias de cables?', ['Física', 'Enlace de datos', 'Red', 'Transporte']),
        T('Capa 2 · Enlace de datos', 'Tramas y direcciones físicas 🧱',
          `<b>Acceso a los medios.</b> Inicia, mantiene y libera los enlaces de datos <b>entre dos nodos</b>. Hace transmisión <b>confiable (sin errores)</b> sobre un enlace físico.
          <ul><li>Define la <b>dirección física</b> de los nodos.</li><li>Construye los <b>frames (tramas)</b>.</li>
          <li>Se ocupa del orden de llegada de las tramas, notificación de errores físicos, reglas de uso del medio y <b>control de flujo</b> en el medio.</li>
          <li>Es diferente según la <b>topología</b> y el <b>medio</b> utilizado.</li></ul>`),
        M('¿Qué capa construye las tramas (frames) y define la dirección física?', ['Enlace de datos', 'Red', 'Física', 'Sesión']),
        T('Capa 3 · Red', 'Direcciones lógicas y rutas 🗺️',
          `<b>Direccionamiento y rutas.</b> Proporciona conectividad y <b>selección de ruta</b> entre sistemas (dominio de enrutamiento).
          <ul><li>Entrega los <b>paquetes</b> a la red correcta y al nodo correcto, buscando el <b>mejor camino</b>.</li>
          <li>Evita que las capas superiores se preocupen por cómo llegan los paquetes.</li>
          <li>Define la <b>dirección lógica</b> de los nodos.</li>
          <li><b>Enrutamiento</b>: ¿cuál es el mejor camino para llegar a la red destino?</li>
          <li><b>Direccionamiento</b>: ¿cuál es el nodo destino?</li></ul>`),
        M('¿Qué capa define la dirección lógica de los nodos y hace el enrutamiento?', ['Red', 'Enlace de datos', 'Transporte', 'Aplicación']),
        P('Une cada capa con su función', [
          ['Física', 'Bits, voltajes y conectores'],
          ['Enlace de datos', 'Tramas y dirección física'],
          ['Red', 'Paquetes, dirección lógica y mejor ruta'],
          ['Enrutamiento', '¿Cuál es el mejor camino?']]),
        M('"¿Cuál es el nodo destino?" es la pregunta que responde el…', ['Direccionamiento', 'Enrutamiento', 'Control de flujo', 'Encapsulamiento']),
        TF('La capa física se encarga de seleccionar la mejor ruta entre redes.', false, null, 'La selección de ruta (enrutamiento) es tarea de la capa 3, Red.'),
        M('La dirección física se define en la capa ___ y la dirección lógica en la capa ___.', ['2 (Enlace) · 3 (Red)', '3 (Red) · 2 (Enlace)', '1 (Física) · 4 (Transporte)', '2 (Enlace) · 2 (Enlace)'])
      ]
    },
    {
      id: 'u2l5', title: 'Capas 4 a 7', icon: '📦',
      steps: [
        T('Capa 4 · Transporte', 'De extremo a extremo 🚚',
          `<b>Conexiones de extremo a extremo</b> entre hosts. Establece, mantiene y termina <b>circuitos virtuales</b>.
          <ul><li><b>Confiabilidad</b>: asegura la entrega; no deja que <b>falten ni sobren</b> partes (retransmite si es necesario).</li>
          <li><b>Segmenta</b> bloques grandes antes de transmitirlos y los <b>reensambla</b> en el destino.</li>
          <li>Hace <b>multiplexamiento</b> para las aplicaciones.</li>
          <li>Detección y recuperación de fallos, <b>control de flujo</b> y <b>control de congestión</b>.</li></ul>`),
        M('¿Qué capa segmenta los datos y los reensambla en el destino?', ['Transporte', 'Red', 'Sesión', 'Física']),
        T('Capa 5 · Sesión', 'Conversaciones entre aplicaciones 💬',
          `<b>Comunicación entre hosts.</b> Define cómo <b>iniciar, coordinar y terminar</b> las conversaciones entre aplicaciones (llamadas <b>sesiones</b>).
          <ul><li>Administra el intercambio de datos y <b>sincroniza el diálogo</b> entre las capas de presentación de cada sistema.</li>
          <li>Lleva control de qué flujos forman parte de la <b>misma sesión</b> y cuáles deben terminar correctamente.</li></ul>`),
        M('¿Qué capa inicia, coordina y termina las sesiones entre aplicaciones?', ['Sesión', 'Transporte', 'Presentación', 'Aplicación']),
        T('Capa 6 · Presentación', 'El "traductor" de formatos 🖼️',
          `<b>Representación de datos.</b> Define el <b>formato</b> de los datos que se intercambiarán y garantiza que sean <b>legibles</b> para el receptor.
          <ul><li>Si es necesario, transforma a un <b>formato común</b>.</li><li>Negocia la <b>sintaxis</b> de transferencia de datos para la capa de aplicación.</li>
          <li>Ej: formato <b>GIF, JPEG o PNG</b> para imágenes.</li></ul>`),
        M('Los formatos GIF, JPEG y PNG se asocian con la capa…', ['Presentación', 'Aplicación', 'Sesión', 'Enlace de datos']),
        T('Capa 7 · Aplicación', 'La más cercana a ti 🙋',
          `<b>Procesos de red a aplicaciones</b>: proporciona servicios de red a procesos de aplicaciones (ej. <b>correo electrónico</b>).
          <ul><li>Es la más <b>cercana al usuario</b> y el nivel más alto: <b>no ofrece servicios a otras capas</b>.</li>
          <li>Las <b>otras capas existen para prestarle servicios</b> a ella.</li>
          <li>Define la interfaz entre el software de comunicaciones y cualquier aplicación.</li></ul>`),
        TF('La capa de aplicación ofrece servicios a las demás capas del modelo OSI.', false, null, 'Es al revés: las otras capas existen para prestarle servicios a la capa de aplicación.'),
        P('Une cada capa con su función', [
          ['Transporte', 'Extremo a extremo, segmenta y reensambla'],
          ['Sesión', 'Inicia y termina conversaciones'],
          ['Presentación', 'Formato de datos (JPEG, PNG)'],
          ['Aplicación', 'Servicios de red al usuario (correo)']]),
        M('¿Qué capa hace control de flujo y de congestión de extremo a extremo?', ['Transporte', 'Presentación', 'Física', 'Sesión']),
        M('Tu programa de correo electrónico usa servicios de la capa…', ['Aplicación', 'Presentación', 'Red', 'Enlace de datos'])
      ]
    },
    {
      id: 'u2l6', title: 'Encapsulación', icon: '✉️',
      steps: [
        T('Unidades de información', 'Cada capa le pone su "sobre" ✉️',
          `Al bajar por las capas del nodo A, cada una agrega su <b>header</b> (encabezado):
          <ul><li>Capa 4 (Transporte) → <b>Mensaje</b> (puede contener encabezados de las capas 5, 6 y 7)</li>
          <li>Capa 3 (Red) → <b>Paquete</b></li><li>Capa 2 (Enlace) → <b>Frame (trama)</b></li><li>Capa 1 (Física) → <b>bits</b></li></ul>
          En el nodo B se hace el proceso inverso.`, 'encap'),
        P('Une cada capa con su unidad de información', [['Transporte', 'Mensaje'], ['Red', 'Paquete'], ['Enlace', 'Frame / trama'], ['Física', 'Bits']]),
        T('Header, trailer y payload', 'Vocabulario de examen 📚',
          `<ul><li><b>Header</b>: información de control que agregan los protocolos, generalmente al <b>inicio</b> del mensaje.</li>
          <li><b>Trailer</b>: información de control anexada al <b>final</b> del mensaje.</li>
          <li><b>Payload</b> (carga útil o cuerpo del mensaje): los datos entregados por el protocolo de la capa superior.</li>
          <li><b>Encapsulación</b>: "meter" el mensaje del nivel superior detrás de un header en el mensaje del nivel inferior.</li></ul>`),
        M('La información de control que se agrega al FINAL del mensaje se llama…', ['Trailer', 'Header', 'Payload', 'Demux key']),
        M('Los datos que vienen de la capa superior, dentro del mensaje, se llaman…', ['Payload (carga útil)', 'Header', 'Trailer', 'Token']),
        T('Multiplexamiento y demultiplexamiento', '¿A quién le entrego esto? 🤔',
          `En cada capa puede haber <b>varios protocolos</b>. Por eso el header incluye un identificador que indica a qué protocolo o servicio de la capa superior pertenece el payload: la <b>llave de multiplexación</b> (<i>demux key</i>).<br>
          Cuando el mensaje llega al destino, el protocolo <b>retira el header</b>, <b>mira la llave de multiplexación</b> y entrega (<b>demultiplexa</b>) el payload al protocolo o aplicación correctos de la capa superior.`),
        M('¿Para qué sirve la llave de multiplexación (demux key)?', ['Indicar a qué protocolo de la capa superior pertenece el payload', 'Cifrar los datos', 'Detectar colisiones', 'Asignar direcciones IP']),
        O('Ordena lo que hace el destino al recibir un mensaje', ['Retira el header', 'Mira la llave de multiplexación', 'Entrega el payload al protocolo correcto de la capa superior']),
        TF('Encapsular es meter el mensaje del nivel superior detrás de un header en el mensaje del nivel inferior.', true),
        W('¿Cómo se llama en inglés la llave de multiplexación?', ['demux key', 'demuxkey', 'demultiplexing key'], 'demu… key')
      ]
    },
    {
      id: 'u2l7', title: 'TCP/IP', icon: '🌍',
      steps: [
        T('¿Qué es TCP/IP?', 'El modelo que usa Internet 🌐',
          `"TCP/IP" es una <b>suite de protocolos</b> de datos. El nombre viene de dos de ellos: <b>TCP</b> (Transmission Control Protocol) e <b>IP</b> (Internet Protocol), pero hay muchos más.
          <ul><li>Lo presentaron <b>Stanford University</b> y <b>BBN</b> (Bold, Beranek and Newman) a comienzos de los <b>70</b> para una red de conmutación de paquetes: <b>ARPANet</b>.</li>
          <li>Hoy su arquitectura la define la <b>IETF</b> (Internet Engineering Task Force).</li>
          <li>La información se publica en documentos <b>RFC</b> (Request for Comments). Otros dos tipos: <b>MIL STD</b> (Military Standards) e <b>IEN</b> (Internet Engineering Notes).</li></ul>`),
        M('¿Qué significa TCP?', ['Transmission Control Protocol', 'Transfer Connection Protocol', 'Total Control Packet', 'Terminal Communication Protocol']),
        M('¿Qué organización define hoy la arquitectura TCP/IP?', ['IETF', 'ISO', 'IEEE', 'Wi-Fi Alliance']),
        M('¿En qué documentos se publica la información de los protocolos TCP/IP?', ['RFC (Request for Comments)', 'ISO 9001', 'IEEE 802', 'Manuales Cisco']),
        T('Capas y protocolos de TCP/IP', 'Según el gráfico de la clase 📊',
          `TCP/IP tiene <b>4 capas</b>: <b>Aplicación · Transporte · Internet · Acceso a la red</b>.
          <div class="tw"><table class="tbl"><tr><th>Capa</th><th>Protocolos (gráfico de clase)</th></tr>
          <tr><td><b>Aplicación</b></td><td>Ping, Telnet & Rlogin, FTP, SMTP, SNMP, TraceRoute, DNS, TFTP, BOOTP, FINS…</td></tr>
          <tr><td><b>Transporte</b></td><td><b>TCP</b>, <b>UDP</b> (e ICMP en el gráfico)</td></tr>
          <tr><td><b>Red / Internet</b></td><td><b>IP</b></td></tr>
          <tr><td><b>Enlace de datos</b></td><td>LLC, HDLC, PPP, Ethernet, 802.3, X.25, Token Ring, Frame Relay, ATM, SMDS</td></tr>
          <tr><td><b>Físico</b></td><td>Fibra óptica, UTP, coaxial, microondas, satélite, STP</td></tr></table></div>`, 'tcpip'),
        O('Ordena las capas de TCP/IP de arriba a abajo', ['Aplicación', 'Transporte', 'Internet', 'Acceso a la red']),
        P('Une cada protocolo con su capa', [['FTP', 'Aplicación'], ['UDP', 'Transporte'], ['IP', 'Internet / Red'], ['Ethernet', 'Enlace de datos']]),
        M('¿En qué capa están TCP y UDP?', ['Transporte', 'Aplicación', 'Internet', 'Acceso a la red']),
        M('UTP, coaxial y fibra óptica pertenecen a la capa…', ['Física', 'Enlace de datos', 'Internet', 'Transporte']),
        TF('TCP/IP se presentó a comienzos de los años 70 para ARPANet.', true)
      ]
    },
    {
      id: 'u2l8', title: 'OSI vs TCP/IP', icon: '⚖️',
      steps: [
        T('Comparación OSI vs TCP/IP', 'Cómo encajan los dos modelos 🧩',
          `<ul><li>OSI <b>Aplicación + Presentación + Sesión</b> = <b>Aplicación</b> en TCP/IP.</li>
          <li>OSI <b>Transporte</b> = <b>Transporte</b>.</li><li>OSI <b>Red</b> = <b>Internet</b>.</li>
          <li>OSI <b>Enlace + Física</b> = <b>Acceso a la red</b>.</li></ul>
          En OSI: capas 5-7 = <b>capas de aplicación</b>; capas 1-4 = <b>capas de flujo de datos</b>.`, 'osivstcp'),
        P('Une las capas OSI con su equivalente TCP/IP', [
          ['Aplicación, Presentación y Sesión', 'Aplicación (TCP/IP)'],
          ['Transporte (OSI)', 'Transporte (TCP/IP)'],
          ['Red (OSI)', 'Internet (TCP/IP)'],
          ['Enlace + Física (OSI)', 'Acceso a la red (TCP/IP)']]),
        M('La capa Internet de TCP/IP equivale a la capa OSI de…', ['Red', 'Transporte', 'Enlace de datos', 'Sesión']),
        M('En OSI, las capas de Transporte, Red, Enlace y Física se agrupan como…', ['Capas de flujo de datos', 'Capas de aplicación', 'Capas de presentación', 'Capas de Internet']),
        T('Ejemplo: acceso a un servidor web', 'Así viaja tu página web 🕸️',
          `Un cliente accede a un servidor web por una conexión remota:
          <ul><li><b>HTTP</b> (aplicación) sobre <b>TCP</b> (transporte) sobre <b>IP</b> (red).</li>
          <li>Los routers del camino solo usan <b>Red + Enlace + Física</b>.</li>
          <li>El enlace cambia en cada tramo: <b>IEEE 802.3</b> (LAN Ethernet), <b>PPP</b> (Point to Point Protocol, en la WAN), <b>IEEE 802.5</b> (LAN Token Ring).</li></ul>`),
        M('En el ejemplo del servidor web, ¿qué protocolo de aplicación se usa?', ['HTTP', 'PPP', 'IEEE 802.5', 'ARP']),
        P('Une cada protocolo con lo que es', [['IEEE 802.3', 'LAN Ethernet'], ['IEEE 802.5', 'LAN Token Ring'], ['PPP', 'Point to Point Protocol (WAN)'], ['HTTP', 'Protocolo de aplicación web']]),
        TF('Los routers intermedios necesitan las 7 capas para reenviar el paquete.', false, null, 'Los routers solo trabajan hasta la capa de Red (Red, Enlace y Física).'),
        M('¿Cuántas capas tiene el modelo TCP/IP según la clase?', ['4', '7', '5', '3'])
      ]
    }
  ]
});

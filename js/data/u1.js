/* UNIDAD 1 — Clase 1: Introducción a las redes de comunicación de datos */
unit({
  id: 'u1',
  kicker: 'Unidad 1 · Clase 1',
  title: 'Introducción a las redes',
  desc: 'Hosts, dispositivos, medios, tipos de redes, topologías, acceso al medio y dúplex.',
  color: '#58CC02', dark: '#58A700',
  lessons: [
    {
      id: 'u1l1', title: '¿Qué es una red?', icon: '🌐',
      steps: [
        T('¿Qué es una red?', '¡Hola! Soy Bit 👋 Te voy a enseñar todo lo de Redes para tu examen.',
          `Una <b>red</b> es un conjunto de computadores o de equipos informáticos <b>conectados entre sí</b> que pueden <b>intercambiar información</b>.`),
        TF('Una red es un conjunto de equipos conectados entre sí que pueden intercambiar información.', true),
        T('Hosts: servidores y clientes', 'Cada equipo de la red tiene un nombre especial…',
          `Cada computadora en una red se llama <b>host</b> o <b>dispositivo final</b>. Hay dos roles:
          <ul><li><b>Servidores</b>: computadoras que <b>proporcionan información</b> a los dispositivos finales (servidores de correo, web, de archivos).</li>
          <li><b>Clientes</b>: equipos que <b>envían solicitudes</b> a los servidores para recuperar información (una página web, un correo…).</li></ul>`),
        M('¿Cómo se llama cada computadora conectada a una red?', ['Host o dispositivo final', 'Router', 'Switch', 'Topología'], 'Empieza por H…'),
        M('Un equipo que envía solicitudes a un servidor para recuperar información es un…', ['Cliente', 'Servidor', 'Firewall', 'Medio de red'], 'El que pide es el…'),
        T('Tipos de servidor', 'Estos 3 servidores salen en la clase 👇',
          `<div class="tw"><table class="tbl"><tr><th>Servidor</th><th>Descripción</th></tr>
          <tr><td><b>Correo electrónico</b></td><td>Ejecuta software de servidor de correo. Los clientes usan <b>software cliente</b> para acceder al correo.</td></tr>
          <tr><td><b>Web</b></td><td>Ejecuta software de servidor web. Los clientes usan el <b>navegador</b> para acceder a las páginas web.</td></tr>
          <tr><td><b>Archivo</b></td><td><b>Almacena</b> archivos corporativos y de usuario. Los clientes acceden a estos archivos.</td></tr></table></div>`),
        P('Une cada elemento con su descripción', [
          ['Servidor web', 'Los clientes usan un navegador'],
          ['Servidor de correo', 'Los clientes usan software cliente de correo'],
          ['Servidor de archivos', 'Almacena archivos corporativos y de usuario'],
          ['Cliente', 'Envía solicitudes al servidor']]),
        M('¿Qué software usa un cliente para acceder a un servidor web?', ['El navegador', 'Un servidor de correo', 'Un switch', 'El cable de consola']),
        TF('Los servidores envían solicitudes a los clientes para recuperar información.', false, 'Piensa quién pide y quién da.', 'Es al revés: los clientes solicitan y los servidores proporcionan la información.'),
        M('Pedir una página web a un servidor web es un ejemplo de…', ['Un cliente solicitando información', 'Un servidor solicitando a un cliente', 'Una topología en anillo', 'Un medio inalámbrico'])
      ]
    },
    {
      id: 'u1l2', title: 'Dispositivos y medios', icon: '🔌',
      steps: [
        T('Dispositivos finales', 'Los datos empiezan y terminan en un dispositivo final.',
          `Un <b>terminal</b> (dispositivo final) es el punto donde un mensaje <b>se origina o se recibe</b>.<br>Los datos se originan con un dispositivo final, <b>fluyen por la red</b> y llegan a otro dispositivo final. Los mensajes pueden tomar <b>rutas alternativas</b> por la red.`),
        M('El punto donde un mensaje se origina o se recibe es un…', ['Dispositivo final (terminal)', 'Dispositivo intermedio', 'Medio de red', 'Protocolo']),
        T('Dispositivos intermedios', 'Estos son los que conectan todo 🔀',
          `Un <b>dispositivo intermediario</b> interconecta dispositivos finales. Ejemplos: <b>switches, puntos de acceso inalámbrico, routers y firewalls</b>.<br>Gestionan los datos mientras fluyen por la red:
          <ul><li>Volver a <b>generar y transmitir</b> las señales de datos.</li>
          <li>Mantener información sobre <b>qué vías existen</b> en la red.</li>
          <li><b>Notificar</b> a otros dispositivos los errores y las fallas de comunicación.</li></ul>`),
        M('¿Cuál de estos NO es un dispositivo intermedio?', ['Un servidor web', 'Un switch', 'Un router', 'Un firewall'], 'Los intermedios interconectan; los finales originan o reciben.'),
        M('¿Cuál es una función de un dispositivo intermedio?', ['Regenerar y transmitir las señales de datos', 'Originar el mensaje del usuario', 'Mostrar la página web al usuario', 'Almacenar los archivos del usuario']),
        TF('Un firewall es un ejemplo de dispositivo intermedio.', true),
        T('Medios de red', 'El mensaje necesita un camino físico (o el aire) para viajar.',
          `El <b>medio</b> es lo que permite que un mensaje viaje desde el origen hacia el destino.
          <div class="tw"><table class="tbl"><tr><th>Tipo de medio</th><th>Utiliza</th></tr>
          <tr><td>Alambres de <b>metal</b> dentro de cables</td><td><b>Impulsos eléctricos</b></td></tr>
          <tr><td>Fibras de vidrio o plástico (<b>fibra óptica</b>)</td><td><b>Pulsos de luz</b></td></tr>
          <tr><td>Transmisión <b>inalámbrica</b></td><td><b>Modulación de frecuencias</b> específicas de ondas electromagnéticas</td></tr></table></div>`),
        P('Une cada medio con lo que utiliza', [
          ['Cable de cobre', 'Impulsos eléctricos'],
          ['Fibra óptica', 'Pulsos de luz'],
          ['Inalámbrico', 'Modulación de ondas electromagnéticas']]),
        M('La fibra óptica transmite usando…', ['Pulsos de luz', 'Impulsos eléctricos', 'Ondas de sonido', 'Corriente alterna']),
        P('Clasifica cada elemento', [
          ['Teléfono IP', 'Dispositivo final'],
          ['Router', 'Dispositivo intermedio'],
          ['Cable de cobre', 'Medio guiado (impulsos eléctricos)'],
          ['Wi-Fi', 'Medio inalámbrico']])
      ]
    },
    {
      id: 'u1l3', title: 'Representaciones de red', icon: '🗺️',
      steps: [
        T('Diagramas de topología', 'Las redes se dibujan con símbolos 🖊️',
          `Los diagramas de red, con frecuencia llamados <b>diagramas de topología</b>, usan <b>símbolos</b> para representar los dispositivos de la red. Términos importantes:
          <ul><li><b>NIC</b> (Tarjeta de interfaz de red): conecta físicamente el dispositivo a la red.</li>
          <li><b>Puerto físico</b>: conector o toma donde se conecta el medio.</li>
          <li><b>Interfaz</b>: puertos de un dispositivo que se conectan a redes.</li></ul>
          💡 A menudo, los términos <b>puerto</b> e <b>interfaz</b> se usan <b>indistintamente</b>.`),
        M('¿Qué significa NIC?', ['Tarjeta de interfaz de red', 'Nodo de interconexión central', 'Red de área personal', 'Número de identificación de conexión']),
        TF('Los términos puerto e interfaz a menudo se usan indistintamente.', true),
        T('Topología física vs lógica', 'Ojo con esta diferencia, es típica de examen 👀',
          `<ul><li><b>Topología física</b>: ilustra la <b>ubicación física</b> de los dispositivos intermedios y la <b>instalación de cables</b>.</li>
          <li><b>Topología lógica</b>: ilustra <b>dispositivos, puertos</b> y el <b>esquema de direccionamiento</b> de la red.</li></ul>`),
        M('Un diagrama que muestra en qué salón está cada switch y por dónde pasan los cables es una topología…', ['Física', 'Lógica', 'En malla', 'Virtual']),
        M('Un diagrama que muestra las direcciones IP y los puertos de cada dispositivo es una topología…', ['Lógica', 'Física', 'En bus', 'De anillo']),
        P('Une cada término con su significado', [
          ['Topología física', 'Ubicación de dispositivos y cables'],
          ['Topología lógica', 'Dispositivos, puertos y direccionamiento'],
          ['NIC', 'Tarjeta de interfaz de red'],
          ['Diagrama de topología', 'Usa símbolos para representar dispositivos']]),
        TF('La topología lógica muestra la instalación física de los cables.', false, null, 'Eso lo muestra la topología física. La lógica muestra dispositivos, puertos y direccionamiento.')
      ]
    },
    {
      id: 'u1l4', title: 'Tipos de redes', icon: '🏙️',
      steps: [
        T('¿En qué varían las redes?', 'No todas las redes son iguales…',
          `Las infraestructuras de red pueden variar en gran medida en:
          <ul><li>El <b>tamaño del área</b> que abarcan.</li><li>La <b>cantidad de usuarios</b> conectados.</li>
          <li>La <b>cantidad y tipos de servicios</b> disponibles.</li><li>El <b>área de responsabilidad</b>.</li></ul>
          Tipos: <b>PAN, LAN, MAN, WAN</b> y <b>Red inalámbrica</b>.`),
        M('¿Cuál NO es un criterio en el que varían las infraestructuras de red?', ['El color de los cables', 'El tamaño del área que abarcan', 'La cantidad de usuarios conectados', 'El área de responsabilidad']),
        T('PAN y LAN', 'De lo más pequeño a lo más grande 📏',
          `<b>PAN</b> (<i>Personal Area Network</i>, red de área personal): interconexión de dispositivos en el <b>entorno del usuario</b>. Ej: móvil + manos libres. Medio: <b>infrarrojo o Bluetooth</b>.<br><br>
          <b>LAN</b> (<i>Local Area Network</i>, red de área local): limitada a un área <b>relativamente pequeña</b>: un cuarto, un solo edificio, una nave o un <b>avión</b>.`),
        M('Tu teléfono conectado a unos audífonos Bluetooth forma una…', ['PAN', 'LAN', 'MAN', 'WAN']),
        M('La red dentro de un avión es un ejemplo de…', ['LAN', 'WAN', 'MAN', 'PAN'], 'Es un área relativamente pequeña, como un edificio.'),
        T('MAN y WAN', 'Ahora las redes grandes 🌎',
          `<b>MAN</b> (<i>Metropolitan Area Network</i>): red de <b>alta velocidad (banda ancha)</b> que cubre un área más extensa que un campus, pero aun así limitada. Ej: red que interconecta los <b>edificios públicos de un municipio</b> por fibra óptica.<br><br>
          <b>WAN</b> (<i>Wide Area Network</i>): se extiende sobre un área geográfica <b>extensa</b>, dando servicio a un <b>país o un continente</b>. Ej: <b>Internet</b>.`),
        M('Internet es el ejemplo clásico de…', ['WAN', 'MAN', 'LAN', 'PAN']),
        M('Una red de fibra que une los edificios públicos de un municipio es una…', ['MAN', 'LAN', 'PAN', 'WAN']),
        O('Ordena de MENOR a MAYOR cobertura', ['PAN', 'LAN', 'MAN', 'WAN']),
        P('Une cada red con su alcance', [
          ['PAN', 'Bluetooth o infrarrojo, entorno del usuario'],
          ['LAN', 'Un cuarto, un edificio o un avión'],
          ['MAN', 'Edificios de un municipio'],
          ['WAN', 'Un país o un continente']]),
        W('Escribe las siglas de la red de área metropolitana', 'MAN', 'Metropolitan Area Network')
      ]
    },
    {
      id: 'u1l5', title: 'LAN vs WAN e inalámbricas', icon: '📶',
      steps: [
        T('LAN vs WAN', 'Esta tabla es oro para el examen 🥇',
          `<div class="tw"><table class="tbl"><tr><th>LAN</th><th>WAN</th></tr>
          <tr><td>Interconecta <b>dispositivos finales</b> en un área limitada.</td><td>Interconecta <b>LAN</b> en amplias áreas geográficas.</td></tr>
          <tr><td>Administrada por <b>una sola organización o individuo</b>.</td><td>Generalmente administrada por <b>uno o más proveedores de servicios</b>.</td></tr>
          <tr><td>Ancho de banda de <b>alta velocidad</b> a dispositivos internos.</td><td>Por lo general, enlaces de <b>menor velocidad</b> entre las LAN.</td></tr></table></div>`),
        M('¿Quién administra generalmente una WAN?', ['Uno o más proveedores de servicios', 'Una sola persona', 'El usuario final', 'El switch de la oficina']),
        TF('Una WAN generalmente ofrece enlaces de mayor velocidad que una LAN.', false, null, 'La LAN da alta velocidad a sus dispositivos internos; la WAN suele tener enlaces de menor velocidad entre las LAN.'),
        M('Una WAN interconecta…', ['Varias LAN en amplias áreas geográficas', 'Dispositivos de un solo cuarto', 'Audífonos y teléfonos', 'Los puertos de un switch']),
        T('Redes inalámbricas', 'Varían según su alcance de cobertura 📡',
          `<div class="tw"><table class="tbl"><tr><th>Red</th><th>Alcance</th><th>Uso</th></tr>
          <tr><td><b>WPAN</b></td><td>Hasta <b>10 m</b></td><td>Conectar dispositivos de uso personal.</td></tr>
          <tr><td><b>WLAN</b></td><td>Hasta <b>100 m</b></td><td>Wi-Fi o Bluetooth; red de menor coste que la cableada.</td></tr>
          <tr><td><b>WMAN</b></td><td>Unos <b>50 km</b></td><td>Área metropolitana, edificios céntricos, zonas rurales o un campus.</td></tr>
          <tr><td><b>WWAN</b></td><td>La <b>mayor</b> cobertura</td><td>La usan las <b>empresas de telefonía móvil</b>.</td></tr></table></div>`),
        P('Une cada red inalámbrica con su alcance', [
          ['WPAN', 'Hasta 10 metros'], ['WLAN', 'Hasta 100 metros'],
          ['WMAN', 'Unos 50 km'], ['WWAN', 'Telefonía móvil, la mayor cobertura']]),
        M('¿Qué red inalámbrica usan las empresas de telefonía móvil?', ['WWAN', 'WLAN', 'WPAN', 'WMAN']),
        M('Una WLAN cubre distancias de hasta…', ['100 metros', '10 metros', '50 km', 'Todo un país']),
        W('¿Cuántos km cubre aproximadamente una WMAN? (solo el número)', '50', 'Es un número redondo entre 10 y 100.'),
        O('Ordena las redes inalámbricas de MENOR a MAYOR alcance', ['WPAN', 'WLAN', 'WMAN', 'WWAN'])
      ]
    },
    {
      id: 'u1l6', title: 'Topologías: estrella y bus', icon: '⭐',
      steps: [
        T('¿Qué es una topología?', 'La topología es la "forma" de la red.',
          `La <b>topología</b> se refiere a la <b>forma general de la red</b>. En clase vimos: <b>estrella, estrella extendida, bus, anillo, anillo doble, árbol (jerárquica) y malla</b>.`),
        T('Topología en estrella', 'La más usada en las LAN de hoy ⭐',
          `<ul><li>Tiene un <b>nodo central</b> desde el que se irradian todos los demás nodos, y <b>no permite otros enlaces</b>.</li>
          <li>Permite que todos los nodos se comuniquen de manera conveniente.</li>
          <li><b>Todo el flujo</b> de información pasa por el dispositivo central.</li>
          <li>⚠️ Si el <b>nodo central falla</b>, toda la red se desconecta.</li>
          <li>Según el tipo de dispositivo central, las <b>colisiones</b> pueden ser un problema.</li>
          <li>Ej. <b>ATM</b> (Asynchronous Transfer Mode): los datos no se propagan a todos los computadores; tasas de <b>100 Mbps o más</b>.</li></ul>`, 'star'),
        M('¿Qué topología es esta?', ['Estrella', 'Bus', 'Anillo', 'Malla'], null, null, 'star'),
        M('En una topología en estrella, ¿qué pasa si falla el nodo central?', ['Toda la red se desconecta', 'Nada, la red sigue igual', 'Solo falla un host', 'La red se convierte en anillo']),
        T('Estrella extendida', 'Una estrella… de estrellas ✨',
          `Igual que la estrella, pero <b>cada nodo que se conecta al nodo central es también el centro de otra estrella</b>.
          <ul><li>Ventaja: el <b>cableado es más corto</b> y limita la cantidad de dispositivos que se interconectan con cualquier nodo central.</li>
          <li>Es sumamente <b>jerárquica</b> y busca que la información se mantenga <b>local</b>.</li></ul>`, 'extstar'),
        M('¿Qué topología es esta?', ['Estrella extendida', 'Estrella simple', 'Bus', 'Anillo doble'], null, null, 'extstar'),
        T('Topología de bus', 'Todos colgados del mismo cable 🚌',
          `<ul><li>Todos sus nodos están conectados directamente a <b>un solo enlace</b>, sin otras conexiones entre nodos.</li>
          <li>Todos los dispositivos <b>ven todas las señales</b> de los demás.</li>
          <li>✅ El <b>fallo de una estación</b> no afecta a la red.</li>
          <li>❌ La <b>rotura del cable</b> hace que los hosts queden desconectados.</li>
          <li>Puede producir problemas de <b>tráfico y colisiones</b>.</li></ul>`, 'bus'),
        M('¿Qué topología es esta?', ['Bus', 'Anillo', 'Estrella', 'Árbol'], null, null, 'bus'),
        TF('En la topología de bus, si falla una estación, se cae toda la red.', false, 'Piensa: ¿qué es lo crítico, la estación o el cable?', 'El fallo de UNA estación no afecta a la red; lo que la tumba es la rotura del cable.'),
        M('En la topología de bus, ¿qué deja desconectados a los hosts?', ['La rotura del cable', 'El fallo de una estación', 'Que haya muchos usuarios', 'Usar fibra óptica']),
        P('Une cada topología con su característica', [
          ['Estrella', 'Si falla el nodo central, cae la red'],
          ['Estrella extendida', 'Cada nodo es centro de otra estrella'],
          ['Bus', 'Todos en un mismo enlace'],
          ['Topología', 'Forma general de la red']])
      ]
    },
    {
      id: 'u1l7', title: 'Anillo, árbol y malla', icon: '💍',
      steps: [
        T('Topología de anillo', 'La información da vueltas 🔄',
          `<ul><li>Es un <b>anillo cerrado</b> de nodos y enlaces: cada nodo está conectado solo con <b>dos nodos adyacentes</b>.</li>
          <li>Para que la información circule, cada nodo debe <b>transferirla al nodo adyacente</b>.</li>
          <li>Las LAN en anillo usan el mecanismo de acceso <b>Token Ring</b>.</li></ul>`, 'ring'),
        M('¿Qué topología es esta?', ['Anillo', 'Bus', 'Malla', 'Estrella'], null, null, 'ring'),
        T('Coordinación en Token Ring', 'Solo habla quien tiene el token 🎟️',
          `<ul><li>Usan un mensaje corto especial llamado <b>token</b> para coordinar el uso del anillo. <b>Solo existe un token</b> en la red en cada instante.</li>
          <li>Para enviar, un computador debe <b>esperar el arribo del token</b>. Luego transmite <b>exactamente una trama</b> y luego el token.</li>
          <li>El receptor hace una <b>copia de la trama</b> y permite que siga su recorrido.</li>
          <li>Si ningún computador tiene datos, el token <b>circula</b> alrededor del anillo.</li>
          <li>Para detectar errores, el transmisor <b>compara los datos enviados con los recibidos</b>.</li></ul>`),
        M('En Token Ring, ¿qué debe hacer un computador antes de enviar datos?', ['Esperar a que le llegue el token', 'Detectar colisiones', 'Enviar un broadcast ARP', 'Pedir permiso al servidor DHCP']),
        TF('En una red Token Ring pueden existir varios tokens al mismo tiempo.', false, null, 'Solo existe UN token en la red en cada instante.'),
        M('Al recibir el token, ¿cuántas tramas transmite un computador antes de liberarlo?', ['Exactamente una', 'Todas las que tenga', 'Cuatro', 'Ninguna']),
        M('En Token Ring, ¿cómo detecta errores el transmisor?', ['Compara los datos enviados con los recibidos', 'Con CSMA/CD', 'Haciendo ping', 'Usando la máscara de subred']),
        T('Anillo doble y FDDI', 'Un anillo de repuesto por si acaso 🛟',
          `<ul><li>Dos anillos <b>concéntricos</b>; cada uno se conecta solo con el anillo vecino adyacente. Los dos anillos <b>no están conectados</b>.</li>
          <li>Como el anillo simple pero con un anillo <b>redundante</b>; se usa <b>solo uno a la vez</b>. Ej: red <b>Controller Link</b> de fibra óptica.</li>
          <li><b>FDDI</b> (Fiber Distributed Data Interconnect): <b>autorreparable</b> gracias a la redundancia. Sus dos anillos tienen <b>distinto sentido</b> de circulación. Si hay una falla, las estaciones adyacentes se reconfiguran y usan el otro anillo para saltarse el sector con falla.</li></ul>`, 'dualring'),
        M('¿Qué característica tiene FDDI?', ['Es autorreparable gracias a su anillo redundante', 'Usa un único cable en bus', 'No usa fibra óptica', 'Cada nodo se conecta a todos']),
        T('Topología en árbol', 'Como un árbol genealógico 🌳',
          `<ul><li>A diferencia de la estrella, <b>no tiene un nodo central</b>: tiene un <b>nodo de enlace troncal</b> desde el que se ramifican los demás.</li>
          <li>Tipos: <b>Árbol binario</b> (cada nodo se divide en dos enlaces) y <b>Árbol backbone</b> (un tronco backbone con nodos ramificados).</li>
          <li>El flujo de información es <b>jerárquico</b>.</li></ul>`, 'tree'),
        M('¿Qué topología es esta?', ['Árbol', 'Malla', 'Anillo doble', 'Bus'], null, null, 'tree'),
        T('Topología en malla', 'Todos con todos 🕸️',
          `<ul><li>Cada nodo está conectado a <b>todos los nodos</b>. Los mensajes pueden ir por <b>diferentes caminos</b>.</li>
          <li>✅ Por la <b>redundancia</b> de enlaces hay caminos alternativos → aumenta la <b>confiabilidad</b>.</li>
          <li>❌ <b>Poco económica</b> por la abundancia de cableado.</li></ul>`, 'mesh'),
        M('¿Qué topología es esta?', ['Malla', 'Anillo', 'Árbol', 'Bus'], null, null, 'mesh'),
        M('¿Cuál es la principal desventaja de la topología en malla?', ['Es poco económica por tanto cableado', 'Si falla un nodo cae toda la red', 'Solo hay un camino posible', 'No tiene redundancia']),
        P('Une cada topología con su descripción', [
          ['Anillo', 'Cada nodo conectado a dos adyacentes'],
          ['Anillo doble', 'Dos anillos, uno redundante'],
          ['Árbol', 'Nodo troncal con ramificaciones'],
          ['Malla', 'Cada nodo conectado a todos']])
      ]
    },
    {
      id: 'u1l8', title: 'Control de acceso al medio', icon: '🚦',
      steps: [
        T('Topologías LAN', 'Lo que se usa hoy vs lo heredado 🕰️',
          `Los dispositivos finales de las LAN suelen conectarse en <b>estrella o estrella extendida</b>: fáciles de instalar, <b>muy escalables</b> y fáciles de solucionar.<br>
          Las tecnologías heredadas <b>Early Ethernet</b> y <b>Token Ring</b> aportan dos topologías más:
          <ul><li><b>Bus</b>: todos los sistemas finales se encadenan entre sí y terminan de algún modo en cada extremo.</li>
          <li><b>Anillo</b>: cada sistema final está conectado a sus vecinos formando un anillo.</li></ul>`),
        M('¿Qué topologías se usan normalmente en las LAN actuales?', ['Estrella y estrella extendida', 'Bus y anillo', 'Solo malla', 'Anillo doble']),
        T('Métodos de control de acceso', '¿Quién puede usar el medio y cuándo?',
          `<b>1) Acceso basado en la contención</b>: todos los nodos operan en <b>semidúplex</b> compitiendo por el uso del medio.
          <ul><li><b>CSMA/CD</b>: Ethernet de topología de bus heredada.</li><li><b>CSMA/CA</b>: LAN inalámbricas.</li></ul>
          <b>2) Acceso controlado</b>: acceso <b>determinista</b>, donde cada nodo tiene <b>su propio tiempo</b> en el medio. Redes heredadas como <b>Token Ring</b> y <b>ARCNET</b>.`),
        M('Token Ring y ARCNET usan acceso…', ['Controlado (determinista)', 'Basado en contención', 'CSMA/CD', 'CSMA/CA']),
        T('CSMA/CD', 'Detectar colisiones 💥',
          `<b>C</b>arrier <b>S</b>ense <b>M</b>ultiple <b>A</b>ccess with <b>C</b>ollision <b>D</b>etection.
          <ul><li>Utilizado por <b>LAN Ethernet heredadas</b>. Funciona en <b>semidúplex</b> (solo un dispositivo envía o recibe a la vez).</li></ul>
          Proceso:<ol><li>Dispositivos que transmiten simultáneamente provocan una <b>colisión</b> en el medio compartido.</li>
          <li>Los dispositivos <b>detectan</b> la colisión.</li><li>Esperan un <b>período aleatorio</b> de tiempo y <b>retransmiten</b>.</li></ol>`),
        O('Ordena el proceso de CSMA/CD', ['Dos dispositivos transmiten a la vez y colisionan', 'Los dispositivos detectan la colisión', 'Esperan un tiempo aleatorio', 'Retransmiten los datos']),
        T('CSMA/CA', 'Prevenir en vez de detectar 🛡️',
          `<b>CSMA/CA</b> (…with <b>Collision Avoidance</b>, prevención de colisiones).
          <ul><li>Utilizado por <b>WLAN IEEE 802.11</b>, en <b>semidúplex</b>.</li>
          <li>Al transmitir, los dispositivos incluyen la <b>duración de tiempo</b> necesaria para la transmisión.</li>
          <li>Los demás dispositivos reciben esa duración y saben <b>cuánto tiempo el medio no estará disponible</b>.</li></ul>`),
        P('Une cada método con su descripción', [
          ['CSMA/CD', 'Detecta colisiones (Ethernet heredada)'],
          ['CSMA/CA', 'Previene colisiones (WLAN 802.11)'],
          ['Acceso controlado', 'Cada nodo tiene su propio turno'],
          ['Contención', 'Los nodos compiten por el medio']]),
        M('¿Qué método usan las redes Wi-Fi (802.11)?', ['CSMA/CA', 'CSMA/CD', 'Token Ring', 'ARCNET']),
        TF('En CSMA/CA los dispositivos informan cuánto tiempo durará su transmisión.', true),
        W('¿Qué significa la "D" de CSMA/CD? (en inglés o español)', ['detection', 'collision detection', 'deteccion', 'detección', 'deteccion de colisiones', 'detección de colisiones'], 'Collision D… (lo contrario de "avoidance")')
      ]
    },
    {
      id: 'u1l9', title: 'Dúplex y simplex', icon: '↔️',
      steps: [
        T('¿Qué es dúplex?', 'Hablar y escuchar a la vez 📞',
          `<b>Dúplex</b>: sistema capaz de mantener una comunicación <b>bidireccional</b>, enviando y recibiendo mensajes de forma <b>simultánea</b>.<br>
          La capacidad de transmitir en dúplex está condicionada por 3 niveles:
          <ul><li><b>Medio físico</b> (capaz de transmitir en ambos sentidos)</li><li><b>Sistema de transmisión</b> (capaz de enviar y recibir a la vez)</li>
          <li><b>Protocolo</b> o norma de comunicación de los equipos terminales</li></ul>`),
        M('¿Cuál NO es uno de los niveles que condicionan la transmisión dúplex?', ['El color de la carcasa', 'El medio físico', 'El sistema de transmisión', 'El protocolo de comunicación']),
        T('Full, half y simplex', 'Los 3 modos con su ejemplo 👇',
          `<div class="tw"><table class="tbl"><tr><th>Modo</th><th>Cómo es</th><th>Ejemplo</th></tr>
          <tr><td><b>Full dúplex</b></td><td>Canales de envío y recepción <b>simultáneos</b>. Se logra con <b>frecuencias separadas</b> (multiplexación en frecuencia) o <b>cables separados</b>.</td><td>El <b>teléfono</b></td></tr>
          <tr><td><b>Half dúplex</b> (semidúplex)</td><td>Transmite en los dos sentidos, pero <b>no a la vez</b>.</td><td><b>Radio</b> (walkie-talkie)</td></tr>
          <tr><td><b>Simplex</b></td><td>Solo <b>un sentido</b>. Para comunicación completa se usan anillos o doble fibra.</td><td><b>Fibra óptica</b></td></tr></table></div>`),
        P('Une cada modo con su ejemplo', [
          ['Full dúplex', 'Teléfono'], ['Half dúplex', 'Radio (walkie-talkie)'], ['Simplex', 'Un solo sentido (fibra óptica)']]),
        M('Una conversación por radio donde solo uno puede hablar a la vez es…', ['Half dúplex', 'Full dúplex', 'Simplex', 'Multicast']),
        M('¿Cómo se puede conseguir full dúplex?', ['Con frecuencias separadas o cables separados', 'Usando un solo token', 'Con CSMA/CD', 'Con topología de bus']),
        TF('CSMA/CD y CSMA/CA funcionan en modo semidúplex.', true),
        M('El ejemplo típico de simplex según la clase es…', ['La fibra óptica', 'El teléfono', 'La radio', 'El Wi-Fi'])
      ]
    }
  ]
});

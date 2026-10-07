/* UNIDAD 3 — Clase 2 (parte 2): Criterios de diseño, control de flujo/errores y transmisión de datos */
unit({
  id: 'u3',
  kicker: 'Unidad 3 · Clase 2',
  title: 'Diseño y transmisión de datos',
  desc: 'Latencia, ancho de banda, pérdidas, control de flujo y errores (ARQ), transmisión y medios.',
  color: '#1CB0F6', dark: '#1899D6',
  lessons: [
    {
      id: 'u3l1', title: 'Latencia y ancho de banda', icon: '⏱️',
      steps: [
        T('Criterios de diseño en redes', 'Las 3 variables del rendimiento 📈',
          `Al diseñar cualquier arquitectura de red hay <b>tres variables fundamentales</b> que definen el rendimiento y la experiencia de usuario:
          <ul><li><b>Latencia</b>: el tiempo de respuesta o <b>retraso</b> en el viaje de la información.</li>
          <li><b>Ancho de banda</b>: la <b>capacidad máxima</b> de transferencia de datos por unidad de tiempo.</li>
          <li><b>Tolerancia a pérdidas</b>: la capacidad de la aplicación para lidiar con datos que <b>no llegan</b> a destino.</li></ul>`),
        P('Une cada criterio con su definición', [
          ['Latencia', 'Retraso del viaje de la información'],
          ['Ancho de banda', 'Capacidad máxima de transferencia'],
          ['Tolerancia a pérdidas', 'Lidiar con datos que no llegan']]),
        T('Latencia (el factor tiempo)', 'También se le llama retardo ⏳',
          `<b>Definición</b>: retraso temporal (en <b>milisegundos, ms</b>) que tarda un paquete en viajar del origen al destino.
          <ul><li><b>Causas físicas</b>: limitaciones de los medios (velocidad en fibra/cobre), retrasos de <b>procesamiento en routers</b> y <b>colas por congestión</b>.</li>
          <li><b>Impacto</b>: una red de alto ancho de banda puede verse <b>lenta</b> si la latencia es alta (ej. conexiones <b>satelitales</b> tradicionales).</li>
          <li><b>Mitigación</b>: redes de entrega de contenido (<b>CDN</b>), <b>Edge Computing</b> y arquitecturas de proximidad física.</li></ul>`),
        M('¿En qué unidad se mide normalmente la latencia?', ['Milisegundos (ms)', 'Mbps', 'Bytes', 'Hertz']),
        M('¿Cuál es una forma de mitigar la latencia?', ['Usar CDN y Edge Computing', 'Usar cables más largos', 'Aumentar la congestión', 'Usar conexión satelital']),
        T('Ancho de banda (el factor capacidad)', 'Piensa en una tubería 🚰',
          `<b>Definición</b>: capacidad máxima teórica de un medio para transferir datos en un intervalo de tiempo (<b>bps, Mbps, Gbps</b>).<br>
          <b>Analogía</b>: es el <b>"grosor de la tubería"</b>. La latencia determina la velocidad del flujo; el ancho de banda, <b>cuánta cantidad cabe a la vez</b>.<br>
          <b>Si es insuficiente</b>: los datos exceden el ancho de banda → se llenan los <b>buffers de los routers</b> → se dispara la <b>latencia</b> → se <b>descartan datos</b>.`),
        M('En la analogía de la tubería, el ancho de banda es…', ['El grosor de la tubería', 'La velocidad del agua', 'El largo de la tubería', 'El color de la tubería']),
        O('¿Qué pasa cuando los datos exceden el ancho de banda? Ordena', ['Se llenan los buffers de los routers', 'Se dispara la latencia', 'Se descartan datos']),
        TF('Una red con mucho ancho de banda nunca puede sentirse lenta.', false, null, 'Si la latencia es alta (por ejemplo, satélite) la red se siente lenta aunque tenga mucho ancho de banda.'),
        M('El ancho de banda se expresa en…', ['bps, Mbps, Gbps', 'ms', 'metros', 'voltios'])
      ]
    },
    {
      id: 'u3l2', title: 'Tolerancia a pérdidas', icon: '📉',
      steps: [
        T('Tolerancia a pérdidas (packet loss)', '¿Qué pasa si un paquete no llega? 📦❌',
          `<b>Definición</b>: porcentaje de paquetes enviados que <b>nunca llegan</b> a su destino debido a <b>congestión</b> o <b>interferencias electromagnéticas</b>.
          <ul><li><b>Cero tolerancia (baja tolerancia)</b>: crítico en <b>transferencia de archivos, web o transacciones</b>. Requiere protocolos orientados a la conexión como <b>TCP</b> (retransmisiones automáticas que <b>suman latencia</b>).</li>
          <li><b>Alta tolerancia</b>: servicios en <b>tiempo real</b> (streaming en directo, <b>VoIP</b>, <b>videojuegos</b>). Prefieren perder un paquete viejo antes que retrasar toda la transmisión → <b>UDP</b>.</li></ul>`),
        M('Una transferencia bancaria necesita…', ['Cero tolerancia a pérdidas (TCP)', 'Alta tolerancia a pérdidas (UDP)', 'Transmisión simplex', 'Token Ring']),
        M('Una llamada por VoIP o un videojuego en línea prefiere…', ['UDP: perder un paquete viejo antes que retrasar', 'TCP: retransmitir todo aunque se retrase', 'No enviar nada', 'CSMA/CD']),
        P('Une cada concepto con su descripción', [
          ['TCP', 'Orientado a conexión, retransmite'],
          ['UDP', 'Tiempo real, tolera pérdidas'],
          ['Packet loss', 'Paquetes que nunca llegan'],
          ['Cero tolerancia', 'Archivos, web y transacciones']]),
        TF('Las retransmisiones automáticas de TCP suman latencia.', true),
        M('¿Qué causa la pérdida de paquetes según la clase?', ['Congestión o interferencias electromagnéticas', 'Usar direcciones privadas', 'El modelo OSI', 'La capa de presentación']),
        M('¿Qué protocolo implementa los servicios de alta tolerancia a pérdidas?', ['UDP', 'TCP', 'ARP', 'PPP']),
        W('¿Qué protocolo de transporte usarías para descargar un archivo sin perder nada?', 'TCP', 'El que retransmite automáticamente.')
      ]
    },
    {
      id: 'u3l3', title: 'Control de flujo', icon: '🚰',
      steps: [
        T('¿Qué es el control de flujo?', 'No llenes el vaso más rápido de lo que se bebe 🥤',
          `Es la técnica que regula la <b>velocidad y cantidad</b> de datos que un emisor envía, evitando que <b>sature el búfer del receptor</b>.<br><br>
          <b>El problema</b>: si el emisor transmite más rápido de lo que el receptor puede procesar, la memoria temporal (<b>búfer</b>) se llena y las nuevas tramas se <b>descartan</b>.<br><br>
          Estrategias: <b>Parada y Espera</b> (Stop-and-Wait) y <b>Ventana Deslizante</b> (Sliding Window).`),
        M('¿Qué evita el control de flujo?', ['Que el emisor sature el búfer del receptor', 'Que haya colisiones en el bus', 'Que se repitan direcciones IP', 'Que el token se pierda']),
        T('Parada y Espera vs Ventana Deslizante', 'Los dos mecanismos principales ⚙️',
          `<div class="tw"><table class="tbl"><tr><th>Parada y Espera</th><th>Ventana Deslizante</th></tr>
          <tr><td>Envía <b>una única trama</b> y se detiene. No envía la siguiente hasta recibir el <b>ACK</b> (acuse de recibo).</td>
          <td>Envía <b>múltiples tramas</b> antes de recibir un ACK. El <b>tamaño de la ventana</b> determina cuántos datos pueden quedar en tránsito.</td></tr>
          <tr><td>✅ Simple de implementar.<br>❌ <b>Ineficiente</b> en enlaces de alta latencia.</td>
          <td>✅ <b>Maximiza</b> el uso del ancho de banda.<br>El rango avanza con cada ACK.</td></tr></table></div>`),
        M('En Parada y Espera, ¿cuándo envía el emisor la siguiente trama?', ['Al recibir el ACK de la anterior', 'Inmediatamente', 'Cuando expira la ventana', 'Cuando llega el token']),
        M('¿Qué determina el tamaño de la ventana en Ventana Deslizante?', ['Cuántas tramas pueden estar en tránsito a la vez', 'La velocidad del cable', 'El número de capas', 'La dirección MAC']),
        P('Une cada término con su significado', [
          ['Parada y Espera', 'Una trama y espera el ACK'],
          ['Ventana Deslizante', 'Varias tramas antes del ACK'],
          ['ACK', 'Acuse de recibo'],
          ['Búfer', 'Memoria temporal del receptor']]),
        TF('Parada y Espera es muy eficiente en enlaces de alta latencia.', false, null, 'Es simple pero ineficiente en enlaces de alta latencia, porque espera cada ACK.'),
        M('¿Qué mecanismo maximiza el uso del ancho de banda?', ['Ventana Deslizante', 'Parada y Espera', 'Simplex', 'CSMA/CD'])
      ]
    },
    {
      id: 'u3l4', title: 'Control de errores y ARQ', icon: '🛠️',
      steps: [
        T('Control de errores', 'Que llegue cada bit correcto ✅',
          `Conjunto de procedimientos para garantizar la entrega correcta de cada bit, gestionando tramas <b>dañadas, perdidas o duplicadas</b>.
          <ul><li><b>Detección de errores</b>: usa bits adicionales de redundancia (<b>bits de paridad, suma de verificación o CRC</b>) para que el receptor valide la integridad del mensaje.</li>
          <li><b>Corrección de errores</b>: mediante <b>retransmisiones automáticas</b> solicitadas por protocolos <b>ARQ</b> (Automatic Repeat reQuest).</li></ul>`),
        M('¿Cuál es una técnica de DETECCIÓN de errores?', ['CRC', 'Ventana deslizante', 'NAT', 'Token']),
        M('¿Qué significa ARQ?', ['Automatic Repeat reQuest', 'Address Resolution Query', 'Automatic Routing Queue', 'Access Request Quality']),
        T('Protocolos ARQ', 'Los 3 sabores de ARQ 🍦',
          `<ul><li><b>Parada y Espera ARQ</b>: si el emisor no recibe un ACK antes de que expire un temporizador (<b>timeout</b>), asume pérdida y <b>retransmite la trama actual</b>.</li>
          <li><b>Vuelta Atrás N (Go-Back-N)</b>: si una trama intermedia falla, el receptor <b>descarta todas las posteriores</b>. El emisor retransmite la trama dañada <b>y todas las siguientes</b>.</li>
          <li><b>Repetición Selectiva</b>: el receptor guarda en un búfer las tramas correctas posteriores y pide <b>solo la trama corrupta o faltante</b>. Es <b>la más eficiente</b>.</li></ul>`),
        M('Se envían las tramas 1 a 5 y la 3 se pierde. Con Go-Back-N, ¿qué se retransmite?', ['La 3, la 4 y la 5', 'Solo la 3', 'Todas desde la 1', 'Ninguna']),
        M('Mismo caso (falla la 3 de 1 a 5) con Repetición Selectiva, ¿qué se retransmite?', ['Solo la 3', 'La 3, la 4 y la 5', 'Todas', 'La 1 y la 2']),
        P('Une cada protocolo con lo que hace', [
          ['Parada y Espera ARQ', 'Retransmite al expirar el timeout'],
          ['Go-Back-N', 'Retransmite la dañada y todas las siguientes'],
          ['Repetición Selectiva', 'Solo retransmite la trama dañada'],
          ['CRC', 'Detecta errores']]),
        TF('Repetición Selectiva es más eficiente que Go-Back-N.', true),
        W('Escribe el nombre en inglés de "Vuelta Atrás N"', ['go-back-n', 'go back n', 'gobackn', 'go-back n', 'go back-n'], 'Go-…-N')
      ]
    },
    {
      id: 'u3l5', title: 'Analógica vs digital', icon: '〰️',
      steps: [
        T('Naturaleza de la transmisión', 'Ondas continuas vs ceros y unos',
          `<div class="tw"><table class="tbl"><tr><th>Analógica</th><th>Digital</th></tr>
          <tr><td><b>Ondas continuas</b> que varían en el tiempo.</td><td><b>Pulsos discretos</b> (valores fijos 0 y 1).</td></tr>
          <tr><td>Sensible al <b>ruido</b> atmosférico y a la <b>atenuación</b>.</td><td>Mayor <b>inmunidad al ruido</b> y fácil de <b>regenerar</b>.</td></tr>
          <tr><td>Ej: <b>voz humana</b>, radio tradicional.</td><td>Base de la informática moderna y las redes actuales.</td></tr></table></div>`),
        M('La voz humana y la radio tradicional son ejemplos de transmisión…', ['Analógica', 'Digital', 'Simplex', 'Multicast']),
        T('Modelo de un sistema de comunicaciones', 'Del emisor al receptor 📨',
          `<b>Fuente → Transmisor → Sistema de transmisión → Receptor → Destino</b><br>
          Ejemplo: Estación de trabajo (<b>ETD/DTE</b>) → Módem (<b>ETCD/DCE</b>) → Red telefónica pública → Módem (DCE) → Servidor (DTE).
          <ul><li><b>ETD / DTE</b>: Equipo Terminal de Datos.</li><li><b>ETCD / DCE</b>: Equipo Terminal de Circuito de Datos.</li></ul>`, 'commsys'),
        M('En el ejemplo de la clase, el módem es un…', ['DCE / ETCD', 'DTE / ETD', 'Host', 'Switch']),
        O('Ordena el modelo de un sistema de comunicaciones', ['Fuente', 'Transmisor', 'Sistema de transmisión', 'Receptor', 'Destino']),
        T('Amplificadores vs repetidores', 'Esta diferencia es clave 🔑',
          `<b>Transmisión análoga</b>:
          <ul><li>Se transmite <b>independientemente del contenido</b> (datos digitales o análogos).</li>
          <li>Se <b>atenúa</b> con la distancia; usa <b>amplificadores</b>, que <b>también amplifican el ruido</b>.</li>
          <li>Para enviar una señal digital por un medio análogo se usan <b>módems</b> (Moduladores y Demoduladores).</li></ul>
          <b>Transmisión digital</b>:
          <ul><li><b>Dependiente del contenido</b>; distancia limitada (atenuación, ruido, dispersión).</li>
          <li>Usa <b>repetidores</b>: reciben la señal, <b>regeneran el patrón de unos y ceros</b> y retransmiten.</li>
          <li>El ruido <b>no se amplifica</b> (no es acumulativo).</li></ul>`),
        P('Une cada elemento con su descripción', [
          ['Amplificador', 'Analógica: también amplifica el ruido'],
          ['Repetidor', 'Digital: regenera los 1 y 0'],
          ['Módem', 'Modulador-Demodulador'],
          ['DTE', 'Equipo Terminal de Datos']]),
        TF('En la transmisión digital el ruido se acumula porque los repetidores lo amplifican.', false, null, 'Los repetidores regeneran el patrón de unos y ceros, por eso el ruido NO es acumulativo.'),
        M('Para transmitir una señal digital por un medio análogo se necesita un…', ['Módem', 'Repetidor', 'Switch', 'Token']),
        W('Completa: DTE = Equipo Terminal de ___', ['datos', 'equipo terminal de datos'], 'Es lo que viaja por la red…')
      ]
    },
    {
      id: 'u3l6', title: 'Medios guiados', icon: '🧵',
      steps: [
        T('Medios de transmisión guiados', 'Los que van por cable 🔌',
          `<div class="tw"><table class="tbl"><tr><th>Medio</th><th>Características</th><th>Uso principal</th></tr>
          <tr><td><b>Par trenzado</b> (cobre)</td><td>Hilos <b>entrelazados</b> para reducir la interferencia electromagnética. <b>Económico</b>.</td><td>Redes locales (<b>LAN</b>), telefonía fija.</td></tr>
          <tr><td><b>Coaxial</b></td><td>Núcleo de cobre <b>blindado</b>. Excelente resistencia al ruido y pérdidas.</td><td><b>Televisión por cable</b>, internet banda ancha.</td></tr>
          <tr><td><b>Fibra óptica</b></td><td>Hilos de vidrio puro que transmiten <b>pulsos de luz</b>. Capacidad masiva.</td><td>Enlaces <b>intercontinentales</b>, <b>FTTH</b> (hogar).</td></tr></table></div>`),
        P('Une cada medio con su uso principal', [['Par trenzado', 'LAN y telefonía fija'], ['Coaxial', 'Televisión por cable'], ['Fibra óptica', 'Enlaces intercontinentales y FTTH']]),
        M('¿Por qué los hilos del par trenzado están entrelazados?', ['Para reducir la interferencia electromagnética', 'Para transmitir luz', 'Para ser más caros', 'Para conectarse por Bluetooth']),
        T('Tecnologías Ethernet', '¡Esta tabla suele salir! 📋',
          `<div class="tw"><table class="tbl"><tr><th>Tecnología</th><th>Velocidad</th><th>Cable</th><th>Distancia</th></tr>
          <tr><td>10Base2</td><td>10 Mbps</td><td>Coaxial</td><td>185 m</td></tr>
          <tr><td>10BaseT</td><td>10 Mbps</td><td>Par trenzado</td><td>100 m</td></tr>
          <tr><td>10BaseF</td><td>10 Mbps</td><td>Fibra óptica</td><td>2000 m</td></tr>
          <tr><td>100BaseTX</td><td>100 Mbps</td><td>Par trenzado (Cat 5 UTP)</td><td>100 m</td></tr>
          <tr><td>100BaseFX</td><td>100 Mbps</td><td>Fibra óptica</td><td>2000 m</td></tr>
          <tr><td>1000BaseSX</td><td>1000 Mbps</td><td>Fibra multimodo</td><td>550 m</td></tr>
          <tr><td>1000BaseLX</td><td>1000 Mbps</td><td>Fibra monomodo</td><td>5000 m</td></tr></table></div>
          🧠 El número inicial = velocidad en Mbps. <b>T</b> = par trenzado (Twisted). <b>F / FX / SX / LX</b> = fibra. <b>2</b> = coaxial (~200 m).`),
        M('¿Qué distancia máxima tienen 10BaseT y 100BaseTX (par trenzado)?', ['100 m', '185 m', '550 m', '2000 m']),
        M('10Base2 usa cable…', ['Coaxial', 'Par trenzado', 'Fibra multimodo', 'Fibra monomodo']),
        P('Une cada tecnología con su cable y distancia', [
          ['10Base2', 'Coaxial, 185 m'], ['100BaseTX', 'UTP Cat 5, 100 m'],
          ['1000BaseSX', 'Fibra multimodo, 550 m'], ['1000BaseLX', 'Fibra monomodo, 5000 m']]),
        M('¿Qué velocidad tiene 100BaseFX?', ['100 Mbps', '10 Mbps', '1000 Mbps', '54 Mbps']),
        W('¿Cuántos metros alcanza 10Base2? (solo el número)', '185', 'Un poco menos de 200.'),
        TF('1000BaseLX usa fibra monomodo y llega a 5000 m.', true)
      ]
    },
    {
      id: 'u3l7', title: 'Medios no guiados', icon: '📡',
      steps: [
        T('Medios no guiados (inalámbricos)', 'Los que viajan por el aire 🌬️',
          `<ul><li><b>Ondas de radio</b>: <b>omnidireccionales</b>. Ideales para movilidad y cortas distancias (<b>Wi-Fi, Bluetooth</b>, redes móviles).</li>
          <li><b>Microondas</b>: <b>direccionales</b> de alta frecuencia. Requieren <b>línea de visión directa</b> entre antenas (enlaces satelitales, antenas de telefonía).</li>
          <li><b>Infrarrojos</b>: <b>muy corto alcance</b> y <b>no atraviesan paredes</b> u obstáculos (controles remotos, sensores de proximidad).</li></ul>`),
        P('Une cada medio con su característica', [
          ['Ondas de radio', 'Omnidireccionales: Wi-Fi, Bluetooth'],
          ['Microondas', 'Necesitan línea de visión directa'],
          ['Infrarrojos', 'No atraviesan paredes: control remoto']]),
        M('¿Qué medio no guiado requiere línea de visión directa entre antenas?', ['Microondas', 'Ondas de radio', 'Infrarrojos', 'Par trenzado']),
        M('El control remoto de la TV usa…', ['Infrarrojos', 'Microondas', 'Fibra óptica', 'Coaxial']),
        TF('Las ondas de radio son omnidireccionales.', true),
        M('¿Cuál de estos es un medio GUIADO?', ['Fibra óptica', 'Microondas', 'Infrarrojos', 'Ondas de radio']),
        M('Wi-Fi y Bluetooth usan…', ['Ondas de radio', 'Infrarrojos', 'Cable coaxial', 'Láser'])
      ]
    }
  ]
});

/* UNIDAD 6 — Práctica 2: Comandos IPCONFIG, PING, ARP, TRACERT (Windows) — ¡importante para el examen! */
unit({
  id: 'u6',
  kicker: 'Unidad 6 · Práctica 2',
  title: 'Comandos de red',
  desc: 'ipconfig y sus modificadores, ping y el diagnóstico de 3 pasos, arp y tracert.',
  color: '#FF4B91', dark: '#D93A78',
  lessons: [
    {
      id: 'u6l1', title: 'ipconfig', icon: '💻',
      steps: [
        T('La línea de comandos', '¡A la consola! 🖥️ Estos comandos son de examen seguro.',
          `En Windows abre la línea de comandos con <b>Ejecutar → cmd</b> (o buscando el ícono del sistema).<br><br>
          <b>IPCONFIG</b> muestra la información relativa a los parámetros de tu <b>configuración IP actual</b>. Tiene <b>modificadores</b> para ejecutar acciones concretas.<br><br>
          El más usado es <b>ipconfig /all</b>: muestra <b>toda</b> la información de configuración.`),
        W('Escribe el comando que muestra TODA la configuración IP', 'ipconfig /all', 'ipconfig + el modificador "todo" en inglés.', null, CMD),
        T('¿Qué muestra ipconfig /all?', 'Los campos que más vas a usar 👇',
          `<div class="tw"><table class="tbl"><tr><th>Campo</th><th>Qué indica</th></tr>
          <tr><td><b>DHCP habilitado</b></td><td>Si el servicio DHCP está habilitado o no.</td></tr>
          <tr><td><b>Configuración automática habilitada</b></td><td>Si la configuración de red es automática.</td></tr>
          <tr><td><b>Vínculo: dirección IPv6 local</b></td><td>La dirección IPv6 de tu máquina.</td></tr>
          <tr><td><b>Dirección IPv4</b></td><td>La dirección IP actual de tu máquina.</td></tr>
          <tr><td><b>Máscara de subred</b></td><td>La máscara de subred de tu red.</td></tr>
          <tr><td><b>Puerta de enlace predeterminada</b></td><td>La IP de la puerta de enlace (normalmente tu <b>router</b>).</td></tr>
          <tr><td><b>Servidor DHCP</b></td><td>La IP del servidor DHCP al que estás conectado.</td></tr>
          <tr><td><b>IAID DHCPv6</b></td><td>Información de DHCP en la versión IPv6.</td></tr>
          <tr><td><b>Servidores DNS</b></td><td>La IP de los servidores DNS a los que estás conectado.</td></tr>
          <tr><td><b>Dirección física</b></td><td>La <b>MAC</b> del adaptador.</td></tr></table></div>
          También aparecen: nombre del host, sufijo DNS, tipo de nodo, <b>concesión obtenida</b> y <b>concesión expira</b> (préstamo de la IP dada por DHCP).`),
        M('En ipconfig /all, ¿qué campo muestra la IP de tu router?', ['Puerta de enlace predeterminada', 'Servidores DNS', 'Dirección física', 'Máscara de subred']),
        M('En ipconfig /all, la "Dirección física" es…', ['La dirección MAC del adaptador', 'La IP pública', 'La dirección del router', 'El nombre del host']),
        P('Une cada campo de ipconfig /all con lo que muestra', [
          ['Dirección IPv4', 'IP actual de tu máquina'],
          ['Puerta de enlace predeterminada', 'IP del router'],
          ['Servidores DNS', 'IP de los servidores DNS'],
          ['Dirección física', 'MAC del adaptador']]),
        M('¿Para qué te sirve conocer la Puerta de enlace?', ['Para entrar a configurar tu router', 'Para cambiar tu MAC', 'Para ver la tabla ARP', 'Para medir el TTL']),
        TF('ipconfig /all muestra si DHCP está habilitado.', true),
        M('"Concesión obtenida" y "Concesión expira" se refieren a…', ['El tiempo de préstamo de la IP asignada por DHCP', 'La garantía de la PC', 'La licencia de Windows', 'El tiempo de un ping'])
      ]
    },
    {
      id: 'u6l2', title: 'Modificadores de ipconfig', icon: '🎛️',
      steps: [
        T('Modificadores de ipconfig', 'Todos los "/" de la práctica 📋',
          `<div class="tw"><table class="tbl"><tr><th>Modificador</th><th>Qué hace</th></tr>
          <tr><td><b>/all</b></td><td>Muestra toda la información de configuración.</td></tr>
          <tr><td><b>/allcompartments</b></td><td>Muestra información para todos los compartimientos.</td></tr>
          <tr><td><b>/release</b></td><td><b>Libera</b> la dirección IP del adaptador (IPv4 e IPv6).</td></tr>
          <tr><td><b>/renew</b></td><td><b>Renueva</b> la dirección <b>IPv4</b>.</td></tr>
          <tr><td><b>/renew6</b></td><td>Renueva la dirección <b>IPv6</b>.</td></tr>
          <tr><td><b>/flushdns</b></td><td><b>Purga</b> (borra) la caché de resolución DNS.</td></tr>
          <tr><td><b>/registerdns</b></td><td>Actualiza todas las concesiones DHCP y vuelve a registrar los nombres DNS.</td></tr>
          <tr><td><b>/displaydns</b></td><td><b>Muestra</b> el contenido de la caché DNS.</td></tr>
          <tr><td><b>/showclassid</b></td><td>Muestra los id. de clase DHCP permitidos.</td></tr>
          <tr><td><b>/setclassid</b></td><td>Modifica el id. de clase DHCP.</td></tr></table></div>`),
        P('Une cada modificador con lo que hace', [['/release', 'Libera la dirección IP'], ['/renew', 'Renueva la dirección IPv4'], ['/flushdns', 'Purga la caché DNS'], ['/displaydns', 'Muestra la caché DNS']]),
        W('Libera tu dirección IP', 'ipconfig /release', 'ipconfig /… "soltar" en inglés', null, CMD),
        W('Renueva tu dirección IPv4', 'ipconfig /renew', 'ipconfig /… "renovar" en inglés', null, CMD),
        W('Borra (purga) la caché de DNS', 'ipconfig /flushdns', 'flush = vaciar', null, CMD),
        M('¿Qué modificador renueva la dirección IPv6?', ['/renew6', '/renew', '/release6', '/ipv6']),
        M('¿Qué hace ipconfig /registerdns?', ['Actualiza las concesiones DHCP y vuelve a registrar los nombres DNS', 'Borra la caché DNS', 'Muestra la caché DNS', 'Libera la IP']),
        O('Para pedir una IP nueva al DHCP y verificarla, ¿en qué orden ejecutas?', ['ipconfig /release', 'ipconfig /renew', 'ipconfig /all']),
        M('¿Qué modificador modifica el id. de clase DHCP?', ['/setclassid', '/showclassid', '/registerdns', '/allcompartments']),
        W('Muestra el contenido de la caché DNS', 'ipconfig /displaydns', 'display = mostrar', null, CMD)
      ]
    },
    {
      id: 'u6l3', title: 'ping', icon: '🏓',
      steps: [
        T('¿Qué hace PING?', '¡Ping… pong! 🏓',
          `Al hacer <b>ping</b> a un equipo o a una IP, el sistema envía a esa dirección una serie de paquetes (normalmente <b>cuatro</b>) de un tamaño total de <b>64 bytes</b> (salvo que se modifique) y queda en espera del reenvío de estos (<b>eco</b>).
          <ul><li>Se usa para medir la <b>latencia</b>: el tiempo que tardan en comunicarse dos puntos remotos.</li>
          <li>Comprueba la <b>conectividad</b>: los paquetes van directo a la IP, sin influencia de controladores del sistema.</li>
          <li>No le afectan las configuraciones de <b>firewall</b> (salvo que se configure para no admitirlos) ni los permisos de acceso: el ping se hace directamente sobre la tarjeta.</li></ul>`),
        M('¿Cuántos paquetes envía ping normalmente?', ['4', '1', '10', 'Infinitos']),
        M('¿Qué mide principalmente ping?', ['La latencia y la conectividad', 'El ancho de banda máximo', 'La dirección MAC', 'Los nombres de cada router']),
        T('El diagnóstico de los 3 ping', '¡ESTO es lo más importante de la práctica! ⭐',
          `Para comprobar el funcionamiento de tu red, haz <b>tres ping en este orden</b>:
          <ol><li><b>Ping a tu IP local</b> → comprueba que tu <b>tarjeta de red</b> funciona correctamente.</li>
          <li><b>Ping a tu puerta de enlace</b> (gateway) → comprueba que tu equipo se comunica con tu <b>router</b>.</li>
          <li><b>Ping al servidor DNS</b> → comprueba que tu router se conecta con el <b>exterior (Internet)</b>.</li></ol>
          También puedes hacer <b>ping www.ucab.edu.ve</b>: el efecto es el mismo <b>siempre que tu servicio DNS funcione</b>.`),
        O('Ordena los 3 ping de diagnóstico', ['Ping a tu IP local', 'Ping a la puerta de enlace', 'Ping al servidor DNS']),
        P('Une cada ping con lo que comprueba', [
          ['Ping a tu IP local', 'Tu tarjeta de red funciona'],
          ['Ping a la puerta de enlace', 'Te comunicas con el router'],
          ['Ping al servidor DNS', 'El router sale a Internet'],
          ['Ping a www.ucab.edu.ve', 'Además, que el DNS resuelve nombres']]),
        M('Si el ping a tu gateway funciona pero el ping al DNS falla, el problema está…', ['Entre el router y el exterior (Internet)', 'En tu tarjeta de red', 'En tu cable de consola', 'En la capa de presentación']),
        T('Leer la respuesta de ping', 'La tabla de la práctica 📝',
          `En la práctica se anotaba, para cada destino (tu interfaz, la puerta de enlace, la PC de un compañero, www.ucab.edu.ve, www.google.com):
          <ul><li><b>Tiempo</b> (ms): la latencia de ida y vuelta.</li><li><b>TTL</b> (Time To Live): tiempo de vida del paquete.</li>
          <li>Paquetes <b>enviados</b> y <b>recibidos</b> (y perdidos).</li></ul>`),
        M('En la respuesta de ping, ¿qué indica "tiempo=25ms"?', ['La latencia de ida y vuelta', 'El tiempo de vida (TTL)', 'El tamaño del paquete', 'La hora del sistema']),
        W('Haz ping a www.google.com', ['ping www.google.com', 'ping google.com'], 'ping + el nombre del sitio', null, CMD),
        TF('Para hacer ping a www.ucab.edu.ve necesitas que el servicio DNS funcione.', true)
      ]
    },
    {
      id: 'u6l4', title: 'Modificadores de ping', icon: '🎚️',
      steps: [
        T('Modificadores de ping', 'Los "-" de ping 🎛️',
          `<div class="tw"><table class="tbl"><tr><th>Mod.</th><th>Qué hace</th></tr>
          <tr><td><b>-t</b></td><td>Ping al host <b>hasta que se detenga</b> (continuo; Ctrl+C para parar).</td></tr>
          <tr><td><b>-a</b></td><td><b>Resolver</b> direcciones en <b>nombres de host</b>.</td></tr>
          <tr><td><b>-n</b> cuenta</td><td><b>Número</b> de solicitudes de eco a enviar.</td></tr>
          <tr><td><b>-l</b> tamaño</td><td><b>Tamaño</b> del búfer a enviar.</td></tr>
          <tr><td><b>-f</b></td><td>Marcador <b>No fragmentar</b> (solo IPv4).</td></tr>
          <tr><td><b>-i</b> TTL</td><td><b>Tiempo de vida</b>.</td></tr>
          <tr><td><b>-v</b> TOS</td><td>Tipo de servicio (solo IPv4).</td></tr>
          <tr><td><b>-r</b> cuenta</td><td>Registrar la <b>ruta</b> de saltos (solo IPv4).</td></tr>
          <tr><td><b>-s</b> cuenta</td><td>Marca de tiempo de saltos (solo IPv4).</td></tr>
          <tr><td><b>-j</b> lista-host</td><td>Ruta de origen <b>no estricta</b> (solo IPv4).</td></tr>
          <tr><td><b>-k</b> lista-host</td><td>Ruta de origen <b>estricta</b> (solo IPv4).</td></tr>
          <tr><td><b>-w</b> tiempo</td><td>Tiempo de <b>espera</b> en ms para cada respuesta.</td></tr>
          <tr><td><b>-R</b></td><td>Probar también la ruta inversa (solo IPv6).</td></tr>
          <tr><td><b>-S</b> srcaddr</td><td>Dirección de origen a usar (solo IPv6).</td></tr>
          <tr><td><b>-4</b> / <b>-6</b></td><td>Forzar el uso de IPv4 / IPv6.</td></tr></table></div>`),
        P('Une cada modificador con lo que hace', [['-t', 'Ping continuo hasta detenerlo'], ['-n', 'Número de solicitudes de eco'], ['-l', 'Tamaño del búfer'], ['-a', 'Resolver direcciones en nombres de host']]),
        W('Haz ping continuo a 8.8.8.8', ['ping -t 8.8.8.8', 'ping 8.8.8.8 -t'], 'El modificador es -t', null, CMD),
        W('Envía solo 10 pings a 192.168.1.1', ['ping -n 10 192.168.1.1', 'ping 192.168.1.1 -n 10'], '-n = número', null, CMD),
        M('¿Qué modificador establece el TTL (tiempo de vida)?', ['-i', '-t', '-l', '-w']),
        M('¿Qué hace ping -f?', ['Activa el marcador No fragmentar', 'Fuerza IPv4', 'Hace ping infinito', 'Resuelve el nombre del host']),
        P('Une cada modificador con lo que hace', [['-w', 'Tiempo de espera de cada respuesta (ms)'], ['-4', 'Forzar IPv4'], ['-6', 'Forzar IPv6'], ['-i', 'Tiempo de vida (TTL)']]),
        W('Haz ping a 192.168.1.10 mostrando su nombre de host', ['ping -a 192.168.1.10', 'ping 192.168.1.10 -a'], '-a = resolver nombres', null, CMD),
        M('¿Qué diferencia hay entre -j y -k?', ['-j: ruta de origen no estricta; -k: estricta', '-j: estricta; -k: no estricta', 'Ambos fuerzan IPv6', 'Ambos cambian el TTL']),
        W('Haz ping a 10.0.0.1 con paquetes de 1000 bytes', ['ping -l 1000 10.0.0.1', 'ping 10.0.0.1 -l 1000'], '-l = length (tamaño)', null, CMD),
        M('¿Qué modificadores son solo para IPv6?', ['-R y -S', '-r y -s', '-t y -a', '-n y -l'])
      ]
    },
    {
      id: 'u6l5', title: 'arp', icon: '📇',
      steps: [
        T('El comando ARP', 'La libreta IP ↔ MAC de tu PC 📒',
          `<b>ARP</b> muestra y modifica las <b>tablas de conversión de direcciones IP en direcciones físicas (MAC)</b> que usa el protocolo de resolución de direcciones.
          <div class="tw"><table class="tbl"><tr><th>Comando</th><th>Qué hace</th></tr>
          <tr><td><b>arp -a</b></td><td><b>Muestra</b> las entradas ARP actuales. Si hay varias interfaces, muestra la tabla de cada una.</td></tr>
          <tr><td><b>arp -g</b></td><td><b>Igual que -a</b>.</td></tr>
          <tr><td><b>arp -N</b> if_addr</td><td>Muestra las entradas de la <b>interfaz</b> especificada.</td></tr>
          <tr><td><b>arp -d</b></td><td><b>Elimina</b> el host especificado. Con <b>*</b> elimina <b>todos</b>.</td></tr>
          <tr><td><b>arp -s</b></td><td><b>Agrega</b> un host asociando la IP con la MAC (6 bytes en <b>hexadecimal separados por guiones</b>). La entrada es <b>permanente</b>.</td></tr></table></div>`),
        W('Muestra la tabla ARP', ['arp -a', 'arp -g'], 'arp + "a" de all', null, CMD),
        M('¿Qué comando es equivalente a arp -a?', ['arp -g', 'arp -d', 'arp -s', 'arp -N']),
        W('Elimina TODAS las entradas de la tabla ARP', ['arp -d *'], '-d = delete, y el comodín para "todos"', null, CMD),
        M('¿Qué hace arp -s?', ['Agrega una entrada estática (permanente) IP–MAC', 'Muestra la tabla', 'Elimina un host', 'Hace ping']),
        M('¿Cómo se escribe la MAC en arp -s?', ['6 bytes hexadecimales separados por guiones', '4 octetos decimales con puntos', '48 dígitos binarios', 'Con notación /48']),
        T('Aprender MACs con ping', 'Así llenas tu tabla ARP 🧲',
          `Tu PC aprende las MAC de sus vecinos al comunicarse con ellos. En la práctica:
          <ol><li>Le pides a tu compañero su <b>dirección IP</b>.</li><li>Haces <b>ping IP_destino</b>.</li>
          <li>Ejecutas <b>arp -a</b> y ves su <b>MAC</b> en tu tabla.</li></ol>
          Las entradas aprendidas son <b>dinámicas</b>: si pasa cierto tiempo sin comunicación, se <b>borran</b>. Las agregadas con <b>-s</b> son estáticas.`),
        O('¿Cómo obtienes la MAC de la PC de tu compañero?', ['Pides su dirección IP', 'Haces ping a su IP', 'Ejecutas arp -a', 'Lees su MAC en la tabla']),
        W('Agrega una entrada estática: IP 192.168.1.5 con MAC 00-aa-00-62-c6-09', ['arp -s 192.168.1.5 00-aa-00-62-c6-09'], 'arp -s IP MAC', null, CMD),
        TF('Las entradas que ARP aprende automáticamente son permanentes.', false, null, 'Son dinámicas: se borran si no hay comunicación durante un tiempo. Solo las de arp -s son permanentes.')
      ]
    },
    {
      id: 'u6l6', title: 'tracert', icon: '🧭',
      steps: [
        T('TRACERT (traceroute)', 'Sigue el camino de tu paquete 🗺️',
          `La herramienta <b>tracert</b> (traceroute) se usa para <b>resolver problemas</b> de red.
          <ul><li>Muestra la <b>lista de routers atravesados</b> para llegar a un destino.</li>
          <li>Cada router es un punto donde <b>una red se conecta con otra</b>.</li>
          <li>La cantidad de routers = cantidad de <b>"saltos"</b> desde el origen hasta el destino.</li>
          <li>Muestra el <b>tiempo de cada salto en milisegundos</b>.</li>
          <li>Ayuda a identificar problemas de flujo de datos y a elegir el <b>espejo (mirror)</b> más rápido para descargar un archivo.</li>
          <li>Por la naturaleza <b>"de malla"</b> de Internet, dos rastreos al mismo destino en momentos distintos pueden dar <b>rutas diferentes</b>.</li></ul>
          En la práctica también se usó <b>NeoTracert</b>, con una interfaz más amplia.`),
        W('Rastrea la ruta hasta www.google.com', ['tracert www.google.com', 'tracert google.com'], 'tracert + destino', null, CMD),
        M('¿Qué muestra tracert?', ['La lista de routers (saltos) hasta el destino', 'La tabla ARP', 'La configuración IP', 'La caché DNS']),
        M('¿Por qué dos tracert al mismo destino pueden dar rutas distintas?', ['Internet es una malla e IP puede elegir distintas rutas', 'Porque la MAC cambia', 'Porque el DNS falla', 'Porque tracert es aleatorio']),
        M('En tracert, cada router atravesado se cuenta como un…', ['Salto', 'Token', 'Octeto', 'Frame']),
        P('Une cada comando con su función', [['ipconfig', 'Configuración IP'], ['ping', 'Conectividad y latencia'], ['arp', 'Tabla IP ↔ MAC'], ['tracert', 'Ruta y saltos hasta el destino']]),
        TF('tracert sirve para elegir el espejo (mirror) más rápido para descargar un archivo.', true),
        M('¿Qué herramienta con interfaz más amplia que tracert se usó en la práctica?', ['NeoTracert', 'Packet Tracer', 'Wireshark', 'PuTTY'])
      ]
    },
    {
      id: 'u6l7', title: 'Reto de terminal', icon: '⌨️',
      steps: [
        T('¡Reto de terminal!', '¿Listo? Ahora eres el técnico de redes 🧑‍💻',
          `Te daré situaciones reales y tú escribes el comando. Recuerda:
          <ul><li><b>ipconfig</b> → configuración IP (/all, /release, /renew, /flushdns…)</li>
          <li><b>ping</b> → conectividad y latencia (-t, -n, -a, -l…)</li>
          <li><b>arp</b> → tabla IP ↔ MAC (-a, -d, -s)</li><li><b>tracert</b> → ruta y saltos</li></ul>`),
        W('Quieres ver tu IP, máscara, puerta de enlace y DNS con todo detalle', 'ipconfig /all', null, null, CMD),
        W('Una web cambió de servidor y tu PC sigue yendo a la IP vieja: limpia la caché DNS', 'ipconfig /flushdns', null, null, CMD),
        W('Comprueba tu propia tarjeta de red haciendo ping a la loopback 127.0.0.1', 'ping 127.0.0.1', null, null, CMD),
        W('Quieres vigilar sin parar la conexión con tu router 192.168.1.1', ['ping -t 192.168.1.1', 'ping 192.168.1.1 -t'], null, null, CMD),
        W('Quieres ver las MAC de los equipos con los que te comunicaste', ['arp -a', 'arp -g'], null, null, CMD),
        W('Quieres saber por cuántos routers pasa tu paquete hasta www.ucab.edu.ve', 'tracert www.ucab.edu.ve', null, null, CMD),
        M('Haces ping a www.google.com y no encuentra el host, pero ping 8.8.8.8 sí responde. ¿Qué falla?', ['La resolución DNS', 'La tarjeta de red', 'El cable', 'El switch']),
        W('Tu PC tiene una IP extraña. Primero libérala…', 'ipconfig /release', null, null, CMD),
        W('…y ahora pide una nueva', 'ipconfig /renew', null, null, CMD)
      ]
    }
  ]
});

/* UNIDAD 7 (EXTRA) — Práctica 3: Configuración básica de un switch (Packet Tracer) */
unit({
  id: 'u7',
  extra: true,
  kicker: 'Extra · Práctica 3',
  title: 'Configuración de un switch',
  desc: 'Packet Tracer, cables directo/cruzado, aprendizaje de MAC, modos IOS, comandos y tabla MAC.',
  color: '#2B70C9', dark: '#1F5BA8',
  lessons: [
    {
      id: 'u7l1', title: 'Montando la red', icon: '🔀',
      steps: [
        T('La red de la práctica', 'Esta unidad es EXTRA, pero tiene cosas útiles 😉',
          `En <b>Packet Tracer</b> se usa un switch <b>2950-24</b>, con <b>24 puertos</b>: <b>Fa0/1</b> (puerto 1), Fa0/2… hasta <b>Fa0/24</b>.
          <ul><li>Se conectan 5 PC en forma de <b>estrella</b>, con el switch al centro.</li>
          <li>Cada PC va a un <b>puerto específico</b> para tener orden y control (parte de un buen <b>cableado estructurado</b> y de la seguridad).</li>
          <li>El indicador del enlace cambia de <b>naranja a verde</b> cuando la conexión física está levantada.</li></ul>`),
        M('¿Cómo se identifica el puerto 5 del switch 2950?', ['Fa0/5', 'Gi0/5', 'Port5', 'Eth5']),
        M('Con un switch al centro y las PC alrededor, la topología es…', ['Estrella', 'Bus', 'Anillo', 'Malla']),
        T('Cable directo vs cruzado', 'La tabla de cables 🔌',
          `<div class="tw"><table class="tbl"><tr><th>Conexión</th><th>Cable</th></tr>
          <tr><td>PC a PC</td><td><b>Cruzado</b></td></tr><tr><td>PC a Switch</td><td><b>Directo</b></td></tr>
          <tr><td>PC a Hub</td><td><b>Directo</b></td></tr><tr><td>PC a Router (puerto FastEthernet)</td><td><b>Cruzado</b></td></tr>
          <tr><td>Switch a Switch</td><td><b>Cruzado</b></td></tr><tr><td>Switch a Hub</td><td><b>Cruzado</b></td></tr>
          <tr><td>Switch a Router</td><td><b>Directo</b></td></tr><tr><td>Router a Router</td><td><b>Cruzado</b></td></tr></table></div>
          🧠 Regla: grupo 1 = {PC, Router}, grupo 2 = {Switch, Hub}. <b>Mismo grupo → cruzado</b>. <b>Distinto grupo → directo</b>.`),
        M('PC a Switch se conecta con cable…', ['Directo', 'Cruzado', 'De consola', 'Coaxial']),
        M('Switch a Switch se conecta con cable…', ['Cruzado', 'Directo', 'De consola', 'Fibra obligatoria']),
        M('PC a Router (puerto FastEthernet) usa cable…', ['Cruzado', 'Directo', 'Serial', 'Coaxial']),
        M('Switch a Router usa cable…', ['Directo', 'Cruzado', 'De consola', 'Ninguno']),
        TF('PC a PC se conecta con cable directo.', false, null, 'PC y PC son del mismo grupo → cable cruzado.'),
        T('Direcciones IP de las PC', 'Cada PC con su IP única 🏷️',
          `Se trabaja con la red <b>192.168.1.0/24</b> y máscara <b>255.255.255.0</b>. <b>No se puede repetir</b> la misma IP en dos PC.<br>
          Ej: PC0 = 192.168.1.100 · PC1 = .101 · PC2 = .102 · PC3 = .35 · PC4 = .153<br>
          Se configuran con doble clic en la PC → <b>Desktop → IP Configuration</b>. Para probar la red: <b>ping</b> desde la línea de comandos de PC0 a PC4.`),
        TF('Dos PC de la misma red pueden tener la misma IP sin problema.', false),
        M('Con la red 192.168.1.0/24, ¿qué máscara llevan las PC?', ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.255'])
      ]
    },
    {
      id: 'u7l2', title: 'Cómo aprende el switch', icon: '🧠',
      steps: [
        T('El switch aprende direcciones MAC', 'Míralo en modo simulación 🔍',
          `En <b>modo simulación</b> se ve todo paso a paso (botón <b>Capture/Forward</b>).<br>
          Cuando PC0 hace ping a PC3 por primera vez:
          <ol><li>El switch hace <b>broadcast</b>: envía el ping a todas las PC…</li><li>…pero <b>solo responde la PC destino</b>.</li>
          <li>El switch <b>aprende las MAC</b> de origen y destino y las guarda en una tabla que relaciona <b>MAC ↔ puerto físico</b>.</li>
          <li>Cuando PC3 responde, el switch <b>ya no necesita broadcast</b>: ya sabe dónde está PC0.</li></ol>`),
        O('Ordena lo que pasa en el primer ping de PC0 a PC3', ['PC0 envía el ping al switch', 'El switch hace broadcast a todas las PC', 'Solo PC3 responde', 'El switch aprende las MAC y sus puertos', 'La respuesta llega a PC0 sin broadcast']),
        M('¿Qué relaciona la tabla de direcciones MAC del switch?', ['Dirección MAC con puerto físico', 'IP con MAC', 'IP con nombre de host', 'Puerto con contraseña']),
        TF('Después de aprender la MAC de PC0, el switch todavía necesita hacer broadcast para responderle.', false),
        T('El cable de consola', 'Para entrar a configurar el switch 🔧',
          `Para entrar a la configuración del switch se conecta una de las PC con el <b>cable de consola</b>: en la PC al puerto <b>Serial RS232</b> y en el switch al puerto de <b>consola</b>. Luego se abre la <b>Terminal</b> de esa PC.`),
        M('¿Qué cable se usa para entrar a configurar el switch desde una PC?', ['Cable de consola (RS232 → consola)', 'Cable cruzado', 'Cable coaxial', 'Cable directo al puerto Fa0/1']),
        M('En el modo simulación de Packet Tracer, ¿qué botón avanza paso a paso?', ['Capture/Forward', 'Realtime', 'Reset', 'Power'])
      ]
    },
    {
      id: 'u7l3', title: 'Modos del IOS y claves', icon: '🔐',
      steps: [
        T('Niveles de acceso', 'El prompt te dice dónde estás 👀',
          `En el switch Cisco hay dos niveles de acceso:
          <ul><li><b>EXEC de usuario</b>: serie limitada de comandos de <b>monitorización básicos</b>. Prompt: <b>&gt;</b> (Switch&gt;)</li>
          <li><b>EXEC privilegiado</b>: <b>todos</b> los comandos, de visualización y de configuración. Prompt: <b>#</b> (Switch#)</li></ul>
          Además: <b>configuración global</b> → Switch(config)# · configuración de línea → Switch(config-line)#`),
        P('Une cada prompt con su modo', [['Switch>', 'EXEC de usuario'], ['Switch#', 'EXEC privilegiado'], ['Switch(config)#', 'Configuración global'], ['Switch(config-line)#', 'Configuración de línea']]),
        M('¿Qué carácter identifica el modo EXEC privilegiado?', ['#', '>', '$', '%']),
        T('Las tres claves', 'Seguridad del dispositivo 🔑',
          `Para que solo personas autorizadas modifiquen el switch existen <b>tres claves</b>:
          <ul><li><b>Clave de consola</b>: se pide apenas el usuario se conecta por el puerto de consola.</li>
          <li><b>Clave remota</b>: se pide si el usuario entra remoto desde una PC (en la misma red o no).</li>
          <li><b>Clave de EXEC privilegiado</b>: se pide para entrar al modo donde se modifica la configuración.</li></ul>
          Esto aplica igual para los <b>routers</b>. En la práctica solo se configuran las claves de <b>consola</b> y de <b>EXEC privilegiado</b>.`),
        M('¿Qué claves se configuraron en la práctica?', ['Consola y EXEC privilegiado', 'Solo la remota', 'Las tres', 'Ninguna']),
        TF('Las mismas claves y niveles de acceso aplican también a los routers.', true),
        M('En el modo EXEC de usuario puedes…', ['Usar comandos limitados de monitorización', 'Cambiar toda la configuración', 'Poner contraseñas', 'Cambiar el hostname'])
      ]
    },
    {
      id: 'u7l4', title: 'Configurando el switch', icon: '⚙️',
      steps: [
        T('Los comandos de la práctica', 'Escríbelos como en la terminal ⌨️',
          `<pre class="code">Switch&gt;enable
Switch#configure terminal
Switch(config)#enable password redes
Switch(config)#line console 0
Switch(config-line)#password ucab
Switch(config-line)#login
Switch(config-line)#exit
Switch(config)#hostname switch1
switch1(config)#exit
switch1#copy running-config startup-config</pre>
          <ul><li><b>enable</b> → de EXEC usuario a EXEC privilegiado.</li><li><b>configure terminal</b> → modo de configuración.</li>
          <li><b>enable password redes</b> → clave del EXEC privilegiado.</li><li><b>line console 0</b> → configurar la línea de consola.</li>
          <li><b>password ucab</b> + <b>login</b> → clave de consola y que se pida al entrar.</li><li><b>hostname switch1</b> → cambia el nombre.</li>
          <li><b>copy running-config startup-config</b> → guarda para que <b>no se pierda al reiniciar</b>.</li></ul>`),
        W('Pasa de EXEC de usuario a EXEC privilegiado', ['enable', 'en'], null, null, CISCO('Switch>')),
        W('Entra al modo de configuración', ['configure terminal', 'conf t', 'config t', 'configure t'], null, null, CISCO('Switch#')),
        W('Pon la clave "redes" al modo EXEC privilegiado', ['enable password redes'], 'enable password …', null, CISCO('Switch(config)#')),
        W('Entra a configurar la línea de consola', ['line console 0', 'line con 0'], 'line console …', null, CISCO('Switch(config)#')),
        W('Cambia el nombre del switch a switch1', ['hostname switch1'], null, null, CISCO('Switch(config)#')),
        W('Guarda la configuración para que no se pierda al reiniciar', ['copy running-config startup-config', 'copy run start'], 'copy … …', null, CISCO('switch1#')),
        O('Ordena los comandos para poner la clave de consola', ['enable', 'configure terminal', 'line console 0', 'password ucab', 'login']),
        M('¿Qué hace el comando login dentro de line console 0?', ['Hace que se pida la clave al conectarse por consola', 'Cierra la sesión', 'Guarda la configuración', 'Cambia el nombre']),
        M('¿Por qué se ejecuta copy running-config startup-config?', ['Para que al reiniciar el switch no pierda la configuración', 'Para borrar la configuración', 'Para ver la tabla MAC', 'Para salir del modo privilegiado'])
      ]
    },
    {
      id: 'u7l5', title: 'Tabla de direcciones MAC', icon: '📋',
      steps: [
        T('show mac-address-table', 'Lo que el switch aprendió 🧠',
          `Tras varios ping entre las PC, el switch aprende las MAC y las asocia a sus puertos. Se ve con:
          <pre class="code">switch1#show mac-address-table</pre>
          Columnas: <b>Vlan · Mac Address · Type · Ports</b>
          <ul><li>La <b>VLAN por defecto es la 1</b>.</li>
          <li><b>DYNAMIC</b>: el switch la aprende <b>automáticamente</b> cuando la PC envía su primer mensaje. Dura poco: si el equipo no envía ni recibe durante ese tiempo, se <b>borra</b> de la lista (la práctica dice "aprox. 300"; en Cisco son 300 segundos).</li></ul>`),
        W('Muestra la tabla de direcciones MAC del switch', ['show mac-address-table', 'show mac address-table', 'sh mac-address-table'], 'show …', null, CISCO('switch1#')),
        M('¿Cuál es la VLAN por defecto de un switch Cisco?', ['VLAN 1', 'VLAN 0', 'VLAN 10', 'VLAN 99']),
        T('Entradas estáticas', 'Las que no se borran 📌',
          `Puedes grabar de forma <b>estática</b> la MAC de una PC asociada a un puerto (¡asegúrate de que la MAC y el puerto sean correctos o los datos no llegarán!):
          <pre class="code">switch1(config)#mac-address-table static 0002.4A91.DA14 vlan 1 interface fastEthernet 0/2</pre>
          <ul><li>Cuando ninguna PC habla en la red, las <b>dinámicas se eliminan</b> y las <b>estáticas se mantienen</b> en memoria.</li>
          <li>Según la práctica, la estática se borra si <b>desconectas la PC del puerto</b>.</li></ul>`),
        P('Une cada término de la tabla MAC', [['DYNAMIC', 'Aprendida sola, se borra con el tiempo'], ['STATIC', 'Configurada a mano, se mantiene'], ['Vlan 1', 'VLAN por defecto'], ['Fa0/2', 'Puerto 2 del switch']]),
        TF('Cuando ninguna PC habla en la red, las entradas estáticas se borran de la tabla.', false, null, 'Se borran las DINÁMICAS; las estáticas se mantienen en memoria.'),
        M('¿En qué modo se escribe "mac-address-table static …"?', ['Configuración global (config)#', 'EXEC de usuario >', 'EXEC privilegiado # sin configure', 'Configuración de línea']),
        T('Más de 24 equipos', 'Conecta otro switch ➕',
          `Si tienes más de 24 equipos, conecta <b>otro switch</b> desde cualquier puerto del primero a cualquiera del segundo usando un <b>cable cruzado</b>, y configúralo igual (ej. hostname <b>switch2</b>).<br>
          Las PC también tienen su propia tabla que asocia <b>IP ↔ MAC</b>: la tabla <b>ARP</b>, que se ve con <b>arp -a</b>.`),
        M('¿Con qué cable conectas un segundo switch al primero?', ['Cruzado', 'Directo', 'De consola', 'Coaxial']),
        M('¿Qué tabla tienen las PC que asocia IP con MAC?', ['La tabla ARP', 'La tabla MAC del switch', 'La caché DNS', 'La running-config'])
      ]
    }
  ]
});

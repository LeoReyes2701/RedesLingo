# 🦉📡 RedesLingo

App estilo **Duolingo** para estudiar **Redes de Comunicación de Datos**: primero te enseña y después te evalúa, siguiendo una ruta de niveles que cubre todo el contenido de clase.

## Contenido de la ruta

| Unidad | Fuente | Temas |
|---|---|---|
| 1 · Introducción a las redes | Clase 1 | Hosts, dispositivos, medios, PAN/LAN/MAN/WAN, inalámbricas, topologías, CSMA/CD y CSMA/CA, dúplex |
| 2 · Modelo OSI y TCP/IP | Clase 2 | Modelo en capas, protocolos e interfaces, 7 capas OSI, encapsulación, TCP/IP, comparación |
| 3 · Diseño y transmisión de datos | Clase 2 | Latencia, ancho de banda, pérdidas, control de flujo, ARQ, analógica/digital, medios guiados y no guiados |
| 4 · Ethernet y LAN inalámbrica | Clase 3 | LLC/MAC, trama Ethernet, Wi-Fi, estándares 802.11, modos, trama 802.11 |
| 5 · Direcciones IP y MAC | Clase 3 | IP vs MAC, ARP, unicast/broadcast/multicast, IPv4, clases, privadas, NAT, CIDR |
| 6 · Comandos de red | Práctica 2 | `ipconfig`, `ping`, `arp`, `tracert` y sus modificadores |
| 👑 Examen final | Todo | 30 preguntas mezcladas de las unidades 1–6 |
| ⭐ Extra · Switch | Práctica 3 | Packet Tracer, cables, modos IOS, comandos, tabla MAC |

48 lecciones · 112 tarjetas de teoría · 351 ejercicios.

## Funciones

- **Ruta con niveles** que se desbloquean en orden; la mascota *Bit* camina por el camino al avanzar.
- **Barra de progreso siempre visible**: dentro de cada lección y la global del curso (más el progreso por unidad).
- **Primero enseña, luego evalúa**: tarjetas de concepto seguidas de ejercicios (opción múltiple, verdadero/falso, unir parejas, ordenar, escribir y terminal de comandos).
- **Pistas infinitas**: pista escrita → elimina opciones / revela parte de la respuesta → muestra la respuesta, más acceso a la teoría.
- Las preguntas falladas **se repiten** antes de terminar la lección y se guardan en **Errores** para practicarlas.
- **Guía de estudio** con buscador, repasos por unidad y examen final.
- **El progreso se guarda automáticamente** después de cada respuesta (localStorage), incluso a mitad de una lección. Exportar/Importar progreso entre dispositivos.
- **PWA instalable** y funciona **sin internet**. Modo claro/oscuro.

## Uso local

Es un sitio estático, sin compilación. Sirve la carpeta con cualquier servidor:

```bash
py -m http.server 8765
```

y abre <http://localhost:8765>.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub.
2. *Settings → Pages → Build and deployment*: **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. La app queda en `https://<usuario>.github.io/<repositorio>/`.

/* Helpers para declarar el contenido del curso de forma compacta.
   En las preguntas de opción múltiple (M) la PRIMERA opción es siempre la correcta;
   la app las baraja al mostrarlas. */
window.RL = { units: [] };

function unit(u) { window.RL.units.push(u); }

// Tarjeta de teoría (primero se enseña)
function T(title, say, body, fig) { return { t: 'teach', title, say, body, fig }; }
// Opción múltiple: o[0] es la correcta. Si q contiene ___ se rellena con la opción elegida
function M(q, o, h, e, fig) { return { t: 'mcq', q, o, h, e, fig }; }
// Verdadero / falso
function TF(q, a, h, e) { return { t: 'tf', q, a, h, e }; }
// Unir parejas [[izq, der], ...]
function P(q, p, h, e) { return { t: 'match', q, p, h, e }; }
// Ordenar: o está en el orden correcto
function O(q, o, h, e) { return { t: 'order', q, o, h, e }; }
// Escribir la respuesta: a = respuesta o lista de respuestas aceptadas
function W(q, a, h, e, x) { return Object.assign({ t: 'type', q, a: [].concat(a), h, e }, x || {}); }

// Prompts de terminal para ejercicios de comandos
const CMD = { term: 'C:\\Users\\estudiante>' };
function CISCO(p) { return { term: p }; }

/**
 * ============================================================================
 * TALLER DE ALGORITMOS EN JAVASCRIPT
 * Archivo: taller-algoritmos.js
 * Descripción: Solución integral a los 3 desafíos algorítmicos:
 *   1. Condicionales Simples (Determinación de Año Bisiesto)
 *   2. Ciclos y Arreglos (Búsqueda del Número Mayor en un arreglo fijo de 10 números)
 *   3. Combinación de Estructuras (Juego de Adivinar el Número Secreto en 5 intentos)
 * ============================================================================
 */

"use strict";

// ============================================================================
// CAPA DE BACKEND: LÓGICA DE NEGOCIO, ALGORITMOS Y VALIDACIONES
// ============================================================================

/**
 * ----------------------------------------------------------------------------
 * DESAFÍO 1: CONDICIONALES SIMPLES - Determinar si un año es bisiesto
 * ----------------------------------------------------------------------------
 * Regla matemática y astronómica del calendario gregoriano:
 * Un año es bisiesto si cumple las siguientes condiciones:
 *   1. Es divisible exactamente entre 4 (anio % 4 === 0).
 *   2. EXCEPTO si es divisible entre 100 (anio % 100 === 0), en cuyo caso NO es bisiesto,
 *   3. A MENOS que también sea divisible entre 400 (anio % 400 === 0), en cuyo caso SÍ es bisiesto.
 *
 * @param {number} anio - El año entero positivo que se desea evaluar.
 * @returns {boolean} - Retorna `true` si el año es bisiesto, `false` en caso contrario.
 * @throws {TypeError|RangeError} - Si el parámetro no es un número entero válido mayor a 0.
 */
function esAnioBisiesto(anio) {
  // Validación de tipo: verificamos que el dato recibido sea un número entero válido
  if (typeof anio !== "number" || !Number.isInteger(anio) || Number.isNaN(anio)) {
    throw new TypeError("El año proporcionado debe ser un número entero válido.");
  }

  // Validación de rango: el calendario gregoriano aplica a años positivos mayores a 0
  if (anio <= 0) {
    throw new RangeError("El año debe ser un número entero positivo mayor que cero.");
  }

  // Condicional 1: Si es divisible entre 400, siempre es un año bisiesto (ej. 1600, 2000, 2400)
  if (anio % 400 === 0) {
    return true;
  }

  // Condicional 2: Si no fue divisible entre 400 pero sí es divisible entre 100,
  // entonces es un año secular no bisiesto (ej. 1700, 1800, 1900, 2100)
  if (anio % 100 === 0) {
    return false;
  }

  // Condicional 3: Si no es múltiplo de 100, basta con que sea divisible entre 4
  // para ser bisiesto (ej. 2020, 2024, 2028)
  if (anio % 4 === 0) {
    return true;
  }

  // Si no cumple ninguna de las condiciones anteriores, es un año común (no bisiesto)
  return false;
}

/**
 * ----------------------------------------------------------------------------
 * DESAFÍO 2: CICLOS Y ARREGLOS - Encontrar el número más grande en 10 números
 * ----------------------------------------------------------------------------
 * Lógica del algoritmo:
 *   1. Se valida que la entrada sea un arreglo (Array) y que tenga una longitud
 *      fija de exactamente 10 elementos numéricos válidos.
 *   2. Se inicializa una variable acumuladora/comparadora (`numeroMayor`) con el
 *      primer elemento del arreglo (índice 0).
 *   3. Se recorre el arreglo desde el segundo elemento (índice 1) hasta el final
 *      (índice 9) utilizando un ciclo `for`.
 *   4. En cada iteración se compara el elemento actual con `numeroMayor`. Si el
 *      elemento actual es estrictamente mayor, se actualiza `numeroMayor`.
 *   5. Al finalizar el ciclo, se retorna `numeroMayor`.
 *
 * @param {number[]} numeros - Arreglo fijo de exactamente 10 números.
 * @returns {number} - El valor numérico más grande encontrado dentro del arreglo.
 * @throws {TypeError|RangeError} - Si no es un arreglo, no tiene 10 elementos o contiene datos no numéricos.
 */
function encontrarNumeroMayor(numeros) {
  // Validación de estructura: comprobar que el parámetro sea efectivamente un arreglo
  if (!Array.isArray(numeros)) {
    throw new TypeError("Se esperaba recibir un arreglo (Array) de números.");
  }

  // Validación de longitud fija: el desafío exige recibir un arreglo fijo de 10 números
  const LONGITUD_REQUERIDA = 10;
  if (numeros.length !== LONGITUD_REQUERIDA) {
    throw new RangeError(
      `El arreglo debe contener exactamente ${LONGITUD_REQUERIDA} números (se recibieron ${numeros.length}).`
    );
  }

  // Validación del primer elemento antes de inicializar la referencia del número mayor
  if (typeof numeros[0] !== "number" || Number.isNaN(numeros[0]) || !Number.isFinite(numeros[0])) {
    throw new TypeError("El elemento en la posición 0 no es un número válido.");
  }

  // Inicializamos `numeroMayor` tomando como punto de partida el primer elemento del arreglo.
  // Esto garantiza que el algoritmo funcione correctamente incluso si todos los números son negativos.
  let numeroMayor = numeros[0];

  // Ciclo `for`: recorremos el arreglo desde el índice 1 hasta el índice 9 (los 9 elementos restantes)
  for (let i = 1; i < numeros.length; i++) {
    const numeroActual = numeros[i];

    // Validamos que cada elemento inspeccionado en el ciclo sea un número finito válido
    if (typeof numeroActual !== "number" || Number.isNaN(numeroActual) || !Number.isFinite(numeroActual)) {
      throw new TypeError(`El elemento en la posición ${i} (${numeroActual}) no es un número válido.`);
    }

    // Estructura condicional dentro del ciclo:
    // Si el número en la posición actual supera al mayor registrado hasta ahora, actualizamos la variable
    if (numeroActual > numeroMayor) {
      numeroMayor = numeroActual;
    }
  }

  // Retornamos el valor máximo encontrado tras recorrer los 10 elementos
  return numeroMayor;
}

/**
 * ----------------------------------------------------------------------------
 * DESAFÍO 3: COMBINACIÓN DE ESTRUCTURAS - Juego de Adivinar el Número Secreto
 * ----------------------------------------------------------------------------
 * Lógica del algoritmo:
 *   1. La computadora genera un número secreto al azar dentro de un rango definido
 *      (por defecto entre 1 y 100) usando `Math.random()` y `Math.floor()`.
 *      También permite inyectar opcionalmente un `numeroSecretoFijo` para facilitar
 *      pruebas deterministas de QA sin perder la generación aleatoria por defecto.
 *   2. El jugador dispone de un máximo de 5 intentos (`MAX_INTENTOS = 5`).
 *   3. Mediante un ciclo (`for` / `while`) y estructuras condicionales (`if / else if / else`),
 *      se evalúa cada intento del jugador:
 *        - Si el intento coincide con el número secreto: el jugador gana inmediatamente
 *          y el ciclo termina.
 *        - Si el intento es menor que el número secreto: se devuelve la pista
 *          "El número es más alto" (indicando que el número secreto buscado es mayor).
 *        - Si el intento es mayor que el número secreto: se devuelve la pista
 *          "El número es más bajo" (indicando que el número secreto buscado es menor).
 *   4. Si se agotan los 5 intentos sin acertar, la partida finaliza indicando derrota
 *      y revelando cuál era el número secreto.
 */

/**
 * Genera un número entero aleatorio entre `min` y `max` (ambos inclusive).
 *
 * @param {number} min - Límite inferior del rango.
 * @param {number} max - Límite superior del rango.
 * @returns {number} - Número entero elegido al azar por la computadora.
 */
function generarNumeroSecretoAzar(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Crea una instancia interactiva del juego "Adivina el Número Secreto" con 5 intentos.
 * Permite jugar paso a paso llamando al método `.realizarIntento(numero)`.
 *
 * @param {Object} opciones - Configuración opcional del juego.
 * @param {number} [opciones.min=1] - Valor mínimo posible del número secreto.
 * @param {number} [opciones.max=100] - Valor máximo posible del número secreto.
 * @param {number} [opciones.maxIntentos=5] - Cantidad máxima de intentos permitidos (5 por defecto).
 * @param {number|null} [opciones.numeroSecreto=null] - Número secreto opcional para pruebas controladas.
 * @returns {Object} - API del juego con métodos para intentar y consultar el estado.
 */
function crearJuegoAdivinaNumero(opciones = {}) {
  const min = opciones.min !== undefined ? opciones.min : 1;
  const max = opciones.max !== undefined ? opciones.max : 100;
  const maxIntentos = opciones.maxIntentos !== undefined ? opciones.maxIntentos : 5;

  // Si no se especifica un número fijo de prueba, la computadora lo elige al azar
  const numeroSecreto =
    opciones.numeroSecreto !== undefined && opciones.numeroSecreto !== null
      ? opciones.numeroSecreto
      : generarNumeroSecretoAzar(min, max);

  // Estado interno de la partida: arreglo de historial de intentos y banderas de control
  const historialIntentos = [];
  let juegoTerminado = false;
  let ganado = false;

  /**
   * Procesa un intento del jugador y devuelve el resultado con su pista correspondiente.
   *
   * @param {number} intento - El número propuesto por el jugador.
   * @returns {Object} - Resultado detallado del intento actual.
   */
  function realizarIntento(intento) {
    // Validación de entrada: el intento debe ser un número entero válido
    if (typeof intento !== "number" || !Number.isInteger(intento) || Number.isNaN(intento)) {
      throw new TypeError("El intento debe ser un número entero válido.");
    }

    // Si la partida ya concluyó (por victoria previa o por agotar los 5 intentos), no se procesan más turnos
    if (juegoTerminado) {
      return {
        estado: ganado ? "JUEGO_YA_GANADO" : "SIN_INTENTOS",
        pista: "El juego ya ha finalizado.",
        intentoActual: historialIntentos.length,
        intentosRestantes: maxIntentos - historialIntentos.length,
        ganado,
        juegoTerminado,
        numeroSecreto
      };
    }

    // Registramos el intento en el arreglo de historial
    historialIntentos.push(intento);
    const numeroIntentoActual = historialIntentos.length;
    const intentosRestantes = maxIntentos - numeroIntentoActual;

    let pista = "";
    let estado = "EN_PROGRESO";

    // Estructura condicional para comparar el intento frente al número secreto
    if (intento === numeroSecreto) {
      // Caso 1: El jugador acertó el número secreto
      ganado = true;
      juegoTerminado = true;
      estado = "GANADO";
      pista = `¡Felicidades! Adivinaste el número secreto (${numeroSecreto}) en el intento #${numeroIntentoActual}.`;
    } else if (intento < numeroSecreto) {
      // Caso 2: El número propuesto es menor que el secreto -> el número secreto es más alto
      pista = "El número es más alto";
    } else {
      // Caso 3: El número propuesto es mayor que el secreto -> el número secreto es más bajo
      pista = "El número es más bajo";
    }

    // Verificamos si era el último intento disponible (5to intento) y no logró acertar
    if (!ganado && intentosRestantes === 0) {
      juegoTerminado = true;
      estado = "PERDIDO";
    }

    return {
      intentoPropuesto: intento,
      intentoActual: numeroIntentoActual,
      intentosRestantes,
      pista,
      estado,
      ganado,
      juegoTerminado,
      // Solo revelamos el número secreto cuando el juego termina
      numeroSecreto: juegoTerminado ? numeroSecreto : undefined
    };
  }

  return {
    realizarIntento,
    obtenerEstado: () => ({
      min,
      max,
      maxIntentos,
      intentosRealizados: historialIntentos.length,
      intentosRestantes: maxIntentos - historialIntentos.length,
      historialIntentos: [...historialIntentos],
      ganado,
      juegoTerminado,
      numeroSecreto
    })
  };
}

/**
 * Simula una partida completa en consola recibiendo un arreglo de intentos (hasta 5).
 * Combina ciclos (`for`), arreglos (`intentosJugador`, `registroTurnos`) y condicionales.
 *
 * @param {number[]} intentosJugador - Arreglo con los números que el jugador intenta en orden.
 * @param {number|null} [numeroSecretoFijo=null] - Opcional: fija el número secreto para pruebas; si es null, se elige al azar.
 * @param {number} [min=1] - Rango mínimo para el número aleatorio.
 * @param {number} [max=100] - Rango máximo para el número aleatorio.
 * @returns {Object} - Resumen completo de la partida simulada (turnos, pistas, ganador, número secreto).
 */
function simularPartidaAdivinaNumero(intentosJugador = [], numeroSecretoFijo = null, min = 1, max = 100) {
  if (!Array.isArray(intentosJugador)) {
    throw new TypeError("Los intentos del jugador deben proporcionarse en un arreglo (Array).");
  }

  const MAX_INTENTOS = 5;
  const juego = crearJuegoAdivinaNumero({
    min,
    max,
    maxIntentos: MAX_INTENTOS,
    numeroSecreto: numeroSecretoFijo
  });

  const registroTurnos = [];

  // Ciclo que recorre los intentos provistos, limitado estrictamente a un máximo de 5 intentos
  for (let i = 0; i < intentosJugador.length && i < MAX_INTENTOS; i++) {
    const resultadoTurno = juego.realizarIntento(intentosJugador[i]);
    registroTurnos.push(resultadoTurno);

    // Si el jugador adivina antes de agotar los 5 intentos, interrumpimos el ciclo con `break`
    if (resultadoTurno.juegoTerminado) {
      break;
    }
  }

  const estadoFinal = juego.obtenerEstado();

  return {
    numeroSecreto: estadoFinal.numeroSecreto,
    maxIntentos: MAX_INTENTOS,
    intentosUsados: estadoFinal.intentosRealizados,
    intentosRestantes: estadoFinal.intentosRestantes,
    ganado: estadoFinal.ganado,
    juegoTerminado: estadoFinal.juegoTerminado,
    mensajeFinal: estadoFinal.ganado
      ? `¡Victoria! Se adivinó el número secreto (${estadoFinal.numeroSecreto}) en ${estadoFinal.intentosRealizados} intento(s).`
      : `Fin del juego. No se adivinó el número secreto (${estadoFinal.numeroSecreto}) tras ${estadoFinal.intentosRealizados} intento(s).`,
    turnos: registroTurnos
  };
}

// ============================================================================
// CAPA DE FRONTEND (INTERFAZ DE CONSOLA): FORMATO VISUAL Y SIMULACIÓN LEGIBLE
// ============================================================================

/**
 * Tokens de estilo ANSI para enriquecer la visualización en la terminal
 * (Soporte de colores semánticos para éxito, advertencia, error e información).
 */
const ESTILOS_CONSOLA = {
  reset: "\x1b[0m",
  negrita: "\x1b[1m",
  tenue: "\x1b[2m",
  primario: "\x1b[36m",   // Cian
  exito: "\x1b[32m",      // Verde
  alerta: "\x1b[33m",     // Amarillo
  error: "\x1b[31m",      // Rojo
  acento: "\x1b[35m"      // Magenta
};

/**
 * Imprime un encabezado visualmente estructurado en la consola para separar secciones.
 *
 * @param {string} titulo - Título de la sección o desafío.
 */
function mostrarEncabezadoSeccion(titulo) {
  const linea = "═".repeat(74);
  console.log(`\n${ESTILOS_CONSOLA.primario}╔${linea}╗${ESTILOS_CONSOLA.reset}`);
  console.log(
    `${ESTILOS_CONSOLA.primario}║${ESTILOS_CONSOLA.reset} ${ESTILOS_CONSOLA.negrita}${titulo.padEnd(72, " ")}${ESTILOS_CONSOLA.reset} ${ESTILOS_CONSOLA.primario}║${ESTILOS_CONSOLA.reset}`
  );
  console.log(`${ESTILOS_CONSOLA.primario}╚${linea}╝${ESTILOS_CONSOLA.reset}`);
}

/**
 * Presenta en consola el resultado de evaluar si un año es bisiesto (Desafío 1).
 *
 * @param {number} anio - Año a consultar.
 */
function renderizarResultadoBisiesto(anio) {
  const bisiesto = esAnioBisiesto(anio);
  const icono = bisiesto ? `${ESTILOS_CONSOLA.exito}✔ SÍ es bisiesto${ESTILOS_CONSOLA.reset}` : `${ESTILOS_CONSOLA.alerta}✖ NO es bisiesto${ESTILOS_CONSOLA.reset}`;
  console.log(`  • Año ${ESTILOS_CONSOLA.negrita}${anio}${ESTILOS_CONSOLA.reset} ──► ${icono}`);
}

/**
 * Presenta en consola la búsqueda del número mayor en un arreglo de 10 números (Desafío 2).
 *
 * @param {number[]} arreglo - Lista de 10 números.
 * @param {string} etiqueta - Descripción del caso mostrado.
 */
function renderizarResultadoNumeroMayor(arreglo, etiqueta) {
  const mayor = encontrarNumeroMayor(arreglo);
  console.log(`  • ${ESTILOS_CONSOLA.negrita}${etiqueta}:${ESTILOS_CONSOLA.reset}`);
  console.log(`    Arreglo [10]: [${arreglo.join(", ")}]`);
  console.log(`    Número más grande encontrado: ${ESTILOS_CONSOLA.exito}${ESTILOS_CONSOLA.negrita}${mayor}${ESTILOS_CONSOLA.reset}\n`);
}

/**
 * Presenta paso a paso en la consola una simulación del Juego de Adivinar el Número (Desafío 3).
 *
 * @param {string} tituloPartida - Nombre descriptivo del escenario simulado.
 * @param {number[]} intentos - Lista de intentos del jugador.
 * @param {number|null} numeroSecretoFijo - Número secreto fijo (o `null` para aleatorio real).
 */
function renderizarPartidaConsola(tituloPartida, intentos, numeroSecretoFijo = null) {
  console.log(`\n  ${ESTILOS_CONSOLA.acento}▶ ${ESTILOS_CONSOLA.negrita}${tituloPartida}${ESTILOS_CONSOLA.reset}`);
  const resultado = simularPartidaAdivinaNumero(intentos, numeroSecretoFijo, 1, 100);

  console.log(
    `    ${ESTILOS_CONSOLA.tenue}(Número secreto elegido por la computadora: ${resultado.numeroSecreto} | Máximo de intentos: ${resultado.maxIntentos})${ESTILOS_CONSOLA.reset}`
  );

  // Recorremos cada turno jugado para mostrar el intento y la pista devuelta
  for (let i = 0; i < resultado.turnos.length; i++) {
    const turno = resultado.turnos[i];
    if (turno.ganado) {
      console.log(
        `    [Intento ${turno.intentoActual}/${resultado.maxIntentos}] Jugador ingresa: ${ESTILOS_CONSOLA.negrita}${turno.intentoPropuesto}${ESTILOS_CONSOLA.reset} ──► ${ESTILOS_CONSOLA.exito}${turno.pista}${ESTILOS_CONSOLA.reset}`
      );
    } else {
      console.log(
        `    [Intento ${turno.intentoActual}/${resultado.maxIntentos}] Jugador ingresa: ${ESTILOS_CONSOLA.negrita}${turno.intentoPropuesto}${ESTILOS_CONSOLA.reset} ──► Pista: "${ESTILOS_CONSOLA.alerta}${turno.pista}${ESTILOS_CONSOLA.reset}" (Restantes: ${turno.intentosRestantes})`
      );
    }
  }

  const colorResumen = resultado.ganado ? ESTILOS_CONSOLA.exito : ESTILOS_CONSOLA.error;
  console.log(`    ${colorResumen}${ESTILOS_CONSOLA.negrita}Resultado: ${resultado.mensajeFinal}${ESTILOS_CONSOLA.reset}`);

  return resultado;
}

// ============================================================================
// CAPA DE QA (ASEGURAMIENTO DE CALIDAD): DEMOSTRACIÓN EN CONSOLA Y PRUEBAS
// ============================================================================

/**
 * Ejecuta la demostración visual de los 3 desafíos y posteriormente corre
 * la batería de pruebas automatizadas (`console.assert` y verificación de casos límite).
 */
function ejecutarDemostracionYPruebasQA() {
  // --------------------------------------------------------------------------
  // 1. Demostración en consola del Desafío 1 (Años Bisiestos)
  // --------------------------------------------------------------------------
  mostrarEncabezadoSeccion("DESAFÍO 1: CONDICIONALES SIMPLES - AÑO BISIESTO");
  const aniosPrueba = [2024, 2023, 2000, 1900, 2028, 2100];
  for (let i = 0; i < aniosPrueba.length; i++) {
    renderizarResultadoBisiesto(aniosPrueba[i]);
  }

  // --------------------------------------------------------------------------
  // 2. Demostración en consola del Desafío 2 (Número Mayor en 10 elementos)
  // --------------------------------------------------------------------------
  mostrarEncabezadoSeccion("DESAFÍO 2: CICLOS Y ARREGLOS - NÚMERO MAYOR (10 ELEMENTOS)");
  renderizarResultadoNumeroMayor(
    [15, 42, 8, 99, 23, 4, 77, 56, 31, 64],
    "Caso 1: Números enteros positivos variados"
  );
  renderizarResultadoNumeroMayor(
    [-45, -12, -89, -3, -27, -64, -100, -5, -19, -50],
    "Caso 2: Todos los números negativos"
  );
  renderizarResultadoNumeroMayor(
    [10.5, -3.2, 45.8, 45.79, 0, 12.1, 9.9, -100, 33.3, 20],
    "Caso 3: Números decimales, negativos y cero"
  );

  // --------------------------------------------------------------------------
  // 3. Demostración en consola del Desafío 3 (Juego de Adivinar el Número)
  // --------------------------------------------------------------------------
  mostrarEncabezadoSeccion("DESAFÍO 3: COMBINACIÓN DE ESTRUCTURAS - JUEGO ADIVINA EL NÚMERO");

  // Escenario A: Partida ganada antes de agotar los 5 intentos (número secreto controlado: 42)
  renderizarPartidaConsola(
    "Escenario A: El jugador sigue las pistas y gana en el 4to intento",
    [20, 60, 35, 42, 50],
    42
  );

  // Escenario B: Partida donde se agotan los 5 intentos sin acertar (número secreto controlado: 73)
  renderizarPartidaConsola(
    "Escenario B: El jugador agota sus 5 intentos sin adivinar",
    [10, 90, 50, 80, 65],
    73
  );

  // Escenario C: Partida con número secreto 100% aleatorio elegido por la computadora
  renderizarPartidaConsola(
    "Escenario C: Partida con número secreto totalmente al azar (1 al 100)",
    [50, 25, 75, 60, 40],
    null
  );

  // --------------------------------------------------------------------------
  // 4. Batería de Pruebas Unitarias y Casos Límite (QA)
  // --------------------------------------------------------------------------
  mostrarEncabezadoSeccion("AUDITORÍA QA: EJECUCIÓN DE PRUEBAS AUTOMATIZADAS (ASSERTS)");

  let totalPruebas = 0;
  let pruebasExitosas = 0;

  /**
   * Función auxiliar de QA para verificar una condición mediante `console.assert`
   * y llevar el conteo de aserciones ejecutadas.
   *
   * @param {boolean} condicion - Condición booleana que debe evaluarse como `true`.
   * @param {string} descripcion - Nombre o explicación del caso de prueba.
   */
  function verificarPrueba(condicion, descripcion) {
    totalPruebas++;
    console.assert(condicion, `❌ FALLO EN PRUEBA: ${descripcion}`);
    if (condicion) {
      pruebasExitosas++;
      console.log(`  ${ESTILOS_CONSOLA.exito}✔ [PASS]${ESTILOS_CONSOLA.reset} ${descripcion}`);
    } else {
      console.log(`  ${ESTILOS_CONSOLA.error}✖ [FAIL]${ESTILOS_CONSOLA.reset} ${descripcion}`);
    }
  }

  // --- Pruebas del Desafío 1: Año Bisiesto ---
  verificarPrueba(
    esAnioBisiesto(2024) === true,
    "Desafío 1: 2024 es bisiesto (múltiplo de 4 y no de 100)"
  );
  verificarPrueba(
    esAnioBisiesto(2023) === false,
    "Desafío 1: 2023 NO es bisiesto (año común no divisible entre 4)"
  );
  verificarPrueba(
    esAnioBisiesto(2000) === true,
    "Desafío 1: 2000 SÍ es bisiesto (año secular divisible entre 400)"
  );
  verificarPrueba(
    esAnioBisiesto(1900) === false,
    "Desafío 1: 1900 NO es bisiesto (divisible entre 100 pero no entre 400)"
  );
  verificarPrueba(
    esAnioBisiesto(2100) === false,
    "Desafío 1: 2100 NO es bisiesto (divisible entre 100 pero no entre 400)"
  );

  // Prueba de validación de entrada inválida en Desafío 1
  let errorAnioInvalidoCapturado = false;
  try {
    esAnioBisiesto(-2024);
  } catch (err) {
    errorAnioInvalidoCapturado = true;
  }
  verificarPrueba(
    errorAnioInvalidoCapturado === true,
    "Desafío 1 (Caso Límite): Rechaza correctamente años negativos o inválidos"
  );

  // --- Pruebas del Desafío 2: Número Mayor en arreglo fijo de 10 números ---
  verificarPrueba(
    encontrarNumeroMayor([15, 42, 8, 99, 23, 4, 77, 56, 31, 64]) === 99,
    "Desafío 2: Encuentra correctamente el 99 en un arreglo de 10 enteros positivos"
  );
  verificarPrueba(
    encontrarNumeroMayor([500, 1, 2, 3, 4, 5, 6, 7, 8, 9]) === 500,
    "Desafío 2: Encuentra el mayor cuando se ubica en la primera posición (índice 0)"
  );
  verificarPrueba(
    encontrarNumeroMayor([1, 2, 3, 4, 5, 6, 7, 8, 9, 1000]) === 1000,
    "Desafío 2: Encuentra el mayor cuando se ubica en la última posición (índice 9)"
  );
  verificarPrueba(
    encontrarNumeroMayor([-45, -12, -89, -3, -27, -64, -100, -5, -19, -50]) === -3,
    "Desafío 2 (Caso Límite): Funciona correctamente cuando los 10 números son negativos (-3)"
  );

  // Prueba de validación de longitud distinta de 10 en Desafío 2
  let errorLongitudCapturado = false;
  try {
    encontrarNumeroMayor([1, 2, 3]);
  } catch (err) {
    errorLongitudCapturado = true;
  }
  verificarPrueba(
    errorLongitudCapturado === true,
    "Desafío 2 (Caso Límite): Exige estrictamente que el arreglo tenga 10 elementos"
  );

  // --- Pruebas del Desafío 3: Juego de Adivinar el Número Secreto ---
  const juegoPruebaPistas = crearJuegoAdivinaNumero({ numeroSecreto: 50, maxIntentos: 5 });
  const r1 = juegoPruebaPistas.realizarIntento(25);
  verificarPrueba(
    r1.pista === "El número es más alto" && r1.ganado === false && r1.intentosRestantes === 4,
    'Desafío 3: Cuando el intento (25) es menor al secreto (50), devuelve "El número es más alto"'
  );

  const r2 = juegoPruebaPistas.realizarIntento(75);
  verificarPrueba(
    r2.pista === "El número es más bajo" && r2.ganado === false && r2.intentosRestantes === 3,
    'Desafío 3: Cuando el intento (75) es mayor al secreto (50), devuelve "El número es más bajo"'
  );

  const r3 = juegoPruebaPistas.realizarIntento(50);
  verificarPrueba(
    r3.ganado === true && r3.juegoTerminado === true && r3.estado === "GANADO",
    "Desafío 3: Cuando el jugador adivina el número (50), marca la partida como GANADA y terminada"
  );

  // Prueba de límite de 5 intentos agotados
  const partidaPerdida = simularPartidaAdivinaNumero([1, 2, 3, 4, 5, 88], 88);
  verificarPrueba(
    partidaPerdida.ganado === false &&
      partidaPerdida.intentosUsados === 5 &&
      partidaPerdida.intentosRestantes === 0,
    "Desafío 3 (Caso Límite): Limita estrictamente la partida a 5 intentos (ignora un 6to intento)"
  );

  // Prueba de generación aleatoria dentro de rango
  const juegoAzar = crearJuegoAdivinaNumero({ min: 1, max: 100 });
  const secretoGenerado = juegoAzar.obtenerEstado().numeroSecreto;
  verificarPrueba(
    Number.isInteger(secretoGenerado) && secretoGenerado >= 1 && secretoGenerado <= 100,
    "Desafío 3: El generador aleatorio produce un número entero válido dentro del rango [1, 100]"
  );

  // Resumen final de QA en consola
  console.log(
    `\n  ${ESTILOS_CONSOLA.negrita}Resumen de QA:${ESTILOS_CONSOLA.reset} ${pruebasExitosas}/${totalPruebas} pruebas superadas exitosamente.\n`
  );
}

// Ejecutamos automáticamente la demostración y la suite de pruebas al correr el archivo con Node.js
ejecutarDemostracionYPruebasQA();

// Exportamos las funciones por si se requiere importarlas desde otros módulos de prueba
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    esAnioBisiesto,
    encontrarNumeroMayor,
    generarNumeroSecretoAzar,
    crearJuegoAdivinaNumero,
    simularPartidaAdivinaNumero
  };
}

// ============================================================================
// CAPA DE INTEGRACIÓN DOM (NAVEGADOR): CONTROLADORES DE EVENTOS Y ESTADO UI
// ============================================================================

/**
 * Inicializa todos los escuchadores de eventos (Event Listeners) y el estado
 * interactivo cuando el archivo `taller-algoritmos.js` se carga en un navegador web.
 * Mantiene desacoplada e intacta la lógica algorítmica de los 3 desafíos.
 */
function inicializarInterfazDOM() {
  // Verificamos que estemos en un entorno de navegador con acceso al DOM
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  // --------------------------------------------------------------------------
  // 0. Gestión del Tema Visual (Modo Claro / Modo Oscuro)
  // --------------------------------------------------------------------------
  const btnTema = document.getElementById("btn-tema");
  const iconoTema = document.getElementById("icono-tema");
  const textoTema = document.getElementById("texto-tema");

  function aplicarTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    try {
      localStorage.setItem("taller_algoritmos_tema", tema);
    } catch (_) {
      // Ignorar si localStorage está restringido
    }
    if (iconoTema && textoTema) {
      if (tema === "dark") {
        iconoTema.textContent = "☀️";
        textoTema.textContent = "Modo Claro";
      } else {
        iconoTema.textContent = "🌙";
        textoTema.textContent = "Modo Oscuro";
      }
    }
  }

  // Recuperar tema guardado o usar preferencia del sistema
  let temaInicial = "dark";
  try {
    const guardado = localStorage.getItem("taller_algoritmos_tema");
    if (guardado === "light" || guardado === "dark") {
      temaInicial = guardado;
    }
  } catch (_) {}
  aplicarTema(temaInicial);

  if (btnTema) {
    btnTema.addEventListener("click", () => {
      const actual = document.documentElement.getAttribute("data-theme") || "dark";
      aplicarTema(actual === "dark" ? "light" : "dark");
    });
  }

  // --------------------------------------------------------------------------
  // 1. Interacción DOM para DESAFÍO 1: Año Bisiesto
  // --------------------------------------------------------------------------
  const formBisiesto = document.getElementById("form-bisiesto");
  const inputAnio = document.getElementById("input-anio");
  const resultadoBisiesto = document.getElementById("resultado-bisiesto");
  const chipsAnio = document.querySelectorAll(".chip-anio");

  /**
   * Procesa el año ingresado en la interfaz, invoca `esAnioBisiesto(anio)`
   * y actualiza el contenedor visual con la explicación matemática.
   */
  function manejarEvaluacionAnio(valorCrudo) {
    if (!resultadoBisiesto) return;

    const texto = String(valorCrudo).trim();
    if (texto === "") {
      mostrarMensajeUI(
        resultadoBisiesto,
        "error",
        "Por favor, ingresa un año válido para realizar la evaluación."
      );
      return;
    }

    const anioNumero = Number(texto);

    try {
      // Llamada directa a la función algorítmica del Desafío 1
      const esBisiesto = esAnioBisiesto(anioNumero);

      // Explicación detallada del porqué para enriquecer la retroalimentación
      let detalleRegla = "";
      if (anioNumero % 400 === 0) {
        detalleRegla = `Es divisible entre 400 (${anioNumero} ÷ 400 = ${anioNumero / 400}), por lo que es un año secular bisiesto.`;
      } else if (anioNumero % 100 === 0) {
        detalleRegla = `Es divisible entre 100 pero NO entre 400, por lo que según la regla gregoriana NO es bisiesto.`;
      } else if (anioNumero % 4 === 0) {
        detalleRegla = `Es divisible exactamente entre 4 (${anioNumero} ÷ 4 = ${anioNumero / 4}) y no es secular, por lo tanto es bisiesto.`;
      } else {
        detalleRegla = `No es divisible exactamente entre 4 (residuo: ${anioNumero % 4}), por lo que es un año común de 365 días.`;
      }

      if (esBisiesto) {
        mostrarMensajeUI(
          resultadoBisiesto,
          "exito",
          `✔ El año <strong>${anioNumero}</strong> <strong>SÍ es bisiesto</strong> (366 días).<br><small>${detalleRegla}</small>`
        );
      } else {
        mostrarMensajeUI(
          resultadoBisiesto,
          "alerta",
          `✖ El año <strong>${anioNumero}</strong> <strong>NO es bisiesto</strong> (365 días).<br><small>${detalleRegla}</small>`
        );
      }
    } catch (error) {
      mostrarMensajeUI(resultadoBisiesto, "error", `⚠ ${error.message}`);
    }
  }

  if (formBisiesto && inputAnio) {
    formBisiesto.addEventListener("submit", (evento) => {
      evento.preventDefault();
      manejarEvaluacionAnio(inputAnio.value);
    });
  }

  // Botones de prueba rápida para el Desafío 1
  chipsAnio.forEach((chip) => {
    chip.addEventListener("click", () => {
      const anioEjemplo = chip.getAttribute("data-anio");
      if (inputAnio && anioEjemplo) {
        inputAnio.value = anioEjemplo;
        manejarEvaluacionAnio(anioEjemplo);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. Interacción DOM para DESAFÍO 2: Número Mayor en arreglo fijo de 10
  // --------------------------------------------------------------------------
  const formMayor = document.getElementById("form-mayor");
  const inputsArreglo = document.querySelectorAll(".input-numero-arreglo");
  const resultadoMayor = document.getElementById("resultado-mayor");
  const btnLlenarAleatorio = document.getElementById("btn-llenar-aleatorio");
  const btnLlenarNegativos = document.getElementById("btn-llenar-negativos");
  const btnLimpiarArreglo = document.getElementById("btn-limpiar-arreglo");

  /**
   * Limpia el resaltado visual de las 10 casillas de números.
   */
  function limpiarResaltadoCasillas() {
    inputsArreglo.forEach((input) => {
      input.classList.remove("input-destacado-mayor");
      if (input.parentElement) {
        input.parentElement.classList.remove("casilla-destacada-mayor");
      }
    });
  }

  /**
   * Lee los 10 inputs del DOM, construye el arreglo fijo de 10 números,
   * invoca `encontrarNumeroMayor(arreglo)` y resalta el mayor en pantalla.
   */
  function manejarBusquedaMayor() {
    if (!resultadoMayor) return;
    limpiarResaltadoCasillas();

    const arregloNumeros = [];
    for (let i = 0; i < inputsArreglo.length; i++) {
      const valorTexto = inputsArreglo[i].value.trim();
      if (valorTexto === "") {
        mostrarMensajeUI(
          resultadoMayor,
          "error",
          `⚠ Falta ingresar un número en la casilla <strong>#${i + 1}</strong>. Debes completar los 10 números.`
        );
        inputsArreglo[i].focus();
        return;
      }
      arregloNumeros.push(Number(valorTexto));
    }

    try {
      // Llamada directa a la función algorítmica del Desafío 2
      const mayor = encontrarNumeroMayor(arregloNumeros);

      // Identificar en qué posiciones aparece el número mayor para resaltarlo en la UI
      const posicionesMayor = [];
      inputsArreglo.forEach((input, idx) => {
        if (Number(input.value) === mayor) {
          posicionesMayor.push(`#${idx + 1} (índice ${idx})`);
          input.classList.add("input-destacado-mayor");
          if (input.parentElement) {
            input.parentElement.classList.add("casilla-destacada-mayor");
          }
        }
      });

      mostrarMensajeUI(
        resultadoMayor,
        "exito",
        `🏆 El número más grande del arreglo es <strong>${mayor}</strong>.<br>` +
          `<small>Arreglo evaluado: [${arregloNumeros.join(", ")}] — Ubicado en casilla(s): ${posicionesMayor.join(", ")}.</small>`
      );
    } catch (error) {
      mostrarMensajeUI(resultadoMayor, "error", `⚠ ${error.message}`);
    }
  }

  if (formMayor) {
    formMayor.addEventListener("submit", (evento) => {
      evento.preventDefault();
      manejarBusquedaMayor();
    });
  }

  if (btnLlenarAleatorio) {
    btnLlenarAleatorio.addEventListener("click", () => {
      limpiarResaltadoCasillas();
      inputsArreglo.forEach((input) => {
        // Genera números aleatorios entre -20 y 150
        input.value = String(generarNumeroSecretoAzar(-20, 150));
      });
      manejarBusquedaMayor();
    });
  }

  if (btnLlenarNegativos) {
    btnLlenarNegativos.addEventListener("click", () => {
      limpiarResaltadoCasillas();
      const negativosEjemplo = [-45, -12, -89, -3, -27, -64, -100, -5, -19, -50];
      inputsArreglo.forEach((input, idx) => {
        input.value = String(negativosEjemplo[idx]);
      });
      manejarBusquedaMayor();
    });
  }

  if (btnLimpiarArreglo) {
    btnLimpiarArreglo.addEventListener("click", () => {
      limpiarResaltadoCasillas();
      inputsArreglo.forEach((input) => {
        input.value = "";
      });
      if (resultadoMayor) {
        mostrarMensajeUI(
          resultadoMayor,
          "info",
          "Ingresa 10 números en las casillas o usa un botón de autocompletado para encontrar el mayor."
        );
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Interacción DOM para DESAFÍO 3: Juego de Adivinar el Número Secreto
  // --------------------------------------------------------------------------
  const formAdivina = document.getElementById("form-adivina");
  const inputIntento = document.getElementById("input-intento");
  const btnIntentar = document.getElementById("btn-intentar");
  const btnReiniciarJuego = document.getElementById("btn-reiniciar-juego");
  const spanIntentosRestantes = document.getElementById("intentos-restantes");
  const contenedorIndicadores = document.getElementById("indicadores-intentos");
  const resultadoAdivina = document.getElementById("resultado-adivina");
  const listaHistorial = document.getElementById("historial-intentos");

  // Instancia activa del juego creada mediante la función de Backend `crearJuegoAdivinaNumero`
  let partidaActiva = crearJuegoAdivinaNumero({ min: 1, max: 100, maxIntentos: 5 });

  /**
   * Actualiza los indicadores gráficos de vidas/intentos y la lista de historial en el DOM.
   */
  function sincronizarEstadoJuegoUI() {
    const estado = partidaActiva.obtenerEstado();

    if (spanIntentosRestantes) {
      spanIntentosRestantes.textContent = String(estado.intentosRestantes);
    }

    // Renderizar las 5 esferas/píldoras de intentos
    if (contenedorIndicadores) {
      contenedorIndicadores.innerHTML = "";
      for (let i = 0; i < estado.maxIntentos; i++) {
        const badge = document.createElement("span");
        badge.className = "indicador-vida";
        if (i < estado.intentosRealizados) {
          const valorJugado = estado.historialIntentos[i];
          if (valorJugado === estado.numeroSecreto) {
            badge.classList.add("vida-acierto");
            badge.textContent = `✔ ${valorJugado}`;
          } else {
            badge.classList.add("vida-usada");
            badge.textContent = `✖ ${valorJugado}`;
          }
        } else {
          badge.classList.add("vida-disponible");
          badge.textContent = `Intento ${i + 1}`;
        }
        contenedorIndicadores.appendChild(badge);
      }
    }

    // Bloquear o habilitar el input y botón según si el juego terminó
    if (inputIntento && btnIntentar) {
      inputIntento.disabled = estado.juegoTerminado;
      btnIntentar.disabled = estado.juegoTerminado;
    }
  }

  /**
   * Inicia o reinicia una nueva partida eligiendo un nuevo número secreto al azar.
   */
  function iniciarNuevaPartidaUI() {
    partidaActiva = crearJuegoAdivinaNumero({ min: 1, max: 100, maxIntentos: 5 });
    if (listaHistorial) {
      listaHistorial.innerHTML = "";
    }
    if (inputIntento) {
      inputIntento.value = "";
      inputIntento.disabled = false;
    }
    if (btnIntentar) {
      btnIntentar.disabled = false;
    }
    sincronizarEstadoJuegoUI();
    if (resultadoAdivina) {
      mostrarMensajeUI(
        resultadoAdivina,
        "info",
        "🎲 La computadora ha elegido un nuevo número secreto entre <strong>1 y 100</strong>. ¡Tienes <strong>5 intentos</strong> para adivinarlo!"
      );
    }
  }

  /**
   * Procesa un intento del usuario desde el formulario del Desafío 3.
   */
  function manejarIntentoJuego() {
    if (!inputIntento || !resultadoAdivina) return;

    const textoIntento = inputIntento.value.trim();
    if (textoIntento === "") {
      mostrarMensajeUI(resultadoAdivina, "error", "⚠ Por favor, escribe un número entero entre 1 y 100.");
      inputIntento.focus();
      return;
    }

    const numeroPropuesto = Number(textoIntento);
    if (!Number.isInteger(numeroPropuesto) || numeroPropuesto < 1 || numeroPropuesto > 100) {
      mostrarMensajeUI(
        resultadoAdivina,
        "error",
        "⚠ El número debe ser un entero dentro del rango de <strong>1 a 100</strong>."
      );
      inputIntento.focus();
      return;
    }

    // Invocamos el método `.realizarIntento()` de la lógica de Backend
    const respuesta = partidaActiva.realizarIntento(numeroPropuesto);
    sincronizarEstadoJuegoUI();

    // Agregar fila al historial visual de turnos
    if (listaHistorial) {
      const item = document.createElement("li");
      item.className = "item-historial";

      let iconoPista = "🔼";
      let claseBadge = "badge-alto";
      if (respuesta.ganado) {
        iconoPista = "🎉";
        claseBadge = "badge-ganado";
      } else if (respuesta.pista === "El número es más bajo") {
        iconoPista = "🔽";
        claseBadge = "badge-bajo";
      }

      item.innerHTML = `
        <span class="historial-turno">Intento #${respuesta.intentoActual}</span>
        <span class="historial-numero">Número jugado: <strong>${respuesta.intentoPropuesto}</strong></span>
        <span class="historial-pista ${claseBadge}">${iconoPista} ${respuesta.pista}</span>
      `;
      listaHistorial.appendChild(item);
    }

    // Mostrar retroalimentación principal en el panel de estado del juego
    if (respuesta.ganado) {
      mostrarMensajeUI(
        resultadoAdivina,
        "exito",
        `🎉 <strong>${respuesta.pista}</strong><br><small>Presiona "Nueva Partida" para volver a jugar con otro número secreto.</small>`
      );
    } else if (respuesta.juegoTerminado) {
      mostrarMensajeUI(
        resultadoAdivina,
        "error",
        `💀 <strong>¡Se agotaron los 5 intentos!</strong> Última pista: "${respuesta.pista}".<br>` +
          `El número secreto de la computadora era <strong>${respuesta.numeroSecreto}</strong>.`
      );
    } else {
      const flecha = respuesta.pista === "El número es más alto" ? "⬆️" : "⬇️";
      mostrarMensajeUI(
        resultadoAdivina,
        "alerta",
        `${flecha} Pista: <strong>"${respuesta.pista}"</strong><br>` +
          `<small>Intento #${respuesta.intentoActual} de 5 — Te quedan <strong>${respuesta.intentosRestantes}</strong> intento(s).</small>`
      );
    }

    inputIntento.value = "";
    if (!respuesta.juegoTerminado) {
      inputIntento.focus();
    }
  }

  if (formAdivina) {
    formAdivina.addEventListener("submit", (evento) => {
      evento.preventDefault();
      manejarIntentoJuego();
    });
  }

  if (btnReiniciarJuego) {
    btnReiniciarJuego.addEventListener("click", () => {
      iniciarNuevaPartidaUI();
    });
  }

  // Inicializar estado visual del juego al cargar la página
  sincronizarEstadoJuegoUI();
}

/**
 * Función utilitaria para actualizar un contenedor de retroalimentación visual en el DOM.
 *
 * @param {HTMLElement} elemento - Contenedor DOM donde se mostrará el mensaje.
 * @param {"exito"|"alerta"|"error"|"info"} tipo - Categoría visual del estado.
 * @param {string} contenidoHTML - Mensaje formateado a mostrar.
 */
function mostrarMensajeUI(elemento, tipo, contenidoHTML) {
  elemento.className = `panel-resultado estado-${tipo}`;
  elemento.innerHTML = contenidoHTML;
}

// Si estamos en el navegador, inicializamos la interfaz gráfica cuando el DOM esté listo
if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarInterfazDOM);
  } else {
    inicializarInterfazDOM();
  }
}

import { diaDelAnio, formatearFechaDesdeDia } from './utils.js';
import { actualizarGrafico } from './grafico.js';

// Array que almacena los datos ingresados, cada uno con formato { dia, consumo }
export let datos = [];

// Índice que indica el dato que está siendo editado actualmente; null si no hay edición en curso
export let indiceEditando = null;

/**
 * Agrega un nuevo dato o edita uno existente según el estado de `indiceEditando`.
 * Convierte la fecha recibida a día del año para facilitar manejo y orden.
 * - Si se está editando un dato, verifica que no exista otro con el mismo día para evitar duplicados.
 * - Si se agrega uno nuevo, también verifica duplicados por día.
 *
 * @param {Date} fecha - Fecha del dato a agregar/editar.
 * @param {number} consumo - Valor de consumo asociado a la fecha.
 * @throws {Error} Si se detecta un duplicado (mismo día en otro dato).
 * @returns {string} "editado" si se editó un dato, "nuevo" si se agregó uno nuevo.
 */
export function agregarDato(fecha, consumo) {
  const dia = diaDelAnio(fecha); // Convierte fecha a número de día en el año

  if (indiceEditando !== null) { // Estamos editando un dato existente
    // Verificar si existe duplicado en otro índice distinto al que editamos
    const duplicado = datos.some((d, i) => i !== indiceEditando && d.dia === dia);
    if (duplicado) throw new Error("Duplicado"); // Evita duplicados por día
    datos[indiceEditando] = { dia, consumo }; // Reemplaza el dato editado
    indiceEditando = null; // Resetear estado de edición
    return "editado";
  } else { // Se agrega un dato nuevo
    // Verificar duplicado en toda la lista
    if (datos.some(d => d.dia === dia)) throw new Error("Duplicado");
    datos.push({ dia, consumo }); // Agregar nuevo dato
    return "nuevo";
  }
}

/**
 * Marca un dato para edición, estableciendo el índice correspondiente.
 * Devuelve el dato que se va a editar.
 * @param {number} index - Índice del dato a editar en el arreglo `datos`.
 * @returns {Object} El dato seleccionado para editar.
 */
export function editarDato(index) {
  indiceEditando = index;
  return datos[index];
}

/**
 * Elimina un dato del arreglo según el índice.
 * @param {number} index - Índice del dato a eliminar.
 */
export function eliminarDato(index) {
  datos.splice(index, 1);
}

/**
 * Devuelve los datos ordenados de menor a mayor según el día del año.
 * Esto es útil para graficar o mostrar en orden cronológico.
 * @returns {Array} Arreglo de datos ordenados por día.
 */
export function obtenerDatosOrdenados() {
  return datos.sort((a, b) => a.dia - b.dia);
}

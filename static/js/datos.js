

import { diaDelAnio, formatearFechaDesdeDia } from './utils.js';
import { actualizarGrafico } from './grafico.js';

export let datos = [];
export let indiceEditando = null;

export function agregarDato(fecha, consumo) {
  const dia = diaDelAnio(fecha);

  if (indiceEditando !== null) {
    const duplicado = datos.some((d, i) => i !== indiceEditando && d.dia === dia);
    if (duplicado) throw new Error("Duplicado");
    datos[indiceEditando] = { dia, consumo };
    indiceEditando = null;
    return "editado";
  } else {
    if (datos.some(d => d.dia === dia)) throw new Error("Duplicado");
    datos.push({ dia, consumo });
    return "nuevo";
  }
}

export function editarDato(index) {
  indiceEditando = index;
  return datos[index];
}

export function eliminarDato(index) {
  datos.splice(index, 1);
}

export function obtenerDatosOrdenados() {
  return datos.sort((a, b) => a.dia - b.dia);
}

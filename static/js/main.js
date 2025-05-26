import { agregarDato, editarDato, eliminarDato, obtenerDatosOrdenados, indiceEditando } from './datos.js';
import { diaDelAnio, formatearFechaDesdeDia } from './utils.js';
import { actualizarGrafico } from './grafico.js';

/**
 * Actualiza la tabla HTML con los datos ordenados y refresca el gráfico.
 * Reemplaza el contenido del tbody con filas generadas dinámicamente.
 */
function actualizarTabla() {
  const tbody = document.querySelector("#tablaDatos tbody");
  const datos = obtenerDatosOrdenados();

  // Construye las filas de la tabla con botones para editar y eliminar
  tbody.innerHTML = datos.map((d, i) => `
    <tr>
      <td>${d.dia}</td>
      <td>${d.consumo}</td>
      <td>
        <button onclick="window.handleEditar(${i})">Editar</button>
        <button onclick="window.handleEliminar(${i})">Eliminar</button>
      </td>
    </tr>
  `).join('');
  actualizarGrafico(datos); // Actualiza el gráfico con los datos actuales
}

/**
 * Maneja la acción de editar un dato.
 * Llena el formulario con los datos seleccionados y cambia el botón para guardar cambios.
 * @param {number} index - Índice del dato a editar.
 */
window.handleEditar = (index) => {
  const d = editarDato(index);
  const fechaStr = formatearFechaDesdeDia(d.dia); // Convierte día del año a fecha legible
  document.getElementById("fechaDato").value = fechaStr;
  document.getElementById("consumoDato").value = d.consumo;
  document.querySelector("button[onclick='agregar()']").textContent = "Guardar Cambios";
};

/**
 * Maneja la acción de eliminar un dato.
 * Confirma con el usuario antes de eliminar y luego actualiza la tabla.
 * @param {number} index - Índice del dato a eliminar.
 */
window.handleEliminar = (index) => {
  if (confirm("¿Eliminar este dato?")) {
    eliminarDato(index);
    actualizarTabla();
  }
};

/**
 * Agrega un dato nuevo o guarda los cambios en uno existente.
 * Valida los campos, llama a la función de agregarDato y actualiza la tabla y el botón.
 */
window.agregar = () => {
  const fecha = document.getElementById("fechaDato").value;
  const consumo = parseFloat(document.getElementById("consumoDato").value);
  if (!fecha || isNaN(consumo)) return alert("Campos inválidos");

  try {
    const tipo = agregarDato(fecha, consumo);
    // Limpia el formulario y restaura el texto del botón
    document.getElementById("fechaDato").value = "";
    document.getElementById("consumoDato").value = "";
    document.querySelector("button[onclick='agregar()']").textContent = "Agregar";
    actualizarTabla();
    alert(tipo === "nuevo" ? "Dato agregado" : "Dato editado");
  } catch (e) {
    alert("Ya existe un dato para ese día");
  }
};

/**
 * Solicita una estimación para el consumo de una fecha dada.
 * Envía los datos actuales y la fecha a estimar al backend via fetch.
 * Muestra el resultado o un mensaje de error, y actualiza el gráfico incluyendo el punto estimado.
 */
window.estimar = async () => {
  const fecha = document.getElementById("fechaEstimacion").value;
  const datos = obtenerDatosOrdenados();
  if (!fecha || datos.length < 2) return alert("Datos insuficientes");

  const x = diaDelAnio(fecha);
  const X = datos.map(d => d.dia), Y = datos.map(d => d.consumo);

  try {
    const res = await fetch("http://localhost:5000/interpolate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, X, Y })
    });

    const data = await res.json();
    if (!res.ok || data.resultado === undefined) {
      document.getElementById("resultado").textContent = "No se pudo estimar.";
      return actualizarGrafico(datos);
    }

    document.getElementById("resultado").textContent =
      `Consumo estimado para el día ${x}: ${data.resultado.toFixed(2)} kWh`;
    actualizarGrafico(datos, { x, y: data.resultado });

  } catch (e) {
    document.getElementById("resultado").textContent = "Error en la estimación.";
  }
};

// Inicializa la tabla al cargar el DOM
document.addEventListener("DOMContentLoaded", actualizarTabla);

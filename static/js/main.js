

import { agregarDato, editarDato, eliminarDato, obtenerDatosOrdenados, indiceEditando } from './datos.js';
import { diaDelAnio, formatearFechaDesdeDia } from './utils.js';
import { actualizarGrafico } from './grafico.js';

function actualizarTabla() {
  const tbody = document.querySelector("#tablaDatos tbody");
  const datos = obtenerDatosOrdenados();

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
  actualizarGrafico(datos);
}

window.handleEditar = (index) => {
  const d = editarDato(index);
  const fechaStr = formatearFechaDesdeDia(d.dia);
  document.getElementById("fechaDato").value = fechaStr;
  document.getElementById("consumoDato").value = d.consumo;
  document.querySelector("button[onclick='agregar()']").textContent = "Guardar Cambios";
};

window.handleEliminar = (index) => {
  if (confirm("¿Eliminar este dato?")) {
    eliminarDato(index);
    actualizarTabla();
  }
};

window.agregar = () => {
  const fecha = document.getElementById("fechaDato").value;
  const consumo = parseFloat(document.getElementById("consumoDato").value);
  if (!fecha || isNaN(consumo)) return alert("Campos inválidos");

  try {
    const tipo = agregarDato(fecha, consumo);
    document.getElementById("fechaDato").value = "";
    document.getElementById("consumoDato").value = "";
    document.querySelector("button[onclick='agregar()']").textContent = "Agregar";
    actualizarTabla();
    alert(tipo === "nuevo" ? "Dato agregado" : "Dato editado");
  } catch (e) {
    alert("Ya existe un dato para ese día");
  }
};

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

document.addEventListener("DOMContentLoaded", actualizarTabla);

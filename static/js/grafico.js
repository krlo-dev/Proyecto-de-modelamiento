// Variable para almacenar la instancia actual del gráfico Chart.js
let chart = null;

/**
 * Actualiza el gráfico de consumo en la página.
 * - Mapea los datos recibidos para usarlos como puntos en el gráfico.
 * - Dibuja los datos reales como una línea continua.
 * - Si se recibe un valor estimado, lo agrega como un punto destacado.
 * - Si ya existe un gráfico previo, lo destruye antes de crear uno nuevo para evitar duplicados.
 *
 * @param {Array} datos - Array de objetos con formato { dia, consumo } para graficar.
 * @param {Object|null} estimado - Objeto con punto estimado, o null si no hay estimado.
 */
export function actualizarGrafico(datos, estimado = null) {
  // Obtiene el contexto del canvas para dibujar el gráfico
  const ctx = document.getElementById("graficoConsumo").getContext("2d");

  // Convierte los datos a puntos con propiedades x e y para el gráfico
  const puntos = datos.map(d => ({ x: d.dia, y: d.consumo }));

  // Configuración inicial del dataset para los datos reales
  const datasets = [
    {
      label: 'Datos',
      data: puntos,
      borderColor: '#ff8c00',      // Color línea y puntos
      backgroundColor: '#ff8c00',  // Color relleno de puntos
      tension: 0,                  // Sin curvatura en la línea (línea recta)
      pointRadius: 5,              // Tamaño del punto
      fill: false,                 // Sin relleno bajo la línea
      order: 1                    // Orden de renderizado (para sobreposición)
    }
  ];

  // Si se pasa un punto estimado, se agrega como un punto destacado en el gráfico
  if (estimado) {
    datasets.push({
      label: 'Estimado',
      data: [estimado],
      backgroundColor: '#163157',
      borderColor: '#163157',
      pointRadius: 8,        // Punto más grande para destacar
      pointStyle: 'circle',
      showLine: false,       // No conectar con línea
      order: 0               // Se dibuja antes que los datos reales (debajo)
    });
  }

  // Si ya existe un gráfico previamente creado, se destruye para refrescarlo
  if (chart) chart.destroy();

  // Crea un nuevo gráfico de tipo línea con las configuraciones dadas
  chart = new Chart(ctx, {
    type: 'line',
    data: { datasets },
    options: {
      responsive: true,  // Se adapta a tamaño del contenedor
      scales: {
        x: {
          type: 'linear',              // Escala numérica para eje X (día del año)
          title: { display: true, text: 'Día del Año' }
        },
        y: {
          title: { display: true, text: 'Consumo (kWh)' }
        }
      },
      plugins: {
        legend: { labels: { usePointStyle: true } }  // Leyenda con iconos de punto
      }
    }
  });
}



let chart = null;

export function actualizarGrafico(datos, estimado = null) {
  const ctx = document.getElementById("graficoConsumo").getContext("2d");
  const puntos = datos.map(d => ({ x: d.dia, y: d.consumo }));

  const datasets = [
    {
      label: 'Datos',
      data: puntos,
      borderColor: '#ff8c00',
      backgroundColor: '#ff8c00',
      tension: 0,
      pointRadius: 5,
      fill: false,
      order: 1
    }
  ];

  if (estimado) {
    datasets.push({
      label: 'Estimado',
      data: [estimado],
      backgroundColor: '#163157',
      borderColor: '#163157',
      pointRadius: 8,
      pointStyle: 'circle',
      showLine: false,
      order: 0
    });
  }

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: { datasets },
    options: {
      responsive: true,
      scales: {
        x: { type: 'linear', title: { display: true, text: 'Día del Año' } },
        y: { title: { display: true, text: 'Consumo (kWh)' } }
      },
      plugins: {
        legend: { labels: { usePointStyle: true } }
      }
    }
  });
}

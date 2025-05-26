/**
 * Convierte una fecha en formato string (YYYY-MM-DD) al número del día del año.
 * Ejemplo: '2025-01-01' => 1, '2025-12-31' => 365 (o 366 en años bisiestos).
 * @param {string} f - Fecha en formato 'YYYY-MM-DD'.
 * @returns {number} Día del año correspondiente (1 a 365/366).
 */
export const diaDelAnio = (f) => {
  const d = new Date(f + "T00:00:00"); // Crear objeto Date con hora 00:00 para evitar problemas zona horaria
  const ini = new Date(d.getFullYear(), 0, 1); // Primer día del año (1 de enero)
  // Diferencia en milisegundos, convertida a días, y sumando 1 para contar desde el día 1
  return Math.floor((d - ini) / (1000 * 60 * 60 * 24)) + 1;
};

/**
 * Convierte un número de día del año a una fecha en formato ISO (YYYY-MM-DD).
 * Considera el año 2025 como base fija.
 * @param {number} dia - Número de día del año (1 a 365).
 * @returns {string} Fecha en formato 'YYYY-MM-DD'.
 */
export const formatearFechaDesdeDia = (dia) => {
  // Calcula la fecha sumando (dia-1) días al 1 de enero de 2025
  const fecha = new Date(new Date(2025, 0, 1).getTime() + (dia - 1) * 86400000);
  return fecha.toISOString().split('T')[0]; // Devuelve solo la parte fecha ISO sin hora
};

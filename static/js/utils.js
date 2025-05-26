

export const diaDelAnio = (f) => {
  const d = new Date(f + "T00:00:00"), ini = new Date(d.getFullYear(), 0, 1);
  return Math.floor((d - ini) / (1000 * 60 * 60 * 24)) + 1;
};

export const formatearFechaDesdeDia = (dia) => {
  const fecha = new Date(new Date(2025, 0, 1).getTime() + (dia - 1) * 86400000);
  return fecha.toISOString().split('T')[0];
};

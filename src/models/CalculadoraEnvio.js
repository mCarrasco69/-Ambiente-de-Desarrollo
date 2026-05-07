const dayjs = require("dayjs");

function calcularEnvio(envio, condiciones) {
  const librasExcedentes = Math.max(0, envio.pesoLb - condiciones.limitePesoSinRecargo);
  const kmExcedentes = Math.max(0, envio.distanciaKm - condiciones.limiteDistanciaSinRecargo);

  const recargoPeso = librasExcedentes * condiciones.recargoPorLibraExcedente;
  const recargoDistancia = kmExcedentes * condiciones.recargoPorKmExcedente;
  const costoTotal = condiciones.costoBase + recargoPeso + recargoDistancia;

  const diasTransporte = Math.ceil(envio.distanciaKm / condiciones.kmPorDiaTransporte);
  const diasTotalesEntrega = condiciones.diasProcesamiento + diasTransporte;
  const fechaEntregaEstimada = dayjs().add(diasTotalesEntrega, "day").format("YYYY-MM-DD");

  return {
    ...envio,
    librasExcedentes,
    kmExcedentes,
    recargoPeso,
    recargoDistancia,
    costoTotal,
    diasTransporte,
    diasTotalesEntrega,
    fechaEntregaEstimada,
  };
}

module.exports = { calcularEnvio };

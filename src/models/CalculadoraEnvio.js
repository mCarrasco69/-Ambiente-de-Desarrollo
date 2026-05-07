const dayjs = require("dayjs");

const Envio = {
  pesoLb: 8,
  distanciaKm: 260,
};

const CondicionesEnvio = {
  costoBase: 50,
  limitePesoSinRecargo: 5,
  recargoPorLibraExcedente: 20,
  limiteDistanciaSinRecargo: 50,
  recargoPorKmExcedente: 10,
  diasProcesamiento: 2,
  kmPorDiaTransporte: 100,
};

function CalculadoraEnvio
(Envio,condiciones) {
  const librasExcedentes = Math.max(0, Envio.pesoLb -condiciones.limitePesoSinRecargo);
  const kmExcedentes = Math.max(0, Envio.distanciaKm -condiciones.limiteDistanciaSinRecargo);

  const recargoPeso = librasExcedentes *condiciones.recargoPorLibraExcedente;
  const recargoDistancia = kmExcedentes *condiciones.recargoPorKmExcedente;
  const costoTotal =condiciones.costoBase + recargoPeso + recargoDistancia;

  const diasTransporte = Math.ceil(Envio.distanciaKm /condiciones.kmPorDiaTransporte);
  const diasTotalesEntrega =condiciones.diasProcesamiento + diasTransporte;
  const fechaEntregaEstimada = dayjs().add(diasTotalesEntrega, "day").format("YYYY-MM-DD");

  return {
    ...Envio,
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

module.exports = { Envio, CondicionesEnvio, CalculadoraEnvio
 };

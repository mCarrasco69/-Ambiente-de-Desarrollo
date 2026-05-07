const dayjs = require("dayjs");

function validarNumeroNoNegativo(valor, nombreCampo) {
  if (typeof valor !== "number" || Number.isNaN(valor) || valor < 0) {
    throw new Error(`${nombreCampo} debe ser un numero no negativo.`);
  }
}

function validarEntrada(envio, condiciones) {
  if (!envio || typeof envio !== "object") {
    throw new Error("envio debe ser un objeto.");
  }

  if (!condiciones || typeof condiciones !== "object") {
    throw new Error("condiciones debe ser un objeto.");
  }

  validarNumeroNoNegativo(envio.pesoLb, "pesoLb");
  validarNumeroNoNegativo(envio.distanciaKm, "distanciaKm");
  validarNumeroNoNegativo(condiciones.costoBase, "costoBase");
  validarNumeroNoNegativo(condiciones.limitePesoSinRecargo, "limitePesoSinRecargo");
  validarNumeroNoNegativo(condiciones.recargoPorLibraExcedente, "recargoPorLibraExcedente");
  validarNumeroNoNegativo(condiciones.limiteDistanciaSinRecargo, "limiteDistanciaSinRecargo");
  validarNumeroNoNegativo(condiciones.recargoPorKmExcedente, "recargoPorKmExcedente");
  validarNumeroNoNegativo(condiciones.diasProcesamiento, "diasProcesamiento");
  validarNumeroNoNegativo(condiciones.kmPorDiaTransporte, "kmPorDiaTransporte");

  if (condiciones.kmPorDiaTransporte === 0) {
    throw new Error("kmPorDiaTransporte debe ser mayor que cero.");
  }
}

function calcularEnvio(envio, condiciones) {
  validarEntrada(envio, condiciones);

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

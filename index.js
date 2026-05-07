const { calcularEnvio } = require("./src/models/CalculadoraEnvio");

function formatoMoneda(monto) {
  return `L${monto.toFixed(2)}`;
}

const envio = {
  pesoLb: 8,
  distanciaKm: 260,
};

const condicionesEnvio = {
  costoBase: 50,
  limitePesoSinRecargo: 5,
  recargoPorLibraExcedente: 20,
  limiteDistanciaSinRecargo: 50,
  recargoPorKmExcedente: 10,
  diasProcesamiento: 2,
  kmPorDiaTransporte: 100,
};

const result = calcularEnvio(envio, condicionesEnvio);

console.log("=== Cotizacion de envio ===");
console.log(`Peso del paquete: ${result.pesoLb} lb`);
console.log(`Distancia del envio: ${result.distanciaKm} km`);
console.log("");
console.log("Desglose de costo:");
console.log(`- Costo base: ${formatoMoneda(condicionesEnvio.costoBase)}`);
console.log(
  `- Recargo por peso (${result.librasExcedentes} lb excedentes x L${condicionesEnvio.recargoPorLibraExcedente.toFixed(
    2
  )}): ${formatoMoneda(result.recargoPeso)}`
);
console.log(
  `- Recargo por distancia (${result.kmExcedentes} km excedentes x L${condicionesEnvio.recargoPorKmExcedente.toFixed(
    2
  )}): ${formatoMoneda(result.recargoDistancia)}`
);
console.log(`Costo total de envio: ${formatoMoneda(result.costoTotal)}`);
console.log("");
console.log("Estimacion de entrega:");
console.log(`- Dias de procesamiento: ${condicionesEnvio.diasProcesamiento}`);
console.log(`- Dias de transporte: ${result.diasTransporte}`);
console.log(`- Dias totales: ${result.diasTotalesEntrega}`);
console.log(`- Fecha estimada de entrega: ${result.fechaEntregaEstimada}`);

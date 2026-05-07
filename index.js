const {
  Envio, //CalculadoraEnvio
  CondicionesEnvio,
  CalculadoraEnvio
,
} = require("./src/models/CalculadoraEnvio");

function formatoMoneda(monto) {
  return `L${monto.toFixed(2)}`;
}

const result = CalculadoraEnvio
(Envio, CondicionesEnvio);

console.log("=== Cotizacion de envio ===");
console.log(`Peso del paquete: ${result.pesoLb} lb`);
console.log(`Distancia del envio: ${result.distanciaKm} km`);
console.log("");
console.log("Desglose de costo:");
console.log(`- Costo base: ${formatoMoneda(CondicionesEnvio.costoBase)}`);
console.log(
  `- Recargo por peso (${result.librasExcedentes} lb excedentes x L${CondicionesEnvio.recargoPorLibraExcedente.toFixed(
    2
  )}): ${formatoMoneda(result.recargoPeso)}`
);
console.log(
  `- Recargo por distancia (${result.kmExcedentes} km excedentes x L${CondicionesEnvio.recargoPorKmExcedente.toFixed(
    2
  )}): ${formatoMoneda(result.recargoDistancia)}`
);
console.log(`Costo total de envio: ${formatoMoneda(result.costoTotal)}`);
console.log("");
console.log("Estimacion de entrega:");
console.log(`- Dias de procesamiento: ${CondicionesEnvio.diasProcesamiento}`);
console.log(`- Dias de transporte: ${result.diasTransporte}`);
console.log(`- Dias totales: ${result.diasTotalesEntrega}`);
console.log(`- Fecha estimada de entrega: ${result.fechaEntregaEstimada}`);

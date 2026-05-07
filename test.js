const test = require("node:test");
const assert = require("node:assert/strict");
const { calcularEnvio } = require("./src/models/CalculadoraEnvio");

test("calcula correctamente costo y dias de entrega", () => {
  const envio = { pesoLb: 8, distanciaKm: 260 };
  const condiciones = {
    costoBase: 50,
    limitePesoSinRecargo: 5,
    recargoPorLibraExcedente: 20,
    limiteDistanciaSinRecargo: 50,
    recargoPorKmExcedente: 10,
    diasProcesamiento: 2,
    kmPorDiaTransporte: 100,
  };

  const resultado = calcularEnvio(envio, condiciones);

  assert.equal(resultado.costoTotal, 2210);
  assert.equal(resultado.librasExcedentes, 3);
  assert.equal(resultado.kmExcedentes, 210);
  assert.equal(resultado.diasTransporte, 3);
  assert.equal(resultado.diasTotalesEntrega, 5);
});


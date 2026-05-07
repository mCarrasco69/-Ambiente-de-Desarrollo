const { Envio, CondicionesEnvio, CalculadoraEnvio } = require('./src/models/CalculadoraEnvio');

console.log('Probando CalculadoraEnvio...');
console.log('Envío de ejemplo:', Envio);
console.log('Condiciones:', CondicionesEnvio);

const resultado = CalculadoraEnvio(Envio, CondicionesEnvio);
console.log('Resultado del cálculo:', resultado);
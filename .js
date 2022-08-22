'use strict';

const show_calc = document.getElementById('show_calc');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(show_calc.textContent.replace('.','').replace(',', '.'));
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
};

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        show_calc.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        show_calc.textContent += texto.toLocaleString('BR');
    }
    document.querySelector('#igual').focus();
};

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach((numero) => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(show_calc.textContent.replace('.','').replace(',', '.'));
    }
};
operadores.forEach((operador) =>
    operador.addEventListener('click', selecionarOperador)
);

const ativarIgual = () => {
    calcular();
    operador = undefined;
};
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => (show_calc.textContent = '');
document
    .getElementById('limparDisplay')
    .addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
};
document
    .getElementById('limparCalculo')
    .addEventListener('click', limparCalculo);

const removerUltimoNumero = () =>
    (show_calc.textContent = show_calc.textContent.slice(0, -1));
document
    .getElementById('backspace')
    .addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(show_calc.textContent * -1);
};
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => show_calc.textContent.indexOf(',') !== -1;
const existeValor = () => show_calc.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (novoNumero) {
            atualizarDisplay('0,');
        } else {
            atualizarDisplay(',');
        }
    }
};
document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    0: 'tecla0',
    1: 'tecla1',
    2: 'tecla2',
    3: 'tecla3',
    4: 'tecla4',
    5: 'tecla5',
    6: 'tecla6',
    7: 'tecla7',
    8: 'tecla8',
    9: 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    Enter: 'igual',
    Backspace: 'backspace',
    c: 'limparDisplay',
    Escape: 'limparCalculo',
    ',': 'decimal',
};

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};
document.addEventListener('keydown', mapearTeclado);

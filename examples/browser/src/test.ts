import { FunctionsGraph, Interpreter } from 'math-chart';

let interpreter = new Interpreter();
console.log(interpreter.ExecuteExpression('2+2'));
console.log(interpreter.ExecuteExpression('sqrt(0)'));
window.interpreter = interpreter;

document.addEventListener("DOMContentLoaded", function (event) {
    let graph = new FunctionsGraph();
    graph.SetContainer('testCanvas');
    graph.SetViewport(-5, -5, 1);
    graph.AddFunction('x^2');

    graph.Draw();
});



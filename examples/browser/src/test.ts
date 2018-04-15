import { FunctionsGraph, Interpreter } from 'math-chart';

let interpreter = new Interpreter();
console.log(interpreter.ExecuteExpression('2+2'));

document.addEventListener("DOMContentLoaded", function (event) {
    let graph = new FunctionsGraph();
    graph.SetContainer('testCanvas');

    graph.AddFunction('x+3');
    graph.Draw();
});



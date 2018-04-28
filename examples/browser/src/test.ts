import { FunctionsGraph, Interpreter } from 'math-chart';

let interpreter = new Interpreter();
console.log(interpreter.ExecuteExpression('2+2'));
console.log(interpreter.ExecuteExpression('sqrt(0)'));

document.addEventListener("DOMContentLoaded", function (event) {
    let graph = new FunctionsGraph();
    graph.SetContainer('testCanvas');
    graph.SetViewport(-8, -2, 1);
    graph.AddFunction('x^2');
    graph.Draw();



    let graph2 = new FunctionsGraph();
    graph2.SetContainer('graph2');
    graph2.SetViewport(-4, -3, 1);
    graph2.AddFunction('x^3');
    graph2.AddFunction('sqrt(x+2)');
    graph2.AddFunction('2/x');
    graph2.Draw();

    let graph3 = new FunctionsGraph();
    graph3.SetContainer('graph3');
    graph3.SetViewport(-1, -2, 1);
    graph3.AddFunction('x-3');
    graph3.AddFunction('-x+4');
    graph3.UpdateSettings({canResize: false, canMove: false})
    graph3.Draw();

});



import { FunctionsGraph, Interpreter } from 'math-chart';

let interpreter = new Interpreter();
console.log(interpreter.ExecuteExpression('2+2'));
console.log(interpreter.ExecuteExpression('sqrt(0)'));

document.addEventListener("DOMContentLoaded", function (event) {
    let graph = new FunctionsGraph({});
    graph.SetContainer('testCanvas');
    graph.SetViewport(-8, -2, 1);
    graph.AddFunction('x^2');
    graph.AddFunction('lg(-x)');
    graph.AddFunction('ln(x+3)');
    graph.Draw();



    let graph2 = new FunctionsGraph({});
    graph2.SetContainer('graph2');
    graph2.SetViewport(-4, -3, 1);
    graph2.AddFunction('x^3');
    graph2.AddFunction('sqrt(x+2)');
    graph2.AddFunction('2/x');
    graph2.Draw();

    let graph3 = new FunctionsGraph({ canResize: false, canMove: false });
    graph3.SetContainer('graph3');
    graph3.SetViewport(-1, -2, 1);
    graph3.AddFunction('x-3');
    graph3.AddFunction('-x+4');
    graph3.Draw();

    let graph4 = new FunctionsGraph({ drawGrid: false, drawGridLabels: false });
    graph4.SetContainer('graph4');
    graph4.SetViewport(-1, -2, 1);
    graph4.AddFunction('x^(x-3)');
    graph4.AddFunction('x^4+2x^3-6x^2');
    graph4.Draw();

    let functionColors = [
        '#ad8708',
        '#edbd1e',
        '#ffd64f'
    ];
    let graph5 = new FunctionsGraph(
        {
            functionColors: functionColors,
            labelFont: '12px monospace',
            gridColor: '#c8daf7',
        }
    );
    graph5.SetContainer('graph5');
    graph5.SetViewport(-6, -4, 0.7);
    graph5.AddFunction('x^3-3x^2+1');
    graph5.AddFunction('2^x');
    graph5.AddFunction('sin(x)+x');
    graph5.Draw();

});



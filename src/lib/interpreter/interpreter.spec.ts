import { test } from 'ava';
import { Interpreter } from 'math-chart';

test('Basic single sum expression', t => {
    const interpreter = new Interpreter();
    const result = interpreter.ExecuteExpression("2+2");
    t.is(result, 4);
});

test('Basic single multiply expression', t => {
    const interpreter = new Interpreter();
    const result = interpreter.ExecuteExpression("0.4*0.4").toFixed(2);
    t.is(result, '0.16');
});


test('Basic operation order', t => {
    const interpreter = new Interpreter();
    const result = interpreter.ExecuteExpression("5+5*5-30");
    t.is(result, 0);
});

test('Expression with parenthesis', t => {
    const interpreter = new Interpreter();
    const result = interpreter.ExecuteExpression("(10-13)*(11+2)");
    t.is(result, -39);
});

test('Expression with fraction', t => {
    const interpreter = new Interpreter();
    const result = interpreter.ExecuteExpression("(2+2)/(12/3)");
    t.is(result, 1);
});

test('Expression with square root', t => {
    const interpreter = new Interpreter();
    const result = interpreter.ExecuteExpression("8*sqrt(16)");
    t.is(result, 32);
});

test('Expression with power', t => {
    const interpreter = new Interpreter();
    const result = interpreter.ExecuteExpression("(2^10)/10");
    t.is(result, 102.4);
});

test('Expression with variables', t => {
    const interpreter = new Interpreter();
    const result = interpreter.EvaluateExpression("2x", { x: 2 });
    t.is(result, 4);
});

test('Expression with two variables', t => {
    const interpreter = new Interpreter();
    const result = interpreter.EvaluateExpression("xy", { x: 2, y: 3 });
    t.is(result, 6);
});

test('Expression with polynomial', t => {
    const interpreter = new Interpreter();
    const result = interpreter.EvaluateExpression("2x^2+4x-10", { x: 10 });
    t.is(result, 230);
});

test('Expression with variable inside parenthesis', t => {
    const interpreter = new Interpreter();
    const result = interpreter.EvaluateExpression("2(x+1)", { x: 311 });
    t.is(result, 624);
});

test('Expression with square root of a variable', t => {
    const interpreter = new Interpreter();
    const result = interpreter.EvaluateExpression("sqrt(2x)", { x: 8 });
    t.is(result, 4);
});
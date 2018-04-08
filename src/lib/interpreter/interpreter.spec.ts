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
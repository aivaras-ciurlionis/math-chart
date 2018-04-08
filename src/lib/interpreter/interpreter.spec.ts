import { test } from 'ava';
import { Interpreter } from './interpreter';

test('Basic single sum expression', t => {
    const interpreter = new Interpreter();
    const result = interpreter.ExecuteExpression("2+2");
    t.is(4, 4);
});
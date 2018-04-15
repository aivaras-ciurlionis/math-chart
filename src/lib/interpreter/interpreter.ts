import { IExpression } from "../expressions/IExpression";
import { Parser } from '../parser/Parser';

/**
 * Executes and evaluates expressions
 */
interface IInterpreter {
    /**
     * Parses given string expression to computable expression
     * @param expression A string expression
     * @returns Computable expression
     */
    CreateExpression(expression: string): IExpression;


    /**
     * Executes numerical expression (without variables)
     * @param expression A string expression
     * @returns Numerical result
     */
    ExecuteExpression(expression: string): number;

    /**
     * Executes parsed numerical expression (without variables)
     * @param expression A parsed expression
     * @returns Numerical result
     */
    ExecuteParsedExpression(expression: IExpression): number;

    /**
     * Evaluates string expression result using given variable replacement values
     * @param expression A string expression
     * @param replacementDictionary Variable replacement values: {x: 2, y : 4}
     */
    EvaluateExpression(expression: string, replacementDictionary: any): number;


    /**
     * Evaluates parsed expression result using given variable replacement values
     * @param expression A parsed expression
     * @param replacementDictionary Variable replacement values: {x: 2, y : 4}
     */
    EvaluateParsedExpression(expression: IExpression, replacementDictionary: any): number;
}

class Interpreter implements IInterpreter {
    parser = new Parser();
    /**
     * Parses given string expression to computable expression
     * @param expression A string expression
     * @returns Computable expression
     */
    CreateExpression(expression: string): IExpression {
        return this.parser.Parse(expression);
    }
    /**
     * Executes numerical expression (without variables)
     * @param expression A string expression
     * @returns Numerical result
     */
    ExecuteExpression(expression: string): number {
        const parsedExpression = this.CreateExpression(expression);
        return this.ExecuteParsedExpression(parsedExpression);
    }
    /**
     * Executes parsed numerical expression (without variables)
     * @param expression A parsed expression
     * @returns Numerical result
     */
    ExecuteParsedExpression(expression: IExpression): number {
        return expression.Execute();
    }
    /**
     * Evaluates string expression result using given variable replacement values
     * @param expression A string expression
     * @param replacementDictionary Variable replacement values: {x: 2, y : 4}
     */
    EvaluateExpression(expression: string, replacementDictionary: any): number {
        const parsedExpression = this.CreateExpression(expression);
        return this.EvaluateParsedExpression(parsedExpression, replacementDictionary);
    }
    /**
     * Evaluates parsed expression result using given variable replacement values
     * @param expression A parsed expression
     * @param replacementDictionary Variable replacement values: {x: 2, y : 4}
     */
    EvaluateParsedExpression(expression: IExpression, replacementDictionary: any): number {
        expression = expression.ReplaceVariables(replacementDictionary);
        return expression.Execute();
    }
}

export { IInterpreter, Interpreter };
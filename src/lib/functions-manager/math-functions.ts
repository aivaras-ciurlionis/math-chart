import { IExpression } from '../expressions/IExpression';
import { IInterpreter, Interpreter } from '../interpreter/interpreter';
import GraphFunction from './graph-function';
import FunctionEvaluationResult from './function-evaluation-result';
import FunctionStepEvaluationResult from './function-step-evaluation-result';

interface IFunctionManager {
  /**
   * Adds a new function to a graph
   * @param functionExpression String function expression
   */
  AddFunction(functionExpression: string): void;

  /**
   * Removes a function from a graph by index
   * @param index Function index to remove
   */
  RemoveFunction(index: number): void;

  /**
   * Sets evaluation boundaries for all functions
   * @param start Function evaluation start
   * @param step Function evaluation step
   * @param count Evaluation step count
   */
  SetEvaluationBoundaries(start: number, step: number, count: number);
}

/**
 * Class that manages function values in a graph
 */
class MathFuncions implements IFunctionManager {


  interpreter: IInterpreter;

  /**
   * Original parsed expressions
   */
  Functions: GraphFunction[];
  /**
   * x value at which start evaluations
   */
  EvaluationStart: number;
  /**
   * Functions evaluation step value
   */
  EvaluationStep: number;
  /**
   * Number of evaluation steps
   */
  EvaluationCount: number;

  constructor() {
    this.interpreter = new Interpreter();
  }

  /**
   * Adds a new function to a graph
   * @param functionExpression String function expression
   */
  AddFunction(functionExpression: string): void {
    const parsedExpression = this.interpreter.CreateExpression(functionExpression);
    if (!parsedExpression) {
      throw `Unable to parse a function: ${functionExpression}`;
    }
    this.Functions.push(new GraphFunction(parsedExpression, functionExpression));
  }

  /**
   * Removes a function from a graph by index
   * @param index Function index to remove
   */
  RemoveFunction(index: number): void {
    this.Functions.splice(index, 0);
  }

  /**
   * Sets evaluation boundaries for all functions
   * @param start Function evaluation start
   * @param step Function evaluation step
   * @param count Evaluation step count
   */
  SetEvaluationBoundaries(start: number, step: number, count: number): void {
    this.EvaluationStart = start;
    this.EvaluationStep = step;
    this.EvaluationCount = count;
  }

  /**
   * Evaluates given function value at a given result
   * @param fx Function expression
   * @param x Evaluation point
   */
  EvaluateFunctionAt(fx: IExpression, x: number): FunctionStepEvaluationResult {
    const expression = fx.Clone();
    try {
      let result = this.interpreter.EvaluateParsedExpression(expression, { x });
      return new FunctionStepEvaluationResult(x, result, true);
    }
    catch(e){
      return new FunctionStepEvaluationResult(0, 0, false);
    }
  }

  /**
   * Evaluates a function in a current evaluation boundary
   * @param fx Function expression
   * @returns Function evaluation result
   */
  EvaluateFunction(fx: IExpression, fxString: string): FunctionEvaluationResult {
    let xValue = this.EvaluationStart;
    const results: FunctionStepEvaluationResult[] = [];
    for (var i = 0; i < this.EvaluationCount; i++) {
      const stepEvaluation = this.EvaluateFunctionAt(fx, xValue);
      xValue += this.EvaluationStep;
      results.push(stepEvaluation);
    }
    return new FunctionEvaluationResult(results, fx, fxString);
  }

  /**
   * Evaluates all current functions if they are visible
   * @returns Array of function evaluation results
   */
  EvaluateFunctions(): FunctionEvaluationResult[] {
    const results: FunctionEvaluationResult[] = [];
    this.Functions.forEach(fx => {
      if (fx.IsVisible) {
        const result = this.EvaluateFunction(fx.Function, fx.FunctionString);
        results.push(result);
      }
    });
    return results;
  }

}

export default MathFuncions;
export { IFunctionManager };
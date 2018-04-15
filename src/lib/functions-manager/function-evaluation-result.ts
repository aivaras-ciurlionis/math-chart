import FunctionStepEvaluationResult from "./function-step-evaluation-result";
import { IExpression } from "../expressions/IExpression";

/**
 * Result of a single function evaluation
 */
class FunctionEvaluationResult {
    constructor(results: FunctionStepEvaluationResult[], fx: IExpression, fxString: string) {
        this.Results = results;
        this.Function = fx;
        this.FunctionString = fxString;
    }
    Results: FunctionStepEvaluationResult[];
    Function: IExpression;
    FunctionString: string;
}

export default FunctionEvaluationResult;
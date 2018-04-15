import { IExpression } from "../expressions/IExpression";

/**
 * Representation of a function in a graph
 */
class GraphFunction {
    constructor(fx: IExpression, fxString: string) {
        this.Function = fx;
        this.IsVisible = true;
        this.FunctionString = fxString;
    }
    FunctionString: string;
    Function: IExpression;
    IsVisible: boolean;
};

export default GraphFunction;
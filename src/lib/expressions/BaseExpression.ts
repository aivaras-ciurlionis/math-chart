import { IExpression } from "./IExpression";

/**
 * Base expression that represents any expression with operands
 */
abstract class BaseExpression implements IExpression {
    abstract Operands: IExpression[];
    abstract Arity: number;
    abstract Order: number;

    /**
	 * Executes an expression
	 * @returns Numerical result
	 */
    abstract Execute(): number;

    /**
	 * Replaces variables with given values
	 * @param replacementDictionary Variable values to replace: {x: 2, y: 4}
	 * @returns Expression with numerical values
	 */
    ReplaceVariables(replacementDictionary: any): IExpression {
        this.Operands.forEach((operand, i) => {
            this.Operands[i] = operand.ReplaceVariables(replacementDictionary);
        });
        return this;
    }
}

export { BaseExpression };
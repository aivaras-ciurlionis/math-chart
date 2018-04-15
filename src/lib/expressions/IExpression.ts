/**
 * Base interface for all expressions
 */
interface IExpression {
	Operands: IExpression[];
	Arity: number;
	Order: number;

	/**
	 * Executes an expression
	 * @returns Numerical result
	 */
	Execute(): number;

	/**
	 * Replaces variables with given values
	 * @param replacementDictionary Variable values to replace: {x: 2, y: 4}
	 * @returns Expression with numerical values
	 */
	ReplaceVariables(replacementDictionary: any): IExpression;

	/**
	 * Clones current function
	 */
	Clone() : IExpression;
}

export { IExpression }
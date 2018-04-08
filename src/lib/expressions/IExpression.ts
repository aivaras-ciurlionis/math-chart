/**
 * Base interface for all expressions
 */
interface IExpression {
	Operands: IExpression[];
	Arity: number;
	Order: number;

	Execute(): number;
	ReplaceVariables(replacementDictionary: any): IExpression;
}

export { IExpression }
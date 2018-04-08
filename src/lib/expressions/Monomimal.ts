import { IExpression } from "./IExpression";
import { Variable } from "../models/Variable";

class Monomial implements IExpression {
  Operands: IExpression[];
  Arity: number;
  Order: number;

  Coefficient: number;
  Variables: Variable[] = [];

  constructor(coefficient: number, variableName: string = '') {
    this.Coefficient = coefficient;
    if (variableName) {
      this.Variables = [new Variable(variableName, coefficient)];
    }
  }

  /**
   * Sets given variables to monomial
   * @param variables A list os of variables
   */
  SetVariables(variables: Variable[]) {
    this.Variables = variables;
  }

  /**
   * Evaluates current expression and returns its numerical result.
   * All variables should be replaced with numerical values before execution.
   */
  Execute(): number {
    return this.Coefficient;
  }

  /**
   * Replaces variables with numerical values
   * @param replacementDictionary key value didctionary of variables to be replace
   */
  ReplaceVariables(replacementDictionary: any): IExpression {
    let variablesProduct = 1;
    if (this.Variables.length > 0) {
      this.Variables.forEach(variable => {
        if (replacementDictionary[variable.Name]) {
          variablesProduct *= variable.Evaluate(replacementDictionary[variable.Name]);
        }
      });
    }
    return new Monomial(variablesProduct * this.Coefficient);
  }

}

export { Monomial }
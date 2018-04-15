import { IExpression } from "../IExpression";
import { BaseExpression } from "../BaseExpression";

/**
 * Expression that represents a power of two numbers 2^4
 */
class ExponentExpression extends BaseExpression {
  Operands: IExpression[];
  Arity: number = 2;
  Order: number = 1;

  constructor(left: IExpression, right: IExpression) {
    super();
    this.Operands = [left, right];
  }

  /**
   * @returns A first operand with a power of second
   */
  Execute(): number {
    return Math.pow(this.Operands[0].Execute(), this.Operands[1].Execute());
  }

  Clone() : IExpression {
    return new ExponentExpression(this.Operands[0], this.Operands[1]);
  }

}

export { ExponentExpression };
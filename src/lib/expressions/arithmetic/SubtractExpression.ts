import { IExpression } from "../IExpression";
import { BaseExpression } from "../BaseExpression";

/**
 * Expression that represents a subtraction of two numbers 2-4
 */
class SubtractExpression extends BaseExpression {
  Operands: IExpression[];
  Arity: number = 2;
  Order: number = 3;

  constructor(left: IExpression, right: IExpression) {
    super();
    this.Operands = [left, right];
  }

  /**
   * @returns A difference of operands
   */
  Execute(): number {
    return this.Operands[0].Execute() - this.Operands[1].Execute();
  }

  Clone() : IExpression {
    return new SubtractExpression(this.Operands[0], this.Operands[1]);
  }

}

export { SubtractExpression };
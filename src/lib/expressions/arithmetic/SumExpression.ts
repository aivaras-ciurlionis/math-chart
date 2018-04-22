import { IExpression } from "../IExpression";
import { BaseExpression } from "../BaseExpression";

/**
 * Expression that represents a sum of two numbers 2+4
 */
class SumExpression extends BaseExpression {
  Operands: IExpression[];
  Arity: number = 2;
  Order: number = 3;

  constructor(left: IExpression, right: IExpression) {
    super();
    this.Operands = [left, right];
  }

  /**
   * @returns A sum of operands
   */
  Execute(): number {
    return this.Operands[0].Execute() + this.Operands[1].Execute();
  }

  Clone() : IExpression {
    return new SumExpression(this.Operands[0].Clone(), this.Operands[1].Clone());
  }

}

export { SumExpression };
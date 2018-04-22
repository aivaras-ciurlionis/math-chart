import { IExpression } from "../IExpression";
import { BaseExpression } from "../BaseExpression";

/**
 * Expression that represents a division or a fraction of two numbers 2/4
 */
class DivisionExpression extends BaseExpression {
  Operands: IExpression[];
  Arity: number = 2;
  Order: number = 2

  constructor(left: IExpression, right: IExpression) {
    super();
    this.Operands = [left, right];
  }

  /**
   * @returns A division of operands
   */
  Execute(): number {
    return this.Operands[0].Execute() / this.Operands[1].Execute();
  }

  Clone(): IExpression {
    return new DivisionExpression(this.Operands[0].Clone(), this.Operands[1].Clone());
  }

}

export { DivisionExpression };
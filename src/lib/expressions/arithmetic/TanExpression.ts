import { IExpression } from "../IExpression";
import { BaseExpression } from "../BaseExpression";

/**
 * Expression that represents a square root of two numbers sqrt(4)
 */
class TanExpression extends BaseExpression {
  Operands: IExpression[];
  Arity: number = 1;
  Order: number = 1;

  constructor(operand: IExpression) {
    super();
    this.Operands = [operand];
  }

  /**
   * @returns A square root of an operand
   */
  Execute(): number {
    return Math.tan(this.Operands[0].Execute());
  }

  Clone(): IExpression {
    return new TanExpression(this.Operands[0].Clone());
  }

}

export { TanExpression };
import { IExpression } from "../IExpression";
import { BaseExpression } from "../BaseExpression";

/**
 * Expression that negates a given operand
 */
class NegationExpression extends BaseExpression {
  Operands: IExpression[];
  Arity: number = 1;
  Order: number = 2;

  constructor(operand: IExpression) {
    super();
    this.Operands = [operand];
  }

  /**
   * @returns Negated operand result
   */
  Execute(): number {
    return -this.Operands[0].Execute();
  }

  Clone() : IExpression {
    return new NegationExpression(this.Operands[0]);
  }

}

export { NegationExpression };
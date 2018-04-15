import { IExpression } from "../IExpression";
import { BaseExpression } from "../BaseExpression";

/**
 * Expression that represents an operand inside parenthesis
 */
class ParenthesisExpression extends BaseExpression {
  Operands: IExpression[];
  Arity: number = 1;
  Order: number = 5;

  constructor(inside: IExpression) {
    super();
    this.Operands = [inside];
  }

  /**
   * @returns Operand result inside parenthesis
   */
  Execute(): number {
    return this.Operands[0].Execute();
  }

  Clone() : IExpression {
    return new ParenthesisExpression(this.Operands[0]);
  }

}

export { ParenthesisExpression };
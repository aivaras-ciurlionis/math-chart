import { IExpression } from "./IExpression";
import { Token, TokenType } from "../models/Token";
import { SumExpression } from "./arithmetic/SumExpression";
import { SubtractExpression } from "./arithmetic/SubtractExpression";
import { NegationExpression } from "./arithmetic/NegationExpression";
import { MultiplyExpression } from "./arithmetic/MultiplyExpression";
import { DivisionExpression } from "./arithmetic/DivisionExpression";
import { ExponentExpression } from "./arithmetic/ExponentExpression";
import { ParenthesisExpression } from "./arithmetic/ParenthesisExpression";
import { SqrRootExpression } from "./arithmetic/SqrRootExpression";

interface IExpressionFactory {
  /**
   * Returns a matching expression from expression operands
   * @param key Expression key (+/- etc..)
   * @param operands A list of expression operandss
   */
  GetExpressionByOperands(key: string, operands: IExpression[]): IExpression;

  /**
  * Returns a matching expression from a last token
  * @param key Expression key (+/- etc..)
  * @param lastToken Last added token
  */
  GetExpressionByLastToken(key: string, lastToken: Token): IExpression;

  /**
   * Returns a matching expression from a key
   * @param key Expression key (+/- etc..)
   */
  GetExpressionByKey(key: string): IExpression;

}

class ExpressionFactory implements IExpressionFactory {
  /**
   * Returns a matching expression from a key
   * @param key Expression key (+/- etc..)
   */
  GetExpressionByKey(key: string): IExpression {
    const operands : IExpression[] = [null, null];
    return this.GetExpressionByOperands(key, operands);
  }

  /**
   * Returns a matching expression from expression operands
   * @param key Expression key (+/- etc..)
   * @param operands A list of expression operandss
   */
  GetExpressionByOperands(key: string, operands: IExpression[]): IExpression {
    return this.GetExpression(key, operands, operands.length === 1 ? TokenType.Other : TokenType.Number);
  }

  /**
  * Returns a matching expression from a last token
  * @param key Expression key (+/- etc..)
  * @param lastToken Last added token
  */
  GetExpressionByLastToken(key: string, lastToken: Token): IExpression {
    const operands : IExpression[] = [null, null];
    return this.GetExpression(key, operands, lastToken ? lastToken.TypeOfToken : TokenType.Other);

  }

  GetExpression(key: string, operands: IExpression[], lastTokenType: TokenType): IExpression {
    switch (key) {
      case '+': return new SumExpression(operands[0], operands[1]);
      case '-': return this.GetSubractExpression(operands[0], operands.length > 1 ? operands[1] : null, lastTokenType);
      case '*': return new MultiplyExpression(operands[0], operands[1]);
      case '/': return new DivisionExpression(operands[0], operands[1]);
      case '^': return new ExponentExpression(operands[0], operands[1]);
      case '(': return new ParenthesisExpression(operands[0]);
      case 'sqrt': return new SqrRootExpression(operands[0]);
      default: return null;
    }
  }

  /**
   * Determines a type of subtraction expression: subraction or negation
   * @param op1
   * @param op2
   * @param lastTokenType
   */
  GetSubractExpression(op1: IExpression, op2: IExpression, lastTokenType: TokenType): IExpression {
    if (lastTokenType === TokenType.Number || lastTokenType === TokenType.Variable) {
      return new SubtractExpression(op1, op2);
    }
    return new NegationExpression(op1);
  }

}

export { IExpressionFactory, ExpressionFactory };
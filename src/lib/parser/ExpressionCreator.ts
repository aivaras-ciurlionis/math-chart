import { Token } from "../models/Token";
import { IExpression } from "../expressions/IExpression";
import { IExpressionFactory } from "../expressions/ExpressionFactory";
import { IMonomialResolver } from "./MonomimalResolver";
import { IMinOperationFinder } from "./MinOperationFinder";

interface IExpressionCreator {
  /**
   * Returns an expression from a list of parsed tokens
   * @param tokens List of tokens
   * @returns A parsed expression prepared for calculations
   */
  CreateExpression(tokens: Token[]): IExpression;
}

class ExpressionCreator implements IExpressionCreator {
  constructor(
    private expressionFactory: IExpressionFactory,
    private monomialResolver: IMonomialResolver,
    private minOperationFinder: IMinOperationFinder
  ) { }

  /**
   * Recursive function that parses a list of tokens into an expression
   * @param tokens List of tokens
   */
  ToExpression(tokens: Token[]): IExpression {
    if (tokens.length < 1) {
      return null;
    }

    if (tokens.length === 1) {
      return this.monomialResolver.GetMonomial(tokens[0]);
    }

    let index = this.minOperationFinder.FindMinOperationIndex(tokens);
    const nextOperation = tokens[index];
    const leftTokens = tokens.slice(0, index);
    const rightTokens = tokens.slice(index + 1);
    switch (nextOperation.Arity) {
      case 1:
        return this.expressionFactory.GetExpressionByOperands(nextOperation.Value,
          [this.ToExpression(rightTokens)]);
      case 2:
        return this.expressionFactory.GetExpressionByOperands(nextOperation.Value,
          [this.ToExpression(leftTokens), this.ToExpression(rightTokens)]);
      default:
          return this.expressionFactory.GetExpressionByKey(nextOperation.Value);
    }
  }

  /**
   * Returns an expression from a list of parsed tokens
   * @param tokens List of tokens
   * @returns A parsed expression prepared for calculations
   */
  CreateExpression(tokens: Token[]): IExpression {
    const validTokens = tokens.filter(t => t.Value !== ')');
    return this.ToExpression(validTokens);
  }
}

export { IExpressionCreator, ExpressionCreator };
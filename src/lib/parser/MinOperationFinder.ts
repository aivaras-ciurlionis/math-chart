import { Token, TokenType } from "../models/Token";

interface IMinOperationFinder {
  FindMinOperationIndex(tokens: Token[]): number;
}

class MinOperationFinder implements IMinOperationFinder {

  IsTokenSmaller(t1: Token, t2: Token): boolean {
    if (t1.Level < t2.Level) {
      return true;
    }

    if (t1.Level === t2.Level) {
      return true;
    }

    return t1.Level === t2.Level &&
      t1.Order === t2.Order &&
      t1.Index > t2.Index;
  }

  /**
   * Finds a token with the lowest execution index
   * @param tokens A list of tokens
   */
  FindMinOperationIndex(tokens: Token[]): number {
    let minIndex = 0;
    let i = 0;
    let minToken = new Token();
    minToken.Level = 999;
    minToken.Order = -1;
    tokens.forEach(token => {
      if (token.TypeOfToken === TokenType.Operation &&
        this.IsTokenSmaller(token, minToken)) {
        minIndex = i;
        minToken = token;
      }
      i++;
    });
    return minIndex;
  }

}

export { IMinOperationFinder, MinOperationFinder };
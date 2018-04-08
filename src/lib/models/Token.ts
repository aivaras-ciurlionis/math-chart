import { IExpression } from "../expressions/IExpression";

enum TokenType {
  Number = 0,
  Operation = 1,
  Variable = 2,
  Other = 3
}


class Token {
  TokenType: TokenType;
  Value: string;
  Level: number;
  Order: number;
  Arity: number;
  LeftToken: Token;
  RightToken: Token;
  Index: number;

  LeftExpression: IExpression;
  RightExpression: IExpression;

  MultiplyToken(): Token {
    var token = Object.assign(new Token(), {
      value: '*',
      Arity: 2,
      Order: 2,
      TokenType: TokenType.Operation
    });
    return token;
  }
}

export { Token, TokenType }
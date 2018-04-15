import { IExpression } from "../expressions/IExpression";

enum TokenType {
  Number = 0,
  Operation = 1,
  Variable = 2,
  Other = 3
}


class Token {
  TypeOfToken: TokenType;
  Value: string;
  Level: number;
  Order: number;
  Arity: number;
  LeftToken: Token;
  RightToken: Token;
  Index: number;

  LeftExpression: IExpression;
  RightExpression: IExpression;

  static MultiplyToken(): Token {
    var token = Object.assign(new Token(), {
      Value: '*',
      Arity: 2,
      Order: 2,
      TypeOfToken: TokenType.Operation
    });
    return token;
  }
}

export { TokenType, Token }
import { IExpressionFactory } from "../expressions/ExpressionFactory";
import { SymbolType } from "../models/SymbolType";
import { Token, TokenType } from "../models/Token";

interface ITokenCreator {
    expressionFactory: IExpressionFactory;
    /**
     * Returns a token from a given symbol and its parameters and a previous token
     * @param type A type of a symbol
     * @param value String value of a symbol
     * @param level A level inside parenthesis
     * @param lastToken Previous token
     */
    GetTokenByLast(type: SymbolType, value: string, level: number, lastToken: Token): Token;

    /**
    * Returns a token from a given symbol and its parameters
    * @param type A type of a symbol
    * @param value String value of a symbol
    * @param level A level inside parenthesis
    */
    GetToken(type: SymbolType, value: string, level: number): Token;
}

class TokenCreator implements ITokenCreator {
    expressionFactory: IExpressionFactory;

    constructor(expressionFactory: IExpressionFactory) {
        this.expressionFactory = expressionFactory;
    }

    /**
     * Returns a token from a given symbol and its parameters
     * @param type A type of a symbol
     * @param value String value of a symbol
     * @param level A level inside parenthesis
     * @param lastToken Previous token
     */
    GetTokenByLast(type: SymbolType, value: string, level: number, lastToken: Token): Token {
        let token = new Token();
        token.Level = level;
        token.Value = value;

        if (type === SymbolType.Numeric) {
            token.Order = 0;
            token.Arity = 0;
            token.TypeOfToken = TokenType.Number;
            return token;
        }

        const expression = this.expressionFactory.GetExpressionByLastToken(value, lastToken);
        if (expression) {
            token.Order = expression.Order;
            token.Arity = expression.Arity;
            token.TypeOfToken = TokenType.Operation;
        } else {
            token.Order = 0;
            token.Arity = 0;
            token.TypeOfToken = TokenType.Variable;
        }
        return token;
    }

    /**
    * Returns a token from a given symbol and its parameters
    * @param type A type of a symbol
    * @param value String value of a symbol
    * @param level A level inside parenthesis
    */
    GetToken(type: SymbolType, value: string, level: number) {
        return this.GetTokenByLast(type, value, level, null);
    }

}

export { ITokenCreator, TokenCreator };
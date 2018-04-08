import { IExpression } from "./IExpression";
import { Token, TokenType } from "../models/Token";

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
    GetExpressionByKey(key: string);

}

class ExpressionFactory implements IExpressionFactory {
    /**
     * Returns a matching expression from a key
     * @param key Expression key (+/- etc..)
     */
    GetExpressionByKey(key: string) {
        const operands = [null, null];
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
        const operands = [null, null];
        return this.GetExpression(key, operands, lastToken ? lastToken.TokenType : TokenType.Other);

    }

    GetExpression(key: string, operands: IExpression[], lastTokenType: TokenType): IExpression {
        switch (key) {
            default: return null;
        }
    }

}

export { IExpressionFactory, ExpressionFactory };
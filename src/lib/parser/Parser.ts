import { IExpression } from "../expressions/IExpression";
import { ExpressionCreator } from "./ExpressionCreator";
import { ExpressionFactory } from "../expressions/ExpressionFactory";
import { MonomialResolver } from "./MonomimalResolver";
import { MinOperationFinder } from "./MinOperationFinder";
import { TokenParser } from "./TokenParser";
import { SymbolTypeChecker } from "./SymbolTypeChecker";
import { TokenCreator } from "./TokenCreator";
import { TokenFixer } from "./TokenFixer";

interface IParser {
    /**
     * Parses an equation to computable expression
     * @param equation Given string equation
     */
    Parse(equation: string): IExpression;
}

class Parser implements IParser {
    expressionCreator = new ExpressionCreator(
        new ExpressionFactory(),
        new MonomialResolver(),
        new MinOperationFinder()
    );

    tokenParser = new TokenParser(
        new SymbolTypeChecker(),
        new TokenCreator(new ExpressionFactory()),
        new TokenFixer()
    );

    /**
     * Parses an equation to computable expression
     * @param equation Given string equation
     */
    Parse(equation: string): IExpression {
        const tokens = this.tokenParser.ParseTokens(equation);
        return this.expressionCreator.CreateExpression(tokens);
    }
}

export { IParser, Parser };
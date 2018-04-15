import { Token } from "../models/Token";
import { SymbolType } from "../models/SymbolType";
import { ISymbolTypeChecker } from "./SymbolTypeChecker";
import { ITokenCreator } from "./TokenCreator";
import { ITokenFixer } from "./TokenFixer";

interface ITokenParser {
  /**
   * Parses given string equation to list of tokens
   * @param equation Mathematical equation
   * @returns A list of parsed tokens
   */
  ParseTokens(equation: string): Token[];
}

class TokenParser implements ITokenParser {
  symbolTypeChecker: ISymbolTypeChecker;
  tokenCreator: ITokenCreator;
  tokenFixer: ITokenFixer;
  tokens: Token[];

  constructor(
    symbolTypeChecker: ISymbolTypeChecker,
    tokenCreator: ITokenCreator,
    tokenFixer: ITokenFixer
  ) {
    this.symbolTypeChecker = symbolTypeChecker;
    this.tokenCreator = tokenCreator;
    this.tokenFixer = tokenFixer;
  }

  AddToken(token: Token) {
    let lastToken = this.GetLastToken();
    if (!token) return;
    let fixedToken = this.tokenFixer.GetAdditionalToken(lastToken, token);
    if (fixedToken) {
      fixedToken.Index = this.tokens.length;
      fixedToken.Level = lastToken ? lastToken.Level : token.Level;
      this.tokens.push(fixedToken);
    }
    token.Index = this.tokens.length;
    this.tokens.push(token);
  }

  GetLastToken() {
    return this.tokens[this.tokens.length - 1] || null;
  }

  /**
   * Parses given string equation to list of tokens
   * @param equation Mathematical equation
   * @returns A list of parsed tokens
   */
  ParseTokens(equation: string): Token[] {
    this.tokens = [];
    let currentLevel = 0;
    let currentToken = '';
    let lastSymbolType = SymbolType.Other;
    let currentSymbolType = lastSymbolType;
    let i = 0;
    while (i < equation.length) {
      const character = equation.charAt(i);
      if (!character || character.length === 0) continue;
      currentSymbolType = this.symbolTypeChecker.GetSymbolType(character);

      if (currentToken.length > 0 && lastSymbolType != currentSymbolType && i > 0) {
        this.AddToken(this.tokenCreator.GetTokenByLast(lastSymbolType, currentToken, currentLevel, this.GetLastToken()));
        currentToken = '';
      }

      if (currentSymbolType === SymbolType.Parenthesis) {
        currentLevel += character === '(' ? 1 : -1;
        if (character === '(') {
          this.AddToken(this.tokenCreator.GetTokenByLast(SymbolType.Parenthesis, '(', currentLevel, this.GetLastToken()));
        }
      } else {
        currentToken += character;
      }
      i++;
      lastSymbolType = currentSymbolType;
    }

    if (currentToken.length > 0) {
      this.AddToken(this.tokenCreator.GetTokenByLast(lastSymbolType, currentToken, currentLevel, this.GetLastToken()));
    }

    if (currentLevel !== 0) {
      throw 'Unbalanced parenthesis';
    }

    return this.tokens;
  }
}

export { ITokenParser, TokenParser };

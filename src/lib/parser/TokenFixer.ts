import { Token, TokenType } from "../models/Token";

interface ITokenFixer {
  /**
   * Determines and returns implicit token that should intercept
   * between the current and the last token
   * @param lastToken Last processed token
   * @param currentToken Token that is being currently proccessed
   * @returns Required additional token or null
   */
  GetAdditionalToken(lastToken: Token, currentToken: Token): Token;
}

class TokenFixer implements ITokenFixer {

  /**
   * Determines and returns implicit token that should intercept
   * between the current and the last token
   * @param lastToken Last processed token
   * @param currentToken Token that is being currently proccessed
   * @returns Required additional token or null
   */
  GetAdditionalToken(lastToken: Token, currentToken: Token): Token {
    if (!lastToken || !currentToken) {
      return null;
    }

    if (lastToken.TokenType === TokenType.Number ||
      lastToken.TokenType === TokenType.Variable &&
      currentToken.Value === '('
    ) {
      return Token.MultiplyToken();
    }

    if (lastToken.Value === ')' && currentToken.Value == '(') {
      return Token.MultiplyToken();
    }

    if (currentToken.TokenType == TokenType.Variable &&
      lastToken.TokenType === 0 &&
      currentToken.Value !== '0') {
      return Token.MultiplyToken();
    }

    return null;
  }

}

export { ITokenFixer, TokenFixer }

import { Token, TokenType } from "../models/Token";
import { Monomial } from "../expressions/Monomimal";
import { Variable } from "../models/Variable";

interface IMonomialResolver {
  GetMonomial(token: Token): Monomial;
}

class MonomialResolver implements IMonomialResolver {

  /**
   * Parses a monomial from a given token
   * @param token Token
   */
  GetMonomial(token: Token): Monomial {
    if (!token) {
      throw "Empty token!";
    }

    if (token.TokenType !== TokenType.Number && token.TokenType !== TokenType.Variable) {
      throw `Invalid token type: ${token.TokenType}; value: ${token.Value}`;
    }

    if (token.TokenType === TokenType.Number) {
      return new Monomial(parseFloat(token.Value));
    }

    const variables = [];
    let i = token.Value.length;
    while (i--) {
      const char = token.Value.charAt(i);
      const variable = new Variable(char, 1);
      variables.push(variable);
    }
    const monomial = new Monomial(1);
    monomial.SetVariables(variables);
    return monomial;
  }

}

export { IMonomialResolver, MonomialResolver }

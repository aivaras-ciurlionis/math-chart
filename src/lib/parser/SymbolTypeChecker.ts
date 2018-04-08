import { SymbolType } from "../models/SymbolType";

interface ISymbolTypeChecker {
  /**
   * Returs a symbol type of a single character
   * @param char Single character
   */
  GetSymbolType(char: string): SymbolType;
}

class SymbolTypeChecker implements ISymbolTypeChecker {

  /**
   * Returs a symbol type of a single character
   * @param char Single character
   */
  GetSymbolType(char: string): SymbolType {
    if ('()'.includes(char)) {
      return SymbolType.Parenthesis;
    }

    if ('+-*/^@$&!:'.includes(char)) {
      return SymbolType.Symbol;
    }

    if ('=<>'.includes(char)) {
      return SymbolType.Equality;
    }

    return "1234567890.,".includes(char) ? SymbolType.Numeric : SymbolType.Other;
  }

}

export { ISymbolTypeChecker, SymbolTypeChecker };
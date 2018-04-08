class Variable {
  Exponent: number;
  Name: string;

  Evaluate(value: number): number {
    return Math.pow(value, this.Exponent);
  }

  ToString(): string {
    return Math.abs(this.Exponent - 1) < 0.001 ? `${this.Name}` : `${this.Name}^${this.Exponent}`;
  }

}

export { Variable }
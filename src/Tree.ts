

class Tree{
  private tokens: string[];

  constructor(tokens: string[]){
    this.tokens = tokens;
  }

  public build(){
    return this.continue(";");
  }

  private call(){
    let left = this.get();

    let operator;
    while(operator = this.check("(")){
      let right = this.continue(",");

      operator += this.isValid(this.check(")"));

      left = { left, operator, right };
    }

    return left;
  }

  private continue(...literal: string[]){
    let left = this.call();

    let operator;
    while(operator = this.check(...literal)){
      const right = this.call();

      left = { left, operator, right};
    }

    return left;
  }

  private get(): string | null{
    if(this.tokens.length === 0) return null;

    return this.tokens.shift() || null;
  }

  private check(...literal: string[]): string | null{
    if(
      this.tokens.length === 0||
      !literal.includes(this.tokens[0])
    ) return null;
   
    return this.tokens.shift() || null;
  }

  private isValid(value: string | number | null): string | number{
    if(value === null) throw new Error(`Invalid Syntax: ${value}`);

    return value;
  }
}

export { Tree };
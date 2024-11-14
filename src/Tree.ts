type Node = {
  left: Node | string | null;
  operator: string;
  right: Node | string | null;
};

class Tree{
  private tokens: string[];

  constructor(tokens: string[]){
    this.tokens = tokens;
  }

  public build(){
    return this.continue();
  }

  private bracket(): Node | string | null{
    let operator: string | null;
    while(operator = this.check("(")){
      const right: Node | string | null = this.comma();

      operator += this.isValid(this.check(")"));

      return right;
    }

    return this.get();
  }

  private flag(): Node | string | null{
    let operator: string | null;
    while(operator = this.check("+","-")){
      let right: Node | string | null =  this.comma();

      if(operator === "+") return right;

	    return {
        left: { left: "0", operator: "-", right: "1" },
        operator: "*",
        right
      }
    }

    return this.call();
  }

  private mul(): Node | string | null{
    let left: Node | string | null = this.flag();

    let operator: string | null;
    while(operator = this.check("*","/")){
      const right: Node | string | null = this.flag();

      left = { left, operator, right };
    }

    return left;
  }

  private plus(): Node | string | null{
    let left: Node | string | null = this.mul();

    let operator: string | null;
    while(operator = this.check("+","-")){
      const right: Node | string | null = this.mul();

      left = { left, operator, right };
    }

    return left;
  }

  private comma(): Node | string | null{
    let left: Node | string | null = this.plus();

    let operator: string | null;
    while(operator = this.check(",")){
      const right: Node | string | null = this.plus();

      left = { left, operator, right};
    }

    return left;
  }

  private continue(): Node | string | null{
    let left: Node | string | null = this.comma();

    let operator: string | null;
    while(operator = this.check(";")){
      const right: Node | string | null = this.comma();

      left = { left, operator, right };
    }

    return left;
  }

  private call(): Node | string | null{
    let left: Node | string | null = this.bracket();

    let operator: string | null;
    while(operator = this.check("(")){
      let right: Node | string | null = this.comma();

      operator += this.isValid(this.check(")"));

      left = { left, operator, right };
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

  private isValid(value: string | null): string{
    if(value === null) throw new Error(`無効な構文です`);

    return value;
  }
}

export { Tree };
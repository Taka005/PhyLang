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

  private brackets(): string | null{
    let operator: string | null;
    while(operator = this.check("(")){
        const right = this.comma();

        operator += this.isValid(this.check(")"));

        return right;
    }

    return this.get();
  }

  private flag(): Node | null{
    let operator: string | null;
    while(operator = this.check("+","-")){
      let right: Node | null =  this.comma();

      if(operator === "+") return right;

	    return {
        left: { left: "0", operator: "-", right: "1" },
        operator: "*",
        right
      }
    }

    return this.call();
  }

  private mul(): Node | null{
    const left: Node | null = this.flag();

    let operator: string | null;
    let node: Node | null = null;
    while(operator = this.check("*","/")){
      const right: Node | null = this.flag();

      node = { left, operator, right };
    }

    return node;
  }

  private plus(): Node | null{
    const left: Node | null = this.mul();

    let operator: string | null;
    let node: Node | null = null;
    while(operator = this.check("+","-")){
      const right: Node | null = this.mul();

      node = { left, operator, right };
    }

    return node;
  }

  private comma(): Node | null{
    const left: Node | null = this.plus();

    let operator: string | null;
    let node: Node | null = null;
    while(operator = this.check(",")){
      const right: Node | null = this.plus();

      node = { left, operator, right};
    }

    return node;
  }

  private call(): Node | null{
    const left: string | null = this.brackets();

    let operator: string | null;
    let node: Node | null = null;
    while(operator = this.check("(")){
      const right: Node | null = this.comma();

      operator += this.isValid(this.check(")"));

      node = { left, operator, right };
    }

    return node;
  }

  private continue(): Node | null{
    const left: Node | null = this.comma();

    let operator: string | null;
    let node: Node | null = null;
    while(operator = this.check(";")){
      const right: Node | null = this.comma();

      node = { left, operator, right };
    }

    return node;
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
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
    return this.continue(";");
  }

  flag(): Node | null{
    let operator;
    while(operator = this.check("+","-")){
      let right =  this.continue(",");

      if(operator == "+") return right;
  
	    return {
        left: { left: "0", operator: "-", right: "1" },
        operator: "*",
        right
      };
    }

    return this.call();
  }

  private call(): Node | null{
    const left: string | null = this.get();

    let operator: string | null;
    let node: Node | null = null;
    while(operator = this.check("(")){
      const right: Node | null = this.continue(",");

      operator += this.isValid(this.check(")"));

      node = { left, operator, right };
    }

    return node;
  }

  private continue(...literal: string[]): Node | null{
    const left: Node | null = this.call();

    let operator: string | null;
    let node: Node | null = null;
    while(operator = this.check(...literal)){
      const right: Node | null = this.call();

      node = { left, operator, right};
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

  private isValid(value: string | number | null): string | number{
    if(value === null) throw new Error(`無効な構文です`);

    return value;
  }
}

export { Tree };
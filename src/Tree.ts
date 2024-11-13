

class Tree{
  private tokens: (string | number)[];

  constructor(tokens: (string | number)[]){
    this.tokens = tokens;
  }

  private call(){
    let left = this.get();

    let operator;
    while((operator = this.check(this.tokens,"("))){
      let right = this.continue();

      op += this.isValid(this.check(this.tokens,")"));

      left = { left, operator, right };
    }

    return left;
  }

  private continue(){
    this.call();

    let operator;
    while((operator = accept(tokens,";"))){
      const right = call();

      left = {left,op,right};
    }

    return left;
  }

  private get(): string | number | null{
    if(this.tokens.length === 0) return null;

    return this.tokens.shift();
  }

  private check(...cs): string | number | null{
    if(
      this.tokens.length === 0||
      !cs.includes(this.tokens[0])
    ) return null;
   
    return this.tokens.shift();
  }

  private isValid(value: string | number | null): string | number{
    if(value === null) throw new Error(`Invalid Syntax: ${value}`);

    return value;
  }
}

export { Tree };
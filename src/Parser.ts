import { FUNCTION, CONSTANT, CHARACTER } from "./Literal";

class Parser{
  public static tokenize(source: string): (string | number)[]{
    const splitRegexp = new RegExp(`(".*"|${FUNCTION.join("|")}|${CONSTANT.join("|")}|${CHARACTER.join("|")})|\\n`);

    const tokens: string[] = source
      .split(splitRegexp)
      .filter(token=>token);

    return tokens;
  }

  public static toAST(){
    const ast = {}; 
  }
}

export { Parser };
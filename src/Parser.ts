import { FUNCTION, CONSTANT, CHARACTER } from "./Literal";
import { concatRegExps } from "./utils";

class Parser{
  static public tokenize(source: string): string[]{
    const splitRegexp: RegExp = concatRegExps([
      this.toRegexp(FUNCTION),
      this.toRegexp(CONSTANT),
      this.toRegexp(CHARACTER),
      new RegExp(/(".*")|\n/)
    ]);

    const tokens: string[] = source.split(splitRegexp);
  
    return tokens.filter(token=>token);
  }

  static private toRegexp(literal: string[]): RegExp{
    return new RegExp(`(${literal.join("|")})`);
  }
}

export { Parser };
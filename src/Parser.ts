import { FUNCTION, CONSTANT, CHARACTER } from "./Literal";

class Parser{
  public static tokenize(source: string): string[]{
    const splitRegexp = new RegExp(`\\/\\/.*$|(".*"|${FUNCTION.join("|")}|${CONSTANT.join("|")}|${CHARACTER.join("|")})|\\n`,"m");

    const tokens: string[] = source
      .split(splitRegexp)
      .filter(token=>token);

    return tokens;
  }
}

export { Parser };
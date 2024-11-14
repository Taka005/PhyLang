import { Parser } from "./Parser";
import { Tree } from "./Tree";
import { Runner } from "./Runner";

const str = `
Define(value,123);
Define(num,100);
Set(value,456);
Console(Equal(2,1));
Console(Get(value));
Console(MathE);
`;

const tokens = Parser.tokenize(str);
console.log(tokens);

const tree = new Tree(tokens);
const ast = tree.build();
const runner = new Runner();

console.log(JSON.stringify(ast,null,"  "));

runner.run(ast);

console.log(runner.base);
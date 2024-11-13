import { Parser } from "./Parser";
import { Tree } from "./Tree";

const str = `Define(value,"123");
Define(num,100);

Set(value,"456");

Get(value);
`;

const tokens = Parser.tokenize(str);
console.log(tokens);

const tree = new Tree(tokens);
console.log(JSON.stringify(tree.build(),null,"  "));
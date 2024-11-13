import { Parser } from "./Parser";

const str = `Define(value,"123");
Define(num,100);

Set(value,"456");

Get(value);`;

console.log(Parser.tokenize(str));
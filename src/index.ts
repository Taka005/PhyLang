import { Parser } from "./Parser";
import { Tree } from "./Tree";
import { Runner } from "./Runner";

const str = `
//値の定義
Define(value,123);
Define(num,100);

//値の設定
Set(value,456);

//値の計算
Console(Equal(2,1));
Console(Get(value));
Console(10-Get(value));
Console(MathPI);
Console(-1*31/21*(10-2));
Console(Sin(0.5*MathPI));
`;

const tokens = Parser.tokenize(str);
console.log(tokens);

const tree = new Tree(tokens);
const ast = tree.build();
const runner = new Runner();

console.log(JSON.stringify(ast,null,"  "));

runner.run(ast);
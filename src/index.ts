import { Runner } from "./Runner";

const str = `
//値の定義
Define(value,123);
Define(num,100);
Define(PI,"MathPI");

//値の設定
Set(value,456);

//値の計算
Console(Get(PI));
Console(Equal(2,1));
Console(Get(value));
Console(10-Get(value));
Console(MathPI);
Console(-1*31/21*(10-2));
Console(Sin(0.5*MathPI));
`;

const runner = new Runner();

runner.build(str);
runner.start();
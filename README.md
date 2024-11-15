# PhyLang
物理エンジン用スクリプト

### 言語仕様
- ""で囲むことで文字列になります。囲わなくても文字列と判定されるが、予約語の場合別の値に置換されます
- 変数の定義 Define(変数名,値);
- 変数の値を変更 Set(変数名,値);
- 変数の値を取得 Get(変数名);
- コンソールへ出力 Console(値);
- 等値/非等値判定(1又は0を返します) Equal/NotEqual(比較する値,比較する値)
- 比較(1又は0を返します) More/Less/MoreEqual/LessEqual(比較する値,比較する値)
- 論理演算 And/Or(比較する値,比較する値)
- 条件 If(条件,真の場合の実行内容)
- 三角関数 Sin/Cos/Tan(値(ラジアン))

### 予約語
- MathPi 円周率
- MathE ネイピア数
- True 真(1)
- False 偽(0)
- None 不明な値
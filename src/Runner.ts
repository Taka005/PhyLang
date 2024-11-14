import { Tree, Node } from "./Tree";
import { Parser } from "./Parser";

class Runner{
  public base: { [key: string]: string | number } = {};
 
  public tree: Tree | null = null;

  public ast: Node | string | null = null;

  constructor(base = {}){
    Object.assign(this.base,base);
  }

  public build(source: string): void{
    const tokens = Parser.tokenize(source);

    this.tree = new Tree(tokens);
    this.ast = this.tree.build();
  }

  public start(): void{
    this.run(this.ast);
  }

  public run(node: Node | string | null): any{
    if(!node) return null;

    if(typeof node === "string"){
      if(node.startsWith("\"")) return node.substr(1,node.length-2);

      if(!isNaN(node as unknown as number)) return Number(node);

      return node;
    }else if(node.operator === ";"){
      this.run(node.left);
      this.run(node.right);
    }else if(node.operator === ","){
      return [
        this.run(node.left),
        this.run(node.right)
      ].flat();
    }else if(node.operator === "()"){
      const func = this.run(node.left);

      if(func === "Define"){
        const args = [this.run(node.right)].flat();
        if(args.length > 2) throw new Error("構文エラー: Defineに3個以上のオプションは設定できません");

        this.base[args[0]] = args[1];
      }else{
        throw new Error(`定義エラー: ${func}関数は存在しません`);
      }
    }else{
      throw new Error(`構文エラー: ${node.operator}は利用できない演算子です`);
    }
  }
}

export { Runner };
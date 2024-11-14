import { Tree, Node } from "./Tree";
import { Parser } from "./Parser";

class Runner{
  public base: Object = {};
 
  public tree: Tree | null = null;

  public ast: Node | null = null;

  constructor(base = {}){
    Object.assign(this.base,base);
  }

  public build(source: string): void{
    const tokens = Parser.tokenize(source);

    this.tree = new Tree(tokens);
    this.ast = this.tree.build();
  }

  public run(node: Node): void{
    if(!node.operator){
      if(node[0] == '"') return node.substr(1,node.length-2);

      if(isNaN(node[0]))return Number(node);

      if(this.base.hasOwnProperty(node)) return this.base[node];

      return node;
    }else if(node.operator == ";"){
      run(node.left);
      run(node.right);
    }else if(node.operator == ","){
      return [run(node.left),run(node.right)].flat();
    }else if(node.operator == "()"){
      const func = run(node.left);
      if(func == "print"){
        var args = [run(a.right)].flat().join("");
        console.log(args);
      }else{
        error("未実装の関数呼び出し",func);
      }
    }else{
      error("未実装の演算子",a.op);
    }
  }
}

export { Runner };
import { Tree, Node } from "./Tree";
import { Parser } from "./Parser";

class Runner{
  public base: { [key: string]: string | number } = {};

  public tree: Tree | null = null;

  public ast: Node | string | null = null;

  private readonly constant: { [key: string]: string | number } = {
    MathPI: Math.PI,
    MathE: Math.E,
    True: 1,
    False: 0
  }

  constructor(base = {}){
    Object.assign(this.base,base);
  }

  public build(source: string): void{
    console.log(source);

    const tokens = Parser.tokenize(source);
    console.log(tokens);

    this.tree = new Tree(tokens);

    this.ast = this.tree.build();
    console.log(JSON.stringify(this.ast,null,"  "));
  }

  public start(): void{
    this.run(this.ast);
  }

  public run(node: Node | string | null): any{
    if(!node) return null;

    if(typeof node === "string"){
      if(node.startsWith("\"")) return node.substr(1,node.length-2);

      if(!isNaN(node as unknown as number)) return Number(node);

      if(this.constant.hasOwnProperty(node)) return this.constant[node];

      return node;
    }else if(node.operator === ";"){
      this.run(node.left);
      this.run(node.right);
    }else if(node.operator === ","){
      return [
        this.run(node.left),
        this.run(node.right)
      ].flat();
    }else if(node.operator === "+"){
      return this.run(node.left) + this.run(node.right);
    }else if(node.operator === "-"){
      const left = this.run(node.left);
      const right = this.run(node.right);
      if(isNaN(left)||isNaN(right)) return "None";

      return left - right;
    }else if(node.operator === "*"){
      const left = this.run(node.left);
      const right = this.run(node.right);
      if(isNaN(left)||isNaN(right)) return "None";

      return left*right;
    }else if(node.operator === "/"){
      const left = this.run(node.left);
      const right = this.run(node.right);
      if(isNaN(left)||isNaN(right)) return "None";

      if(right === 0) return "None";

      return left/right;
    }else if(node.operator === "^"){
      const left = this.run(node.left);
      const right = this.run(node.right);
      if(isNaN(left)||isNaN(right)) return "None";

      return left**right;
    }else if(node.operator === "%"){
      const left = this.run(node.left);
      const right = this.run(node.right);
      if(isNaN(left)||isNaN(right)) return "None";

      if(right === 0) return "None";

      return left%right;
    }else if(node.operator === "()"){
      const func: string = this.run(node.left);
      const args = [this.run(node.right)].flat();

      if(func === "Define"){
        if(args.length > 2) throw new Error("構文エラー: Defineに3個以上のオプションは設定できません");
        if(this.base.hasOwnProperty(args[0])) throw new Error(`定義エラー: ${args[0]}は既に定義されています`);

        this.base[args[0]] = args[1];
      }else if(func === "Set"){
        if(args.length > 2) throw new Error("構文エラー: Setに3個以上のオプションは設定できません");
        if(!this.base.hasOwnProperty(args[0])) throw new Error(`定義エラー: ${args[0]}は定義されていません`);

        this.base[args[0]] = args[1];
      }else if(func === "Console"){
        if(args.length > 1) throw new Error("構文エラー: Consoleに2個以上のオプションは設定できません");

        console.log(args[0]);
      }else if(func === "Get"){
        if(args.length > 1) throw new Error("構文エラー: Getに2個以上のオプションは設定できません");
        if(!this.base.hasOwnProperty(args[0])) throw new Error(`定義エラー: ${args[0]}は定義されていません`);
      
        return this.base[args[0]];
      }else if(func === "Equal"){
        if(args.length > 2) throw new Error("構文エラー: Equalに3個以上のオプションは設定できません");

        return args[0] === args[1] ? 1 : 0;
      }else if(func === "NoEqual"){
        if(args.length > 2) throw new Error("構文エラー: NoEqualに3個以上のオプションは設定できません");

        return args[0] !== args[1] ? 1 : 0;
      }else if(func === "And"){
        if(args.length > 2) throw new Error("構文エラー: Andに3個以上のオプションは設定できません");

        return args[0] && args[1] ? 1 : 0;
      }else if(func === "Or"){
        if(args.length > 2) throw new Error("構文エラー: Orに3個以上のオプションは設定できません");

        return args[0] || args[1] ? 1 : 0;
      }else if(func === "More"){
        if(args.length > 2) throw new Error("構文エラー: Moreに3個以上のオプションは設定できません");

        return args[0] > args[1] ? 1 : 0;
      }else if(func === "MoreEqual"){
        if(args.length > 2) throw new Error("構文エラー: MoreEqualに3個以上のオプションは設定できません");

        return args[0] >= args[1] ? 1 : 0;
      }else if(func === "Less"){
        if(args.length > 2) throw new Error("構文エラー: Lessに3個以上のオプションは設定できません");

        return args[0] < args[1] ? 1 : 0;
      }else if(func === "LessEqual"){
        if(args.length > 2) throw new Error("構文エラー: LessEqualに3個以上のオプションは設定できません");

        return args[0] <= args[1] ? 1 : 0;
      }else if(func === "Sin"){
        if(args.length > 1) throw new Error("構文エラー: Sinに3個以上のオプションは設定できません");

        if(isNaN(args[0])) return "None";

        return Math.sin(args[0]);
      }else if(func === "Cos"){
        if(args.length > 1) throw new Error("構文エラー: Cosに3個以上のオプションは設定できません");

        if(isNaN(args[0])) return "None";

        return Math.cos(args[0]);
      }else if(func === "Tan"){
        if(args.length > 1) throw new Error("構文エラー: Tanに3個以上のオプションは設定できません");

        if(isNaN(args[0])) return "None";

        return Math.tan(args[0]);
      }else{
        throw new Error(`定義エラー: ${func}関数は存在しません`);
      }
    }else{
      throw new Error(`構文エラー: ${node.operator}は利用できない演算子です`);
    }

    return null;
  }
}

export { Runner };
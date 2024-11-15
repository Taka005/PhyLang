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
    if(!node) return "None";

    if(typeof node === "string"){
      if(node.startsWith("\"")) return node.substr(1,node.length-2);

      if(!isNaN(node as unknown as number)) return Number(node);

      if(this.constant.hasOwnProperty(node)) return this.constant[node];

      return node;
    }else if(node.operator === ";"){
      this.run(node.left);
      this.run(node.right);
    }else if(node.operator === ","){
      return [ node.left, node.right ];
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

        const key = this.checkRun(args[0]);
        const value = this.checkRun(args[1]);
        if(this.base.hasOwnProperty(key)) throw new Error(`定義エラー: ${key}は既に定義されています`);

        this.base[key] = value;
      }else if(func === "Set"){
        if(args.length > 2) throw new Error("構文エラー: Setに3個以上のオプションは設定できません");

        const key = this.checkRun(args[0]);
        const value = this.checkRun(args[1]);
        if(!this.base.hasOwnProperty(key)) throw new Error(`定義エラー: ${key}は定義されていません`);

        this.base[key] = String(value);
      }else if(func === "Console"){
        if(args.length > 1) throw new Error("構文エラー: Consoleに2個以上のオプションは設定できません");

        const value = this.checkRun(args[0]);

        console.log(value);
      }else if(func === "Get"){
        if(args.length > 1) throw new Error("構文エラー: Getに2個以上のオプションは設定できません");

        const key = this.checkRun(args[0]);

        if(!this.base.hasOwnProperty(key)) throw new Error(`定義エラー: ${key}は定義されていません`);
      
        return this.base[key];
      }else if(func === "Equal"){
        if(args.length > 2) throw new Error("構文エラー: Equalに3個以上のオプションは設定できません");

        const left = this.checkRun(args[0]);
        const right = this.checkRun(args[1]);

        return left === right ? 1 : 0;
      }else if(func === "NoEqual"){
        if(args.length > 2) throw new Error("構文エラー: NoEqualに3個以上のオプションは設定できません");

        const left = this.checkRun(args[0]);
        const right = this.checkRun(args[1]);

        return left !== right ? 1 : 0;
      }else if(func === "And"){
        if(args.length > 2) throw new Error("構文エラー: Andに3個以上のオプションは設定できません");

        return this.checkRun(args[0]) && this.checkRun(args[1]) ? 1 : 0;
      }else if(func === "Or"){
        if(args.length > 2) throw new Error("構文エラー: Orに3個以上のオプションは設定できません");

        return this.checkRun(args[0]) || this.checkRun(args[1]) ? 1 : 0;
      }else if(func === "More"){
        if(args.length > 2) throw new Error("構文エラー: Moreに3個以上のオプションは設定できません");

        return this.checkRun(args[0]) > this.checkRun(args[1]) ? 1 : 0;
      }else if(func === "MoreEqual"){
        if(args.length > 2) throw new Error("構文エラー: MoreEqualに3個以上のオプションは設定できません");

        return this.checkRun(args[0]) >= this.checkRun(args[1]) ? 1 : 0;
      }else if(func === "Less"){
        if(args.length > 2) throw new Error("構文エラー: Lessに3個以上のオプションは設定できません");

        return this.checkRun(args[0]) < this.checkRun(args[1]) ? 1 : 0;
      }else if(func === "LessEqual"){
        if(args.length > 2) throw new Error("構文エラー: LessEqualに3個以上のオプションは設定できません");

        return this.checkRun(args[0]) <= this.checkRun(args[1]) ? 1 : 0;
      }else if(func === "If"){
        if(args.length > 2) throw new Error("構文エラー: Ifに3個以上のオプションは設定できません");

        if(this.checkRun(args[0])){
          this.checkRun(args[1]);
        }
      }else if(func === "Sin"){
        if(args.length > 1) throw new Error("構文エラー: Sinに3個以上のオプションは設定できません");

        const value = this.checkRun(args[0]);

        if(isNaN(value)) return "None";

        return Math.sin(value);
      }else if(func === "Cos"){
        if(args.length > 1) throw new Error("構文エラー: Cosに3個以上のオプションは設定できません");

        const value = this.checkRun(args[0]);

        if(isNaN(value)) return "None";

        return Math.cos(value);
      }else if(func === "Tan"){
        if(args.length > 1) throw new Error("構文エラー: Tanに3個以上のオプションは設定できません");

        const value = this.checkRun(args[0]);

        if(isNaN(value)) return "None";

        return Math.tan(value);
      }else{
        throw new Error(`定義エラー: ${func}関数は存在しません`);
      }
    }else{
      throw new Error(`構文エラー: ${node.operator}は利用できない演算子です`);
    }

    return "None";
  }

  private checkRun(node: Node | string | null): any{
    if(typeof node === "object"){
      return this.run(node);
    }else{
      return node;
    }
  }
}

export { Runner };
const fs = require("fs");

console.log("JASコンパイラーが起動しました");
console.log("ファイルのチェック中...");

const FilePath = process.argv[2];
if(!FilePath){
  console.log("ファイルエラー: コンパイル先のJASファイルを指定してください");
  process.exit();
}

if(FilePath.split(".").pop() !== "jas"){
  console.log("ファイルエラー: 拡張子が.jasのファイルを指定してください");
  process.exit();
}

if(!fs.existsSync(FilePath)){
  console.log(`ファイルエラー: ${file} は存在しません`);
  process.exit();
}

const FileDate = fs.readFileSync(FilePath);

console.log("ファイルのチェック完了");
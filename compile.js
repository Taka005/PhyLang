const fs = require("fs");

console.log("\x1b[34mJASコンパイラーが起動しました\x1b[39m");
console.log("\x1b[34mファイルのチェック中...\x1b[39m");

const FilePath = process.argv[2];
if(!FilePath){
  console.log("\x1b[31mファイルエラー: コンパイル先のJASファイルを指定してください\x1b[39m");
  process.exit();
}

if(FilePath.split(".").pop() !== "jas"){
  console.log("\x1b[31mファイルエラー: 拡張子が.jasのファイルを指定してください\x1b[39m");
  process.exit();
}

if(!fs.existsSync(FilePath)){
  console.log(`\x1b[31mファイルエラー: ${FilePath} は存在しません\x1b[39m`);
  process.exit();
}

const FileDate = fs.readFileSync(FilePath);

console.log("\x1b[34mファイルのチェック完了\x1b[39m");
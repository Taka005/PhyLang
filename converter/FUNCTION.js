module.exports = (FileDate)=>{
  return FileDate
    .replace(/関数(.*?)の引数(.*?)は(.*?)を実行する/g,"function\t$1($2){\n\t$3\n}\n\n")
}